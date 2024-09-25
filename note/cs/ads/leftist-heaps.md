---
title: Leftist Heaps
---

**Null Path Length**（Npl(x)）：节点 x 到最近的没有两个子节点的节点（至多有一个孩子）的距离。定义 Npl(NULL) = -1

`Npl(X) = min{Npl(left), Npl(right)} + 1`

Theorem:

A leftist heap of r nodes on the right path must have at least 2^r - 1 nodes.

TBD
