---
title: Making ServiceOttawa’s daily refresh 45% faster
organization: City of Ottawa
summary: I built and scheduled the ETL jobs behind a reporting data mart. Daily refresh time fell by 45%, and pipeline success reached 99.2%.
tools: [Microsoft Fabric, ETL, Dimensional modeling]
order: 3
featured: true
---

## The reporting problem

A dashboard can be available while its numbers are still a day behind. On ServiceOttawa, getting the latest data into the reporting mart was a daily job. Both the time it took and whether the run finished mattered to the people reading the reports.

## My contribution

I built and scheduled the ETL jobs for the star-schema data mart. In this model, fact tables hold observations at a defined level of detail, and dimensions supply the context used to group and filter those observations. The load has to produce both sides of that relationship for reporting.

## Two outcomes worth measuring

The daily refresh took **45% less time**, and pipeline success reached **99.2%**. The first measure answers how long reporting waits for a refresh. The second answers how often the pipeline completes successfully. Either figure on its own leaves out part of the operating picture.

For an engineering review, I would put those measures alongside a freshness check on the data itself. A completed load and a current report answer different questions.
