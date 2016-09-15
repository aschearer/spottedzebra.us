---
layout: post
title: "Making of Scramble Legends: Attack Design"
description: Learn how Spotted Zebra designed player attacks in Scramble Legends. Scramble Legends is a social, turn based word game for Windows 8. Spell words to bury your opponent in letters!
categories: ["Making Games", "Scramble Legends"]
author: Alex Schearer
---

Having decided
that you would interact with your opponent by
dropping letters on her board the question became
how? Different answers to this question resulted in 
very different gameplay and not all of them being equal. 
When designing the attack system in Scramble Legends 
I had three goals in mind:

  * Reward skillful play, in particular reward you for spelling longer words
  * Encourage thinking ahead and force you to make trade-offs
  * Ensure that a match ends in a reasonable number of turns

With these goal in mind, I tried a number of
variations before settling on the final solution.

### Attack on Level Complete
Because Scramble Legends started its life as Adlib,
it initially featured many of Adlib's gameplay
elements. At the time Scramble Legends still
sported the concept of score and levels &ndash; you
would reach a new level based on your score, and at
the end of each level your board would be reset. At
that time, I felt that completing a level was a
natural opportunity to drop letters on your
opponent. It turns out I was totally wrong!

When you play Scramble Legends you clear a level
every few minutes &ndash; completing more than one
per a turn was rare. As a result with this attack
scheme you would only drop letters on your opponent
every two or three turns. In practice, matches
dragged on too long and also lacked a sense of
excitement.

That wasn't the only problem, either. Tying attacks
to level completion gave you zero control over the
power of your attacks. Playing well simply meant
clearing levels as quickly as possible &ndash; each
time dropping a set number of letters on your
opponent. In Scramble Legends I want you to play
skillfully and plan ahead in order to dominate your
opponent &ndash; dropping letters on level complete
failed to encourage this style of gameplay.

### Attack for each Word
Having given up on level completion in large part
due to its poor feedback loop I started looking for
events which happened more frequently. Naturally
word completion jumped to the top of the list.
Spelling words is the main activity in Scramble
Legends and scales for various skill levels.
Initially I tried dropping as many letters as you
removed with each word. So spelling a five letter
word dropped five letters on your opponent. As you
might imagine that proved to be much too powerful
and games typically ended in one or two turns. 

<figure>
    <img src="{{site.url}}/img/posts/2013-04-29-Scramble Legends Attacks/almost-full-board.thumb.jpg" alt="An almost full board in Scramble Legends"/>
    <figcaption>An almost full board in Scramble Legends</figcaption>
</figure>

Next I tried dropping a single letter for each word
you spelled. In a typical turn you might spell
eight or ten words thus dropping roughly one row's
worth of letters on your opponent. While this
change was on the right track I found it was still
too powerful. If you went first you could easily
fill up your opponent's board with many letters
overwhelming her when she started her turn.  In
addition, I found matches tended to settle into a
kind of equilibrium between you and your opponent.
You would start a new turn with a packed board,
spell many words to clear your board, and fill your
opponent's boards in the process &ndash; but all
the while neither you nor your opponent would pull
ahead.

### Attack with Bonus Letters
With the last attempt I felt I was on to something.
However the balance was not quite right and as a
result matches tended to feel never ending. So I
tried to tweak the available variables to get a
better result. I could vary the strength of an
attack by:

  * Whether the word is part of a chain reaction
  * Using bonus letters
  * Word’s score

Because I decided to drop score from the game
entirely the third option was off the table. As a 
result, the purpose of bonus letters was in
doubt. Before they multiplied a word's score, but
what now? Make them responsible for attack strength
of course! Furthermore, by combining multiple bonus
letters in a single word you can multiply the power
of your attack. This provides a great opportunity
to plan ahead and unleash a super powerful attack.

<figure>
    <img src="{{site.url}}/img/posts/2013-04-29-Scramble Legends Attacks/attack-strength-chart.jpg" alt="Analysis comparing different power levels for one or more bonus letters in a word."/>
    <figcaption>Analysis comparing different power levels for one or more bonus letters in a word.</figcaption>
</figure>

When I started working on Scramble Legends I really
lacked a clear picture of how you would interact
with your opponent. The target emotions I wanted 
Scramble Legends to evoke acted as a guide and helped 
direct my design. In the end, Scramble Legends is all 
about hectic, skillful competition with your friends!

{% include scramble-legends-footer.html %}