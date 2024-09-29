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
import type { JSX } from "vue/jsx-runtime";
const jsx: JSX.Element = (<><h2 id="t" tabindex="-1" class="heading">Format String <a class="cursor header-anchor" href="#t">¶</a></h2>
<p>The syntax of a format placeholder is</p>
<BlockCode lang="c" html={"<code class=\"language-c\"><span class=\"token operator\">%</span><span class=\"token punctuation\">[</span>parameter<span class=\"token punctuation\">]</span><span class=\"token punctuation\">[</span>flags<span class=\"token punctuation\">]</span><span class=\"token punctuation\">[</span>width<span class=\"token punctuation\">]</span><span class=\"token punctuation\">[</span><span class=\"token punctuation\">.</span>precision<span class=\"token punctuation\">]</span><span class=\"token punctuation\">[</span>length<span class=\"token punctuation\">]</span>type\n</code>"}></BlockCode><p>* Square brackets indicate optional parts of the placeholder.</p>
<h3 id="t-2" tabindex="-1" class="heading">Type <a class="cursor header-anchor" href="#t-2">¶</a></h3>
<table>
<thead>
<tr>
<th style="text-align:center">Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><code class="inline-code">{"%"}</code></td>
<td>Prints <code class="inline-code">{"%"}</code>.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">{"d"}</code></td>
<td>Decimal <code class="inline-code">{"signed int"}</code>.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">{"u"}</code></td>
<td>Decimal <code class="inline-code">{"unsigned int"}</code>.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">{"o"}</code></td>
<td>Octal <code class="inline-code">{"unsigned int"}</code>.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">{"x"}</code>, <code class="inline-code">{"X"}</code></td>
<td>Hexadecimal <code class="inline-code">{"unsigned int"}</code>. <code class="inline-code">{"x"}</code> for lower-case and <code class="inline-code">{"X"}</code> for upper-case.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">{"f"}</code></td>
<td>Float-point types in fixed-point notation.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">{"e"}</code>, <code class="inline-code">{"E"}</code></td>
<td>Float-point types in exponential notation: <code class="inline-code">{"d.ddde±dd"}</code>. <code class="inline-code">{"e"}</code> for lower-case “e” and <code class="inline-code">{"E"}</code> for upper-case.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">{"g"}</code>, <code class="inline-code">{"G"}</code></td>
<td>Float-point types in either fixed-point or exponential notation, whichever is more appropriate for its magnitude. <code class="inline-code">{"g"}</code> for lower-case and <code class="inline-code">{"G"}</code> for upper-case.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">{"a"}</code>, <code class="inline-code">{"A"}</code></td>
<td>Float-point in hexadecimal notation, starting with <code class="inline-code">{"0x"}</code> or <code class="inline-code">{"0X"}</code>. <code class="inline-code">{"a"}</code> for lower-case and <code class="inline-code">{"A"}</code> for upper-case.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">{"s"}</code></td>
<td><code class="inline-code">{"null"}</code>-terminated string.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">{"c"}</code></td>
<td><code class="inline-code">{"char"}</code>.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">{"p"}</code></td>
<td><code class="inline-code">{"void*"}</code> in an implementation-defined format.</td>
</tr>
<tr>
<td style="text-align:center"><code class="inline-code">{"n"}</code></td>
<td>Print nothing, but writes the number of characters written so far into an integer pointer parameter.</td>
</tr>
</tbody>
</table>
<p>Examples:</p>
<BlockCode lang="c" html={"<code class=\"language-c\"><span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"%%\"</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>                <span class=\"token comment\">// %</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"%d\"</span><span class=\"token punctuation\">,</span> <span class=\"token number\">123</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>           <span class=\"token comment\">// 123</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"%d\"</span><span class=\"token punctuation\">,</span> <span class=\"token operator\">-</span><span class=\"token number\">123</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>          <span class=\"token comment\">// -123</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"%u\"</span><span class=\"token punctuation\">,</span> <span class=\"token number\">123</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>           <span class=\"token comment\">// 123</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"%u\"</span><span class=\"token punctuation\">,</span> <span class=\"token operator\">-</span><span class=\"token number\">123</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>          <span class=\"token comment\">// 4294967173</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"%o\"</span><span class=\"token punctuation\">,</span> <span class=\"token number\">123</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>           <span class=\"token comment\">// 173</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"%x\"</span><span class=\"token punctuation\">,</span> <span class=\"token number\">123</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>           <span class=\"token comment\">// 7b</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"%X\"</span><span class=\"token punctuation\">,</span> <span class=\"token number\">123</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>           <span class=\"token comment\">// 7B</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"%f\"</span><span class=\"token punctuation\">,</span> <span class=\"token number\">123.456</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>       <span class=\"token comment\">// 123.456000</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"%e\"</span><span class=\"token punctuation\">,</span> <span class=\"token number\">123.456</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>       <span class=\"token comment\">// 1.234560e+02</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"%E\"</span><span class=\"token punctuation\">,</span> <span class=\"token number\">123.456</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>       <span class=\"token comment\">// 1.234560E+02</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"%g\"</span><span class=\"token punctuation\">,</span> <span class=\"token number\">123.456</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>       <span class=\"token comment\">// 123.456</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"%G\"</span><span class=\"token punctuation\">,</span> <span class=\"token number\">123.456</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>       <span class=\"token comment\">// 123.456</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"%g\"</span><span class=\"token punctuation\">,</span> <span class=\"token number\">123456789.123</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span> <span class=\"token comment\">// 1.23457e+08</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"%G\"</span><span class=\"token punctuation\">,</span> <span class=\"token number\">123456789.123</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span> <span class=\"token comment\">// 1.23457E+08</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"%a\"</span><span class=\"token punctuation\">,</span> <span class=\"token number\">123.456</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>       <span class=\"token comment\">// 0x1.edd2f1a9fbe77p+6</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"%A\"</span><span class=\"token punctuation\">,</span> <span class=\"token number\">123.456</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>       <span class=\"token comment\">// 0X1.EDD2F1A9FBE77P+6</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"%s\"</span><span class=\"token punctuation\">,</span> <span class=\"token string\">\"Hello\"</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>       <span class=\"token comment\">// Hello</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"%c\"</span><span class=\"token punctuation\">,</span> <span class=\"token char\">'H'</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>           <span class=\"token comment\">// H</span>\n\n<span class=\"token keyword\">int</span> a <span class=\"token operator\">=</span> <span class=\"token number\">123</span><span class=\"token punctuation\">;</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"%p\"</span><span class=\"token punctuation\">,</span> <span class=\"token operator\">&amp;</span>a<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>            <span class=\"token comment\">// 0x16d79b3d8</span>\n\n<span class=\"token keyword\">int</span> n<span class=\"token punctuation\">;</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"Hello%n\"</span><span class=\"token punctuation\">,</span> <span class=\"token operator\">&amp;</span>n<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>       <span class=\"token comment\">// Hello</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"%d\"</span><span class=\"token punctuation\">,</span> n<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>             <span class=\"token comment\">// 5</span>\n</code>"}></BlockCode><h3 id="t-3" tabindex="-1" class="heading">Others <a class="cursor header-anchor" href="#t-3">¶</a></h3>
<p>For further information, refer to <Anchor href="https://en.wikipedia.org/wiki/Printf">Wikipedia</Anchor>.</p>
<p>Here are some common examples:</p>
<BlockCode lang="c" html={"<code class=\"language-c\"><span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"[%5d]\"</span><span class=\"token punctuation\">,</span> <span class=\"token number\">123</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>         <span class=\"token comment\">// [  123]</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"[%-5d]\"</span><span class=\"token punctuation\">,</span> <span class=\"token number\">123</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>        <span class=\"token comment\">// [123  ]</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"[%05d]\"</span><span class=\"token punctuation\">,</span> <span class=\"token number\">123</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>        <span class=\"token comment\">// [00123]</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"[%+5d]\"</span><span class=\"token punctuation\">,</span> <span class=\"token number\">123</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>        <span class=\"token comment\">// [ +123]</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"[%*d]\"</span><span class=\"token punctuation\">,</span> <span class=\"token number\">5</span><span class=\"token punctuation\">,</span> <span class=\"token number\">123</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>      <span class=\"token comment\">// [  123] (dynamic width)</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"[%.1f]\"</span><span class=\"token punctuation\">,</span> <span class=\"token number\">123.456</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>    <span class=\"token comment\">// [123.5]</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"[%10f]\"</span><span class=\"token punctuation\">,</span> <span class=\"token number\">123.456</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>    <span class=\"token comment\">// [123.456000] (10 characters in total)</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"[%10.5f]\"</span><span class=\"token punctuation\">,</span> <span class=\"token number\">123.456</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>  <span class=\"token comment\">// [ 123.45600] (5 precision, 10 characters)</span>\n<span class=\"token function\">printf</span><span class=\"token punctuation\">(</span><span class=\"token string\">\"[%010.5f]\"</span><span class=\"token punctuation\">,</span> <span class=\"token number\">123.456</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span> <span class=\"token comment\">// [0123.45600] (5 precision, 10 characters)</span>\n</code>"}></BlockCode></>)
export default jsx;
