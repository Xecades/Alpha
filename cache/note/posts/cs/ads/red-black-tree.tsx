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
import SVGCaptioned from "@/components/md/SVGCaptioned.vue";
import Tab from "@/components/md/Tab.vue";
import type { JSX } from "vue/jsx-runtime";
const jsx: JSX.Element = (<><p>在二叉搜索树的基础上，给每个节点引入 <InlineMath data={"1"}></InlineMath> 比特的颜色信息，并且让所有原本为 NULL 的指针都指向一个特殊叶节点 NIL，在此基础上满足如下规则，即为<strong>红黑树</strong>。</p>
<Fold title={<>红黑树</>} expand type="success">
<ol>
<li>每个节点不是红色就是黑色；</li>
<li>根节点是黑色；</li>
<li>所有叶节点 NIL 都是黑色；</li>
<li>红色节点的子节点一定是黑色；</li>
<li>从任意节点到其每个叶节点的路径上，黑色节点的数量相同。</li>
</ol>
</Fold>
<p>下图为一个合法的红黑树（灰色代表红色节点）：</p>
<p><ImageCaptioned alt={"Introduction to Algorithms , 3rd Edition: Fig 13.1 (a)"} src="./assets/red-black-tree-example.svg"><em>Introduction to Algorithms</em>, 3rd Edition: Fig 13.1 (a)</ImageCaptioned></p>
<blockquote>
<p>NIL 的引入是为了方便边界情况的讨论。在实际应用中，为了节约空间，通常将叶节点指向同一个 NIL，把这个 NIL 作为树的属性之一。</p>
</blockquote>
<hr />
<h2 id="t" tabindex="-1" class="heading">树高复杂度 <a class="cursor header-anchor" href="#t">¶</a></h2>
<Fold title={<>定理</>} expand type="success">在一个有 <InlineMath data={"n"}></InlineMath> 个内部节点（即不包括叶节点）的红黑树中，其高度至多为 <InlineMath data={"2\\log(n+1)"}></InlineMath>。</Fold>
<p>称从节点 <InlineMath data={"x"}></InlineMath> 到其每个叶节点的路径上的黑色节点数量（不包括该节点）为 <InlineMath data={"x"}></InlineMath> 的 <strong>Black-Height</strong>，记为 <InlineMath data={"\\operatorname{bh}(x)"}></InlineMath>。性质 5 保证了该定义的合理性。</p>
<hr />
<p>首先，我们有如下引理：</p>
<Fold title={<>引理</>} expand>任何根节点为 <InlineMath data={"x"}></InlineMath> 的子树至少包含 <InlineMath data={"2^{\\operatorname{bh}(x)} - 1"}></InlineMath> 个内部节点。</Fold>
<p>对树高进行归纳。</p>
<p>当树高为 <InlineMath data={"0"}></InlineMath> 时，<InlineMath data={"x"}></InlineMath> 为叶节点 NIL，<InlineMath data={"2^{\\operatorname{bh}(x)} - 1 = 2^0 - 1 = 0"}></InlineMath>，满足条件。</p>
<p>当树高大于 <InlineMath data={"0"}></InlineMath> 时，显然 <InlineMath data={"x"}></InlineMath> 的左右子树的 Black-Height 一定是 <InlineMath data={"\\operatorname{bh}(x)"}></InlineMath> 或 <InlineMath data={"\\operatorname{bh}(x) - 1"}></InlineMath>（取决于 <InlineMath data={"x"}></InlineMath> 自身的颜色）。由归纳假设，各个子树至少包含 <InlineMath data={"2^{\\operatorname{bh}(x) - 1} - 1"}></InlineMath> 个内部节点。因此，以 <InlineMath data={"x"}></InlineMath> 为根的树至少包含 <InlineMath data={"2 \\times (2^{\\operatorname{bh}(x) - 1} - 1) + 1 = 2^{\\operatorname{bh}(x)} - 1"}></InlineMath> 个内部节点。</p>
<p>引理得证。</p>
<hr />
<p>设树高为 <InlineMath data={"h"}></InlineMath>。则由性质 4，在任何从根节点到叶节点的简单路径上，黑色节点的数量至少为 <InlineMath data={"h/2"}></InlineMath>（不包括根节点）。因此，根节点的 Black-Height 至少为 <InlineMath data={"h/2"}></InlineMath>。因此</p>
<BlockMath data={"n \\geqslant 2^{\\operatorname{bh}(T)} - 1 \\geqslant 2^{h/2} - 1\n"}></BlockMath><p>简单变形后定理得证。</p>
<p>该定理保证了红黑树的高度是 <InlineMath data={"O(\\log n)"}></InlineMath> 的。</p>
<hr />
<h2 id="t-2" tabindex="-1" class="heading">插入 <a class="cursor header-anchor" href="#t-2">¶</a></h2>
<p>首先以普通的二叉搜索树的方式插入节点 <InlineMath data={"z"}></InlineMath>，并将其颜色设为红色。然后调整树的结构（伪代码如下），使其满足红黑树的性质。</p>
<Fold title={<>插入调整</>} expand type="success">
<BlockMath data={"\\begin{align*}\n    &\\bold{while}\\ z.p.\\text{color} = \\text{RED}: \\\\\n    &\\qquad \\bold{if}\\ z.p = z.p.p.\\text{left}: \\\\\n    &\\qquad\\qquad y \\gets z.p.p.\\text{right} \\\\\n    &\\qquad\\qquad \\bold{if}\\ y.\\text{color} = \\text{RED}: \\\\\n    &\\qquad\\qquad\\qquad z.p.\\text{color} \\gets \\text{BLACK} \\\\\n    &\\qquad\\qquad\\qquad y.\\text{color} \\gets \\text{BLACK} \\\\\n    &\\qquad\\qquad\\qquad z.p.p.\\text{color} \\gets \\text{RED} \\\\\n    &\\qquad\\qquad\\qquad z \\gets z.p.p \\\\\n    &\\qquad\\qquad \\bold{else}: \\\\\n    &\\qquad\\qquad\\qquad \\bold{if}\\ z = z.p.\\text{right}: \\\\\n    &\\qquad\\qquad\\qquad\\qquad z \\gets z.p \\\\\n    &\\qquad\\qquad\\qquad\\qquad \\text{Left-Rotate}(T, z) \\\\\n    &\\qquad\\qquad\\qquad z.p.\\text{color} \\gets \\text{BLACK} \\\\\n    &\\qquad\\qquad\\qquad z.p.p.\\text{color} \\gets \\text{RED} \\\\\n    &\\qquad\\qquad\\qquad \\text{Right-Rotate}(T, z.p.p) \\\\\n    &\\qquad \\bold{else}: \\\\\n    &\\qquad\\qquad \\text{Symmetrically.} \\\\\n    &T.\\text{root}.\\text{color} \\gets \\text{BLACK} \\\\\n\\end{align*}\n"}></BlockMath></Fold>
<hr />
<h2 id="t-3" tabindex="-1" class="heading">删除 <a class="cursor header-anchor" href="#t-3">¶</a></h2>
<p>TBD.</p>
</>)
export default jsx;
