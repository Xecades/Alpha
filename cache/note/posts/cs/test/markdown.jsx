import anchor from "@/components/md/Anchor.vue";
import blockmath from "@/components/md/BlockMath.vue";
import blockcode from "@/components/md/BlockCode.vue";
import inlinemath from "@/components/md/InlineMath.vue";
import imagecaptioned from "@/components/md/ImageCaptioned.vue";
export default [
<p>普通文字</p>,
<hr />,
<h2 id="t" tabindex="-1" class="heading">二级标题 <a class="cursor header-anchor" href="#t">¶</a></h2>,
<h3 id="t-2" tabindex="-1" class="heading">三级标题 <a class="cursor header-anchor" href="#t-2">¶</a></h3>,
<h4 id="t-3" tabindex="-1" class="heading">四级标题 <a class="cursor header-anchor" href="#t-3">¶</a></h4>,
<h5 id="t-4" tabindex="-1" class="heading">五级标题 <a class="cursor header-anchor" href="#t-4">¶</a></h5>,
<h6 id="t-5" tabindex="-1" class="heading">六级标题 <a class="cursor header-anchor" href="#t-5">¶</a></h6>,
<hr />,
<ul class="task-list">
<li class="task-list-item"><input type="checkbox" id="cbx_0" checked="true" disabled="true" /><label for="cbx_0"> 选中</label></li>
<li class="task-list-item"><input type="checkbox" id="cbx_1" disabled="true" /><label for="cbx_1"> 未选中</label></li>
</ul>,
<hr />,
<p>Sunt ullamco esse esse sit aliquip aliquip ea laboris ea nulla. Quis eiusmod enim aliqua consectetur sit ea. Commodo anim enim sit qui nisi culpa labore fugiat nisi est nulla ad. Dolore dolor magna Lorem sunt dolor commodo eu ad aliquip officia officia incididunt deserunt. Adipisicing veniam aliquip incididunt et amet velit nulla quis magna culpa aliqua nulla. Lorem proident Lorem nostrud elit quis quis id duis incididunt reprehenderit.</p>,
<p>Magna do ipsum incididunt nisi nisi do et consectetur excepteur amet. Irure qui aute incididunt velit consectetur nisi et sint elit dolor voluptate. Magna et non ullamco minim commodo amet culpa anim ea excepteur consequat pariatur laboris. Duis reprehenderit ipsum officia duis ut veniam. Ex deserunt labore velit minim laboris veniam magna velit exercitation ea minim. Velit amet veniam aute minim. Dolore occaecat officia minim dolor cupidatat ut sint.</p>,
<p>Tempor voluptate aliquip consectetur excepteur culpa. Et dolor in adipisicing commodo ex magna dolore ut aliquip. Nulla nisi nulla commodo id proident sit proident dolor dolore ipsum ullamco. Fugiat Lorem est sunt excepteur Lorem officia labore. Ut et tempor in exercitation nostrud amet eiusmod.</p>,
<p>Exercitation incididunt dolore cupidatat mollit veniam esse reprehenderit eiusmod cillum eu tempor dolor aliqua minim. Laboris voluptate consequat exercitation nisi ipsum. Cillum anim voluptate sunt est nostrud magna quis ad irure.</p>,
<hr />,
<p><em>斜体</em>、<strong>粗体</strong>、<strong><em>加粗斜体</em></strong>、<s>删除线</s></p>,
<hr />,
<p>在一个段落中的<anchor href="https://www.baidu.com">文字链接</anchor>，然后是后面的文字。</p>,
<hr />,
<ul>
<li>无序列表项 1</li>
<li>无序列表项 2</li>
<li>无序列表项 3</li>
</ul>,
<hr />,
<ol>
<li>有序列表项 1</li>
<li>有序列表项 2</li>
<li>有序列表项 3</li>
</ol>,
<hr />,
<p>图片展示</p>,
<p><imagecaptioned alt="这里是图片标题，支持 [公式] 和 加粗 文字" src="https://medium-zoom.francoischalifour.com/image-3.a41d7456.jpg">这里是图片标题，支持 <inlinemath data="%5CLaTeX"></inlinemath> 和<strong>加粗</strong>文字</imagecaptioned></p>,
<p><imagecaptioned alt="cat /data/flag" src="https://medium-zoom.francoischalifour.com/image-4.a4d08f7d.jpg"><code>cat /data/flag</code></imagecaptioned></p>,
<p><imagecaptioned alt="空" src="https://s2.loli.net/2022/07/09/pTQyYHRSXjLCtFU.png"></imagecaptioned></p>,
<hr />,
<blockquote>
<blockquote>
<blockquote>
<p>三级引用。Proident id dolore consectetur eu nulla anim sint magna veniam culpa mollit anim nostrud elit. Laboris ullamco nulla officia esse deserunt est aliqua. Ex deserunt mollit consectetur consequat duis deserunt et pariatur. Labore pariatur dolor ut excepteur amet ex fugiat amet tempor ullamco aute. Cupidatat non nulla ut laborum dolor nostrud quis quis.</p>
</blockquote>
<p>二级引用。Exercitation aliquip commodo voluptate sit nulla. Voluptate laborum commodo esse elit culpa velit. Occaecat consequat pariatur deserunt nulla reprehenderit eiusmod. Consequat nostrud labore do laborum anim duis laborum proident laboris elit. Enim culpa aliqua voluptate aliqua dolor esse nisi culpa consectetur anim minim sint nulla incididunt.</p>
</blockquote>
<p>一级引用。Et amet ea anim ut excepteur consequat amet dolore. Nulla incididunt do et minim do ea consequat aute dolore. Eiusmod exercitation proident aliqua et officia laborum occaecat reprehenderit exercitation ea ut fugiat pariatur. Anim do veniam ex pariatur proident quis id aute consequat incididunt excepteur quis tempor id.</p>
</blockquote>,
<hr />,
<blockquote>
<p>多个引用</p>
<p>多个引用</p>
<p>多个引用</p>
<p>Cupidatat consequat incididunt nostrud laborum incididunt in sunt aute. Elit consectetur consectetur qui fugiat incididunt laborum amet officia quis cupidatat amet ut ullamco. Esse sunt aliqua commodo qui laboris sint enim.</p>
</blockquote>,
<hr />,
<p>行内代码块 <code class="inline-code">#include&lt;iostream&gt;</code>。Mollit dolore est in et aliquip adipisicing et nulla id nulla esse laborum minim nulla. In ad irure qui magna Lorem ad eiusmod do do <code class="inline-code">laborum ex duis</code>. Reprehenderit nulla nisi laborum incididunt voluptate sunt et cupidatat commodo consectetur deserunt. Non officia aliquip enim duis. Ea irure magna excepteur labore eiusmod officia sit id sint anim ipsum duis labore Lorem. Culpa cillum <code class="inline-code">voluptate duis exercitation cillum esse incididunt laborum magna</code>. Est ut commodo non magna nisi sit proident deserunt consectetur ut anim ullamco ut adipisicing.</p>,
<blockquote>
<p><code class="inline-code">scanf()</code> 用于输入数据，而 <code class="inline-code">printf()</code> 用于输出数据。</p>
</blockquote>,
<hr />,
<p>代码块</p>,
<blockcode lang="c" html="%3Ccode%20class%3D%22language-c%22%3E%3Cspan%20class%3D%22token%20macro%20property%22%3E%3Cspan%20class%3D%22token%20directive-hash%22%3E%23%3C%2Fspan%3E%3Cspan%20class%3D%22token%20directive%20keyword%22%3Einclude%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E%26lt%3Bstdio.h%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%0A%3Cspan%20class%3D%22token%20keyword%22%3Eint%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20function%22%3Emain%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20function%22%3Eprintf%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22Hello%20world%5Cn%22%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20function%22%3Eprintf%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20string%22%3E%22Nulla%20culpa%20ut%20laborum%20sint%20esse%20elit%20minim%20sit.%20Eiusmod%20et%20exercitation%20et%20laboris%20voluptate%20aute%20et%20veniam%20excepteur.%20Anim%20dolore%20culpa%20commodo%20adipisicing%20et%20aute.%20In%20est%20aliquip%20duis%20tempor%20cillum%20ullamco%20qui.%20Et%20officia%20cillum%20ex%20et%20dolor%20esse%20magna%20veniam.%20Dolor%20sint%20velit%20dolor%20commodo%20in.%20Irure%20excepteur%20adipisicing%20dolore%20ipsum%20velit%20ipsum%20nisi%20Lorem%20pariatur%20dolor%20excepteur%20dolor%20dolor.%5Cn%22%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20keyword%22%3Ereturn%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E0%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%0A%3C%2Fcode%3E"></blockcode>,
<blockcode lang="plain" html="%3Ccode%3E%E8%BF%99%E4%B8%AA%E4%BB%A3%E7%A0%81%E5%9D%97%E4%B8%8D%E5%B8%A6%E8%AF%AD%E8%A8%80%E6%A0%87%E8%AF%86%0Alet%20a%20%3D%201%3B%0A%3C%2Fcode%3E"></blockcode>,
];
