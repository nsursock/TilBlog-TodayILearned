---
layout: layouts/post.njk
title: A loop beats a flash of brilliance
track: Problem Solving
level: "101"
takeaway: Speed of feedback matters more than the perfection of the first guess.
date: 2026-09-11
tags:
  - posts
  - problem-solving
---

## The question

I asked an LLM to “just fix it” and pasted a wall of context: a function that sometimes blew up, a trading notebook that leaked money, a calendar that never quite fit. The answers wandered. I wandered with them. Hours later I still had a blinking cursor — or a burning fire — and no sharper picture of what I was actually trying to solve.

How do you stop waiting for a flash of brilliance?

## What clicked

Whether you are debugging a runaway function, fixing a broken financial model, or untangling a messy life situation, it always boils down to four distinct phases. Problem-solving 101 isn’t brilliance. It’s a repeatable loop: define the exact problem, isolate the variables, formulate a single hypothesis, then test, observe, and iterate.

The loop is boring on purpose. Brilliance is optional. A process you can run again tomorrow is not.

### 1. Define the exact problem

Stop treating symptoms. Most people fail here because they try to solve the *pain* instead of the *cause*.

Pain is loud and vague. “This is broken.” “I am losing money.” “I never have time.” Those sentences describe a feeling. They do not name a mechanism. If you hand a vague sentence to a model — or to yourself — you will get a vague intervention: rewrite the function, change the strategy, buy a planner. Sometimes that lucks into a fix. Usually it rearranges the furniture around the same fire.

A defined problem is a sentence you could hand to a skeptical colleague. It names the system, the failure mode, and the condition under which the failure shows up.

- “I am losing money” is a symptom.
- “My momentum strategy has a 65% false-positive rate during high-volatility market opens” is a defined problem.

The second sentence already tells you where *not* to look. You are not rewriting your entire portfolio theory. You are inspecting signal quality at a specific window of the day. That is a solvable object.

The test I now use is blunt: if I cannot write the problem down in one clear sentence, I don’t understand it yet. I sit with the sentence until a human would say, “Ah — *that’s* the problem.” Goal, constraints, knowns, unknowns. Not a prompt dump. A design surface.

When I rewrote the original “fix this” ask that way, both the model and I locked onto the real bottleneck faster. The wall of context was still useful as evidence. It was a terrible substitute for a problem statement.

### 2. Isolate the variables

Never try to change everything at once. When a system breaks, strip away the noise until you find the smallest possible piece that is failing.

This is divide and conquer, not a personality trait. A broken system is a bundle of moving parts. If you touch three of them in the same pass, a later success teaches you almost nothing. You cannot tell which change did the work, and you cannot tell which change introduced the next bug.

Isolation means shrinking the search space until the failure has nowhere to hide.

- In code: comment out modules until the error stops. Then put pieces back until it returns. The last piece you restored is the suspect, not the whole codebase.
- In life and finance: separate fixed overhead from variable waste. A rent payment is not the same kind of object as a dozen unexamined subscriptions. Mixing them makes every cut feel existential, so you cut nothing.

The move is the same in both worlds: freeze what you can, vary what you must. If the error still happens with half the system unplugged, the unplugged half was not the problem. That sounds obvious after you have done it. It is surprisingly hard to do while the fire is still burning, because action feels like progress and subtraction feels like delay.

Isolation is the delay that saves the next three hours.

### 3. Formulate a single hypothesis

Don’t randomly try ten different fixes hoping one sticks. Pick **one** logical change that *should* fix the root cause based on your isolation step.

A hypothesis is a falsifiable guess, not a vibe. “Maybe if I clean this up it’ll work” is not a hypothesis. “If the false positives are coming from the open-auction print, then ignoring the first twelve minutes of volume should drop the false-positive rate below 40% on the same tick data” is a hypothesis. It names the intervention and the expected measurement.

Ask yourself: “If I do X, what exact outcome do I expect?”

That question does two jobs. It keeps you honest about what “working” means, and it gives you a reason to stop. Without an expected outcome, every mixed result can be narrated as progress. With one, the world can disagree with you in a single run.

I used to treat prompting the same way I treated debugging: throw a handful of changes at the model and see what comes back. The answers got longer. The problem did not get smaller. One hypothesis at a time is slower in the first five minutes and faster over the afternoon, because you are accumulating evidence instead of accumulating variants.

### 4. Test, observe, and iterate

Run the test. Did it work?

Keep the feedback loop tight. A beautiful theory that takes a week to check is worse, in practice, than a crude test you can run in ten minutes. The point of the experiment is not to be impressive. The point is to let reality talk.

- **If yes:** document why and move on. Write the sentence that future-you will need: what you changed, what you measured, why that measurement counted as success. Otherwise you will “fix” the same class of bug next month with no memory of the mechanism.
- **If no:** discard the hypothesis. Do not get emotionally attached to it. Use the new data to form your next move.

The second branch is the one people skip. A dead hypothesis still feels like *your* idea, especially after you have explained it to a model and watched the model agree. Agreement is not evidence. The test is. Throw the guess away, keep the observation, and write the next sentence.

Then go back to isolation if you need to, or back to the problem statement if the failure you found is not the failure you named. The loop is a loop. You are allowed to revise the question. You are not allowed to pretend the last experiment did not happen.

## Pitfalls

The loop fails in predictable ways, and they all look like motion.

Treating the symptom as the problem is the first collapse. You optimize for the feeling that something is being handled. Pain drops for a day, then returns with a new costume. “I am losing money” becomes “I switched brokers.” The false-positive rate at the open does not care.

Changing several variables at once is the second. It feels thorough. It destroys information. When the system improves, you cannot promote the change that mattered. When it gets worse, you have to unwind a knot instead of a single thread. Isolation exists to prevent this, and it only works if you refuse the urge to “fix a few things while you’re in there.”

Getting attached to a hypothesis after the data has already killed it is the third. You start defending the story instead of updating it. Models are especially good at helping you do this: they will steelman a bad guess until it sounds principled. Your job is to let the measurement win.

Waiting for a perfect first guess is the last, and it is the one that looks like rigor. You polish the plan so you will not have to be wrong in public. Meanwhile the fire keeps burning. A crude experiment with a clear expected outcome beats a flawless theory you have not run.

## Keep this

Speed of feedback matters more than the perfection of the first guess.

The best problem solvers aren’t the ones who never make mistakes. They are the ones who run small, fast experiments until reality forces the answer out into the open. Name the problem in one sentence. Shrink the system until the failure is small enough to point at. Bet on one change. Check. Then do it again.

Brilliance, if it shows up, can join the loop. It does not get to replace it.
