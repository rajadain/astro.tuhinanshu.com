---
title: Play Store Privacy
postSlug: play-store-privacy
date_published: 2013-11-02T04:29:52.000Z
date_updated: 2021-08-04T00:57:40.000Z
tags:
  - twitter
---

A set of tweets about a potential way in which apps and developers can be more explicit and accountable for the permissions and access they demand of their users when installing.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Android devs should start listing *why* their app needs the permissions it does, and that description should be binding for that version</p>&mdash; Terence Tuhinanshu (@rajadain) <a href="https://twitter.com/rajadain/status/396481730699591680?ref_src=twsrc%5Etfw">November 2, 2013</a></blockquote>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Only then can we have a system of transparency, accountability and ease of understanding privacy in apps <a href="https://twitter.com/hashtag/privacy?src=hash&amp;ref_src=twsrc%5Etfw">#privacy</a> <a href="https://twitter.com/hashtag/Android?src=hash&amp;ref_src=twsrc%5Etfw">#Android</a></p>&mdash; Terence Tuhinanshu (@rajadain) <a href="https://twitter.com/rajadain/status/396482090734456833?ref_src=twsrc%5Etfw">November 2, 2013</a></blockquote>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">This information doesn&#39;t need to be front and center, but should be available for inspection by potential users in the Play Store app</p>&mdash; Terence Tuhinanshu (@rajadain) <a href="https://twitter.com/rajadain/status/396482441613172736?ref_src=twsrc%5Etfw">November 2, 2013</a></blockquote>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Starting as voluntary convention adopted by some influential developers, it should slowly become standardized and then required by Google</p>&mdash; Terence Tuhinanshu (@rajadain) <a href="https://twitter.com/rajadain/status/396482622433812480?ref_src=twsrc%5Etfw">November 2, 2013</a></blockquote>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Apps already use some mechanism of declaring the permissions they use (as evidenced by the prompt shown upon installation)</p>&mdash; Terence Tuhinanshu (@rajadain) <a href="https://twitter.com/rajadain/status/396483074307153921?ref_src=twsrc%5Etfw">November 2, 2013</a></blockquote>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">How hard would it be to have a text field against every permission to be filled out during app submission? Just say why you need it</p>&mdash; Terence Tuhinanshu (@rajadain) <a href="https://twitter.com/rajadain/status/396483365547032576?ref_src=twsrc%5Etfw">November 2, 2013</a></blockquote>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Eventually these reasons should become legally (or store policy wise) binding, so if a security researcher finds violations, someone answers</p>&mdash; Terence Tuhinanshu (@rajadain) <a href="https://twitter.com/rajadain/status/396483752295407616?ref_src=twsrc%5Etfw">November 2, 2013</a></blockquote>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Of course, laws are not always the answer. Look at the mess that is the software copyright landscape right now. With laws come trolls</p>&mdash; Terence Tuhinanshu (@rajadain) <a href="https://twitter.com/rajadain/status/396484348595412992?ref_src=twsrc%5Etfw">November 2, 2013</a></blockquote>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">And these added regulations could make it more difficult for new people to submit their apps. But there are ways around this</p>&mdash; Terence Tuhinanshu (@rajadain) <a href="https://twitter.com/rajadain/status/396484616603066368?ref_src=twsrc%5Etfw">November 2, 2013</a></blockquote>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">For example, especially stringent requirements could be asked of apps that exceed a certain user base.</p>&mdash; Terence Tuhinanshu (@rajadain) <a href="https://twitter.com/rajadain/status/396484867841875969?ref_src=twsrc%5Etfw">November 2, 2013</a></blockquote>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Also, you can make it so that at least a certain number of people complain, a-la Class Action, for a review to take place</p>&mdash; Terence Tuhinanshu (@rajadain) <a href="https://twitter.com/rajadain/status/396485056438730752?ref_src=twsrc%5Etfw">November 2, 2013</a></blockquote>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Having a certain number is better than having a percentage, which might be laughable eg Facebook&#39;s policy voting system with 1/3rd turnout</p>&mdash; Terence Tuhinanshu (@rajadain) <a href="https://twitter.com/rajadain/status/396485428561588224?ref_src=twsrc%5Etfw">November 2, 2013</a></blockquote>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">What I&#39;m describing might not happen for a year or two, but it will inevitably become a necessity as app stores mature.</p>&mdash; Terence Tuhinanshu (@rajadain) <a href="https://twitter.com/rajadain/status/396486357453123584?ref_src=twsrc%5Etfw">November 2, 2013</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### Origin

Triggered when I realized that the current version of the Facebook app for Android can look into my phone&#8217;s photo gallery at images that I haven&#8217;t shared with Facebook, and suggest that I post them. Here is a screenshot:

![Facebook Image Suggest](http://blog.tuhinanshu.com/wp-content/uploads/2013/11/2013-10-30-15.51.58-614x1024.jpg)

All three images were the most recent in my phone&#8217;s gallery, and none of them had been shared. I went to check the permissions of the Facebook app, but there was no permission listed for accessing the Photo Gallery. I have also disabled Photo Sync for Facebook which automatically uploads pictures to Facebook from your phone.

The explanations are, in their order most likely to least:

1. Facebook has permission to access the camera, and access to gallery is implied or subsumed by this.
2. There is no permission, explicit or implicit, to access the Photo Gallery in Android 4.3 and every app can access it without the need for stating or specifying permission.
3. There is an actual explicit permission for accessing the Gallery which Facebook does not declare, but it surreptitiously does it anyway.

While declaring what permissions are required by an app is a very positive step in the right direction, more information is required. We need to know *why* the app needs that information. For example, consider [QR Code Reader](https://play.google.com/store/apps/details?id=me.scan.android.client), whose most recent update requires the following new permissions:

![QR Code Reader Permissions](http://blog.tuhinanshu.com/wp-content/uploads/2013/11/2013-11-02-04.18.34-614x1024.png)

Why does it need to know my location? Why does it need to be able to modify the contents of my USB storage? As a software developer I can think of a number of possibilities, but **I don&#8217;t know what they are really using it for**. To have a place where they can explain why they need the permissions, and a mechanism that can help regulate that they do only what they declare they do with those permissions, is essential for the next generation of apps and users, both of whom will need to be better educated in privacy guidelines.
