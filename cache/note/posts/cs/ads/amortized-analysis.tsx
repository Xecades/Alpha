import Anchor from "@/components/md/Anchor.vue";
import BlockCode from "@/components/md/BlockCode.vue";
import BlockMath from "@/components/md/BlockMath.vue";
import Delimiter from "@/components/md/Delimiter.vue";
import Fold from "@/components/md/Fold.vue";
import Grid from "@/components/md/Grid.vue";
import ImageCaptioned from "@/components/md/ImageCaptioned.vue";
import InlineMath from "@/components/md/InlineMath.vue";
import LinkCard from "@/components/md/LinkCard.vue";
import Note from "@/components/md/Note.vue";
import Tab from "@/components/md/Tab.vue";
import temp_0 from "/cache/note/temp/amortized-analysis.0.300023cd.svg";
import temp_1 from "/cache/note/temp/amortized-analysis.1.092649ff.svg";
import temp_2 from "/cache/note/temp/amortized-analysis.2.e26b1f38.svg";
import temp_3 from "/cache/note/temp/amortized-analysis.3.36ee44cc.svg";
import temp_4 from "/cache/note/temp/amortized-analysis.4.31c021e6.svg";
import temp_5 from "/cache/note/temp/amortized-analysis.5.f5ae4e18.svg";
import type { JSX } from "vue/jsx-runtime";
const jsx: JSX.Element = (<><p>设想一个栈，在其上定义三种操作：<InlineMath data={"\\text{push}"}></InlineMath>、<InlineMath data={"\\text{pop}"}></InlineMath>、<InlineMath data={"\\text{multiPop}"}></InlineMath>。其中 <InlineMath data={"\\text{push}"}></InlineMath> 和 <InlineMath data={"\\text{pop}"}></InlineMath> 顾名思义，<InlineMath data={"\\text{multiPop}(k)"}></InlineMath> 指连续地 <InlineMath data={"\\text{pop}"}></InlineMath> 出栈中的 <InlineMath data={"k"}></InlineMath> 个元素。</p>
<p>显然，<InlineMath data={"\\text{push}"}></InlineMath> 和 <InlineMath data={"\\text{pop}"}></InlineMath> 都是 <InlineMath data={"O(1)"}></InlineMath> 的时间复杂度，而 <InlineMath data={"\\text{multiPop}"}></InlineMath> 是 <InlineMath data={"O(n)"}></InlineMath> 的复杂度，其中 <InlineMath data={"n"}></InlineMath> 为栈中元素的个数。</p>
<p>如果按照最坏情况来计算这个数据结构的复杂度，那么只要一次性 <InlineMath data={"\\text{multiPop}"}></InlineMath> 出栈中所有 <InlineMath data={"n"}></InlineMath> 个元素，就会消耗 <InlineMath data={"O(n)"}></InlineMath> 的时间，也就是说<strong>最坏时间复杂度</strong>（<em>Worst-case Time Complexity</em>）是 <InlineMath data={"O(n)"}></InlineMath>。但这能够代表实际使用中的表现吗？并不能，因为要想能 <InlineMath data={"\\text{multiPop}"}></InlineMath> 出 <InlineMath data={"n"}></InlineMath> 个元素，栈中必须至少有 <InlineMath data={"n"}></InlineMath> 个元素，也就是说前面一定有不少于 <InlineMath data={"n"}></InlineMath> 个复杂度为 <InlineMath data={"O(1)"}></InlineMath> 的 <InlineMath data={"\\text{push}"}></InlineMath> 操作。这样一均摊下来，每次操作的复杂度就是 <InlineMath data={"O(1)"}></InlineMath>。</p>
<p>像这样分析，我们得到整个数据结构的<strong>平均时间复杂度</strong>（<em>Average Time Complexity</em>）。但在实际研究中，要想达到真正的平均是很难的，因此我们引入<strong>摊还时间复杂度</strong>（<em>Amortized Time Complexity</em>）的概念，它本质上是<strong>对平均时间复杂度上界的逼近</strong>。</p>
<hr />
<h2 id="t" tabindex="-1" class="heading">引入 <a class="cursor header-anchor" href="#t">¶</a></h2>
<p>在连续的 <InlineMath data={"M"}></InlineMath> 次操作中，记 <InlineMath data={"c_i"}></InlineMath> 为第 <InlineMath data={"i"}></InlineMath> 次操作的开销（<em>Cost</em>），则</p>
<BlockMath data={"\\begin{align*}\n    T_\\text{worst} &= \\max_{1\\leq i \\leq M}c_i \\\\\n    T_\\text{average} &= \\frac{1}{M}\\sum_{i=1}^{M}c_i\n\\end{align*}\n"}></BlockMath><p>我们希望构造出一组<strong>摊还开销</strong>（<em>Amortized Cost</em>） <InlineMath data={"\\hat{c_i}"}></InlineMath>，使得 <InlineMath data={"T_\\text{amortized} := \\frac{1}{M}\\sum_{i=1}^M \\hat{c_i}"}></InlineMath> 能够反映 <InlineMath data={"T_\\text{average}"}></InlineMath> 的上界，即</p>
<BlockMath data={"T_\\text{amortized} \\geqslant T_\\text{average}\n"}></BlockMath><p>这样，如果我们能够想办法证明 <InlineMath data={"T_\\text{amortized} = O\\bigl(f(n)\\bigr)"}></InlineMath> 的，那么同时也就证明了 <InlineMath data={"T_\\text{average}"}></InlineMath> 也是 <InlineMath data={"O\\bigl(f(n)\\bigr)"}></InlineMath> 的。据此，我们希望 <InlineMath data={"T_\\text{amortized}"}></InlineMath> 和 <InlineMath data={"T_\\text{average}"}></InlineMath> 之间的差距尽可能小，即</p>
<BlockMath data={"\\sum_{i=1}^M \\Delta_i := \\sum_{i=1}^M \\hat{c_i} - c_i\n"}></BlockMath><p>在满足<strong>非负</strong>的同时尽可能小。</p>
<p>我们关注的重点即为如何构造这个 <InlineMath data={"\\Delta_i"}></InlineMath>。</p>
<hr />
<h2 id="t-2" tabindex="-1" class="heading">势能法 <a class="cursor header-anchor" href="#t-2">¶</a></h2>
<p>一种常用的分析方法是<strong>势能法</strong>（<em>Potential Method</em>）。它借用物理中势能的概念，给当前数据结构的状态 <InlineMath data={"D_i"}></InlineMath> 赋予一个<strong>势能</strong> <InlineMath data={"\\Phi(D_i)"}></InlineMath>，并通过势能的变化来分析摊还开销。</p>
<p>取 <InlineMath data={"\\Delta_i = \\hat{c_i} - c_i := \\Phi(D_i) - \\Phi(D_{i-1})"}></InlineMath>，那么</p>
<BlockMath data={"\\sum_{i=1}^M \\Delta_i = \\Phi(D_M) - \\Phi(D_0)\n"}></BlockMath><p>只要势函数 <InlineMath data={"\\Phi"}></InlineMath> 选择得合适，保证 <InlineMath data={"\\Phi(D_i)"}></InlineMath> 始终非负，如果初始情况的势能 <InlineMath data={"\\Phi(D_0)"}></InlineMath> 为 <InlineMath data={"0"}></InlineMath>，那么自然就保证了 <InlineMath data={"\\sum_{i=1}^M \\Delta_i \\geqslant 0"}></InlineMath> 的条件。这种需求显然更容易实现。</p>
<hr />
<p>在上面的例子中，定义势函数 <InlineMath data={"\\Phi(D_i)"}></InlineMath> 为第 <InlineMath data={"i"}></InlineMath> 次操作后<strong>栈中的元素个数</strong>，则 <InlineMath data={"\\Phi(D_i) \\geqslant 0 = \\Phi(D_0)"}></InlineMath>。对于三种操作</p>
<ul>
<li><InlineMath data={"\\text{push}"}></InlineMath>：<InlineMath data={"\\Delta_i = \\Phi(D_i) - \\Phi(D_{i-1}) = (\\operatorname{sizeof}S+1) - \\operatorname{sizeof}S = 1"}></InlineMath>，摊还开销 <InlineMath data={"\\hat{c_i} = c_i + \\Delta_i = 1+1 = 2"}></InlineMath>。</li>
<li><InlineMath data={"\\text{pop}"}></InlineMath>：<InlineMath data={"\\Delta_i = \\Phi(D_i) - \\Phi(D_{i-1}) = (\\operatorname{sizeof}S-1) - \\operatorname{sizeof}S = -1"}></InlineMath>，摊还开销 <InlineMath data={"\\hat{c_i} = c_i + \\Delta_i = 1-1 = 0"}></InlineMath>。</li>
<li><InlineMath data={"\\text{multiPop}(k)"}></InlineMath>：<InlineMath data={"\\Delta_i = \\Phi(D_i) - \\Phi(D_{i-1}) = (\\operatorname{sizeof}S-k) - \\operatorname{sizeof}S = -k"}></InlineMath>，摊还开销 <InlineMath data={"\\hat{c_i} = c_i + \\Delta_i = k-k = 0"}></InlineMath>。</li>
</ul>
<p>因此</p>
<BlockMath data={"\\sum_{i=1}^M\\hat{c_i} = \\sum_{i=1}^M O(1) = O(M) \\geqslant \\sum_{i=1}^M c_i\n"}></BlockMath><p>所以 <InlineMath data={"T_\\text{amortized} = O(M) / M = O(1)"}></InlineMath>。这是比最坏时间复杂度更贴近于现实的复杂度。</p>
<hr />
<h2 id="t-3" tabindex="-1" class="heading">Splay Tree 的摊还分析 <a class="cursor header-anchor" href="#t-3">¶</a></h2>
<p>在 <Anchor href="splay-tree">Splay Tree</Anchor> 中，我们给每个节点定义一个 <InlineMath data={"\\operatorname{rank}"}></InlineMath>：</p>
<BlockMath data={"\\operatorname{rank}i := \\log S(i)\n"}></BlockMath><p>其中 <InlineMath data={"S(i)"}></InlineMath> 为节点 <InlineMath data={"i"}></InlineMath> 包括自身的后代个数。</p>
<blockquote>
<p>定义 <InlineMath data={"\\operatorname{rank}"}></InlineMath> 函数的目的是模拟树高。</p>
<p>在一个完全二叉树中，树高为 <InlineMath data={"h"}></InlineMath> 的节点个数为 <InlineMath data={"i = 2^h-1"}></InlineMath>，此时 <InlineMath data={"\\log S(i)"}></InlineMath> 就是树高 <InlineMath data={"h"}></InlineMath>。虽然 Splay Tree 不一定是完全二叉树，但 <InlineMath data={"\\log S(i)"}></InlineMath> 仍然可以作为树高的一个近似。后面我们会看到，相较于直接用树高分析，<InlineMath data={"\\log S(i)"}></InlineMath> 的分析更为简单。</p>
</blockquote>
<p>定义树 <InlineMath data={"T"}></InlineMath> 的势函数</p>
<BlockMath data={"\\Phi(T) := \\sum_{i\\in T}\\operatorname{rank}i\n"}></BlockMath><p>显然，<InlineMath data={"\\Phi(T)"}></InlineMath> 恒非负，且空树的势能为 <InlineMath data={"0"}></InlineMath>。</p>
<p>Splay Tree 的操作都由 Zig、Zag、Zig-Zag 三种子操作构成。我们对于每种子操作分别分析。</p>
<hr />
<h3 id="t-4" tabindex="-1" class="heading">Zig 操作 <a class="cursor header-anchor" href="#t-4">¶</a></h3>
<Grid>
<Delimiter width="50%" />
<ImageCaptioned alt={"初始情况（[公式]）"} src={temp_0}>初始情况（<InlineMath data={"T_1"}></InlineMath>）</ImageCaptioned><Delimiter width="50%" />
<ImageCaptioned alt={"一次 Zig 操作后（[公式]）"} src={temp_1}>一次 Zig 操作后（<InlineMath data={"T_2"}></InlineMath>）</ImageCaptioned></Grid>
<BlockMath data={"\\begin{align*}\n    \\hat{c_i} &= c_i + \\Phi(T_2) - \\Phi(T_1) \\\\\n    &= 1 + \\operatorname{rank}_2 X - \\operatorname{rank}_1 X \\\\\n    &\\qquad + \\operatorname{rank}_2 P - \\operatorname{rank}_1 P\n\\end{align*}\n"}></BlockMath><p>由于变换后 <InlineMath data={"S(P)"}></InlineMath> 降低，所以 <InlineMath data={"\\operatorname{rank}_2 P - \\operatorname{rank}_1 P \\leqslant 0"}></InlineMath>，因此</p>
<BlockMath data={"\\hat{c_i}(\\text{Zig}) \\leqslant 1 + \\operatorname{rank}_2 X - \\operatorname{rank}_1 X\n"}></BlockMath><hr />
<h3 id="t-5" tabindex="-1" class="heading">Zig-Zag 操作 <a class="cursor header-anchor" href="#t-5">¶</a></h3>
<Grid>
<Delimiter width="50%" />
<ImageCaptioned alt={"初始情况（[公式]）"} src={temp_2}>初始情况（<InlineMath data={"T_1"}></InlineMath>）</ImageCaptioned><Delimiter width="50%" />
<ImageCaptioned alt={"一次 Zig-Zag 操作后（[公式]）"} src={temp_3}>一次 Zig-Zag 操作后（<InlineMath data={"T_2"}></InlineMath>）</ImageCaptioned></Grid>
<BlockMath data={"\\begin{align*}\n    \\hat{c_i} &= c_i + \\Phi(T_2) - \\Phi(T_1) \\\\\n    &= 2 + \\bcancel{\\operatorname{rank}_2 X} - \\operatorname{rank}_1 X \\\\\n    &\\qquad + \\operatorname{rank}_2 P - \\operatorname{rank}_1 P \\\\\n    &\\qquad + \\operatorname{rank}_2 G - \\bcancel{\\operatorname{rank}_1 G}\n\\end{align*}\n"}></BlockMath><blockquote>
<p>这里 <InlineMath data={"c_i = 2"}></InlineMath> 是因为 Zig-Zag 操作需要两次旋转。</p>
</blockquote>
<p>首先 <InlineMath data={"\\operatorname{rank}_2 X = \\operatorname{rank}_1 G"}></InlineMath>，两者抵消。</p>
<p>同时我们注意到不等式 <InlineMath data={"4ab \\leqslant (a + b) ^ 2"}></InlineMath> 恒成立，左右同时取以 <InlineMath data={"2"}></InlineMath> 为底的对数，得到 <InlineMath data={"2 + \\log a + \\log b \\leqslant 2\\log(a + b)"}></InlineMath>。在其中令 <InlineMath data={"a = S_2(P)"}></InlineMath>，<InlineMath data={"b = S_2(G)"}></InlineMath>，则</p>
<BlockMath data={"\\begin{align*}\n    & \\ 2 + \\operatorname{rank}_2 P + \\operatorname{rank}_2 G \\\\\n    =& \\ 2 + \\log S_2(P) + \\log S_2(G) \\\\\n    \\leqslant& \\ 2\\log\\bigl(S_2(P) + S_2(G)\\bigr) \\\\\n    <& \\ 2\\log\\bigl(S_2(P) + S_2(G) + 1\\bigr) \\\\\n    =& \\ 2\\log S_2(X) \\\\\n    =& \\ 2\\operatorname{rank}_2 X\n\\end{align*}\n"}></BlockMath><p>同时由于 <InlineMath data={"\\operatorname{rank}_1 P > \\operatorname{rank}_1 X"}></InlineMath>，最终我们得到</p>
<BlockMath data={"\\hat{c_i}(\\text{Zig-Zag}) \\leqslant 2(\\operatorname{rank}_2 X - \\operatorname{rank}_1 X)\n"}></BlockMath><hr />
<h3 id="t-6" tabindex="-1" class="heading">Zig-Zig 操作 <a class="cursor header-anchor" href="#t-6">¶</a></h3>
<Grid>
<Delimiter width="50%" />
<ImageCaptioned alt={"初始情况（[公式]）"} src={temp_4}>初始情况（<InlineMath data={"T_1"}></InlineMath>）</ImageCaptioned><Delimiter width="50%" />
<ImageCaptioned alt={"一次 Zig-Zig 操作后（[公式]）"} src={temp_5}>一次 Zig-Zig 操作后（<InlineMath data={"T_2"}></InlineMath>）</ImageCaptioned></Grid>
<BlockMath data={"\\begin{align*}\n    \\hat{c_i} &= c_i + \\Phi(T_2) - \\Phi(T_1) \\\\\n    &= 2 + \\operatorname{rank}_2 X - \\operatorname{rank}_1 X \\\\\n    &\\qquad + \\operatorname{rank}_2 P - \\operatorname{rank}_1 P \\\\\n    &\\qquad + \\operatorname{rank}_2 G - \\operatorname{rank}_1 G\n\\end{align*}\n"}></BlockMath><p>注意到 <InlineMath data={"S_1(X) + S_2(G) \\leqslant S_2(X)"}></InlineMath>。剩下的证明与 Zig-Zag 类似，此处从略。最终我们得到</p>
<BlockMath data={"\\hat{c_i}(\\text{Zig-Zig}) \\leqslant 3(\\operatorname{rank}_2 X - \\operatorname{rank}_1 X)\n"}></BlockMath><hr />
<h3 id="t-7" tabindex="-1" class="heading">摊还分析 <a class="cursor header-anchor" href="#t-7">¶</a></h3>
<p>根据上面的分析，有</p>
<BlockMath data={"\\begin{align*}\n    \\hat{c_i}(\\text{Zig}) &\\leqslant 1 + \\operatorname{rank}_2 X - \\operatorname{rank}_1 X \\leqslant 1 + 3(\\operatorname{rank}_2 X - \\operatorname{rank}_1 X) \\\\\n    \\hat{c_i}(\\text{Zig-Zag}) &\\leqslant 2(\\operatorname{rank}_2 X - \\operatorname{rank}_1 X) \\leqslant 3(\\operatorname{rank}_2 X - \\operatorname{rank}_1 X) \\\\\n    \\hat{c_i}(\\text{Zig-Zig}) &\\leqslant 3(\\operatorname{rank}_2 X - \\operatorname{rank}_1 X)\n\\end{align*}\n"}></BlockMath><p>这是一种非常优美的结构。对于一个完整的查询、插入、删除操作，它都是由一系列 Zig、Zig-Zag、Zig-Zig 子操作组成的，而这些子操作中的 <InlineMath data={"\\hat{c_i}"}></InlineMath> 累加后 <InlineMath data={"\\operatorname{rank}X"}></InlineMath> 相互抵消，只剩下初末状态的 <InlineMath data={"\\operatorname{rank}"}></InlineMath> 差值，同时我们知道末状态下 <InlineMath data={"X"}></InlineMath> 就是根节点，也就是说</p>
<BlockMath data={"\\hat{c_i} \\leqslant 1 + 3(\\operatorname{rank} T - \\operatorname{rank} X) = O(\\log N)\n"}></BlockMath><blockquote>
<p>为什么加的是常数 <InlineMath data={"1"}></InlineMath> 呢？这是因为 Zig 永远只可能在最后一次子操作进行，最多只会执行一次。</p>
</blockquote>
<p>据此，我们可以得到 Splay Tree 的摊还时间复杂度为 <InlineMath data={"O(\\log N)"}></InlineMath>。</p>
<hr />
<h2 id="t-8" tabindex="-1" class="heading">总结 <a class="cursor header-anchor" href="#t-8">¶</a></h2>
<p>上面的分析基于一个重要的假设：<InlineMath data={"\\Phi(D_M) \\geqslant \\Phi(D_0)"}></InlineMath>，但这一条件在有些情况下并不一定成立（例如 Splay Tree 初始非空）。实际上，如果这个假设不成立了，我们仍然能够得到类似的结论：只要操作次数 <InlineMath data={"M"}></InlineMath> 足够大，总体实际表现出来的复杂度仍然为 <InlineMath data={"O\\bigl(f(n)\\bigr)"}></InlineMath>。</p>
<BlockMath data={"\\begin{align*}\n    T_\\text{average} &= \\frac{1}{M}\\sum_{i=1}^M c_i \\\\\n    &= \\left(\\frac{1}{M}\\sum_{i=1}^M \\hat{c_i}\\right) + \\frac{1}{M}\\bigl(\\Phi(D_0) - \\Phi(D_M)\\bigr) \\\\\n    &= O(\\log N) + \\frac{1}{M}\\bigl(\\Phi(D_0) - \\Phi(D_M)\\bigr) \\\\\n    &\\leqslant O(\\log N) + \\frac{1}{M}\\Phi(D_0)\n\\end{align*}\n"}></BlockMath><p>只要初始状态给定，<InlineMath data={"\\Phi(D_0) / M"}></InlineMath> 实际上是一个常数。在这种情况下甚至直接说 <InlineMath data={"T_\\text{average} = O(\\log N)"}></InlineMath> 也是合理的。如果想要更严谨一点，我们让 <InlineMath data={"M\\rightarrow+\\infty"}></InlineMath>，这个时候常数也可以忽略不计了。</p>
</>)
export default jsx;
