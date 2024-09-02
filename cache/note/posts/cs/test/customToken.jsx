import anchor from "@/components/md/Anchor.vue";
import blockmath from "@/components/md/BlockMath.vue";
import inlinemath from "@/components/md/InlineMath.vue";
import imagecaptioned from "@/components/md/ImageCaptioned.vue";
export default [
<p>Ordinary text, <inlinemath data="%5CLaTeX"></inlinemath>, another text</p>,
<p>Hey, <inlinemath data="%5Cmathfrak%7BXecades%7D"></inlinemath></p>,
<blockmath data="%5Cbegin%7Baligned%7D%0A&amp;%5CBigl(f*g%5CBigr)(6)%20%5C%5C%0A=&amp;%5Csum_%7Bd%5Cmid%206%7Df(d)g%5Cbiggl(%5Cdfrac%7B6%7D%7Bd%7D%5Cbiggr)%20%5C%5C%0A=&amp;f(1)g(6)+f(2)g(3)+f(3)g(2)+f(6)g(1)%0A%5Cend%7Baligned%7D"></blockmath>,
];
