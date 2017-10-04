---
layout: post
title: "How to Reduce a Unity Game's File Size: Part 3"
description: "The nuclear options to reduce file size: Asset Bundles and binary compressed formats."
category: "Making Games"
author: Alex Schearer
slug: reducing-unity-game-size-asset-bundles-jpgs
comments: true
---

## Asset Bundles and Compressed Formats
Welcome to the third and final post in this series looking at reducing a Unity game's file size. At this point you've exhausted the built-in options Unity provides, and you've split your assets up by platform as appropriate. But your game is still too large. It's time for the nuclear option.

Tumblestone features a story mode with twelve worlds. Each world has four cutscenes with approximately six panels. Each panel is a 1920x1080 image. So the story mode has roughly 288 large images. After trying the techniques described earlier in this series, I still wasn't able to get Tumblestone's file size low enough. I needed a way to greatly reduce the story's file size without compromising the game's quality. Unity asset bundles are one solution to this problem. Using asset bundles it's possible to break off pieces of your game and download them later. This sleight of hand allows you to greatly reduce your game's file size -- at a cost of much greatly complexity and exposure to a new class of bugs.

### Unity Asset Bundles
An asset bundle is a collection of Unity assets which are packaged up into a special file. Unity knows how to download and access assets in this file -- much like accessing files under Unity's `Resources` folder. The access pattern is basically the same with one additional step: First you must download the asset bundle from a web server or the `StreamingAssets` folder.

For a mobile game, asset bundles are particularly helpful in the quest to reduce file size. This is because you can move assets your game doesn't immediately need out of the game and onto a server. From a file size perspective, this is effectively the same as deleting the assets from the game! On the other hand, now you must manage downloading and accessing these asset bundles, as well as handling what to do when a player attempts to access a part of a game which is dependent on an unavailable asset bundle. All of this means much more complexity and room for error. The other drawback is that managing asset bundles is cumbersome and poorly supported in Unity.

### Asset Bundles in Practice
In Tumblestone I left the artwork necessary for the first world and the three arcade modes intact. The rest of the assets I grouped per world and moved into eleven asset bundles. This had a big impact on the game's file size, but it meant rewriting a lot of asset management code. 

It was necessary to pre-download asset bundles so the player wouldn't have to wait to play a new world. I needed a way to detect when an asset bundle was missing and error UI to explain to the player what went wrong. And because the game wasn't built with asset bundles from the start, I had to refactor the way assets were accessed. All of these things took time, made things harder to use and understand, and opened up the possibility for bugs.

I also had to incorporate Unity's [Asset Bundle Manager][1], which provides a set of APIs to create and access asset bundles. It's a good starting point if you plan on leveraging the feature. In addition to runtime APIs it provides helpful tools to help make developing a game with asset bundles easier. For example, allowing you to have "fake" asset bundles during development.

### Variants
One other nice feature of asset bundles is the concept of a variant. For the iOS version of Tumblestone I wanted different resolution artwork for mobile phones and tablets. Labeling two assets as part of the same bundle but different variants allows Tumblestone to load the appropriate resolution artwork for each platform at runtime without modifying my resource access logic.

### Drawbacks
If asset bundles provide are such a powerful tool to reduce your unity game's file size, why not use them for every project? Here are some reasons to think carefully:

#### Creating Asset Bundles is Slow
When generating the eleven asset bundles for Tumblestone, I would kick the process off and go grab a long coffee. Asset bundles will put a damper on quick iteration time. The offline, "fake asset bundle" testing helps, but doesn't support variants.

#### Code Complexity and Bugs
As I outlined above everything gets more complex. Plus you must incorporate a third party library. More code and more problem cases means more bugs.

#### You Need a Server
While hosting asset bundles on something like AWS S3 isn't very complicated, it's another cost and something new to manage.

#### Poorly Documented
Asset bundles feel like a bit of an after thought to Unity. Maybe they're intended for much larger teams. Either way, you'll likely end up searching the forums for answers when things go wrong. Unity's documentation is lacking and there aren't very many people answering related questions out in the wild.

#### Using Variants Multiplies Your Artwork
If you use variants for, say, high and low resolution artwork you must now maintain multiple copies. If your bundles also include assets which don't change across variants you'll have to duplicate them, too. For example, in Tumblestone we have two variants for each world -- one for phones and one for tablets. The artwork in each asset bundle variant is sized differently. The bundles also contain the world's background music. Each bundle needs a copy of the music even though it doesn't vary per platform.

### Another Option: JPGs and PNGs
Finally I want to propose an alternative approach to asset management in Unity. While I didn't implement this in Tumblestone, I've used it in a prototype and verified it will work. One of the main problems with Unity's file size is that images are stored in a format suitable for consumption by the graphics card. Oftentimes this format is not very compressed at all. For example, on iOS a 2048x2048 texture which is not marked as compressed takes 16 mb! The same texture as a lossless PNG uses 4 mb and as a JPG uses under 1 mb.

If it's acceptable to make the player wait a bit longer to load assets, you could store your game's artwork as binary JPG or PNG files under `Resources`. These can be [loaded at runtime][2] and converted into something suitable for Unity.

This approach has a few drawbacks. Chiefly, you can no longer manage your art assets through Unity. No more dragging a sprite onto the scene or automatic atlas packing. It also means writing more code and doing things in a "not-Unity" style. Whether these tradeoffs are worthwhile is something to think about. If your game is not destined for mobile phones it may not be.

### Conclusion
When Tumblestone launched in 2016 it was roughly 1 gb on disk. In large part this was due to the game's lengthy story mode and high definition backgrounds. Fast forward a year and Tumblestone is now on mobile phones an order of magnitude smaller. In this series I've tried to shed light on how this dramatic reduction happened as well as share my process for achieving it. I hope that you've enjoyed the series and found applications for your own game. If you have questions or suggestions please don't hesitate to share them in the comments below.

{% include unity-file-size-footer.html %}

[1]: https://bitbucket.org/Unity-Technologies/assetbundledemo
[2]: https://docs.unity3d.com/455/Documentation/ScriptReference/Texture2D.LoadImage.html