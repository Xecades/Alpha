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
const jsx: JSX.Element = (<><h2 id="t" tabindex="-1" class="heading">Least upper bound property <a class="cursor header-anchor" href="#t">¶</a></h2>
<p>Every nonempty subset of <InlineMath data={"\\mathbb{R}"}></InlineMath> having an upper bound has a least upper bound.</p>
<h2 id="t-2" tabindex="-1" class="heading">Monotone convergence theorem <a class="cursor header-anchor" href="#t-2">¶</a></h2>
<p>If a sequence of <InlineMath data={"\\mathbb{R}"}></InlineMath> is monotone and bounded, then it converges.</p>
<h2 id="t-3" tabindex="-1" class="heading">Nested interval theorem <a class="cursor header-anchor" href="#t-3">¶</a></h2>
<p>For a sequence of <strong>closed</strong> intervals <InlineMath data={"\\{[a_n,b_n]\\}"}></InlineMath>, if <InlineMath data={"[a_{n+1},b_{n+1}]\\subset[a_n,b_n]"}></InlineMath> for all <InlineMath data={"n\\in\\mathbb{N}^\\star"}></InlineMath> and <InlineMath data={"\\lim\\limits_{n\\to\\infty}{|a_n-b_n|}=0"}></InlineMath>, then exists exactly one <InlineMath data={"\\xi\\in\\mathbb{R}"}></InlineMath> so that <InlineMath data={"\\xi\\in[a_n,b_n]"}></InlineMath> for all <InlineMath data={"n\\in\\mathbb{N}^\\star"}></InlineMath>.</p>
<h2 id="t-4" tabindex="-1" class="heading">Bolzano-Weierstrass theorem <a class="cursor header-anchor" href="#t-4">¶</a></h2>
<p>Every bounded sequence of <InlineMath data={"\\mathbb{R}"}></InlineMath> has a convergent subsequence.</p>
<h2 id="t-5" tabindex="-1" class="heading">Cauchy criterion <a class="cursor header-anchor" href="#t-5">¶</a></h2>
<p>A sequence of <InlineMath data={"\\mathbb{R}"}></InlineMath> is convergent if and only if it is a fundamental sequence.</p>
<blockquote>
<p><strong>Fundamental sequence</strong>: A sequence <InlineMath data={"\\{x_n\\}"}></InlineMath> is called a fundamental sequence if for all <InlineMath data={"\\varepsilon > 0"}></InlineMath>, exists <InlineMath data={"N\\in\\mathbb{N}^\\star"}></InlineMath> so that <InlineMath data={"|x_{n+p} - x_n| < \\varepsilon"}></InlineMath> for all <InlineMath data={"n>N"}></InlineMath> and <InlineMath data={"p\\in\\mathbb{N}^\\star"}></InlineMath>. Fundamental sequence is also known as Cauchy sequence.</p>
</blockquote>
<h2 id="t-6" tabindex="-1" class="heading">Heine-Borel theorem <a class="cursor header-anchor" href="#t-6">¶</a></h2>
<p>If <InlineMath data={"H"}></InlineMath> is an infinite <strong>open</strong> cover of <strong>closed</strong> interval <InlineMath data={"[a, b]"}></InlineMath>, then exists a finite subset <InlineMath data={"H_0\\subset H"}></InlineMath> so that <InlineMath data={"H_0"}></InlineMath> is an <strong>open</strong> cover of <InlineMath data={"[a,b]"}></InlineMath>.</p>
<blockquote>
<p>Or: If <InlineMath data={"H = \\{(a_\\alpha, b_\\alpha) | \\alpha \\in \\Lambda\\}"}></InlineMath> which satisfies <InlineMath data={"\\bigcup\\limits_{\\alpha\\in\\Lambda}{(a_\\alpha, b_\\alpha)} \\supset [a, b]"}></InlineMath>, then exists a finite subset <InlineMath data={"H_0\\subset H"}></InlineMath> so that <InlineMath data={"\\bigcup\\limits_{(a_\\alpha, b_\\alpha)\\in H_0}{(a_\\alpha, b_\\alpha)} \\supset [a, b]"}></InlineMath>.</p>
</blockquote>
</>)
export default jsx;
