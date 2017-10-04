---
layout: post
title: "How to Reduce a Unity Game's File Size: Part 1"
description: "The basic tools available out of the box and how to use them."
category: "Making Games"
author: Alex Schearer
slug: reducing-unity-game-size-in-unity
comments: true
---

## Twisting Nobs in Unity
While developing [Tumblestone][1] for mobile devices I needed to greatly reduce the amount of disk space the game required. For iOS in particular games must be at or below 100 mb. Players must be on wifi in order to download games above 100 mb -- initially, Tumblestone was over 1 gb! Over the course of development I tried a number of things to reduce the game's file size. I'm writing this series in the hope that my experience will help you on your project.

To kick things off, I'm going to run through the various nobs and dials available to you in Unity. These tools help are intended to reduce your game's file size. Using these will almost certainly be the easiest way to achieve your goal. After exhausting these options, read the rest of the series for more advanced techniques.

### Understanding a Unity Game's File Size
Before we begin, it's important that you know exactly how large your Unity game is and where the space is being taken up. Without this knowledge any attempts to reduce the game's file size will be blind guesswork. Fortunately, Unity provides the relevant information in its [editor log file][2] after you export a game build:

    Textures      33.1 mb	 54.1% 
    Meshes        0.0 kb	 0.0% 
    Animations    0.0 kb	 0.0% 
    Sounds        8.3 mb	 13.6% 
    Shaders       172.8 kb	 0.3% 
    Other Assets  8.2 mb	 13.4% 
    Levels        82.1 kb	 0.1% 
    Scripts       4.7 mb	 7.7% 
    Included DLLs 6.4 mb	 10.5% 
    File headers  201.5 kb	 0.3% 
    Complete size 61.3 mb	 100.0% 

    Used Assets and files from the Resources folder, sorted by uncompressed size:
    2.1 mb	 3.4% Assets/Spritesheets/v2/Spritesheet1.png
    2.1 mb	 3.4% Assets/Spritesheets/v2/Spritesheet2.png
    2.0 mb	 3.3% Assets/Spritesheets/v2/Spritesheet3.png
    2.0 mb	 3.3% Assets/Spritesheets/v2/Spritesheet4.png
    // list continues for every file included in the game

This data may be enough to get you started. But if you'd like a more visual, interactive representation of this data please check out an open source tool I've published: [Unity Size Explorer][3].


<figure class="medium">
    <a href="https://github.com/aschearer/unitysizeexplorer/raw/master/Examples/Screenshot1.PNG">
        <img src="https://github.com/aschearer/unitysizeexplorer/raw/master/Examples/Screenshot1.PNG" alt="Unity Size Explorer visualizes and lets you interactively explore a Unity game's file size."/>
    </a>
    <figcaption>Unity Size Explorer visualizes and lets you interactively explore a Unity game's file size.</figcaption>
</figure>

### Using Unity to Reduce Asset Size
Unity provides a number of options to reduce final file size. Let's take a quick look at some of the options and their pros and cons.

#### Disable Mip Maps
To begin with, ensure that all your sprites which don't require mip maps have the feature disabled. Doing so will prevent an extra texture from being generated unnecessarily. There are no cons. Go ahead and make this change.

#### Use Spritesheets
Where appropriate take advantage of Unity's atlas packing. This will create one big texture for all the sprites with the same tag. **On some platforms a power of 2 texture will be allocated for every texture, so a 13x18 texture will be use the same memory as a 32x32 texture!** Using atlases is an easy way to avoid this problem. The only con for this feature is that you can't use it for sprites managed under `/Resources`.

#### Use Compression
Many formats support compression in Unity. Be aware that on mobile, textures need to be a power of 2 in order to be compressed. With that being said, in my experience a 16 mb texture can become a 4 mb texture with compression. The caveat, though, is the compressed texture will almost certainly have artifacts. For Tumblestone the artifacts were so bad we ended up disabling compression on many textures.

#### Clamp Textures Using Max Size
You can configure Unity to "clamp", that is shrink, textures over a certain size by platform. For example, for mobile platforms you could clamp max size to 1024x1024. Like the last option, the risk here is unpredictable or unsatisfactory results. In my experience, I could do a better job resizing the textures than Unity.

### Conclusion
I recommend starting the process by exporting a build of your game and opening the log file in the Unity Size Explorer. Write down the game's size somewhere and note it as the file size baseline. Use the explorer to identify good candidates for size reduction, uncheck them to see what kind of savings to expect. Then make a change -- ideally one thing at a time -- and re-export a build. Open the new log file and compare your estimate with reality. Record the results in your notebook along with a description of the change. If the results are good, commit them. If not, undo them. Keep iterating in this manner until you've exhausted the low hanging fruit and tried the different options Unity provides. For many games that may be all you need. But if not check out the rest of the series. Best of luck!

{% include unity-file-size-footer.html %}

[1]: https://tumblestonegame.com
[2]: https://docs.unity3d.com/Manual/LogFiles.html
[3]: https://github.com/aschearer/unitysizeexplorer