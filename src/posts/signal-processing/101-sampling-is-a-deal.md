---
layout: layouts/post.njk
title: Sampling is a deal with time
track: Signal Processing
level: "101"
takeaway: Aliasing is what happens when your samples lie about the continuous world.
date: 2026-09-11
tags:
  - posts
  - signal-processing
---

## The question

Why does undersampling invent frequencies that were never there?

## What clicked

Sampling isn’t just “taking points.” It’s committing to a grid in time. If the signal wiggles faster than that grid can honestly represent, those wiggles masquerade as slower ones — aliasing.

## Pitfalls

- Memorizing Nyquist as a slogan without picturing the fold
- Assuming more samples always mean “more truth” without asking *of what*

## Keep this

Ask: “What is the fastest change I care about, and does my sample rate keep that promise?”
