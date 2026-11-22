---
title: When the rows arrive but the fields are missing
summary: A Salesforce ingestion lesson about compound fields, and a small check that row counts alone can’t give you.
topic: Data quality
date: 2026-11-22
---

A source table has 10,000 accounts. Your destination has 10,000 accounts. What do those matching counts tell you about the billing city? Very little. You could lose that field for every account and still pass the check.

On a Salesforce ingestion workload at AFSC, I restored full field coverage by expanding compound address and geolocation fields. The distinction that mattered was between counting records and checking what each record could carry.

## Follow one address

Imagine a fictional account with a billing street, city and postal code. The source can describe these as parts of a billing address. If the destination keeps the account ID and name but omits the address components, a downstream analyst has no billing city to group by.

| Expected component | Present in example output? |
| --- | --- |
| Account ID | Yes |
| Billing street | Yes |
| Billing city | No |
| Billing postal code | Yes |

A missing column and a null value need different fixes. A null city in a column that exists can be a faithful copy of the source. An absent city column means the destination cannot represent the value at all.

## A small check to keep

Here is a simplified Python example using fictional field names. In a real pipeline, the expected set should come from the agreed source schema, including the components your destination promises to carry.

```python
expected = {"account_id", "billing_street", "billing_city", "billing_postal_code"}
received = {"account_id", "billing_street", "billing_postal_code"}

missing = expected - received
if missing:
    raise ValueError(f"Missing fields: {sorted(missing)}")
```

This catches the missing city before a report author discovers it. A separate check can then examine nulls or compare sample values. Field coverage tells you whether a value has somewhere to land. It takes another test to tell you whether the right value landed there.
