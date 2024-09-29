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
import temp_0 from "/cache/note/temp/avl-tree.0.e30e3490.svg";
import temp_1 from "/cache/note/temp/avl-tree.1.0d8b842b.svg";
import temp_2 from "/cache/note/temp/avl-tree.2.0d35e0c2.svg";
import temp_3 from "/cache/note/temp/avl-tree.3.1e5d3215.svg";
import temp_4 from "/cache/note/temp/avl-tree.4.e7057aef.svg";
import temp_5 from "/cache/note/temp/avl-tree.5.bd551671.svg";
import temp_6 from "/cache/note/temp/avl-tree.6.d2ba5a54.svg";
import temp_7 from "/cache/note/temp/avl-tree.7.7874fa13.svg";
import temp_8 from "/cache/note/temp/avl-tree.8.fc7c7d01.svg";
import temp_9 from "/cache/note/temp/avl-tree.9.cac2e628.svg";
import temp_10 from "/cache/note/temp/avl-tree.10.90e74312.svg";
import temp_11 from "/cache/note/temp/avl-tree.11.486894ed.svg";
import type { JSX } from "vue/jsx-runtime";
const jsx: JSX.Element = (<><p>AVL Tree 是在二叉搜索树的基础上实现的，对任何节点 <InlineMath data={"\\text{node}"}></InlineMath>，都有平衡因子 <InlineMath data={"\\operatorname{BF}(\\text{node}) := h_L - h_R \\in \\{-1, 0, 1\\}"}></InlineMath>（其中空树高度定义为 <InlineMath data={"-1"}></InlineMath>），也即左右子树高度差不大于 <InlineMath data={"1"}></InlineMath>。</p>
<p>这样得到的树虽然不一定是平衡二叉树，但能够保证高度是 <InlineMath data={"O(\\log N)"}></InlineMath> 的，从而能够实现在 <InlineMath data={"O(\\log N)"}></InlineMath> 的时间复杂度内完成插入、删除、查找的操作。</p>
<p>其中删除和查找和普通二叉搜索树并无二致，这里主要讨论插入操作。</p>
<p>维护 AVL Tree 平衡的方法是通过<strong>旋转</strong>操作，分为 LL-Rotation、LR-Rotation、RR-Rotation、RL-Rotation 这四种。</p>
<hr />
<h2 id="t" tabindex="-1" class="heading">RR-Rotation <a class="cursor header-anchor" href="#t">¶</a></h2>
<p>称在某个节点（不一定是根节点）的右节点（<strong>R</strong>ight）的右子树（<strong>R</strong>ight）上进行的<strong>插入</strong>操作为 <strong>RR 插入</strong>。</p>
<p>如下左图，如果 <InlineMath data={"A"}></InlineMath>、<InlineMath data={"B"}></InlineMath> 节点的初始 <InlineMath data={"\\text{BF}"}></InlineMath> 值分别为 <InlineMath data={"-1"}></InlineMath>、<InlineMath data={"0"}></InlineMath>，在 <InlineMath data={"A"}></InlineMath> 上进行一次 RR 插入后，<strong>如果</strong> <InlineMath data={"B"}></InlineMath> 的右子树高度增加，那么 <InlineMath data={"A"}></InlineMath>、<InlineMath data={"B"}></InlineMath> 的 <InlineMath data={"\\text{BF}"}></InlineMath> 值分别变为 <InlineMath data={"-2"}></InlineMath>、<InlineMath data={"-1"}></InlineMath>，此时 <InlineMath data={"A"}></InlineMath> 节点不满足 AVL Tree 的条件，需要通过 <strong>RR-Rotation</strong> 操作来维护平衡（右图）。</p>
<Grid>
<Delimiter width="50%" />
<ImageCaptioned alt={"RR-Rotation 操作前"} src={temp_0}>RR-Rotation 操作前</ImageCaptioned><Delimiter width="50%" />
<ImageCaptioned alt={"RR-Rotation 操作后"} src={temp_1}>RR-Rotation 操作后</ImageCaptioned></Grid>
<p>通过枚举容易证明，对于 RR 插入，只有这一种 <InlineMath data={"\\text{BF}"}></InlineMath> 值需要旋转，其他 <InlineMath data={"\\text{BF}"}></InlineMath> 情况要么不需要旋转，要么是在子树上进行旋转。对于后者，我们只需要保证 <InlineMath data={"A"}></InlineMath> 是从新插入的节点往根节点回溯时遇到的第一个不平衡节点即可。</p>
<p>如果我们解决了 <InlineMath data={"A"}></InlineMath> 的不平衡问题，由于 <InlineMath data={"A"}></InlineMath> 这棵子树的高度并没有发生改变，我们已经可以断言整棵树已经平衡了（易证），在这种情况下已经没有必要继续向上回溯。</p>
<hr />
<h2 id="t-2" tabindex="-1" class="heading">LL-Rotation <a class="cursor header-anchor" href="#t-2">¶</a></h2>
<p>LL-Rotation 与 RR-Rotation 类似，此处不再赘述。</p>
<Fold title={<>点击展开示意图</>} type="info">
<Grid>
<Delimiter width="50%" />
<ImageCaptioned alt={"LL-Rotation 操作前"} src={temp_2}>LL-Rotation 操作前</ImageCaptioned><Delimiter width="50%" />
<ImageCaptioned alt={"LL-Rotation 操作后"} src={temp_3}>LL-Rotation 操作后</ImageCaptioned></Grid>
</Fold>
<hr />
<h2 id="t-3" tabindex="-1" class="heading">LR-Rotation <a class="cursor header-anchor" href="#t-3">¶</a></h2>
<p>顾名思义，<strong>LR-Rotation</strong> 发生在在左节点（<strong>L</strong>eft）的右子树（<strong>R</strong>ight）上进行插入时。</p>
<p>如下左图，若 <InlineMath data={"A"}></InlineMath>、<InlineMath data={"B"}></InlineMath>、<InlineMath data={"C"}></InlineMath> 的初始 <InlineMath data={"\\text{BF}"}></InlineMath> 值分别为 <InlineMath data={"1"}></InlineMath>、<InlineMath data={"0"}></InlineMath>、<InlineMath data={"0"}></InlineMath>，在 <InlineMath data={"A"}></InlineMath> 上进行一次 LR 插入，使得 <InlineMath data={"\\text{BF}"}></InlineMath> 值分别变为 <InlineMath data={"2"}></InlineMath>、<InlineMath data={"-1"}></InlineMath>、<InlineMath data={"\\pm 1"}></InlineMath>（<InlineMath data={"\\pm 1"}></InlineMath> 是因为我们既可能在 <InlineMath data={"C"}></InlineMath> 的左子树上插入，也可能在右子树上插入）。这种情况下，我们需要进行 <strong>LR-Rotation</strong> 操作。</p>
<p>LR-Rotation 实际上是两步操作：</p>
<ol>
<li>先在 <InlineMath data={"B"}></InlineMath> 上进行一次 RR-Rotation；</li>
<li>再在 <InlineMath data={"A"}></InlineMath> 上进行一次 LL-Rotation。</li>
</ol>
<Grid>
<Delimiter width="50%" />
<ImageCaptioned alt={"初始情况"} src={temp_4}>初始情况</ImageCaptioned><Delimiter width="50%" />
<ImageCaptioned alt={"在 [公式] 上进行 RR-Rotation"} src={temp_5}>在 <InlineMath data={"B"}></InlineMath> 上进行 RR-Rotation</ImageCaptioned><Delimiter width="50%" />
<ImageCaptioned alt={"在 [公式] 上进行 LL-Rotation"} src={temp_6}>在 <InlineMath data={"A"}></InlineMath> 上进行 LL-Rotation</ImageCaptioned></Grid>
<p>同样也可以证明，LR 插入只有这一种 <InlineMath data={"\\text{BF}"}></InlineMath> 值需要旋转。并且旋转过后子树的高度没有改变，不需要继续向上回溯。</p>
<hr />
<h2 id="t-4" tabindex="-1" class="heading">RL-Rotation <a class="cursor header-anchor" href="#t-4">¶</a></h2>
<p>与 LR-Rotation 类似：</p>
<ol>
<li>先在 <InlineMath data={"B"}></InlineMath> 上进行一次 LL-Rotation；</li>
<li>再在 <InlineMath data={"A"}></InlineMath> 上进行一次 RR-Rotation。</li>
</ol>
<Fold title={<>点击展开示意图</>} type="info">
<Grid>
<Delimiter width="50%" />
<ImageCaptioned alt={"初始情况"} src={temp_7}>初始情况</ImageCaptioned><Delimiter width="50%" />
<ImageCaptioned alt={"在 [公式] 上进行 LL-Rotation"} src={temp_8}>在 <InlineMath data={"B"}></InlineMath> 上进行 LL-Rotation</ImageCaptioned><Delimiter width="50%" />
<ImageCaptioned alt={"在 [公式] 上进行 RR-Rotation"} src={temp_9}>在 <InlineMath data={"A"}></InlineMath> 上进行 RR-Rotation</ImageCaptioned></Grid>
</Fold>
<hr />
<h2 id="t-5" tabindex="-1" class="heading">复杂度证明 <a class="cursor header-anchor" href="#t-5">¶</a></h2>
<p>设 <InlineMath data={"n_h"}></InlineMath> 为高度为 <InlineMath data={"h"}></InlineMath> 的 AVL Tree 的<strong>最小节点数</strong>。为了在满足 AVL Tree 性质的前提下，使得节点数最小，任意节点 <InlineMath data={"A"}></InlineMath> 的左右子树高度差（绝对值）一定为 <InlineMath data={"1"}></InlineMath>。否则，如果高度相等，则一定可以再删除一个节点；如果高度差大于 <InlineMath data={"1"}></InlineMath>，则不满足 AVL Tree 的性质。</p>
<p>也就是说任意高度为 <InlineMath data={"h"}></InlineMath> 的节点一定是下图的两种情况之一：</p>
<Grid>
<Delimiter width="50%" />
<ImageCaptioned alt={"空"} src={temp_10}></ImageCaptioned><Delimiter width="50%" />
<ImageCaptioned alt={"空"} src={temp_11}></ImageCaptioned></Grid>
<p>从上面的分析我们得到如下等式：</p>
<BlockMath data={"n_h \\equiv n_{h-1} + n_{h-2} + 1\n"}></BlockMath><p>等式左右同时 <InlineMath data={"+1"}></InlineMath>，得到 <InlineMath data={"(n_h + 1) = (n_{h-1} + 1) + (n_{h-2} + 1)"}></InlineMath>，说明数列 <InlineMath data={"\\{n_h + 1\\}_h"}></InlineMath> 是个类似 Fibonacci 数列的数列。</p>
<p>考虑边界条件，<InlineMath data={"n_0 + 1 = 1"}></InlineMath>，<InlineMath data={"n_1 + 1 = 2"}></InlineMath>，因此得到 <InlineMath data={"n_h = \\text{Fib}_{h + 2} - 1"}></InlineMath>。</p>
<p>我们知道 Fibonacci 数列的通项是</p>
<BlockMath data={"\\text{Fib}_n \\equiv \\left[\\frac{1}{\\sqrt{5}}\\left(\\frac{1+\\sqrt{5}}{2}\\right)^n\\right]\n"}></BlockMath><p>其中 <InlineMath data={"[x]"}></InlineMath> 表示离 <InlineMath data={"x"}></InlineMath> 最近的整数。因此</p>
<BlockMath data={"n_h \\equiv \\left[\\frac{1}{\\sqrt{5}}\\left(\\frac{1+\\sqrt{5}}{2}\\right)^{h+2}\\right] - 1\n"}></BlockMath><p>从而得到 <InlineMath data={"h = O(\\log n)"}></InlineMath>，进而证明 AVL Tree 的插入、删除、查询操作的时间复杂度为 <InlineMath data={"O(\\log n)"}></InlineMath>。</p>
<hr />
<h2 id="t-6" tabindex="-1" class="heading">代码实现 <a class="cursor header-anchor" href="#t-6">¶</a></h2>
<p>为了计算 <InlineMath data={"\\text{BF}"}></InlineMath> 值，我们需要在每个节点上维护其子树的高度信息，这是 AVL Tree 带来的额外开销。</p>
<p>插入函数 <InlineMath data={"\\operatorname{insert}(\\text{node}, v)"}></InlineMath> 的具体流程如下：</p>
<ol>
<li>如果 <InlineMath data={"\\text{node}"}></InlineMath> 为空，返回一个新节点；</li>
<li>如果 <InlineMath data={"v < \\text{node}\\rightarrow\\text{value}"}></InlineMath>，则递归插入到左子树，否则递归插入到右子树；</li>
<li>更新 <InlineMath data={"\\text{node}"}></InlineMath> 的高度信息；</li>
<li>计算 <InlineMath data={"\\text{node}"}></InlineMath> 的 <InlineMath data={"\\text{BF}"}></InlineMath> 值，如果 <InlineMath data={"\\text{BF} = \\pm 2"}></InlineMath>（即不满足 AVL Tree），则根据对应的插入模式进行旋转，更新高度信息，返回新的根节点；</li>
<li>返回 <InlineMath data={"\\text{node}"}></InlineMath>。</li>
</ol>
</>)
export default jsx;
