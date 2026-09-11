---
layout: layouts/post.njk
title: Outsmart them before they break
track: Problem Solving
level: "102"
takeaway: Structural leverage beats more effort on the wrong constraint.
date: 2026-09-11
tags:
  - posts
  - problem-solving
---

## The question

101 is triage. You stop the bleeding, name the failure, run one clean experiment, and let reality talk. That loop will get you out of a burning room.

It will not keep the room from catching fire again.

I kept solving the same class of problem with better and better first-aid: a tighter stop in the notebook, a faster retry around the API, a cleaner prompt when the model wandered. Each fix worked. Each fix made a new mess a little further downstream. The question that finally showed up was not “how do I patch this?” It was: how do you move from reacting to problems to outsmarting them before they even break?

## What clicked

Problem-solving 102 is about **systems, cognitive traps, and structural leverage**. The unit of work is no longer the incident. It is the machine that produces incidents. Four principles keep showing up once you zoom out that far: inversion, first-principles decomposition, second-order thinking, and the theory of constraints.

They are not a replacement for the 101 loop. They are what you run *before* you need the loop — or after the loop has told you the fire is structural.

### 1. Inversion (the art of backward thinking)

Instead of asking, “How do I make this work?” ask, “How do I guarantee absolute failure?”

Forward questions invite optimism and analogy. Backward questions invite a list. Lists are useful. Optimism is not a control.

In trading, the forward question is “What’s the winning strategy?” The inverted one is “What exact conditions would completely wipe my account in 10 minutes?” Once you list those failure modes — a hung order, a stale quote, a gap through the stop, a retry storm that doubles size — you build hard stops around every single one. You are no longer hoping the strategy is clever. You are refusing to die in the obvious ways.

The same move works on a function, a launch, a calendar. “How do I ship this?” becomes “What would make this undebuggable at 2 a.m.?” “How do I have more time?” becomes “What would guarantee I have none?” The point is not pessimism. The point is to design against the failure you can already name, instead of decorating the success you cannot.

Inversion is cheapest at the start. After the account is gone, the list of wipeout conditions is just a eulogy.

### 2. First-principles decomposition

Most people solve problems by analogy: “How do other people build trading bots?” Analogy is fast and contagious. It also smuggles in someone else’s constraints, someone else’s risk budget, and someone else’s leftover architecture. You inherit a template and then spend weeks wondering why *your* market, *your* latency, *your* capital will not behave like the blog post.

First-principles thinking strips away convention down to undeniable physical or logical truths. Break the problem until you reach bedrock facts: latency exists, APIs rate-limit, slippage happens, capital is finite. Those are not opinions. They will still be true after you rename the repo.

Then build the solution *upward* from those facts, not *outward* from someone else’s template. If capital is finite, position size is a first-class object, not a constant you copy from a backtest screenshot. If the API rate-limits, “just poll faster” is not a strategy; it is a way to get banned. If slippage happens, a paper fill is not evidence.

Analogy still has a job: it is a source of hypotheses, not a source of laws. Steal a structure, then ask which of its assumptions are still bedrock in *this* system. Whatever is not bedrock can be thrown away without guilt.

### 3. Second-order thinking

First-order thinking solves the immediate problem and creates a new one. Second-order thinking asks: **“And then what?”**

The trading example is almost too clean. Optimizing a model to fit historical data perfectly is a first-order success. It looks like skill. It feels like the 101 loop paid off: you defined overfitting as the problem, you isolated the window, you tested, the in-sample number moved. Then live volatility hits and the same fit becomes a second-order disaster. The solution *was* the next problem, waiting one step downstream.

Always trace the consequence of your solution three steps out. Not as a vibe — as a sentence.

- If I cache this to fix latency, then what? Stale data. Then what? Trades on a price that no longer exists. Then what? A fill you cannot unwind because the “fix” hid the truth.
- If I add retries to stop dropped orders, then what? Duplicate sends. Then what? Double size. Then what? The wipeout condition you listed in inversion and then implemented by accident.
- If I let the model write more of the pipeline, then what? Faster output. Then what? More unexamined surface. Then what? A failure you cannot isolate because you no longer know which layer invented the bug.

First-order thinking is not stupid. It is incomplete. 101 trains you to check whether the test worked. 102 trains you to check what the test *teaches the system to do next*.

### 4. The theory of constraints (bottleneck identification)

In any complex system, output is dictated strictly by the single narrowest bottleneck.

A trading pipeline makes this visible: data ingest → alpha signal → risk check → broker API. Speeding up ingest does nothing if the execution API is lagging. You will get prettier timestamps on orders that still miss the window. Local optimization at a non-constraint is how busy people stay busy.

Find the constraint. Ignore everything else until that single constraint is widened. Then look again, because the bottleneck *moves*. Yesterday’s constraint was the API. Today’s is the risk check you never load-tested because the API was hiding it. Tomorrow’s is a human who has to approve a halt that now fires too often.

This is structural leverage. One hour on the true constraint changes the system’s throughput. Ten hours on a non-constraint changes a dashboard. The 101 instinct is to isolate a failing variable. The 102 instinct is to isolate the *rate-limiting* variable even when nothing is on fire. The system that is “working” is still only as fast, as safe, or as honest as its narrowest point.

If you cannot point at the bottleneck, you are not doing systems work yet. You are decorating.

## Pitfalls

102 fails when you use the new vocabulary to avoid the old discipline.

Inversion without a list is just anxiety. “What if everything fails?” is not a failure mode. “The broker ack is delayed 800ms during the open and my flatten logic assumes it isn’t” is a failure mode. Write the conditions down. Put hard stops on the ones that can actually kill you. Leave the rest for later.

First principles as a personality is worse than analogy. You do not need to re-derive TCP to respect a rate limit. Bedrock is the set of facts that would still be true if every tutorial vanished. If you are still arguing taste, you have not hit bedrock.

Second-order thinking can become a stall. Tracing three steps downstream is a check, not a reason to never ship. If you cannot name the next two consequences in a paragraph, you do not understand the fix. If you can, run the 101 experiment anyway. The map is not a substitute for the measurement.

The constraint trap is local heroics. You widen the bottleneck you like — the one that is fun to optimize — and ignore the one that is embarrassing. Throughput does not care which problem flatters you.

The last trap is treating 102 as a replacement for 101. You cannot invert your way out of a bug you have not isolated. You cannot first-principle a production fire while the cursor blinks. Use the loop to learn. Use these principles to stop needing the loop as often.

## Keep this

Reacting faster is still reacting. Structural leverage is choosing the move that makes a whole class of fires impossible, or irrelevant.

Invert until failure has a list and a stop. Strip the problem to facts that would survive a total loss of other people’s templates. Ask “and then what?” three times before you call a fix done. Point at the one bottleneck and refuse to polish anything else until it moves.

Do that, and you spend less of tomorrow in triage — not because you got luckier, but because the system has fewer ways to break.
