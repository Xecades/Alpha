import Anchor from "@/components/md/Anchor.vue";
import BlockCode from "@/components/md/BlockCode.vue";
import BlockMath from "@/components/md/BlockMath.vue";
import Fold from "@/components/md/Fold.vue";
import ImageCaptioned from "@/components/md/ImageCaptioned.vue";
import InlineMath from "@/components/md/InlineMath.vue";
import LinkCard from "@/components/md/LinkCard.vue";
import Note from "@/components/md/Note.vue";
import SVGCaptioned from "@/components/md/SVGCaptioned.vue";
import Tab from "@/components/md/Tab.vue";
export default <><h2 id="t" tabindex="-1" class="heading">普通标题 <a class="cursor header-anchor" href="#t">¶</a></h2>
<h3 id="t-2" tabindex="-1" class="heading">1-1 <a class="cursor header-anchor" href="#t-2">¶</a></h3>
<p>一些内容</p>
<hr />
<h2 id="t-3" tabindex="-1" class="heading">另一个标题 <a class="cursor header-anchor" href="#t-3">¶</a></h2>
<BlockCode lang="plain" html={"<code># 这里不应该被识别为标题\n## 这里也是\n###and this\n</code>"}></BlockCode><hr />
<h2 id="t-4" tabindex="-1" class="heading">但是这里应该被判定为标题 <a class="cursor header-anchor" href="#t-4">¶</a></h2>
<BlockCode lang="plain" html={"<code># 这里不应该被识别为标题\n</code>"}></BlockCode><h3 id="t-5" tabindex="-1" class="heading">这里也是 <a class="cursor header-anchor" href="#t-5">¶</a></h3>
<h4 id="t-6" tabindex="-1" class="heading">这个标题内还有 <InlineMath data={"\\LaTeX"}></InlineMath> 数学公式 <a class="cursor header-anchor" href="#t-6">¶</a></h4>
<h3 id="t-7" tabindex="-1" class="heading">这个标题里面有 <code class="inline-code">code</code> 块 <a class="cursor header-anchor" href="#t-7">¶</a></h3>
<h2 id="t-8" tabindex="-1" class="heading">这个<em>意大利的</em>标题非常<strong>强壮</strong> <a class="cursor header-anchor" href="#t-8">¶</a></h2>
</>