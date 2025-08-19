---
layout: post
title:  "Reinventing the wheel and why it's fun"
date:   2024-12-10 17:44:39 +0530
categories: post
---

Every developer has heard the saying: *“Don’t reinvent the wheel.”* It’s one of those maxims thrown around like holy scripture in programming circles, meant to save you from wasted time and effort. After all, if someone has already built a library, framework, or tool that does what you need, why would you build it again? The reasoning is sound. Wheels exist. They roll. Why waste your energy?

And yet, anyone who has actually spent a few years programming knows the secret: reinventing the wheel is sometimes the most fun, rewarding, and educational thing you can do.


## The Gospel of “Don’t Reinvent”

The argument against reinvention is simple:

- **Time waste:** It’s faster to npm install or pip install something than to build it yourself.  
- **Reliability:** That library has probably been tested by thousands. Your new code? Bug central.  
- **Maintenance hell:** If you reinvent, you own the bugs, the updates, the breaking changes.  
- **Reputation:** Senior devs might roll their eyes and mutter “junior mistake” when they see you rolling your own JSON parser.

This perspective is especially strong in industry settings. Deadlines matter. Shipping matters. Clients don’t pay you to write your own HTTP library from scratch just because you think sockets are “kinda cool.”

So yes, in the professional world, the saying holds truth.


## But Wheels Are Boring Until You Build One

Here’s the flip side: as a developer, you don’t grow by only assembling LEGO bricks other people made. Sometimes you want to melt the plastic and mold your own brick, even if it looks weird.

When you write a wheel—your own database, your own templating engine, your own key-value store—you gain a level of *intimacy* with the problem that no amount of library documentation can give you.

Take for example writing your own sorting algorithm. Sure, `sort()` exists everywhere. But once you implement quicksort, mergesort, or even bubble sort with your own hands, sorting stops being magic. You feel the O(n log n) vs O(n²) difference in your gut. That’s a kind of intuition that frameworks cannot teach you.


## Reinventing as a Way of Learning

Think of reinvention as play. Kids don’t “need” to build towers out of blocks—they could just look at skyscrapers. But by stacking blocks and watching them topple, they learn balance, patience, and design.

Same with code. Reinventing the wheel lets you:

- **Understand trade-offs.** Why is B-tree indexing better in some cases than a hash map? You find out when you try both.  
- **See through abstractions.** Frameworks hide the plumbing. Reinventing means you’re the plumber now.  
- **Debug better.** Once you’ve written a wheel, when the library wheel breaks, you can peek inside and actually *understand* it.  
- **Discover joy.** Coding without purpose, purely for curiosity, feels like hacking in the purest sense. It’s art.  

Some of the best programmers I know still occasionally write things they’ll never use—like their own toy compiler, or a tiny OS kernel that only prints “hello world” to the screen. These aren’t meant for production; they’re meant for enlightenment.


## But Isn’t This Just Wasting Time?

Maybe. But not every hour of coding has to serve capitalism. Some hours can serve curiosity.  

The irony is that many groundbreaking tools we now consider “the standard wheels” *started* as some developer’s personal reinvention project. Redis was Salvatore Sanfilippo tinkering on his own because memcached didn’t fit his needs. Git was Linus Torvalds reinventing source control because CVS and SVN annoyed him. SQLite started as a guy (Richard Hipp) who wanted a database that worked without configuration.

In other words: one person’s “reinventing the wheel” is another person’s “accidentally inventing the best wheel humanity has ever seen.”


## Knowing When to Reinvent

The trick is discernment. Reinventing the wheel is fun and educational, but it doesn’t belong everywhere. Here’s a rule of thumb:

- **Learning project:** Reinvent! Build your own HTTP server, even if Apache exists.  
- **Personal project:** Reinvent if you want to understand. Don’t reinvent if you just want it done.  
- **Work project:** Avoid reinventing unless you have a clear advantage or existing tools truly suck.  

It’s all about context. A toy project in your GitHub repo can be a playground. A client-facing banking app should not rely on your “experimental crypto algorithm because AES felt boring.”


## The Joy of Bad Wheels

There’s also something humbling about reinventing and failing. Maybe your wheel comes out square. Maybe it rolls but only downhill. Maybe you realize halfway through that the library you avoided was actually genius.

That’s fine. Failure in reinvention isn’t a waste—it’s a map of dead ends you’ve personally explored. You can now appreciate the craftsmanship of the real wheels because you’ve struggled to carve your own.

And sometimes, even in failure, you discover something new. A quirk. A shortcut. A perspective others missed.


## Conclusion: Keep Rolling

So yes: the old advice still stands. Don’t reinvent the wheel when you’re on the clock, when reliability matters, or when you just want to get a feature done.

But outside of that? Ignore the advice. Reinvent wheels often. Reinvent them badly. Reinvent them beautifully. Reinvent them so you can say *“I know how this thing works, because I built one myself.”*

Because at the end of the day, programming isn’t just about shipping—it’s about curiosity. And sometimes curiosity rolls best on wheels you carved yourself.
