---
layout: post
title: "Making of Scramble Legends: Overdrive Mode"
description: Learn how Spotted Zebra designed Overdrive Mode in Scramble Legends. Scramble Legends is a social, turn based word game for Windows 8. Spell words to bury your opponent in letters!
categories: ["Making Games", "Scramble Legends"]
author: Alex Schearer
---

Scramble Legends rewards you for spelling 
longer words with additional time and bonus letters. When you combine multiple 
bonus letters in a word you unleash an extra powerful attack on your opponent. 
I'm quite happy with this gameplay as it encourages you to plan ahead and play 
well. That being said I wanted to reward you for spelling words quickly as well. 
To that end I created "Overdrive Mode".

Overdrive Mode is a special game mode in Scramble Legends. When you spell twelve 
words your board flips and you are presented with a word puzzle. Flipping the right 
letter will trigger bigger and bigger chain reactions! These chain reactions drop 
more and more letters on your opponent. 

<figure>
    <iframe width="512" height="288" src="http://www.youtube.com/embed/nyMXuGycfvs" frameborder="0" allowfullscreen></iframe>
    <figcaption>Overdrive Mode in action!</figcaption>
</figure>

In my opinion Overdrive Mode succeeds for a few reasons:

  * Rewards you for spelling words quickly
  * Adds additional variety and excitement to the game
  * Enables multiple play styles

That being said, creating Overdrive Mode was no easy feat. In particular it was 
challenging to randomly generate the puzzles. In particular, because words are 
automatically found and collected I needed to make sure that when a chain reaction 
started it did not form any unintended words. Accidental words would mess up the 
chain reaction down the line and ruin the puzzle! 

<figure>
    <a href="{{site.url}}/img/posts/2013-05-03-Scramble Legends Overdrive Mode/puzzle-algorithm.jpg">
        <img src="{{site.url}}/img/posts/2013-05-03-Scramble Legends Overdrive Mode/puzzle-algorithm.thumb.jpg" alt="The algorithm behind the word puzzle generator for Overdrive Mode" />
    </a>
    <figcaption>The algorithm behind the word puzzle generator for Overdrive Mode</figcaption>
</figure>

In the end I wound up writing a program which works backwards. I start with the 
final word in the chain reaction and push new words up underneath it one by one. 
Along the way I have to make sure there are no accidental words. As long as words 
are added at slightly different offsets the result will be a captivating chain 
reaction!

{% include scramble-legends-footer.html %}