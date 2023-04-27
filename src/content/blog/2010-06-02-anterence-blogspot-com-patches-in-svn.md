---
title: Patches in SVN
postSlug: anterence-blogspot-com-patches-in-svn
date_published: 2010-06-03T03:39:00.000Z
date_updated: 2021-02-28T00:53:33.000Z
tags:
  - archive
  - anterence.blogspot.com
---

Found out how to create patches without Eclipse plugins:
[http://ariejan.net/2007/07/03/how-to-create-and-apply-a-patch-with-subversion/](http://ariejan.net/2007/07/03/how-to-create-and-apply-a-patch-with-subversion/)

What I basically have to do is, after downloading the latest revision using:
`svn co http://svn.apache.org/repos/asf/ant/core/trunk/ ant-core`

and editing my files in Eclipse, I have to open a terminal window and type in:
`svn diff > ~/fix_ugly_bug.diff`

The diff extension allows text editors (like Notepad++ and possibly gedit) to recognize the language and use syntax highlighting. However, I've also seen patches in the Ant Bugzilla which were diff files with a .patch extension. (See previous post)
The original post can be found here: [https://anterence.blogspot.com/2010/06/patches-in-svn.html](https://anterence.blogspot.com/2010/06/patches-in-svn.html)
