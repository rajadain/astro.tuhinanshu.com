---
title: Negotiation, Part 1
postSlug: anterence-blogspot-com-negotiation-part-1
date_published: 2010-06-12T19:44:00.000Z
date_updated: 2021-02-28T01:02:26.000Z
tags:
  - archive
  - anterence.blogspot.com
---

I got this comment on my bug:

> Jesse Glick 2010-06-08 14:58:43 EDT

> I would agree that the existing -quiet argument ought to be fixed, rather than introducing a new option.

Now, I saw this coming, because that was the original design decision confusion: should the old behavior of -quiet be changed, or introduce a new option of -veryquiet (which I'd done). So, what do I do now? I think the best idea at this point is to make another patch and submit it as well. This is what I wrote:

> terwork@gmail.com 2010-06-12 15:39:35 EDT

> I was going to do the same thing, but thought that preserving backward behavior is a better idea. Here's what I'll do: I'm going to submit a new patch, and let the core members decide. Given that this design decision has not been resolved in 8 years though, I don't think that this'll be resolved soon.

So I'm going to submit a new patch with the alternative mechanism, and see what happens.
The original post can be found here: [https://anterence.blogspot.com/2010/06/negotiation-part-1.html](https://anterence.blogspot.com/2010/06/negotiation-part-1.html)
