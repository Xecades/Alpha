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
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFlask } from "@fortawesome/free-solid-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faA } from "@fortawesome/free-solid-svg-icons";
import { faB } from "@fortawesome/free-solid-svg-icons";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
library.add(faFlask, faCode, faArrowUp, faArrowDown, faArrowLeft, faArrowRight, faA, faB, faSackDollar);
import temp_0 from "/cache/note/temp/customToken.0.9b9ccd6d.svg";
import temp_1 from "/cache/note/temp/customToken.1.10557a4d.svg";
import temp_2 from "/cache/note/temp/customToken.2.5c94f72e.svg";
import temp_3 from "/cache/note/temp/customToken.3.bd1e9f82.svg";
import temp_4 from "/cache/note/temp/customToken.4.20924a60.svg";
import type { JSX } from "vue/jsx-runtime";
const jsx: JSX.Element = (<><h2 id="t" tabindex="-1" class="heading">数学公式 <a class="cursor header-anchor" href="#t">¶</a></h2>
<p>利用 <Anchor href="https://katex.org/">KaTeX</Anchor> 渲染数学公式。</p>
<h3 id="t-2" tabindex="-1" class="heading">行内公式 <a class="cursor header-anchor" href="#t-2">¶</a></h3>
<BlockCode lang="md" html={"<code class=\"language-md\">... $<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>公式内容</span><span class=\"token punctuation\">></span></span>$ ...\n</code>"}></BlockCode><Tab>
<Delimiter><font-awesome-icon class="icon" icon="flask" /> 效果</Delimiter>
<p>可以不难推得 <InlineMath data={"\\varphi(n):=n\\prod_{p\\mid n}(1-\\frac{1}{p})"}></InlineMath>。</p>
<p><InlineMath data={"\\mathfrak{Xecades}"}></InlineMath> 这个名字来源于单词 Decade：<InlineMath data={"\\text{10 Decades}\\rightarrow \\text{X Decades}\\rightarrow \\text{Xecades}"}></InlineMath>。</p>
<Delimiter><font-awesome-icon class="icon" icon="code" /> 源码</Delimiter>
<BlockCode lang="md" html={"<code class=\"language-md\">可以不难推得 $\\varphi(n):=n\\prod_{p\\mid n}(1-\\frac{1}{p})$。\n\n$\\mathfrak{Xecades}$ 这个名字来源于单词 Decade：$\\text{10 Decades}\\rightarrow \\text{X Decades}\\rightarrow \\text{Xecades}$。\n</code>"}></BlockCode></Tab>
<h3 id="t-3" tabindex="-1" class="heading">行间公式 <a class="cursor header-anchor" href="#t-3">¶</a></h3>
<BlockCode lang="md" html={"<code class=\"language-md\">$$\n<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>公式内容</span><span class=\"token punctuation\">></span></span>\n$$\n</code>"}></BlockCode><Tab>
<Delimiter><font-awesome-icon class="icon" icon="flask" /> 效果</Delimiter>
<BlockMath data={"\\begin{aligned}\n&\\Bigl(f*g\\Bigr)(6) \\\\\n=&\\sum_{d\\mid 6}f(d)g\\biggl(\\dfrac{6}{d}\\biggr) \\\\\n=&f(1)g(6)+f(2)g(3)+f(3)g(2)+f(6)g(1)\n\\end{aligned}\n"}></BlockMath><Delimiter><font-awesome-icon class="icon" icon="code" /> 源码</Delimiter>
<BlockCode lang="md" html={"<code class=\"language-md\">$$\n\\begin{aligned}\n&amp;\\Bigl(f*g\\Bigr)(6) \\\\\n=&amp;\\sum_{d\\mid 6}f(d)g\\biggl(\\dfrac{6}{d}\\biggr) \\\\\n=&amp;f(1)g(6)+f(2)g(3)+f(3)g(2)+f(6)g(1)\n\\end{aligned}\n$$\n</code>"}></BlockCode></Tab>
<hr />
<h2 id="t-4" tabindex="-1" class="heading">Icon <a class="cursor header-anchor" href="#t-4">¶</a></h2>
<p>使用 <Anchor href="https://fontawesome.com">FontAwesome</Anchor> 加载 SVG 图标。</p>
<BlockCode lang="md" html={"<code class=\"language-md\">... :<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>icon</span><span class=\"token punctuation\">></span></span>: ...\n</code>"}></BlockCode><Tab>
<Delimiter><font-awesome-icon class="icon" icon="flask" /> 效果</Delimiter>
<p>The <em>magic spell</em> <font-awesome-icon class="icon" icon="arrow-up" /> <font-awesome-icon class="icon" icon="arrow-up" /> <font-awesome-icon class="icon" icon="arrow-down" /> <font-awesome-icon class="icon" icon="arrow-down" /> <font-awesome-icon class="icon" icon="arrow-left" /> <font-awesome-icon class="icon" icon="arrow-right" /> <font-awesome-icon class="icon" icon="arrow-left" /> <font-awesome-icon class="icon" icon="arrow-right" /> <font-awesome-icon class="icon" icon="a" /> <font-awesome-icon class="icon" icon="b" /> <font-awesome-icon class="icon" icon="a" /> <font-awesome-icon class="icon" icon="b" /> will lead you to the treasure <font-awesome-icon class="icon" icon="sack-dollar" />.</p>
<Delimiter><font-awesome-icon class="icon" icon="code" /> 源码</Delimiter>
<BlockCode lang="md" html={"<code class=\"language-md\">The <span class=\"token italic\"><span class=\"token punctuation\">*</span><span class=\"token content\">magic spell</span><span class=\"token punctuation\">*</span></span> :arrow-up: :arrow-up: :arrow-down: :arrow-down: :arrow-left: :arrow-right: :arrow-left: :arrow-right: :a: :b: :a: :b: will lead you to the treasure :sack-dollar:.\n</code>"}></BlockCode></Tab>
<hr />
<h2 id="t-5" tabindex="-1" class="heading">引言 <a class="cursor header-anchor" href="#t-5">¶</a></h2>
<p>适合用于展示名言、引用等。</p>
<BlockCode lang="md" html={"<code class=\"language-md\">::quote\n<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>引言内容</span><span class=\"token punctuation\">></span></span>\n::\n</code>"}></BlockCode><Tab>
<Delimiter><font-awesome-icon class="icon" icon="flask" /> 效果</Delimiter>
<div class="quote">Two roads diverged in a wood, and I—<br />
I took <em>the one less traveled by</em>,<br />
And that has made all the difference.<br />
<div class="right">—Robert Frost</div></div>
<Delimiter><font-awesome-icon class="icon" icon="code" /> 源码</Delimiter>
<BlockCode lang="md" html={"<code class=\"language-md\">:::quote\nTwo roads diverged in a wood, and I—\\\nI took <span class=\"token italic\"><span class=\"token punctuation\">*</span><span class=\"token content\">the one less traveled by</span><span class=\"token punctuation\">*</span></span>,\\\nAnd that has made all the difference.\\\n<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>right</span><span class=\"token punctuation\">></span></span>—Robert Frost<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>right</span><span class=\"token punctuation\">></span></span>\n:::\n</code>"}></BlockCode></Tab>
<div class="quote">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
<div class="quote">
<BlockMath data={"e ^ {i \\pi} + 1 = 0\n"}></BlockMath></div>
<hr />
<h2 id="t-6" tabindex="-1" class="heading">Note <a class="cursor header-anchor" href="#t-6">¶</a></h2>
<p>功能上类似于 MkDocs Material 的 <Anchor href="https://squidfunk.github.io/mkdocs-material/reference/admonitions/">Admonitions</Anchor>，用于提供额外信息。</p>
<BlockCode lang="md" html={"<code class=\"language-md\">::note{[default] | success | info | warning | danger}\n<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>Note</span> <span class=\"token attr-name\">内容</span><span class=\"token punctuation\">></span></span>\n::\n</code>"}></BlockCode><Tab>
<Delimiter><font-awesome-icon class="icon" icon="flask" /> 效果</Delimiter>
<Note>这里是 <code class="inline-code">{"note.default"}</code> 的内容</Note>
<Delimiter><font-awesome-icon class="icon" icon="code" /> 源码</Delimiter>
<BlockCode lang="md" html={"<code class=\"language-md\">:::note\n这里是 <span class=\"token code-snippet code keyword\">`note.default`</span> 的内容\n:::\n</code>"}></BlockCode></Tab>
<Tab>
<Delimiter><font-awesome-icon class="icon" icon="flask" /> 效果</Delimiter>
<Note type="danger"><InlineMath data={"\\text{P} \\neq \\text{NP}"}></InlineMath></Note>
<Delimiter><font-awesome-icon class="icon" icon="code" /> 源码</Delimiter>
<BlockCode lang="md" html={"<code class=\"language-md\">:::note{danger}\n$\\text{P} \\neq \\text{NP}$\n:::\n</code>"}></BlockCode></Tab>
<Note type="success">这里是 <code class="inline-code">{"note.success"}</code> 的内容</Note>
<Note type="info">这里是 <code class="inline-code">{"note.info"}</code> 的内容</Note>
<Note type="warning">这里是 <code class="inline-code">{"note.warning"}</code> 的内容</Note>
<Note type="danger">这里是 <code class="inline-code">{"note.danger"}</code> 的内容</Note>
<Note type="success">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Note>
<hr />
<h2 id="t-7" tabindex="-1" class="heading">折叠面板 <a class="cursor header-anchor" href="#t-7">¶</a></h2>
<BlockCode lang="md" html={"<code class=\"language-md\">::fold{title=\"[标题]\" <span class=\"token url\">[<span class=\"token content\">expand</span>] [<span class=\"token variable\">default</span>]</span> | success | info | warning | danger}\n<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>折叠内容</span><span class=\"token punctuation\">></span></span>\n::\n</code>"}></BlockCode><Tab>
<Delimiter><font-awesome-icon class="icon" icon="flask" /> 效果</Delimiter>
<Fold title={<>默认展开的 <code class="inline-code">{"default"}</code> 折叠面板</>} expand>这里是 <code class="inline-code">{"fold.default"}</code> 的内容</Fold>
<Delimiter><font-awesome-icon class="icon" icon="code" /> 源码</Delimiter>
<BlockCode lang="md" html={"<code class=\"language-md\">:::fold{title=\"默认展开的 <span class=\"token code-snippet code keyword\">`default`</span> 折叠面板\" expand}\n这里是 <span class=\"token code-snippet code keyword\">`fold.default`</span> 的内容\n:::\n</code>"}></BlockCode></Tab>
<Fold title={<><code class="inline-code">{"success"}</code> 折叠面板</>} type="success">这里是 <code class="inline-code">{"fold.success"}</code> 的内容</Fold>
<Fold title={<><code class="inline-code">{"info"}</code> 折叠面板</>} type="info">这里是 <code class="inline-code">{"fold.info"}</code> 的内容</Fold>
<Fold title={<><code class="inline-code">{"warning"}</code> 折叠面板</>} type="warning">这里是 <code class="inline-code">{"fold.warning"}</code> 的内容</Fold>
<Fold title={<><code class="inline-code">{"danger"}</code> 折叠面板</>} type="danger">这里是 <code class="inline-code">{"fold.danger"}</code> 的内容</Fold>
<Fold title={<>标题是支持 <InlineMath data={"\\LaTeX"}></InlineMath> 的</>} expand type="success">
<p>折叠面板也支持 <InlineMath data={"\\LaTeX"}></InlineMath>！</p>
<BlockMath data={"\\begin{aligned}\n&\\Bigl(f*g\\Bigr)(6) \\\\\n=&\\sum_{d\\mid 6}f(d)g\\biggl(\\dfrac{6}{d}\\biggr) \\\\\n=&f(1)g(6)+f(2)g(3)+f(3)g(2)+f(6)g(1)\n\\end{aligned}\n"}></BlockMath></Fold>
<Fold title={<>Lorem</>} type="danger">
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<p>Veniam irure ipsum dolore dolore Lorem voluptate adipisicing eiusmod minim. Eu incididunt enim irure nisi. Amet eu nostrud irure Lorem mollit eu ipsum excepteur cillum irure in sint reprehenderit deserunt. Occaecat adipisicing culpa excepteur magna id dolor exercitation ut ea dolor ut veniam est eiusmod. Consequat qui ut labore dolor ut. Ipsum ullamco commodo veniam occaecat fugiat sint consectetur nisi deserunt sunt ullamco et veniam. Do commodo mollit voluptate veniam ipsum irure dolore nisi.</p>
</Fold>
<Fold type="success">
<div class="quote">这个折叠面板没有标题</div>
</Fold>
<Fold title={<>这个折叠面板的标题真的真的真的真的真的真的真的真的真的真的真的真的非常的长，而且里面还有 <code class="inline-code">{"code"}</code> 块</>}>
<BlockCode lang="python" html={"<code class=\"language-python\"><span class=\"token keyword\">print</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"Hello World\"</span><span class=\"token punctuation\">)</span>\n</code>"}></BlockCode></Fold>
<hr />
<h2 id="t-8" tabindex="-1" class="heading">链接卡片 <a class="cursor header-anchor" href="#t-8">¶</a></h2>
<BlockCode lang="md" html={"<code class=\"language-md\">::linkcard{href=\"<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>链接地址</span><span class=\"token punctuation\">></span></span>\"}\n<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>链接名称</span><span class=\"token punctuation\">></span></span>\n::\n</code>"}></BlockCode><Tab>
<Delimiter><font-awesome-icon class="icon" icon="flask" /> 效果</Delimiter>
<LinkCard href="https://blog.xecades.xyz/">Xecades 的博客</LinkCard>
<Delimiter><font-awesome-icon class="icon" icon="code" /> 源码</Delimiter>
<BlockCode lang="md" html={"<code class=\"language-md\">:::linkcard{href=\"https://blog.xecades.xyz/\"}\nXecades 的博客\n:::\n</code>"}></BlockCode></Tab>
<LinkCard href="https://github.com/xecades/alpha"><InlineMath data={"\\mathfrak{Xecades} :: \\alpha"}></InlineMath> 的 GitHub 仓库</LinkCard>
<LinkCard href="/">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</LinkCard>
<hr />
<h2 id="t-9" tabindex="-1" class="heading">Typst 渲染 <a class="cursor header-anchor" href="#t-9">¶</a></h2>
<p>基于 <Anchor href="https://myriad-dreamin.github.io/typst.ts">Typst.ts</Anchor> 实现 Typst 的渲染。</p>
<BlockCode lang="plain" html={"<code>```typst [标题]\n&lt;Typst 代码&gt;\n```\n</code>"}></BlockCode><Tab>
<Delimiter><font-awesome-icon class="icon" icon="flask" /> 效果</Delimiter>
<ImageCaptioned alt={"一棵来自 Typst 的树"} src={temp_0}>一棵来自 <em><strong>Typst</strong></em> 的树</ImageCaptioned><Delimiter><font-awesome-icon class="icon" icon="code" /> 源码</Delimiter>
<BlockCode lang="md" html={"<code class=\"language-md\"><span class=\"token code\"><span class=\"token punctuation\">```</span><span class=\"token code-language\">typst 一棵来自 ***Typst*** 的树</span>\n<span class=\"token code-block language-typst\">#import \"@preview/cetz:0.2.2\": canvas, draw, tree\n#canvas(length: 2.5cm, {\n    import draw: *\n    tree.tree(\n        draw-node: (node, ..) => {\n            if node.content == [] { return none }\n            circle((), radius: .35, stroke: black)\n            content((), [#node.content])\n        },\n        draw-edge: (from, to, pa, child) => {\n            if child.content == [] { return none }\n            tree.default-draw-edge(from, to, pa, child)\n        },\n        ([15], ([13], [12], [14]), ([17], [16], ([18], [], [18])))\n    )\n})</span>\n<span class=\"token punctuation\">```</span></span>\n</code>"}></BlockCode></Tab>
<hr />
<h2 id="t-10" tabindex="-1" class="heading">选项卡 <a class="cursor header-anchor" href="#t-10">¶</a></h2>
<BlockCode lang="md" html={"<code class=\"language-md\">::tab\n<span class=\"token title important\"><span class=\"token punctuation\">#</span> &lt;选项卡 1></span>\n\n<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>选项卡</span> <span class=\"token attr-name\">1</span> <span class=\"token attr-name\">内容</span><span class=\"token punctuation\">></span></span>\n\n<span class=\"token title important\"><span class=\"token punctuation\">#</span> &lt;选项卡 2></span>\n\n<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>选项卡</span> <span class=\"token attr-name\">2</span> <span class=\"token attr-name\">内容</span><span class=\"token punctuation\">></span></span>\n\n[...]\n::\n</code>"}></BlockCode><Tab>
<Delimiter>选项卡 1</Delimiter>
<p>这里是「<strong>选项卡 1</strong>」 的内容</p>
<Delimiter>选项卡 2</Delimiter>
<p>这里是「<strong>选项卡 2</strong>」 的内容</p>
<Delimiter><InlineMath data={"\\LaTeX"}></InlineMath> 公式</Delimiter>
<p>选项卡也是支持 <InlineMath data={"\\LaTeX"}></InlineMath> 的！</p>
<BlockMath data={"\\begin{aligned}\n&\\Bigl(f*g\\Bigr)(6) \\\\\n=&\\sum_{d\\mid 6}f(d)g\\biggl(\\dfrac{6}{d}\\biggr) \\\\\n=&f(1)g(6)+f(2)g(3)+f(3)g(2)+f(6)g(1)\n\\end{aligned}\n"}></BlockMath><Delimiter>Lorem</Delimiter>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<Delimiter>一个名字很长很长很长很长很长很长的选项卡（而且名字里面还有 <code class="inline-code">{"code"}</code>）</Delimiter>
<BlockCode lang="python" html={"<code class=\"language-python\"><span class=\"token keyword\">print</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"Hello World\"</span><span class=\"token punctuation\">)</span>\n</code>"}></BlockCode><Delimiter><font-awesome-icon class="icon" icon="code" /> 源码</Delimiter>
<BlockCode lang="md" html={"<code class=\"language-md\">:::tab\n<span class=\"token title important\"><span class=\"token punctuation\">#</span> 选项卡 1</span>\n\n这里是「<span class=\"token bold\"><span class=\"token punctuation\">**</span><span class=\"token content\">选项卡 1</span><span class=\"token punctuation\">**</span></span>」 的内容\n\n<span class=\"token title important\"><span class=\"token punctuation\">#</span> 选项卡 2</span>\n\n这里是「<span class=\"token bold\"><span class=\"token punctuation\">**</span><span class=\"token content\">选项卡 2</span><span class=\"token punctuation\">**</span></span>」 的内容\n\n<span class=\"token title important\"><span class=\"token punctuation\">#</span> $\\LaTeX$ 公式</span>\n\n选项卡也是支持 $\\LaTeX$ 的！\n\n$$\n\\begin{aligned}\n&amp;\\Bigl(f*g\\Bigr)(6) \\\\\n=&amp;\\sum_{d\\mid 6}f(d)g\\biggl(\\dfrac{6}{d}\\biggr) \\\\\n=&amp;f(1)g(6)+f(2)g(3)+f(3)g(2)+f(6)g(1)\n\\end{aligned}\n$$\n\n<span class=\"token title important\"><span class=\"token punctuation\">#</span> Lorem</span>\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n<span class=\"token title important\"><span class=\"token punctuation\">#</span> 一个名字很长很长很长很长很长很长的选项卡（而且名字里面还有 `code`）</span>\n\n<span class=\"token code\"><span class=\"token punctuation\">```</span><span class=\"token code-language\">python</span>\n<span class=\"token code-block language-python\"><span class=\"token keyword\">print</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"Hello World\"</span><span class=\"token punctuation\">)</span></span>\n<span class=\"token punctuation\">```</span></span>\n:::\n</code>"}></BlockCode></Tab>
<Tab>
<Delimiter>唯一一个 Tab！</Delimiter>
<Note>这个选项卡只有这一个 Tab</Note>
</Tab>
<hr />
<h2 id="t-11" tabindex="-1" class="heading">Grid <a class="cursor header-anchor" href="#t-11">¶</a></h2>
<BlockCode lang="md" html={"<code class=\"language-md\">::grid\n:sep{width=\"<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>宽度</span><span class=\"token punctuation\">></span></span>\"}\n\n<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>内容</span> <span class=\"token attr-name\">1</span><span class=\"token punctuation\">></span></span>\n\n:sep{width=\"<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>宽度</span><span class=\"token punctuation\">></span></span>\"}\n\n<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>内容</span> <span class=\"token attr-name\">2</span><span class=\"token punctuation\">></span></span>\n\n[...]\n::\n</code>"}></BlockCode><Tab>
<Delimiter><font-awesome-icon class="icon" icon="flask" /> 效果</Delimiter>
<Grid>
<Delimiter width="50%" />
<ImageCaptioned alt={"二叉搜索树 例 1"} src={temp_1}><strong>二叉搜索树</strong>例 1</ImageCaptioned><Delimiter width="50%" />
<ImageCaptioned alt={"二叉搜索树 例 2"} src={temp_2}><strong>二叉搜索树</strong>例 2</ImageCaptioned><Delimiter width="50%" />
<ImageCaptioned alt={"二叉搜索树 例 3"} src={temp_3}><strong>二叉搜索树</strong>例 3</ImageCaptioned><Delimiter width="50%" />
<ImageCaptioned alt={"二叉搜索树 例 4"} src={temp_4}><strong>二叉搜索树</strong>例 4</ImageCaptioned></Grid>
<Delimiter><font-awesome-icon class="icon" icon="code" /> 源码</Delimiter>
<BlockCode lang="md" html={"<code class=\"language-md\">:::grid\n:sep{width=\"50%\"}\n\n<span class=\"token code\"><span class=\"token punctuation\">```</span><span class=\"token code-language\">typst **二叉搜索树**例 1</span>\n<span class=\"token code-block language-typst\">#import \"@preview/cetz:0.2.2\": canvas, draw, tree\n#canvas(length: 2.5cm, {\n    import draw: *\n    tree.tree(\n        draw-node: (node, ..) => {\n            if node.content == [] { return none }\n            circle((), radius: .35, stroke: black)\n            content((), [#node.content])\n        },\n        draw-edge: (from, to, pa, child) => {\n            if child.content == [] { return none }\n            tree.default-draw-edge(from, to, pa, child)\n        },\n        ([20], ([16], [13], [18]), ([25], [21], [28]))\n    )\n})</span>\n<span class=\"token punctuation\">```</span></span>\n\n:sep{width=\"50%\"}\n\n<span class=\"token code\"><span class=\"token punctuation\">```</span><span class=\"token code-language\">typst **二叉搜索树**例 2</span>\n<span class=\"token code-block language-typst\">#import \"@preview/cetz:0.2.2\": canvas, draw, tree\n#canvas(length: 2.5cm, {\n    import draw: *\n    tree.tree(\n        draw-node: (node, ..) => {\n            if node.content == [] { return none }\n            circle((), radius: .35, stroke: black)\n            content((), [#node.content])\n        },\n        draw-edge: (from, to, pa, child) => {\n            if child.content == [] { return none }\n            tree.default-draw-edge(from, to, pa, child)\n        },\n        ([10], ([5], [2], [7]), [15])\n    )\n})</span>\n<span class=\"token punctuation\">```</span></span>\n\n:sep{width=\"50%\"}\n\n<span class=\"token code\"><span class=\"token punctuation\">```</span><span class=\"token code-language\">typst **二叉搜索树**例 3</span>\n<span class=\"token code-block language-typst\">#import \"@preview/cetz:0.2.2\": canvas, draw, tree\n#canvas(length: 2.5cm, {\n    import draw: *\n    tree.tree(\n        draw-node: (node, ..) => {\n            if node.content == [] { return none }\n            circle((), radius: .35, stroke: black)\n            content((), [#node.content])\n        },\n        draw-edge: (from, to, pa, child) => {\n            if child.content == [] { return none }\n            tree.default-draw-edge(from, to, pa, child)\n        },\n        ([15], ([13], [12], [14]), ([17], [16], ([18], [], [18])))\n    )\n})</span>\n<span class=\"token punctuation\">```</span></span>\n\n:sep{width=\"50%\"}\n\n<span class=\"token code\"><span class=\"token punctuation\">```</span><span class=\"token code-language\">typst **二叉搜索树**例 4</span>\n<span class=\"token code-block language-typst\">#import \"@preview/cetz:0.2.2\": canvas, draw, tree\n#canvas(length: 2.5cm, {\n    import draw: *\n    tree.tree(\n        draw-node: (node, ..) => {\n            if node.content == [] { return none }\n            circle((), radius: .35, stroke: black)\n            content((), [#node.content])\n        },\n        draw-edge: (from, to, pa, child) => {\n            if child.content == [] { return none }\n            tree.default-draw-edge(from, to, pa, child)\n        },\n        ([16], ([10], ([7], [1], []), [15]), ([19], ([17], [], [18]), [20]))\n    )\n})</span>\n<span class=\"token punctuation\">```</span></span>\n\n:::\n</code>"}></BlockCode></Tab>
</>)
export default jsx;
