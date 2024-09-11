import anchor from "@/components/md/Anchor.vue";
import blockmath from "@/components/md/BlockMath.vue";
import inlinemath from "@/components/md/InlineMath.vue";
export default [
<h2 id="t" tabindex="-1" class="heading">AVL Tree <a class="cursor header-anchor" href="#t">¶</a></h2>,
<p>任何节点 <inlinemath data="%5Ctext%7Bnode%7D"></inlinemath>，满足 <inlinemath data="%5Coperatorname%7BBF%7D(%5Ctext%7Bnode%7D)%20:=%20h_L%20-%20h_R%20%5Cin%20%5C%7B-1,%200,%201%5C%7D"></inlinemath>（BF 即 Balance Factor，其中空树高度定义为 <inlinemath data="-1"></inlinemath>），即左右高度差不大于 <inlinemath data="1"></inlinemath>。</p>,
<p>Implementation TBD.</p>,
<hr />,
<h2 id="t-2" tabindex="-1" class="heading">Splay Tree <a class="cursor header-anchor" href="#t-2">¶</a></h2>,
<p>每次对节点的操作（插入、查询、删除）后，将该节点移动到根节点。在任何连续的 <inlinemath data="M"></inlinemath> 次操作后，能够保证 <inlinemath data="O(M%20%5Clog%20N)"></inlinemath> 的时间复杂度（摊还时间复杂度，Amortized Time Bound）。</p>,
<p>Implementation TBD.</p>,
<hr />,
<h2 id="t-3" tabindex="-1" class="heading">摊还分析 <a class="cursor header-anchor" href="#t-3">¶</a></h2>,
<p>记 <inlinemath data="c_i"></inlinemath> 为第 <inlinemath data="i"></inlinemath> 次操作的 cost，则</p>,
<blockmath data="%5Cbegin%7Balign*%7D%0A%20%20%20%20%5Ctext%7B%E6%9C%80%E5%9D%8F%20Cost%7D%20&amp;=%20%5Cmax_%7B1%5Cleq%20i%20%5Cleq%20M%7Dc_i%20%5C%5C%0A%20%20%20%20%5Ctext%7B%E5%B9%B3%E5%9D%87%20Cost%7D%20&amp;=%20%5Cfrac%7B1%7D%7BM%7D%5Csum_%7Bi=1%7D%5E%7BM%7Dc_i%0A%5Cend%7Balign*%7D%0A"></blockmath>,
];
