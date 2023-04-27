---
title: Play Store Privacy
postSlug: play-store-privacy
date_published: 2013-11-02T04:29:52.000Z
date_updated: 2021-08-04T00:57:40.000Z
tags:
  - twitter
---

A set of tweets about a potential way in which apps and developers can be more explicit and accountable for the permissions and access they demand of their users when installing.

> Android devs should start listing *why* their app needs the permissions it does, and that description should be binding for that version
> 
> &mdash; Terence Tuhinanshu (@rajadain) [November 2, 2013](https://twitter.com/rajadain/status/396481730699591680)

> Only then can we have a system of transparency, accountability and ease of understanding privacy in apps [#privacy](https://twitter.com/hashtag/privacy?src=hash)[#Android](https://twitter.com/hashtag/Android?src=hash)
> 
> &mdash; Terence Tuhinanshu (@rajadain) [November 2, 2013](https://twitter.com/rajadain/status/396482090734456833)

> This information doesn&#39;t need to be front and center, but should be available for inspection by potential users in the Play Store app
> 
> &mdash; Terence Tuhinanshu (@rajadain) [November 2, 2013](https://twitter.com/rajadain/status/396482441613172736)

> Starting as voluntary convention adopted by some influential developers, it should slowly become standardized and then required by Google
> 
> &mdash; Terence Tuhinanshu (@rajadain) [November 2, 2013](https://twitter.com/rajadain/status/396482622433812480)

> Apps already use some mechanism of declaring the permissions they use (as evidenced by the prompt shown upon installation)
> 
> &mdash; Terence Tuhinanshu (@rajadain) [November 2, 2013](https://twitter.com/rajadain/status/396483074307153921)

> How hard would it be to have a text field against every permission to be filled out during app submission? Just say why you need it
> 
> &mdash; Terence Tuhinanshu (@rajadain) [November 2, 2013](https://twitter.com/rajadain/status/396483365547032576)

> Eventually these reasons should become legally (or store policy wise) binding, so if a security researcher finds violations, someone answers
> 
> &mdash; Terence Tuhinanshu (@rajadain) [November 2, 2013](https://twitter.com/rajadain/status/396483752295407616)

> Of course, laws are not always the answer. Look at the mess that is the software copyright landscape right now. With laws come trolls
> 
> &mdash; Terence Tuhinanshu (@rajadain) [November 2, 2013](https://twitter.com/rajadain/status/396484348595412992)

> And these added regulations could make it more difficult for new people to submit their apps. But there are ways around this
> 
> &mdash; Terence Tuhinanshu (@rajadain) [November 2, 2013](https://twitter.com/rajadain/status/396484616603066368)

> For example, especially stringent requirements could be asked of apps that exceed a certain user base.
> 
> &mdash; Terence Tuhinanshu (@rajadain) [November 2, 2013](https://twitter.com/rajadain/status/396484867841875969)

> Also, you can make it so that at least a certain number of people complain, a-la Class Action, for a review to take place
> 
> &mdash; Terence Tuhinanshu (@rajadain) [November 2, 2013](https://twitter.com/rajadain/status/396485056438730752)

> Having a certain number is better than having a percentage, which might be laughable eg Facebook&#39;s policy voting system with 1/3rd turnout
> 
> &mdash; Terence Tuhinanshu (@rajadain) [November 2, 2013](https://twitter.com/rajadain/status/396485428561588224)

> What I&#39;m describing might not happen for a year or two, but it will inevitably become a necessity as app stores mature.
> 
> &mdash; Terence Tuhinanshu (@rajadain) [November 2, 2013](https://twitter.com/rajadain/status/396486357453123584)

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
