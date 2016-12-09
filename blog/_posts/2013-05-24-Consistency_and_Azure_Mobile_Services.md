---
layout: post
title: "Storing Game Data in the Cloud: Keeping Data Consistent"
description: You're using Azure Mobile Services to persist your data but things are denormalized. How do you keep data consistent? Find out how. Source code included.
category: Making Games
author: Alex Schearer
slug: consistency-and-azure-mobile-services
---

Last time we looked at how you could [persist your game data using Azure Mobile Services]({%post_url blog/2013-05-22-Azure_Mobile_Services_Game_Data %}). 
Because Azure Mobile Services is a NoSQL data store I recommended that you denormalize 
your data in order to reduce the number of requests needed to fetch things on the 
client. All well and good, but this decision has a consequence. Namely, how do you 
keep the duplicated data up to date?

Before continuing, have a look at the data on the server. Notice that we've duplicated 
the players' names into the games table. This allows you to fetch all the needed 
information for a game in a single query, but if the a player updates her name the 
games table will be out of date.

<figure class="full-size">
    <img src="/img/posts/2013-05-24-Consistency and Azure Mobile Services/denormalized-game-data.png" alt="Denormalized Game Data Stored in Azure"/>
    <figcaption>Denormalized Game Data Stored in Azure</figcaption>
</figure>

So how do you keep your data consistent? For Scramble Legends I evaluated three options:

  1. Run a CRON job or worker thread on the server. Have it test for inconsistencies and fix them
  2. Test for inconsistency on the client or server and update accordingly
  3. Update the game data when updating the player data

### Fix Inconsistency over Time
The first option I considered was to create a second process responsible for 
dealing with inconsistencies &ndash; be it a CRON script, a worker thread, or a queue 
containing a list of objects to update. Azure Mobile Services makes it relatively 
easy to write CRON scripts using JavaScript and the rest of Azure has the tools 
necessary to do more complex stuff using C#.

For write-heavy games this solution is very practical. The writes won't carry any 
extra overhead trying to keep things consistent, and you can always add more CRON 
jobs or worker threads as your workload grows. As long as your game can deal with 
a little inconsistency, e.g. the player's name being out of date before the CRON 
script has run, then there's a lot to like.

With all that said I opted against this approach for Scramble Legends. While I 
think using a queue and worker thread to track and propagate changes makes sense 
for busier applications I wanted to avoid the cost and overhead associated with 
developing and running them. In reality this approach will require you to write 
more and more error-prone code, so I would save it for later when you have proven 
your game needs the extra performance.

### Fix Inconsistency on Read
Next I considered detecting inconsistencies when reading game data and updating the 
game table as necessary. Honestly, this is a terrible solution. In practice it would 
require querying the player table every time the game data is read &ndash; the entire 
reason we denormalized the data was to avoid this query! Furthermore, in the event 
of an inconsistency three queries would need to be made: one to load the game data, 
one to load the player data, and one to update the game data. Each new query 
increases the likelihood for something to go wrong. The goal is to reduce the 
chances for failure and the number of queries as much as possible, so this option 
is a non-starter.

### Fix Inconsistency when Updating the Player
Despite its drawbacks the last option got me thinking: if fixing things on read is 
too expensive what about on write? Using Azure Mobile Services it's possible to 
write a script which runs whenever the player data is updated. At that point it's 
very likely the player's game data will become inconsistent, so why not proactively 
update it? For Scramble Legends this is the approach I took. What's more you can 
have the script return control to the client as soon as the player is updated and 
then update the player's games without blocking the UI:

~~~ javascript
function update(item, user, request) {
    var gamesTable = tables.getTable('GameData');
    request.execute({
        success: function(result) {
            // Asychronously update games the player is part of
            gamesTable.where(function(player)
                            {
                                return this.OwnerId == player.PlayerId || 
                                       this.OpponentId == player.PlayerId 
                            }, item)
                      .read({
                success: function(games) {
                    games.forEach(function(game) {
                        if (game.OwnerId == item.PlayerId) {
                            game.OwnerName = item.Name;
                            game.OwnerAvatar = item.AvatarType;
                        } else {
                            game.OpponentName = item.Name;
                            game.OpponentAvatar = item.AvatarType;
                        }
                        
                        gamesTable.update(game);
                    });
                }
            });
            
            // Respond to the player immediately so the UI isn't blocked
            request.respond();
        }
    });
}
~~~

### Wrapping Up
There are a number of ways to keep your game's data consistent. Which one is best depends 
on the profile of your game. In my opinion it's safe to start with the simpler, less 
optimized approach I took for Scramble Legends and then upgrade to a more robust, scalable 
solution when you have proven there’s a market for your game.

[Source code for the example in this post.](https://gist.github.com/aschearer/5642193)

{% include windows-8-dev-footer.html %}