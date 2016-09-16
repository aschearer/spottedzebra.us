---
layout: post
title: "Making of Scramble Legends: End Game Condition"
description: Learn how Spotted Zebra designed the game over condition in Scramble Legends. Scramble Legends is a social, turn based word game for Windows 8. Spell words to bury your opponent in letters!
categories: ["Making Games", "Scramble Legends"]
author: Alex Schearer
slug: scramble-legends-game-over
---

Scramble Legends
has evolved considerably since its inception. From
the get go I knew I wanted to make a game that
combined the core mechanic of [Adlib][1]
with competitive, multiplayer gameplay. Along the way, I
needed to figure out exactly how that would work in
practice.

Arguably the most important question I needed to answer
was what the end game condition should be. In Adlib
the game ends when letters overflow the top of 
your board. However I found when playing
against a friend that that condition took much too
long to occur. While it's acceptable in a single
player game for a play session to last thirty
minutes or an hour I felt that was too long for an
asynchronous multiplayer game. Ideally, I wanted a
match to last about fifteen or twenty minutes from 
start to finish.

### Pre-designed Limits

Limiting a play session to a given number of turns,
time, or score was an obvious way to achieve my
target game duration. You could play the game
as you did in single player, and compare your
performance with your opponent's at the end. 
This approach comes with a number of advantages:

  * Proven track record in games such as Wordament
  * Scales to support as many opponents as you want
  * Relatively easy to implement

<figure>
    <img src="{{site.url}}/img/posts/2013-04-24-Scramble Legends Game Over/wordament.thumb.png" alt="Wordament is a popular time limited word game" />
    <figcaption>Wordament is a popular time limited word game</figcaption>  
</figure>

All of that being said I opted not to go down this
route. Why? Because I wanted you to be able to
interact with your opponent and this end condition
encouraged a sort of solipsistic play style. With
Scramble Legends, I want to create a more intense
experience which a solitary play style can't deliver. 

### Bury your Opponent
Setting aside the previous idea and expanding on
the original end game condition, I asked myself,
what if you competed to bury your opponent
completely? I liked this idea right away first
because it dovetailed nicely with the original
Adlib and second because it opened up the
possibility for interesting interaction between you 
and your opponent. I also identified some other
benefits:

  * Emphasizes skillful play by putting end game condition in your hands
  * Gives you the satisfaction of actively beating your opponent
  * Opens up possibility for multiple play styles

All well in good, but how would you fill your
opponent's board? By spelling words of course! Or
at least that's what I thought. However it turned
out that balancing a player's attack strength was a
thorny design problem in its own right – but
that's a story we'll explore another time.

<figure>
    <img src="{{site.url}}/img/posts/2013-04-24-Scramble Legends Game Over/scramble-legends-full-board.thumb.jpg" alt="Game over in Scramble Legends" />
    <figcaption>Game over in Scramble Legends</figcaption>
</figure>

In the end, you try to bury your opponent in
Scramble Legends. I'm quite excited about this end
game condition and feel it offers the most skillful
and exciting gameplay.

{% include scramble-legends-footer.html %}

[1]: {{site.url}}/adlib