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
export default <><p>C’mon, prove these linear algebra things!</p>
<Note type="info">For the content below, I use <InlineMath data={"W\\leqslant V"}></InlineMath> to denote <InlineMath data={"W"}></InlineMath> is a subspace of <InlineMath data={"V"}></InlineMath>, and <InlineMath data={"\\exists!"}></InlineMath> to denote “there exists a unique”.</Note>
<h2 id="t" tabindex="-1" class="heading">Group, Ring &amp; Field <a class="cursor header-anchor" href="#t">¶</a></h2>
<ol>
<li><InlineMath data={"\\mathbb{Q}(\\sqrt{2}) = \\{a+b\\sqrt{2}\\mid a,b\\in\\mathbb{Q}\\}"}></InlineMath> is a field.</li>
<li><InlineMath data={"\\mathbb{Q}"}></InlineMath> is the smallest number field (i.e. subfield of <InlineMath data={"\\mathbb{C}"}></InlineMath>).</li>
</ol>
<hr />
<h2 id="t-2" tabindex="-1" class="heading">Linear Space <a class="cursor header-anchor" href="#t-2">¶</a></h2>
<ol>
<li>For <InlineMath data={"W\\subset V(\\mathbf{F})"}></InlineMath>, <InlineMath data={"W\\leqslant V\\iff W"}></InlineMath> is closed under addition and scalar multiplication.</li>
<li><InlineMath data={"S_1\\subset S_2\\subset V(\\mathbf{F})\\Rightarrow\\operatorname{span}S_1\\subset\\operatorname{span}S_2"}></InlineMath>.</li>
<li>If <InlineMath data={"S_1"}></InlineMath> and <InlineMath data={"S_2"}></InlineMath> are linearly independent, then <InlineMath data={"\\operatorname{span}S_1=\\operatorname{span}S_2\\Rightarrow|S_1|=|S_2|"}></InlineMath>.</li>
<li>Functions <InlineMath data={"\\exp(\\lambda_1x)"}></InlineMath>, <InlineMath data={"\\exp(\\lambda_2x)"}></InlineMath> and <InlineMath data={"\\exp(\\lambda_3x)"}></InlineMath> are linearly independent. (<InlineMath data={"\\lambda_1"}></InlineMath>, <InlineMath data={"\\lambda_2"}></InlineMath> and <InlineMath data={"\\lambda_3"}></InlineMath> are distinct)</li>
<li>For <InlineMath data={"W_1, W_2\\leqslant V(\\mathbf{F})"}></InlineMath>:
<ol>
<li><InlineMath data={"W_1\\cup W_2\\leqslant V\\iff W_1\\subset W_2"}></InlineMath> or <InlineMath data={"W_2\\subset W_1"}></InlineMath>.</li>
<li><InlineMath data={"W_1 + W_2 = \\operatorname{span}(W_1\\cup W_2)"}></InlineMath>.</li>
<li><InlineMath data={"\\dim(W_1 + W_2) = \\dim W_1 + \\dim W_2 - \\dim(W_1\\cap W_2)"}></InlineMath>.</li>
</ol>
</li>
<li>For <InlineMath data={"W_1, W_2\\leqslant V(\\mathbf{F})"}></InlineMath>, the following propositions are equivalent:
<ol>
<li><InlineMath data={"W_1 \\cap W_2 = \\{0\\}"}></InlineMath>.</li>
<li><InlineMath data={"\\forall\\alpha\\in W_1 + W_2"}></InlineMath>, <InlineMath data={"\\exists!\\alpha_1\\in W_1"}></InlineMath> and <InlineMath data={"\\exists!\\alpha_2\\in W_2"}></InlineMath> such that <InlineMath data={"\\alpha = \\alpha_1 + \\alpha_2"}></InlineMath>.</li>
<li>If <InlineMath data={"0 = \\alpha_1 + \\alpha_2 (\\alpha_1 \\in W_1, \\alpha_2 \\in W_2)"}></InlineMath>, then <InlineMath data={"\\alpha_1 = \\alpha_2 = 0"}></InlineMath>.</li>
<li><InlineMath data={"\\dim(W_1 + W_2) = \\dim W_1 + \\dim W_2"}></InlineMath>.</li>
</ol>
</li>
</ol>
<hr />
<h2 id="t-3" tabindex="-1" class="heading">Inner Product Space <a class="cursor header-anchor" href="#t-3">¶</a></h2>
<ol>
<li>(<em>Cauchy–Schwarz inequality</em>) <InlineMath data={"|\\langle\\alpha,\\beta\\rangle|\\leq \\|\\alpha\\|\\cdot\\|\\beta\\|"}></InlineMath>.</li>
<li>(<em>Triangle inequality</em>) <InlineMath data={"\\|\\alpha\\|+\\|\\beta\\| \\geq \\|\\alpha+\\beta\\|"}></InlineMath>.</li>
<li>(<em>Pythagorean theorem</em>) <InlineMath data={"\\|\\alpha\\|^2+\\|\\beta\\|^2 = \\|\\alpha+\\beta\\|^2\\iff\\alpha\\perp\\beta\\iff\\angle(\\alpha,\\beta)=\\dfrac{\\pi}{2}"}></InlineMath>.</li>
<li>(<em>Gram–Schmidt process</em>) Any Euclidean space has an orthonormal basis. (The method to construct it is called Gram–Schmidt process.)</li>
<li>If <InlineMath data={"B = \\{\\varepsilon_1, \\varepsilon_2, \\cdots, \\varepsilon_n\\}"}></InlineMath> is an orthonormal basis of <InlineMath data={"V(\\mathbf{F})"}></InlineMath>, then <InlineMath data={"\\forall\\alpha\\in V"}></InlineMath>, <InlineMath data={"\\alpha = \\sum\\limits_{i=1}^n\\langle\\alpha,\\varepsilon_i\\rangle\\cdot\\varepsilon_i"}></InlineMath>.</li>
</ol>
<hr />
<h2 id="t-4" tabindex="-1" class="heading">Linear Transformation <a class="cursor header-anchor" href="#t-4">¶</a></h2>
<ol>
<li><InlineMath data={"\\sigma:V\\to W"}></InlineMath> is injective <InlineMath data={"\\iff\\ker\\sigma = \\{0\\}"}></InlineMath>.</li>
<li><InlineMath data={"\\sigma:V\\to W"}></InlineMath> is surjective <InlineMath data={"\\iff\\operatorname{im}\\sigma = W"}></InlineMath>.</li>
<li>If <InlineMath data={"B=\\{\\alpha_1,\\alpha_2,\\dots,\\alpha_n\\}"}></InlineMath> is a basis of <InlineMath data={"V"}></InlineMath>, then <InlineMath data={"\\forall \\beta_1, \\beta_2, \\dots, \\beta_n\\in W"}></InlineMath>, <InlineMath data={"\\exists !\\sigma:V \\to W"}></InlineMath> such that <InlineMath data={"\\sigma(\\alpha_i) = \\beta_i"}></InlineMath>.</li>
<li>For <InlineMath data={"\\sigma: V \\to W"}></InlineMath>, <InlineMath data={"\\operatorname{rank}\\sigma + \\dim\\ker\\sigma = \\dim V"}></InlineMath>.</li>
<li>For <InlineMath data={"\\sigma: V \\to W"}></InlineMath>, if <InlineMath data={"\\dim V = \\dim W = n"}></InlineMath>, the following propositions are equivalent:
<ol>
<li><InlineMath data={"\\sigma"}></InlineMath> is injective.</li>
<li><InlineMath data={"\\sigma"}></InlineMath> is surjective.</li>
<li><InlineMath data={"\\operatorname{rank}\\sigma = n"}></InlineMath>.</li>
</ol>
</li>
<li><InlineMath data={"V\\cong W \\iff \\dim V = \\dim W"}></InlineMath>.</li>
</ol>
<hr />
<h2 id="t-5" tabindex="-1" class="heading">Matrix <a class="cursor header-anchor" href="#t-5">¶</a></h2>
<ol>
<li><InlineMath data={"\\mathbf{M}(\\sigma)"}></InlineMath> and <InlineMath data={"\\sigma"}></InlineMath> are one-to-one.</li>
<li>Prove with matrix: if <InlineMath data={"\\dim V(\\mathbf{F})=m"}></InlineMath>, <InlineMath data={"\\dim W(\\mathbf{F})=n"}></InlineMath>, then <InlineMath data={"\\mathcal{L}(V, W)\\cong \\mathbf{F}^{m\\times n}"}></InlineMath>.</li>
<li>Prove with matrix: <InlineMath data={"\\dim\\mathcal{L}(V, W)=\\dim V\\cdot\\dim W"}></InlineMath>.</li>
</ol>
</>