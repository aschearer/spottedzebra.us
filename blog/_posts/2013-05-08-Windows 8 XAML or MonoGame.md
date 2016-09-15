---
layout: post
title: "Windows 8 Game Development: XAML or MonoGame?"
description: You can write games for Windows 8 using C# and XAML or MonoGame - but how do you decide? This post explores each option's tradeoffs so you can get back to work!
category: Making Games
author: Alex Schearer
---

XAML and C# are great technologies for creating 
apps. However can you create games with them or must you take a dependency on MonoGame? 
While there are many reasons to use MonoGame I believe there are some compelling reasons 
to stick with XAML and C# when developing games for Windows 8. Based on my experiences 
developing Adlib, Petunk, and Scramble Legends, I've tried to provide a guide to help 
you make a more informed decision when developing a game for Windows 8.

<figure>
    <a href="/"><img src="{{site.url}}/img/posts/2013-05-08-Windows 8 XAML or MonoGame/games-logos.jpg" alt="Adlib, Petunk, and Scramble Legends: Three fun games free for Windows 8 by Spotted Zebra"/></a>
    <figcaption>Adlib, Petunk, and Scramble Legends: Three fun games free for Windows 8 by Spotted Zebra</figcaption>
</figure>

To start off there are certain things that can only be done using MonoGame. If your 
game requires one of these features the decision is an easy one.

  * Are you developing a 3D game?
  * Does your game require shaders?
  * Do you plan to use thousands of animated sprites?

If you answered yes to any of the questions above then XAML and C# will not work 
for you. XAML does not support 3D or shaders and you will likely run into performance 
problems drawing that many sprites at once. If your game does not share these 
requirements you may still want to use MonoGame. Here are some questions to help you 
decide if MonoGame is still a good choice:

<figure class="small">
    <a href="http://monogame.net"><img src="{{site.url}}/img/posts/2013-05-08-Windows 8 XAML or MonoGame/monogame-logo.png" alt="MonoGame is an open source implementaiton of XNA available for Windows 8"/></a>
    <figcaption>MonoGame is an open source implementaiton of XNA available for Windows 8</figcaption>
</figure>

  * How important is it to support multiple screen resolutions and densities for 
your game? How much work are you willing to do to support them?
  * Does your game involve many user interface elements? How important is it for your 
user interface to feel native? 
  * Do you expect to create a more complex interface with animations, lists, tables, etc.?
  * Is it important to avoid external dependencies?

If the above are important to you then stick with XAML and C#. Using the WinRT user 
interface toolkit will guarantee that your interface looks and feels like a Windows 8 
application and enable you to create whatever you want. In addition, WinRT has its own 
system to support multiple screen resolutions and densities &ndash; all you have to do is 
create art assets at different scales and use the appropriate controls.

### Have it Both Ways
With that being said there is a third option available to Windows 8 game developers. 
Use XNA to draw your game and XAML to render your user interface. With this approach 
you can have your cake and eat it, too. However it's no silver bullet; you will still 
have to come up with a way to scale your game for different screen resolutions, and when 
porting your game you will have to rewrite the non-XNA user interfaces.

What option is best really depends on your game and your requirements. Speaking for 
myself, I originally created games for Windows 8 using MonoGame but have since shifted 
to using vanilla C# and XAML. In my case I wanted to leverage WinRT’s support for 
different resolution and reduce the overhead associated with managing MonoGame and 
XAML side by side. What will you choose?