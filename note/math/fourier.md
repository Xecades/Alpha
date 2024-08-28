---
title: 离散傅里叶变换和离散傅里叶反变换文字文字文字文字文字文字文字文字文字文字
---

**离散傅里叶变换**（Discrete Fourier Transform, DFT）和**离散傅里叶反变换**（Inverse Discrete Fourier Transform, IDFT） 是鼎鼎大名的**快速傅里叶变换**（Fast Fourier Transform, FFT）的前置知识.

其中 FFT 用于加速两个多项式 $A(x)$、$B(x)$ 的乘积 $C(x)$ 的计算，DFT 和 IDFT 是 FFT 的两个中间步骤.

<!-- more -->

需要明确，给定的是两个多项式：

$$\left\{\begin{align*}
A(x)&=a_0+a_1x+a_2x^2+\cdots+a_{n-1}x^{n-1}\\
B(x)&=b_0+b_1x+b_2x^2+\cdots+b_{m-1}x^{m-1}
\end{align*}\right.$$

其中 $A(x)$ 是一个 $n$ 项多项式，$B(x)$ 是一个 $m$ 项多项式.

我们要求的多项式函数 $C(x)$ 为一个 $n+m-1$ 项的多项式（考虑最低项 $x$ 的幂次为 $1$，最高项为 $n-1+m-1=n+m-2$，共 $1+(n+m-2)=n+m-1$ 项）.

要了解 DFT 和 IDFT，还需要一些前置知识.

---

## 多项式的系数表示法

我们平时用的多项式系数 $a_0,a_1,\dots,a_{n-1}$ 就属于多项式的系数表示法.

我们称 $n$ 维系数向量 $(a_0,a_1,\dots,a_{n-1})$ 为 $A(x)$ 的**系数表示**，其中：

$$\boxed{A(x)=\sum_{i=0}^{n-1}a_i\cdot x^i}$$

对于 $A(x)$ 的系数表示 $(a_0,a_1,\dots,a_{n-1})$ 和 $B(x)$ 的系数表示 $(b_0,b_1,\dots,b_{m-1})$，要求 $C(x)$ 的系数表示，显然可以通过以下代码实现:

```cpp
for (int i = 0; i < n; i++)
    for (int j = 0; j < m; j++)
        c[i + j] += a[i] * b[j];
```

得到的 $C(x)$ 为 $n+m-1$ 项多项式.

这个朴素算法的时间复杂度是 $O(n^2)$ 的.

---

## 多项式的点值表示法

点值表示法是 DFT 算法的核心.

我们在 $\mathbb{C}$ 上**任意**取一组**不同**的 $x_i$，共 $n$ 个，记为向量 $(x_0,x_1,\dots,x_{n-1})$，这里的 $x_i$ 称为**插值节点**.

将每个 $x_i$ 分别代入 $A(x)$，得到一组共 $n$ 个运算结果 $y_i$，记为向量 $(y_0,y_1,\dots,y_{n-1})$.

也就是说，求

$$\boxed{y_i=A(x_i)=\sum_{j=0}^{n-1}a_j\cdot x_i^j}$$

向量 $(y_0,y_1,\dots,y_{n-1})$ 称为多项式 $A(x)$ 的**点值表示**.

---

下面我们证明，一个 $n$ 项多项式（$n-1$ 次）在 $n$ 个不同点的取值唯一确定该多项式.

考虑反证法.

假设两个不同的多项式 $A(x)$ 和 $B(x)$，它们满足，对 $\forall i\in[0,n-1]$，总有 $A(x_i)=B(x_i)$.

令 $T(x)=A(x)-B(x)$，则对 $\forall i\in[0,n-1]$，都有 $T(x)=0$.

也就是说，$n-1$ 次多项式 $T(x)$ 有 $n$ 个根，和代数基本定理（一个 $n-1$ 次多项式**在复数域上**有且仅有 $n-1$ 个根）矛盾，假设不成立，证毕.

---

通过系数表示求点值表示，复杂度为 $O(n^2)$.

通过点值表示求系数表示，可以使用**插值**算法，其朴素形式复杂度为 $O(n^2)$.

若已知 $A(x)$ 和 $B(x)$ 的点值表示 $(a_0,a_1,\dots,a_{n-1})$ 和 $(b_0,b_1,\dots,b_{n-1})$，那么多项式乘积 $C(x)=A(x)\cdot B(x)$ 可以简单地表示为

$$\boxed{(a_0\cdot b_0,a_1\cdot b_1,\dots,a_{n-1}\cdot b_{n-1})}$$

设 $A(x)$ 的点值表示有 $r$ 项，$B(x)$ 的有 $s$ 项，为了保证所得能确定唯一的 $C(x)$，**我们需要在 $A$、$B$ 中至少取 $r+s$ 个插值节点**.

倘若能快速地转换**点值表示法**和**系数表示法**，求 $C(x)$ 的过程就会被大大加速.

---

确定了方向，让我们来捋一捋 DFT 求算 $C(x)$ 的思路，以便于思考.

1. 输入 $A(x)$ 和 $B(x)$ 的系数表示；
2. 将其分别转换为点值表达式；
3. 通过这两个点值表达式计算 $C(x)$ 的点值表达式；
4. 将 $C(x)$ 的点值表示转化为系数表示，即为结果.

---

## 单位复数根模型

互联网上有很多相关的资料，这里只提一下后面要用的引理.

1. $\omega_n^k=\cos(2\pi\cdot\dfrac{k}{n})+i\sin(2\pi\cdot\dfrac{k}{n})$；
2. $\omega_n^k=\omega_n^{k\mod n}$；
3. （折半引理）$\omega^{2k}_{2n}=\omega^k_n$；
4. （消去引理）$\omega^{k+n/2}_n=-\omega^k_n$.

确保理解前置知识过后，我们进入正题.

---

## 离散傅里叶变换

考虑一个 $n$ 项多项式 $A(x)$，其中 $n=2^x$，$x\in\mathbb{N}^*$，不足 $2^x$ 的补系数为 $0$ 的项.

$$A(x)=a_0+a_1x+a_2x^2+\cdots+a_{n-1}x^{n-1}$$

倘若取 $n$ 次单位根的 $0\sim n-1$ 次幂，分别代入 $A(x)$，得到一个点值向量 $(A(\omega_n^0),A(\omega_n^1),\dots,A(\omega_n^{n-1}))$.

对给定多项式进行这样操作的过程，称为**离散傅里叶变换**（Discrete Fourier Transform, DFT）.

显然，如果直接代入，DFT 的朴素实现仍然很低效.

考虑对其优化.

---

对于任意多项式 $A(x)=a_0+a_1x+a_2x^2+\cdots+a_{n-1}x^{n-1}$，将每一项按照幂次的奇偶分组：

$$\begin{align*}
A(x)&=(a_0+a_2x^2+a_4x^4+\cdots+a_{n-2}x^{n-2})+(a_1x^1+a_3x^3+a_5x^5+\dots+a_{n-1}x^{n-1})\\
&=(a_0+a_2x^2+a_4x^4+\cdots+a_{n-2}x^{n-2})+x\cdot(a_1+a_3x^2+a_5x^4+\dots+a_{n-1}x^{n-2})
\end{align*}$$

令

$$A_1(x)=a_0+a_2x+a_4x^2+\cdots+a_{n-2}x^{(n-2)/2}$$

$$A_2(x)=a_1+a_3x+a_5x^2+\cdots+a_{n-1}x^{(n-2)/2}$$

那么，有

$$\boxed{A(x)=A_1(x^2)+x\cdot A_2(x^2)}$$

对于 $\forall k\in[0,n-1]$，$k\in\mathbb{R}$，

$$A(\omega_n^k)=A_1(\omega_n^{2k})+\omega^k_n\cdot A_2(\omega_n^{2k})$$

考虑如何简化右式.

---

{% note info info %}
**注意**，请牢记 $n$ 是 $2$ 的整数次幂，即 $n=2^x$.
{% endnote %}

对于 $k\in[0,\dfrac{n}{2}-1]$ 的部分（$\dfrac{n}{2}$ 是整数）：

$$\begin{align*}
A(\omega_n^k)&=A_1(\omega_n^{2k})+\omega^k_n\cdot A_2(\omega_n^{2k})\\
&=\boxed{A_1(\omega_{n/2}^k)+\omega^k_n\cdot A_2(\omega_{n/2}^k)}
\end{align*}$$

对于 $k+\dfrac{n}{2}\in[\dfrac{n}{2},n-1]$ 的部分：

$$A(\omega_n^{k+n/2})=A_1(\omega_n^{2k+n})+\omega^{k+n/2}_n\cdot A_2(\omega_n^{2k+n})$$

注意到：

$$\omega^{2k+n}_n=\omega^{2k}_n\cdot\omega_n^n=\omega^{2k}_n=\omega^k_{n/2}$$

和

$$\omega^{k+n/2}_{n}=-\omega^k_n$$

则有：

$$\boxed{A(\omega_n^{k+n/2})=A_1(\omega^k_{n/2})-\omega^k_n\cdot A_2(\omega^k_{n/2})}$$

$k$ 与 $k+\dfrac{n}{2}$ 取遍了 $0\sim n-1$ 这 $n$ 个整数，因此能通过这 $n$ 个点值反解系数.

---

把这两个式子写在一起：

$$A(\omega_n^k)=A_1(\omega_{n/2}^k)+\omega^k_n\cdot A_2(\omega_{n/2}^k)$$

$$A(\omega_n^{k+n/2})=A_1(\omega^k_{n/2})-\omega^k_n\cdot A_2(\omega^k_{n/2})$$

只要知道 $\omega_{n/2}^0,\omega_{n/2}^1,\dots,\omega_{n/2}^{n/2-1}$，转化为子问题，就可以在 $O(n\log n)$ 的时间内求得 $A(x)$.

这个过程就是 DFT.

---

## 离散傅里叶反变换

将用单位根求出的点值表示的多项式转化为系数表示，这个过程即为**离散傅里叶反变换**（Inverse Discrete Fourier Transform）.

也就是说，要通过插值为单位根的 $n$ 维点值向量 $(A(\omega_n^0),A(\omega_n^1),\dots,A(\omega_n^{n-1}))$ 推出 $n$ 维系数向量 $(a_0,a_1,\dots,a_{n-1})$.

可以把离散傅里叶反变换理解为离散傅里叶变换的逆操作.

假设 $(a_0,a_1,\dots,a_{n-1})$ 进行一次 DFT 的结果是 $(d_0,d_1,\dots,d_{n-1})$.

构造辅助多项式：

$$F(x)=d_0+d_1x+d_2x^2+\cdots+d_{n-1}x^{n-1}$$

在 $F(x)$ 中，$(d_0,d_1,\dots,d_{n-1})$ 是系数向量.

---

取插值节点 $x_k=\omega_n^{-k}$（$k\in[0,n-1]$），将其代入 $F(x)$，得到另一组点值向量 $(c_0,c_1,\dots,c_{n-1})$.

也就是说：

$$c_k=\sum_{i=0}^{n-1}d_ix_k^i=\sum_{i=0}^{n-1}d_i(\omega_n^{-k})^i$$

将 $d_i$ 还原，并化简 $c_k$：

$$\begin{align*}
c_k&=\sum_{i=0}^{n-1}[\sum_{j=0}^{n-1}a_j\cdot(\omega_n^i)^j]\cdot(\omega_n^{-k})^i\\
&=\sum_{j=0}^{n-1}a_j\sum_{i=0}^{n-1}(\omega_{n}^{i})^{j-k}
\end{align*}$$

---

考虑这个式子的右半部分，令：

$$\boxed{S(\delta)=\sum_{i=0}^{n-1}(\omega_{n}^{i})^\delta}$$

则有 $c_k=\sum\limits_{j=0}^{n-1}a_j\cdot S(j-k)$，

$$S(\delta)=\omega_n^0+\omega_n^\delta+\omega_n^{2\delta}+\cdots+\omega_n^{(n-1)\delta}$$

注意到 $\omega_n^\delta\neq1$ 时，这是一个等比数列.

分类讨论 $\delta$.

---

如果 $\omega_n^\delta=1$，有 $\delta=0$，则：

$$S(j-k)=S(\delta)=S(0)=n$$

$j-k=0$，即 $j=k$ 时，$S(\delta)=n$.

---

如果 $\omega_n^\delta\neq1$，有 $\delta\neq0$，则 $S(\delta)$ 是公比为 $\omega_n^\delta$ 的等比数列.

根据等比数列求和公式：

$$\begin{align*}
S(\delta)&=\dfrac{\omega_{n}^{0}[(\omega_{n}^{\delta})^{n}-1]}{\omega_{n}^{\delta}-1}\\
&=\dfrac{1\cdot[(\omega_{n}^{n})^{\delta}-1]}{\omega_{n}^{\delta}-1}\\
&=\dfrac{[1^{\delta}-1]}{\omega_{n}^{\delta}-1}\\
&=\dfrac{0}{\omega_{n}^{\delta}-1}\\
&=0
\end{align*}$$

也就是说，$j\neq k$ 时，$S(\delta)=0$.

---

故 $S(j-k)$ 是这样一个分段函数：

$$S(j-k)=\left\{\begin{align*}
&n &(j=k)\\
&0 &(j\neq k)
\end{align*}\right.$$

将其代入原式：

$$c_k=\sum_{j=0}^{n-1}a_j\cdot S(j-k)=a_k\cdot n$$

得到：

$$\boxed{a_k=\dfrac{c_k}{n}}$$

这里的 $a_k$ 就是原式的系数.

（忍不住说一声，这个式子太简洁了，向研究傅里叶变换的前辈们致以崇高的敬意！）

---

由此我们可以得到以下步骤：

1. 对多项式 $A(x)$，将其用插值节点 $(\omega_n^0,\omega_n^1,\dots,\omega_n^{n-1})$ 进行一次 DFT，得到 $(d_0,d_1,\dots,d_{n-1})$.

2. 我们再将 $(\omega_n^0,\omega_n^1,\dots,\omega_n^{n-1})$ 作为系数，用插值节点 $(\omega_n^{-0},\omega_n^{-1},\dots,\omega_n^{-(n-1)})$ 再进行一次 DFT，得到 $(c_0,c_1,\dots,c_{n-1})$.

3. 将 $(c_0,c_1,\dots,c_{n-1})$ 每一项除以 $n$，得到的向量就是我们要求的 $(a_0,a_1,\dots,a_{n-1})$.

这个过程就是 IDFT.

---

## 快速傅里叶变换

略讲一下 FFT 的原理.

1. 给定多项式 $A(x)$ 和 $B(x)$，得到其系数表示.
2. 对 $A(x)$ 和 $B(x)$ 分别进行 DFT，得到两个点值向量.
3. 对这两个点值向量每一项相乘，得到一个点值向量.
4. 对这个点值向量进行 IDFT，即得到所求 $C(x)$ 的系数表示.

以后可能会在另一篇文章补上 FFT 的代码实现，敬请期待.

---

## Reference

 - 参考 [「一小时学会快速傅里叶变换」](https://zhuanlan.zhihu.com/p/31584464) by [白空谷](https://www.zhihu.com/people/whitebunny)
 - 参考 [「维基百科 - 离散傅里叶变换」](https://zh.wikipedia.org/wiki/%E7%A6%BB%E6%95%A3%E5%82%85%E9%87%8C%E5%8F%B6%E5%8F%98%E6%8D%A2)
 - 参考 [「维基百科 - 快速傅里叶变换」](https://zh.wikipedia.org/wiki/%E5%BF%AB%E9%80%9F%E5%82%85%E9%87%8C%E5%8F%B6%E5%8F%98%E6%8D%A2)