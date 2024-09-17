---
title: 高级数据结构和算法分析
---

## AVL Tree

AVL Tree 是在二叉搜索树的基础上实现的，对任何节点 $\text{node}$，都有平衡因子 $\operatorname{BF}(\text{node}) := h_L - h_R \in \{-1, 0, 1\}$（其中空树高度定义为 $-1$），也即左右子树高度差不大于 $1$。

这样得到的树虽然不一定是平衡二叉树，但能够保证高度是 $O(\log N)$ 的，从而能够实现在 $O(\log N)$ 的时间复杂度内完成插入、删除、查找的操作。

其中删除和查找和普通二叉搜索树并无二致，这里主要讨论插入操作。

维护 AVL Tree 平衡的方法是通过**旋转**操作，分为 LL-Rotation、LR-Rotation、RR-Rotation、RL-Rotation 这四种。

---

### RR-Rotation

称在某个节点（不一定是根节点）的右节点（**R**ight）的右子树（**R**ight）上进行的**插入**操作为 **RR 插入**。

如下左图，如果 $A$、$B$ 节点的初始 $\text{BF}$ 值分别为 $-1$、$0$，在 $A$ 上进行一次 RR 插入后，**如果** $B$ 的右子树高度增加，那么 $A$、$B$ 的 $\text{BF}$ 值分别变为 $-2$、$-1$，此时 $A$ 节点不满足 AVL Tree 的条件，需要通过 **RR-Rotation** 操作来维护平衡（右图）。

::grid

:sep{width="50%"}

```typst RR-Rotation 操作前
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
    content((rel: (-.05, .5)), text(.9em, $-1 arrow.r -2$))

    content("B", $B$)
    content((rel: (.35, .5)), text(.9em, $0 arrow.r -1$))

    content("AL-rect", $A_L$)
    content("BL-rect", $B_L$)
    content("BR-rect", $B_R$)

    rect((rel: (-.35, -.75)), (rel: (.7, -1)), stroke: (dash: "dashed"))
})
```

:sep{width="50%"}

```typst RR-Rotation 操作后
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    set-style(radius: .35, stroke: (thickness: 1.4pt))

    circle((0, 0), name: "B")
    circle((-.7, -1), name: "A")
    line("A", "B")

    hide(circle("A"))
    hide(circle((rel: (-.7, -1)), name: "AL"))
    intersections("AAL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "AL-rect")
        hide(circle("A"))
        hide(line("A.center", "AL.center"))
    })
    line("AAL.0", "AAL.1")


    hide(circle("A"))
    hide(circle((rel: (.7, -1)), name: "AR"))
    intersections("AAR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "AR-rect")
        hide(circle("A"))
        hide(line("A.center", "AR.center"))
    })
    line("AAR.0", "AAR.1")


    hide(circle((.7, -1), name: "BR"))
    intersections("BBR", {
        rect((rel: (-.35, .35)), (rel: (.7, -1.5)), name: "BR-rect")
        hide(circle("B"))
        hide(line("B.center", "BR.center"))
    })
    line("BBR.0", "BBR.1")


    content("A", $A$)
    content((rel: (-.3, .4)), text(.9em, $0$))

    content("B", $B$)
    content((rel: (-.3, .4)), text(.9em, $0$))

    content("AL-rect", $A_L$)
    content("AR-rect", $B_L$)
    content("BR-rect", $B_R$)

    rect((rel: (-.35, -.75)), (rel: (.7, -1)), stroke: (dash: "dashed"))
})
```

::

通过枚举容易证明，对于 RR 插入，只有这一种 $\text{BF}$ 值需要旋转，其他 $\text{BF}$ 情况要么不需要旋转，要么是在子树上进行旋转。对于后者，我们只需要保证 $A$ 是从新插入的节点往根节点回溯时遇到的第一个不平衡节点即可。

如果我们解决了 $A$ 的不平衡问题，由于 $A$ 这棵子树的高度并没有发生改变，我们已经可以断言整棵树已经平衡了，在这种情况下已经没有必要继续向上回溯。

---

### LL-Rotation

LL-Rotation 与 RR-Rotation 类似，此处不再赘述。

::fold{info title="点击展开示意图"}
:::grid

:sep{width="50%"}

```typst LL-Rotation 操作前
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    set-style(radius: .35, stroke: (thickness: 1.4pt))

    circle((0, 0), name: "A")
    circle((-.7, -1), name: "B")
    line("A", "B")


    hide(circle((.7, -1), name: "AR"))
    intersections("AAR", {
        rect((rel: (-.35, .35)), (rel: (.7, -1.5)), name: "AR-rect")
        hide(circle("A"))
        hide(line("A.center", "AR.center"))
    })
    line("AAR.0", "AAR.1")


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
    content((rel: (0, .5)), text(.9em, $1 arrow.r 2$))

    content("B", $B$)
    content((rel: (-.2, .5)), text(.9em, $0 arrow.r 1$))

    content("AR-rect", $A_R$)
    content("BR-rect", $B_R$)
    content("BL-rect", $B_L$)

    rect((rel: (-.35, -.75)), (rel: (.7, -1)), stroke: (dash: "dashed"))
})
```

:sep{width="50%"}

```typst LL-Rotation 操作后
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    set-style(radius: .35, stroke: (thickness: 1.4pt))

    circle((0, 0), name: "B")
    circle((.7, -1), name: "A")
    line("A", "B")

    hide(circle("A"))
    hide(circle((rel: (-.7, -1)), name: "AL"))
    intersections("AAL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "AL-rect")
        hide(circle("A"))
        hide(line("A.center", "AL.center"))
    })
    line("AAL.0", "AAL.1")


    hide(circle("A"))
    hide(circle((rel: (.7, -1)), name: "AR"))
    intersections("AAR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "AR-rect")
        hide(circle("A"))
        hide(line("A.center", "AR.center"))
    })
    line("AAR.0", "AAR.1")


    hide(circle((-.7, -1), name: "BL"))
    intersections("BBL", {
        rect((rel: (-.35, .35)), (rel: (.7, -1.5)), name: "BL-rect")
        hide(circle("B"))
        hide(line("B.center", "BL.center"))
    })
    line("BBL.0", "BBL.1")


    content("A", $A$)
    content((rel: (.3, .4)), text(.9em, $0$))

    content("B", $B$)
    content((rel: (.3, .4)), text(.9em, $0$))

    content("AL-rect", $B_R$)
    content("AR-rect", $A_R$)
    content("BL-rect", $B_L$)

    rect((rel: (-.35, -.75)), (rel: (.7, -1)), stroke: (dash: "dashed"))
})
```

:::
::

---

### LR-Rotation

顾名思义，**LR-Rotation** 发生在在左节点（**L**eft）的右子树（**R**ight）上进行插入时。

如下左图，若 $A$、$B$、$C$ 的初始 $\text{BF}$ 值分别为 $1$、$0$、$0$，在 $A$ 上进行一次 LR 插入，使得 $\text{BF}$ 值分别变为 $2$、$-1$、$\pm 1$（$\pm 1$ 是因为我们既可能在 $C$ 的左子树上插入，也可能在右子树上插入）。这种情况下，我们需要进行 **LR-Rotation** 操作。

LR-Rotation 实际上是两步操作：

1. 先在 $B$ 上进行一次 RR-Rotation；
2. 再在 $A$ 上进行一次 LL-Rotation。

::grid

:sep{width="50%"}

```typst 初始情况
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    set-style(radius: .35, stroke: (thickness: 1.4pt))

    circle((0, 0), name: "A")
    circle((rel: (-1, -1)), name: "B")
    circle((rel: (1, -1)), name: "C")
    line("A", "B")
    line("B", "C")

    // BL
    hide(circle("B"))
    hide(circle((rel: (-.7, -1)), name: "BL"))
    intersections("BBL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "BL-rect")
        hide(circle("B"))
        hide(line("B.center", "BL.center"))
    })
    line("BBL.0", "BBL.1")

    // CL
    hide(circle("C"))
    hide(circle((rel: (-.7, -1)), name: "CL"))
    intersections("CCL", {
        rect((rel: (-.15, .35)), (rel: (.7, -.5)), name: "CL-rect")
        hide(circle("C"))
        hide(line("C.center", "CL.center"))
    })
    line("CCL.0", "CCL.1")

    // CR
    hide(circle("C"))
    hide(circle((rel: (.7, -1)), name: "CR"))
    intersections("CCR", {
        rect((rel: (-.55, .35)), (rel: (.7, -.5)), name: "CR-rect")
        hide(circle("C"))
        hide(line("C.center", "CR.center"))
    })
    line("CCR.0", "CCR.1")

    // AR
    hide(circle("A"))
    hide(circle((rel: (1.7, -1)), name: "AR"))
    intersections("AAR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "AR-rect")
        hide(circle("A"))
        hide(line("A.center", "AR.center"))
    })
    line("AAR.0", "AAR.1")

    content("A", $A$)
    content((rel: (0, .5)), text(.9em, $1 arrow.r 2$))

    content("B", $B$)
    content((rel: (0, .5)), text(.9em, $0 arrow.r 1$))

    content("C", $C$)
    content((rel: (0, .5)), text(.9em, $0 arrow.r plus.minus 1$))

    content("BL-rect", $B_L$)
    content("AR-rect", $A_R$)

    content("CL-rect", $C_L$)
    rect((rel: (-.35, -.25)), (rel: (.7, -1)), stroke: (dash: "dashed"))

    content((rel: (.15, .5)), [or])

    content("CR-rect", $C_R$)
    rect((rel: (-.35, -.25)), (rel: (.7, -1)), stroke: (dash: "dashed"))
})
```

:sep{width="50%"}

```typst 在 $B$ 上进行 RR-Rotation
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    set-style(radius: .35, stroke: (thickness: 1.4pt))

    circle((0, 0), name: "A")
    circle((rel: (-.7, -1)), name: "C")
    circle((rel: (-.7, -1)), name: "B")
    line("A", "C")
    line("B", "C")

    // BL
    hide(circle("B"))
    hide(circle((rel: (-.7, -1)), name: "BL"))
    intersections("BBL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "BL-rect")
        hide(circle("B"))
        hide(line("B.center", "BL.center"))
    })
    line("BBL.0", "BBL.1")

    // BR
    hide(circle("B"))
    hide(circle((rel: (.7, -1)), name: "BR"))
    intersections("BBR", {
        rect((rel: (-.55, .35)), (rel: (.7, -.5)), name: "BR-rect")
        hide(circle("B"))
        hide(line("B.center", "BR.center"))
    })
    line("BBR.0", "BBR.1")

    // CR
    hide(circle("C"))
    hide(circle((rel: (.9, -1)), name: "CR"))
    intersections("CCR", {
        rect((rel: (-.55, .35)), (rel: (.7, -.5)), name: "CR-rect")
        hide(circle("C"))
        hide(line("C.center", "CR.center"))
    })
    line("CCR.0", "CCR.1")

    // AR
    hide(circle("A"))
    hide(circle((rel: (1.1, -1)), name: "AR"))
    intersections("AAR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "AR-rect")
        hide(circle("A"))
        hide(line("A.center", "AR.center"))
    })
    line("AAR.0", "AAR.1")

    content("A", $A$)

    content("B", $B$)
    content("C", $C$)

    content("BL-rect", $B_L$)
    content("AR-rect", $A_R$)

    content("BR-rect", $C_L$)
    rect((rel: (-.35, -.25)), (rel: (.7, -1)), stroke: (dash: "dashed"))

    content((rel: (.2, .8)), [or])

    content("CR-rect", $C_R$)
    rect((rel: (-.35, -.25)), (rel: (.7, -1)), stroke: (dash: "dashed"))
})
```

:sep{width="50%"}

```typst 在 $A$ 上进行 LL-Rotation
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    set-style(radius: .35, stroke: (thickness: 1.4pt))

    circle((0, 0), name: "C")
    circle((-1, -1), name: "B")
    circle((1, -1), name: "A")
    line("C", "B")
    line("C", "A")

    // BL
    hide(circle("B"))
    hide(circle((rel: (-.7, -1)), name: "BL"))
    intersections("BBL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "BL-rect")
        hide(circle("B"))
        hide(line("B.center", "BL.center"))
    })
    line("BBL.0", "BBL.1")

    // BR
    hide(circle("B"))
    hide(circle((rel: (.7, -1)), name: "BR"))
    intersections("BBR", {
        rect((rel: (-.55, .35)), (rel: (.7, -.5)), name: "BR-rect")
        hide(circle("B"))
        hide(line("B.center", "BR.center"))
    })
    line("BBR.0", "BBR.1")

    // AL
    hide(circle("A"))
    hide(circle((rel: (-.7, -1)), name: "AL"))
    intersections("AAL", {
        rect((rel: (-.15, .35)), (rel: (.7, -.5)), name: "AL-rect")
        hide(circle("A"))
        hide(line("A.center", "AL.center"))
    })
    line("AAL.0", "AAL.1")

    // AR
    hide(circle("A"))
    hide(circle((rel: (.7, -1)), name: "AR"))
    intersections("AAR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "AR-rect")
        hide(circle("A"))
        hide(line("A.center", "AR.center"))
    })
    line("AAR.0", "AAR.1")


    content("A", $A$)
    content((rel: (0, .5)), text(.9em, $0$))

    content("B", $B$)
    content((rel: (0, .5)), text(.9em, $0$))

    content("C", $C$)
    content((rel: (0, .5)), text(.9em, $0$))

    content("BL-rect", $B_L$)
    content("AR-rect", $A_R$)

    content("BR-rect", $C_L$)
    rect((rel: (-.35, -.25)), (rel: (.7, -1)), stroke: (dash: "dashed"))

    content((rel: (.15, .5)), [or])

    content("AL-rect", $C_R$)
    rect((rel: (-.35, -.25)), (rel: (.7, -1)), stroke: (dash: "dashed"))
})
```

::

同样也可以证明，LR 插入只有这一种 $\text{BF}$ 值需要旋转。并且旋转过后子树的高度没有改变，不需要继续向上回溯。

---

### RL-Rotation

与 LR-Rotation 类似：

1. 先在 $B$ 上进行一次 LL-Rotation；
2. 再在 $A$ 上进行一次 RR-Rotation。

::fold{info title="点击展开示意图"}

:::grid

:sep{width="50%"}

```typst 初始情况
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    set-style(radius: .35, stroke: (thickness: 1.4pt))

    circle((0, 0), name: "A")
    circle((rel: (1, -1)), name: "B")
    circle((rel: (-1, -1)), name: "C")
    line("A", "B")
    line("B", "C")

    // BR
    hide(circle("B"))
    hide(circle((rel: (.7, -1)), name: "BR"))
    intersections("BBR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "BR-rect")
        hide(circle("B"))
        hide(line("B.center", "BR.center"))
    })
    line("BBR.0", "BBR.1")

    // CL
    hide(circle("C"))
    hide(circle((rel: (-.7, -1)), name: "CL"))
    intersections("CCL", {
        rect((rel: (-.15, .35)), (rel: (.7, -.5)), name: "CL-rect")
        hide(circle("C"))
        hide(line("C.center", "CL.center"))
    })
    line("CCL.0", "CCL.1")

    // CR
    hide(circle("C"))
    hide(circle((rel: (.7, -1)), name: "CR"))
    intersections("CCR", {
        rect((rel: (-.55, .35)), (rel: (.7, -.5)), name: "CR-rect")
        hide(circle("C"))
        hide(line("C.center", "CR.center"))
    })
    line("CCR.0", "CCR.1")

    // AL
    hide(circle("A"))
    hide(circle((rel: (-1.7, -1)), name: "AL"))
    intersections("AAL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "AL-rect")
        hide(circle("A"))
        hide(line("A.center", "AL.center"))
    })
    line("AAL.0", "AAL.1")

    content("A", $A$)
    content((rel: (0, .5)), text(.9em, $-1 arrow.r -2$))

    content("B", $B$)
    content((rel: (0, .5)), text(.9em, $0 arrow.r -1$))

    content("C", $C$)
    content((rel: (0, .5)), text(.9em, $0 arrow.r plus.minus 1$))

    content("BR-rect", $B_R$)
    content("AL-rect", $A_L$)

    content("CL-rect", $C_L$)
    rect((rel: (-.35, -.25)), (rel: (.7, -1)), stroke: (dash: "dashed"))

    content((rel: (.15, .5)), [or])

    content("CR-rect", $C_R$)
    rect((rel: (-.35, -.25)), (rel: (.7, -1)), stroke: (dash: "dashed"))
})
```

:sep{width="50%"}

```typst 在 $B$ 上进行 LL-Rotation
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    set-style(radius: .35, stroke: (thickness: 1.4pt))

    circle((0, 0), name: "A")
    circle((rel: (.7, -1)), name: "C")
    circle((rel: (.7, -1)), name: "B")
    line("A", "C")
    line("B", "C")

    // BR
    hide(circle("B"))
    hide(circle((rel: (.7, -1)), name: "BR"))
    intersections("BBR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "BR-rect")
        hide(circle("B"))
        hide(line("B.center", "BR.center"))
    })
    line("BBR.0", "BBR.1")

    // BL
    hide(circle("B"))
    hide(circle((rel: (-.7, -1)), name: "BL"))
    intersections("BBL", {
        rect((rel: (-.15, .35)), (rel: (.7, -.5)), name: "BL-rect")
        hide(circle("B"))
        hide(line("B.center", "BL.center"))
    })
    line("BBL.0", "BBL.1")

    // CL
    hide(circle("C"))
    hide(circle((rel: (-.9, -1)), name: "CL"))
    intersections("CCL", {
        rect((rel: (-.15, .35)), (rel: (.7, -.5)), name: "CL-rect")
        hide(circle("C"))
        hide(line("C.center", "CL.center"))
    })
    line("CCL.0", "CCL.1")

    // AL
    hide(circle("A"))
    hide(circle((rel: (-1.1, -1)), name: "AL"))
    intersections("AAL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "AL-rect")
        hide(circle("A"))
        hide(line("A.center", "AL.center"))
    })
    line("AAL.0", "AAL.1")

    content("A", $A$)
    content("B", $B$)
    content("C", $C$)

    content("BR-rect", $B_R$)
    content("AL-rect", $A_L$)

    content("BL-rect", $C_R$)
    rect((rel: (-.35, -.25)), (rel: (.7, -1)), stroke: (dash: "dashed"))

    content((rel: (-.9, .8)), [or])

    content("CL-rect", $C_L$)
    rect((rel: (-.35, -.25)), (rel: (.7, -1)), stroke: (dash: "dashed"))
})
```

:sep{width="50%"}

```typst 在 $A$ 上进行 RR-Rotation
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    set-style(radius: .35, stroke: (thickness: 1.4pt))

    circle((0, 0), name: "C")
    circle((-1, -1), name: "A")
    circle((1, -1), name: "B")
    line("C", "B")
    line("C", "A")

    // AL
    hide(circle("A"))
    hide(circle((rel: (-.7, -1)), name: "AL"))
    intersections("AAL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "AL-rect")
        hide(circle("A"))
        hide(line("A.center", "AL.center"))
    })
    line("AAL.0", "AAL.1")

    // AR
    hide(circle("A"))
    hide(circle((rel: (.7, -1)), name: "AR"))
    intersections("AAR", {
        rect((rel: (-.55, .35)), (rel: (.7, -.5)), name: "AR-rect")
        hide(circle("A"))
        hide(line("A.center", "AR.center"))
    })
    line("AAR.0", "AAR.1")

    // BL
    hide(circle("B"))
    hide(circle((rel: (-.7, -1)), name: "BL"))
    intersections("BBL", {
        rect((rel: (-.15, .35)), (rel: (.7, -.5)), name: "BL-rect")
        hide(circle("B"))
        hide(line("B.center", "BL.center"))
    })
    line("BBL.0", "BBL.1")

    // BR
    hide(circle("B"))
    hide(circle((rel: (.7, -1)), name: "BR"))
    intersections("BBR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "BR-rect")
        hide(circle("B"))
        hide(line("B.center", "BR.center"))
    })
    line("BBR.0", "BBR.1")


    content("A", $A$)
    content((rel: (0, .5)), text(.9em, $0$))

    content("B", $B$)
    content((rel: (0, .5)), text(.9em, $0$))

    content("C", $C$)
    content((rel: (0, .5)), text(.9em, $0$))

    content("AL-rect", $A_L$)
    content("BR-rect", $B_R$)

    content("AR-rect", $C_L$)
    rect((rel: (-.35, -.25)), (rel: (.7, -1)), stroke: (dash: "dashed"))

    content((rel: (.15, .5)), [or])

    content("BL-rect", $C_R$)
    rect((rel: (-.35, -.25)), (rel: (.7, -1)), stroke: (dash: "dashed"))
})
```

:::
::

---

### 复杂度证明

设 $n_h$ 为高度为 $h$ 的 AVL Tree 的**最小节点数**。为了在满足 AVL Tree 性质的前提下，使得节点数最小，任意节点 $A$ 的左右子树高度差（绝对值）一定为 $1$。否则，如果高度相等，则一定可以再删除一个节点；如果高度差大于 $1$，则不满足 AVL Tree 的性质。

也就是说任意高度为 $h$ 的节点一定是下图的两种情况之一：

::grid
:sep{width="50%"}

```typst
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    set-style(radius: .35, stroke: (thickness: 1.4pt))

    circle((0, 0), name: "A")

    // AL
    hide(circle("A"))
    hide(circle((rel: (-.7, -1)), name: "AL"))
    intersections("AAL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "AL-rect")
        hide(circle("A"))
        hide(line("A.center", "AL.center"))
    })
    line("AAL.0", "AAL.1")

    // AR
    hide(circle("A"))
    hide(circle((rel: (.7, -1)), name: "AR"))
    intersections("AAR", {
        rect((rel: (-.55, .35)), (rel: (.7, -.75)), name: "AR-rect")
        hide(circle("A"))
        hide(line("A.center", "AR.center"))
    })
    line("AAR.0", "AAR.1")

    content("A", $A$)
    content((rel: (.45, .4)), text(.9em, $h$))

    content("AL-rect", $h - 1$)
    content("AR-rect", $h - 2$)
})
```

:sep{width="50%"}

```typst
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    set-style(radius: .35, stroke: (thickness: 1.4pt))

    circle((0, 0), name: "A")

    // AL
    hide(circle("A"))
    hide(circle((rel: (-.7, -1)), name: "AL"))
    intersections("AAL", {
        rect((rel: (-.15, .35)), (rel: (.7, -.75)), name: "AL-rect")
        hide(circle("A"))
        hide(line("A.center", "AL.center"))
    })
    line("AAL.0", "AAL.1")

    // AR
    hide(circle("A"))
    hide(circle((rel: (.7, -1)), name: "AR"))
    intersections("AAR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "AR-rect")
        hide(circle("A"))
        hide(line("A.center", "AR.center"))
    })
    line("AAR.0", "AAR.1")

    content("A", $A$)
    content((rel: (-.45, .4)), text(.9em, $h$))

    content("AL-rect", $h - 2$)
    content("AR-rect", $h - 1$)
})
```
::

从上面的分析我们得到如下等式：

$$
n_h \equiv n_{h-1} + n_{h-2} + 1
$$

等式左右同时 $+1$，得到 $(n_h + 1) = (n_{h-1} + 1) + (n_{h-2} + 1)$，说明数列 $\{n_h + 1\}_h$ 是个类似 Fibonacci 数列的数列。

考虑边界条件，$n_0 + 1 = 1$，$n_1 + 1 = 2$，因此得到 $n_h = \text{Fib}_{h + 2} - 1$。

我们知道 Fibonacci 数列的通项是

$$
\text{Fib}_n \equiv \left[\frac{1}{\sqrt{5}}\left(\frac{1+\sqrt{5}}{2}\right)^n\right]
$$

其中 $[x]$ 表示离 $x$ 最近的整数。因此

$$
n_h \equiv \left[\frac{1}{\sqrt{5}}\left(\frac{1+\sqrt{5}}{2}\right)^{h+2}\right] - 1
$$

从而得到 $h = O(\log n)$，进而证明 AVL Tree 的插入、删除、查询操作的时间复杂度为 $O(\log n)$。

---

### 代码实现

为了计算 $\text{BF}$ 值，我们需要在每个节点上维护其子树的高度信息，这是 AVL Tree 带来的额外开销。

插入函数 $\operatorname{insert}(\text{node}, v)$ 的具体流程如下：

1. 如果 $\text{node}$ 为空，返回一个新节点；
2. 如果 $v < \text{node}\rightarrow\text{value}$，则递归插入到左子树，否则递归插入到右子树；
3. 更新 $\text{node}$ 的高度信息；
4. 计算 $\text{node}$ 的 $\text{BF}$ 值，如果 $\text{BF} = \pm 2$（即不满足 AVL Tree），则根据对应的插入模式进行旋转，更新高度信息，返回新的根节点；
5. 返回 $\text{node}$。

---

## Splay Tree

在二叉搜索树的基础上，每次对节点的操作（查询、插入、删除）时，通过一些类似 AVL Tree 的旋转操作**将该节点移动到根节点**。

Splay Tree 的单次操作并不能达到 $O(\log N)$ 的时间复杂度（在某些情况下甚至是 $O(N)$ 的）。但可以证明，在任何连续的 $M$ 次操作后，能够保证 $O(M \log N)$ 的时间复杂度（即摊还时间复杂度，Amortized Time Bound）。

假如访问了节点 $X$（在查询插入、后，删除前）：

 - 如果 $X$ 是根节点，不进行任何操作；
 - 如果 $X$ 的父节点是根节点，对 $X$ 进行一次 **Single Rotation**（即 AVL Tree 的 LL- 或 RR-Rotation），使得 $X$ 移动到根节点；
 - 否则，记 $X$ 的父节点为 $P$，祖父节点为 $G$，分如下两种情况讨论。

---

### Zig-Zag

Zig-Zag 分为左右对称的两种情况，都是通过 **Double Rotation**（LR- 或 RL-Rotation）解决，下面以其中一种情况为例。

对于如下左图，通过在 $G$、$P$、$X$ 上进行 LR-Rotation 操作，从而把 $X$ 移动到根节点（如右图）。

::grid

:sep{width="50%"}

```typst 初始情况
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    set-style(radius: .35, stroke: (thickness: 1.4pt))

    circle((0, 0), name: "G")
    circle((rel: (-1, -1)), name: "P")
    circle((rel: (1, -1)), name: "X")
    line("G", "P")
    line("P", "X")

    // PL
    hide(circle("P"))
    hide(circle((rel: (-.7, -1)), name: "PL"))
    intersections("PPL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "PL-rect")
        hide(circle("P"))
        hide(line("P.center", "PL.center"))
    })
    line("PPL.0", "PPL.1")

    // XL
    hide(circle("X"))
    hide(circle((rel: (-.7, -1)), name: "XL"))
    intersections("XXL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "XL-rect")
        hide(circle("X"))
        hide(line("X.center", "XL.center"))
    })
    line("XXL.0", "XXL.1")

    // XR
    hide(circle("X"))
    hide(circle((rel: (.7, -1)), name: "XR"))
    intersections("XXR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "XR-rect")
        hide(circle("X"))
        hide(line("X.center", "XR.center"))
    })
    line("XXR.0", "XXR.1")

    // GR
    hide(circle("G"))
    hide(circle((rel: (1.7, -1)), name: "GR"))
    intersections("GGR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "GR-rect")
        hide(circle("G"))
        hide(line("G.center", "GR.center"))
    })
    line("GGR.0", "GGR.1")

    content("G", $G$)
    content("P", $P$)
    content("X", $X$)

    content("PL-rect", $P_L$)
    content("GR-rect", $G_R$)
    content("XL-rect", $X_L$)
    content("XR-rect", $X_R$)
})
```

:sep{width="50%"}

```typst 进行 Double Rotation 之后
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    set-style(radius: .35, stroke: (thickness: 1.4pt))

    circle((0, 0), name: "X")
    circle((-1, -1), name: "P")
    circle((1, -1), name: "G")
    line("P", "X")
    line("G", "X")

    // PL
    hide(circle("P"))
    hide(circle((rel: (-.7, -1)), name: "PL"))
    intersections("PPL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "PL-rect")
        hide(circle("P"))
        hide(line("P.center", "PL.center"))
    })
    line("PPL.0", "PPL.1")

    // PR
    hide(circle("P"))
    hide(circle((rel: (.7, -1)), name: "PR"))
    intersections("PPR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "PR-rect")
        hide(circle("P"))
        hide(line("P.center", "PR.center"))
    })
    line("PPR.0", "PPR.1")

    // GL
    hide(circle("G"))
    hide(circle((rel: (-.7, -1)), name: "GL"))
    intersections("GGL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "GL-rect")
        hide(circle("G"))
        hide(line("G.center", "GL.center"))
    })
    line("GGL.0", "GGL.1")

    // GR
    hide(circle("G"))
    hide(circle((rel: (.7, -1)), name: "GR"))
    intersections("GGR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "GR-rect")
        hide(circle("G"))
        hide(line("G.center", "GR.center"))
    })
    line("GGR.0", "GGR.1")

    content("G", $G$)
    content("P", $P$)
    content("X", $X$)

    content("PL-rect", $P_L$)
    content("GR-rect", $G_R$)
    content("PR-rect", $X_L$)
    content("GL-rect", $X_R$)
})
```

::

---

### Zig-Zig

这种情况是通过两次 Single Rotation 解决的，但是需要注意**旋转的顺序**：从上往下先对 $G$ 进行一次旋转，再对 $P$ 旋转。

::grid

:sep{width="50%"}

```typst 初始情况
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    set-style(radius: .35, stroke: (thickness: 1.4pt))

    circle((0, 0), name: "G")
    circle((rel: (-.7, -1)), name: "P")
    circle((rel: (-.7, -1)), name: "X")
    line("G", "P")
    line("X", "P")

    // XL
    hide(circle("X"))
    hide(circle((rel: (-.7, -1)), name: "XL"))
    intersections("XXL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "XL-rect")
        hide(circle("X"))
        hide(line("X.center", "XL.center"))
    })
    line("XXL.0", "XXL.1")

    // XR
    hide(circle("X"))
    hide(circle((rel: (.7, -1)), name: "XR"))
    intersections("XXR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "XR-rect")
        hide(circle("X"))
        hide(line("X.center", "XR.center"))
    })
    line("XXR.0", "XXR.1")

    // PR
    hide(circle("P"))
    hide(circle((rel: (.9, -1)), name: "PR"))
    intersections("PPR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "PR-rect")
        hide(circle("P"))
        hide(line("P.center", "PR.center"))
    })
    line("PPR.0", "PPR.1")

    // GR
    hide(circle("G"))
    hide(circle((rel: (1.1, -1)), name: "GR"))
    intersections("GGR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "GR-rect")
        hide(circle("G"))
        hide(line("G.center", "GR.center"))
    })
    line("GGR.0", "GGR.1")

    content("G", $G$)
    content("X", $X$)
    content("P", $P$)

    content("XL-rect", $X_L$)
    content("GR-rect", $G_R$)
    content("XR-rect", $X_R$)
    content("PR-rect", $P_R$)
})
```

:sep{width="50%"}

```typst 进行两次 Single Rotation 之后
#import "@preview/cetz:0.2.2": canvas, draw, tree
#canvas(length: 2.5cm, {
    import draw: *
    set-style(radius: .35, stroke: (thickness: 1.4pt))

    circle((0, 0), name: "X")
    circle((rel: (.7, -1)), name: "P")
    circle((rel: (.7, -1)), name: "G")
    line("G", "P")
    line("X", "P")

    // XL
    hide(circle("X"))
    hide(circle((rel: (-1.1, -1)), name: "XL"))
    intersections("XXL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "XL-rect")
        hide(circle("X"))
        hide(line("X.center", "XL.center"))
    })
    line("XXL.0", "XXL.1")

    // PL
    hide(circle("P"))
    hide(circle((rel: (-.9, -1)), name: "PL"))
    intersections("PPL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "PL-rect")
        hide(circle("P"))
        hide(line("P.center", "PL.center"))
    })
    line("PPL.0", "PPL.1")

    // GL
    hide(circle("G"))
    hide(circle((rel: (-.7, -1)), name: "GL"))
    intersections("GGL", {
        rect((rel: (-.15, .35)), (rel: (.7, -1.5)), name: "GL-rect")
        hide(circle("G"))
        hide(line("G.center", "GL.center"))
    })
    line("GGL.0", "GGL.1")

    // GR
    hide(circle("G"))
    hide(circle((rel: (.7, -1)), name: "GR"))
    intersections("GGR", {
        rect((rel: (-.55, .35)), (rel: (.7, -1.5)), name: "GR-rect")
        hide(circle("G"))
        hide(line("G.center", "GR.center"))
    })
    line("GGR.0", "GGR.1")

    content("G", $G$)
    content("X", $X$)
    content("P", $P$)

    content("XL-rect", $X_L$)
    content("GR-rect", $G_R$)
    content("PL-rect", $X_R$)
    content("GL-rect", $P_R$)
})
```

::

---

### 复杂度证明

TBD


---

## 摊还分析

记 $c_i$ 为第 $i$ 次操作的 cost，则

$$
\begin{align*}
    \text{最坏 Cost} &= \max_{1\leq i \leq M}c_i \\
    \text{平均 Cost} &= \frac{1}{M}\sum_{i=1}^{M}c_i
\end{align*}
$$

TBD
