---
layout: post
title: "How to Reduce a Unity Game's File Size: Part 2"
description: "A moderately complex solution appropriate for games on mobile and desktop."
category: "Making Games"
author: Alex Schearer
slug: reducing-unity-game-size-separate-assets
comments: true
---

## Moving Assets Outside Unity
When we started work on Tumblestone for mobile phones it was quickly apparent that the art needed for Xbox One didn't make sense on an iPhone. For consoles we had many, many 1920x1080 sprites for the game's backgrounds and story. On the phone the story takes place in a much smaller viewport. Likewise, players see much less of each background on their phones. For Tumblestone, clamping or compressing these textures didn't yield enough savings. The time had come to maintain parallel versions of artwork for each platform.

Conceptually, this solution is simple. You maintain one set of art for, say, mobile platforms and a second set for consoles and desktop. The art and corresponding Unity meta file lives outside the Unity project, and before you open the project you use scripts to copy everything into Unity.

For Tumblestone we have a system of editor scripts to do just that, and this has allowed us to separate our art assets for mobile and desktop. So why shouldn't every game do this?

#### Switching platforms requires all the artwork to be reimported. 
This is very slow. In Tumblestone we have hundreds of 1920x1080 textures -- worse, 2048x2048 textures for compression purposes -- so switching from desktop to mobile is very slow.

#### Changing art is much harder. 
You now have two copies of art, and by definition at most one copy is present in Unity at any time. So if you want to change the pixel to unit ratio of all your artwork you must import each set of art, make changes, then copy the results to the external location.

#### Two copies means twice the work. 
Every time you want to edit a file you have to edit its sibling. The more the two copies diverge the more of a headache this becomes.

#### More bookkeeping is required. 
It's easy to forget to add an asset to both sets of art. Everything must be done in twos and you won't get a build error when something goes wrong.

### Conclusion

With that being said, this solution does offer the potential for significant savings. Swapping a 2048x2048 texture for a 1024x1024 one is a 75% reduction in file size! If you identify many such cases in your project it may be worth the added overhead, and compared to the next technique in the series this solution is conceptually and technically relatively simple -- plus you can continue using Unity to manage your art assets like before.

But if this approach isn't sufficient there are still a few options on the table. The details of which I cover in more detail in the final post in the series.

{% include unity-file-size-footer.html %}