import anchor from "@/components/md/Anchor.vue";
import blockmath from "@/components/md/BlockMath.vue";
import blockcode from "@/components/md/BlockCode.vue";
import inlinemath from "@/components/md/InlineMath.vue";
import note from "@/components/md/Note.vue";
export default [
<p><strong>离散傅里叶变换</strong>（Discrete Fourier Transform, DFT）和<strong>离散傅里叶反变换</strong>（Inverse Discrete Fourier Transform, IDFT） 是鼎鼎大名的<strong>快速傅里叶变换</strong>（Fast Fourier Transform, FFT）的前置知识.</p>,
<p>其中 FFT 用于加速两个多项式 <inlinemath data="A(x)"></inlinemath>、<inlinemath data="B(x)"></inlinemath> 的乘积 <inlinemath data="C(x)"></inlinemath> 的计算，DFT 和 IDFT 是 FFT 的两个中间步骤.</p>,
<p>需要明确，给定的是两个多项式：</p>,
<blockmath data="%5Cleft%5C%7B%5Cbegin%7Balign*%7D%0AA(x)&amp;=a_0+a_1x+a_2x%5E2+%5Ccdots+a_%7Bn-1%7Dx%5E%7Bn-1%7D%5C%5C%0AB(x)&amp;=b_0+b_1x+b_2x%5E2+%5Ccdots+b_%7Bm-1%7Dx%5E%7Bm-1%7D%0A%5Cend%7Balign*%7D%5Cright."></blockmath>,
<p>其中 <inlinemath data="A(x)"></inlinemath> 是一个 <inlinemath data="n"></inlinemath> 项多项式，<inlinemath data="B(x)"></inlinemath> 是一个 <inlinemath data="m"></inlinemath> 项多项式.</p>,
<p>我们要求的多项式函数 <inlinemath data="C(x)"></inlinemath> 为一个 <inlinemath data="n+m-1"></inlinemath> 项的多项式（考虑最低项 <inlinemath data="x"></inlinemath> 的幂次为 <inlinemath data="1"></inlinemath>，最高项为 <inlinemath data="n-1+m-1=n+m-2"></inlinemath>，共 <inlinemath data="1+(n+m-2)=n+m-1"></inlinemath> 项）.</p>,
<p>要了解 DFT 和 IDFT，还需要一些前置知识.</p>,
<hr />,
<h2 id="t" tabindex="-1" class="heading">多项式的系数表示法 <a class="cursor header-anchor" href="#t">¶</a></h2>,
<p>我们平时用的多项式系数 <inlinemath data="a_0,a_1,%5Cdots,a_%7Bn-1%7D"></inlinemath> 就属于多项式的系数表示法.</p>,
<p>我们称 <inlinemath data="n"></inlinemath> 维系数向量 <inlinemath data="(a_0,a_1,%5Cdots,a_%7Bn-1%7D)"></inlinemath> 为 <inlinemath data="A(x)"></inlinemath> 的<strong>系数表示</strong>，其中：</p>,
<blockmath data="%5Cboxed%7BA(x)=%5Csum_%7Bi=0%7D%5E%7Bn-1%7Da_i%5Ccdot%20x%5Ei%7D%0A"></blockmath>,
<p>对于 <inlinemath data="A(x)"></inlinemath> 的系数表示 <inlinemath data="(a_0,a_1,%5Cdots,a_%7Bn-1%7D)"></inlinemath> 和 <inlinemath data="B(x)"></inlinemath> 的系数表示 <inlinemath data="(b_0,b_1,%5Cdots,b_%7Bm-1%7D)"></inlinemath>，要求 <inlinemath data="C(x)"></inlinemath> 的系数表示，显然可以通过以下代码实现:</p>,
<blockcode lang="cpp" html="%3Ccode%20class%3D%22language-cpp%22%3E%3Cspan%20class%3D%22token%20keyword%22%3Efor%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20keyword%22%3Eint%3C%2Fspan%3E%20i%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E0%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%20i%20%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3E%20n%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%20i%3Cspan%20class%3D%22token%20operator%22%3E%2B%2B%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20keyword%22%3Efor%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E(%3C%2Fspan%3E%3Cspan%20class%3D%22token%20keyword%22%3Eint%3C%2Fspan%3E%20j%20%3Cspan%20class%3D%22token%20operator%22%3E%3D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20number%22%3E0%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%20j%20%3Cspan%20class%3D%22token%20operator%22%3E%26lt%3B%3C%2Fspan%3E%20m%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%20j%3Cspan%20class%3D%22token%20operator%22%3E%2B%2B%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E)%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20c%3Cspan%20class%3D%22token%20punctuation%22%3E%5B%3C%2Fspan%3Ei%20%3Cspan%20class%3D%22token%20operator%22%3E%2B%3C%2Fspan%3E%20j%3Cspan%20class%3D%22token%20punctuation%22%3E%5D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E%2B%3D%3C%2Fspan%3E%20a%3Cspan%20class%3D%22token%20punctuation%22%3E%5B%3C%2Fspan%3Ei%3Cspan%20class%3D%22token%20punctuation%22%3E%5D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20operator%22%3E*%3C%2Fspan%3E%20b%3Cspan%20class%3D%22token%20punctuation%22%3E%5B%3C%2Fspan%3Ej%3Cspan%20class%3D%22token%20punctuation%22%3E%5D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%0A%3C%2Fcode%3E"></blockcode>,
<p>得到的 <inlinemath data="C(x)"></inlinemath> 为 <inlinemath data="n+m-1"></inlinemath> 项多项式.</p>,
<p>这个朴素算法的时间复杂度是 <inlinemath data="O(n%5E2)"></inlinemath> 的.</p>,
<hr />,
<h2 id="t-2" tabindex="-1" class="heading">多项式的点值表示法 <a class="cursor header-anchor" href="#t-2">¶</a></h2>,
<p>点值表示法是 DFT 算法的核心.</p>,
<p>我们在 <inlinemath data="%5Cmathbb%7BC%7D"></inlinemath> 上<strong>任意</strong>取一组<strong>不同</strong>的 <inlinemath data="x_i"></inlinemath>，共 <inlinemath data="n"></inlinemath> 个，记为向量 <inlinemath data="(x_0,x_1,%5Cdots,x_%7Bn-1%7D)"></inlinemath>，这里的 <inlinemath data="x_i"></inlinemath> 称为<strong>插值节点</strong>.</p>,
<p>将每个 <inlinemath data="x_i"></inlinemath> 分别代入 <inlinemath data="A(x)"></inlinemath>，得到一组共 <inlinemath data="n"></inlinemath> 个运算结果 <inlinemath data="y_i"></inlinemath>，记为向量 <inlinemath data="(y_0,y_1,%5Cdots,y_%7Bn-1%7D)"></inlinemath>.</p>,
<p>也就是说，求</p>,
<blockmath data="%5Cboxed%7By_i=A(x_i)=%5Csum_%7Bj=0%7D%5E%7Bn-1%7Da_j%5Ccdot%20x_i%5Ej%7D%0A"></blockmath>,
<p>向量 <inlinemath data="(y_0,y_1,%5Cdots,y_%7Bn-1%7D)"></inlinemath> 称为多项式 <inlinemath data="A(x)"></inlinemath> 的<strong>点值表示</strong>.</p>,
<hr />,
<p>下面我们证明，一个 <inlinemath data="n"></inlinemath> 项多项式（<inlinemath data="n-1"></inlinemath> 次）在 <inlinemath data="n"></inlinemath> 个不同点的取值唯一确定该多项式.</p>,
<p>考虑反证法.</p>,
<p>假设两个不同的多项式 <inlinemath data="A(x)"></inlinemath> 和 <inlinemath data="B(x)"></inlinemath>，它们满足，对 <inlinemath data="%5Cforall%20i%5Cin%5B0,n-1%5D"></inlinemath>，总有 <inlinemath data="A(x_i)=B(x_i)"></inlinemath>.</p>,
<p>令 <inlinemath data="T(x)=A(x)-B(x)"></inlinemath>，则对 <inlinemath data="%5Cforall%20i%5Cin%5B0,n-1%5D"></inlinemath>，都有 <inlinemath data="T(x)=0"></inlinemath>.</p>,
<p>也就是说，<inlinemath data="n-1"></inlinemath> 次多项式 <inlinemath data="T(x)"></inlinemath> 有 <inlinemath data="n"></inlinemath> 个根，和代数基本定理（一个 <inlinemath data="n-1"></inlinemath> 次多项式<strong>在复数域上</strong>有且仅有 <inlinemath data="n-1"></inlinemath> 个根）矛盾，假设不成立，证毕.</p>,
<hr />,
<p>通过系数表示求点值表示，复杂度为 <inlinemath data="O(n%5E2)"></inlinemath>.</p>,
<p>通过点值表示求系数表示，可以使用<strong>插值</strong>算法，其朴素形式复杂度为 <inlinemath data="O(n%5E2)"></inlinemath>.</p>,
<p>若已知 <inlinemath data="A(x)"></inlinemath> 和 <inlinemath data="B(x)"></inlinemath> 的点值表示 <inlinemath data="(a_0,a_1,%5Cdots,a_%7Bn-1%7D)"></inlinemath> 和 <inlinemath data="(b_0,b_1,%5Cdots,b_%7Bn-1%7D)"></inlinemath>，那么多项式乘积 <inlinemath data="C(x)=A(x)%5Ccdot%20B(x)"></inlinemath> 可以简单地表示为</p>,
<blockmath data="%5Cboxed%7B(a_0%5Ccdot%20b_0,a_1%5Ccdot%20b_1,%5Cdots,a_%7Bn-1%7D%5Ccdot%20b_%7Bn-1%7D)%7D%0A"></blockmath>,
<p>设 <inlinemath data="A(x)"></inlinemath> 的点值表示有 <inlinemath data="r"></inlinemath> 项，<inlinemath data="B(x)"></inlinemath> 的有 <inlinemath data="s"></inlinemath> 项，为了保证所得能确定唯一的 <inlinemath data="C(x)"></inlinemath>，<strong>我们需要在 <inlinemath data="A"></inlinemath>、<inlinemath data="B"></inlinemath> 中至少取 <inlinemath data="r+s"></inlinemath> 个插值节点</strong>.</p>,
<p>倘若能快速地转换<strong>点值表示法</strong>和<strong>系数表示法</strong>，求 <inlinemath data="C(x)"></inlinemath> 的过程就会被大大加速.</p>,
<hr />,
<p>确定了方向，让我们来捋一捋 DFT 求算 <inlinemath data="C(x)"></inlinemath> 的思路，以便于思考.</p>,
<ol>
<li>输入 <inlinemath data="A(x)"></inlinemath> 和 <inlinemath data="B(x)"></inlinemath> 的系数表示；</li>
<li>将其分别转换为点值表达式；</li>
<li>通过这两个点值表达式计算 <inlinemath data="C(x)"></inlinemath> 的点值表达式；</li>
<li>将 <inlinemath data="C(x)"></inlinemath> 的点值表示转化为系数表示，即为结果.</li>
</ol>,
<hr />,
<h2 id="t-3" tabindex="-1" class="heading">单位复数根模型 <a class="cursor header-anchor" href="#t-3">¶</a></h2>,
<p>互联网上有很多相关的资料，这里只提一下后面要用的引理.</p>,
<ol>
<li><inlinemath data="%5Comega_n%5Ek=%5Ccos(2%5Cpi%5Ccdot%5Cdfrac%7Bk%7D%7Bn%7D)+i%5Csin(2%5Cpi%5Ccdot%5Cdfrac%7Bk%7D%7Bn%7D)"></inlinemath>；</li>
<li><inlinemath data="%5Comega_n%5Ek=%5Comega_n%5E%7Bk%5Cmod%20n%7D"></inlinemath>；</li>
<li>（折半引理）<inlinemath data="%5Comega%5E%7B2k%7D_%7B2n%7D=%5Comega%5Ek_n"></inlinemath>；</li>
<li>（消去引理）<inlinemath data="%5Comega%5E%7Bk+n/2%7D_n=-%5Comega%5Ek_n"></inlinemath>.</li>
</ol>,
<p>确保理解前置知识过后，我们进入正题.</p>,
<hr />,
<h2 id="t-4" tabindex="-1" class="heading">离散傅里叶变换 <a class="cursor header-anchor" href="#t-4">¶</a></h2>,
<p>考虑一个 <inlinemath data="n"></inlinemath> 项多项式 <inlinemath data="A(x)"></inlinemath>，其中 <inlinemath data="n=2%5Ex"></inlinemath>，<inlinemath data="x%5Cin%5Cmathbb%7BN%7D%5E*"></inlinemath>，不足 <inlinemath data="2%5Ex"></inlinemath> 的补系数为 <inlinemath data="0"></inlinemath> 的项.</p>,
<blockmath data="A(x)=a_0+a_1x+a_2x%5E2+%5Ccdots+a_%7Bn-1%7Dx%5E%7Bn-1%7D%0A"></blockmath>,
<p>倘若取 <inlinemath data="n"></inlinemath> 次单位根的 <inlinemath data="0%5Csim%20n-1"></inlinemath> 次幂，分别代入 <inlinemath data="A(x)"></inlinemath>，得到一个点值向量 <inlinemath data="(A(%5Comega_n%5E0),A(%5Comega_n%5E1),%5Cdots,A(%5Comega_n%5E%7Bn-1%7D))"></inlinemath>.</p>,
<p>对给定多项式进行这样操作的过程，称为<strong>离散傅里叶变换</strong>（Discrete Fourier Transform, DFT）.</p>,
<p>显然，如果直接代入，DFT 的朴素实现仍然很低效.</p>,
<p>考虑对其优化.</p>,
<hr />,
<p>对于任意多项式 <inlinemath data="A(x)=a_0+a_1x+a_2x%5E2+%5Ccdots+a_%7Bn-1%7Dx%5E%7Bn-1%7D"></inlinemath>，将每一项按照幂次的奇偶分组：</p>,
<blockmath data="%5Cbegin%7Balign*%7D%0AA(x)&amp;=(a_0+a_2x%5E2+a_4x%5E4+%5Ccdots+a_%7Bn-2%7Dx%5E%7Bn-2%7D)+(a_1x%5E1+a_3x%5E3+a_5x%5E5+%5Cdots+a_%7Bn-1%7Dx%5E%7Bn-1%7D)%5C%5C%0A&amp;=(a_0+a_2x%5E2+a_4x%5E4+%5Ccdots+a_%7Bn-2%7Dx%5E%7Bn-2%7D)+x%5Ccdot(a_1+a_3x%5E2+a_5x%5E4+%5Cdots+a_%7Bn-1%7Dx%5E%7Bn-2%7D)%0A%5Cend%7Balign*%7D"></blockmath>,
<p>令</p>,
<blockmath data="A_1(x)=a_0+a_2x+a_4x%5E2+%5Ccdots+a_%7Bn-2%7Dx%5E%7B(n-2)/2%7D%0A"></blockmath>,
<blockmath data="A_2(x)=a_1+a_3x+a_5x%5E2+%5Ccdots+a_%7Bn-1%7Dx%5E%7B(n-2)/2%7D%0A"></blockmath>,
<p>那么，有</p>,
<blockmath data="%5Cboxed%7BA(x)=A_1(x%5E2)+x%5Ccdot%20A_2(x%5E2)%7D%0A"></blockmath>,
<p>对于 <inlinemath data="%5Cforall%20k%5Cin%5B0,n-1%5D"></inlinemath>，<inlinemath data="k%5Cin%5Cmathbb%7BR%7D"></inlinemath>，</p>,
<blockmath data="A(%5Comega_n%5Ek)=A_1(%5Comega_n%5E%7B2k%7D)+%5Comega%5Ek_n%5Ccdot%20A_2(%5Comega_n%5E%7B2k%7D)%0A"></blockmath>,
<p>考虑如何简化右式.</p>,
<hr />,
<p><strong>注意</strong>，请牢记 <inlinemath data="n"></inlinemath> 是 <inlinemath data="2"></inlinemath> 的整数次幂，即 <inlinemath data="n=2%5Ex"></inlinemath>.</p>,
<p>对于 <inlinemath data="k%5Cin%5B0,%5Cdfrac%7Bn%7D%7B2%7D-1%5D"></inlinemath> 的部分（<inlinemath data="%5Cdfrac%7Bn%7D%7B2%7D"></inlinemath> 是整数）：</p>,
<blockmath data="%5Cbegin%7Balign*%7D%0AA(%5Comega_n%5Ek)&amp;=A_1(%5Comega_n%5E%7B2k%7D)+%5Comega%5Ek_n%5Ccdot%20A_2(%5Comega_n%5E%7B2k%7D)%5C%5C%0A&amp;=%5Cboxed%7BA_1(%5Comega_%7Bn/2%7D%5Ek)+%5Comega%5Ek_n%5Ccdot%20A_2(%5Comega_%7Bn/2%7D%5Ek)%7D%0A%5Cend%7Balign*%7D"></blockmath>,
<p>对于 <inlinemath data="k+%5Cdfrac%7Bn%7D%7B2%7D%5Cin%5B%5Cdfrac%7Bn%7D%7B2%7D,n-1%5D"></inlinemath> 的部分：</p>,
<blockmath data="A(%5Comega_n%5E%7Bk+n/2%7D)=A_1(%5Comega_n%5E%7B2k+n%7D)+%5Comega%5E%7Bk+n/2%7D_n%5Ccdot%20A_2(%5Comega_n%5E%7B2k+n%7D)%0A"></blockmath>,
<p>注意到：</p>,
<blockmath data="%5Comega%5E%7B2k+n%7D_n=%5Comega%5E%7B2k%7D_n%5Ccdot%5Comega_n%5En=%5Comega%5E%7B2k%7D_n=%5Comega%5Ek_%7Bn/2%7D%0A"></blockmath>,
<p>和</p>,
<blockmath data="%5Comega%5E%7Bk+n/2%7D_%7Bn%7D=-%5Comega%5Ek_n%0A"></blockmath>,
<p>则有：</p>,
<blockmath data="%5Cboxed%7BA(%5Comega_n%5E%7Bk+n/2%7D)=A_1(%5Comega%5Ek_%7Bn/2%7D)-%5Comega%5Ek_n%5Ccdot%20A_2(%5Comega%5Ek_%7Bn/2%7D)%7D%0A"></blockmath>,
<p><inlinemath data="k"></inlinemath> 与 <inlinemath data="k+%5Cdfrac%7Bn%7D%7B2%7D"></inlinemath> 取遍了 <inlinemath data="0%5Csim%20n-1"></inlinemath> 这 <inlinemath data="n"></inlinemath> 个整数，因此能通过这 <inlinemath data="n"></inlinemath> 个点值反解系数.</p>,
<hr />,
<p>把这两个式子写在一起：</p>,
<blockmath data="A(%5Comega_n%5Ek)=A_1(%5Comega_%7Bn/2%7D%5Ek)+%5Comega%5Ek_n%5Ccdot%20A_2(%5Comega_%7Bn/2%7D%5Ek)%0A"></blockmath>,
<blockmath data="A(%5Comega_n%5E%7Bk+n/2%7D)=A_1(%5Comega%5Ek_%7Bn/2%7D)-%5Comega%5Ek_n%5Ccdot%20A_2(%5Comega%5Ek_%7Bn/2%7D)%0A"></blockmath>,
<p>只要知道 <inlinemath data="%5Comega_%7Bn/2%7D%5E0,%5Comega_%7Bn/2%7D%5E1,%5Cdots,%5Comega_%7Bn/2%7D%5E%7Bn/2-1%7D"></inlinemath>，转化为子问题，就可以在 <inlinemath data="O(n%5Clog%20n)"></inlinemath> 的时间内求得 <inlinemath data="A(x)"></inlinemath>.</p>,
<p>这个过程就是 DFT.</p>,
<hr />,
<h2 id="t-5" tabindex="-1" class="heading">离散傅里叶反变换 <a class="cursor header-anchor" href="#t-5">¶</a></h2>,
<p>将用单位根求出的点值表示的多项式转化为系数表示，这个过程即为<strong>离散傅里叶反变换</strong>（Inverse Discrete Fourier Transform）.</p>,
<p>也就是说，要通过插值为单位根的 <inlinemath data="n"></inlinemath> 维点值向量 <inlinemath data="(A(%5Comega_n%5E0),A(%5Comega_n%5E1),%5Cdots,A(%5Comega_n%5E%7Bn-1%7D))"></inlinemath> 推出 <inlinemath data="n"></inlinemath> 维系数向量 <inlinemath data="(a_0,a_1,%5Cdots,a_%7Bn-1%7D)"></inlinemath>.</p>,
<p>可以把离散傅里叶反变换理解为离散傅里叶变换的逆操作.</p>,
<p>假设 <inlinemath data="(a_0,a_1,%5Cdots,a_%7Bn-1%7D)"></inlinemath> 进行一次 DFT 的结果是 <inlinemath data="(d_0,d_1,%5Cdots,d_%7Bn-1%7D)"></inlinemath>.</p>,
<p>构造辅助多项式：</p>,
<blockmath data="F(x)=d_0+d_1x+d_2x%5E2+%5Ccdots+d_%7Bn-1%7Dx%5E%7Bn-1%7D%0A"></blockmath>,
<p>在 <inlinemath data="F(x)"></inlinemath> 中，<inlinemath data="(d_0,d_1,%5Cdots,d_%7Bn-1%7D)"></inlinemath> 是系数向量.</p>,
<hr />,
<p>取插值节点 <inlinemath data="x_k=%5Comega_n%5E%7B-k%7D"></inlinemath>（<inlinemath data="k%5Cin%5B0,n-1%5D"></inlinemath>），将其代入 <inlinemath data="F(x)"></inlinemath>，得到另一组点值向量 <inlinemath data="(c_0,c_1,%5Cdots,c_%7Bn-1%7D)"></inlinemath>.</p>,
<p>也就是说：</p>,
<blockmath data="c_k=%5Csum_%7Bi=0%7D%5E%7Bn-1%7Dd_ix_k%5Ei=%5Csum_%7Bi=0%7D%5E%7Bn-1%7Dd_i(%5Comega_n%5E%7B-k%7D)%5Ei%0A"></blockmath>,
<p>将 <inlinemath data="d_i"></inlinemath> 还原，并化简 <inlinemath data="c_k"></inlinemath>：</p>,
<blockmath data="%5Cbegin%7Balign*%7D%0Ac_k&amp;=%5Csum_%7Bi=0%7D%5E%7Bn-1%7D%5B%5Csum_%7Bj=0%7D%5E%7Bn-1%7Da_j%5Ccdot(%5Comega_n%5Ei)%5Ej%5D%5Ccdot(%5Comega_n%5E%7B-k%7D)%5Ei%5C%5C%0A&amp;=%5Csum_%7Bj=0%7D%5E%7Bn-1%7Da_j%5Csum_%7Bi=0%7D%5E%7Bn-1%7D(%5Comega_%7Bn%7D%5E%7Bi%7D)%5E%7Bj-k%7D%0A%5Cend%7Balign*%7D"></blockmath>,
<hr />,
<p>考虑这个式子的右半部分，令：</p>,
<blockmath data="%5Cboxed%7BS(%5Cdelta)=%5Csum_%7Bi=0%7D%5E%7Bn-1%7D(%5Comega_%7Bn%7D%5E%7Bi%7D)%5E%5Cdelta%7D%0A"></blockmath>,
<p>则有 <inlinemath data="c_k=%5Csum%5Climits_%7Bj=0%7D%5E%7Bn-1%7Da_j%5Ccdot%20S(j-k)"></inlinemath>，</p>,
<blockmath data="S(%5Cdelta)=%5Comega_n%5E0+%5Comega_n%5E%5Cdelta+%5Comega_n%5E%7B2%5Cdelta%7D+%5Ccdots+%5Comega_n%5E%7B(n-1)%5Cdelta%7D%0A"></blockmath>,
<p>注意到 <inlinemath data="%5Comega_n%5E%5Cdelta%5Cneq1"></inlinemath> 时，这是一个等比数列.</p>,
<p>分类讨论 <inlinemath data="%5Cdelta"></inlinemath>.</p>,
<hr />,
<p>如果 <inlinemath data="%5Comega_n%5E%5Cdelta=1"></inlinemath>，有 <inlinemath data="%5Cdelta=0"></inlinemath>，则：</p>,
<blockmath data="S(j-k)=S(%5Cdelta)=S(0)=n%0A"></blockmath>,
<p><inlinemath data="j-k=0"></inlinemath>，即 <inlinemath data="j=k"></inlinemath> 时，<inlinemath data="S(%5Cdelta)=n"></inlinemath>.</p>,
<hr />,
<p>如果 <inlinemath data="%5Comega_n%5E%5Cdelta%5Cneq1"></inlinemath>，有 <inlinemath data="%5Cdelta%5Cneq0"></inlinemath>，则 <inlinemath data="S(%5Cdelta)"></inlinemath> 是公比为 <inlinemath data="%5Comega_n%5E%5Cdelta"></inlinemath> 的等比数列.</p>,
<p>根据等比数列求和公式：</p>,
<blockmath data="%5Cbegin%7Balign*%7D%0AS(%5Cdelta)&amp;=%5Cdfrac%7B%5Comega_%7Bn%7D%5E%7B0%7D%5B(%5Comega_%7Bn%7D%5E%7B%5Cdelta%7D)%5E%7Bn%7D-1%5D%7D%7B%5Comega_%7Bn%7D%5E%7B%5Cdelta%7D-1%7D%5C%5C%0A&amp;=%5Cdfrac%7B1%5Ccdot%5B(%5Comega_%7Bn%7D%5E%7Bn%7D)%5E%7B%5Cdelta%7D-1%5D%7D%7B%5Comega_%7Bn%7D%5E%7B%5Cdelta%7D-1%7D%5C%5C%0A&amp;=%5Cdfrac%7B%5B1%5E%7B%5Cdelta%7D-1%5D%7D%7B%5Comega_%7Bn%7D%5E%7B%5Cdelta%7D-1%7D%5C%5C%0A&amp;=%5Cdfrac%7B0%7D%7B%5Comega_%7Bn%7D%5E%7B%5Cdelta%7D-1%7D%5C%5C%0A&amp;=0%0A%5Cend%7Balign*%7D"></blockmath>,
<p>也就是说，<inlinemath data="j%5Cneq%20k"></inlinemath> 时，<inlinemath data="S(%5Cdelta)=0"></inlinemath>.</p>,
<hr />,
<p>故 <inlinemath data="S(j-k)"></inlinemath> 是这样一个分段函数：</p>,
<blockmath data="S(j-k)=%5Cleft%5C%7B%5Cbegin%7Balign*%7D%0A&amp;n%20&amp;(j=k)%5C%5C%0A&amp;0%20&amp;(j%5Cneq%20k)%0A%5Cend%7Balign*%7D%5Cright."></blockmath>,
<p>将其代入原式：</p>,
<blockmath data="c_k=%5Csum_%7Bj=0%7D%5E%7Bn-1%7Da_j%5Ccdot%20S(j-k)=a_k%5Ccdot%20n%0A"></blockmath>,
<p>得到：</p>,
<blockmath data="%5Cboxed%7Ba_k=%5Cdfrac%7Bc_k%7D%7Bn%7D%7D%0A"></blockmath>,
<p>这里的 <inlinemath data="a_k"></inlinemath> 就是原式的系数.</p>,
<p>（忍不住说一声，这个式子太简洁了，向研究傅里叶变换的前辈们致以崇高的敬意！）</p>,
<hr />,
<p>由此我们可以得到以下步骤：</p>,
<ol>
<li>
<p>对多项式 <inlinemath data="A(x)"></inlinemath>，将其用插值节点 <inlinemath data="(%5Comega_n%5E0,%5Comega_n%5E1,%5Cdots,%5Comega_n%5E%7Bn-1%7D)"></inlinemath> 进行一次 DFT，得到 <inlinemath data="(d_0,d_1,%5Cdots,d_%7Bn-1%7D)"></inlinemath>.</p>
</li>
<li>
<p>我们再将 <inlinemath data="(%5Comega_n%5E0,%5Comega_n%5E1,%5Cdots,%5Comega_n%5E%7Bn-1%7D)"></inlinemath> 作为系数，用插值节点 <inlinemath data="(%5Comega_n%5E%7B-0%7D,%5Comega_n%5E%7B-1%7D,%5Cdots,%5Comega_n%5E%7B-(n-1)%7D)"></inlinemath> 再进行一次 DFT，得到 <inlinemath data="(c_0,c_1,%5Cdots,c_%7Bn-1%7D)"></inlinemath>.</p>
</li>
<li>
<p>将 <inlinemath data="(c_0,c_1,%5Cdots,c_%7Bn-1%7D)"></inlinemath> 每一项除以 <inlinemath data="n"></inlinemath>，得到的向量就是我们要求的 <inlinemath data="(a_0,a_1,%5Cdots,a_%7Bn-1%7D)"></inlinemath>.</p>
</li>
</ol>,
<p>这个过程就是 IDFT.</p>,
<hr />,
<h2 id="t-6" tabindex="-1" class="heading">快速傅里叶变换 <a class="cursor header-anchor" href="#t-6">¶</a></h2>,
<p>略讲一下 FFT 的原理.</p>,
<ol>
<li>给定多项式 <inlinemath data="A(x)"></inlinemath> 和 <inlinemath data="B(x)"></inlinemath>，得到其系数表示.</li>
<li>对 <inlinemath data="A(x)"></inlinemath> 和 <inlinemath data="B(x)"></inlinemath> 分别进行 DFT，得到两个点值向量.</li>
<li>对这两个点值向量每一项相乘，得到一个点值向量.</li>
<li>对这个点值向量进行 IDFT，即得到所求 <inlinemath data="C(x)"></inlinemath> 的系数表示.</li>
</ol>,
<p>以后可能会在另一篇文章补上 FFT 的代码实现，敬请期待.</p>,
<hr />,
<h2 id="t-7" tabindex="-1" class="heading">Reference <a class="cursor header-anchor" href="#t-7">¶</a></h2>,
<ul>
<li>参考 <anchor href="https://zhuanlan.zhihu.com/p/31584464">「一小时学会快速傅里叶变换」</anchor> by <anchor href="https://www.zhihu.com/people/whitebunny">白空谷</anchor></li>
<li>参考 <anchor href="https://zh.wikipedia.org/wiki/%E7%A6%BB%E6%95%A3%E5%82%85%E9%87%8C%E5%8F%B6%E5%8F%98%E6%8D%A2">「维基百科 - 离散傅里叶变换」</anchor></li>
<li>参考 <anchor href="https://zh.wikipedia.org/wiki/%E5%BF%AB%E9%80%9F%E5%82%85%E9%87%8C%E5%8F%B6%E5%8F%98%E6%8D%A2">「维基百科 - 快速傅里叶变换」</anchor></li>
</ul>,
];
