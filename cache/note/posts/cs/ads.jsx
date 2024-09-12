import BlockMath from "@/components/md/BlockMath.vue";
import InlineMath from "@/components/md/InlineMath.vue";
export default <><h2 id="t" tabindex="-1" class="heading">AVL Tree <a class="cursor header-anchor" href="#t">¶</a></h2>
<p>任何节点 <InlineMath data={"\\text{node}"}></InlineMath>，满足 <InlineMath data={"\\operatorname{BF}(\\text{node}) := h_L - h_R \\in \\{-1, 0, 1\\}"}></InlineMath>（BF 即 Balance Factor，其中空树高度定义为 <InlineMath data={"-1"}></InlineMath>），即左右高度差不大于 <InlineMath data={"1"}></InlineMath>。</p>
<p>Implementation TBD.</p>
<hr />
<h2 id="t-2" tabindex="-1" class="heading">Splay Tree <a class="cursor header-anchor" href="#t-2">¶</a></h2>
<p>每次对节点的操作（插入、查询、删除）后，将该节点移动到根节点。在任何连续的 <InlineMath data={"M"}></InlineMath> 次操作后，能够保证 <InlineMath data={"O(M \\log N)"}></InlineMath> 的时间复杂度（摊还时间复杂度，Amortized Time Bound）。</p>
<p>Implementation TBD.</p>
<hr />
<h2 id="t-3" tabindex="-1" class="heading">摊还分析 <a class="cursor header-anchor" href="#t-3">¶</a></h2>
<p>记 <InlineMath data={"c_i"}></InlineMath> 为第 <InlineMath data={"i"}></InlineMath> 次操作的 cost，则</p>
<BlockMath data={"\\begin{align*}\n    \\text{最坏 Cost} &= \\max_{1\\leq i \\leq M}c_i \\\\\n    \\text{平均 Cost} &= \\frac{1}{M}\\sum_{i=1}^{M}c_i\n\\end{align*}\n"}></BlockMath></>