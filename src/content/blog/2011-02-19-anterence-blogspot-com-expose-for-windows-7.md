---
title: Exposé for Windows 7 (Updated with x64 version!)
postSlug: anterence-blogspot-com-expose-for-windows-7
date_published: 2011-02-19T07:34:00.000Z
date_updated: 2021-02-28T01:11:19.000Z
tags:
  - archive
  - anterence.blogspot.com
---

There are many things of Mac OS X that I find superfluous, contrarian (the window buttons on the wrong side), downright annoying even (task management). However, they do have many things that I wish Windows had. Right now I talk of one of from the latter group, namely [Exposé](http://www.apple.com/macosx/what-is-macosx/expose.html). In a recent video of Microsoft's new [Touch Mouse](http://www.microsoft.com/hardware/touch-mouse/) (the proper discussion of which probably requires a whole separate post), attached here, showcases similar functionality in response to a certain gesture. You can see the functionality at the 1:33 mark in this video:

This caught my fancy. After a quick Google search, I found [Switcher](http://insentient.net/Index.html), a handy little utility which offered the same functionality. I downloaded and installed it, and loved it. I especially liked the "type to search" feature while in the "exposed" state, which felt a lot like GnomeDo from Ubuntu. Now the one final thing I wanted to be able to do, was to "expose" the windows with my trackpad.

One pretty straightforward way to do this is to set a corner of the screen as a cue for this. A natural choice would be the bottom left corner, currently occupied with previewing the desktop. It's a feature I don't use much, and would probably not be missed when eliminated. However, I wanted a function closer to what happens in Mac OS X, and in the video. I wanted to use the multi-touch capabilities of my ClickPad to achieve the same.

Now, the Synaptics driver of my ClickPad does offer "Application Gestures", as is shown in the following screenshot:

[![](http://4.bp.blogspot.com/_nuMPY0uK_OE/TSfye_S-NfI/AAAAAAAAAB4/KWov6famKYY/s1600/main.png)](http://4.bp.blogspot.com/_nuMPY0uK_OE/TSfye_S-NfI/AAAAAAAAAB4/KWov6famKYY/s1600/main.png)

Unfortunately, there aren't a lot of configuration options allowed. The only thing I can set is what application (.exe / .bat) would be triggered, as shown here:

[![](http://2.bp.blogspot.com/_nuMPY0uK_OE/TSfy6Wc4-2I/AAAAAAAAAB8/5Cpr1Sz0c6s/s1600/secondary.png)](http://2.bp.blogspot.com/_nuMPY0uK_OE/TSfy6Wc4-2I/AAAAAAAAAB8/5Cpr1Sz0c6s/s1600/secondary.png)

So I set about looking for a way to make an exe which would simulate a keystroke. And, to my utter astonishment, after almost 3 hours of scouring the web I haven't found anything. I've tried the SendKeys method of .NET, AutoHotKey, and even studied some Windows Scripting (which I'm not familiar with at all), but have found no quick & easy way to do this. This shows how unusable our computers still are, and how much they leave to be desired. All I want to do is make an exe or a bat or any file which simply simulates some keystrokes, but to no avail.

If you know of a way this can be done, or any other way (I even looked at other Symantec driver options to see if any configuration allows other settings for application gestures, again with no success) to do this, I would be obliged to hear about it. In the meanwhile, I'll keep looking, and if I find a way to do this I will update this post with my solution.

So now I have a solution. I found this cool library, [Windows Input Simulator](http://inputsimulator.codeplex.com/),  which let me make a simple C# console application which simulates Windows + ~, which is the default shortcut to "expose" windows. You can download my package from [here](http://omescribe.com/ter/switcherHelper.zip). It has the Windows Input Simulator dll (required), and my switcher.exe file. Just make your Synaptics configurator point to that file in your system and enjoy Exposé for Windows 7!

UPDATE:

I've built a leaner, faster, 64-bit optimized version, that you can [get here](http://www.omescribe.com/ter/switcher_x64.zip).

The original post can be found here: [https://anterence.blogspot.com/2011/01/expose-for-windows-7.html](https://anterence.blogspot.com/2011/01/expose-for-windows-7.html)
