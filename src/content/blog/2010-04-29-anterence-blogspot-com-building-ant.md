---
title: Building Ant
postSlug: anterence-blogspot-com-building-ant
date_published: 2010-04-29T16:05:00.000Z
date_updated: 2021-02-20T06:17:13.000Z
tags:
  - archive
  - anterence.blogspot.com
---

Today I decided to download and build Ant: probably the first baby step to be taken in the direction of any development. In order to verify the download, I was advised (by the website instructions) to use the program [pgp](http://www.pgpi.org/) to do it. I had to install pgp using: `sudo apt-get install pgpgpg` which took a while to get right (too many p's and g's).

The first time I built it (using the shell command `sh build.sh -Ddist.dir=[directory_to_contain_ant_distribution] dist`), it failed, citing the absence of JUnit as the cause. I have JUnit, but perhaps not explicitly (just as an Eclipse plugin). So I decided to open it using Eclipse and go from there.

Eclipse, of course, couldn't build it either. On perusal of the errors, the first one I found was "Type A is already defined". About three different files named A.java existed, each with content similar to this:

    public class A {
        static private class Inner extends B {
        }
    }

Code that is, quite honestly, baffling. It seems as if it is a sandbox testing file, perhaps once made by a developer to prove a point or demonstrate a technique to a fellow coder. Its purpose in the grand scheme of things is still arcane to me, especially when there are so many (again reminiscent of 'A'gent Smith).

A lot of the build errors were coming from the code unable to resolve references to `com.sun.mirror.*`. After a quick Google search, I landed [the solution](http://www.eclipsezone.com/eclipse/forums/t69882.html) which told me to import `JAVA_HOME/tools.jar`. Another reference to `com.jcraft.jsch.*` was needed, and I [downloaded](https://sourceforge.net/projects/jsch/files/jsch/jsch-0.1.42.jar/download) and added it.

And then of course there are packages like `etc/testcases/taskdefs/fixcrlf/expected`, whose 9 source files are `Junk1.java` - `Junk9.java`, each with the same error: "Type JunkX is already defined." This error probably comes from package information not clearly stated in the files, but this also greatly alters my perception of the "professionalism" of programmers. I agree, we all talked about "cowboy coding" and how it doesn't apply to agile / OSS development all the time. But naming entire classes (which do serve a purpose, as I can see from the code) Junk1 up till Junk9? Really?

So that's where I stand currently. Will continue to try and post an update as soon as I can get it to work.
The original post can be found here: [https://anterence.blogspot.com/2010/04/building-ant.html](https://anterence.blogspot.com/2010/04/building-ant.html)
