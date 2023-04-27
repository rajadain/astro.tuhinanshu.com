---
title: Ubuntu Lucid, Karmic WPA / WPA2 WiFi Dropping Solved
postSlug: anterence-blogspot-com-ubuntu-lucid-karmic-wpa-wpa2-wifi-dropping-solved
date_published: 2010-10-08T04:54:00.000Z
date_updated: 2021-02-28T01:07:24.000Z
tags:
  - archive
  - anterence.blogspot.com
---

So I installed [Ubuntu 10.10 Maverick Meerkat beta](http://www.ubuntu.com/testing/maverick/beta) on my dm4 as soon as it came out, but after installing it I couldn't connect to my home WiFi (WPA2 Personal with AES/TKIP). Well, I could connect, but the connection would drop after every 30 seconds. Thinking that it's a beta problem, I installed that stable(r) [Ubuntu 10.04 Lucid Lynx](http://releases.ubuntu.com/lucid/), only to find the same problem. I knew that my router was okay as Windows 7 worked fine.

The connection was slightly better at my University, who used WPA2 Enterprise with AES and security certificates and whatnot (which I had to configure painstakingly as there was no easy or intuitive way to do this in Ubuntu). The connection would drop every 5 minutes at my University, but was still six times better than at my home.

After much searching, I found [this blog post](http://edtake.wordpress.com/2010/05/10/ubuntu-lucid-lynx-wireless-keep-dropping/), which told me to edit Network Manager System Settings Configuration file as follows:

sudo gedit /etc/NetworkManager/nm-system-settings.conf

And changed the value of [ifupdown] managed = false to true:

[ifupdown]
managed = true

The original post's author said that doing this reduced the frequency of the drops. For me, I guess it has dropped so much that I don't notice any drops at all while browsing and even while streaming video from Hulu and YouTube and such.
But while that worked for my University's connection, it still didn't help my home connection. Further searching revealed that this is [filed as a bug](https://bugs.launchpad.net/ubuntu/+source/network-manager/+bug/481432) in Ubuntu, and has been around since Karmic. I know it wasn't there before then as I had Intrepid on my old laptop and it worked perfectly with the same WiFi that I am using now.
However, further thinking forced me to realize that it's not the same connection. My old laptop used WiFi a/b/g, whereas with my new one I'm using WiFi n, so that probably made a difference. Furthermore, reading the long list of replies to that bug, I came across [suggestions](https://bugs.launchpad.net/ubuntu/+source/network-manager/+bug/481432/comments/37) that Ubuntu's Network Manager [did not support TKIP](http://techviewz.org/2009/06/how-to-configure-ubuntu-810-904-for.html). 

## So the way out of my problem was doing one of two things:
a) Uninstall network manager and install the Gnome-independent WICD, or
b) Switch my modem to AES only.
The first solution was suggested by a number of people in a number of blogs, but I didn't want to do it because I like it when everything integrates well with each other. Ubuntu's NM has been made to integrate with the OS, and I didn't want to break that intimate link as long as I could avoid it. So I went with the second option and switched to AES. Worked for me because my University (whose network policies I do not control) use AES too. However, I imagine that there are those who don't have the choice, and for them currently it seems that WICD is the only solution.
Now, I think that this is a bad move by Ubuntu. There should've been some explanation or documentation somewhere in the connection menu's or an error message or something to suggest that TKIP isn't completely or partially supported. But there wasn't. There's even a thread on Ubuntu Forums which deals with it (I don't have the link right now), and it's pretty heated up with everybody blaming each other. But, I guess these workarounds are all we have right now. Hope this helps someone.

## UPDATE: Wireless Woes Continue on Maverick Meerkat
Fools rush in. I know that. But I still installed Ubuntu 10.10 (released on the date that in binary is Adam's answer to life) anyway, and followed a dearth of issues.

Firstly, [my dear ClickPad](http://anterence.blogspot.com/2010/07/enabling-tap-zones-in-synaptics.html), which has always had problems in Ubuntu, stopped right-clicking. After a hellish half day in which I was also performing various pertinent deadline-constrained tasks on my crippled system, I found [this blog post](http://bigbrovar.aoizora.org/index.php/2010/10/10/how-to-enable-right-middle-click-on-clickpads-ubuntu-10-10/) which explains that the issue is a regression (that is a Software Engineering term for when a change in a new version breaks old functionality, precisely what is happening here since it was working on Lucid) and has been [reported as a bug](https://bugs.launchpad.net/ubuntu/+source/linux/+bug/582809). Meanwhile, the post offers a simple "walk around" which has worked for individuals using Envy 15 and 17, and me (HP dm4). Good luck with that.

Secondly, my WiFi has stopped working entirely. Well, not entirely, as it still works if I change my security to WEP, but that too is flaky. I uninstalled Network-Manager and installed WICD, which was option 1) above, but to no avail. I kept getting the error message: "bad password", whereas at times I would copy / paste the password from the modem control panel into the security dialog box. Clearly something deeper is going on here, since WICD is quite independent of surface Ubuntu. I haven't been able to find any reliable news on this though, so if you find anything let me know in the comments below.

Finally, I've also had a problem with Ubuntu not supporting switchable graphics, but a solution to that has emerged. Check out my next blog post for that.
The original post can be found here: [https://anterence.blogspot.com/2010/10/ubuntu-lucid-karmic-and-possibly.html](https://anterence.blogspot.com/2010/10/ubuntu-lucid-karmic-and-possibly.html)
