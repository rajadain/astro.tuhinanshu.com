---
title: Web Fonts Today — What You See is Not What You Get
postSlug: web-fonts-today-what-you-see-is-not-what-you-get
date_published: 2011-07-20T02:49:00.000Z
date_updated: 2021-05-18T01:53:26.000Z
tags:
  - archive
  - tuhinanshu.blogspot.com
  - thoughts
---

_The following is republished from my old blog [https://tuhinanshu.blogspot.com/2011/07/web-fonts-today-what-you-see-is-not.html](https://tuhinanshu.blogspot.com/2011/07/web-fonts-today-what-you-see-is-not.html). It is presented as is, with no modifications or changes. Any potentially controversial views presented herein are more than ten years old. Please do not cancel me for it._

---

Being an amateur typography enthusiast, I am very happy with the direction in which we are headed with Web Fonts. Not only does this provide me with some cool techniques for [a personal project](http://www.omescribe.com/), but also a better reading experience throughout the web. And as long as we can avoid the uglier fonts, the fact that better, more diverse, and modern typefaces are available is an all round good thing.

Except that it's not.
[![](http://1.bp.blogspot.com/-_bcw4v_12DE/TiY1BOkQHWI/AAAAAAAAAE8/xQrBhZBangI/s1600/bad-fonts-google.png)](http://1.bp.blogspot.com/-_bcw4v_12DE/TiY1BOkQHWI/AAAAAAAAAE8/xQrBhZBangI/s1600/bad-fonts-google.png)
Yeah, I don't think it's as *optimized *as you guys think.
[IM Fell English](http://www.google.com/webfonts/specimen/IM+Fell+English), the font above in blue, is _meant_ to look like that. This poster child is almost a tongue-in-cheek testament of the quality of web fonts today.

The problem with web font usage right now is not different from a fundamental issue of design and development: namely the gap between the designer / developer and the end-user. The closer they come together, the better they can understand the problem and find a more meaningful solution. Web font rendering isn't uniform across browsers. I'm sure there are people out there (much smarter than me) working on this as we speak.

The example we use here is the home page of [PressWork](http://presswork.me/), a handy framework over [WordPress](http://wordpress.org/) that offers a front end editing interface. They use [Quattrocento](http://www.google.com/webfonts/specimen/Quattrocento) from [Google Web Fonts](http://www.google.com/webfonts/) for both title and body text.

Designers, of course, work on Macs or other "superior" systems (pardon my cynicism) with the relevant fonts installed on their systems (so that they can work in Graphic Design programs with them), which render Web fonts like this:
[![](http://4.bp.blogspot.com/-tyJnIongC7U/TiYstHGRDZI/AAAAAAAAAE0/1DmTFtWRF50/s1600/bad-fonts-designer.png)](http://4.bp.blogspot.com/-tyJnIongC7U/TiYstHGRDZI/AAAAAAAAAE0/1DmTFtWRF50/s1600/bad-fonts-designer.png)
What the Designer Sees
Taken on Firefox 5 (which supports native smoothing) running on Windows 7 with Clear Type on and [GDI++](http://lifehacker.com/5190607/gdi%252B%252B-adds-os-x-font-rendering-to-windows) running and [Quattrocento](http://www.google.com/webfonts/specimen/Quattrocento) installed.

All content and design © [http://presswork.me](http://presswork.me/)

Their poor users, on the other hand, do not have [GDI++](http://lifehacker.com/5190607/gdi%252B%252B-adds-os-x-font-rendering-to-windows) installed on their systems, are more likely than not on Windows, and may be working on Chrome which [does not support DirectWrite, Windows' native font smoothing method](http://eligrey.com/blog/post/better-font-smoothing-in-google-chrome-on-windows). To them, even with ClearType and all the benefits of Windows font smoothing, it looks like this:
[![](http://2.bp.blogspot.com/-rsUB95XAtXU/TiYwx6AG9GI/AAAAAAAAAE4/M7STc9fMLSw/s1600/bad-fonts-user.png)](http://2.bp.blogspot.com/-rsUB95XAtXU/TiYwx6AG9GI/AAAAAAAAAE4/M7STc9fMLSw/s1600/bad-fonts-user.png)
What the User Sees

Taken on Chrome 13 beta (which does not support DirectWrite) running on Windows 7 with Clear Type on and no GDI++ and Quattrocento not installed.

All content and design © [http://presswork.me](http://presswork.me/)

The difference is stark, and painful, and unfortunately lost on the designer who is working in the former setup but for users who are on the latter. Therefore, just like it has been suggested that we [don't style HTML5 elements just yet](http://www.viget.com/inspire/html5-elements-irresponsible-choice-right-now/), I urge people to not use web fonts for their body text just yet.

Just to be clear here: I'm not calling out PressWork on their web design, which I think is just great except for that one thing. I have unfortunately seen numerous sites that fall prey to this mistake and this is just a recent example.

Some interesting afterthoughts:

- Google Web Fonts Download: Google needs to provide a simple way to download all web fonts that it supplies at one place. Until then, use this link: [http://joemaller.com/1856/download-google-fonts/](http://joemaller.com/1856/download-google-fonts/).
- Best font rendering set up in Windows: Use the [latest Firefox](http://www.mozilla.com/en-US/firefox/fx/) with [GDI++](http://lifehacker.com/5190607/gdi%252B%252B-adds-os-x-font-rendering-to-windows), and get the Google Web Fonts installed in your system. This will not help with [TypeKit](http://typekit.com/), etc., but Google's fonts are quite popular (I use them on this very blog). And I also realize that this defeats the purpose of the Web Fonts in the first place, but if you want good clean readable type rendering than this is the way to go.
- Code highlighting needed: The [new blogger ](http://bloggerindraft.blogspot.com/)has some really cool ideas, but code highlighting is something [so fundamental and simple these days](http://alexgorbatchev.com/SyntaxHighlighter/), I'm perplexed why haven't Blogger or WordPress implemented them in their editors. Boo. Also, [no support for paragraphs](http://webapps.stackexchange.com/questions/5051/how-can-i-make-blogger-insert-p-tags-instead-of-br-when-using-rich-text-edito)? Come ON, you guys!

I don't know what comes next. Web font rendering is a tough issue to get straight on all the variety of platforms, browsers, and resolutions out there, and there may never be a perfect solution. However, some good testing on the generic platforms (especially the biggest one out there: Windows) should ensure that your main text is readable, and the best way to do so is to not use web fonts for body text just yet.
