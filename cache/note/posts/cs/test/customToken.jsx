import Anchor from "@/components/md/Anchor.vue";
import BlockMath from "@/components/md/BlockMath.vue";
import InlineMath from "@/components/md/InlineMath.vue";
import ImageCaptioned from "@/components/md/ImageCaptioned.vue";
export default <><p>Ordinary text, <InlineMath data="%5CLaTeX"></InlineMath>, another text</p>
<p>Hey, <InlineMath data="%5Cmathfrak%7BXecades%7D"></InlineMath></p>
<BlockMath data="%5Cbegin%7Baligned%7D%0A&%5CBigl(f*g%5CBigr)(6)%20%5C%5C%0A=&%5Csum_%7Bd%5Cmid%206%7Df(d)g%5Cbiggl(%5Cdfrac%7B6%7D%7Bd%7D%5Cbiggr)%20%5C%5C%0A=&f(1)g(6)+f(2)g(3)+f(3)g(2)+f(6)g(1)%0A%5Cend%7Baligned%7D"></BlockMath></>