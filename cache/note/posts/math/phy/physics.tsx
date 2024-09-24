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
const jsx: JSX.Element = (<><h2 id="t" tabindex="-1" class="heading">Gauss’ Law <a class="cursor header-anchor" href="#t">¶</a></h2>
<BlockMath data={"\\begin{align*}\n    积分形式&\\quad \\Phi_E := \\oiint \\vec{E}\\cdot\\mathrm{d}\\vec{A} \\equiv \\frac{q_{\\text{enclosed}}}{\\varepsilon_0} \\\\\n    微分形式&\\quad \\nabla\\cdot\\vec{E} = \\frac{\\rho}{\\varepsilon_0}\n\\end{align*}\n"}></BlockMath><blockquote>
<p><InlineMath data={"\\nabla"}></InlineMath> 算符：<InlineMath data={"\\nabla = \\dfrac{\\partial}{\\partial x}\\vec{\\imath} + \\dfrac{\\partial}{\\partial y}\\vec{\\jmath} + \\dfrac{\\partial}{\\partial z}\\vec{k}"}></InlineMath></p>
</blockquote>
</>)
export default jsx;
