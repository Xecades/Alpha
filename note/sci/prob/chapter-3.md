---
title: Ch.3 数字特征与特征函数
---

## 期望

对于分布函数 $F(x)$，若 $\int_{-\infty}^{\infty}|x|\mathrm{d}F(x)<\infty$，则称

$$
\mathbb{E}(\xi)=\int_{-\infty}^{\infty}x\mathrm{d}F(x)
$$

为 $\xi$ 的**期望**. （这种积分形式称作 **Stieltjes 积分**）

变形可得

$$
\mathbb{E}(\xi)=\int_0^{\infty}P(\xi>t)\,\mathrm{d}t-\int_{-\infty}^0P(\xi\leqslant t)\,\mathrm{d}t
$$
