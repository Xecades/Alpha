---
title: Ch.2 随机变量与分布函数
---

## 离散型随机变量

### 退化分布 / 单点分布

$\xi$ 恒为常数 $c$，即 $P(\xi=c)=1$.

$$
p_{\xi}(k)=1,\quad k=c
$$

---

### 两点分布 / 伯努利分布 / 01 分布

$\xi$ 为事件 $A$ 的示性函数：

$$
\xi=\begin{cases}
1 & \text{如果 } A \text{ 发生} \\
0 & \text{如果 } A \text{ 不发生}
\end{cases}
$$

其中 $A$ 发生的概率为 $p$，则

$$
p_{\xi}(k)=\begin{cases}
p & k=1 \\
1-p & k=0
\end{cases}
$$

记作 $\xi\sim B(1,p)$.

---

### 二项分布

$\xi$ 为 $n$ 次独立重复试验中事件 $A$ 发生的次数.

$$
p_{\xi}(k)=\binom{n}{k} p^kq^{n-k}:=b(k;n,p),\quad k=0,1,2,\cdots,n
$$

记作 $\xi\sim B(n,p)$.

1. $b(k;n,p) = b(n-k;n,1-p)$.
2. $k=m$ 时 $b(k;n,p)$ 达到最大，$m$ 称为最可能成功次数.
    - 若 $(n+1)p$ 是整数，则 $m=(n+1)p$ 或 $m=(n+1)p-1$；
    - 若 $(n+1)p$ 不是整数，则 $m=\lfloor (n+1)p \rfloor$.
3. 若 $\xi\sim B(n,p)$，则
   $$
   P(\xi=k+1)=\frac{p(n-k)}{q(k+1)}P(\xi=k).
   $$
4. （**泊松定理**）假设 $p$ 与 $n$ 有关，记作 $p_n$，若 $\lim\limits_{n\to\infty}np_n=\lambda$，则
   $$
   \lim_{n\to\infty}b(k;n,p_n)=\frac{\lambda^k}{k!}e^{-\lambda}.
   $$

---

### 泊松分布

由泊松定理引入，$\xi$ 取一切非负整数.

$$
p_{\xi}(k)=\frac{\lambda^k}{k!}e^{-\lambda}:=p(k;\lambda),\quad \lambda>0,\ k=0,1,2,\cdots
$$

记作 $\xi\sim P(\lambda)$.

---

### 几何分布

$\xi$ 为伯努利试验首次成功的次数.

$$
p_{\xi}(k)=pq^{k-1}:=g(k;p),\quad k=1,2,3\cdots
$$

**无记忆性**：$P(\xi>k+m\mid \xi>m)=P(\xi>k)$.

如果前 $m$ 次试验都失败，那么从第 $m+1$ 次开始到成功的次数 $\eta$ 仍服从几何分布.

---

### 超几何分布

$N$ 件产品中有 $M$ 件次品，从中抽取 $n$ 件，其中次品数为 $\xi$.

$$
p_{\xi}(k)=\frac{\binom{M}{k}\binom{N-M}{n-k}}{\binom{N}{n}},\quad k=0,1,2,\cdots,\min(n,M)
$$

---

### 巴斯卡分布

$\xi$ 为得到第 $r$ 次成功时的伯努利试验次数.

$$
p_{\xi}(k)=\binom{k-1}{r-1}p^r q^{k-r},\quad k=r,r+1,r+2,\cdots
$$

---

## 连续型随机变量

### 均匀分布

$\xi$ 在区间 $[a,b]$ 上均匀取值.

$$
p_{\xi}(x)=\begin{cases}
\frac{1}{b-a} & a\leqslant x\leqslant b \\
0 & \text{otherwise}
\end{cases}
$$

记作 $\xi\sim U(a,b)$.

---

### 正态分布 / 高斯分布

$$
p_{\xi}(x)=\frac{1}{\sqrt{2\pi}\sigma}\exp\left\{{-\frac{(x-a)^2}{2\sigma^2}}\right\},\quad -\infty<x<\infty
$$

记作 $\xi\sim N(a,\sigma^2)$.

当 $a=0$，$\sigma=1$ 时，称为**标准正态分布**，其密度及分布函数分别记作 $\varphi(x)$ 和 $\Phi(x)$.

$$
\begin{align*}
\varphi(x)&=\frac{1}{\sqrt{2\pi}}e^{-\frac{x^2}{2}} \\[1em]
\Phi(x)&=\int_{-\infty}^x\varphi(t)\,\mathrm{d}t=\frac{1}{\sqrt{2\pi}}\int_{-\infty}^x e^{-\frac{t^2}{2}}\,\mathrm{d}t
\end{align*}
$$

---

### 指数分布

$$
p_{\xi}(x)=\begin{cases}
\lambda e^{-\lambda x} & x\geqslant 0 \\
0 & x<0
\end{cases}\qquad \lambda>0
$$

分布函数

$$
F(x)=\begin{cases}
1-e^{-\lambda x} & x\geqslant 0 \\
0 & x<0
\end{cases}
$$

---

### $\Gamma$ 分布

$$
p_{\xi}(x)=\begin{cases}
\frac{\lambda^r}{\Gamma(r)}x^{r-1}e^{-\lambda x} & x\geqslant 0 \\
0 & x<0
\end{cases}\qquad \lambda>0,\ r>0
$$

其中 $\Gamma(r)$ 为第一类欧拉积分.

参数为 $\lambda$ 和 $r$ 的 $\Gamma$ 分布记作 $\Gamma(\lambda,r)$.

当 $r$ 为整数时也称**爱尔兰分布**. $r=1$ 时，退化为指数分布.

---

### TBD

---

## 分布函数

称

$$
F(x)=P(\xi\leqslant x),\quad -\infty<x<\infty
$$

为随机变量 $\xi$ 的**分布函数**.

称满足

$$
F(x)=\int_{-\infty}^x p(t)\,\mathrm{d}t
$$

的函数 $p(x)$ 为 $\xi$ 的**密度函数**，$\xi$ 称为**连续型随机变量**.

