---
layout: post
title: "XAML and Game Development: Using Canvas to Animate Images"
description: Examine how to animate a sprite using XAML for Windows 8. Source code included.
category: Making Games
author: Alex Schearer
---

When working with XAML to develop a game for 
Windows 8 the first question most of you will ask is, how do I animate a sprite 
on-screen? The best answer is to use a [Canvas control][1]. 
In this post we’ll take a look at how to accomplish this.

### Getting Started

With the canvas control you can position elements relative to the canvas' top left 
corner. To start add the canvas to your page:

~~~ xml
<Grid Background="{StaticResource ApplicationPageBackgroundThemeBrush}">
    <Canvas></Canvas>
</Grid>
~~~

By default the canvas will expand to fill its parent's available space. There 
are two ways to add some sprites to the canvas. If you have a fixed number of 
sprites the simplest approach is to add them to the canvas statically &ndash; hiding 
the ones you do not want visible at the start of the game.

~~~ xml
<Grid Background="{StaticResource ApplicationPageBackgroundThemeBrush}">
    <Canvas>
        <Image Source="/Images/Ball.png" Canvas.Left="20" Canvas.Top="200" />
        <Image Source="/Images/Ball.png" Canvas.Left="20" Canvas.Top="300" />
        <Image Source="/Images/Ball.png" Canvas.Left="20" Canvas.Top="400" />
        <Image Source="/Images/Ball.png" Canvas.Left="20" Canvas.Top="500" />
    </Canvas>
</Grid>
~~~

In order to set an image's position you must set the properties Canvas.Top and 
Canvas.Left for the top and left properties respectively. Marking an element's 
Visibility as Collapsed will hide it from view. At the moment, this is what our 
game looks like:

<figure>
    <a href="{{site.url}}/img/posts/2013-05-18-XAML Sprite Animation/animating-with-canvas.png">
        <img src="{{site.url}}/img/posts/2013-05-18-XAML Sprite Animation/animating-with-canvas-thumb.png" alt="Our sprites positioned absolutely using the Canvas"/>
    </a>
    <figcaption>Our sprites positioned absolutely using the Canvas</figcaption>
</figure>

### Moving the Sprites

With everything drawing the next step is to start to move things on the screen. For 
games, you typically do this using code. If you used the GameTimer approach described 
in my [previous article][2] you can animate things using a typical game loop. For now, 
let's just use CompositionTarget. Rendering like so:

~~~ csharp
protected override void OnNavigatedTo(NavigationEventArgs e)
{
    CompositionTarget.Rendering += this.OnUpdate;
}

protected override void OnNavigatedFrom(NavigationEventArgs e)
{
    CompositionTarget.Rendering -= this.OnUpdate;
}

private void OnUpdate(object sender, object e)
{
}
~~~

When the player navigates to the page you register an event handler to the global 
event. CompositionTarget.Rendering fires once for each new frame. When the player 
navigates away we remove the event handler to reduce the CPU load and avoid memory 
leaks. In the event handler you can update each ball's position as you like. To do 
so you call Canvas.SetLeft and Canvas.SetTop:

~~~ csharp
Canvas.SetLeft(this.Ball1, this.ball1Velocity + Canvas.GetLeft(this.Ball1));
Canvas.SetLeft(this.Ball2, this.ball2Velocity + Canvas.GetLeft(this.Ball2));
Canvas.SetLeft(this.Ball3, this.ball3Velocity + Canvas.GetLeft(this.Ball3));
Canvas.SetLeft(this.Ball4, this.ball4Velocity + Canvas.GetLeft(this.Ball4));
~~~

Running the code, you'll see the balls move to the left according to their velocities. 
At this point you can animate the sprites using whatever logic and rules makes sense 
for your game. Check out the video to see it in action and be sure to download the 
full source code for this example below:

<figure>
    <iframe width="512" height="288" src="http://www.youtube.com/embed/CQAvv1UAeys" frameborder="0" allowfullscreen></iframe>
    <figcaption>Bouncing balls animated using XAML and C# for Windows 8</figcaption>
</figure>

Next time we'll take a look at [animating a spritesheet or a series of sprites][3] 
using XAML, so stay tuned!
                            
[1]: http://msdn.microsoft.com/en-us/library/system.windows.controls.canvas.aspx
[2]: {%post_url 2013-05-06-Writing a Windows 8 Game Loop%}
[3]: {%post_url 2013-05-20-XAML Spritesheet Animation%}