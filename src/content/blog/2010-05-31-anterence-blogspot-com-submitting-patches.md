---
title: Submitting Patches
postSlug: anterence-blogspot-com-submitting-patches
date_published: 2010-06-01T02:16:00.000Z
date_updated: 2021-02-23T02:21:45.000Z
tags:
  - archive
  - anterence.blogspot.com
---

Having looked at [a](https://issues.apache.org/bugzilla/show_bug.cgi?id=33868)[number](https://issues.apache.org/bugzilla/show_bug.cgi?id=36270)[of](https://issues.apache.org/bugzilla/show_bug.cgi?id=40522)[bug](https://issues.apache.org/bugzilla/show_bug.cgi?id=40642)[entries](https://issues.apache.org/bugzilla/show_bug.cgi?id=40678)[with](https://issues.apache.org/bugzilla/show_bug.cgi?id=40922)[patches](https://issues.apache.org/bugzilla/show_bug.cgi?id=44220), and [some without them](https://issues.apache.org/bugzilla/show_bug.cgi?id=45316), I've realized that the correct (or at least acceptable) way to submit patches is the following:

Create the patch file. (There are a number of ways to do this, discussion will follow).

Submit the patch at the bug report, and also mention it in a comment (I don't know what technical purpose this serves, but it very well maybe just their way of doing things.)

Mention the root directory to which the patch applies, and the revision number of the project on which the patch was worked on.

Now, the patch code maybe put in a comment, but [experience shows](https://issues.apache.org/bugzilla/show_bug.cgi?id=45316) that seldom works. [Another method](https://issues.apache.org/bugzilla/show_bug.cgi?id=32422) is to include a zip file (or tar.gz, whichever the poster prefers), which has a complete package structure, for example:
`org > apache > tools > ant > taskdefs > optional > clearcase > ClearCase.java`

A [third technique](https://issues.apache.org/bugzilla/show_bug.cgi?id=34748), which I suspect is the best one, is to include a .patch file. When I opened it in Notepad++, it identified the language to be "Diff". This file included an xml like structure, as well as a code part, with several lines starting from a "+" symbol. Also, several lines included an "Index: " declaration, and many lines had @@ definitions as well. I haven't been able to Google any info on it, but an educated guess suggests that this is a strongly defined file which includes a number of updates to a number of files and demarcates the differences between them. This, coupled with the revision number which the author specifies in his comment in the bug thread on Bugzilla, makes the patch very easy to integrate.

Unfortunately, I haven't been able to find a way yet to convert my code into this .patch form. However I suspect that some sort of plugin must exist for Eclipse which tracks these changes and consolidates them into a single .patch file, because whatever creates the .patch file must track the changes while they are being made in order to reflect them accurately, and any such implementation would make sense to be associated with the IDE.

However, if I don't find this .patch method, I'll just upload my directory structure in a gzip.
The original post can be found here: [https://anterence.blogspot.com/2010/05/submitting-patches.html](https://anterence.blogspot.com/2010/05/submitting-patches.html)
