---
title: Why one account can have two timelines
summary: A backdated address change shows the difference between when a fact was true and when a system knew about it.
topic: Data modeling
date: 2026-11-22
---

Suppose a customer moves from Ottawa to Vancouver on April 1 and tells you on April 10. On April 5, what city should a report show? The answer depends on which question the report is asking.

## Two clocks

**Effective time** records when something was true in the business. In this example, the move was effective April 1. **Recorded time** captures when the system learned about it. That happened on April 10.

| Question about April 5 | City returned | Reason |
| --- | --- | --- |
| What address did we know on April 5? | Ottawa | The change had not been reported. |
| Looking back after April 10, what was the effective address on April 5? | Vancouver | The move was backdated to April 1. |

Overwriting the old city leaves you unable to reproduce the first answer. Keeping effective dates alone lets you describe the move, but can still lose what a previous report could have known.

## What this looks like in a model

A bi-temporal history keeps both intervals. To reconstruct a report, select the version whose effective interval contains the business date and whose recorded interval contains the reporting cutoff. A half-open interval includes its start and excludes its end, so adjacent versions can meet at a boundary without both matching.

At AFSC I built a bi-temporal SCD2 model that represented roughly 154,000 accounts as more than 300,000 point-in-time versions. The automated checks covered overlaps, gaps and null keys. The address above is a fictional example of why those checks matter.

My first question when someone asks for historical data is now more precise: do they need the best reconstruction we have today, or the answer the team could have given at the time?
