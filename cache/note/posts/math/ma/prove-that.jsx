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
export default <><p>Here are theorems and proofs that are essential in mathematical analysis. It would be nice if you could prove them smoothly.</p>
<h2 id="t" tabindex="-1" class="heading">Set <a class="cursor header-anchor" href="#t">¶</a></h2>
<ol>
<li>(<em>De Morgan’s laws</em>)
<ul>
<li><InlineMath data={"(A \\cup B)^C = A^C \\cap B^C"}></InlineMath></li>
<li><InlineMath data={"(A \\cap B)^C = A^C \\cup B^C"}></InlineMath></li>
</ul>
</li>
<li>Any countable union of countable sets is a countable set.</li>
</ol>
<hr />
<h2 id="t-2" tabindex="-1" class="heading">Limit of a sequence <a class="cursor header-anchor" href="#t-2">¶</a></h2>
<ol>
<li>Prove with definition: <InlineMath data={"\\lim\\limits_{n\\to\\infty}{\\sqrt[n]{n}} = 1"}></InlineMath>.</li>
<li>If <InlineMath data={"\\lim\\limits_{n\\to\\infty}{a_n} = a"}></InlineMath>, then <InlineMath data={"\\lim\\limits_{n\\to\\infty}{\\dfrac{a_1+a_2+\\cdots+a_n}{n}} = a"}></InlineMath>.</li>
<li>For convergent sequences <InlineMath data={"\\{x_n\\}"}></InlineMath> and <InlineMath data={"\\{y_n\\}"}></InlineMath>, if <InlineMath data={"\\lim\\limits_{n\\to\\infty}x_n=a"}></InlineMath>, <InlineMath data={"\\lim\\limits_{n\\to\\infty}y_n=b"}></InlineMath>, and <InlineMath data={"a<b"}></InlineMath>, then exists <InlineMath data={"N\\in\\mathbb{N}^\\star"}></InlineMath> so that <InlineMath data={"x_n<y_n"}></InlineMath> for all <InlineMath data={"n>N"}></InlineMath>.</li>
<li>If <InlineMath data={"\\lim\\limits_{n\\to\\infty}x_n=a"}></InlineMath>, <InlineMath data={"\\lim\\limits_{n\\to\\infty}y_n=b\\neq0"}></InlineMath>, then <InlineMath data={"\\lim\\limits_{n\\to\\infty}\\dfrac{x_n}{y_n}=\\dfrac{a}{b}"}></InlineMath>.</li>
<li><InlineMath data={"a_n = \\left(1 + \\dfrac{1}{n}\\right)^n"}></InlineMath> and <InlineMath data={"b_n = \\left(1 + \\dfrac{1}{n}\\right)^{n + 1}"}></InlineMath> converges to <InlineMath data={"e"}></InlineMath>.</li>
<li><InlineMath data={"a_n = 1 + \\dfrac{1}{1!} + \\dfrac{1}{2!} + \\cdots + \\dfrac{1}{n!}"}></InlineMath> converges to <InlineMath data={"e"}></InlineMath>.</li>
<li><InlineMath data={"a_n = 1 + \\dfrac{1}{2} + \\dfrac{1}{3} + \\cdots + \\dfrac{1}{n} - \\ln n"}></InlineMath> converges to <InlineMath data={"\\gamma"}></InlineMath>.</li>
<li><InlineMath data={"\\lim\\limits_{n\\to\\infty}a_n=A\\iff\\lim\\limits_{n\\to\\infty}a_{2n-1}=\\lim\\limits_{n\\to\\infty}a_{2n}=A"}></InlineMath>.</li>
<li><InlineMath data={"\\{a_n\\}"}></InlineMath> is convergent <InlineMath data={"\\iff"}></InlineMath> every non-trivial subsequence <InlineMath data={"\\{a_{n_k}\\}"}></InlineMath> of <InlineMath data={"\\{a_n\\}"}></InlineMath> converges.</li>
<li><InlineMath data={"a_n = \\sin n"}></InlineMath> is divergent.</li>
<li>Prove with <em>Nested interval theorem</em>: <InlineMath data={"\\mathbb{R}"}></InlineMath> is uncountable.</li>
<li>Refer to <Anchor href="completeness-of-real-numbers">Completeness of the Real Numbers</Anchor>, and prove
<ol>
<li><em>Least upper bound</em> <InlineMath data={"\\Rightarrow"}></InlineMath> <em>Monotone convergence</em>.</li>
<li><em>Monotone convergence</em> <InlineMath data={"\\Rightarrow"}></InlineMath> <em>Nested interval</em>.</li>
<li><em>Nested interval</em> <InlineMath data={"\\Rightarrow"}></InlineMath> <em>Bolzano-Weierstrass</em>.</li>
<li><em>Bolzano-Weierstrass</em> <InlineMath data={"\\Rightarrow"}></InlineMath> <em>Cauchy criterion</em>.</li>
<li><em>Cauchy criterion</em> <InlineMath data={"\\Rightarrow"}></InlineMath> <em>Least upper bound</em>.</li>
<li><em>Cauchy criterion</em> <InlineMath data={"\\Rightarrow"}></InlineMath> <em>Nested interval</em>.</li>
<li><em>Nested interval</em> <InlineMath data={"\\Rightarrow"}></InlineMath> <em>Least upper bound</em>.</li>
</ol>
</li>
</ol>
<hr />
<h2 id="t-3" tabindex="-1" class="heading">Limit of a function <a class="cursor header-anchor" href="#t-3">¶</a></h2>
<ol>
<li>If <InlineMath data={"\\lim\\limits_{x\\to a}f(x)=A"}></InlineMath>, <InlineMath data={"\\lim\\limits_{x\\to a}g(x)=B"}></InlineMath> and <InlineMath data={"A>B"}></InlineMath>, then exists <InlineMath data={"\\delta>0"}></InlineMath> so that <InlineMath data={"f(x)>g(x)"}></InlineMath> for all <InlineMath data={"x\\in\\mathring{U}(x_0, \\delta)"}></InlineMath>.</li>
<li>If <InlineMath data={"\\lim\\limits_{x\\to x_0}f(x)=A"}></InlineMath>, then exists <InlineMath data={"\\delta>0"}></InlineMath> so that <InlineMath data={"f(x)"}></InlineMath> is bounded in <InlineMath data={"\\mathring{U}(x_0, \\delta)"}></InlineMath>.</li>
<li>Prove with definition: <InlineMath data={"\\lim\\limits_{x\\to0}\\dfrac{\\sin x}{x} = 1"}></InlineMath>.</li>
<li>(<em>Heine’s theorem</em>) The necessary and sufficient condition for <InlineMath data={"\\lim\\limits_{x\\to a}f(x)=A"}></InlineMath> is that for all sequences <InlineMath data={"\\{x_n\\}"}></InlineMath> which converges to <InlineMath data={"a"}></InlineMath> and <InlineMath data={"x_n\\neq a"}></InlineMath>, <InlineMath data={"\\lim\\limits_{n\\to\\infty}f(x_n)=A"}></InlineMath>.</li>
<li>Prove with <em>Heine’s theorem</em>: <InlineMath data={"f(x)=\\sin\\dfrac{1}{x}"}></InlineMath> has no limit as <InlineMath data={"x\\to0"}></InlineMath>.</li>
<li>(<em>Cauchy criterion</em>) Prove with <em>Heine’s theorem</em>: <InlineMath data={"\\lim\\limits_{x\\to a}f(x)"}></InlineMath> exists if and only if for all <InlineMath data={"\\varepsilon>0"}></InlineMath>, exists <InlineMath data={"\\delta>0"}></InlineMath> so that <InlineMath data={"|f(x)-f(y)|<\\varepsilon"}></InlineMath> for all <InlineMath data={"x,y\\in\\mathring{U}(x_0, \\delta)"}></InlineMath>.</li>
<li>Prove with definition: <InlineMath data={"\\lim\\limits_{x\\to\\infty}\\left(1+\\dfrac{1}{x}\\right)^x=e"}></InlineMath>.</li>
</ol>
<hr />
<h2 id="t-4" tabindex="-1" class="heading">Continuity <a class="cursor header-anchor" href="#t-4">¶</a></h2>
<ol>
<li>Every irrational point of <InlineMath data={"R(x)"}></InlineMath> is continuous, every rational point of <InlineMath data={"R(x)"}></InlineMath> is removable discontinuous, where</li>
</ol>
<blockquote>
<BlockMath data={"R(x)=\\left\\{\\begin{align}\\frac{1}{q}&\\quad \\text{if}\\ x=\\frac{p}{q}\\text{, with}\\ p\\in\\mathbb{Z}\\ \\text{and}\\ q\\in\\mathbb{N}\\ \\text{coprime.}\\\\0&\\quad \\text{if}\\ x\\ \\text{is irrational.}\\end{align}\\right.\n"}></BlockMath></blockquote>
<ol start="2">
<li>If <InlineMath data={"u=g(x)"}></InlineMath> is continuous at <InlineMath data={"x_0"}></InlineMath>, and <InlineMath data={"y=f(u)"}></InlineMath> is continuous at <InlineMath data={"u_0=g(x_0)"}></InlineMath>, then <InlineMath data={"f\\circ g(x)=f(g(x))"}></InlineMath> is continuous at <InlineMath data={"x_0"}></InlineMath>.</li>
<li>If <InlineMath data={"f(x)"}></InlineMath> is continuous in closed interval <InlineMath data={"[a, b]"}></InlineMath>,
<ol>
<li>then it is bounded in <InlineMath data={"[a, b]"}></InlineMath>.</li>
<li>then <InlineMath data={"\\max f(x)"}></InlineMath> and <InlineMath data={"\\min f(x)"}></InlineMath> exists in <InlineMath data={"[a, b]"}></InlineMath>.</li>
<li>and <InlineMath data={"f(a)\\cdot f(b)<0"}></InlineMath>, then exists <InlineMath data={"\\xi\\in(a, b)"}></InlineMath> so that <InlineMath data={"f(\\xi)=0"}></InlineMath>.</li>
<li>then it can reach all values between <InlineMath data={"\\min f(x)"}></InlineMath> and <InlineMath data={"\\max f(x)"}></InlineMath>.</li>
<li>(<em>Cantor’s theorem</em>) then it is uniformly continuous in <InlineMath data={"[a, b]"}></InlineMath>.</li>
</ol>
</li>
<li>The sufficient and necessary condition for <InlineMath data={"f(x)"}></InlineMath> to be uniformly continuous in <InlineMath data={"D"}></InlineMath> is that for all sequences <InlineMath data={"\\{x_n\\}, \\{y_n\\}\\in D^\\mathbb{N}"}></InlineMath> that satisfies <InlineMath data={"\\lim\\limits_{n\\to\\infty}(x_n-y_n)=0"}></InlineMath>, <InlineMath data={"\\lim\\limits_{n\\to\\infty}(f(x_n)-f(y_n))=0"}></InlineMath>.</li>
<li>If <InlineMath data={"f(x)"}></InlineMath> is continuous in finite open interval <InlineMath data={"(a, b)"}></InlineMath>, then <InlineMath data={"f(x)"}></InlineMath> is uniformly continuous on <InlineMath data={"(a, b)"}></InlineMath> if and only if <InlineMath data={"\\lim\\limits_{x\\to a^+}f(x)"}></InlineMath> and <InlineMath data={"\\lim\\limits_{x\\to b^-}f(x)"}></InlineMath> exist.</li>
</ol>
<hr />
<h2 id="t-5" tabindex="-1" class="heading">Derivative <a class="cursor header-anchor" href="#t-5">¶</a></h2>
<ol>
<li>(<em>Darboux’s theorem</em>) If <InlineMath data={"f(x)"}></InlineMath> is differentiable in <InlineMath data={"(a, b)"}></InlineMath>, then for every <InlineMath data={"y"}></InlineMath> between <InlineMath data={"f'(a)"}></InlineMath> and <InlineMath data={"f'(b)"}></InlineMath>, there exists <InlineMath data={"\\xi\\in(a, b)"}></InlineMath> so that <InlineMath data={"f'(\\xi)=y"}></InlineMath>.</li>
<li>(<em>Rolle’s theorem</em>) If <InlineMath data={"f(x)"}></InlineMath> is continuous in <InlineMath data={"[a, b]"}></InlineMath>, differentiable in <InlineMath data={"(a, b)"}></InlineMath>, and <InlineMath data={"f(a)=f(b)"}></InlineMath>, then exists <InlineMath data={"\\xi\\in(a, b)"}></InlineMath> so that <InlineMath data={"f'(\\xi)=0"}></InlineMath>.</li>
<li>If <InlineMath data={"f(x)"}></InlineMath> is twice differentiable in <InlineMath data={"[a, b]"}></InlineMath>, and <InlineMath data={"f(a) = f(b) = 0"}></InlineMath>, then <InlineMath data={"\\forall x\\in(a, b)"}></InlineMath>, <InlineMath data={"\\exists\\xi\\in(a, b)"}></InlineMath>, such that <InlineMath data={"2f(x) = f''(\\xi)(x - a)(x - b)"}></InlineMath>.</li>
<li>If <InlineMath data={"f'(x)"}></InlineMath> is bounded in <InlineMath data={"(a, b)"}></InlineMath>, then <InlineMath data={"f(x)"}></InlineMath> is uniformly continuous in <InlineMath data={"(a, b)"}></InlineMath>.</li>
<li>If <InlineMath data={"f(x)"}></InlineMath> is twice differentiable at <InlineMath data={"x=0"}></InlineMath>, <InlineMath data={"\\lim\\limits_{x\\to0}\\dfrac{f(x)}{x}=0"}></InlineMath>, and <InlineMath data={"f''(0)=4"}></InlineMath>,
<ol>
<li>find <InlineMath data={"\\lim\\limits_{x\\to0}\\dfrac{f(x)}{x^2}"}></InlineMath> and <InlineMath data={"\\lim\\limits_{x\\to0}\\left(1+\\dfrac{f(x)}{x}\\right)^{1/x}"}></InlineMath>. (answer: <InlineMath data={"2"}></InlineMath> and <InlineMath data={"e^2"}></InlineMath>)</li>
<li>point out two mistakes: <InlineMath data={"\\lim\\limits_{x\\to0}\\dfrac{f(x)}{x^2}=\\lim\\limits_{x\\to0}\\dfrac{f'(x)}{2x}=\\lim\\limits_{x\\to0}\\dfrac{f''(x)}{2}=\\dfrac{1}{2}f''(0)=2"}></InlineMath>.</li>
</ol>
</li>
<li>Prove using <em>Taylor series with Lagrange remainder</em>: <InlineMath data={"e"}></InlineMath> is irrational.</li>
</ol>
</>