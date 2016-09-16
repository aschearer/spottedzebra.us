---
layout: post
title: Writing a Windows 8 Game Loop
description: Examine three possible ways to create a game loop for a Windows Store application.
category: Making Games
author: Alex Schearer
slug: windows-8-game-loop
---

When developing games for Windows 8 with C# 
it is not immediately clear how to construct a basic game loop. For other Microsoft 
platforms XNA is the obvious choice. However because Microsoft does not support XNA 
in Windows 8, developers are left to their own resources. After developing several 
games for Windows 8 I have compiled my experiences on the various ways to implement 
a game loop for Windows 8 and C#. I invite you to read on and decide which one best 
suits your needs.

If you decide to write a game using C# and XAML you may think to use a DispatcherTimer 
to construct your game loop. While this works, in practice I have found its performance 
to be unusable for games. Instead I have found three alternatives which provide adequate 
performance without relying on the DispatcherTimer. Which one is right for you depends 
on your situation. At a high level the options are:

||XNA and MonoGame|CompositionTarget Rendering|MonoGame's GameTimer
External Dependency|&#9785; Yes|&#9786; No|&#9786; No
Fixed Time Step|&#9786; Yes|&#9785; No|&#9786; Yes
Variable Time Step|&#9786; Yes|&#9786; Yes|&#9786; Yes

### Rely on MonoGame
If you already have a game based on XNA, are willing to take on a big dependency, 
or are creating a 3D game then using [MonoGame][1]
to handle your game loop is likely your best choice. On the other hand, if you're 
developing a 2D game and plan to have lots of user interface elements adopting 
MonoGame may be overkill. Ultimately, you will have to decide whether you want to take 
on a big external dependency and shape your code to fit into XNA's framework.

### CompositionTarget.Rendering
If you are unfamiliar with XNA, want to create more complex user interfaces, want 
to more easily support different screen resolutions, or just want to avoid an extra 
dependency then your next option is to add an event handler for the global static event 
[CompositionTarget.Rendering][2]. 
This event fires once per each frame. The advantage of this approach is it is very easy 
to implement. Simply add the event handler and be on your way. That being said, there 
is no way to know how much time has passed between frames meaning your game's updates 
will be linked to the frame rate. For many games this is not acceptable.

### Cherry Pick MonoGame's GameTimer
Your game may not require XNA but you may need to know how much time has elapsed 
between frames. As a result the first two options do not work for you game. 
Fortunately, it's possible to combine the best of both approaches.

You may be wondering how MonoGame supports a fixed time step in Windows 8. The 
magic takes place in the GameTimer class. If you take a look you’ll see that 
GameTimer also listens for the CompsotionTarget.Rendering event and uses a 
[Stopwatch][3] to keep track of the time between events.

Fortunately, MonoGame is an open source project licensed under the Microsoft 
Public License. As a result you can simply take the [GameTimer class][4] 
and add it to your project. This way you can develop a game with fixed or variable 
time steps without adding an external dependency.

### Wrapping Up
Ultimately which option is best depends on your circumstances. If you plan to use XNA 
then using MonoGame is a no-brainer. If not then I would recommend using MonoGame's 
GameTimer. In any case, you now have the knowledge to make an informed decision. Best 
of luck developing your Windows 8 game!

{% include windows-8-dev-footer.html %}
                            
[1]:http://www.monogame.net/
[2]: http://msdn.microsoft.com/en-us/library/system.windows.media.compositiontarget.rendering.aspx
[3]: http://msdn.microsoft.com/en-us/library/system.diagnostics.stopwatch.aspx
[4]: https://github.com/mono/MonoGame/blob/develop/MonoGame.Framework/GameTimer.cs