---
title: 高级数据结构和算法分析
---

## AVL Tree

任何节点 $\text{node}$，满足 $\operatorname{BF}(\text{node}) := h_L - h_R \in \{-1, 0, 1\}$（BF 即 Balance Factor，其中空树高度定义为 $-1$），即左右高度差不大于 $1$。

```typst
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    set-style(radius: .35, stroke: (thickness: 1.4pt))

    circle((0, 0), name: "A")
    circle((.7, -1), name: "B")
    line("A", "B")


    hide(circle((-.7, -1), name: "AL"))
    intersections("AAL", {
        rect((rel: (-.35, .35)), (rel: (.7, -1.5)), name: "AL-rect")
        hide(circle("A"))
        hide(line("A.center", "AL.center"))
    })
    line("AAL.0", "AAL.1")


    hide(circle("B"))
    hide(circle((rel: (-.7, -1)), name: "BL"))
    intersections("BBL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "BL-rect")
        hide(circle("B"))
        hide(line("B.center", "BL.center"))
    })
    line("BBL.0", "BBL.1")


    hide(circle("B"))
    hide(circle((rel: (.7, -1)), name: "BR"))
    intersections("BBR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "BR-rect")
        hide(circle("B"))
        hide(line("B.center", "BR.center"))
    })
    line("BBR.0", "BBR.1")

    content("A", $A$)
    content((rel: (-.4, .4)), text(.9em, $-1$))

    content("B", $B$)
    content((rel: (.35, .35)), text(.9em, $0$))

    content("AL-rect", $A_L$)
    content("BL-rect", $B_L$)
    content("BR-rect", $B_R$)

    rect((rel: (-.35, -.75)), (rel: (.7, -.7)), stroke: (dash: "dashed"))
})
```

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
