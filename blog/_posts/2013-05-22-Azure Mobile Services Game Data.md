---
layout: post
title: "Storing Game Data in the Cloud: Using Azure Mobile Services"
description: Learn how to persist your game data in the cloud using Azure Mobile Services.
category: "Making Games"
author: Alex Schearer
slug: azure-mobile-services-game-data
---

Previously I [recommended using Azure Mobile Services]({%post_url 2013-05-10-Azure Mobile Services or Cloud Storage %}) 
to store your game's data in the cloud. Azure Mobile Services is a collection of tools 
from Microsoft which attempt to solve common problems developers face when building 
apps. Chief among them is the ability to persist data cheaply in the cloud. In this 
post I'll detail how [Scramble Legends](scramble-legends) uses Azure 
Mobile Services to store its data, what problems I ran into, and how you can work around 
them for your game.

### Recording a Game
Every game in Scramble Legends starts with a seed for the random number generator &ndash; 
this is mainly used to generate the letters. Once the simulation is running it updates 
sixty times per second. Whenever you select or move a tile you create a new instruction. 
Instructions record what action you took and when you took it relative to the start of 
the simulation. To resume or replay a game you create a new simulation using the game's 
seed and advance through the recorded instructions. Two simulations with the same seed 
and instructions will always arrive at the same game state. To sum up:

  1. Ensure all randomness derives from a single random number generator
  2. Record any initial state particularly the random number generator's seed
  3. Settle on a fixed time step to update your simulation
  4. Record every action the player can take to modify the simulation

As long as your game's simulation is deterministic you can use this set up, too. Not 
only does it allow you to record and view replays but it is also a great tool for 
debugging purposes!

### In a Normal World
Given the way simulations work in Scramble Legends, there are three data types which 
need to be persisted: the players, games, and instructions.

<figure>
    <img src="{{site.url}}/img/posts/2013-05-22-Azure Mobile Services Game Data/data-objects.png" alt="Outline of the data objects in Scramble Legends"/>
    <figcaption>Outline of the data objects in Scramble Legends</figcaption>
</figure>

If I were using a SQL database I would map these objects to three tables:

<figure>
    <img src="{{site.url}}/img/posts/2013-05-22-Azure Mobile Services Game Data/sql-table.png" alt="Mapping the data objects to SQL tables"/>
    <figcaption>Mapping the data objects to SQL tables</figcaption>
</figure>

With this set up the data is normalized &ndash; that is there is no duplication of data 
in any given table. To query a player's games you would join the players and games 
tables using the foreign key's in the games table. However there's a problem with this 
solution, Azure Mobile Services does not support joins!

### In a NoSQL World
In practice, Azure Mobile Services is a NoSQL data store. What this means is you cannot 
perform joins nor capture relationships between objects in your database. As a 
consequence it's up to you to figure out how you will get the data you need at 
runtime as well as keep data consistent when changes occur. For Scramble Legends I 
evaluated three possible solutions:

  1. Use a server side script to join the data
  2. Execute multiple requests on the client and join the data
  3. Denormalize the data stored on the server

#### Join on the Server
Azure Mobile Services lets you write scripts using JavaScript which run before 
processing a request from the client. It's possible to write a script which intercepts 
a request for the games table and instead queries data from the games and players 
tables, joins the data, and then returns the results. In my opinion this 
is not a great solution.

First, it requires multiple server calls. Whenever you make a server call you raise the 
chances for something to go wrong. Granted these calls take place on the server and not 
the client, which is a small improvement. Nonetheless, I want to keep the number of 
server calls my games make to a minimum. 

Second, it requires writing a lot of complex JavaScript to run on Azure Mobile Services. 
In practice, it's quite difficult to debug scripts in Azure Mobile Services and I'm not 
a big fan of writing error prone JavaScript. About the only thing going for this option 
is that your data remains normalized.

||Requires Multiple Server Calls on Client?|Requires Multiple Server Calls on Server?|Requires Writing Scripts?|Data is Denormalized?
Join on the Server|&#9786; No|&#9785; Yes|&#9785; Yes|&#9786; No

#### Join on the Client
Much like the last option, you could write query for a list of the players and games on 
the client and then join the data there. This option has the advantage that the 
complicated code would be written in C# and debugged using Visual Studio. However it 
still requires multiple server calls. Worse they're on the client now which means 
they're even more likely to fail due to spotty internet connections or lost signals.

||Requires Multiple Server Calls on Client?|Requires Multiple Server Calls on Server?|Requires Writing Scripts?|Data is Denormalized?
Join on the Server|&#9786; No|&#9785; Yes|&#9785; Yes|&#9786; No
Join on the Client|&#9785; Yes|&#9786; No|&#9786; No|&#9786; No

#### Denormalize the Data
Finally you could simply give up on keeping your data separated. If you duplicate 
the players' data in the game table you no longer have to join data from multiple 
tables to get everything you need. A single query of the games table is all that is 
required:

||Requires Multiple Server Calls on Client?|Requires Multiple Server Calls on Server?|Requires Writing Scripts?|Data is Denormalized?
Join on the Server|&#9786; No|&#9785; Yes|&#9785; Yes|&#9786; No
Join on the Client|&#9785; Yes|&#9786; No|&#9786; No|&#9786; No
Denormalize the Data|&#9786; No|&#9786; No|&#9786; No|&#9785; Yes

This works but now you have duplicated the player's name and avatar in your database. 
What happens if a player changes his avatar after a game has been created? This approach 
introduces the problem of consistency &ndash; something we’ll look at next time.

### Wrapping Up
Many games can be reduced to three basic data types: player data, game starting state, 
and instructions mutating the simulation at runtime. Using Azure Mobile Services it's 
easy to load and store individual objects in the cloud. However managing relationships 
between objects is more complicated, in particular because joins are not supported. To 
work around these limitations it's necessary to choose between runtime performance and 
fault tolerance or storage space and consistency. In my opinion the best bet is to have 
a snappier, less error prone game by denormalizing data.

{% include windows-8-dev-footer.html %}