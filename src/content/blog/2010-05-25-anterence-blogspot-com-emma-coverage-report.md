---
title: Emma Coverage Report
postSlug: anterence-blogspot-com-emma-coverage-report
date_published: 2010-05-26T00:41:00.000Z
date_updated: 2021-02-23T02:19:49.000Z
tags:
  - archive
  - anterence.blogspot.com
---

So I got Ant working using [Jim's tip](http://jimchy.blogspot.com/2010/05/fetchxml-pulls-down-dependent-jars.html) on fetch.xml, which brought down all the dependencies. I'd tracked down all of them myself, but some of them were redundant and others confusing. This was a cleaner list with precisely what was needed.

Furthermore, I was assisted by Jim's choosing which [source directories](http://jimchy.blogspot.com/2010/05/zero-errors.html) to use. That really cleared up a lot of the mess.

I ran [Emma's](http://www.emma.sourceforge.net/) code coverage on JUnit tests using Eclipse of this clean build, and saved the file. This will serve as a template against my version, so that I make sure that I'm not breaking something which wasn't already broken.

A number of tests failed. Will include complete report when I find a place to upload it.

EDIT: [Here it is](http://omescribe.com/ant/ant-core-junit-before.html).
The original post can be found here: [https://anterence.blogspot.com/2010/05/emma-coverage-report.html](https://anterence.blogspot.com/2010/05/emma-coverage-report.html)
