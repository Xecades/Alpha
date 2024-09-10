import anchor from "@/components/md/Anchor.vue";
import blockmath from "@/components/md/BlockMath.vue";
import inlinemath from "@/components/md/InlineMath.vue";
export default [
<p><strong>狄利克雷卷积</strong>（Dirichlet Convolution）在解析数论中是一个非常重要的工具.</p>,
<p>使用狄利克雷卷积可以很方便地推出<strong>莫比乌斯反演</strong>（Möbius Inversion）相关重要函数和公式，它在信息学竞赛和解析数论中至关重要.</p>,
<p>很多初学者不能真正地理解莫比乌斯反演，或者说即使能使用最终的公式，也难以理清楚它是怎么推导的.</p>,
<p>本文中，我将尝试使用一种新的方式讲解狄利克雷卷积和莫比乌斯反演，希望能对大家有所帮助.</p>,
<hr />,
<blockquote>
<p>文中的引语（浅色文字）是可选内容，为正文的补充或提示. 阅读时，你可以选择跳过这部分文字，而不会影响内容连贯性.</p>
</blockquote>,
<hr />,
<h2 id="t" tabindex="-1" class="heading">什么是狄利克雷卷积 <a class="cursor header-anchor" href="#t">¶</a></h2>,
<p>狄利克雷卷积是定义在<strong>数论函数</strong>间的二元运算.</p>,
<blockquote>
<p>所谓<strong>数论函数</strong>，是指定义域为 <inlinemath data="%5Cmathbb%7BN%7D"></inlinemath>（<strong>自然数</strong>），值域为 <inlinemath data="%5Cmathbb%7BC%7D"></inlinemath>（<strong>复数</strong>） 的一类函数，每个数论函数可以视为复数的序列.</p>
</blockquote>,
<p>它最常见的定义式为：</p>,
<blockmath data="%5Cboxed%7B%5CBigl(f*g%5CBigr)(n):=%5Csum_%7Bd%5Cmid%20n%7Df(d)g%5Cbiggl(%5Cdfrac%7Bn%7D%7Bd%7D%5Cbiggr)%5Cquad(d%5Cin%5Cmathbb%7BN%7D)%7D%0A"></blockmath>,
<blockquote>
<p>这里提醒一个很明显的事实：在这个定义式中，右式的函数 <inlinemath data="f"></inlinemath> 和 <inlinemath data="g"></inlinemath> 括号中的参数是可以调换的，即：</p>
<blockmath data="%5CBigl(f*g%5CBigr)(n):=%5Csum_%7Bd%5Cmid%20n%7Df%5Cbiggl(%5Cdfrac%7Bn%7D%7Bd%7D%5Cbiggr)g(d)%5Cquad(d%5Cin%5Cmathbb%7BN%7D)%0A"></blockmath></blockquote>,
<p>如果我们比较关注式子的对称性，下面有狄利克雷卷积的另一个定义式：</p>,
<blockmath data="%5Cboxed%7B%5CBigl(f*g%5CBigr)(n):=%5Csum_%7Bxy=n%7Df(x)g(y)%5Cquad(x,y%5Cin%5Cmathbb%7BN%7D)%7D%0A"></blockmath>,
<p>下面举一个例子，以方便理解：</p>,
<blockmath data="%5Cbegin%7Baligned%7D%0A&amp;%5CBigl(f*g%5CBigr)(6)%20%5C%5C%0A=&amp;%5Csum_%7Bd%5Cmid%206%7Df(d)g%5Cbiggl(%5Cdfrac%7B6%7D%7Bd%7D%5Cbiggr)%20%5C%5C%0A=&amp;f(1)g(6)+f(2)g(3)+f(3)g(2)+f(6)g(1)%0A%5Cend%7Baligned%7D"></blockmath>,
<p>在后面的文章中我们会反复应用这两个定义式.</p>,
<blockquote>
<p><strong>为什么叫“狄利克雷卷积”呢？</strong></p>
<p>首先，<strong>狄利克雷</strong>（Gustav Lejeune Dirichlet）是 19 世纪德国的数学家，他是解析数论的创立者，是解析数论很多重要理论的提出者. 至于“卷”，可以理解为在二维平面上延伸的两个数论函数（一个沿 x 轴，一个沿 y 轴）像卷毛巾一样交叉结合起来. “积”这个字在定义式中的星号 <inlinemath data="*"></inlinemath> 体现出来了，如果定义普通函数加法为数论函数间的“加”运算，那么这里的狄利克雷卷积就是数论函数的“乘”运算，这一点我会在后文再次提到.</p>
</blockquote>,
<hr />,
<h2 id="t-2" tabindex="-1" class="heading">本文要用到的数论函数 <a class="cursor header-anchor" href="#t-2">¶</a></h2>,
<p>还记得到吗？数论函数都是 <inlinemath data="f:%20%5Cmathbb%7BN%7D%5Crightarrow%5Cmathbb%7BC%7D"></inlinemath> 类型的. 下面我来列举一些常用的数论函数.</p>,
<blockquote>
<p>初看时你可能会觉得这些定义没有什么用，但它们在狄利克雷卷积中大多是作为记号存在的.</p>
</blockquote>,
<h3 id="t-3" tabindex="-1" class="heading"><strong>单位函数</strong> <inlinemath data="%5Cvarepsilon(n)"></inlinemath> <a class="cursor header-anchor" href="#t-3">¶</a></h3>,
<blockmath data="%5Cboxed%7B%5Cvarepsilon(n):=%5Cbegin%7Bcases%7D%0A1,%20&amp;%20n=1,%20%5C%5C%0A0,%20&amp;%20%5Cmathrm%7Botherwise%7D.%0A%5Cend%7Bcases%7D%7D"></blockmath>,
<hr />,
<h3 id="t-4" tabindex="-1" class="heading"><strong>幂函数</strong> <inlinemath data="%5Cmathrm%7BId%7D_k(n)"></inlinemath> <a class="cursor header-anchor" href="#t-4">¶</a></h3>,
<blockmath data="%5Cboxed%7B%5Cmathrm%7BId%7D_k(n):=n%5Ek%7D%0A"></blockmath>,
<p>特别地，有：</p>,
<ul>
<li>当 <inlinemath data="k=1"></inlinemath> 时，为<strong>恒等函数</strong> <inlinemath data="%5Cmathrm%7BId%7D(n)"></inlinemath>，即 <inlinemath data="%5Cboxed%7B%5Cmathrm%7BId%7D(n):=n%7D"></inlinemath>.</li>
<li>当 <inlinemath data="k=0"></inlinemath> 时，为<strong>常数函数</strong> <inlinemath data="%5Cmathbf%7B1%7D(n)"></inlinemath>，即 <inlinemath data="%5Cboxed%7B%5Cmathbf%7B1%7D(n):=1%7D"></inlinemath>.</li>
</ul>,
<blockquote>
<p>这里的常数函数 <inlinemath data="%5Cmathbf%7B1%7D(n)"></inlinemath> 的函数名是<strong>加粗了</strong>的数字 <inlinemath data="1"></inlinemath>，不要和 <inlinemath data="1"></inlinemath> 弄混了.
在某些场合，有人会用大写字母 <inlinemath data="I"></inlinemath> 来代替 <inlinemath data="%5Cmathbf%7B1%7D"></inlinemath>，以防混淆，这里还是使用 <inlinemath data="%5Cmathbf%7B1%7D"></inlinemath>.</p>
</blockquote>,
<hr />,
<h3 id="t-5" tabindex="-1" class="heading"><strong>除数函数</strong> <inlinemath data="%5Csigma_k(n)"></inlinemath> <a class="cursor header-anchor" href="#t-5">¶</a></h3>,
<p>直观上理解，除数函数就是其所有因数的 <inlinemath data="k"></inlinemath> 次方之和.</p>,
<blockmath data="%5Cboxed%7B%5Csigma_k(n):=%5Csum_%7Bd%5Cmid%20n%7Dd%5Ek%5Cquad%20(d%5Cin%5Cmathbb%7BN%7D)%7D%0A"></blockmath>,
<p>特别地，有：</p>,
<ul>
<li>当 <inlinemath data="k=1"></inlinemath> 时，为<strong>因数函数</strong> <inlinemath data="%5Csigma(n)"></inlinemath>，即 <inlinemath data="%5Cboxed%7B%5Csigma(n):=%5Csum%5Climits_%7Bd%5Cmid%20n%7Dd%7D"></inlinemath>.</li>
<li>当 <inlinemath data="k=0"></inlinemath> 时，为<strong>个数函数</strong> <inlinemath data="d(n)"></inlinemath>，即 <inlinemath data="%5Cboxed%7B%5Cmathrm%7Bd%7D(n):=%5Csum%5Climits_%7Bd%5Cmid%20n%7D1%7D"></inlinemath>.</li>
</ul>,
<blockquote>
<p>从“因数函数”和“个数函数”这两个名字就可以看出来，<inlinemath data="%5Csigma(n)"></inlinemath> 表示 <inlinemath data="n"></inlinemath> 的因数之和，<inlinemath data="%5Cmathrm%7Bd%7D(n)"></inlinemath> 表示 <inlinemath data="n"></inlinemath> 的因数个数. 例如，<inlinemath data="%5Csigma(10)=1+2+5+10=18"></inlinemath>，<inlinemath data="%5Cmathrm%7Bd%7D(10)=1+1+1+1=4"></inlinemath>.</p>
</blockquote>,
<p>对于因数函数和个数函数，设 <inlinemath data="n=p_1%5E%7Bc_1%7Dp_2%5E%7Bc_2%7D%5Cdots%20p_m%5E%7Bc_m%7D"></inlinemath>，其中 <inlinemath data="c_i%5Cin%5Cmathbb%7BN%7D%5E*,p_i%5Cin%5Cmathbb%7BP%7D"></inlinemath>，可以得到这两个计算式（不是重点，证明从略）：</p>,
<blockmath data="%5Cbegin%7Baligned%7D%0A%5Csigma(n)=&amp;(1+p_1+%5Ccdots+p_1%5E%7Bc_1%7D)%5Ctimes%5Ccdots%5Ctimes(1+p_m+%5Ccdots+p_m%5E%7Bc_m%7D)=%5Cprod%5Em_%7Bi=1%7D%5Cbiggl%5B%5Csum%5E%7Bc_i%7D_%7Bj=0%7D(p_i%5Ej)%5Cbiggr%5D,%5C%5C%0A%5Cmathrm%7Bd%7D(n)=&amp;(c_1+1)%5Ctimes(c_2+1)%5Ctimes%5Ccdots%5Ctimes(c_m+1)=%5Cprod_%7Bi=1%7D%5E%7Bm%7D(c_i+1).%0A%5Cend%7Baligned%7D"></blockmath>,
<hr />,
<h3 id="t-6" tabindex="-1" class="heading"><strong>欧拉函数</strong> <inlinemath data="%5Cvarphi(n)"></inlinemath> <a class="cursor header-anchor" href="#t-6">¶</a></h3>,
<p>欧拉函数博大精深，这里只介绍一些内容.</p>,
<p><inlinemath data="%5Cvarphi(n)"></inlinemath> 表示小于 <inlinemath data="n"></inlinemath> 的正整数中与 <inlinemath data="n"></inlinemath> 互质的数的个数.</p>,
<p>可以不难推知（证明从略）：</p>,
<blockmath data="%5Cboxed%7B%5Cvarphi(n):=n%5Cprod_%7Bp%5Cmid%20n%7D%5Cbiggl(1-%5Cdfrac%7B1%7D%7Bp%7D%5Cbiggr)%5Cquad(p%5Cin%5Cmathbb%7BP%7D)%7D%0A"></blockmath>,
<hr />,
<p>总共（提及的）有：<strong>单位函数</strong> <inlinemath data="%5Cvarepsilon"></inlinemath>、<strong>幂函数</strong> <inlinemath data="%5Cmathrm%7BId%7D_k"></inlinemath>（含<strong>恒等函数</strong> <inlinemath data="%5Cmathrm%7BId%7D"></inlinemath> 和<strong>常数函数</strong> <inlinemath data="%5Cmathbf%7B1%7D"></inlinemath>）、<strong>除数函数</strong> <inlinemath data="%5Csigma_k"></inlinemath>（含<strong>因数函数</strong> <inlinemath data="%5Csigma"></inlinemath> 和<strong>个数函数</strong> <inlinemath data="%5Cmathrm%7Bd%7D"></inlinemath>）、<strong>欧拉函数</strong> <inlinemath data="%5Cvarphi"></inlinemath>.</p>,
<p>上面提到的<strong>所有</strong>函数都是<strong>积性函数</strong>，其中<strong>单位函数</strong>和<strong>幂函数</strong>是<strong>完全积性函数</strong>（证明从略）.</p>,
<blockquote>
<p><strong>积性函数</strong>是指对<strong>所有互质的整数</strong> <inlinemath data="a"></inlinemath> 和 <inlinemath data="b"></inlinemath> 都有 <inlinemath data="f(ab)=f(a)f(b)"></inlinemath> 的数论函数.
<strong>完全积性函数</strong>是指对<strong>所有整数</strong> <inlinemath data="a"></inlinemath> 和 <inlinemath data="b"></inlinemath> 都有 <inlinemath data="f(ab)=f(a)f(b)"></inlinemath> 的数论函数.</p>
<p>在 <inlinemath data="f(ab)=f(a)f(b)"></inlinemath> 式中令 <inlinemath data="a%20=%201"></inlinemath>，得到 <inlinemath data="f(1)=1"></inlinemath>，这也是积性函数一重要特点.</p>
</blockquote>,
<hr />,
<h2 id="t-7" tabindex="-1" class="heading">狄利克雷卷积相关定理 <a class="cursor header-anchor" href="#t-7">¶</a></h2>,
<p>读者不妨先不看证明，自己试着证一下.</p>,
<hr />,
<p><strong>[1] 若 <inlinemath data="f"></inlinemath>，<inlinemath data="g"></inlinemath> 为积性函数，则 <inlinemath data="f%5Cast%20g"></inlinemath> 也是积性函数.</strong></p>,
<p>设 <inlinemath data="(a,b)=1"></inlinemath>（即 <inlinemath data="a"></inlinemath> 和 <inlinemath data="b"></inlinemath> 互质）则：</p>,
<blockmath data="%5Cbegin%7Baligned%7D%0A&amp;%5CBigl(f*g%5CBigr)(a)%5Ccdot%5CBigl(f*g%5CBigr)(b)%20%5C%5C%0A=&amp;%20%5Csum_%7Bd_1%5Cmid%20a%7Df(d_1)g%5Cbiggl(%5Cdfrac%7Ba%7D%7Bd_1%7D%5Cbiggr)%5Ccdot%5Csum_%7Bd_2%5Cmid%20b%7Df(d_2)g%5Cbiggl(%5Cdfrac%7Bb%7D%7Bd_2%7D%5Cbiggr)%20%5C%5C%0A=&amp;%20%5Csum_%7Bd_1%5Cmid%20a%7D%5Csum_%7Bd_2%5Cmid%20b%7Df(d_1)g%5Cbiggl(%5Cdfrac%7Ba%7D%7Bd_1%7D%5Cbiggr)%5Ccdot%20f(d_2)g%5Cbiggl(%5Cdfrac%7Bb%7D%7Bd_2%7D%5Cbiggr)%20%5C%5C%0A=&amp;%20%5Csum_%7Bd_1d_2%5Cmid%20ab%7Df(d_1d_2)g%5Cbiggl(%5Cdfrac%7Bab%7D%7Bd_1d_2%7D%5Cbiggr)%20%5C%5C%0A=&amp;%20%5Csum_%7Bd%5Cmid%20ab%7Df(d)g%5Cbiggl(%5Cdfrac%7Bab%7D%7Bd%7D%5Cbiggr)%20%5C%5C%0A=&amp;%20%5CBigl(f*g%5CBigr)(ab)%0A%5Cend%7Baligned%7D"></blockmath>,
<p>在将 <inlinemath data="%5Clarge%5Csum%5Climits_%7Bd_1%5Cmid%20a%7D%5Csum%5Climits_%7Bd_2%5Cmid%20b%7D"></inlinemath> 合并成 <inlinemath data="%5Clarge%5Csum%5Climits_%7Bd_1d_2%5Cmid%20ab%7D"></inlinemath> 的操作中，用到了由 <inlinemath data="a"></inlinemath>、<inlinemath data="b"></inlinemath> 互质推导出来的结论：<inlinemath data="ab"></inlinemath> 的因数唯一表示为 <inlinemath data="a"></inlinemath> 的因数与 <inlinemath data="b"></inlinemath> 的因数的乘积，因此 <inlinemath data="d_1%5Cmid%20a,%5C;d_2%5Cmid%20b"></inlinemath> 和 <inlinemath data="d_1d_2%5Cmid%20ab"></inlinemath> 是完全等价的.</p>,
<hr />,
<p><strong>[2] 狄利克雷卷积满足交换律，即 <inlinemath data="f%5Cast%20g=g%5Cast%20f"></inlinemath>.</strong></p>,
<blockmath data="%5Cbegin%7Baligned%7D%0A&amp;%5CBigl(f*g%5CBigr)(n)%20%5C%5C%0A=&amp;%20%5Csum_%7Bxy=n%7Df(x)g(y)%20%5C%5C%0A=&amp;%20%5Csum_%7Byx=n%7Dg(x)f(y)%5Cquad(%5Cast)%20%5C%5C%0A=&amp;%5CBigl(g*f%5CBigr)(n)%0A%5Cend%7Baligned%7D"></blockmath>,
<p>在 <inlinemath data="(%5Cast)"></inlinemath> 中，我将 <inlinemath data="x"></inlinemath> 和 <inlinemath data="y"></inlinemath> 换了个位置（也就是 <inlinemath data="x"></inlinemath> 写成 <inlinemath data="y"></inlinemath>，<inlinemath data="y"></inlinemath> 写成 <inlinemath data="x"></inlinemath>. 实际上这不是必须的），然后把 <inlinemath data="g"></inlinemath> 挪到了 <inlinemath data="f"></inlinemath> 的前面.</p>,
<p>这里我用的是第二个定义式，它的优点是对称性好，用来证明交换律很直观.</p>,
<hr />,
<p><strong>[3] 狄利克雷卷积满足结合律，即 <inlinemath data="(f%5Cast%20g)%5Cast%20h=f%5Cast(g%5Cast%20h)"></inlinemath>.</strong></p>,
<blockmath data="%5Cbegin%7Baligned%7D%0A&amp;%5CBigl((f%5Cast%20g)%5Cast%20h%5CBigr)(n)%20%5C%5C%0A=&amp;%20%5Csum_%7Bxy=n%7D%5CBigl(f*g%5CBigr)(x)h(y)%20%5C%5C%0A=&amp;%20%5Csum_%7Bxy=n%7D%5Cbiggl(%5Csum_%7Bzw=x%7Df(z)g(w)%5Cbiggr)h(y)%20%5C%5C%0A=&amp;%20%5Csum_%7Bxy=n%7D%5Csum_%7Bzw=x%7Df(z)g(w)h(y)%20%5C%5C%0A=&amp;%20%5Csum_%7Bzwy=n%7Df(z)g(w)h(y)%20%5C%5C%0A=&amp;%20%5Csum_%7Babc=n%7Df(a)g(b)h(c)%20%5C%5C%0A%5Cend%7Baligned%7D"></blockmath>,
<p>从 <inlinemath data="f%5Cast(g%5Cast%20h)"></inlinemath> 开始，类似地也可以得到 <inlinemath data="%5Clarge%5Csum%5Climits_%7Babc=n%7D%5Cnormalsize%20f(a)g(b)h(c)"></inlinemath>，因此它们相等，结合律成立.</p>,
<hr />,
<p><strong>[4] 狄利克雷卷积满足分配律，即 <inlinemath data="f%5Cast(g+h)=f%5Cast%20g+f%5Cast%20h"></inlinemath>.</strong></p>,
<blockmath data="%5Cbegin%7Baligned%7D%0A&amp;%5CBigl(f%5Cast(g+h)%5CBigr)(n)%20%5C%5C%0A=&amp;%20%5Csum_%7Bxy=n%7Df(x)%5CBigl(g+h%5CBigr)(y)%20%5C%5C%0A=&amp;%20%5Csum_%7Bxy=n%7Df(x)%5Bg(y)+h(y)%5D%20%5C%5C%0A=&amp;%20%5Csum_%7Bxy=n%7Df(x)g(y)+f(x)h(y)%20%5C%5C%0A=&amp;%20%5Csum_%7Bxy=n%7Df(x)g(y)+%5Csum_%7Bxy=n%7Df(x)h(y)%20%5C%5C%0A=&amp;%20%5CBigl(f%5Cast%20g+f%5Cast%20h%5CBigr)(n)%0A%5Cend%7Baligned%7D"></blockmath>,
<hr />,
<p>这里总结一下我们证了的式子：</p>,
<ol>
<li>若 <inlinemath data="f"></inlinemath>，<inlinemath data="g"></inlinemath> 为积性函数，则 <inlinemath data="f%5Cast%20g"></inlinemath> 也是积性函数.</li>
<li>狄利克雷卷积满足<strong>交换律</strong>，即 <inlinemath data="f%5Cast%20g=g%5Cast%20f"></inlinemath>.</li>
<li>狄利克雷卷积满足<strong>结合律</strong>，即 <inlinemath data="(f%5Cast%20g)%5Cast%20h=f%5Cast(g%5Cast%20h)"></inlinemath>.</li>
<li>狄利克雷卷积满足<strong>分配律</strong>，即 <inlinemath data="f%5Cast(g+h)=f%5Cast%20g+f%5Cast%20h"></inlinemath>.</li>
</ol>,
<p>这些结论十分重要，后文中我可能会在不说明的情况下直接使用这些结论.</p>,
<blockquote>
<p><strong>为什么是“积”？</strong></p>
<p>现在我们可以得出原因了，狄利克雷卷积满足<strong>交换律</strong>、<strong>结合律</strong>和<strong>分配律</strong>，其运算法则和普通算数乘法完全类似（在小学的时候我们就已经学过乘法的三定律了）. 实际上，狄利克雷卷积和普通函数加法可以构成一个<strong>阿贝尔环</strong>，你甚至可以在它的基础上构建以函数为自变量的多项式，并解它的根.</p>
</blockquote>,
<hr />,
<h2 id="t-8" tabindex="-1" class="heading">一些特殊的卷积 <a class="cursor header-anchor" href="#t-8">¶</a></h2>,
<p>看到这里，前文提到的数论函数才能真正地起作用.</p>,
<hr />,
<p><strong>[1] <inlinemath data="%5Cmathrm%7BId%7D_k%5Cast%5Cmathbf%7B1%7D=%5Csigma_k"></inlinemath></strong></p>,
<blockmath data="%5Cbegin%7Baligned%7D%0A%5CBigl(%5Cmathrm%7BId%7D_k*%5Cmathbf%7B1%7D%5CBigr)(n)%20=&amp;%20%5Csum_%7Bd%5Cmid%20n%7D%5Cmathrm%7BId%7D_k(d)%5Cmathbf%7B1%7D%5Cbiggl(%5Cdfrac%7Bn%7D%7Bd%7D%5Cbiggr)%20%5C%5C%0A=&amp;%20%5Csum_%7Bd%5Cmid%20n%7D%5Cmathrm%7BId%7D_k(d)%20%5C%5C%0A=&amp;%20%5Csum_%7Bd%5Cmid%20n%7Dd%5Ek%20%5C%5C%0A=&amp;%20%5Csigma_k(n)%20%5C%5C%0A%5Cend%7Baligned%7D"></blockmath>,
<p>在证明的过程中，我们发现：如果一个函数和 <inlinemath data="%5Cmathbf%7B1%7D"></inlinemath> 作狄利克雷卷积，就相当于把其参数的所有因子枚举出来并代入原函数，然后求和. 也就是说：</p>,
<blockmath data="%5CBigl(f*%5Cmathbf%7B1%7D%5CBigr)(n)=%5Csum_%7Bd%5Cmid%20n%7Df(d)%0A"></blockmath>,
<p>无论是正向操作还是反向操作，这个式子都很重要.</p>,
<hr />,
<p><strong>[2] <inlinemath data="%5Cvarphi%5Cast%5Cmathbf%7B1%7D=%5Cmathrm%7BId%7D"></inlinemath></strong></p>,
<blockquote>
<p>再提醒一下，<inlinemath data="%5Cvarphi(n)"></inlinemath> 的定义是这样的：</p>
<blockmath data="%5Cvarphi(n):=n%5Cprod_%7Bp%5Cmid%20n%7D%5Cbiggl(1-%5Cdfrac%7B1%7D%7Bp%7D%5Cbiggr)%5Cquad(p%5Cin%5Cmathbb%7BP%7D)%0A"></blockmath></blockquote>,
<p>首先有：</p>,
<blockmath data="%5CBigl(%5Cvarphi%5Cast%5Cmathbf%7B1%7D%5CBigr)(n)=%5Csum_%7Bd%5Cmid%20n%7D%5Cvarphi(d)%0A"></blockmath>,
<p>尝试对 <inlinemath data="n"></inlinemath> 进行拆分，当 <inlinemath data="n=p%5Em%5C;(p%5Cin%5Cmathbb%7BP%7D)"></inlinemath> 时，有：</p>,
<blockmath data="%5Cbegin%7Baligned%7D%0A%5Csum_%7Bd%5Cmid%20n%7D%5Cvarphi(d)%20=&amp;%20%5Cvarphi(1)+%5Csum_%7Bd=1%7D%5E%7Bm%7D%5Cvarphi(p%5Ed)%20%5C%5C%0A=&amp;%201+%5Csum_%7Bd=1%7D%5E%7Bm%7Dp%5Ed%5Cbiggl(1-%5Cdfrac%7B1%7D%7Bp%7D%5Cbiggr)%20%5C%5C%0A=&amp;%201+%5Csum_%7Bd=1%7D%5E%7Bm%7D(p%5Ed-p%5E%7Bd-1%7D)%20%5C%5C%0A=&amp;%20p%5Em%20%5C%5C%0A=&amp;%20n%0A%5Cend%7Baligned%7D"></blockmath>,
<p>考虑更普遍的情况，当 <inlinemath data="n"></inlinemath> 为任意正整数，分解 <inlinemath data="n=%5Cprod%20p%5Em"></inlinemath>，因为 <inlinemath data="%5Cvarphi*%5Cmathbf%7B1%7D"></inlinemath> 是积性函数，所以：</p>,
<blockmath data="%5Cbegin%7Baligned%7D%0A%5CBigl(%5Cvarphi*%5Cmathbf%7B1%7D%5CBigr)(n)%20=&amp;%20%5CBigl(%5Cvarphi*%5Cmathbf%7B1%7D%5CBigr)%5Cbiggl(%5Cprod%20p%5Em%5Cbiggr)%5C%5C%0A=&amp;%20%5Cprod%5CBigl(%5Cvarphi*%5Cmathbf%7B1%7D%5CBigr)(%7Bp_i%7D%5E%7Bm_i%7D)%20%5C%5C%0A=&amp;%20%5Cprod%20p%5Em%20%5C%5C%0A=&amp;%20n%0A%5Cend%7Baligned%7D"></blockmath>,
<p>综上，<inlinemath data="%5Cvarphi*%5Cmathbf%7B1%7D=%5Cmathrm%7BId%7D"></inlinemath>.</p>,
<hr />,
<p><strong>[3] <inlinemath data="%5Cmathbf%7B1%7D%5Cast%5Cmathbf%7B1%7D=%5Cmathrm%7Bd%7D"></inlinemath></strong></p>,
<p>这个证明相对更简单.</p>,
<blockmath data="%5Cbegin%7Baligned%7D%0A%5CBigl(%5Cmathbf%7B1%7D*%5Cmathbf%7B1%7D%5CBigr)(n)%20=&amp;%20%5Csum_%7Bd%5Cmid%20n%7D%5Cmathbf%7B1%7D(d)%5Cmathbf%7B1%7D%5Cbiggl(%5Cdfrac%7Bn%7D%7Bd%7D%5Cbiggr)%20%5C%5C%0A=&amp;%20%5Csum_%7Bd%5Cmid%20n%7D1%20%5C%5C%0A=&amp;%20%5Cmathrm%7Bd%7D(n)%20%5C%5C%0A%5Cend%7Baligned%7D"></blockmath>,
<hr />,
<p>上面我们只列举出了三个常用的狄利克雷卷积结果，分别是：</p>,
<ol>
<li><inlinemath data="%5Cmathrm%7BId%7D_k*%5Cmathbf%7B1%7D=%5Csigma_k"></inlinemath>;</li>
<li><inlinemath data="%5Cvarphi*%5Cmathbf%7B1%7D=%5Cmathrm%7BId%7D"></inlinemath>;</li>
<li><inlinemath data="%5Cmathbf%7B1%7D*%5Cmathbf%7B1%7D=%5Cmathrm%7Bd%7D"></inlinemath>.</li>
</ol>,
<p>实际上，通过这几个运算我们可以得到更多的运算，例如：</p>,
<blockmath data="%5Csigma=%5Cmathrm%7BId%7D*%5Cmathbf%7B1%7D=%5Cvarphi*%5Cmathbf%7B1%7D*%5Cmathbf%7B1%7D=%5Cvarphi*%5Cmathrm%7Bd%7D%0A"></blockmath>,
<hr />,
<h2 id="t-9" tabindex="-1" class="heading">单位元 <a class="cursor header-anchor" href="#t-9">¶</a></h2>,
<blockquote>
<p>乘法的<strong>单位元</strong>是指乘上它后值不改变的数（对狄利克雷卷积来说，是“函数”）. 例如，普通乘法的单位元是数字 <inlinemath data="1"></inlinemath>，因为 <inlinemath data="n%5Ctimes1=n"></inlinemath>. 因此，在狄利克雷卷积中，它的单位元 <inlinemath data="%5Ctau(n)"></inlinemath> 就应该满足 <inlinemath data="f*%5Ctau=f"></inlinemath>.</p>
</blockquote>,
<p>我们注意到这样一个事实：</p>,
<blockmath data="%5CBigl(f*%5Cvarepsilon%5CBigr)(n)=%5Csum_%7Bd%5Cmid%20n%7D%5Cvarepsilon(d)f%5Cbiggl(%5Cdfrac%7Bn%7D%7Bd%7D%5Cbiggr)=f(n)%0A"></blockmath>,
<p>因此，狄利克雷卷积的单位元就是<strong>单位函数</strong> <inlinemath data="%5Cvarepsilon(n)"></inlinemath>，它在狄利克雷卷积中的作用和 1 在普通乘法中的作用是类似的. 任何函数（<strong>包括 <inlinemath data="%5Cvarepsilon"></inlinemath></strong>）和 <inlinemath data="%5Cvarepsilon"></inlinemath> 进行狄利克雷卷积，都得到该函数本身.</p>,
<blockquote>
<p>还记得到吗？<inlinemath data="%5Cvarepsilon(n)"></inlinemath> 的定义是这样的：</p>
<blockmath data="%5Cvarepsilon(n):=%5Cbegin%7Bcases%7D%0A1,%20&amp;%20n=1,%20%5C%5C%0A0,%20&amp;%20%5Cmathrm%7Botherwise%7D.%0A%5Cend%7Bcases%7D"></blockmath></blockquote>,
<hr />,
<h2 id="t-10" tabindex="-1" class="heading">狄利克雷逆（Dirichlet Inverse） <a class="cursor header-anchor" href="#t-10">¶</a></h2>,
<blockquote>
<p>我们可以把这里的“<strong>逆</strong>”和“<strong>逆元</strong>”作类比. 例如，在普通运算中，一个数的“逆元”就是这个数的倒数；在同余运算中，一个数的“逆元”在同个模的意义下，能使得它与这个数相乘的结果与 <inlinemath data="1"></inlinemath> 同余. 分别而言，如果我们规定 <inlinemath data="n"></inlinemath> 的逆元是 <inlinemath data="n%5E%7B-1%7D"></inlinemath>（这个符号是作为整体引入的，<strong>大多数情况下不能简单地理解为 <inlinemath data="%5Cdfrac%7B1%7D%7Bn%7D"></inlinemath></strong>），那么就有这样两个式子：</p>
<blockmath data="%5Cbegin%7Baligned%7D%0A%5Ctext%7B%E6%99%AE%E9%80%9A%E8%BF%90%E7%AE%97%E4%B8%AD%EF%BC%9A%7D&amp;%20n%5Ctimes%20n%5E%7B-1%7D=1,%5C%5C%0A%5Ctext%7B%E5%90%8C%E4%BD%99%E8%BF%90%E7%AE%97%E4%B8%AD%EF%BC%9A%7D&amp;%20n%5Ctimes%20n%5E%7B-1%7D%5Cequiv1%5C;(%5Cmathrm%7Bmod%7D%5C;%20r).%0A%5Cend%7Baligned%7D"></blockmath><p>数字 <inlinemath data="1"></inlinemath> 是两种运算中的单位元，所以说，逆元在类似乘法的运算中起着“倒数”的地位.</p>
</blockquote>,
<p>在狄利克雷卷积中，单位元是 <inlinemath data="%5Cvarepsilon"></inlinemath>，我们定义狄利克雷逆如下：</p>,
<blockmath data="%5Cboxed%7Bf*f%5E%7B-1%7D=%5Cvarepsilon%7D%0A"></blockmath>,
<p>函数 <inlinemath data="f%5E%7B-1%7D"></inlinemath> 就被称为 <inlinemath data="f"></inlinemath> 的<strong>狄利克雷逆</strong>.</p>,
<hr />,
<p>对于狄利克雷逆公式的推导，可以使用<strong>合情推理</strong>的方法（列出 <inlinemath data="n=1,2,3%5Ccdots"></inlinemath>，然后找规律），得到狄利克雷逆的计算式：</p>,
<blockmath data="%5Cboxed%7Bf%5E%7B-1%7D(n):=%5Cbegin%7Bcases%7D%0A%5Cdfrac%7B1%7D%7Bf(1)%7D,&amp;n=1,%20%5C%5C%0A-%5Cdfrac%7B1%7D%7Bf(1)%7D%5Clarge%5Csum%5Climits_%7Bd%5Cmid%20n,%5C;d%5Cneq%20n%7D%5Cnormalsize%20f%5Cbiggl(%5Cdfrac%7Bn%7D%7Bd%7D%5Cbiggr)f%5E%7B-1%7D(d),&amp;%5Cmathrm%7Botherwise%7D.%0A%5Cend%7Bcases%7D%7D"></blockmath>,
<p>这个式子我们不推导，仅证明它是成立的:</p>,
<p>当 <inlinemath data="n=1"></inlinemath> 时，<inlinemath data="%5CBigl(f*f%5E%7B-1%7D%5CBigr)(1)=%5Clarge%5Csum%5Climits_%7Bd%5Cmid1%7D%5Cnormalsize%20f(d)f%5E%7B-1%7D%5Cbiggl(%5Cdfrac%7B1%7D%7Bd%7D%5Cbiggr)=f(1)f%5E%7B-1%7D(1)=1"></inlinemath>.</p>,
<p>当 <inlinemath data="n%5Cneq1"></inlinemath> 时，</p>,
<blockmath data="%5Cbegin%7Baligned%7D%0A&amp;%5CBigl(f*f%5E%7B-1%7D%5CBigr)(n)%20%5C%5C%0A&amp;=%20%5Csum_%7Bd%5Cmid%20n%7Df%5Cbiggl(%5Cdfrac%7Bn%7D%7Bd%7D%5Cbiggr)f%5E%7B-1%7D(d)%20%5C%5C%0A&amp;=%20f(1)f%5E%7B-1%7D(n)+%5Csum_%7Bd%5Cmid%20n,%5C;d%5Cneq%20n%7Df%5Cbiggl(%5Cdfrac%7Bn%7D%7Bd%7D%5Cbiggr)f%5E%7B-1%7D(d)%20%5C%5C%0A&amp;=%20-%5Cdfrac%7Bf(1)%7D%7Bf(1)%7D%5Csum_%7Bd%5Cmid%20n,%5C;d%5Cneq%20n%7Df%5Cbiggl(%5Cdfrac%7Bn%7D%7Bd%7D%5Cbiggr)f%5E%7B-1%7D(d)+%5Csum_%7Bd%5Cmid%20n,%5C;d%5Cneq%20n%7Df%5Cbiggl(%5Cdfrac%7Bn%7D%7Bd%7D%5Cbiggr)f%5E%7B-1%7D(d)%20%5C%5C%0A&amp;=%200.%0A%5Cend%7Baligned%7D"></blockmath>,
<p>也就是说，<inlinemath data="f*f%5E%7B-1%7D=%5Cvarepsilon"></inlinemath>. 因此这个计算式是成立的.</p>,
<hr />,
<p>值得注意的是，狄利克雷逆的计算式中包含了自身，也就是说它是个<strong>递归形式的定义</strong>. 若将其展开，则过于复杂，（一般）没有实际意义.</p>,
<p>一个数论函数 <inlinemath data="f(n)"></inlinemath> 存在狄利克雷逆的<strong>充要条件</strong>是 <inlinemath data="f(1)%5Cneq0"></inlinemath>，在狄利克雷逆的推导过程中，我们知道 <strong><inlinemath data="f(n)"></inlinemath> 的逆是唯一的</strong>.</p>,
<p>需要指出，<strong>积性函数一定有狄利克雷逆，且它也是积性函数</strong>，该证明从略（请参见芝加哥大学 Mark Schachner 的 <anchor href="http://math.uchicago.edu/~may/REU2018/REUPapers/Schachner.pdf">Paper</anchor>）.</p>,
<p>当 <inlinemath data="f(1)%5Cneq0"></inlinemath> 且 <inlinemath data="g(1)%5Cneq0"></inlinemath> 时，有 <inlinemath data="%5Cboxed%7B(f%5Cast%20g)%5E%7B-1%7D=f%5E%7B-1%7D*g%5E%7B-1%7D%7D"></inlinemath>，证明如下：</p>,
<blockmath data="%5Cbegin%7Baligned%7D%0A&amp;(f*g)%5E%7B-1%7D*(f*g)%20%5C%5C%0A&amp;=%5Cvarepsilon%20%5C%5C%0A&amp;=(f%5E%7B-1%7D*f)*(g%5E%7B-1%7D*g)%20%5C%5C%0A&amp;=(f%5E%7B-1%7D*g%5E%7B-1%7D)*(f*g)%0A%5Cend%7Baligned%7D"></blockmath>,
<p>由狄利克雷逆的唯一性，<inlinemath data="f%5Cast%20g"></inlinemath> 的狄利克雷逆是唯一的，所以 <inlinemath data="(f%5Cast%20g)%5E%7B-1%7D=f%5E%7B-1%7D*g%5E%7B-1%7D"></inlinemath>.</p>,
<hr />,
<h2 id="t-11" tabindex="-1" class="heading">莫比乌斯反演 <a class="cursor header-anchor" href="#t-11">¶</a></h2>,
<p>说了这么多，终于到莫比乌斯反演了. 了解了狄利克雷卷积和狄利克雷逆，莫比乌斯反演就不在话下了.</p>,
<p>我们定义单位函数 <inlinemath data="%5Cmathbf%7B1%7D(n)"></inlinemath> 的狄利克雷逆为<strong>莫比乌斯函数 <inlinemath data="%5Cmu(n)"></inlinemath></strong>（或译作“默比乌斯函数”）：</p>,
<blockmath data="%5Cboxed%7B%5Cmu:=%5Cmathbf%7B1%7D%5E%7B-1%7D%7D%0A"></blockmath>,
<p>上面这个式子就是莫比乌斯函数的狄利克雷逆定义式，如果用普通写法，莫比乌斯函数的普通定义式为：</p>,
<blockmath data="%5Cboxed%7B%5Cmu(n):=%5Cbegin%7Bcases%7D%0A1%20&amp;n=1%20%5C%5C%0A(-1)%5Em%20&amp;n=p_1p_2%5Cdots%20p_m,%5C;p_i%5Cin%5Cmathbb%7BP%7D%20%5C%5C%0A0%20&amp;%5Cmathrm%7Botherwise%7D%0A%5Cend%7Bcases%7D%7D"></blockmath>,
<p>其证明请参见 Mark Schachner 的 <anchor href="http://math.uchicago.edu/~may/REU2018/REUPapers/Schachner.pdf">Paper</anchor> 中的 Theorem 4.3.</p>,
<blockquote>
<p>互联网上不少介绍莫比乌斯反演的文章只给第二种定义，是因为莫比乌斯反演的讲解可以绕过狄利克雷卷积独立进行，但这样做会让一些读者不明白为什么这样定义，平添了许多麻烦. 我认为，在理解狄利克雷卷积的基础上谈论莫比乌斯反演是事半功倍的.</p>
</blockquote>,
<p>使用狄利克雷卷积来推导莫比乌斯反演公式就易如反掌了：</p>,
<blockmath data="%5Cboxed%7Bg=f*%5Cmathbf%7B1%7D%5CLeftrightarrow%20f=g*%5Cmu%7D%5Cquad(*)%0A"></blockmath>,
<p>将其展开，也就是：</p>,
<blockmath data="%5Cboxed%7Bg(n)=%5Csum_%7Bd%5Cmid%20n%7Df(d)%5CLeftrightarrow%20f(n)=%5Csum_%7Bd%5Cmid%20n%7D%5Cmu(d)g%5Cbiggl(%5Cdfrac%7Bn%7D%7Bd%7D%5Cbiggr)%7D%0A"></blockmath>,
<p>莫比乌斯反演公式的证明十分简单，在 <inlinemath data="(*)"></inlinemath> 式的左式中同时卷积 <inlinemath data="%5Cmu"></inlinemath> 即可.</p>,
<hr />,
<h2 id="t-12" tabindex="-1" class="heading">参考文献 <a class="cursor header-anchor" href="#t-12">¶</a></h2>,
<ol>
<li><anchor href="http://math.uchicago.edu/~may/REU2018/REUPapers/Schachner.pdf">芝加哥大学 Mark Schachner 的论文：<em>Algebraic and Analytic Properties of Arithmetic Functions</em></anchor>;</li>
<li><anchor href="https://en.wikipedia.org/wiki/Dirichlet_convolution">Wikipedia <em>Dirichlet Convolution</em> 条目</anchor>;</li>
<li><anchor href="https://zhuanlan.zhihu.com/p/137619492">Pecco 知乎专栏《狄利克雷卷积》</anchor>;</li>
<li><anchor href="https://en.wikipedia.org/wiki/Arithmetic_function">Wikipedia <em>Arithmetic Function</em> 条目</anchor>.</li>
</ol>,
<hr />,
<p>感谢阅读，如果发现有误或不当的地方，我诚恳地希望您在下方评论区指出.</p>,
<p>关于莫比乌斯反演公式的应用及延伸，我会在下一篇文章中提及，敬请期待.</p>,
];
