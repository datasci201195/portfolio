---
title: Bringing ERP and CRM data into one warehouse
organization: Independent project
summary: I built a SQL Server warehouse that takes ERP and CRM records through ingestion, cleanup, and dimensional modeling.
tools: [SQL Server, T-SQL, ETL, Star schema]
order: 4
featured: false
---

## From two sources to a reporting model

ERP and CRM systems describe different parts of a business. Even when records refer to the same customer, duplication and differences in business rules can make a direct join unreliable. I built a layered SQL Server warehouse to bring the sources together and keep the transformations traceable.

## Following a record

| Layer | Work performed |
| --- | --- |
| Bronze | Bulk-load the source records and retain their original context. |
| Silver | Apply deduplication and business rules before combining records. |
| Gold | Build a star schema and preserve dimension history for reporting. |

I wrote the ETL in T-SQL and included referential integrity checks. In a star schema, these checks help detect a fact record that refers to a missing dimension member. Without one, a join can silently drop a row from a report.

## What I measured

The project covered more than 100,000 records and produced sub-second analytical query results in the project environment. For another dataset or another SQL Server installation, I would measure the same queries again with the new data volumes and indexes.
