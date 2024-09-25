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
const jsx: JSX.Element = (<><p><strong>Null Path Length</strong>（Npl(x)）：节点 x 到最近的没有两个子节点的节点（至多有一个孩子）的距离。定义 Npl(NULL) = -1</p>
<p><code class="inline-code">{"Npl(X) = min{Npl(left), Npl(right)} + 1"}</code></p>
<p>Theorem:</p>
<p>A leftist heap of r nodes on the right path must have at least 2^r - 1 nodes.</p>
<p>TBD</p>
</>)
export default jsx;
