---
title: Predicting student outcomes at enrollment
organization: University of British Columbia
summary: Our team tested how well five details available at enrollment could predict whether a student would graduate, stay enrolled, or drop out.
tools:
  - Python
  - Logistic regression
  - Quarto
repository: https://github.com/UBC-MDS-2026-27/predicting-student-outcomes-at-enrollment
report: https://ubc-mds-2026-27.github.io/predicting-student-outcomes-at-enrollment/reports/student-academic-outcomes.html
order: 2
featured: true
---

## What can you learn on the first day?

For a group project in UBC’s Master of Data Science program, we studied enrollment records for 4,424 students in Portugal. We restricted the model to information available when a student enrolled. First- and second-semester grades would have made prediction easier, but an advisor meeting a new student would have no access to those grades.

## How the model performed

We trained a logistic regression model and tested it on 885 held-out students. Always predicting graduation, the most frequent outcome, gave a macro F1 score of 0.222. Our model scored 0.509 on the same test set. This measure gives each of the three outcomes equal weight.

Of the 284 students in the test set who eventually dropped out, the model identified 145. It missed 139. That count puts a practical limit on using enrollment data alone to decide who might benefit from support.
