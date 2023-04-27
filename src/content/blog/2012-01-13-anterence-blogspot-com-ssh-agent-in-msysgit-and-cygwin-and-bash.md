---
title: SSH-Agent in msysgit and cygwin and bash
postSlug: anterence-blogspot-com-ssh-agent-in-msysgit-and-cygwin-and-bash
date_published: 2012-01-13T15:52:00.000Z
date_updated: 2021-02-28T01:15:29.000Z
tags:
  - archive
  - anterence.blogspot.com
---

Recently, [at work](http://www.psdconsulting.com), I had to do SSH forwarding. This was could only be done on [msysgit](http://code.google.com/p/msysgit/) (local machine Windows, remote Linux) when ssh-agent is running. After [this great post on GitHub](http://help.github.com/ssh-key-passphrases/) didn't work for me, further Googling got me to [the answer](http://osdir.com/ml/msysgit/2011-02/msg00204.html). What I did finally, is add the following:

- Add a file called `.bashrc` to my home folder (C:\Users\TTuhinanshu\)
- In that file, write 
> `#! /bin/bash 
> eval `ssh-agent -s` 
> ssh-add`

- **Remember the backticks `` in the `eval` line!**
- *This assumes that your key is in the conventional `~/.ssh/id_rsa` location. If it isn't, include a full path after the `ssh-add` command.*
- Add to or create file `~/.ssh/config` with the contents 
> `ForwardAgent yes`

After that, whenever you start msysgit it will ask you the passphrase for your key file, and not bother you with every git pull. Also, if you SSH into a remote machine to pull from there (some smarty-pants deployment tactic), you won't have to place your private key in the remote machine for it to work with your git credentials.

**EDIT:** It has been pointed out a few times that the `yes` option for `ForwardAgent` command should be all lower case. I have corrected this now. Thanks to everyone for pointing this out.

**EDIT 2:** This works for cygwin, bash (Linux) and prompt in Mac as well. Basically any UNIX-like environment will make this work.

The original post can be found here: [https://anterence.blogspot.com/2012/01/ssh-agent-in-msysgit.html](https://anterence.blogspot.com/2012/01/ssh-agent-in-msysgit.html)
