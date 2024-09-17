import Anchor from "@/components/md/Anchor.vue";
import BlockCode from "@/components/md/BlockCode.vue";
import BlockMath from "@/components/md/BlockMath.vue";
import Fold from "@/components/md/Fold.vue";
import Grid from "@/components/md/Grid.vue";
import ImageCaptioned from "@/components/md/ImageCaptioned.vue";
import InlineMath from "@/components/md/InlineMath.vue";
import LinkCard from "@/components/md/LinkCard.vue";
import Note from "@/components/md/Note.vue";
import SVGCaptioned from "@/components/md/SVGCaptioned.vue";
import Tab from "@/components/md/Tab.vue";
export default <><p>普通文字</p>
<hr />
<h2 id="t" tabindex="-1" class="heading">二级标题 <a class="cursor header-anchor" href="#t">¶</a></h2>
<h3 id="t-2" tabindex="-1" class="heading">三级标题 <a class="cursor header-anchor" href="#t-2">¶</a></h3>
<h4 id="t-3" tabindex="-1" class="heading">四级标题 <a class="cursor header-anchor" href="#t-3">¶</a></h4>
<h5 id="t-4" tabindex="-1" class="heading">五级标题 <a class="cursor header-anchor" href="#t-4">¶</a></h5>
<h6 id="t-5" tabindex="-1" class="heading">六级标题 <a class="cursor header-anchor" href="#t-5">¶</a></h6>
<hr />
<ul class="task-list">
<li class="task-list-item"><input type="checkbox" id="cbx_0" checked="true" disabled="true" /><label for="cbx_0"> 选中</label></li>
<li class="task-list-item"><input type="checkbox" id="cbx_1" disabled="true" /><label for="cbx_1"> 未选中</label></li>
</ul>
<hr />
<p>Sunt ullamco esse esse sit aliquip aliquip ea laboris ea nulla. Quis eiusmod enim aliqua consectetur sit ea. Commodo anim enim sit qui nisi culpa labore fugiat nisi est nulla ad. Dolore dolor magna Lorem sunt dolor commodo eu ad aliquip officia officia incididunt deserunt. Adipisicing veniam aliquip incididunt et amet velit nulla quis magna culpa aliqua nulla. Lorem proident Lorem nostrud elit quis quis id duis incididunt reprehenderit.</p>
<p>Magna do ipsum incididunt nisi nisi do et consectetur excepteur amet. Irure qui aute incididunt velit consectetur nisi et sint elit dolor voluptate. Magna et non ullamco minim commodo amet culpa anim ea excepteur consequat pariatur laboris. Duis reprehenderit ipsum officia duis ut veniam. Ex deserunt labore velit minim laboris veniam magna velit exercitation ea minim. Velit amet veniam aute minim. Dolore occaecat officia minim dolor cupidatat ut sint.</p>
<p>Tempor voluptate aliquip consectetur excepteur culpa. Et dolor in adipisicing commodo ex magna dolore ut aliquip. Nulla nisi nulla commodo id proident sit proident dolor dolore ipsum ullamco. Fugiat Lorem est sunt excepteur Lorem officia labore. Ut et tempor in exercitation nostrud amet eiusmod.</p>
<p>Exercitation incididunt dolore cupidatat mollit veniam esse reprehenderit eiusmod cillum eu tempor dolor aliqua minim. Laboris voluptate consequat exercitation nisi ipsum. Cillum anim voluptate sunt est nostrud magna quis ad irure.</p>
<hr />
<p><em>斜体</em>、<strong>粗体</strong>、<em><strong>加粗斜体</strong></em>、<s>删除线</s></p>
<hr />
<p>在一个段落中的<Anchor href="https://www.baidu.com">文字链接</Anchor>，然后是后面的文字。</p>
<hr />
<ul>
<li>无序列表项 1</li>
<li>无序列表项 2</li>
<li>无序列表项 3</li>
</ul>
<hr />
<ol>
<li>有序列表项 1</li>
<li>有序列表项 2</li>
<li>有序列表项 3</li>
</ol>
<hr />
<p>图片展示</p>
<p><ImageCaptioned alt="这里是图片标题，支持 和 加粗 文字" src="https://medium-zoom.francoischalifour.com/image-3.a41d7456.jpg">这里是图片标题，支持 <InlineMath data={"\\LaTeX"}></InlineMath> 和<strong>加粗</strong>文字</ImageCaptioned></p>
<p><ImageCaptioned alt="cat /data/flag" src="https://medium-zoom.francoischalifour.com/image-4.a4d08f7d.jpg"><code>cat /data/flag</code></ImageCaptioned></p>
<p><ImageCaptioned alt="空" src="https://s2.loli.net/2022/07/09/pTQyYHRSXjLCtFU.png"></ImageCaptioned></p>
<hr />
<blockquote>
<blockquote>
<blockquote>
<p>三级引用。Proident id dolore consectetur eu nulla anim sint magna veniam culpa mollit anim nostrud elit. Laboris ullamco nulla officia esse deserunt est aliqua. Ex deserunt mollit consectetur consequat duis deserunt et pariatur. Labore pariatur dolor ut excepteur amet ex fugiat amet tempor ullamco aute. Cupidatat non nulla ut laborum dolor nostrud quis quis.</p>
</blockquote>
<p>二级引用。Exercitation aliquip commodo voluptate sit nulla. Voluptate laborum commodo esse elit culpa velit. Occaecat consequat pariatur deserunt nulla reprehenderit eiusmod. Consequat nostrud labore do laborum anim duis laborum proident laboris elit. Enim culpa aliqua voluptate aliqua dolor esse nisi culpa consectetur anim minim sint nulla incididunt.</p>
</blockquote>
<p>一级引用。Et amet ea anim ut excepteur consequat amet dolore. Nulla incididunt do et minim do ea consequat aute dolore. Eiusmod exercitation proident aliqua et officia laborum occaecat reprehenderit exercitation ea ut fugiat pariatur. Anim do veniam ex pariatur proident quis id aute consequat incididunt excepteur quis tempor id.</p>
</blockquote>
<hr />
<blockquote>
<p>多个引用</p>
<p>多个引用</p>
<p>多个引用</p>
<p>Cupidatat consequat incididunt nostrud laborum incididunt in sunt aute. Elit consectetur consectetur qui fugiat incididunt laborum amet officia quis cupidatat amet ut ullamco. Esse sunt aliqua commodo qui laboris sint enim.</p>
</blockquote>
<hr />
<p>行内代码块 <code class="inline-code">#include&lt;iostream&gt;</code>。Mollit dolore est in et aliquip adipisicing et nulla id nulla esse laborum minim nulla. In ad irure qui magna Lorem ad eiusmod do do <code class="inline-code">laborum ex duis</code>. Reprehenderit nulla nisi laborum incididunt voluptate sunt et cupidatat commodo consectetur deserunt. Non officia aliquip enim duis. Ea irure magna excepteur labore eiusmod officia sit id sint anim ipsum duis labore Lorem. Culpa cillum <code class="inline-code">voluptate duis exercitation cillum esse incididunt laborum magna</code>. Est ut commodo non magna nisi sit proident deserunt consectetur ut anim ullamco ut adipisicing.</p>
<blockquote>
<p><code class="inline-code">scanf()</code> 用于输入数据，而 <code class="inline-code">printf()</code> 用于输出数据。</p>
</blockquote>
<hr />
<p>表格</p>
<table>
<thead>
<tr>
<th style="text-align:center">Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><code class="inline-code">%</code></td>
<td>Prints <code class="inline-code">%</code>.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">d</code></td>
<td>Decimal <code class="inline-code">signed int</code>.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">u</code></td>
<td>Decimal <code class="inline-code">unsigned int</code>.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">o</code></td>
<td>Octal <code class="inline-code">unsigned int</code>.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">x</code>, <code class="inline-code">X</code></td>
<td>Hexadecimal <code class="inline-code">unsigned int</code>. <code class="inline-code">x</code> for lower-case and <code class="inline-code">X</code> for upper-case.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">f</code></td>
<td>Float-point types in fixed-point notation.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">e</code>, <code class="inline-code">E</code></td>
<td>Float-point types in exponential notation: <code class="inline-code">d.ddde±dd</code>. <code class="inline-code">e</code> for lower-case “e” and <code class="inline-code">E</code> for upper-case.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">g</code>, <code class="inline-code">G</code></td>
<td>Float-point types in either fixed-point or exponential notation, whichever is more appropriate for its magnitude. <code class="inline-code">g</code> for lower-case and <code class="inline-code">G</code> for upper-case.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">a</code>, <code class="inline-code">A</code></td>
<td>Float-point in hexadecimal notation, starting with <code class="inline-code">0x</code> or <code class="inline-code">0X</code>. <code class="inline-code">a</code> for lower-case and <code class="inline-code">A</code> for upper-case.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">s</code></td>
<td><code class="inline-code">null</code>-terminated string.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">c</code></td>
<td><code class="inline-code">char</code>.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">p</code></td>
<td><code class="inline-code">void*</code> in an implementation-defined format.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">n</code></td>
<td>Print nothing, but writes the number of characters written so far into an integer pointer parameter.</td>
</tr>
</tbody>
</table>
<hr />
<p>代码块</p>
<BlockCode lang="c" html={"<code class=\"language-c\"><span class=\"token macro property\"><span class=\"token directive-hash\">#</span><span class=\"token directive keyword\">include</span> <span class=\"token string\">&lt;stdio.h></span></span>\n\n<span class=\"token keyword\">int</span> <span class=\"token function\">main</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span>\n<span class=\"token punctuation\">{</span>\n    <span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"Hello world\\n\"</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n    <span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"Nulla culpa ut laborum sint esse elit minim sit. Eiusmod et exercitation et laboris voluptate aute et veniam excepteur. Anim dolore culpa commodo adipisicing et aute. In est aliquip duis tempor cillum ullamco qui. Et officia cillum ex et dolor esse magna veniam. Dolor sint velit dolor commodo in. Irure excepteur adipisicing dolore ipsum velit ipsum nisi Lorem pariatur dolor excepteur dolor dolor.\\n\"</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n    <span class=\"token keyword\">return</span> <span class=\"token number\">0</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n</code>"}></BlockCode><BlockCode lang="plain" html={"<code>这个代码块不带语言标识\nlet a = 1;\n</code>"}></BlockCode></>