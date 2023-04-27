---
title: "Bash: Find All Linked Pages"
postSlug: anterence-blogspot-com-bash-find-all-linked-pages
date_published: 2012-09-14T04:05:00.000Z
date_updated: 2021-02-28T01:19:07.000Z
tags:
  - archive
  - anterence.blogspot.com
---

While working on a really old project, I had the problem of multiple versions of multiple files existing from many generations in the same folder. I wanted to clear the unused ones out, and was having a hard time figuring out which of the .htm and .php pages were actually being used. So I wrote this simple script to find out all .htm and .php pages being linked to:

    grep --include=*.htm* --include=*.php -oh -e "=\"[^\"]*.htm[l]\{0,1\}\"" -e "=\"[^\"]*.php\"" * 
    | sed -e 's/=\"[\/]*\(.*\)\"/\1/g' 
    | sort -u

First off, I included all .htm[l] and .php files with the --include option. Then we specify we want only the matched part with -o, and no filenames with -h, and we combine them to make -oh. Then I specify two expressions, preceded by the -e option, since I want to include both .htm[l] and .php links. The regular expression is straightforward:

    -e "=\"[^\"]*.htm[l]\{0,1\}\""

    -e "=\"[^\"]*.php\""

It looks for all elements starting with an = sign, followed by a starting quote ". It then looks for all characters except another quote sign that end with .htm[l] (in the first case) or .php (in the second case), followed by the closing quote sign. We have the condition of not looking for a quote sign before the ending .htm[l] or .php to force it to select only the actual link. Otherwise it is easy for to select entire lines, starting at the first link and ending at the last, since you're looking for any character.

This is then piped into a sed command, which extracts the extraneous formatting (=, ", spaces, starting slashes), and gives us pure filenames:

    sed -e 's/=\"[\/]*\(.*\)\"/\1/g'

This is finally filtered using sort -u which removes duplicates.

This is by no means perfect, and was a quick and dirty way of finding out all the pages that were actually being linked to. Once I had that list, I could use a command like

    grep -l plans.htm *

to find out which pages were linking to a particular page (in this case, plans.htm). If I knew that all the referencing pages were obsolete, I could delete this page safely. But if an actually used page came up in the list, then this page remained.

This script (or blog post) is by no means complete. But I think this is a good starting point, and will mostly be useful to me when I want to do something similar in the future.

The original post can be found here: [https://anterence.blogspot.com/2012/09/bash-find-all-linked-pages.html](https://anterence.blogspot.com/2012/09/bash-find-all-linked-pages.html)
