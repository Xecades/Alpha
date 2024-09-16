import Anchor from "@/components/md/Anchor.vue";
import BlockCode from "@/components/md/BlockCode.vue";
import BlockMath from "@/components/md/BlockMath.vue";
import Fold from "@/components/md/Fold.vue";
import ImageCaptioned from "@/components/md/ImageCaptioned.vue";
import InlineMath from "@/components/md/InlineMath.vue";
import LinkCard from "@/components/md/LinkCard.vue";
import Note from "@/components/md/Note.vue";
import SVGCaptioned from "@/components/md/SVGCaptioned.vue";
import Tab from "@/components/md/Tab.vue";
export default <><p><strong>离散傅里叶变换</strong>（Discrete Fourier Transform, DFT）和<strong>离散傅里叶反变换</strong>（Inverse Discrete Fourier Transform, IDFT） 是鼎鼎大名的<strong>快速傅里叶变换</strong>（Fast Fourier Transform, FFT）的前置知识.</p>
<p>其中 FFT 用于加速两个多项式 <InlineMath data={"A(x)"}></InlineMath>、<InlineMath data={"B(x)"}></InlineMath> 的乘积 <InlineMath data={"C(x)"}></InlineMath> 的计算，DFT 和 IDFT 是 FFT 的两个中间步骤.</p>

<p>需要明确，给定的是两个多项式：</p>
<BlockMath data={"\\left\\{\\begin{align*}\nA(x)&=a_0+a_1x+a_2x^2+\\cdots+a_{n-1}x^{n-1}\\\\\nB(x)&=b_0+b_1x+b_2x^2+\\cdots+b_{m-1}x^{m-1}\n\\end{align*}\\right."}></BlockMath><p>其中 <InlineMath data={"A(x)"}></InlineMath> 是一个 <InlineMath data={"n"}></InlineMath> 项多项式，<InlineMath data={"B(x)"}></InlineMath> 是一个 <InlineMath data={"m"}></InlineMath> 项多项式.</p>
<p>我们要求的多项式函数 <InlineMath data={"C(x)"}></InlineMath> 为一个 <InlineMath data={"n+m-1"}></InlineMath> 项的多项式（考虑最低项 <InlineMath data={"x"}></InlineMath> 的幂次为 <InlineMath data={"1"}></InlineMath>，最高项为 <InlineMath data={"n-1+m-1=n+m-2"}></InlineMath>，共 <InlineMath data={"1+(n+m-2)=n+m-1"}></InlineMath> 项）.</p>
<p>要了解 DFT 和 IDFT，还需要一些前置知识.</p>
<hr />
<h2 id="t" tabindex="-1" class="heading">多项式的系数表示法 <a class="cursor header-anchor" href="#t">¶</a></h2>
<p>我们平时用的多项式系数 <InlineMath data={"a_0,a_1,\\dots,a_{n-1}"}></InlineMath> 就属于多项式的系数表示法.</p>
<p>我们称 <InlineMath data={"n"}></InlineMath> 维系数向量 <InlineMath data={"(a_0,a_1,\\dots,a_{n-1})"}></InlineMath> 为 <InlineMath data={"A(x)"}></InlineMath> 的<strong>系数表示</strong>，其中：</p>
<BlockMath data={"\\boxed{A(x)=\\sum_{i=0}^{n-1}a_i\\cdot x^i}\n"}></BlockMath><p>对于 <InlineMath data={"A(x)"}></InlineMath> 的系数表示 <InlineMath data={"(a_0,a_1,\\dots,a_{n-1})"}></InlineMath> 和 <InlineMath data={"B(x)"}></InlineMath> 的系数表示 <InlineMath data={"(b_0,b_1,\\dots,b_{m-1})"}></InlineMath>，要求 <InlineMath data={"C(x)"}></InlineMath> 的系数表示，显然可以通过以下代码实现:</p>
<BlockCode lang="cpp" html={"<code class=\"language-cpp\"><span class=\"token keyword\">for</span> <span class=\"token punctuation\">(</span><span class=\"token keyword\">int</span> i <span class=\"token operator\">=</span> <span class=\"token number\">0</span><span class=\"token punctuation\">;</span> i <span class=\"token operator\">&lt;</span> n<span class=\"token punctuation\">;</span> i<span class=\"token operator\">++</span><span class=\"token punctuation\">)</span>\n    <span class=\"token keyword\">for</span> <span class=\"token punctuation\">(</span><span class=\"token keyword\">int</span> j <span class=\"token operator\">=</span> <span class=\"token number\">0</span><span class=\"token punctuation\">;</span> j <span class=\"token operator\">&lt;</span> m<span class=\"token punctuation\">;</span> j<span class=\"token operator\">++</span><span class=\"token punctuation\">)</span>\n        c<span class=\"token punctuation\">[</span>i <span class=\"token operator\">+</span> j<span class=\"token punctuation\">]</span> <span class=\"token operator\">+=</span> a<span class=\"token punctuation\">[</span>i<span class=\"token punctuation\">]</span> <span class=\"token operator\">*</span> b<span class=\"token punctuation\">[</span>j<span class=\"token punctuation\">]</span><span class=\"token punctuation\">;</span>\n</code>"}></BlockCode><p>得到的 <InlineMath data={"C(x)"}></InlineMath> 为 <InlineMath data={"n+m-1"}></InlineMath> 项多项式.</p>
<p>这个朴素算法的时间复杂度是 <InlineMath data={"O(n^2)"}></InlineMath> 的.</p>
<hr />
<h2 id="t-2" tabindex="-1" class="heading">多项式的点值表示法 <a class="cursor header-anchor" href="#t-2">¶</a></h2>
<p>点值表示法是 DFT 算法的核心.</p>
<p>我们在 <InlineMath data={"\\mathbb{C}"}></InlineMath> 上<strong>任意</strong>取一组<strong>不同</strong>的 <InlineMath data={"x_i"}></InlineMath>，共 <InlineMath data={"n"}></InlineMath> 个，记为向量 <InlineMath data={"(x_0,x_1,\\dots,x_{n-1})"}></InlineMath>，这里的 <InlineMath data={"x_i"}></InlineMath> 称为<strong>插值节点</strong>.</p>
<p>将每个 <InlineMath data={"x_i"}></InlineMath> 分别代入 <InlineMath data={"A(x)"}></InlineMath>，得到一组共 <InlineMath data={"n"}></InlineMath> 个运算结果 <InlineMath data={"y_i"}></InlineMath>，记为向量 <InlineMath data={"(y_0,y_1,\\dots,y_{n-1})"}></InlineMath>.</p>
<p>也就是说，求</p>
<BlockMath data={"\\boxed{y_i=A(x_i)=\\sum_{j=0}^{n-1}a_j\\cdot x_i^j}\n"}></BlockMath><p>向量 <InlineMath data={"(y_0,y_1,\\dots,y_{n-1})"}></InlineMath> 称为多项式 <InlineMath data={"A(x)"}></InlineMath> 的<strong>点值表示</strong>.</p>
<hr />
<p>下面我们证明，一个 <InlineMath data={"n"}></InlineMath> 项多项式（<InlineMath data={"n-1"}></InlineMath> 次）在 <InlineMath data={"n"}></InlineMath> 个不同点的取值唯一确定该多项式.</p>
<p>考虑反证法.</p>
<p>假设两个不同的多项式 <InlineMath data={"A(x)"}></InlineMath> 和 <InlineMath data={"B(x)"}></InlineMath>，它们满足，对 <InlineMath data={"\\forall i\\in[0,n-1]"}></InlineMath>，总有 <InlineMath data={"A(x_i)=B(x_i)"}></InlineMath>.</p>
<p>令 <InlineMath data={"T(x)=A(x)-B(x)"}></InlineMath>，则对 <InlineMath data={"\\forall i\\in[0,n-1]"}></InlineMath>，都有 <InlineMath data={"T(x)=0"}></InlineMath>.</p>
<p>也就是说，<InlineMath data={"n-1"}></InlineMath> 次多项式 <InlineMath data={"T(x)"}></InlineMath> 有 <InlineMath data={"n"}></InlineMath> 个根，和代数基本定理（一个 <InlineMath data={"n-1"}></InlineMath> 次多项式<strong>在复数域上</strong>有且仅有 <InlineMath data={"n-1"}></InlineMath> 个根）矛盾，假设不成立，证毕.</p>
<hr />
<p>通过系数表示求点值表示，复杂度为 <InlineMath data={"O(n^2)"}></InlineMath>.</p>
<p>通过点值表示求系数表示，可以使用<strong>插值</strong>算法，其朴素形式复杂度为 <InlineMath data={"O(n^2)"}></InlineMath>.</p>
<p>若已知 <InlineMath data={"A(x)"}></InlineMath> 和 <InlineMath data={"B(x)"}></InlineMath> 的点值表示 <InlineMath data={"(a_0,a_1,\\dots,a_{n-1})"}></InlineMath> 和 <InlineMath data={"(b_0,b_1,\\dots,b_{n-1})"}></InlineMath>，那么多项式乘积 <InlineMath data={"C(x)=A(x)\\cdot B(x)"}></InlineMath> 可以简单地表示为</p>
<BlockMath data={"\\boxed{(a_0\\cdot b_0,a_1\\cdot b_1,\\dots,a_{n-1}\\cdot b_{n-1})}\n"}></BlockMath><p>设 <InlineMath data={"A(x)"}></InlineMath> 的点值表示有 <InlineMath data={"r"}></InlineMath> 项，<InlineMath data={"B(x)"}></InlineMath> 的有 <InlineMath data={"s"}></InlineMath> 项，为了保证所得能确定唯一的 <InlineMath data={"C(x)"}></InlineMath>，<strong>我们需要在 <InlineMath data={"A"}></InlineMath>、<InlineMath data={"B"}></InlineMath> 中至少取 <InlineMath data={"r+s"}></InlineMath> 个插值节点</strong>.</p>
<p>倘若能快速地转换<strong>点值表示法</strong>和<strong>系数表示法</strong>，求 <InlineMath data={"C(x)"}></InlineMath> 的过程就会被大大加速.</p>
<hr />
<p>确定了方向，让我们来捋一捋 DFT 求算 <InlineMath data={"C(x)"}></InlineMath> 的思路，以便于思考.</p>
<ol>
<li>输入 <InlineMath data={"A(x)"}></InlineMath> 和 <InlineMath data={"B(x)"}></InlineMath> 的系数表示；</li>
<li>将其分别转换为点值表达式；</li>
<li>通过这两个点值表达式计算 <InlineMath data={"C(x)"}></InlineMath> 的点值表达式；</li>
<li>将 <InlineMath data={"C(x)"}></InlineMath> 的点值表示转化为系数表示，即为结果.</li>
</ol>
<hr />
<h2 id="t-3" tabindex="-1" class="heading">单位复数根模型 <a class="cursor header-anchor" href="#t-3">¶</a></h2>
<p>互联网上有很多相关的资料，这里只提一下后面要用的引理.</p>
<ol>
<li><InlineMath data={"\\omega_n^k=\\cos(2\\pi\\cdot\\dfrac{k}{n})+i\\sin(2\\pi\\cdot\\dfrac{k}{n})"}></InlineMath>；</li>
<li><InlineMath data={"\\omega_n^k=\\omega_n^{k\\mod n}"}></InlineMath>；</li>
<li>（折半引理）<InlineMath data={"\\omega^{2k}_{2n}=\\omega^k_n"}></InlineMath>；</li>
<li>（消去引理）<InlineMath data={"\\omega^{k+n/2}_n=-\\omega^k_n"}></InlineMath>.</li>
</ol>
<p>确保理解前置知识过后，我们进入正题.</p>
<hr />
<h2 id="t-4" tabindex="-1" class="heading">离散傅里叶变换 <a class="cursor header-anchor" href="#t-4">¶</a></h2>
<p>考虑一个 <InlineMath data={"n"}></InlineMath> 项多项式 <InlineMath data={"A(x)"}></InlineMath>，其中 <InlineMath data={"n=2^x"}></InlineMath>，<InlineMath data={"x\\in\\mathbb{N}^*"}></InlineMath>，不足 <InlineMath data={"2^x"}></InlineMath> 的补系数为 <InlineMath data={"0"}></InlineMath> 的项.</p>
<BlockMath data={"A(x)=a_0+a_1x+a_2x^2+\\cdots+a_{n-1}x^{n-1}\n"}></BlockMath><p>倘若取 <InlineMath data={"n"}></InlineMath> 次单位根的 <InlineMath data={"0\\sim n-1"}></InlineMath> 次幂，分别代入 <InlineMath data={"A(x)"}></InlineMath>，得到一个点值向量 <InlineMath data={"(A(\\omega_n^0),A(\\omega_n^1),\\dots,A(\\omega_n^{n-1}))"}></InlineMath>.</p>
<p>对给定多项式进行这样操作的过程，称为<strong>离散傅里叶变换</strong>（Discrete Fourier Transform, DFT）.</p>
<p>显然，如果直接代入，DFT 的朴素实现仍然很低效.</p>
<p>考虑对其优化.</p>
<hr />
<p>对于任意多项式 <InlineMath data={"A(x)=a_0+a_1x+a_2x^2+\\cdots+a_{n-1}x^{n-1}"}></InlineMath>，将每一项按照幂次的奇偶分组：</p>
<BlockMath data={"\\begin{align*}\nA(x)&=(a_0+a_2x^2+a_4x^4+\\cdots+a_{n-2}x^{n-2})+(a_1x^1+a_3x^3+a_5x^5+\\dots+a_{n-1}x^{n-1})\\\\\n&=(a_0+a_2x^2+a_4x^4+\\cdots+a_{n-2}x^{n-2})+x\\cdot(a_1+a_3x^2+a_5x^4+\\dots+a_{n-1}x^{n-2})\n\\end{align*}"}></BlockMath><p>令</p>
<BlockMath data={"A_1(x)=a_0+a_2x+a_4x^2+\\cdots+a_{n-2}x^{(n-2)/2}\n"}></BlockMath><BlockMath data={"A_2(x)=a_1+a_3x+a_5x^2+\\cdots+a_{n-1}x^{(n-2)/2}\n"}></BlockMath><p>那么，有</p>
<BlockMath data={"\\boxed{A(x)=A_1(x^2)+x\\cdot A_2(x^2)}\n"}></BlockMath><p>对于 <InlineMath data={"\\forall k\\in[0,n-1]"}></InlineMath>，<InlineMath data={"k\\in\\mathbb{R}"}></InlineMath>，</p>
<BlockMath data={"A(\\omega_n^k)=A_1(\\omega_n^{2k})+\\omega^k_n\\cdot A_2(\\omega_n^{2k})\n"}></BlockMath><p>考虑如何简化右式.</p>
<hr />

<p><strong>注意</strong>，请牢记 <InlineMath data={"n"}></InlineMath> 是 <InlineMath data={"2"}></InlineMath> 的整数次幂，即 <InlineMath data={"n=2^x"}></InlineMath>.</p>

<p>对于 <InlineMath data={"k\\in[0,\\dfrac{n}{2}-1]"}></InlineMath> 的部分（<InlineMath data={"\\dfrac{n}{2}"}></InlineMath> 是整数）：</p>
<BlockMath data={"\\begin{align*}\nA(\\omega_n^k)&=A_1(\\omega_n^{2k})+\\omega^k_n\\cdot A_2(\\omega_n^{2k})\\\\\n&=\\boxed{A_1(\\omega_{n/2}^k)+\\omega^k_n\\cdot A_2(\\omega_{n/2}^k)}\n\\end{align*}"}></BlockMath><p>对于 <InlineMath data={"k+\\dfrac{n}{2}\\in[\\dfrac{n}{2},n-1]"}></InlineMath> 的部分：</p>
<BlockMath data={"A(\\omega_n^{k+n/2})=A_1(\\omega_n^{2k+n})+\\omega^{k+n/2}_n\\cdot A_2(\\omega_n^{2k+n})\n"}></BlockMath><p>注意到：</p>
<BlockMath data={"\\omega^{2k+n}_n=\\omega^{2k}_n\\cdot\\omega_n^n=\\omega^{2k}_n=\\omega^k_{n/2}\n"}></BlockMath><p>和</p>
<BlockMath data={"\\omega^{k+n/2}_{n}=-\\omega^k_n\n"}></BlockMath><p>则有：</p>
<BlockMath data={"\\boxed{A(\\omega_n^{k+n/2})=A_1(\\omega^k_{n/2})-\\omega^k_n\\cdot A_2(\\omega^k_{n/2})}\n"}></BlockMath><p><InlineMath data={"k"}></InlineMath> 与 <InlineMath data={"k+\\dfrac{n}{2}"}></InlineMath> 取遍了 <InlineMath data={"0\\sim n-1"}></InlineMath> 这 <InlineMath data={"n"}></InlineMath> 个整数，因此能通过这 <InlineMath data={"n"}></InlineMath> 个点值反解系数.</p>
<hr />
<p>把这两个式子写在一起：</p>
<BlockMath data={"A(\\omega_n^k)=A_1(\\omega_{n/2}^k)+\\omega^k_n\\cdot A_2(\\omega_{n/2}^k)\n"}></BlockMath><BlockMath data={"A(\\omega_n^{k+n/2})=A_1(\\omega^k_{n/2})-\\omega^k_n\\cdot A_2(\\omega^k_{n/2})\n"}></BlockMath><p>只要知道 <InlineMath data={"\\omega_{n/2}^0,\\omega_{n/2}^1,\\dots,\\omega_{n/2}^{n/2-1}"}></InlineMath>，转化为子问题，就可以在 <InlineMath data={"O(n\\log n)"}></InlineMath> 的时间内求得 <InlineMath data={"A(x)"}></InlineMath>.</p>
<p>这个过程就是 DFT.</p>
<hr />
<h2 id="t-5" tabindex="-1" class="heading">离散傅里叶反变换 <a class="cursor header-anchor" href="#t-5">¶</a></h2>
<p>将用单位根求出的点值表示的多项式转化为系数表示，这个过程即为<strong>离散傅里叶反变换</strong>（Inverse Discrete Fourier Transform）.</p>
<p>也就是说，要通过插值为单位根的 <InlineMath data={"n"}></InlineMath> 维点值向量 <InlineMath data={"(A(\\omega_n^0),A(\\omega_n^1),\\dots,A(\\omega_n^{n-1}))"}></InlineMath> 推出 <InlineMath data={"n"}></InlineMath> 维系数向量 <InlineMath data={"(a_0,a_1,\\dots,a_{n-1})"}></InlineMath>.</p>
<p>可以把离散傅里叶反变换理解为离散傅里叶变换的逆操作.</p>
<p>假设 <InlineMath data={"(a_0,a_1,\\dots,a_{n-1})"}></InlineMath> 进行一次 DFT 的结果是 <InlineMath data={"(d_0,d_1,\\dots,d_{n-1})"}></InlineMath>.</p>
<p>构造辅助多项式：</p>
<BlockMath data={"F(x)=d_0+d_1x+d_2x^2+\\cdots+d_{n-1}x^{n-1}\n"}></BlockMath><p>在 <InlineMath data={"F(x)"}></InlineMath> 中，<InlineMath data={"(d_0,d_1,\\dots,d_{n-1})"}></InlineMath> 是系数向量.</p>
<hr />
<p>取插值节点 <InlineMath data={"x_k=\\omega_n^{-k}"}></InlineMath>（<InlineMath data={"k\\in[0,n-1]"}></InlineMath>），将其代入 <InlineMath data={"F(x)"}></InlineMath>，得到另一组点值向量 <InlineMath data={"(c_0,c_1,\\dots,c_{n-1})"}></InlineMath>.</p>
<p>也就是说：</p>
<BlockMath data={"c_k=\\sum_{i=0}^{n-1}d_ix_k^i=\\sum_{i=0}^{n-1}d_i(\\omega_n^{-k})^i\n"}></BlockMath><p>将 <InlineMath data={"d_i"}></InlineMath> 还原，并化简 <InlineMath data={"c_k"}></InlineMath>：</p>
<BlockMath data={"\\begin{align*}\nc_k&=\\sum_{i=0}^{n-1}[\\sum_{j=0}^{n-1}a_j\\cdot(\\omega_n^i)^j]\\cdot(\\omega_n^{-k})^i\\\\\n&=\\sum_{j=0}^{n-1}a_j\\sum_{i=0}^{n-1}(\\omega_{n}^{i})^{j-k}\n\\end{align*}"}></BlockMath><hr />
<p>考虑这个式子的右半部分，令：</p>
<BlockMath data={"\\boxed{S(\\delta)=\\sum_{i=0}^{n-1}(\\omega_{n}^{i})^\\delta}\n"}></BlockMath><p>则有 <InlineMath data={"c_k=\\sum\\limits_{j=0}^{n-1}a_j\\cdot S(j-k)"}></InlineMath>，</p>
<BlockMath data={"S(\\delta)=\\omega_n^0+\\omega_n^\\delta+\\omega_n^{2\\delta}+\\cdots+\\omega_n^{(n-1)\\delta}\n"}></BlockMath><p>注意到 <InlineMath data={"\\omega_n^\\delta\\neq1"}></InlineMath> 时，这是一个等比数列.</p>
<p>分类讨论 <InlineMath data={"\\delta"}></InlineMath>.</p>
<hr />
<p>如果 <InlineMath data={"\\omega_n^\\delta=1"}></InlineMath>，有 <InlineMath data={"\\delta=0"}></InlineMath>，则：</p>
<BlockMath data={"S(j-k)=S(\\delta)=S(0)=n\n"}></BlockMath><p><InlineMath data={"j-k=0"}></InlineMath>，即 <InlineMath data={"j=k"}></InlineMath> 时，<InlineMath data={"S(\\delta)=n"}></InlineMath>.</p>
<hr />
<p>如果 <InlineMath data={"\\omega_n^\\delta\\neq1"}></InlineMath>，有 <InlineMath data={"\\delta\\neq0"}></InlineMath>，则 <InlineMath data={"S(\\delta)"}></InlineMath> 是公比为 <InlineMath data={"\\omega_n^\\delta"}></InlineMath> 的等比数列.</p>
<p>根据等比数列求和公式：</p>
<BlockMath data={"\\begin{align*}\nS(\\delta)&=\\dfrac{\\omega_{n}^{0}[(\\omega_{n}^{\\delta})^{n}-1]}{\\omega_{n}^{\\delta}-1}\\\\\n&=\\dfrac{1\\cdot[(\\omega_{n}^{n})^{\\delta}-1]}{\\omega_{n}^{\\delta}-1}\\\\\n&=\\dfrac{[1^{\\delta}-1]}{\\omega_{n}^{\\delta}-1}\\\\\n&=\\dfrac{0}{\\omega_{n}^{\\delta}-1}\\\\\n&=0\n\\end{align*}"}></BlockMath><p>也就是说，<InlineMath data={"j\\neq k"}></InlineMath> 时，<InlineMath data={"S(\\delta)=0"}></InlineMath>.</p>
<hr />
<p>故 <InlineMath data={"S(j-k)"}></InlineMath> 是这样一个分段函数：</p>
<BlockMath data={"S(j-k)=\\left\\{\\begin{align*}\n&n &(j=k)\\\\\n&0 &(j\\neq k)\n\\end{align*}\\right."}></BlockMath><p>将其代入原式：</p>
<BlockMath data={"c_k=\\sum_{j=0}^{n-1}a_j\\cdot S(j-k)=a_k\\cdot n\n"}></BlockMath><p>得到：</p>
<BlockMath data={"\\boxed{a_k=\\dfrac{c_k}{n}}\n"}></BlockMath><p>这里的 <InlineMath data={"a_k"}></InlineMath> 就是原式的系数.</p>
<p>（忍不住说一声，这个式子太简洁了，向研究傅里叶变换的前辈们致以崇高的敬意！）</p>
<hr />
<p>由此我们可以得到以下步骤：</p>
<ol>
<li>
<p>对多项式 <InlineMath data={"A(x)"}></InlineMath>，将其用插值节点 <InlineMath data={"(\\omega_n^0,\\omega_n^1,\\dots,\\omega_n^{n-1})"}></InlineMath> 进行一次 DFT，得到 <InlineMath data={"(d_0,d_1,\\dots,d_{n-1})"}></InlineMath>.</p>
</li>
<li>
<p>我们再将 <InlineMath data={"(\\omega_n^0,\\omega_n^1,\\dots,\\omega_n^{n-1})"}></InlineMath> 作为系数，用插值节点 <InlineMath data={"(\\omega_n^{-0},\\omega_n^{-1},\\dots,\\omega_n^{-(n-1)})"}></InlineMath> 再进行一次 DFT，得到 <InlineMath data={"(c_0,c_1,\\dots,c_{n-1})"}></InlineMath>.</p>
</li>
<li>
<p>将 <InlineMath data={"(c_0,c_1,\\dots,c_{n-1})"}></InlineMath> 每一项除以 <InlineMath data={"n"}></InlineMath>，得到的向量就是我们要求的 <InlineMath data={"(a_0,a_1,\\dots,a_{n-1})"}></InlineMath>.</p>
</li>
</ol>
<p>这个过程就是 IDFT.</p>
<hr />
<h2 id="t-6" tabindex="-1" class="heading">快速傅里叶变换 <a class="cursor header-anchor" href="#t-6">¶</a></h2>
<p>略讲一下 FFT 的原理.</p>
<ol>
<li>给定多项式 <InlineMath data={"A(x)"}></InlineMath> 和 <InlineMath data={"B(x)"}></InlineMath>，得到其系数表示.</li>
<li>对 <InlineMath data={"A(x)"}></InlineMath> 和 <InlineMath data={"B(x)"}></InlineMath> 分别进行 DFT，得到两个点值向量.</li>
<li>对这两个点值向量每一项相乘，得到一个点值向量.</li>
<li>对这个点值向量进行 IDFT，即得到所求 <InlineMath data={"C(x)"}></InlineMath> 的系数表示.</li>
</ol>
<p>以后可能会在另一篇文章补上 FFT 的代码实现，敬请期待.</p>
<hr />
<h2 id="t-7" tabindex="-1" class="heading">Reference <a class="cursor header-anchor" href="#t-7">¶</a></h2>
<ul>
<li>参考 <Anchor href="https://zhuanlan.zhihu.com/p/31584464">「一小时学会快速傅里叶变换」</Anchor> by <Anchor href="https://www.zhihu.com/people/whitebunny">白空谷</Anchor></li>
<li>参考 <Anchor href="https://zh.wikipedia.org/wiki/%E7%A6%BB%E6%95%A3%E5%82%85%E9%87%8C%E5%8F%B6%E5%8F%98%E6%8D%A2">「维基百科 - 离散傅里叶变换」</Anchor></li>
<li>参考 <Anchor href="https://zh.wikipedia.org/wiki/%E5%BF%AB%E9%80%9F%E5%82%85%E9%87%8C%E5%8F%B6%E5%8F%98%E6%8D%A2">「维基百科 - 快速傅里叶变换」</Anchor></li>
</ul>
</>