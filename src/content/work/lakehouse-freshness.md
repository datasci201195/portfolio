---
title: Checking freshness in a Fabric lakehouse
organization: Sample project
draft: true
summary: Compare source and destination timestamps to spot a stale table after a successful pipeline run.
tools: [Microsoft Fabric, SQL]
order: 5
---

This sample outlines a small monitoring experiment. A source receives new orders every hour. A reporting table can still show yesterday’s orders even after its refresh job succeeds.

A case study could follow one delayed batch, show the SQL that finds the timestamp gap, and explain how an analyst decides whether the report is safe to use.
