---
layout: post
title: "Storing Game Data in the Cloud: Azure Mobile Services or Cloud Storage"
description: Azure offers two services to store your game's data in the cloud. Learn about them both and decide which one will work best for you.
category: Making Games
author: Alex Schearer
---

Early on I decided to use Azure. First because I was using .NET and the tooling support is great. 
Second because I am a BizSpark member and have some free Azure resources. And third because I did 
not want to mess around withservers or other infrastructure but still wanted to know my game could 
scale on demand. Having decided to use Azure, I still needed to determine how to persist 
[Scramble Legend's]({{site.url}}/scramble-legends) data. Two solutions stood out: Azure Mobile Services 
and Azure Cloud Storage. 

Azure Mobile Services provides a set of tools intended to address common app developer 
problems. For example, it has an API to authenticate players with Facebook, Microsoft, 
or Google. It also has an API to facilitate sending push notifications to Windows 8 
computers. Loading and storing objects in Azure Mobile Services is very basic. You 
define a <abbr title="Plain Old C# Object">POCO</abbr> and then use their API to perform 
<abbr title="Create, Retrieve, Update, Delete">CRUD</abbr> operations. What's more, Azure 
Mobile Services will only serialize basic types &ndash; no enums, no guid, and certainly 
no object relations. Finally, Azure Mobile Services allows you to write scripts to 
hook into CRUD events and do things like update other tables, send notifications, or 
log something. So what's the downside? Cost and maturity. Azure Mobile Services is more 
expensive than the more basic Cloud Storage. It's also much newer &ndash; still in beta 
as of writing this &ndash; and there are some rough edges.

<figure class="small">
    <a href="http://www.windowsazure.com/en-us/develop/mobile/">
        <img src="{{site.url}}/img/posts/2013-05-10-Azure Mobile Services or Cloud Storage/azure-mobile-services.jpg" alt="Azure Mobile Services tries to solve common app developer problems"/>
    </a>
    <figcaption>Azure Mobile Services tries to solve common app developer problems</figcaption>
</figure>

Azure Cloud Storage is a collection of storage systems which allow you to load and store 
data. For our purposes there are two types of storage that are interesting: blobs and 
tables. Despite its name, table storage is non-relational. In practice using table 
storage is a lot like using Azure Mobile Service for persistence. Blob storage is more 
flexible as you are storing a binary array. In practice I have found blob storage to 
be much more useful. When used in conjunction with the [DataContractSerializer](http://msdn.microsoft.com/en-us/library/system.runtime.serialization.datacontractserializer.aspx) 
it is easy to load and store objects or even object graphs. That said there is no connection 
between blobs except by your own convention, so going this route means you will have to 
do more work to support anything beyond reading and writing. In particular if you want 
to send push notifications, authenticate players, or any of the other things that Azure 
Mobile Services provides you will have to create your own service.

<figure class="small">
    <a href="http://www.windowsazure.com/en-us/manage/services/storage/">
        <img src="{{site.url}}/img/posts/2013-05-10-Azure Mobile Services or Cloud Storage/azure-cloud-storage.jpg" alt="Azure Cloud Storage provides a cheap and easy way to load and store data"/>
    </a>
    <figcaption>Azure Cloud Storage provides a cheap and easy way to load and store data</figcaption>
</figure>

So which one is right for you? In my opinion, Azure Mobile Services is the better choice. 
Most game developers are not web developers, and most games need authentication, 
notifications at the very least. So if the choice is between spending a 
great deal of time reinventing the wheel with Azure Cloud Storage or paying a bit more 
for Azure Mobile Services I would recommend the later every time.

{% include windows-8-dev-footer.html %}