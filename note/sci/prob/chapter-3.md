---
title: Ch.3 数字特征与特征函数
---

## 期望

**期望 $\mathbb{E}(\xi)$** $=\displaystyle\int_{-\infty}^{\infty}x\mathrm{d}F(x)$，如果 $\displaystyle\int_{-\infty}^{\infty}|x|\mathrm{d}F(x)<\infty$.（这种积分形式称作 **Stieltjes 积分**）

 - 变形可得另一计算式 $\mathbb{E}(\xi)=\displaystyle\int_0^{\infty}P(\xi>t)\,\mathrm{d}t-\int_{-\infty}^0P(\xi\leqslant t)\,\mathrm{d}t$.
 - 为什么写 $\mathrm{d}F(x)$ 而不是 $p(x)\mathrm{d}x$？因为前者适用于任何分布，后者只适用于连续分布. 在连续分布的意义下，$\mathrm{d}F(x)=p(x)\mathrm{d}x$.

**随机变量函数的期望**：若 $\eta=f(\xi)$，则 $\mathbb{E}(\eta)=\mathbb{E}(f(\xi))=\displaystyle\int_{-\infty}^{\infty}f(x)\mathrm{d}F_\xi(x)$.

 - 该式对于连续分布是显然的：$\mathbb{E}(f(\xi))=\displaystyle\int_{-\infty}^{\infty}f(x)p(x)\mathrm{d}x$.
 - 该式可以推广到多维随机向量：$\mathbb{E}(f(\xi_1,\xi_2))=\displaystyle\int_{-\infty}^{\infty}\displaystyle\int_{-\infty}^{\infty}f(x_1,x_2)\mathrm{d}F(x_1,x_2)$.
 - **若 $\xi$ 与 $\eta$ 同分布，则 $\mathbb{E}(f(\xi))=\mathbb{E}(f(\eta))$**.（显然）
 - **若 $\forall f$ 都有 $\mathbb{E}(f(\xi))=\mathbb{E}(f(\eta))$，则 $\xi$ 与 $\eta$ 同分布**.（＊）

**性质**：

 - 若 $a\leqslant\xi\leqslant b$，则 $\mathbb{E}(\xi)$ 存在，且 **$a\leqslant\mathbb{E}(\xi)\leqslant b$**.（显然）
 - 若 $|\xi|\leqslant\eta$，且 $\mathbb{E}(\eta)$ 存在，则 $\mathbb{E}(\xi)$ 存在，且 **$|\mathbb{E}(\xi)|\leqslant\mathbb{E}(|\xi|)\leqslant\mathbb{E}(\eta)$**.（＊）
 - **$\mathbb{E}$ 是线性的**：$\mathbb{E}(a\xi+b\eta+c)=a\mathbb{E}(\xi)+b\mathbb{E}(\eta)+c$.
 - 若 $\xi_1,\xi_2,\cdots,\xi_n$ 相互独立，则 **$\mathbb{E}(\xi_1\xi_2\cdots\xi_n)=\mathbb{E}(\xi_1)\mathbb{E}(\xi_2)\cdots\mathbb{E}(\xi_n)$**.
