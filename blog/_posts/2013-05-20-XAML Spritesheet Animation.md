---
layout: post
title: "XAML and Game Development: Spritesheet Animations"
description: Examine how to animate a spritesheet using XAML for Windows 8. Source code included.
category: Making Games
author: Alex Schearer
slug: xaml-spritesheet-animation
---

Last time I showed you how to move images 
across the screen using the [Canvas control](http://msdn.microsoft.com/en-us/library/system.windows.controls.canvas.aspx). 
Just this technique allows you to create a lot of the elements in a game. That 
said you may want more dynamic, animated artwork in your game. In that case using 
spritesheets to animate your in-game elements is a good choice. By default Windows 
8 and XAML do not provide any support for spritesheets, but with a little ingenuity 
it's possible to create the desired effect.

A spritesheet is a collection of artwork, typically for the same character or in-game 
element, which has been organized into a series of columns and rows. Often, you will 
maintain some metadata about the spritesheet either explicitly in, say, a XML file or 
by convention. For example, how many columns and rows the spritesheet contains, where 
a given animation starts and ends, the frame rate, and so on. One compelling reason to 
use a spritesheet is it allows you to load multiple animations or states in a single 
file operation. This means you don’t have to create multiple Image controls and deal 
with latency when opening images for the first time. Here’s an example spritesheet 
from my game Adlib:

<figure>
    <a href="/img/posts/2013-05-20-XAML Spritesheet Animation/scared-owl-spritesheet.png">
        <img src="/img/posts/2013-05-20-XAML Spritesheet Animation/scared-owl-spritesheet.thumb.png" alt="Owl spritesheet used in Adlib"/>
    </a>
    <figcaption>Owl spritesheet used in Adlib</figcaption>
</figure>

The principle behind a spritesheet is that you will only ever draw a subset of the 
larger image &ndash; a single frame. By offsetting the subset you draw over time you can 
flip through each image in the spritesheet. Using XAML you typically use the Image 
control to draw something to the screen. However the Image control does not support 
drawing a subset of the image with an offset, so it is not suitable for animations. 
Instead you must use the [ImageBrush](http://msdn.microsoft.com/en-us/library/system.windows.media.imagebrush.aspx):

~~~ xml
<Rectangle Width="100" Height="150">
    <Rectangle.Fill>
        <ImageBrush ImageSource="/Images/OwlSpritesheet.png" 
                    Stretch="None"
                    AlignmentX="Left" 
                    AlignmentY="Top">
            <ImageBrush.Transform>
                <TranslateTransform x:Name="SpriteSheetOffset" X="0" Y="0" />
            </ImageBrush.Transform>
        </ImageBrush>
    </Rectangle.Fill>
</Rectangle>
~~~

The ImageBrush draws an image across the background of other controls. In this 
case I've applied an image brush to a rectangle. Note that the rectangle's width 
and height have been set to match the width and height of a frame in the spritesheet. 
Changing the TranslateTransform will update the image's offset and draw a new frame. 
Let's take a look at how to do this using code:

~~~ csharp
private void OnUpdate(object sender, object e)
{
    this.timeTillNextFrame += TimeSpan.FromSeconds(1 / 60f);
    if (this.timeTillNextFrame > TimePerFrame)
    {
        this.currentFrame = (this.currentFrame + 1 + NumberOfFrames) % NumberOfFrames;
        var column = this.currentFrame % NumberOfColumns;
        var row = this.currentFrame / NumberOfColumns;

        this.SpriteSheetOffset.X = -column * FrameWidth;
        this.SpriteSheetOffset.Y = -row * FrameHeight;
    }
}
~~~

For this animation I cycle through each frame spending looping back to the beginning 
after reaching the end. In lines 7 and 8 I calculate the offset column and row for the 
current frame. Then I multiply these values by the frame's width and height, 
respectively. Notice that I use negative values for SpriteSheetOffset. This is because 
I am shifting the underlying image not the rectangle being used to crop it. Putting 
these two together we have our animation:

<figure>
    <iframe width="512" height="288" src="http://www.youtube.com/embed/3iMMEOdcsIw" frameborder="0" allowfullscreen></iframe>
    <figcaption>The owl animated using XAML and C# on Windows 8</figcaption>
</figure>

Well there you have it. Using this technique it's possible to create animations 
using spritesheets for Windows 8. It's easy to imagine extending this solution to 
support atlases, too.

[Source code for the examples in this post.](https://gist.github.com/aschearer/5606865)

{% include windows-8-dev-footer.html %}