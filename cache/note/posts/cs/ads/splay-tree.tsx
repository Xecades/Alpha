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
import temp_0 from "/cache/note/temp/splay-tree.0.d25a97ff.svg";
import temp_1 from "/cache/note/temp/splay-tree.1.38f196f9.svg";
import temp_2 from "/cache/note/temp/splay-tree.2.d2b89c74.svg";
import temp_3 from "/cache/note/temp/splay-tree.3.edacf901.svg";
import type { JSX } from "vue/jsx-runtime";
const jsx: JSX.Element = (<><p>在二叉搜索树的基础上，每次对节点的操作（查询、插入、删除）时，通过一些类似 AVL Tree 的旋转操作<strong>将该节点移动到根节点</strong>。</p>
<p>Splay Tree 的单次操作并不能达到 <InlineMath data={"O(\\log N)"}></InlineMath> 的时间复杂度（在某些情况下甚至是 <InlineMath data={"O(N)"}></InlineMath> 的）。但可以证明，在任何连续的 <InlineMath data={"M"}></InlineMath> 次操作后，能够保证 <InlineMath data={"O(M \\log N)"}></InlineMath> 的时间复杂度（即<strong>摊还时间复杂度</strong>，<em>Amortized Time Bound</em>）。</p>
<p>假如访问了节点 <InlineMath data={"X"}></InlineMath>（在查询、插入后，删除前）：</p>
<ul>
<li>如果 <InlineMath data={"X"}></InlineMath> 是根节点，不进行任何操作；</li>
<li>如果 <InlineMath data={"X"}></InlineMath> 的父节点是根节点，对 <InlineMath data={"X"}></InlineMath> 进行一次 <strong>Single Rotation</strong>（即 AVL Tree 的 LL- 或 RR-Rotation，或称 <strong>Zig</strong> 操作），使得 <InlineMath data={"X"}></InlineMath> 移动到根节点；</li>
<li>否则，记 <InlineMath data={"X"}></InlineMath> 的父节点为 <InlineMath data={"P"}></InlineMath>，祖父节点为 <InlineMath data={"G"}></InlineMath>，分如下两种情况讨论。</li>
</ul>
<hr />
<h2 id="t" tabindex="-1" class="heading">Zig-Zag <a class="cursor header-anchor" href="#t">¶</a></h2>
<p>Zig-Zag 分为左右对称的两种情况，都是通过 <strong>Double Rotation</strong>（LR- 或 RL-Rotation）解决，下面以其中一种情况为例。</p>
<p>对于如下左图，通过在 <InlineMath data={"G"}></InlineMath>、<InlineMath data={"P"}></InlineMath>、<InlineMath data={"X"}></InlineMath> 上进行 LR-Rotation 操作，从而把 <InlineMath data={"X"}></InlineMath> 移动到根节点（如右图）。</p>
<Grid>
<Delimiter width="50%" />
<ImageCaptioned alt={"初始情况"} src={temp_0}>初始情况</ImageCaptioned><Delimiter width="50%" />
<ImageCaptioned alt={"进行 Double Rotation 之后"} src={temp_1}>进行 Double Rotation 之后</ImageCaptioned></Grid>
<hr />
<h2 id="t-2" tabindex="-1" class="heading">Zig-Zig <a class="cursor header-anchor" href="#t-2">¶</a></h2>
<p>这种情况是通过两次 Single Rotation 解决的，但是需要注意<strong>旋转的顺序</strong>：从上往下先对 <InlineMath data={"G"}></InlineMath> 进行一次旋转，再对 <InlineMath data={"P"}></InlineMath> 旋转。</p>
<Grid>
<Delimiter width="50%" />
<ImageCaptioned alt={"初始情况"} src={temp_2}>初始情况</ImageCaptioned><Delimiter width="50%" />
<ImageCaptioned alt={"进行两次 Single Rotation 之后"} src={temp_3}>进行两次 Single Rotation 之后</ImageCaptioned></Grid>
<hr />
<h2 id="t-3" tabindex="-1" class="heading">复杂度证明 <a class="cursor header-anchor" href="#t-3">¶</a></h2>
<p>见<Anchor href="amortized-analysis">摊还分析</Anchor>。</p>
</>)
export default jsx;
