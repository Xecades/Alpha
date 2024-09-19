import Anchor from "@/components/md/Anchor.vue";
import BlockCode from "@/components/md/BlockCode.vue";
import BlockMath from "@/components/md/BlockMath.vue";
import Fold from "@/components/md/Fold.vue";
import Grid from "@/components/md/Grid.vue";
import ImageCaptioned from "@/components/md/ImageCaptioned.vue";
import InlineMath from "@/components/md/InlineMath.vue";
import LinkCard from "@/components/md/LinkCard.vue";
import Note from "@/components/md/Note.vue";
import SVGCaptioned from "@/components/md/SVGCaptioned.vue";
import Tab from "@/components/md/Tab.vue";
export default <><ul>
<li>根节点是黑色；</li>
<li>所有叶节点 NIL 是黑色；</li>
<li>红色节点的子节点一定是黑色；</li>
<li>从任意节点到其每个叶节点的路径上，黑色节点的数量（bh）相同。（一个很强的条件）</li>
</ul>
<p><strong>Black-Height</strong>：从某个节点到其每个叶节点的路径上的黑色节点数量。（不包括该节点）</p>
<p><strong>Lemma</strong>：在一个有 <InlineMath data={"n"}></InlineMath> 个内部节点的红黑树中，高度至多为 <InlineMath data={"2\\log(n+1)"}></InlineMath>。</p>
<p>TBD</p>
</>