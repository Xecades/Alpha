---
title: 高级数据结构和算法分析
---

## AVL Tree

任何节点 $\text{node}$，满足 $\operatorname{BF}(\text{node}) := h_L - h_R \in \{-1, 0, 1\}$（BF 即 Balance Factor，其中空树高度定义为 $-1$），即左右高度差不大于 $1$。

Implementation TBD.

---

## Splay Tree

每次对节点的操作（插入、查询、删除）后，将该节点移动到根节点。在任何连续的 $M$ 次操作后，能够保证 $O(M \log N)$ 的时间复杂度（摊还时间复杂度，Amortized Time Bound）。

Implementation TBD.

---

## 摊还分析

记 $c_i$ 为第 $i$ 次操作的 cost，则

$$
\begin{align*}
    \text{最坏 Cost} &= \max_{1\leq i \leq M}c_i \\
    \text{平均 Cost} &= \frac{1}{M}\sum_{i=1}^{M}c_i
\end{align*}
$$
