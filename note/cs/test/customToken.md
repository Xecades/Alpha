---
title: 自定义语法
---

## 数学公式

利用 [KaTeX](https://katex.org/) 渲染数学公式。

### 行内公式

```md
... $<公式内容>$ ...
```

> 可以不难推得 $\varphi(n):=n\prod_{p\mid n}(1-\frac{1}{p})$。
>
> $\mathfrak{Xecades}$ 这个名字来源于单词 Decade：$\text{10 Decades}\rightarrow \text{X Decades}\rightarrow \text{Xecades}$。

### 行间公式

```md
$$
<公式内容>
$$
```

> $$
> \begin{aligned}
> &\Bigl(f*g\Bigr)(6) \\
> =&\sum_{d\mid 6}f(d)g\biggl(\dfrac{6}{d}\biggr) \\
> =&f(1)g(6)+f(2)g(3)+f(3)g(2)+f(6)g(1)
> \end{aligned}
> $$

---

## Emoji

使用 [`Node-emoji` 库](https://github.com/omnidan/node-emoji)转译 Emoji。

```md
... :<emoji>: ...
```

> 诶，:nerd_face: :point_up_2: 我有一计！

---

## 引言

适合用于展示名言、引用等。

```md
::quote
<引言内容>
::
```

::quote
Two roads diverged in a wood, and I—\
I took *the one less traveled by*,\
And that has made all the difference.\
<right>—Robert Frost</right>
::

::quote
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
::

::quote
$$
e ^ {i \pi} + 1 = 0
$$
::

---

## Note

功能上类似于 MkDocs Material 的 [Admonitions](https://squidfunk.github.io/mkdocs-material/reference/admonitions/)，用于提供额外信息。

```md
::note{[default] | primary | success | info | warning | danger}
<Note 内容>
::
```

::note
这里是 `note.default` 的内容
::

::note{primary}
这里是 `note.primary` 的内容
::

::note{success}
这里是 `note.success` 的内容
::

::note{info}
这里是 `note.info` 的内容
::

::note{warning}
这里是 `note.warning` 的内容
::

::note{danger}
这里是 `note.danger` 的内容
::

::note{success}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
::

::note{danger}
$\text{P} \neq \text{NP}$
::

---

## 链接卡片

```md
::linkcard{href="<链接地址>"}
<链接名称>
::
```

::linkcard{href="https://blog.xecades.xyz/"}
Xecades 的博客
::

::linkcard{href="https://github.com/xecades/alpha"}
$\mathfrak{Xecades} :: \alpha$ 的 GitHub 仓库
::

::linkcard{href="/"}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
::
