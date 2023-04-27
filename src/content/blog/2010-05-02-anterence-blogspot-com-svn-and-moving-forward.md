---
title: SVN and moving forward
postSlug: anterence-blogspot-com-svn-and-moving-forward
date_published: 2010-05-02T21:22:00.000Z
date_updated: 2021-02-20T06:17:26.000Z
tags:
  - archive
  - anterence.blogspot.com
---

Since the [source download](http://ant.apache.org/srcdownload.cgi) from the Ant website didn't work well in Eclipse, I decided to check out the code from their [svn repository](http://svn.apache.org/viewvc/ant/core/trunk/). I was a bit apprehensive at first, because in my limited experience with VSS in the mid-2000s, I'd learned that when I check something out from a managed source folder, it is an exclusive lock. Fortunately, that is not the way it is in SVN.

Another thing which I did was to load the folders in the source individually, instead of all at once. What I'd done the first time was use the `New > Java Project > From existing source` option, with the root directory of the downloaded project. That created a lot of errors, even after referencing [all the optional libraries](http://ant.apache.org/manual/install.html#librarydependencies). So this time I created a new blank project, and `Imported` some selected folders into the source one by one. So now I have the `main` and `test` folders, and this setup is enough for some simple basic bug fixing.

Time to check out the [bugs](http://ant.apache.org/bugs.html).
The original post can be found here: [https://anterence.blogspot.com/2010/05/svn-and-moving-forward.html](https://anterence.blogspot.com/2010/05/svn-and-moving-forward.html)
