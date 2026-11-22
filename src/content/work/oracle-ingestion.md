---
title: One pipeline for 52 Oracle tables
organization: Agriculture Financial Services Corporation
summary: I built a configurable Microsoft Fabric pipeline that handled full and incremental loads across 52 Oracle tables.
tools: [Oracle, Microsoft Fabric, SQL]
order: 1
featured: true
---

## The problem

At AFSC, I maintained a Microsoft Fabric platform that brought together 85 Oracle tables and 64 Salesforce nCino objects. Within the Oracle workload, 52 tables could share an ingestion pipeline. The tables differed in what they needed to load, but the job of extracting records and handing them off to the next layer was common.

## The design decision

I built a parameterized pipeline and generated the source SQL at runtime. That gave individual tables a way to specify a full or incremental load while sharing the same execution logic.

Consider two fictional tables. A small reference table can be read in full each time. A larger transactions table might only need rows changed since an earlier successful run.

| Example table | Load mode | What the source query reads |
| --- | --- | --- |
| Product categories | Full | Every row |
| Transactions | Incremental | Rows in the chosen change window |

These examples illustrate the design. The source table, change field and window are details that belong to each configuration. The pipeline is responsible for applying that configuration consistently.

## What the design makes easier

A change to the shared execution logic has one implementation to maintain. The trade-off is that a mistake there can affect many tables. A useful review therefore asks two separate questions. Does the shared pipeline implement each load mode correctly? And has the right mode been chosen for this particular source?

The scope of this implementation was 52 tables within the larger Oracle workload. That distinction matters when describing how much of a platform a reusable component actually covers.
