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
import type { JSX } from "vue/jsx-runtime";
const jsx: JSX.Element = (<><p>Here are some easy-to-forget terms in linear algebra. Check whether you are familiar with them all.</p>
<h2 id="t" tabindex="-1" class="heading">Set <a class="cursor header-anchor" href="#t">¶</a></h2>
<ol>
<li><strong>Power set</strong>, or <InlineMath data={"P(A)"}></InlineMath> and <InlineMath data={"2^A"}></InlineMath> for a set <InlineMath data={"A"}></InlineMath>.</li>
</ol>
<hr />
<h2 id="t-2" tabindex="-1" class="heading">Group and Field <a class="cursor header-anchor" href="#t-2">¶</a></h2>
<ol>
<li><strong>Semigroup</strong>.</li>
<li><strong>Monoid</strong>.</li>
<li><strong>Group</strong>, or <InlineMath data={"\\langle G:\\circ\\rangle"}></InlineMath>.</li>
<li><strong>Abelian group</strong>.</li>
<li><strong>Field</strong>, or <InlineMath data={"\\langle F:+, \\circ\\rangle"}></InlineMath>.</li>
</ol>
<hr />
<h2 id="t-3" tabindex="-1" class="heading">Vector Space <a class="cursor header-anchor" href="#t-3">¶</a></h2>
<ol>
<li><strong>Dimension</strong>, or <InlineMath data={"\\dim V"}></InlineMath>.</li>
<li><strong>Rank</strong>, or <InlineMath data={"\\operatorname{rank} A"}></InlineMath>.</li>
<li>For <InlineMath data={"W_1, W_2\\leq V(\\mathbf{F})"}></InlineMath>, what is <InlineMath data={"W_1+W_2"}></InlineMath>, <InlineMath data={"W_1\\oplus W_2"}></InlineMath>.</li>
<li><strong>Inner product space</strong>.</li>
<li><strong>Euclidean space</strong>.</li>
<li><strong>Schmidt orthonormalization</strong>.</li>
</ol>
</>)
export default jsx;
