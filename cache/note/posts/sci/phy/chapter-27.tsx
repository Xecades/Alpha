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
const jsx: JSX.Element = (<><h2 id="t" tabindex="-1" class="heading">流量 Flux <a class="cursor header-anchor" href="#t">¶</a></h2>
<Fold title={<>流量</>} expand>单位时间流过某表面的体积。</Fold>
<p>对于平面 <InlineMath data={"\\vec{A}"}></InlineMath>：</p>
<BlockMath data={"\\Phi = \\vec{v}\\cdot\\vec{A} = \\frac{L}{t}\\cdot A = \\frac{V}{t}\n"}></BlockMath><p>一般式：</p>
<BlockMath data={"\\Phi = \\oiint \\vec{v}\\cdot\\mathrm{d}\\vec{A}\n"}></BlockMath><p>对于闭合曲面，若内部无源无汇，则 <InlineMath data={"\\Phi = \\displaystyle\\oiint \\vec{v}\\cdot\\mathrm{d}\\vec{A} = 0"}></InlineMath>；若有源，则 <InlineMath data={"\\Phi \\geqslant 0"}></InlineMath>，代表流出；若有汇，则 <InlineMath data={"\\Phi \\leqslant 0"}></InlineMath>，代表流入。</p>
<hr />
<h2 id="t-2" tabindex="-1" class="heading">Gauss’ Law <a class="cursor header-anchor" href="#t-2">¶</a></h2>
<Fold title={<>电通量</>} expand><InlineMath data={"\\Phi_E := \\displaystyle\\oiint \\vec{E}\\cdot\\mathrm{d}\\vec{A}"}></InlineMath></Fold>
<Fold title={<>Gauss’ Law</>} expand type="success">
<BlockMath data={"\\begin{align*}\n    积分形式&\\quad \\Phi_E = \\oiint \\vec{E}\\cdot\\mathrm{d}\\vec{A} \\equiv \\frac{q_{\\text{enc}}}{\\varepsilon_0} \\\\\n    微分形式&\\quad \\nabla\\cdot\\vec{E} = \\frac{\\rho}{\\varepsilon_0}\n\\end{align*}\n"}></BlockMath></Fold>
<blockquote>
<p><InlineMath data={"q_{\\text{enc}}"}></InlineMath>：闭合曲面内包围的电荷量。</p>
<p><InlineMath data={"\\rho"}></InlineMath>：电荷体积密度。</p>
<p><InlineMath data={"\\nabla"}></InlineMath> 算符：<InlineMath data={"\\nabla = \\dfrac{\\partial}{\\partial x}\\vec{\\imath} + \\dfrac{\\partial}{\\partial y}\\vec{\\jmath} + \\dfrac{\\partial}{\\partial z}\\vec{k}"}></InlineMath></p>
</blockquote>
<hr />
<h3 id="t-3" tabindex="-1" class="heading">微分形式推导 <a class="cursor header-anchor" href="#t-3">¶</a></h3>
<p>首先由于数学上的<Anchor href="https://zh.wikipedia.org/wiki/%E9%AB%98%E6%96%AF%E6%95%A3%E5%BA%A6%E5%AE%9A%E7%90%86">高斯公式</Anchor>，有</p>
<BlockMath data={"\\Phi_E = \\oiint \\vec{E}\\cdot\\mathrm{d}\\vec{A} = \\iiint \\nabla\\cdot\\vec{E}\\cdot\\mathrm{d}V\n"}></BlockMath><p>而</p>
<BlockMath data={"\\frac{q_{\\text{enc}}}{\\varepsilon_0} = \\iiint \\frac{\\rho}{\\varepsilon_0}\\cdot\\mathrm{d}V\n"}></BlockMath><p>两式相等，故有</p>
<BlockMath data={"\\nabla\\cdot\\vec{E} = \\frac{\\rho}{\\varepsilon_0}\n"}></BlockMath><p>证毕。</p>
<hr />
<h3 id="t-4" tabindex="-1" class="heading">推 Coloumb’s Law <a class="cursor header-anchor" href="#t-4">¶</a></h3>
<p>点电荷周围电场球形对称，取半径为 <InlineMath data={"R"}></InlineMath> 的球面为高斯面，有</p>
<BlockMath data={"\\Phi_E = \\oiint \\vec{E}\\cdot\\mathrm{d}\\vec{A} = E\\cdot\\oiint\\mathrm{d}\\vec{A} = E\\cdot S = E\\cdot 4\\pi R^2\n"}></BlockMath><p>故 <InlineMath data={"E\\cdot 4\\pi R^2 = \\dfrac{q}{\\varepsilon_0}"}></InlineMath>，即</p>
<BlockMath data={"E = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{R^2}\n"}></BlockMath><p>即为 Coulomb’s Law。</p>
<hr />
<h2 id="t-5" tabindex="-1" class="heading">应用 <a class="cursor header-anchor" href="#t-5">¶</a></h2>
<h3 id="t-6" tabindex="-1" class="heading">均匀带电球体 <a class="cursor header-anchor" href="#t-6">¶</a></h3>
<Fold title={<>均匀带电球体</>} expand>半径为 <InlineMath data={"a"}></InlineMath> 的均匀带电球体，电荷密度为 <InlineMath data={"\\rho"}></InlineMath>，求球体内外的电场强度。</Fold>
<p>当 <InlineMath data={"r > a"}></InlineMath> 时，取半径为 <InlineMath data={"r"}></InlineMath> 的球面为高斯面，有</p>
<BlockMath data={"\\Phi_E = \\oiint \\vec{E}\\cdot\\mathrm{d}\\vec{A} = E\\cdot 4\\pi r^2 = \\frac{Q}{\\varepsilon_0}\n"}></BlockMath><p>故 <InlineMath data={"E = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{Q}{r^2} = \\dfrac{\\rho a^3}{3\\varepsilon_0 r^2}"}></InlineMath>（和点电荷的结果一致）。</p>
<p>当 <InlineMath data={"r < a"}></InlineMath> 时，有</p>
<BlockMath data={"\\Phi_E = \\oiint \\vec{E}\\cdot\\mathrm{d}\\vec{A} = E\\cdot 4\\pi r^2 = \\frac{q_{\\text{enc}}}{\\varepsilon_0}\n"}></BlockMath><p>其中</p>
<BlockMath data={"q_{\\text{enc}} = \\rho\\cdot\\frac{4}{3}\\pi r^3\n"}></BlockMath><p>故 <InlineMath data={"E = \\dfrac{\\rho}{3\\varepsilon_0}r"}></InlineMath>（<InlineMath data={"\\propto r"}></InlineMath>）。</p>
<hr />
<h3 id="t-7" tabindex="-1" class="heading">电荷分布于导体表面 <a class="cursor header-anchor" href="#t-7">¶</a></h3>
<p>首先导体内电场一定为 <InlineMath data={"0"}></InlineMath>，否则会有电荷在导体内部运动，违背静电平衡。</p>
<p>因此 <InlineMath data={"\\Phi_E = \\displaystyle\\oiint \\vec{E}\\cdot\\mathrm{d}\\vec{A} = 0"}></InlineMath>，故 <InlineMath data={"Q = 0"}></InlineMath>，即导体内部电荷量为 <InlineMath data={"0"}></InlineMath>，说明导体所有电荷都分布于表面。</p>
<hr />
<p>TBD</p>
</>)
export default jsx;
