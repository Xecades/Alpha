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
const jsx: JSX.Element = (<><Note type="success"><strong>Disclaimer</strong>: By saying “cheatsheet” I don’t mean something used for cheating, but rather a quick reference for the most important concepts and formulas. I don’t encourage cheating in any way.</Note>
<h2 id="t" tabindex="-1" class="heading">Equivalent Infinitesimals <a class="cursor header-anchor" href="#t">¶</a></h2>
<p>When <InlineMath data={"x\\to0"}></InlineMath>:</p>
<ul>
<li><InlineMath data={"\\sin x\\sim \\tan x\\sim\\arcsin x\\sim\\arctan x\\sim x"}></InlineMath></li>
<li><InlineMath data={"1 - \\cos x \\sim \\dfrac{1}{2} x ^ 2"}></InlineMath></li>
<li><InlineMath data={"\\ln(1 + x) \\sim e^x - 1 \\sim x"}></InlineMath></li>
<li><InlineMath data={"(1 + x) ^ a - 1 \\sim ax"}></InlineMath></li>
</ul>
<hr />
<h2 id="t-2" tabindex="-1" class="heading">Derivatives <a class="cursor header-anchor" href="#t-2">¶</a></h2>
<ul>
<li><InlineMath data={"(\\tan x)' = \\sec ^ 2 x \\longleftrightarrow (\\cot x)' = - \\csc ^ 2 x"}></InlineMath></li>
<li><InlineMath data={"(\\sec x)' = \\sec x \\tan x \\longleftrightarrow (\\csc x)' = - \\csc x \\cot x"}></InlineMath></li>
<li><InlineMath data={"(\\arcsin x)' = \\dfrac{1}{\\sqrt{1 - x ^ 2}} \\longleftrightarrow (\\arccos x)' = - \\dfrac{1}{\\sqrt{1 - x ^ 2}}"}></InlineMath></li>
<li><InlineMath data={"(\\arctan x)' = \\dfrac{1}{1 + x ^ 2} \\longleftrightarrow (\\operatorname{arccot} x)' = - \\dfrac{1}{1 + x ^ 2}"}></InlineMath></li>
</ul>
<hr />
<h2 id="t-3" tabindex="-1" class="heading">Integrals <a class="cursor header-anchor" href="#t-3">¶</a></h2>
<ul>
<li><InlineMath data={"\\displaystyle\\int\\dfrac{x}{\\sqrt{a^2 \\pm x^2}}\\mathrm{d}x = \\pm\\sqrt{a^2 \\pm x^2}+C"}></InlineMath></li>
<li><InlineMath data={"\\displaystyle\\int\\dfrac{1}{\\sqrt{x^2+a^2}}\\mathrm{d}x = \\ln\\left(x+\\sqrt{x^2+a^2}\\right)+C"}></InlineMath></li>
<li><InlineMath data={"\\displaystyle\\int\\dfrac{1}{\\sqrt{a^2-x^2}}\\mathrm{d}x = \\arcsin\\dfrac{x}{a}+C"}></InlineMath></li>
<li><InlineMath data={"\\displaystyle\\int\\dfrac{\\mathrm{d}x}{x^2 - a^2} = \\dfrac{1}{2a}\\int\\left(\\dfrac{1}{x-a}-\\dfrac{1}{x+a}\\right)\\mathrm{d}x = \\dfrac{1}{2a}\\ln\\left|\\dfrac{x-a}{x+a}\\right|+C"}></InlineMath></li>
<li><InlineMath data={"\\displaystyle\\int\\dfrac{\\mathrm{d}x}{x^2 + a^2} = \\dfrac{1}{a}\\arctan\\dfrac{x}{a}+C"}></InlineMath></li>
<li><InlineMath data={"\\displaystyle\\int\\sqrt{a^2-x^2}\\mathrm{d}x = \\dfrac{x}{2}\\sqrt{a^2-x^2}+\\dfrac{a^2}{2}\\arcsin\\dfrac{x}{a}+C"}></InlineMath>, <InlineMath data={"a>0"}></InlineMath></li>
<li><InlineMath data={"\\displaystyle\\int\\sqrt{x^2\\pm a^2}\\mathrm{d}x = \\dfrac{x}{2}\\sqrt{x^2\\pm a^2}+\\dfrac{a^2}{2}\\ln\\left(x+\\sqrt{x^2\\pm a^2}\\right)+C"}></InlineMath>, <InlineMath data={"a>0"}></InlineMath></li>
<li><InlineMath data={"\\int\\tan x\\mathrm{d}x = -\\ln|\\cos x|+C"}></InlineMath></li>
<li><InlineMath data={"\\int\\cot x\\mathrm{d}x = \\ln|\\sin x|+C"}></InlineMath></li>
<li><InlineMath data={"\\int\\sec x\\mathrm{d}x = \\ln|\\sec x+\\tan x|+C"}></InlineMath></li>
<li><InlineMath data={"\\int\\csc x\\mathrm{d}x = -\\ln|\\csc x+\\cot x|+C = \\ln|\\csc x-\\cot x|+C"}></InlineMath></li>
<li><InlineMath data={"\\int\\sec^3x\\mathrm{d}x = \\dfrac{1}{2}\\sec x\\tan x+\\dfrac{1}{2}\\ln|\\sec x+\\tan x|+C"}></InlineMath></li>
</ul>
<hr />
<h2 id="t-4" tabindex="-1" class="heading">Taylor Series <a class="cursor header-anchor" href="#t-4">¶</a></h2>
<p>With <InlineMath data={"\\theta\\in(0, 1)"}></InlineMath> and <InlineMath data={"\\xi = x_0 + \\theta(x - x_0)"}></InlineMath>:</p>
<ul>
<li><InlineMath data={"f(x) = f(x_0) + f'(x_0)(x-x_0) + \\cdots + \\dfrac{f^{(n)}(x_0)}{n!}(x-x_0)^n + \\dfrac{f^{(n+1)}(\\xi)}{(n+1)!}(x-x_0)^{n+1}"}></InlineMath></li>
<li><InlineMath data={"e^x = 1 + x + \\dfrac{x^2}{2!} + \\dfrac{x^3}{3!} + \\cdots + \\dfrac{x^n}{n!} + \\dfrac{e^{\\theta x}}{(n+1)!}x^{n+1}"}></InlineMath></li>
<li><InlineMath data={"\\sin x = x - \\dfrac{x^3}{3!} + \\dfrac{x^5}{5!} - \\cdots + (-1)^n\\dfrac{x^{2n+1}}{(2n+1)!} + (-1)^{n+1}\\dfrac{\\cos\\theta x}{(2n+3)!}x^{2n+3}"}></InlineMath></li>
<li><InlineMath data={"\\cos x = 1 - \\dfrac{x^2}{2!} + \\dfrac{x^4}{4!} - \\cdots + (-1)^n\\dfrac{x^{2n}}{(2n)!} + (-1)^{n+1}\\dfrac{\\sin\\theta x}{(2n+2)!}x^{2n+2}"}></InlineMath></li>
<li><InlineMath data={"\\ln(1 + x) = x - \\dfrac{x^2}{2} + \\dfrac{x^3}{3} - \\cdots + (-1)^{n-1}\\dfrac{x^n}{n} + o(x^n)"}></InlineMath></li>
<li><InlineMath data={"(1+x)^\\alpha = \\dbinom{\\alpha}{0} + \\dbinom{\\alpha}{1}x + \\dbinom{\\alpha}{2}x^2 + \\cdots + \\dbinom{\\alpha}{n}x^n + o(x^n)"}></InlineMath></li>
<li><InlineMath data={"\\dfrac{1}{1-x} = 1 + x + x^2 + \\cdots + x^n + o(x^n)"}></InlineMath></li>
<li><InlineMath data={"\\arctan x = x - \\dfrac{x^3}{3} + \\dfrac{x^5}{5} + \\cdots + (-1)^n\\dfrac{x^{2n+1}}{2n+1} + o(x^{2n+1})"}></InlineMath></li>
<li><InlineMath data={"\\arcsin x = x + \\dfrac{x^3}{6} + \\dfrac{3x^5}{40} + o(x^5)"}></InlineMath></li>
<li><InlineMath data={"\\arccos x = \\dfrac{\\pi}{2} - \\arcsin x"}></InlineMath></li>
</ul>
</>)
export default jsx;
