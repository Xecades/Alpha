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
import SVGCaptioned from "@/components/md/SVGCaptioned.vue";
import Tab from "@/components/md/Tab.vue";
import note from "@/layout/note.vue";
import type { CachedRouteRecord } from "@script/types";
const routes: CachedRouteRecord[] = [
{"path":"/note/cs/ads/amortized-analysis","component":note,"meta":{"pathname":"note/cs/ads/amortized-analysis.md","category":"cs","body":() => import("@cache/note/posts/cs/ads/amortized-analysis"),"attr":{"title":"摊还分析"},"toc":[{"level":2,"title":<>引入</>,"link":"t"},{"level":2,"title":<>势能法</>,"link":"t-2"},{"level":2,"title":<>Splay Tree 的摊还分析</>,"link":"t-3"},{"level":3,"title":<>Zig 操作</>,"link":"t-4"},{"level":3,"title":<>Zig-Zag 操作</>,"link":"t-5"},{"level":3,"title":<>Zig-Zig 操作</>,"link":"t-6"},{"level":3,"title":<>摊还分析</>,"link":"t-7"},{"level":2,"title":<>总结</>,"link":"t-8"}],"created":"2024-09-19T17:10:17+08:00","updated":"2024-09-24T17:12:51+08:00","type":"post"}},
{"path":"/note/cs/ads/avl-tree","component":note,"meta":{"pathname":"note/cs/ads/avl-tree.md","category":"cs","body":() => import("@cache/note/posts/cs/ads/avl-tree"),"attr":{"title":"AVL Tree"},"toc":[{"level":2,"title":<>RR-Rotation</>,"link":"t"},{"level":2,"title":<>LL-Rotation</>,"link":"t-2"},{"level":2,"title":<>LR-Rotation</>,"link":"t-3"},{"level":2,"title":<>RL-Rotation</>,"link":"t-4"},{"level":2,"title":<>复杂度证明</>,"link":"t-5"},{"level":2,"title":<>代码实现</>,"link":"t-6"}],"created":"2024-09-11T13:51:55+08:00","updated":"2024-09-19T17:10:17+08:00","type":"post"}},
{"path":"/note/cs/ads/b-plus-tree","component":note,"meta":{"pathname":"note/cs/ads/b-plus-tree.md","category":"cs","body":() => import("@cache/note/posts/cs/ads/b-plus-tree"),"attr":{"title":"B+ Tree"},"toc":[],"created":"2024-09-19T17:10:17+08:00","updated":"2024-09-19T17:10:17+08:00","type":"post"}},
{"path":"/note/cs/ads","component":note,"meta":{"pathname":"note/cs/ads/index.md","category":"cs","body":() => import("@cache/note/posts/cs/ads/index"),"attr":{"title":"高级数据结构和算法分析"},"toc":[],"created":"2024-09-19T17:10:17+08:00","updated":"2024-09-19T17:10:17+08:00","type":"index"}},
{"path":"/note/cs/ads/leftist-heaps","component":note,"meta":{"pathname":"note/cs/ads/leftist-heaps.md","category":"cs","body":() => import("@cache/note/posts/cs/ads/leftist-heaps"),"attr":{"title":"Leftist Heaps"},"toc":[],"created":"2024-09-25T03:55:16.909Z","updated":"2024-09-25T03:55:16.909Z","type":"post"}},
{"path":"/note/cs/ads/red-black-tree","component":note,"meta":{"pathname":"note/cs/ads/red-black-tree.md","category":"cs","body":() => import("@cache/note/posts/cs/ads/red-black-tree"),"attr":{"title":"红黑树"},"toc":[{"level":2,"title":<>树高复杂度</>,"link":"t"},{"level":2,"title":<>插入</>,"link":"t-2"},{"level":3,"title":<>情况 1</>,"link":"t-3"},{"level":3,"title":<>情况 2</>,"link":"t-4"},{"level":3,"title":<>情况 3</>,"link":"t-5"},{"level":3,"title":<>代码实现</>,"link":"t-6"},{"level":2,"title":<>删除</>,"link":"t-7"}],"created":"2024-09-19T17:10:17+08:00","updated":"2024-09-24T19:30:14+08:00","type":"post"}},
{"path":"/note/cs/ads/skew-heaps","component":note,"meta":{"pathname":"note/cs/ads/skew-heaps.md","category":"cs","body":() => import("@cache/note/posts/cs/ads/skew-heaps"),"attr":{"title":"Skew Heaps"},"toc":[],"created":"2024-09-25T03:55:17.037Z","updated":"2024-09-25T03:55:17.037Z","type":"post"}},
{"path":"/note/cs/ads/splay-tree","component":note,"meta":{"pathname":"note/cs/ads/splay-tree.md","category":"cs","body":() => import("@cache/note/posts/cs/ads/splay-tree"),"attr":{"title":"Splay Tree"},"toc":[{"level":2,"title":<>Zig-Zag</>,"link":"t"},{"level":2,"title":<>Zig-Zig</>,"link":"t-2"},{"level":2,"title":<>复杂度证明</>,"link":"t-3"}],"created":"2024-09-19T17:10:17+08:00","updated":"2024-09-24T17:12:51+08:00","type":"post"}},
{"path":"/note/cs","component":note,"meta":{"pathname":"note/cs/index.md","category":"cs","body":() => import("@cache/note/posts/cs/index"),"attr":{"title":"计算机科学"},"toc":[],"created":"2024-08-05T22:34:17+08:00","updated":"2024-08-28T16:09:30+08:00","type":"index"}},
{"path":"/note/cs/others/c-language-cheatsheet","component":note,"meta":{"pathname":"note/cs/others/c-language-cheatsheet.md","category":"cs","body":() => import("@cache/note/posts/cs/others/c-language-cheatsheet"),"attr":{"title":"C Language Cheatsheet"},"toc":[{"level":2,"title":<>Format String</>,"link":"t"},{"level":3,"title":<>Type</>,"link":"t-2"},{"level":3,"title":<>Others</>,"link":"t-3"}],"created":"2024-09-19T21:15:50+08:00","updated":"2024-09-19T21:15:50+08:00","type":"post"}},
{"path":"/note/cs/others","component":note,"meta":{"pathname":"note/cs/others/index.md","category":"cs","body":() => import("@cache/note/posts/cs/others/index"),"attr":{"title":"其他"},"toc":[],"created":"2024-09-19T21:15:50+08:00","updated":"2024-09-19T21:15:50+08:00","type":"index"}},
{"path":"/note/cs/others/manuals-standards","component":note,"meta":{"pathname":"note/cs/others/manuals-standards.md","category":"cs","body":() => import("@cache/note/posts/cs/others/manuals-standards"),"attr":{"title":"Manuals & Standards"},"toc":[{"level":2,"title":<>Semantic Versioning</>,"link":"t"},{"level":2,"title":<>Conventional Commits</>,"link":"t-2"}],"created":"2024-09-19T21:15:50+08:00","updated":"2024-09-19T21:15:50+08:00","type":"post"}},
{"path":"/note/cs/others/mit-missing-semester","component":note,"meta":{"pathname":"note/cs/others/mit-missing-semester.md","category":"cs","body":() => import("@cache/note/posts/cs/others/mit-missing-semester"),"attr":{"title":"MIT Missing Semester"},"toc":[{"level":2,"title":<>Shell Scripting</>,"link":"t"},{"level":3,"title":<>Variables</>,"link":"t-2"},{"level":3,"title":<>Operators</>,"link":"t-3"},{"level":3,"title":<>Redirection</>,"link":"t-4"},{"level":3,"title":<>Control Flow</>,"link":"t-5"},{"level":3,"title":<>Others</>,"link":"t-6"},{"level":3,"title":<>Homework</>,"link":"t-7"},{"level":2,"title":<>Data Wrangling</>,"link":"t-8"},{"level":2,"title":<>Command-line Environment</>,"link":"t-9"},{"level":3,"title":<>Job Control</>,"link":"t-10"},{"level":3,"title":<>Terminal Multiplexers</>,"link":"t-11"},{"level":2,"title":<>Version Control (Git)</>,"link":"t-12"},{"level":2,"title":<>Metaprogramming</>,"link":"t-13"},{"level":2,"title":<>Security and Cryptography</>,"link":"t-14"},{"level":3,"title":<>Cryptographic hash function</>,"link":"t-15"},{"level":3,"title":<>Key derivation function</>,"link":"t-16"},{"level":3,"title":<>Symmetric cryptography</>,"link":"t-17"},{"level":3,"title":<>Asymmetric cryptography</>,"link":"t-18"}],"created":"2024-09-19T21:15:50+08:00","updated":"2024-09-19T21:15:50+08:00","type":"post"}},
{"path":"/note","component":note,"meta":{"pathname":"note/index.md","category":"","body":() => import("@cache/note/posts/index"),"attr":{"title":"笔记"},"toc":[],"created":"2024-08-05T22:34:17+08:00","updated":"2024-09-10T23:21:35+08:00","type":"index"}},
{"path":"/note/misc/french","component":note,"meta":{"pathname":"note/misc/french.md","category":"misc","body":() => import("@cache/note/posts/misc/french"),"attr":{"title":"Français"},"toc":[{"level":2,"title":<>字母表</>,"link":"t"},{"level":2,"title":<>音素</>,"link":"t-2"},{"level":2,"title":<>发音规则</>,"link":"t-3"},{"level":3,"title":<>元音</>,"link":"t-4"},{"level":3,"title":<>辅音</>,"link":"t-5"}],"created":"2024-09-19T20:37:46+08:00","updated":"2024-09-19T20:37:46+08:00","type":"post"}},
{"path":"/note/misc","component":note,"meta":{"pathname":"note/misc/index.md","category":"misc","body":() => import("@cache/note/posts/misc/index"),"attr":{"title":"杂项"},"toc":[],"created":"2024-09-19T20:37:46+08:00","updated":"2024-09-19T20:37:46+08:00","type":"index"}},
{"path":"/note/misc/test/customToken","component":note,"meta":{"pathname":"note/misc/test/customToken.md","category":"misc","body":() => import("@cache/note/posts/misc/test/customToken"),"attr":{"title":"自定义语法"},"toc":[{"level":2,"title":<>数学公式</>,"link":"t"},{"level":3,"title":<>行内公式</>,"link":"t-2"},{"level":3,"title":<>行间公式</>,"link":"t-3"},{"level":2,"title":<>Icon</>,"link":"t-4"},{"level":2,"title":<>引言</>,"link":"t-5"},{"level":2,"title":<>Note</>,"link":"t-6"},{"level":2,"title":<>折叠面板</>,"link":"t-7"},{"level":2,"title":<>链接卡片</>,"link":"t-8"},{"level":2,"title":<>Typst 渲染</>,"link":"t-9"},{"level":2,"title":<>选项卡</>,"link":"t-10"},{"level":2,"title":<>Grid</>,"link":"t-11"}],"created":"2024-08-19T14:28:15+08:00","updated":"2024-09-19T20:41:28+08:00","type":"post"}},
{"path":"/note/misc/test","component":note,"meta":{"pathname":"note/misc/test/index.md","category":"misc","body":() => import("@cache/note/posts/misc/test/index"),"attr":{"title":"测试"},"toc":[],"created":"2024-09-19T20:41:28+08:00","updated":"2024-09-19T20:41:28+08:00","type":"index"}},
{"path":"/note/misc/test/latex","component":note,"meta":{"pathname":"note/misc/test/latex.md","category":"misc","body":() => import("@cache/note/posts/misc/test/latex"),"attr":{"title":"LaTeX 测试"},"toc":[{"level":2,"title":<>什么是狄利克雷卷积</>,"link":"t"},{"level":2,"title":<>本文要用到的数论函数</>,"link":"t-2"},{"level":3,"title":<><strong>单位函数</strong> <InlineMath data={"\\varepsilon(n)"}></InlineMath></>,"link":"t-3"},{"level":3,"title":<><strong>幂函数</strong> <InlineMath data={"\\mathrm{Id}_k(n)"}></InlineMath></>,"link":"t-4"},{"level":3,"title":<><strong>除数函数</strong> <InlineMath data={"\\sigma_k(n)"}></InlineMath></>,"link":"t-5"},{"level":3,"title":<><strong>欧拉函数</strong> <InlineMath data={"\\varphi(n)"}></InlineMath></>,"link":"t-6"},{"level":2,"title":<>狄利克雷卷积相关定理</>,"link":"t-7"},{"level":2,"title":<>一些特殊的卷积</>,"link":"t-8"},{"level":2,"title":<>单位元</>,"link":"t-9"},{"level":2,"title":<>狄利克雷逆（Dirichlet Inverse）</>,"link":"t-10"},{"level":2,"title":<>莫比乌斯反演</>,"link":"t-11"},{"level":2,"title":<>参考文献</>,"link":"t-12"}],"created":"2024-08-13T22:31:41+08:00","updated":"2024-09-19T20:41:28+08:00","type":"post"}},
{"path":"/note/misc/test/markdown","component":note,"meta":{"pathname":"note/misc/test/markdown.md","category":"misc","body":() => import("@cache/note/posts/misc/test/markdown"),"attr":{"title":"Markdown 测试"},"toc":[{"level":2,"title":<>二级标题</>,"link":"t"},{"level":3,"title":<>三级标题</>,"link":"t-2"},{"level":4,"title":<>四级标题</>,"link":"t-3"},{"level":5,"title":<>五级标题</>,"link":"t-4"},{"level":6,"title":<>六级标题</>,"link":"t-5"}],"created":"2024-08-05T22:34:17+08:00","updated":"2024-09-19T20:41:28+08:00","type":"post"}},
{"path":"/note/sci","component":note,"meta":{"pathname":"note/sci/index.md","category":"sci","body":() => import("@cache/note/posts/sci/index"),"attr":{"title":"数理"},"toc":[],"created":"2024-09-24T17:12:51+08:00","updated":"2024-09-24T17:12:51+08:00","type":"index"}},
{"path":"/note/sci/la","component":note,"meta":{"pathname":"note/sci/la/index.md","category":"sci","body":() => import("@cache/note/posts/sci/la/index"),"attr":{"title":"线性代数"},"toc":[],"created":"2024-09-19T21:15:50+08:00","updated":"2024-09-24T17:12:51+08:00","type":"index"}},
{"path":"/note/sci/la/prove-that","component":note,"meta":{"pathname":"note/sci/la/prove-that.md","category":"sci","body":() => import("@cache/note/posts/sci/la/prove-that"),"attr":{"title":"Prove That..."},"toc":[{"level":2,"title":<>Group, Ring &amp; Field</>,"link":"t"},{"level":2,"title":<>Linear Space</>,"link":"t-2"},{"level":2,"title":<>Inner Product Space</>,"link":"t-3"},{"level":2,"title":<>Linear Transformation</>,"link":"t-4"},{"level":2,"title":<>Matrix</>,"link":"t-5"}],"created":"2024-09-19T21:15:50+08:00","updated":"2024-09-24T17:12:51+08:00","type":"post"}},
{"path":"/note/sci/la/what-is","component":note,"meta":{"pathname":"note/sci/la/what-is.md","category":"sci","body":() => import("@cache/note/posts/sci/la/what-is"),"attr":{"title":"What is..."},"toc":[{"level":2,"title":<>Set</>,"link":"t"},{"level":2,"title":<>Group and Field</>,"link":"t-2"},{"level":2,"title":<>Vector Space</>,"link":"t-3"}],"created":"2024-09-19T21:15:50+08:00","updated":"2024-09-24T17:12:51+08:00","type":"post"}},
{"path":"/note/sci/ma/cheatsheet","component":note,"meta":{"pathname":"note/sci/ma/cheatsheet.md","category":"sci","body":() => import("@cache/note/posts/sci/ma/cheatsheet"),"attr":{"title":"Cheatsheet"},"toc":[{"level":2,"title":<>Equivalent Infinitesimals</>,"link":"t"},{"level":2,"title":<>Derivatives</>,"link":"t-2"},{"level":2,"title":<>Integrals</>,"link":"t-3"},{"level":2,"title":<>Taylor Series</>,"link":"t-4"}],"created":"2024-09-19T21:15:50+08:00","updated":"2024-09-24T17:12:51+08:00","type":"post"}},
{"path":"/note/sci/ma/completeness-of-real-numbers","component":note,"meta":{"pathname":"note/sci/ma/completeness-of-real-numbers.md","category":"sci","body":() => import("@cache/note/posts/sci/ma/completeness-of-real-numbers"),"attr":{"title":"Completeness of the Real Numbers"},"toc":[{"level":2,"title":<>Least upper bound property</>,"link":"t"},{"level":2,"title":<>Monotone convergence theorem</>,"link":"t-2"},{"level":2,"title":<>Nested interval theorem</>,"link":"t-3"},{"level":2,"title":<>Bolzano-Weierstrass theorem</>,"link":"t-4"},{"level":2,"title":<>Cauchy criterion</>,"link":"t-5"},{"level":2,"title":<>Heine-Borel theorem</>,"link":"t-6"}],"created":"2024-09-19T21:15:50+08:00","updated":"2024-09-24T17:12:51+08:00","type":"post"}},
{"path":"/note/sci/ma","component":note,"meta":{"pathname":"note/sci/ma/index.md","category":"sci","body":() => import("@cache/note/posts/sci/ma/index"),"attr":{"title":"数学分析"},"toc":[],"created":"2024-09-19T21:15:50+08:00","updated":"2024-09-24T17:12:51+08:00","type":"index"}},
{"path":"/note/sci/ma/prove-that","component":note,"meta":{"pathname":"note/sci/ma/prove-that.md","category":"sci","body":() => import("@cache/note/posts/sci/ma/prove-that"),"attr":{"title":"Prove That..."},"toc":[{"level":2,"title":<>Set</>,"link":"t"},{"level":2,"title":<>Limit of a sequence</>,"link":"t-2"},{"level":2,"title":<>Limit of a function</>,"link":"t-3"},{"level":2,"title":<>Continuity</>,"link":"t-4"},{"level":2,"title":<>Derivative</>,"link":"t-5"}],"created":"2024-09-19T21:15:50+08:00","updated":"2024-09-24T17:12:51+08:00","type":"post"}},
{"path":"/note/sci/phy/chapter-27","component":note,"meta":{"pathname":"note/sci/phy/chapter-27.md","category":"sci","body":() => import("@cache/note/posts/sci/phy/chapter-27"),"attr":{"title":"Ch.27 Gauss' Law"},"toc":[{"level":2,"title":<>流量 Flux</>,"link":"t"},{"level":2,"title":<>Gauss’ Law</>,"link":"t-2"},{"level":3,"title":<>微分形式推导</>,"link":"t-3"},{"level":3,"title":<>推 Coloumb’s Law</>,"link":"t-4"},{"level":2,"title":<>应用</>,"link":"t-5"},{"level":3,"title":<>均匀带电球体</>,"link":"t-6"},{"level":3,"title":<>电荷分布于导体表面</>,"link":"t-7"}],"created":"2024-09-24T21:51:32+08:00","updated":"2024-09-24T21:51:32+08:00","type":"post"}},
{"path":"/note/sci/phy","component":note,"meta":{"pathname":"note/sci/phy/index.md","category":"sci","body":() => import("@cache/note/posts/sci/phy/index"),"attr":{"title":"物理学"},"toc":[],"created":"2024-09-24T17:12:51+08:00","updated":"2024-09-24T17:12:51+08:00","type":"index"}},
{"path":"/note/:pathMatch(.*)","component":note,"meta":{"pathname":"note/404.md","category":"","body":() => import("@cache/note/posts/404"),"attr":{"title":"404 Not Found","comment":false,"metadata":false},"toc":[],"created":"2024-09-04T22:24:34+08:00","updated":"2024-09-04T22:24:34+08:00","type":"404"}},
];
export default routes;
