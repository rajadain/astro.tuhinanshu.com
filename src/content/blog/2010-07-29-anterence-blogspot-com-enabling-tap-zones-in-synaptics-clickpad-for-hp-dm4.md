---
title: Enabling Tap Zones in Synaptics ClickPad for HP dm4
postSlug: anterence-blogspot-com-enabling-tap-zones-in-synaptics-clickpad-for-hp-dm4
date_published: 2010-07-29T22:42:00.000Z
date_updated: 2021-02-28T01:05:28.000Z
tags:
  - archive
  - anterenceblogspotcom
---

I recently bought the new [HP dm4](http://h20424.www2.hp.com/campaign/hpshowcase/ap/en/hp-dm4.html), and I love everything about the laptop, except the sound and the newly styled “ClickPad”. The sound is a little tinny and the crotch speakers don’t help.![](http://www.blogcdn.com/www.engadget.com/media/2010/05/hppavilionhands-on05.jpg) For those who wonder, a “ClickPad” is a touchpad with buttons integrated into the pad.

This picture from the [Engadget gallery](http://www.engadget.com/photos/hp-pavilion-dm4-dv5-dv6-dv7-hands-on/#2948423) shows the ClickPad on my dm4. You can see how the left and right buttons are integrated into the pad. The top left features an LED which glows orange when you tap it twice, indicating that the ClickPad has been disabled.

My feelings towards this new interface were mixed, coming from my 3 year long trusted companion, the Dell Inspiron 1420. The ClickPad introduced many new features of multi-touch, including Pinch Zoom (although it is not quite as smooth as Apple) and the wonderfully liberating Chiral Scrolling (also known in some circles as Circular Scrolling).

But one of my favorite features – middle-clicking, which I used extensively for tab handling in browsers and editors such as [Notepad++](http://notepad-plus-plus.org/) – was missing. Not only did pressing the middle line cause only left-click to register, but pressing both sides with two fingers caused first a left-click and then a right-click, but never both which is needed to simulate a middle-click.

Also, right clicking was a big hassle. Because the surface of the button itself is part of the ClickPad, touching it causes the cursor to move and hence I would frequently right-click elsewhere, losing my initial target.

I decided to search for a solution which might fix my otherwise beautiful and outstanding machine, and it was in such a search that I discovered Tap Zones.

However, the Tap Zones feature was not visible on my Synaptics Settings Menu, which can be opened via right-clicking the ‘Synaptics Pointing Device’ icon in the System Tray, going into the ‘Device Settings’ tab and clicking on ‘Settings…’. I uninstalled my HP OEM driver and installed the [generic driver from the Synaptics website](http://www.synaptics.com/support/drivers). While that did enable the tap zones, it disabled my OEM specific behavior, namely the Disable ClickPad option. Not only that, but the ClickPad-is-off LED was permanently burning a bright orange. Not what I wanted.

So I uninstalled that and got my old driver back, and went registry hunting. I am glad to say that I found the answer.

#### Open regedit.exe and navigate to ‘HKEY_LOCAL_MACHINE \ SOFTWARE \ Synaptics \ SynTPCpl \ Controls \ 7Tapping \ Tap Zones’, delete the key ‘Visibility’, and reboot. That’s it.

[![](http://3.bp.blogspot.com/_nuMPY0uK_OE/TJ10pHKVjdI/AAAAAAAAABw/Kkbf20SBQQo/s200/clickpad.png)](http://3.bp.blogspot.com/_nuMPY0uK_OE/TJ10pHKVjdI/AAAAAAAAABw/Kkbf20SBQQo/s1600/clickpad.png)
Now, I have the following tap zones: top right for middle-click, and a big fat bottom right for right-click. So now I can right-click with just tapping the right button, and middle click as well. I don’t have anything set for the bottom left, but you can do that as well.

You might notice that the top left option isn’t visible. That’s because its been hidden so that you don’t mess around with a spot which is reserved for the Disable ClickPad area. But if you really want to mess with it, go to ‘HKEY_LOCAL_MACHINE \ SOFTWARE \ Synaptics \ SynTPCpl \ Controls \ 7Tapping \ Tap Zones \ Top Left Action’, delete the key ‘Visibility’, and reboot.

This really made my dm4 experience much better, and I just wanted to share it. Even though [some people](http://www.engadget.com/2010/06/15/hp-pavilion-dm4-review/) might think its not a good laptop, take it from me: it was the best option on June 19th 2010 (when I bought it), and it still is a darn good machine.

#### UPDATE

Commentor Joel [points out](http://anterence.blogspot.com/2010/07/enabling-tap-zones-in-synaptics.html?showComment=1300023525759#c790964521476466339) that one doesn't need to reboot, simply restart the Synaptics Control Center. Try it.

The original post can be found here: [https://anterence.blogspot.com/2010/07/enabling-tap-zones-in-synaptics.html](https://anterence.blogspot.com/2010/07/enabling-tap-zones-in-synaptics.html)
