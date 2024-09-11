import anchor from "@/components/md/Anchor.vue";
import blockmath from "@/components/md/BlockMath.vue";
import blockcode from "@/components/md/BlockCode.vue";
import inlinemath from "@/components/md/InlineMath.vue";
import linkcard from "@/components/md/LinkCard.vue";
import note from "@/components/md/Note.vue";
export default [
<h2 id="t" tabindex="-1" class="heading">数学公式 <a class="cursor header-anchor" href="#t">¶</a></h2>,
<p>利用 <anchor href="https://katex.org/">KaTeX</anchor> 渲染数学公式。</p>,
<h3 id="t-2" tabindex="-1" class="heading">行内公式 <a class="cursor header-anchor" href="#t-2">¶</a></h3>,
<blockcode lang="md" html="%3Ccode%20class%3D%22language-md%22%3E...%20%24%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3E%E5%85%AC%E5%BC%8F%E5%86%85%E5%AE%B9%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%24%20...%0A%3C%2Fcode%3E"></blockcode>,
<blockquote>
<p>可以不难推得 <inlinemath data="%5Cvarphi(n):=n%5Cprod_%7Bp%5Cmid%20n%7D(1-%5Cfrac%7B1%7D%7Bp%7D)"></inlinemath>。</p>
<p><inlinemath data="%5Cmathfrak%7BXecades%7D"></inlinemath> 这个名字来源于单词 Decade：<inlinemath data="%5Ctext%7B10%20Decades%7D%5Crightarrow%20%5Ctext%7BX%20Decades%7D%5Crightarrow%20%5Ctext%7BXecades%7D"></inlinemath>。</p>
</blockquote>,
<h3 id="t-3" tabindex="-1" class="heading">行间公式 <a class="cursor header-anchor" href="#t-3">¶</a></h3>,
<blockcode lang="md" html="%3Ccode%20class%3D%22language-md%22%3E%24%24%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3E%E5%85%AC%E5%BC%8F%E5%86%85%E5%AE%B9%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%24%24%0A%3C%2Fcode%3E"></blockcode>,
<blockquote>
<blockmath data="%5Cbegin%7Baligned%7D%0A&amp;%5CBigl(f*g%5CBigr)(6)%20%5C%5C%0A=&amp;%5Csum_%7Bd%5Cmid%206%7Df(d)g%5Cbiggl(%5Cdfrac%7B6%7D%7Bd%7D%5Cbiggr)%20%5C%5C%0A=&amp;f(1)g(6)+f(2)g(3)+f(3)g(2)+f(6)g(1)%0A%5Cend%7Baligned%7D%0A"></blockmath></blockquote>,
<hr />,
<h2 id="t-4" tabindex="-1" class="heading">Emoji <a class="cursor header-anchor" href="#t-4">¶</a></h2>,
<p>使用 <anchor href="https://github.com/omnidan/node-emoji"><code class="inline-code">Node-emoji</code> 库</anchor>转译 Emoji。</p>,
<blockcode lang="md" html="%3Ccode%20class%3D%22language-md%22%3E...%20%3A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Eemoji%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3A%20...%0A%3C%2Fcode%3E"></blockcode>,
<blockquote>
<p>诶，🤓 👆 我有一计！</p>
</blockquote>,
<hr />,
<h2 id="t-5" tabindex="-1" class="heading">引言 <a class="cursor header-anchor" href="#t-5">¶</a></h2>,
<p>适合用于展示名言、引用等。</p>,
<blockcode lang="md" html="%3Ccode%20class%3D%22language-md%22%3E%3A%3Aquote%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3E%E5%BC%95%E8%A8%80%E5%86%85%E5%AE%B9%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3A%3A%0A%3C%2Fcode%3E"></blockcode>,
<quote>Two roads diverged in a wood, and I—<br />
I took <em>the one less traveled by</em>,<br />
And that has made all the difference.<br />
<right>—Robert Frost</right></quote>,
<quote>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</quote>,
<quote>
<blockmath data="e%20%5E%20%7Bi%20%5Cpi%7D%20+%201%20=%200%0A"></blockmath></quote>,
<hr />,
<h2 id="t-6" tabindex="-1" class="heading">Note <a class="cursor header-anchor" href="#t-6">¶</a></h2>,
<p>功能上类似于 MkDocs Material 的 <anchor href="https://squidfunk.github.io/mkdocs-material/reference/admonitions/">Admonitions</anchor>，用于提供额外信息。</p>,
<blockcode lang="md" html="%3Ccode%20class%3D%22language-md%22%3E%3A%3Anote%7B%5Bdefault%5D%20%7C%20primary%20%7C%20success%20%7C%20info%20%7C%20warning%20%7C%20danger%7D%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3ENote%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3E%E5%86%85%E5%AE%B9%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3A%3A%0A%3C%2Fcode%3E"></blockcode>,
<note>这里是 <code class="inline-code">note.default</code> 的内容</note>,
<note primary="true">这里是 <code class="inline-code">note.primary</code> 的内容</note>,
<note success="true">这里是 <code class="inline-code">note.success</code> 的内容</note>,
<note info="true">这里是 <code class="inline-code">note.info</code> 的内容</note>,
<note warning="true">这里是 <code class="inline-code">note.warning</code> 的内容</note>,
<note danger="true">这里是 <code class="inline-code">note.danger</code> 的内容</note>,
<note success="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</note>,
<note danger="true"><inlinemath data="%5Ctext%7BP%7D%20%5Cneq%20%5Ctext%7BNP%7D"></inlinemath></note>,
<hr />,
<h2 id="t-7" tabindex="-1" class="heading">链接卡片 <a class="cursor header-anchor" href="#t-7">¶</a></h2>,
<blockcode lang="md" html="%3Ccode%20class%3D%22language-md%22%3E%3A%3Alinkcard%7Bhref%3D%22%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3E%E9%93%BE%E6%8E%A5%E5%9C%B0%E5%9D%80%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%22%7D%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3E%E9%93%BE%E6%8E%A5%E5%90%8D%E7%A7%B0%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3A%3A%0A%3C%2Fcode%3E"></blockcode>,
<linkcard href="https://blog.xecades.xyz/">Xecades 的博客</linkcard>,
<linkcard href="https://github.com/xecades/alpha"><inlinemath data="%5Cmathfrak%7BXecades%7D%20::%20%5Calpha"></inlinemath> 的 GitHub 仓库</linkcard>,
<linkcard href="/">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</linkcard>,
];
