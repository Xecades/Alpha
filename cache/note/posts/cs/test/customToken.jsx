import blockmath from "@/components/md/BlockMath.vue";
import blockcode from "@/components/md/BlockCode.vue";
import inlinemath from "@/components/md/InlineMath.vue";
export default [
<p>Ordinary text, <inlinemath data="%5CLaTeX"></inlinemath>, another text</p>,
<p>Hey, <inlinemath data="%5Cmathfrak%7BXecades%7D"></inlinemath></p>,
<blockmath data="%5Cbegin%7Baligned%7D%0A&amp;%5CBigl(f*g%5CBigr)(6)%20%5C%5C%0A=&amp;%5Csum_%7Bd%5Cmid%206%7Df(d)g%5Cbiggl(%5Cdfrac%7B6%7D%7Bd%7D%5Cbiggr)%20%5C%5C%0A=&amp;f(1)g(6)+f(2)g(3)+f(3)g(2)+f(6)g(1)%0A%5Cend%7Baligned%7D%0A"></blockmath>,
<p>Emoji test😄:hello</p>,
<blockcode lang="c" html="%3Ccode%20class%3D%22language-c%22%3Estd%3Cspan%20class%3D%22token%20operator%22%3E%3A%3A%3C%2Fspan%3Ecout%20%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%26lt%3B%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E%22Hello%20world%22%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%26lt%3B%3C%2Fspan%3E%20std%3Cspan%20class%3D%22token%20operator%22%3E%3A%3A%3C%2Fspan%3Eendl%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%0Astd%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3Esmile%3Cspan%20class%3D%22token%20operator%22%3E%3A%3C%2Fspan%3Ecin%0A%3C%2Fcode%3E"></blockcode>,
];
