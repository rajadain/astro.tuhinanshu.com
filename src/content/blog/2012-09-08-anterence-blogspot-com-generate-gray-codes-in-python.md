---
title: Generate Gray Codes in Python
postSlug: anterence-blogspot-com-generate-gray-codes-in-python
date_published: 2012-09-08T05:06:00.000Z
date_updated: 2021-02-28T01:17:27.000Z
tags:
  - archive
  - anterence.blogspot.com
---

While visiting a friend recently, I came across [this interview question for generating gray codes for n bits](http://www.careercup.com/question?id=14579803). We set about trying to solve it as best as we could. This is what I came up with.

## 
Gray Codes

While more detail [can be found on Wikipedia](http://en.wikipedia.org/wiki/Gray_code), grey codes are essentially a binary pattern in which only one bit changes at a time. For three bits, gray code will exhibit the following pattern:

>     Sequence No.    Gray Code   Changed Bit 
>     0.              000         X 
>     1.              001         0 
>     2.              011         1 
>     3.              010         0 
>     4.              110         2 
>     5.              111         0 
>     6.              101         1 
>     7.              100         0

Where the least significant bit is called 0. You can see that in each step only one bit changes at a time, with no bit changing the first time. 

## Change Pattern
The pattern in which the others change is also easy to follow, if you look at it bit by bit. Starting with the least significant bit (bit 0), we see that it first changes in step 1, and has a frequency of 2 steps before changing again. The next significant bit (bit 1) changes in step 2 and has a frequency of 4 steps before changing again. The most significant bit (bit 2 in this case) changes in step 4 and has a frequency of 8 steps before changing again (which is observable if you write it out for 16 steps). This pattern can be generalized as:

> For any bit j, the first time it changes is 2j and the frequency of its change is 2j+1.

There are many ways we can use this pattern. For example, if I want to find which bit is changing in step i, the relationship is now:

> (i % 2j+1) - 2j = 0

We can use this relationship to see which bit is changing, and as soon as we know we move on to the next step (since only one bit can change in one step).

## 
Source Code

Loading Source Code ... 

This is a simple Python script that generates gray codes for n = 10. We initialize a, an n-sized list, with 0s. For n bits, we will have 2n combinations; hence i iterates from 0 to pow(2,n), excluding the upper limit. We declare a bit marker b to record which bit changes in each iteration of i, and initialize it to 'X' denoting no bit at each iteration. Then we iterate over the individual bits with j, starting with the least significant bit (which changes most frequently) and slowly going outward, seeing if any satisfy the equation above. As soon as we find one that does satisfy the equation, we toggle that bit (done here by subtracting from 1 and squaring, giving 0 if 1 and 1 if 0; any other technique can be applied just as well), and we record that bit as changed in b, and break out of the loop for this iteration (since we have found the changed bit, and only one bit changes in an iteration, so no need to look further). The final line prints three columns: the first is the iteration i, the second is a reversed and joined array a (since our least significant bit was 0 and most significant was n, we have to reverse it so that least significant is right most and vice versa), and the changed bit b, for each iteration.

The final line 12 simply calls our function with a test argument.

### 
Output

For the value of 10, the code executed in 43ms in CodeRunner on my MacBook Air. The output for the value of 3 (which took 33ms) is shown as follows:

>     0 000 X
>     1 001 0
>     2 011 1
>     3 010 0
>     4 110 2
>     5 111 0
>     6 101 1
>     7 100 0

## 
Conclusion

This was a fun exercise, and the difficulty I had in solving such a simple problem reminded me of how out of touch I have truly become from maths and core programming. I am now making a renewed effort to get back in the flow of things. Writing this post is simply a part of that exercise.

The original post can be found here: [https://anterence.blogspot.com/2012/09/generate-gray-codes-in-python.html](https://anterence.blogspot.com/2012/09/generate-gray-codes-in-python.html)
