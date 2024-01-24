---
title: "delete-plan"
date: 2024-01-23
weight: 4012445
---

### Removes one existing account plan

The plan to delete is specified either by ID with the `--id` parameter followed by a numeric ID, or by name with the `--name` flag.

Deletion of plans in use by one or more virtual servers is safe, as in this case Virtualmin will merely flag it as deleted and hide it from the plans list.
 
### Command line help

```text
virtualmin delete-plan --name plan-name | --id plan-id
```
