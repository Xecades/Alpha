import anchor from "@/components/md/Anchor.vue";
import blockmath from "@/components/md/BlockMath.vue";
import blockcode from "@/components/md/BlockCode.vue";
import inlinemath from "@/components/md/InlineMath.vue";
import imagecaptioned from "@/components/md/ImageCaptioned.vue";
export default [
<h2 id="t" tabindex="-1" class="heading">普通标题 <a class="cursor header-anchor" href="#t">¶</a></h2>,
<h3 id="t-2" tabindex="-1" class="heading">1-1 <a class="cursor header-anchor" href="#t-2">¶</a></h3>,
<p>一些内容</p>,
<hr />,
<h2 id="t-3" tabindex="-1" class="heading">另一个标题 <a class="cursor header-anchor" href="#t-3">¶</a></h2>,
<blockcode lang="plain" html="%3Ccode%3E%23%20%E8%BF%99%E9%87%8C%E4%B8%8D%E5%BA%94%E8%AF%A5%E8%A2%AB%E8%AF%86%E5%88%AB%E4%B8%BA%E6%A0%87%E9%A2%98%0A%23%23%20%E8%BF%99%E9%87%8C%E4%B9%9F%E6%98%AF%0A%23%23%23and%20this%0A%3C%2Fcode%3E"></blockcode>,
<hr />,
<h2 id="t-4" tabindex="-1" class="heading">但是这里应该被判定为标题 <a class="cursor header-anchor" href="#t-4">¶</a></h2>,
<blockcode lang="plain" html="%3Ccode%3E%23%20%E8%BF%99%E9%87%8C%E4%B8%8D%E5%BA%94%E8%AF%A5%E8%A2%AB%E8%AF%86%E5%88%AB%E4%B8%BA%E6%A0%87%E9%A2%98%0A%3C%2Fcode%3E"></blockcode>,
<h3 id="t-5" tabindex="-1" class="heading">这里也是 <a class="cursor header-anchor" href="#t-5">¶</a></h3>,
<h4 id="t-6" tabindex="-1" class="heading">这个标题内还有 <inlinemath data="%5CLaTeX"></inlinemath> 数学公式 <a class="cursor header-anchor" href="#t-6">¶</a></h4>,
<h3 id="t-7" tabindex="-1" class="heading">这个标题里面有 <code>code</code> 块 <a class="cursor header-anchor" href="#t-7">¶</a></h3>,
<h2 id="t-8" tabindex="-1" class="heading">这个<em>意大利的</em>标题非常<strong>强壮</strong> <a class="cursor header-anchor" href="#t-8">¶</a></h2>,
];
