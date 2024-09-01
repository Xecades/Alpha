import Anchor from "@/components/md/Anchor.vue";
import BlockMath from "@/components/md/BlockMath.vue";
import InlineMath from "@/components/md/InlineMath.vue";
import ImageCaptioned from "@/components/md/ImageCaptioned.vue";
export default <><p>普通文字</p>
<hr />
<h2 id="t" tabindex="-1" class="heading">二级标题 <a class="cursor header-anchor" href="#t">¶</a></h2>
<h3 id="t-2" tabindex="-1" class="heading">三级标题 <a class="cursor header-anchor" href="#t-2">¶</a></h3>
<h4 id="t-3" tabindex="-1" class="heading">四级标题 <a class="cursor header-anchor" href="#t-3">¶</a></h4>
<h5 id="t-4" tabindex="-1" class="heading">五级标题 <a class="cursor header-anchor" href="#t-4">¶</a></h5>
<h6 id="t-5" tabindex="-1" class="heading">六级标题 <a class="cursor header-anchor" href="#t-5">¶</a></h6>
<hr />
<ul>
<li>[x] 选中</li>
<li>[ ] 未选中</li>
</ul>
<hr />
<p>Sunt ullamco esse esse sit aliquip aliquip ea laboris ea nulla. Quis eiusmod enim aliqua consectetur sit ea. Commodo anim enim sit qui nisi culpa labore fugiat nisi est nulla ad. Dolore dolor magna Lorem sunt dolor commodo eu ad aliquip officia officia incididunt deserunt. Adipisicing veniam aliquip incididunt et amet velit nulla quis magna culpa aliqua nulla. Lorem proident Lorem nostrud elit quis quis id duis incididunt reprehenderit.</p>
<p>Magna do ipsum incididunt nisi nisi do et consectetur excepteur amet. Irure qui aute incididunt velit consectetur nisi et sint elit dolor voluptate. Magna et non ullamco minim commodo amet culpa anim ea excepteur consequat pariatur laboris. Duis reprehenderit ipsum officia duis ut veniam. Ex deserunt labore velit minim laboris veniam magna velit exercitation ea minim. Velit amet veniam aute minim. Dolore occaecat officia minim dolor cupidatat ut sint.</p>
<p>Tempor voluptate aliquip consectetur excepteur culpa. Et dolor in adipisicing commodo ex magna dolore ut aliquip. Nulla nisi nulla commodo id proident sit proident dolor dolore ipsum ullamco. Fugiat Lorem est sunt excepteur Lorem officia labore. Ut et tempor in exercitation nostrud amet eiusmod.</p>
<p>Exercitation incididunt dolore cupidatat mollit veniam esse reprehenderit eiusmod cillum eu tempor dolor aliqua minim. Laboris voluptate consequat exercitation nisi ipsum. Cillum anim voluptate sunt est nostrud magna quis ad irure.</p>
<hr />
<p><em>斜体</em>、<strong>粗体</strong>、<strong><em>加粗斜体</em></strong>、<s>删除线</s></p>
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
<p><ImageCaptioned alt="这里是图片标题，支持 [公式] 和 加粗 文字" src="https://medium-zoom.francoischalifour.com/image-3.a41d7456.jpg">这里是图片标题，支持 <InlineMath data="%5CLaTeX"></InlineMath> 和<strong>加粗</strong>文字</ImageCaptioned></p>
<p><ImageCaptioned alt="cat /data/flag" src="https://medium-zoom.francoischalifour.com/image-4.a4d08f7d.jpg"><code>cat /data/flag</code></ImageCaptioned></p>
<p><ImageCaptioned alt="" src="https://s2.loli.net/2022/07/09/pTQyYHRSXjLCtFU.png"></ImageCaptioned></p>
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
<p>行内代码块 <code>#include&lt;iostream&gt;</code>。Mollit dolore est in et aliquip adipisicing et nulla id nulla esse laborum minim nulla. In ad irure qui magna Lorem ad eiusmod do do <code>laborum ex duis</code>. Reprehenderit nulla nisi laborum incididunt voluptate sunt et cupidatat commodo consectetur deserunt. Non officia aliquip enim duis. Ea irure magna excepteur labore eiusmod officia sit id sint anim ipsum duis labore Lorem. Culpa cillum <code>voluptate duis exercitation cillum esse incididunt laborum magna</code>. Est ut commodo non magna nisi sit proident deserunt consectetur ut anim ullamco ut adipisicing.</p>
<blockquote>
<p><code class="language-c"><span class="token function">scanf</span><span class="token punctuation">(</span><span class="token punctuation">)</span></code> 用于输入数据，而 <code class="language-c"><span class="token function">printf</span><span class="token punctuation">(</span><span class="token punctuation">)</span></code> 用于输出数据。</p>
</blockquote>
<hr />
<p>代码块</p>

<pre><code>这个代码块不带语言标识
let a = 1;
</code></pre>
</>