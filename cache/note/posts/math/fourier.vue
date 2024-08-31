<script setup>import {onMounted} from "vue";const emit = defineEmits(['mounted']);onMounted(()=>{emit("mounted")})</script><template><p><strong>离散傅里叶变换</strong>（Discrete Fourier Transform, DFT）和<strong>离散傅里叶反变换</strong>（Inverse Discrete Fourier Transform, IDFT） 是鼎鼎大名的<strong>快速傅里叶变换</strong>（Fast Fourier Transform, FFT）的前置知识.</p>
<p>其中 FFT 用于加速两个多项式 <inline-math data="A(x)"></inline-math>、<inline-math data="B(x)"></inline-math> 的乘积 <inline-math data="C(x)"></inline-math> 的计算，DFT 和 IDFT 是 FFT 的两个中间步骤.</p>
<!-- more -->
<p>需要明确，给定的是两个多项式：</p>
<block-math data="%5Cleft%5C%7B%5Cbegin%7Balign*%7D%0AA(x)&=a_0+a_1x+a_2x%5E2+%5Ccdots+a_%7Bn-1%7Dx%5E%7Bn-1%7D%5C%5C%0AB(x)&=b_0+b_1x+b_2x%5E2+%5Ccdots+b_%7Bm-1%7Dx%5E%7Bm-1%7D%0A%5Cend%7Balign*%7D%5Cright."></block-math><p>其中 <inline-math data="A(x)"></inline-math> 是一个 <inline-math data="n"></inline-math> 项多项式，<inline-math data="B(x)"></inline-math> 是一个 <inline-math data="m"></inline-math> 项多项式.</p>
<p>我们要求的多项式函数 <inline-math data="C(x)"></inline-math> 为一个 <inline-math data="n+m-1"></inline-math> 项的多项式（考虑最低项 <inline-math data="x"></inline-math> 的幂次为 <inline-math data="1"></inline-math>，最高项为 <inline-math data="n-1+m-1=n+m-2"></inline-math>，共 <inline-math data="1+(n+m-2)=n+m-1"></inline-math> 项）.</p>
<p>要了解 DFT 和 IDFT，还需要一些前置知识.</p>
<hr />
<h2 id="t" tabindex="-1" class="heading">多项式的系数表示法 <a class="cursor header-anchor" href="#t">¶</a></h2>
<p>我们平时用的多项式系数 <inline-math data="a_0,a_1,%5Cdots,a_%7Bn-1%7D"></inline-math> 就属于多项式的系数表示法.</p>
<p>我们称 <inline-math data="n"></inline-math> 维系数向量 <inline-math data="(a_0,a_1,%5Cdots,a_%7Bn-1%7D)"></inline-math> 为 <inline-math data="A(x)"></inline-math> 的<strong>系数表示</strong>，其中：</p>
<block-math data="%5Cboxed%7BA(x)=%5Csum_%7Bi=0%7D%5E%7Bn-1%7Da_i%5Ccdot%20x%5Ei%7D%0A"></block-math><p>对于 <inline-math data="A(x)"></inline-math> 的系数表示 <inline-math data="(a_0,a_1,%5Cdots,a_%7Bn-1%7D)"></inline-math> 和 <inline-math data="B(x)"></inline-math> 的系数表示 <inline-math data="(b_0,b_1,%5Cdots,b_%7Bm-1%7D)"></inline-math>，要求 <inline-math data="C(x)"></inline-math> 的系数表示，显然可以通过以下代码实现:</p>
<pre class="language-cpp"><code class="language-cpp"><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> m<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span>
        c<span class="token punctuation">[</span>i <span class="token operator">+</span> j<span class="token punctuation">]</span> <span class="token operator">+=</span> a<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">*</span> b<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre>
<p>得到的 <inline-math data="C(x)"></inline-math> 为 <inline-math data="n+m-1"></inline-math> 项多项式.</p>
<p>这个朴素算法的时间复杂度是 <inline-math data="O(n%5E2)"></inline-math> 的.</p>
<hr />
<h2 id="t-2" tabindex="-1" class="heading">多项式的点值表示法 <a class="cursor header-anchor" href="#t-2">¶</a></h2>
<p>点值表示法是 DFT 算法的核心.</p>
<p>我们在 <inline-math data="%5Cmathbb%7BC%7D"></inline-math> 上<strong>任意</strong>取一组<strong>不同</strong>的 <inline-math data="x_i"></inline-math>，共 <inline-math data="n"></inline-math> 个，记为向量 <inline-math data="(x_0,x_1,%5Cdots,x_%7Bn-1%7D)"></inline-math>，这里的 <inline-math data="x_i"></inline-math> 称为<strong>插值节点</strong>.</p>
<p>将每个 <inline-math data="x_i"></inline-math> 分别代入 <inline-math data="A(x)"></inline-math>，得到一组共 <inline-math data="n"></inline-math> 个运算结果 <inline-math data="y_i"></inline-math>，记为向量 <inline-math data="(y_0,y_1,%5Cdots,y_%7Bn-1%7D)"></inline-math>.</p>
<p>也就是说，求</p>
<block-math data="%5Cboxed%7By_i=A(x_i)=%5Csum_%7Bj=0%7D%5E%7Bn-1%7Da_j%5Ccdot%20x_i%5Ej%7D%0A"></block-math><p>向量 <inline-math data="(y_0,y_1,%5Cdots,y_%7Bn-1%7D)"></inline-math> 称为多项式 <inline-math data="A(x)"></inline-math> 的<strong>点值表示</strong>.</p>
<hr />
<p>下面我们证明，一个 <inline-math data="n"></inline-math> 项多项式（<inline-math data="n-1"></inline-math> 次）在 <inline-math data="n"></inline-math> 个不同点的取值唯一确定该多项式.</p>
<p>考虑反证法.</p>
<p>假设两个不同的多项式 <inline-math data="A(x)"></inline-math> 和 <inline-math data="B(x)"></inline-math>，它们满足，对 <inline-math data="%5Cforall%20i%5Cin%5B0,n-1%5D"></inline-math>，总有 <inline-math data="A(x_i)=B(x_i)"></inline-math>.</p>
<p>令 <inline-math data="T(x)=A(x)-B(x)"></inline-math>，则对 <inline-math data="%5Cforall%20i%5Cin%5B0,n-1%5D"></inline-math>，都有 <inline-math data="T(x)=0"></inline-math>.</p>
<p>也就是说，<inline-math data="n-1"></inline-math> 次多项式 <inline-math data="T(x)"></inline-math> 有 <inline-math data="n"></inline-math> 个根，和代数基本定理（一个 <inline-math data="n-1"></inline-math> 次多项式<strong>在复数域上</strong>有且仅有 <inline-math data="n-1"></inline-math> 个根）矛盾，假设不成立，证毕.</p>
<hr />
<p>通过系数表示求点值表示，复杂度为 <inline-math data="O(n%5E2)"></inline-math>.</p>
<p>通过点值表示求系数表示，可以使用<strong>插值</strong>算法，其朴素形式复杂度为 <inline-math data="O(n%5E2)"></inline-math>.</p>
<p>若已知 <inline-math data="A(x)"></inline-math> 和 <inline-math data="B(x)"></inline-math> 的点值表示 <inline-math data="(a_0,a_1,%5Cdots,a_%7Bn-1%7D)"></inline-math> 和 <inline-math data="(b_0,b_1,%5Cdots,b_%7Bn-1%7D)"></inline-math>，那么多项式乘积 <inline-math data="C(x)=A(x)%5Ccdot%20B(x)"></inline-math> 可以简单地表示为</p>
<block-math data="%5Cboxed%7B(a_0%5Ccdot%20b_0,a_1%5Ccdot%20b_1,%5Cdots,a_%7Bn-1%7D%5Ccdot%20b_%7Bn-1%7D)%7D%0A"></block-math><p>设 <inline-math data="A(x)"></inline-math> 的点值表示有 <inline-math data="r"></inline-math> 项，<inline-math data="B(x)"></inline-math> 的有 <inline-math data="s"></inline-math> 项，为了保证所得能确定唯一的 <inline-math data="C(x)"></inline-math>，<strong>我们需要在 <inline-math data="A"></inline-math>、<inline-math data="B"></inline-math> 中至少取 <inline-math data="r+s"></inline-math> 个插值节点</strong>.</p>
<p>倘若能快速地转换<strong>点值表示法</strong>和<strong>系数表示法</strong>，求 <inline-math data="C(x)"></inline-math> 的过程就会被大大加速.</p>
<hr />
<p>确定了方向，让我们来捋一捋 DFT 求算 <inline-math data="C(x)"></inline-math> 的思路，以便于思考.</p>
<ol>
<li>输入 <inline-math data="A(x)"></inline-math> 和 <inline-math data="B(x)"></inline-math> 的系数表示；</li>
<li>将其分别转换为点值表达式；</li>
<li>通过这两个点值表达式计算 <inline-math data="C(x)"></inline-math> 的点值表达式；</li>
<li>将 <inline-math data="C(x)"></inline-math> 的点值表示转化为系数表示，即为结果.</li>
</ol>
<hr />
<h2 id="t-3" tabindex="-1" class="heading">单位复数根模型 <a class="cursor header-anchor" href="#t-3">¶</a></h2>
<p>互联网上有很多相关的资料，这里只提一下后面要用的引理.</p>
<ol>
<li><inline-math data="%5Comega_n%5Ek=%5Ccos(2%5Cpi%5Ccdot%5Cdfrac%7Bk%7D%7Bn%7D)+i%5Csin(2%5Cpi%5Ccdot%5Cdfrac%7Bk%7D%7Bn%7D)"></inline-math>；</li>
<li><inline-math data="%5Comega_n%5Ek=%5Comega_n%5E%7Bk%5Cmod%20n%7D"></inline-math>；</li>
<li>（折半引理）<inline-math data="%5Comega%5E%7B2k%7D_%7B2n%7D=%5Comega%5Ek_n"></inline-math>；</li>
<li>（消去引理）<inline-math data="%5Comega%5E%7Bk+n/2%7D_n=-%5Comega%5Ek_n"></inline-math>.</li>
</ol>
<p>确保理解前置知识过后，我们进入正题.</p>
<hr />
<h2 id="t-4" tabindex="-1" class="heading">离散傅里叶变换 <a class="cursor header-anchor" href="#t-4">¶</a></h2>
<p>考虑一个 <inline-math data="n"></inline-math> 项多项式 <inline-math data="A(x)"></inline-math>，其中 <inline-math data="n=2%5Ex"></inline-math>，<inline-math data="x%5Cin%5Cmathbb%7BN%7D%5E*"></inline-math>，不足 <inline-math data="2%5Ex"></inline-math> 的补系数为 <inline-math data="0"></inline-math> 的项.</p>
<block-math data="A(x)=a_0+a_1x+a_2x%5E2+%5Ccdots+a_%7Bn-1%7Dx%5E%7Bn-1%7D%0A"></block-math><p>倘若取 <inline-math data="n"></inline-math> 次单位根的 <inline-math data="0%5Csim%20n-1"></inline-math> 次幂，分别代入 <inline-math data="A(x)"></inline-math>，得到一个点值向量 <inline-math data="(A(%5Comega_n%5E0),A(%5Comega_n%5E1),%5Cdots,A(%5Comega_n%5E%7Bn-1%7D))"></inline-math>.</p>
<p>对给定多项式进行这样操作的过程，称为<strong>离散傅里叶变换</strong>（Discrete Fourier Transform, DFT）.</p>
<p>显然，如果直接代入，DFT 的朴素实现仍然很低效.</p>
<p>考虑对其优化.</p>
<hr />
<p>对于任意多项式 <inline-math data="A(x)=a_0+a_1x+a_2x%5E2+%5Ccdots+a_%7Bn-1%7Dx%5E%7Bn-1%7D"></inline-math>，将每一项按照幂次的奇偶分组：</p>
<block-math data="%5Cbegin%7Balign*%7D%0AA(x)&=(a_0+a_2x%5E2+a_4x%5E4+%5Ccdots+a_%7Bn-2%7Dx%5E%7Bn-2%7D)+(a_1x%5E1+a_3x%5E3+a_5x%5E5+%5Cdots+a_%7Bn-1%7Dx%5E%7Bn-1%7D)%5C%5C%0A&=(a_0+a_2x%5E2+a_4x%5E4+%5Ccdots+a_%7Bn-2%7Dx%5E%7Bn-2%7D)+x%5Ccdot(a_1+a_3x%5E2+a_5x%5E4+%5Cdots+a_%7Bn-1%7Dx%5E%7Bn-2%7D)%0A%5Cend%7Balign*%7D"></block-math><p>令</p>
<block-math data="A_1(x)=a_0+a_2x+a_4x%5E2+%5Ccdots+a_%7Bn-2%7Dx%5E%7B(n-2)/2%7D%0A"></block-math><block-math data="A_2(x)=a_1+a_3x+a_5x%5E2+%5Ccdots+a_%7Bn-1%7Dx%5E%7B(n-2)/2%7D%0A"></block-math><p>那么，有</p>
<block-math data="%5Cboxed%7BA(x)=A_1(x%5E2)+x%5Ccdot%20A_2(x%5E2)%7D%0A"></block-math><p>对于 <inline-math data="%5Cforall%20k%5Cin%5B0,n-1%5D"></inline-math>，<inline-math data="k%5Cin%5Cmathbb%7BR%7D"></inline-math>，</p>
<block-math data="A(%5Comega_n%5Ek)=A_1(%5Comega_n%5E%7B2k%7D)+%5Comega%5Ek_n%5Ccdot%20A_2(%5Comega_n%5E%7B2k%7D)%0A"></block-math><p>考虑如何简化右式.</p>
<hr />
<p>{% note info info %}
<strong>注意</strong>，请牢记 <inline-math data="n"></inline-math> 是 <inline-math data="2"></inline-math> 的整数次幂，即 <inline-math data="n=2%5Ex"></inline-math>.
{% endnote %}</p>
<p>对于 <inline-math data="k%5Cin%5B0,%5Cdfrac%7Bn%7D%7B2%7D-1%5D"></inline-math> 的部分（<inline-math data="%5Cdfrac%7Bn%7D%7B2%7D"></inline-math> 是整数）：</p>
<block-math data="%5Cbegin%7Balign*%7D%0AA(%5Comega_n%5Ek)&=A_1(%5Comega_n%5E%7B2k%7D)+%5Comega%5Ek_n%5Ccdot%20A_2(%5Comega_n%5E%7B2k%7D)%5C%5C%0A&=%5Cboxed%7BA_1(%5Comega_%7Bn/2%7D%5Ek)+%5Comega%5Ek_n%5Ccdot%20A_2(%5Comega_%7Bn/2%7D%5Ek)%7D%0A%5Cend%7Balign*%7D"></block-math><p>对于 <inline-math data="k+%5Cdfrac%7Bn%7D%7B2%7D%5Cin%5B%5Cdfrac%7Bn%7D%7B2%7D,n-1%5D"></inline-math> 的部分：</p>
<block-math data="A(%5Comega_n%5E%7Bk+n/2%7D)=A_1(%5Comega_n%5E%7B2k+n%7D)+%5Comega%5E%7Bk+n/2%7D_n%5Ccdot%20A_2(%5Comega_n%5E%7B2k+n%7D)%0A"></block-math><p>注意到：</p>
<block-math data="%5Comega%5E%7B2k+n%7D_n=%5Comega%5E%7B2k%7D_n%5Ccdot%5Comega_n%5En=%5Comega%5E%7B2k%7D_n=%5Comega%5Ek_%7Bn/2%7D%0A"></block-math><p>和</p>
<block-math data="%5Comega%5E%7Bk+n/2%7D_%7Bn%7D=-%5Comega%5Ek_n%0A"></block-math><p>则有：</p>
<block-math data="%5Cboxed%7BA(%5Comega_n%5E%7Bk+n/2%7D)=A_1(%5Comega%5Ek_%7Bn/2%7D)-%5Comega%5Ek_n%5Ccdot%20A_2(%5Comega%5Ek_%7Bn/2%7D)%7D%0A"></block-math><p><inline-math data="k"></inline-math> 与 <inline-math data="k+%5Cdfrac%7Bn%7D%7B2%7D"></inline-math> 取遍了 <inline-math data="0%5Csim%20n-1"></inline-math> 这 <inline-math data="n"></inline-math> 个整数，因此能通过这 <inline-math data="n"></inline-math> 个点值反解系数.</p>
<hr />
<p>把这两个式子写在一起：</p>
<block-math data="A(%5Comega_n%5Ek)=A_1(%5Comega_%7Bn/2%7D%5Ek)+%5Comega%5Ek_n%5Ccdot%20A_2(%5Comega_%7Bn/2%7D%5Ek)%0A"></block-math><block-math data="A(%5Comega_n%5E%7Bk+n/2%7D)=A_1(%5Comega%5Ek_%7Bn/2%7D)-%5Comega%5Ek_n%5Ccdot%20A_2(%5Comega%5Ek_%7Bn/2%7D)%0A"></block-math><p>只要知道 <inline-math data="%5Comega_%7Bn/2%7D%5E0,%5Comega_%7Bn/2%7D%5E1,%5Cdots,%5Comega_%7Bn/2%7D%5E%7Bn/2-1%7D"></inline-math>，转化为子问题，就可以在 <inline-math data="O(n%5Clog%20n)"></inline-math> 的时间内求得 <inline-math data="A(x)"></inline-math>.</p>
<p>这个过程就是 DFT.</p>
<hr />
<h2 id="t-5" tabindex="-1" class="heading">离散傅里叶反变换 <a class="cursor header-anchor" href="#t-5">¶</a></h2>
<p>将用单位根求出的点值表示的多项式转化为系数表示，这个过程即为<strong>离散傅里叶反变换</strong>（Inverse Discrete Fourier Transform）.</p>
<p>也就是说，要通过插值为单位根的 <inline-math data="n"></inline-math> 维点值向量 <inline-math data="(A(%5Comega_n%5E0),A(%5Comega_n%5E1),%5Cdots,A(%5Comega_n%5E%7Bn-1%7D))"></inline-math> 推出 <inline-math data="n"></inline-math> 维系数向量 <inline-math data="(a_0,a_1,%5Cdots,a_%7Bn-1%7D)"></inline-math>.</p>
<p>可以把离散傅里叶反变换理解为离散傅里叶变换的逆操作.</p>
<p>假设 <inline-math data="(a_0,a_1,%5Cdots,a_%7Bn-1%7D)"></inline-math> 进行一次 DFT 的结果是 <inline-math data="(d_0,d_1,%5Cdots,d_%7Bn-1%7D)"></inline-math>.</p>
<p>构造辅助多项式：</p>
<block-math data="F(x)=d_0+d_1x+d_2x%5E2+%5Ccdots+d_%7Bn-1%7Dx%5E%7Bn-1%7D%0A"></block-math><p>在 <inline-math data="F(x)"></inline-math> 中，<inline-math data="(d_0,d_1,%5Cdots,d_%7Bn-1%7D)"></inline-math> 是系数向量.</p>
<hr />
<p>取插值节点 <inline-math data="x_k=%5Comega_n%5E%7B-k%7D"></inline-math>（<inline-math data="k%5Cin%5B0,n-1%5D"></inline-math>），将其代入 <inline-math data="F(x)"></inline-math>，得到另一组点值向量 <inline-math data="(c_0,c_1,%5Cdots,c_%7Bn-1%7D)"></inline-math>.</p>
<p>也就是说：</p>
<block-math data="c_k=%5Csum_%7Bi=0%7D%5E%7Bn-1%7Dd_ix_k%5Ei=%5Csum_%7Bi=0%7D%5E%7Bn-1%7Dd_i(%5Comega_n%5E%7B-k%7D)%5Ei%0A"></block-math><p>将 <inline-math data="d_i"></inline-math> 还原，并化简 <inline-math data="c_k"></inline-math>：</p>
<block-math data="%5Cbegin%7Balign*%7D%0Ac_k&=%5Csum_%7Bi=0%7D%5E%7Bn-1%7D%5B%5Csum_%7Bj=0%7D%5E%7Bn-1%7Da_j%5Ccdot(%5Comega_n%5Ei)%5Ej%5D%5Ccdot(%5Comega_n%5E%7B-k%7D)%5Ei%5C%5C%0A&=%5Csum_%7Bj=0%7D%5E%7Bn-1%7Da_j%5Csum_%7Bi=0%7D%5E%7Bn-1%7D(%5Comega_%7Bn%7D%5E%7Bi%7D)%5E%7Bj-k%7D%0A%5Cend%7Balign*%7D"></block-math><hr />
<p>考虑这个式子的右半部分，令：</p>
<block-math data="%5Cboxed%7BS(%5Cdelta)=%5Csum_%7Bi=0%7D%5E%7Bn-1%7D(%5Comega_%7Bn%7D%5E%7Bi%7D)%5E%5Cdelta%7D%0A"></block-math><p>则有 <inline-math data="c_k=%5Csum%5Climits_%7Bj=0%7D%5E%7Bn-1%7Da_j%5Ccdot%20S(j-k)"></inline-math>，</p>
<block-math data="S(%5Cdelta)=%5Comega_n%5E0+%5Comega_n%5E%5Cdelta+%5Comega_n%5E%7B2%5Cdelta%7D+%5Ccdots+%5Comega_n%5E%7B(n-1)%5Cdelta%7D%0A"></block-math><p>注意到 <inline-math data="%5Comega_n%5E%5Cdelta%5Cneq1"></inline-math> 时，这是一个等比数列.</p>
<p>分类讨论 <inline-math data="%5Cdelta"></inline-math>.</p>
<hr />
<p>如果 <inline-math data="%5Comega_n%5E%5Cdelta=1"></inline-math>，有 <inline-math data="%5Cdelta=0"></inline-math>，则：</p>
<block-math data="S(j-k)=S(%5Cdelta)=S(0)=n%0A"></block-math><p><inline-math data="j-k=0"></inline-math>，即 <inline-math data="j=k"></inline-math> 时，<inline-math data="S(%5Cdelta)=n"></inline-math>.</p>
<hr />
<p>如果 <inline-math data="%5Comega_n%5E%5Cdelta%5Cneq1"></inline-math>，有 <inline-math data="%5Cdelta%5Cneq0"></inline-math>，则 <inline-math data="S(%5Cdelta)"></inline-math> 是公比为 <inline-math data="%5Comega_n%5E%5Cdelta"></inline-math> 的等比数列.</p>
<p>根据等比数列求和公式：</p>
<block-math data="%5Cbegin%7Balign*%7D%0AS(%5Cdelta)&=%5Cdfrac%7B%5Comega_%7Bn%7D%5E%7B0%7D%5B(%5Comega_%7Bn%7D%5E%7B%5Cdelta%7D)%5E%7Bn%7D-1%5D%7D%7B%5Comega_%7Bn%7D%5E%7B%5Cdelta%7D-1%7D%5C%5C%0A&=%5Cdfrac%7B1%5Ccdot%5B(%5Comega_%7Bn%7D%5E%7Bn%7D)%5E%7B%5Cdelta%7D-1%5D%7D%7B%5Comega_%7Bn%7D%5E%7B%5Cdelta%7D-1%7D%5C%5C%0A&=%5Cdfrac%7B%5B1%5E%7B%5Cdelta%7D-1%5D%7D%7B%5Comega_%7Bn%7D%5E%7B%5Cdelta%7D-1%7D%5C%5C%0A&=%5Cdfrac%7B0%7D%7B%5Comega_%7Bn%7D%5E%7B%5Cdelta%7D-1%7D%5C%5C%0A&=0%0A%5Cend%7Balign*%7D"></block-math><p>也就是说，<inline-math data="j%5Cneq%20k"></inline-math> 时，<inline-math data="S(%5Cdelta)=0"></inline-math>.</p>
<hr />
<p>故 <inline-math data="S(j-k)"></inline-math> 是这样一个分段函数：</p>
<block-math data="S(j-k)=%5Cleft%5C%7B%5Cbegin%7Balign*%7D%0A&n%20&(j=k)%5C%5C%0A&0%20&(j%5Cneq%20k)%0A%5Cend%7Balign*%7D%5Cright."></block-math><p>将其代入原式：</p>
<block-math data="c_k=%5Csum_%7Bj=0%7D%5E%7Bn-1%7Da_j%5Ccdot%20S(j-k)=a_k%5Ccdot%20n%0A"></block-math><p>得到：</p>
<block-math data="%5Cboxed%7Ba_k=%5Cdfrac%7Bc_k%7D%7Bn%7D%7D%0A"></block-math><p>这里的 <inline-math data="a_k"></inline-math> 就是原式的系数.</p>
<p>（忍不住说一声，这个式子太简洁了，向研究傅里叶变换的前辈们致以崇高的敬意！）</p>
<hr />
<p>由此我们可以得到以下步骤：</p>
<ol>
<li>
<p>对多项式 <inline-math data="A(x)"></inline-math>，将其用插值节点 <inline-math data="(%5Comega_n%5E0,%5Comega_n%5E1,%5Cdots,%5Comega_n%5E%7Bn-1%7D)"></inline-math> 进行一次 DFT，得到 <inline-math data="(d_0,d_1,%5Cdots,d_%7Bn-1%7D)"></inline-math>.</p>
</li>
<li>
<p>我们再将 <inline-math data="(%5Comega_n%5E0,%5Comega_n%5E1,%5Cdots,%5Comega_n%5E%7Bn-1%7D)"></inline-math> 作为系数，用插值节点 <inline-math data="(%5Comega_n%5E%7B-0%7D,%5Comega_n%5E%7B-1%7D,%5Cdots,%5Comega_n%5E%7B-(n-1)%7D)"></inline-math> 再进行一次 DFT，得到 <inline-math data="(c_0,c_1,%5Cdots,c_%7Bn-1%7D)"></inline-math>.</p>
</li>
<li>
<p>将 <inline-math data="(c_0,c_1,%5Cdots,c_%7Bn-1%7D)"></inline-math> 每一项除以 <inline-math data="n"></inline-math>，得到的向量就是我们要求的 <inline-math data="(a_0,a_1,%5Cdots,a_%7Bn-1%7D)"></inline-math>.</p>
</li>
</ol>
<p>这个过程就是 IDFT.</p>
<hr />
<h2 id="t-6" tabindex="-1" class="heading">快速傅里叶变换 <a class="cursor header-anchor" href="#t-6">¶</a></h2>
<p>略讲一下 FFT 的原理.</p>
<ol>
<li>给定多项式 <inline-math data="A(x)"></inline-math> 和 <inline-math data="B(x)"></inline-math>，得到其系数表示.</li>
<li>对 <inline-math data="A(x)"></inline-math> 和 <inline-math data="B(x)"></inline-math> 分别进行 DFT，得到两个点值向量.</li>
<li>对这两个点值向量每一项相乘，得到一个点值向量.</li>
<li>对这个点值向量进行 IDFT，即得到所求 <inline-math data="C(x)"></inline-math> 的系数表示.</li>
</ol>
<p>以后可能会在另一篇文章补上 FFT 的代码实现，敬请期待.</p>
<hr />
<h2 id="t-7" tabindex="-1" class="heading">Reference <a class="cursor header-anchor" href="#t-7">¶</a></h2>
<ul>
<li>参考 <anchor href="https://zhuanlan.zhihu.com/p/31584464">「一小时学会快速傅里叶变换」</anchor> by <anchor href="https://www.zhihu.com/people/whitebunny">白空谷</anchor></li>
<li>参考 <anchor href="https://zh.wikipedia.org/wiki/%E7%A6%BB%E6%95%A3%E5%82%85%E9%87%8C%E5%8F%B6%E5%8F%98%E6%8D%A2">「维基百科 - 离散傅里叶变换」</anchor></li>
<li>参考 <anchor href="https://zh.wikipedia.org/wiki/%E5%BF%AB%E9%80%9F%E5%82%85%E9%87%8C%E5%8F%B6%E5%8F%98%E6%8D%A2">「维基百科 - 快速傅里叶变换」</anchor></li>
</ul>
</template>