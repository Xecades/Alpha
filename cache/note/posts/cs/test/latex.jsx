import Anchor from "@/components/md/Anchor.vue";
import BlockMath from "@/components/md/BlockMath.vue";
import InlineMath from "@/components/md/InlineMath.vue";
export default <><p><strong>狄利克雷卷积</strong>（Dirichlet Convolution）在解析数论中是一个非常重要的工具.</p>
<p>使用狄利克雷卷积可以很方便地推出<strong>莫比乌斯反演</strong>（Möbius Inversion）相关重要函数和公式，它在信息学竞赛和解析数论中至关重要.</p>
<p>很多初学者不能真正地理解莫比乌斯反演，或者说即使能使用最终的公式，也难以理清楚它是怎么推导的.</p>
<p>本文中，我将尝试使用一种新的方式讲解狄利克雷卷积和莫比乌斯反演，希望能对大家有所帮助.</p>
<hr />
<blockquote>
<p>文中的引语（浅色文字）是可选内容，为正文的补充或提示. 阅读时，你可以选择跳过这部分文字，而不会影响内容连贯性.</p>
</blockquote>
<hr />
<h2 id="t" tabindex="-1" class="heading">什么是狄利克雷卷积 <a class="cursor header-anchor" href="#t">¶</a></h2>
<p>狄利克雷卷积是定义在<strong>数论函数</strong>间的二元运算.</p>
<blockquote>
<p>所谓<strong>数论函数</strong>，是指定义域为 <InlineMath data={"\\mathbb{N}"}></InlineMath>（<strong>自然数</strong>），值域为 <InlineMath data={"\\mathbb{C}"}></InlineMath>（<strong>复数</strong>） 的一类函数，每个数论函数可以视为复数的序列.</p>
</blockquote>
<p>它最常见的定义式为：</p>
<BlockMath data={"\\boxed{\\Bigl(f*g\\Bigr)(n):=\\sum_{d\\mid n}f(d)g\\biggl(\\dfrac{n}{d}\\biggr)\\quad(d\\in\\mathbb{N})}\n"}></BlockMath><blockquote>
<p>这里提醒一个很明显的事实：在这个定义式中，右式的函数 <InlineMath data={"f"}></InlineMath> 和 <InlineMath data={"g"}></InlineMath> 括号中的参数是可以调换的，即：</p>
<BlockMath data={"\\Bigl(f*g\\Bigr)(n):=\\sum_{d\\mid n}f\\biggl(\\dfrac{n}{d}\\biggr)g(d)\\quad(d\\in\\mathbb{N})\n"}></BlockMath></blockquote>
<p>如果我们比较关注式子的对称性，下面有狄利克雷卷积的另一个定义式：</p>
<BlockMath data={"\\boxed{\\Bigl(f*g\\Bigr)(n):=\\sum_{xy=n}f(x)g(y)\\quad(x,y\\in\\mathbb{N})}\n"}></BlockMath><p>下面举一个例子，以方便理解：</p>
<BlockMath data={"\\begin{aligned}\n&\\Bigl(f*g\\Bigr)(6) \\\\\n=&\\sum_{d\\mid 6}f(d)g\\biggl(\\dfrac{6}{d}\\biggr) \\\\\n=&f(1)g(6)+f(2)g(3)+f(3)g(2)+f(6)g(1)\n\\end{aligned}"}></BlockMath><p>在后面的文章中我们会反复应用这两个定义式.</p>
<blockquote>
<p><strong>为什么叫“狄利克雷卷积”呢？</strong></p>
<p>首先，<strong>狄利克雷</strong>（Gustav Lejeune Dirichlet）是 19 世纪德国的数学家，他是解析数论的创立者，是解析数论很多重要理论的提出者. 至于“卷”，可以理解为在二维平面上延伸的两个数论函数（一个沿 x 轴，一个沿 y 轴）像卷毛巾一样交叉结合起来. “积”这个字在定义式中的星号 <InlineMath data={"*"}></InlineMath> 体现出来了，如果定义普通函数加法为数论函数间的“加”运算，那么这里的狄利克雷卷积就是数论函数的“乘”运算，这一点我会在后文再次提到.</p>
</blockquote>
<hr />
<h2 id="t-2" tabindex="-1" class="heading">本文要用到的数论函数 <a class="cursor header-anchor" href="#t-2">¶</a></h2>
<p>还记得到吗？数论函数都是 <InlineMath data={"f: \\mathbb{N}\\rightarrow\\mathbb{C}"}></InlineMath> 类型的. 下面我来列举一些常用的数论函数.</p>
<blockquote>
<p>初看时你可能会觉得这些定义没有什么用，但它们在狄利克雷卷积中大多是作为记号存在的.</p>
</blockquote>
<h3 id="t-3" tabindex="-1" class="heading"><strong>单位函数</strong> <InlineMath data={"\\varepsilon(n)"}></InlineMath> <a class="cursor header-anchor" href="#t-3">¶</a></h3>
<BlockMath data={"\\boxed{\\varepsilon(n):=\\begin{cases}\n1, & n=1, \\\\\n0, & \\mathrm{otherwise}.\n\\end{cases}}"}></BlockMath><hr />
<h3 id="t-4" tabindex="-1" class="heading"><strong>幂函数</strong> <InlineMath data={"\\mathrm{Id}_k(n)"}></InlineMath> <a class="cursor header-anchor" href="#t-4">¶</a></h3>
<BlockMath data={"\\boxed{\\mathrm{Id}_k(n):=n^k}\n"}></BlockMath><p>特别地，有：</p>
<ul>
<li>当 <InlineMath data={"k=1"}></InlineMath> 时，为<strong>恒等函数</strong> <InlineMath data={"\\mathrm{Id}(n)"}></InlineMath>，即 <InlineMath data={"\\boxed{\\mathrm{Id}(n):=n}"}></InlineMath>.</li>
<li>当 <InlineMath data={"k=0"}></InlineMath> 时，为<strong>常数函数</strong> <InlineMath data={"\\mathbf{1}(n)"}></InlineMath>，即 <InlineMath data={"\\boxed{\\mathbf{1}(n):=1}"}></InlineMath>.</li>
</ul>
<blockquote>
<p>这里的常数函数 <InlineMath data={"\\mathbf{1}(n)"}></InlineMath> 的函数名是<strong>加粗了</strong>的数字 <InlineMath data={"1"}></InlineMath>，不要和 <InlineMath data={"1"}></InlineMath> 弄混了.
在某些场合，有人会用大写字母 <InlineMath data={"I"}></InlineMath> 来代替 <InlineMath data={"\\mathbf{1}"}></InlineMath>，以防混淆，这里还是使用 <InlineMath data={"\\mathbf{1}"}></InlineMath>.</p>
</blockquote>
<hr />
<h3 id="t-5" tabindex="-1" class="heading"><strong>除数函数</strong> <InlineMath data={"\\sigma_k(n)"}></InlineMath> <a class="cursor header-anchor" href="#t-5">¶</a></h3>
<p>直观上理解，除数函数就是其所有因数的 <InlineMath data={"k"}></InlineMath> 次方之和.</p>
<BlockMath data={"\\boxed{\\sigma_k(n):=\\sum_{d\\mid n}d^k\\quad (d\\in\\mathbb{N})}\n"}></BlockMath><p>特别地，有：</p>
<ul>
<li>当 <InlineMath data={"k=1"}></InlineMath> 时，为<strong>因数函数</strong> <InlineMath data={"\\sigma(n)"}></InlineMath>，即 <InlineMath data={"\\boxed{\\sigma(n):=\\sum\\limits_{d\\mid n}d}"}></InlineMath>.</li>
<li>当 <InlineMath data={"k=0"}></InlineMath> 时，为<strong>个数函数</strong> <InlineMath data={"d(n)"}></InlineMath>，即 <InlineMath data={"\\boxed{\\mathrm{d}(n):=\\sum\\limits_{d\\mid n}1}"}></InlineMath>.</li>
</ul>
<blockquote>
<p>从“因数函数”和“个数函数”这两个名字就可以看出来，<InlineMath data={"\\sigma(n)"}></InlineMath> 表示 <InlineMath data={"n"}></InlineMath> 的因数之和，<InlineMath data={"\\mathrm{d}(n)"}></InlineMath> 表示 <InlineMath data={"n"}></InlineMath> 的因数个数. 例如，<InlineMath data={"\\sigma(10)=1+2+5+10=18"}></InlineMath>，<InlineMath data={"\\mathrm{d}(10)=1+1+1+1=4"}></InlineMath>.</p>
</blockquote>
<p>对于因数函数和个数函数，设 <InlineMath data={"n=p_1^{c_1}p_2^{c_2}\\dots p_m^{c_m}"}></InlineMath>，其中 <InlineMath data={"c_i\\in\\mathbb{N}^*,p_i\\in\\mathbb{P}"}></InlineMath>，可以得到这两个计算式（不是重点，证明从略）：</p>
<BlockMath data={"\\begin{aligned}\n\\sigma(n)=&(1+p_1+\\cdots+p_1^{c_1})\\times\\cdots\\times(1+p_m+\\cdots+p_m^{c_m})=\\prod^m_{i=1}\\biggl[\\sum^{c_i}_{j=0}(p_i^j)\\biggr],\\\\\n\\mathrm{d}(n)=&(c_1+1)\\times(c_2+1)\\times\\cdots\\times(c_m+1)=\\prod_{i=1}^{m}(c_i+1).\n\\end{aligned}"}></BlockMath><hr />
<h3 id="t-6" tabindex="-1" class="heading"><strong>欧拉函数</strong> <InlineMath data={"\\varphi(n)"}></InlineMath> <a class="cursor header-anchor" href="#t-6">¶</a></h3>
<p>欧拉函数博大精深，这里只介绍一些内容.</p>
<p><InlineMath data={"\\varphi(n)"}></InlineMath> 表示小于 <InlineMath data={"n"}></InlineMath> 的正整数中与 <InlineMath data={"n"}></InlineMath> 互质的数的个数.</p>
<p>可以不难推知（证明从略）：</p>
<BlockMath data={"\\boxed{\\varphi(n):=n\\prod_{p\\mid n}\\biggl(1-\\dfrac{1}{p}\\biggr)\\quad(p\\in\\mathbb{P})}\n"}></BlockMath><hr />
<p>总共（提及的）有：<strong>单位函数</strong> <InlineMath data={"\\varepsilon"}></InlineMath>、<strong>幂函数</strong> <InlineMath data={"\\mathrm{Id}_k"}></InlineMath>（含<strong>恒等函数</strong> <InlineMath data={"\\mathrm{Id}"}></InlineMath> 和<strong>常数函数</strong> <InlineMath data={"\\mathbf{1}"}></InlineMath>）、<strong>除数函数</strong> <InlineMath data={"\\sigma_k"}></InlineMath>（含<strong>因数函数</strong> <InlineMath data={"\\sigma"}></InlineMath> 和<strong>个数函数</strong> <InlineMath data={"\\mathrm{d}"}></InlineMath>）、<strong>欧拉函数</strong> <InlineMath data={"\\varphi"}></InlineMath>.</p>
<p>上面提到的<strong>所有</strong>函数都是<strong>积性函数</strong>，其中<strong>单位函数</strong>和<strong>幂函数</strong>是<strong>完全积性函数</strong>（证明从略）.</p>
<blockquote>
<p><strong>积性函数</strong>是指对<strong>所有互质的整数</strong> <InlineMath data={"a"}></InlineMath> 和 <InlineMath data={"b"}></InlineMath> 都有 <InlineMath data={"f(ab)=f(a)f(b)"}></InlineMath> 的数论函数.
<strong>完全积性函数</strong>是指对<strong>所有整数</strong> <InlineMath data={"a"}></InlineMath> 和 <InlineMath data={"b"}></InlineMath> 都有 <InlineMath data={"f(ab)=f(a)f(b)"}></InlineMath> 的数论函数.</p>
<p>在 <InlineMath data={"f(ab)=f(a)f(b)"}></InlineMath> 式中令 <InlineMath data={"a = 1"}></InlineMath>，得到 <InlineMath data={"f(1)=1"}></InlineMath>，这也是积性函数一重要特点.</p>
</blockquote>
<hr />
<h2 id="t-7" tabindex="-1" class="heading">狄利克雷卷积相关定理 <a class="cursor header-anchor" href="#t-7">¶</a></h2>
<p>读者不妨先不看证明，自己试着证一下.</p>
<hr />
<p><strong>[1] 若 <InlineMath data={"f"}></InlineMath>，<InlineMath data={"g"}></InlineMath> 为积性函数，则 <InlineMath data={"f\\ast g"}></InlineMath> 也是积性函数.</strong></p>
<p>设 <InlineMath data={"(a,b)=1"}></InlineMath>（即 <InlineMath data={"a"}></InlineMath> 和 <InlineMath data={"b"}></InlineMath> 互质）则：</p>
<BlockMath data={"\\begin{aligned}\n&\\Bigl(f*g\\Bigr)(a)\\cdot\\Bigl(f*g\\Bigr)(b) \\\\\n=& \\sum_{d_1\\mid a}f(d_1)g\\biggl(\\dfrac{a}{d_1}\\biggr)\\cdot\\sum_{d_2\\mid b}f(d_2)g\\biggl(\\dfrac{b}{d_2}\\biggr) \\\\\n=& \\sum_{d_1\\mid a}\\sum_{d_2\\mid b}f(d_1)g\\biggl(\\dfrac{a}{d_1}\\biggr)\\cdot f(d_2)g\\biggl(\\dfrac{b}{d_2}\\biggr) \\\\\n=& \\sum_{d_1d_2\\mid ab}f(d_1d_2)g\\biggl(\\dfrac{ab}{d_1d_2}\\biggr) \\\\\n=& \\sum_{d\\mid ab}f(d)g\\biggl(\\dfrac{ab}{d}\\biggr) \\\\\n=& \\Bigl(f*g\\Bigr)(ab)\n\\end{aligned}"}></BlockMath><p>在将 <InlineMath data={"\\large\\sum\\limits_{d_1\\mid a}\\sum\\limits_{d_2\\mid b}"}></InlineMath> 合并成 <InlineMath data={"\\large\\sum\\limits_{d_1d_2\\mid ab}"}></InlineMath> 的操作中，用到了由 <InlineMath data={"a"}></InlineMath>、<InlineMath data={"b"}></InlineMath> 互质推导出来的结论：<InlineMath data={"ab"}></InlineMath> 的因数唯一表示为 <InlineMath data={"a"}></InlineMath> 的因数与 <InlineMath data={"b"}></InlineMath> 的因数的乘积，因此 <InlineMath data={"d_1\\mid a,\\;d_2\\mid b"}></InlineMath> 和 <InlineMath data={"d_1d_2\\mid ab"}></InlineMath> 是完全等价的.</p>
<hr />
<p><strong>[2] 狄利克雷卷积满足交换律，即 <InlineMath data={"f\\ast g=g\\ast f"}></InlineMath>.</strong></p>
<BlockMath data={"\\begin{aligned}\n&\\Bigl(f*g\\Bigr)(n) \\\\\n=& \\sum_{xy=n}f(x)g(y) \\\\\n=& \\sum_{yx=n}g(x)f(y)\\quad(\\ast) \\\\\n=&\\Bigl(g*f\\Bigr)(n)\n\\end{aligned}"}></BlockMath><p>在 <InlineMath data={"(\\ast)"}></InlineMath> 中，我将 <InlineMath data={"x"}></InlineMath> 和 <InlineMath data={"y"}></InlineMath> 换了个位置（也就是 <InlineMath data={"x"}></InlineMath> 写成 <InlineMath data={"y"}></InlineMath>，<InlineMath data={"y"}></InlineMath> 写成 <InlineMath data={"x"}></InlineMath>. 实际上这不是必须的），然后把 <InlineMath data={"g"}></InlineMath> 挪到了 <InlineMath data={"f"}></InlineMath> 的前面.</p>
<p>这里我用的是第二个定义式，它的优点是对称性好，用来证明交换律很直观.</p>
<hr />
<p><strong>[3] 狄利克雷卷积满足结合律，即 <InlineMath data={"(f\\ast g)\\ast h=f\\ast(g\\ast h)"}></InlineMath>.</strong></p>
<BlockMath data={"\\begin{aligned}\n&\\Bigl((f\\ast g)\\ast h\\Bigr)(n) \\\\\n=& \\sum_{xy=n}\\Bigl(f*g\\Bigr)(x)h(y) \\\\\n=& \\sum_{xy=n}\\biggl(\\sum_{zw=x}f(z)g(w)\\biggr)h(y) \\\\\n=& \\sum_{xy=n}\\sum_{zw=x}f(z)g(w)h(y) \\\\\n=& \\sum_{zwy=n}f(z)g(w)h(y) \\\\\n=& \\sum_{abc=n}f(a)g(b)h(c) \\\\\n\\end{aligned}"}></BlockMath><p>从 <InlineMath data={"f\\ast(g\\ast h)"}></InlineMath> 开始，类似地也可以得到 <InlineMath data={"\\large\\sum\\limits_{abc=n}\\normalsize f(a)g(b)h(c)"}></InlineMath>，因此它们相等，结合律成立.</p>
<hr />
<p><strong>[4] 狄利克雷卷积满足分配律，即 <InlineMath data={"f\\ast(g+h)=f\\ast g+f\\ast h"}></InlineMath>.</strong></p>
<BlockMath data={"\\begin{aligned}\n&\\Bigl(f\\ast(g+h)\\Bigr)(n) \\\\\n=& \\sum_{xy=n}f(x)\\Bigl(g+h\\Bigr)(y) \\\\\n=& \\sum_{xy=n}f(x)[g(y)+h(y)] \\\\\n=& \\sum_{xy=n}f(x)g(y)+f(x)h(y) \\\\\n=& \\sum_{xy=n}f(x)g(y)+\\sum_{xy=n}f(x)h(y) \\\\\n=& \\Bigl(f\\ast g+f\\ast h\\Bigr)(n)\n\\end{aligned}"}></BlockMath><hr />
<p>这里总结一下我们证了的式子：</p>
<ol>
<li>若 <InlineMath data={"f"}></InlineMath>，<InlineMath data={"g"}></InlineMath> 为积性函数，则 <InlineMath data={"f\\ast g"}></InlineMath> 也是积性函数.</li>
<li>狄利克雷卷积满足<strong>交换律</strong>，即 <InlineMath data={"f\\ast g=g\\ast f"}></InlineMath>.</li>
<li>狄利克雷卷积满足<strong>结合律</strong>，即 <InlineMath data={"(f\\ast g)\\ast h=f\\ast(g\\ast h)"}></InlineMath>.</li>
<li>狄利克雷卷积满足<strong>分配律</strong>，即 <InlineMath data={"f\\ast(g+h)=f\\ast g+f\\ast h"}></InlineMath>.</li>
</ol>
<p>这些结论十分重要，后文中我可能会在不说明的情况下直接使用这些结论.</p>
<blockquote>
<p><strong>为什么是“积”？</strong></p>
<p>现在我们可以得出原因了，狄利克雷卷积满足<strong>交换律</strong>、<strong>结合律</strong>和<strong>分配律</strong>，其运算法则和普通算数乘法完全类似（在小学的时候我们就已经学过乘法的三定律了）. 实际上，狄利克雷卷积和普通函数加法可以构成一个<strong>阿贝尔环</strong>，你甚至可以在它的基础上构建以函数为自变量的多项式，并解它的根.</p>
</blockquote>
<hr />
<h2 id="t-8" tabindex="-1" class="heading">一些特殊的卷积 <a class="cursor header-anchor" href="#t-8">¶</a></h2>
<p>看到这里，前文提到的数论函数才能真正地起作用.</p>
<hr />
<p><strong>[1] <InlineMath data={"\\mathrm{Id}_k\\ast\\mathbf{1}=\\sigma_k"}></InlineMath></strong></p>
<BlockMath data={"\\begin{aligned}\n\\Bigl(\\mathrm{Id}_k*\\mathbf{1}\\Bigr)(n) =& \\sum_{d\\mid n}\\mathrm{Id}_k(d)\\mathbf{1}\\biggl(\\dfrac{n}{d}\\biggr) \\\\\n=& \\sum_{d\\mid n}\\mathrm{Id}_k(d) \\\\\n=& \\sum_{d\\mid n}d^k \\\\\n=& \\sigma_k(n) \\\\\n\\end{aligned}"}></BlockMath><p>在证明的过程中，我们发现：如果一个函数和 <InlineMath data={"\\mathbf{1}"}></InlineMath> 作狄利克雷卷积，就相当于把其参数的所有因子枚举出来并代入原函数，然后求和. 也就是说：</p>
<BlockMath data={"\\Bigl(f*\\mathbf{1}\\Bigr)(n)=\\sum_{d\\mid n}f(d)\n"}></BlockMath><p>无论是正向操作还是反向操作，这个式子都很重要.</p>
<hr />
<p><strong>[2] <InlineMath data={"\\varphi\\ast\\mathbf{1}=\\mathrm{Id}"}></InlineMath></strong></p>
<blockquote>
<p>再提醒一下，<InlineMath data={"\\varphi(n)"}></InlineMath> 的定义是这样的：</p>
<BlockMath data={"\\varphi(n):=n\\prod_{p\\mid n}\\biggl(1-\\dfrac{1}{p}\\biggr)\\quad(p\\in\\mathbb{P})\n"}></BlockMath></blockquote>
<p>首先有：</p>
<BlockMath data={"\\Bigl(\\varphi\\ast\\mathbf{1}\\Bigr)(n)=\\sum_{d\\mid n}\\varphi(d)\n"}></BlockMath><p>尝试对 <InlineMath data={"n"}></InlineMath> 进行拆分，当 <InlineMath data={"n=p^m\\;(p\\in\\mathbb{P})"}></InlineMath> 时，有：</p>
<BlockMath data={"\\begin{aligned}\n\\sum_{d\\mid n}\\varphi(d) =& \\varphi(1)+\\sum_{d=1}^{m}\\varphi(p^d) \\\\\n=& 1+\\sum_{d=1}^{m}p^d\\biggl(1-\\dfrac{1}{p}\\biggr) \\\\\n=& 1+\\sum_{d=1}^{m}(p^d-p^{d-1}) \\\\\n=& p^m \\\\\n=& n\n\\end{aligned}"}></BlockMath><p>考虑更普遍的情况，当 <InlineMath data={"n"}></InlineMath> 为任意正整数，分解 <InlineMath data={"n=\\prod p^m"}></InlineMath>，因为 <InlineMath data={"\\varphi*\\mathbf{1}"}></InlineMath> 是积性函数，所以：</p>
<BlockMath data={"\\begin{aligned}\n\\Bigl(\\varphi*\\mathbf{1}\\Bigr)(n) =& \\Bigl(\\varphi*\\mathbf{1}\\Bigr)\\biggl(\\prod p^m\\biggr)\\\\\n=& \\prod\\Bigl(\\varphi*\\mathbf{1}\\Bigr)({p_i}^{m_i}) \\\\\n=& \\prod p^m \\\\\n=& n\n\\end{aligned}"}></BlockMath><p>综上，<InlineMath data={"\\varphi*\\mathbf{1}=\\mathrm{Id}"}></InlineMath>.</p>
<hr />
<p><strong>[3] <InlineMath data={"\\mathbf{1}\\ast\\mathbf{1}=\\mathrm{d}"}></InlineMath></strong></p>
<p>这个证明相对更简单.</p>
<BlockMath data={"\\begin{aligned}\n\\Bigl(\\mathbf{1}*\\mathbf{1}\\Bigr)(n) =& \\sum_{d\\mid n}\\mathbf{1}(d)\\mathbf{1}\\biggl(\\dfrac{n}{d}\\biggr) \\\\\n=& \\sum_{d\\mid n}1 \\\\\n=& \\mathrm{d}(n) \\\\\n\\end{aligned}"}></BlockMath><hr />
<p>上面我们只列举出了三个常用的狄利克雷卷积结果，分别是：</p>
<ol>
<li><InlineMath data={"\\mathrm{Id}_k*\\mathbf{1}=\\sigma_k"}></InlineMath>;</li>
<li><InlineMath data={"\\varphi*\\mathbf{1}=\\mathrm{Id}"}></InlineMath>;</li>
<li><InlineMath data={"\\mathbf{1}*\\mathbf{1}=\\mathrm{d}"}></InlineMath>.</li>
</ol>
<p>实际上，通过这几个运算我们可以得到更多的运算，例如：</p>
<BlockMath data={"\\sigma=\\mathrm{Id}*\\mathbf{1}=\\varphi*\\mathbf{1}*\\mathbf{1}=\\varphi*\\mathrm{d}\n"}></BlockMath><hr />
<h2 id="t-9" tabindex="-1" class="heading">单位元 <a class="cursor header-anchor" href="#t-9">¶</a></h2>
<blockquote>
<p>乘法的<strong>单位元</strong>是指乘上它后值不改变的数（对狄利克雷卷积来说，是“函数”）. 例如，普通乘法的单位元是数字 <InlineMath data={"1"}></InlineMath>，因为 <InlineMath data={"n\\times1=n"}></InlineMath>. 因此，在狄利克雷卷积中，它的单位元 <InlineMath data={"\\tau(n)"}></InlineMath> 就应该满足 <InlineMath data={"f*\\tau=f"}></InlineMath>.</p>
</blockquote>
<p>我们注意到这样一个事实：</p>
<BlockMath data={"\\Bigl(f*\\varepsilon\\Bigr)(n)=\\sum_{d\\mid n}\\varepsilon(d)f\\biggl(\\dfrac{n}{d}\\biggr)=f(n)\n"}></BlockMath><p>因此，狄利克雷卷积的单位元就是<strong>单位函数</strong> <InlineMath data={"\\varepsilon(n)"}></InlineMath>，它在狄利克雷卷积中的作用和 1 在普通乘法中的作用是类似的. 任何函数（<strong>包括 <InlineMath data={"\\varepsilon"}></InlineMath></strong>）和 <InlineMath data={"\\varepsilon"}></InlineMath> 进行狄利克雷卷积，都得到该函数本身.</p>
<blockquote>
<p>还记得到吗？<InlineMath data={"\\varepsilon(n)"}></InlineMath> 的定义是这样的：</p>
<BlockMath data={"\\varepsilon(n):=\\begin{cases}\n1, & n=1, \\\\\n0, & \\mathrm{otherwise}.\n\\end{cases}"}></BlockMath></blockquote>
<hr />
<h2 id="t-10" tabindex="-1" class="heading">狄利克雷逆（Dirichlet Inverse） <a class="cursor header-anchor" href="#t-10">¶</a></h2>
<blockquote>
<p>我们可以把这里的“<strong>逆</strong>”和“<strong>逆元</strong>”作类比. 例如，在普通运算中，一个数的“逆元”就是这个数的倒数；在同余运算中，一个数的“逆元”在同个模的意义下，能使得它与这个数相乘的结果与 <InlineMath data={"1"}></InlineMath> 同余. 分别而言，如果我们规定 <InlineMath data={"n"}></InlineMath> 的逆元是 <InlineMath data={"n^{-1}"}></InlineMath>（这个符号是作为整体引入的，<strong>大多数情况下不能简单地理解为 <InlineMath data={"\\dfrac{1}{n}"}></InlineMath></strong>），那么就有这样两个式子：</p>
<BlockMath data={"\\begin{aligned}\n\\text{普通运算中：}& n\\times n^{-1}=1,\\\\\n\\text{同余运算中：}& n\\times n^{-1}\\equiv1\\;(\\mathrm{mod}\\; r).\n\\end{aligned}"}></BlockMath><p>数字 <InlineMath data={"1"}></InlineMath> 是两种运算中的单位元，所以说，逆元在类似乘法的运算中起着“倒数”的地位.</p>
</blockquote>
<p>在狄利克雷卷积中，单位元是 <InlineMath data={"\\varepsilon"}></InlineMath>，我们定义狄利克雷逆如下：</p>
<BlockMath data={"\\boxed{f*f^{-1}=\\varepsilon}\n"}></BlockMath><p>函数 <InlineMath data={"f^{-1}"}></InlineMath> 就被称为 <InlineMath data={"f"}></InlineMath> 的<strong>狄利克雷逆</strong>.</p>
<hr />
<p>对于狄利克雷逆公式的推导，可以使用<strong>合情推理</strong>的方法（列出 <InlineMath data={"n=1,2,3\\cdots"}></InlineMath>，然后找规律），得到狄利克雷逆的计算式：</p>
<BlockMath data={"\\boxed{f^{-1}(n):=\\begin{cases}\n\\dfrac{1}{f(1)},&n=1, \\\\\n-\\dfrac{1}{f(1)}\\large\\sum\\limits_{d\\mid n,\\;d\\neq n}\\normalsize f\\biggl(\\dfrac{n}{d}\\biggr)f^{-1}(d),&\\mathrm{otherwise}.\n\\end{cases}}"}></BlockMath><p>这个式子我们不推导，仅证明它是成立的:</p>
<p>当 <InlineMath data={"n=1"}></InlineMath> 时，<InlineMath data={"\\Bigl(f*f^{-1}\\Bigr)(1)=\\large\\sum\\limits_{d\\mid1}\\normalsize f(d)f^{-1}\\biggl(\\dfrac{1}{d}\\biggr)=f(1)f^{-1}(1)=1"}></InlineMath>.</p>
<p>当 <InlineMath data={"n\\neq1"}></InlineMath> 时，</p>
<BlockMath data={"\\begin{aligned}\n&\\Bigl(f*f^{-1}\\Bigr)(n) \\\\\n&= \\sum_{d\\mid n}f\\biggl(\\dfrac{n}{d}\\biggr)f^{-1}(d) \\\\\n&= f(1)f^{-1}(n)+\\sum_{d\\mid n,\\;d\\neq n}f\\biggl(\\dfrac{n}{d}\\biggr)f^{-1}(d) \\\\\n&= -\\dfrac{f(1)}{f(1)}\\sum_{d\\mid n,\\;d\\neq n}f\\biggl(\\dfrac{n}{d}\\biggr)f^{-1}(d)+\\sum_{d\\mid n,\\;d\\neq n}f\\biggl(\\dfrac{n}{d}\\biggr)f^{-1}(d) \\\\\n&= 0.\n\\end{aligned}"}></BlockMath><p>也就是说，<InlineMath data={"f*f^{-1}=\\varepsilon"}></InlineMath>. 因此这个计算式是成立的.</p>
<hr />
<p>值得注意的是，狄利克雷逆的计算式中包含了自身，也就是说它是个<strong>递归形式的定义</strong>. 若将其展开，则过于复杂，（一般）没有实际意义.</p>
<p>一个数论函数 <InlineMath data={"f(n)"}></InlineMath> 存在狄利克雷逆的<strong>充要条件</strong>是 <InlineMath data={"f(1)\\neq0"}></InlineMath>，在狄利克雷逆的推导过程中，我们知道 <strong><InlineMath data={"f(n)"}></InlineMath> 的逆是唯一的</strong>.</p>
<p>需要指出，<strong>积性函数一定有狄利克雷逆，且它也是积性函数</strong>，该证明从略（请参见芝加哥大学 Mark Schachner 的 <Anchor href="http://math.uchicago.edu/~may/REU2018/REUPapers/Schachner.pdf">Paper</Anchor>）.</p>
<p>当 <InlineMath data={"f(1)\\neq0"}></InlineMath> 且 <InlineMath data={"g(1)\\neq0"}></InlineMath> 时，有 <InlineMath data={"\\boxed{(f\\ast g)^{-1}=f^{-1}*g^{-1}}"}></InlineMath>，证明如下：</p>
<BlockMath data={"\\begin{aligned}\n&(f*g)^{-1}*(f*g) \\\\\n&=\\varepsilon \\\\\n&=(f^{-1}*f)*(g^{-1}*g) \\\\\n&=(f^{-1}*g^{-1})*(f*g)\n\\end{aligned}"}></BlockMath><p>由狄利克雷逆的唯一性，<InlineMath data={"f\\ast g"}></InlineMath> 的狄利克雷逆是唯一的，所以 <InlineMath data={"(f\\ast g)^{-1}=f^{-1}*g^{-1}"}></InlineMath>.</p>
<hr />
<h2 id="t-11" tabindex="-1" class="heading">莫比乌斯反演 <a class="cursor header-anchor" href="#t-11">¶</a></h2>
<p>说了这么多，终于到莫比乌斯反演了. 了解了狄利克雷卷积和狄利克雷逆，莫比乌斯反演就不在话下了.</p>
<p>我们定义单位函数 <InlineMath data={"\\mathbf{1}(n)"}></InlineMath> 的狄利克雷逆为<strong>莫比乌斯函数 <InlineMath data={"\\mu(n)"}></InlineMath></strong>（或译作“默比乌斯函数”）：</p>
<BlockMath data={"\\boxed{\\mu:=\\mathbf{1}^{-1}}\n"}></BlockMath><p>上面这个式子就是莫比乌斯函数的狄利克雷逆定义式，如果用普通写法，莫比乌斯函数的普通定义式为：</p>
<BlockMath data={"\\boxed{\\mu(n):=\\begin{cases}\n1 &n=1 \\\\\n(-1)^m &n=p_1p_2\\dots p_m,\\;p_i\\in\\mathbb{P} \\\\\n0 &\\mathrm{otherwise}\n\\end{cases}}"}></BlockMath><p>其证明请参见 Mark Schachner 的 <Anchor href="http://math.uchicago.edu/~may/REU2018/REUPapers/Schachner.pdf">Paper</Anchor> 中的 Theorem 4.3.</p>
<blockquote>
<p>互联网上不少介绍莫比乌斯反演的文章只给第二种定义，是因为莫比乌斯反演的讲解可以绕过狄利克雷卷积独立进行，但这样做会让一些读者不明白为什么这样定义，平添了许多麻烦. 我认为，在理解狄利克雷卷积的基础上谈论莫比乌斯反演是事半功倍的.</p>
</blockquote>
<p>使用狄利克雷卷积来推导莫比乌斯反演公式就易如反掌了：</p>
<BlockMath data={"\\boxed{g=f*\\mathbf{1}\\Leftrightarrow f=g*\\mu}\\quad(*)\n"}></BlockMath><p>将其展开，也就是：</p>
<BlockMath data={"\\boxed{g(n)=\\sum_{d\\mid n}f(d)\\Leftrightarrow f(n)=\\sum_{d\\mid n}\\mu(d)g\\biggl(\\dfrac{n}{d}\\biggr)}\n"}></BlockMath><p>莫比乌斯反演公式的证明十分简单，在 <InlineMath data={"(*)"}></InlineMath> 式的左式中同时卷积 <InlineMath data={"\\mu"}></InlineMath> 即可.</p>
<hr />
<h2 id="t-12" tabindex="-1" class="heading">参考文献 <a class="cursor header-anchor" href="#t-12">¶</a></h2>
<ol>
<li><Anchor href="http://math.uchicago.edu/~may/REU2018/REUPapers/Schachner.pdf">芝加哥大学 Mark Schachner 的论文：<em>Algebraic and Analytic Properties of Arithmetic Functions</em></Anchor>;</li>
<li><Anchor href="https://en.wikipedia.org/wiki/Dirichlet_convolution">Wikipedia <em>Dirichlet Convolution</em> 条目</Anchor>;</li>
<li><Anchor href="https://zhuanlan.zhihu.com/p/137619492">Pecco 知乎专栏《狄利克雷卷积》</Anchor>;</li>
<li><Anchor href="https://en.wikipedia.org/wiki/Arithmetic_function">Wikipedia <em>Arithmetic Function</em> 条目</Anchor>.</li>
</ol>
<hr />
<p>感谢阅读，如果发现有误或不当的地方，我诚恳地希望您在下方评论区指出.</p>
<p>关于莫比乌斯反演公式的应用及延伸，我会在下一篇文章中提及，敬请期待.</p>
</>