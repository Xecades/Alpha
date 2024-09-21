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
import type { JSX } from "vue/jsx-runtime";
const jsx: JSX.Element = (<><h2 id="t" tabindex="-1" class="heading">Semantic Versioning <a class="cursor header-anchor" href="#t">¶</a></h2>
<p><strong>Refer to</strong>: <Anchor href="https://semver.org/">Semantic Versioning</Anchor>.</p>
<p>Given a version number <code class="inline-code">{"MAJOR.MINOR.PATCH"}</code>, increment the:</p>
<ul>
<li><code class="inline-code">{"MAJOR"}</code> version when you make incompatible API changes.</li>
<li><code class="inline-code">{"MINOR"}</code> version when you add functionality in a backward compatible manner.</li>
<li><code class="inline-code">{"PATCH"}</code> version when you make backward compatible bug fixes.</li>
</ul>
<hr />
<h2 id="t-2" tabindex="-1" class="heading">Conventional Commits <a class="cursor header-anchor" href="#t-2">¶</a></h2>
<p><strong>Refer to</strong>: <Anchor href="https://www.conventionalcommits.org/">Conventional Commits</Anchor> / <Anchor href="https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format">Angular Convention</Anchor>.</p>
<p>Structure of the commit message:</p>
<BlockCode lang="plain" html={"<code>&lt;type&gt;[optional scope]: &lt;description&gt;\n\n[optional body]\n\n[optional footer(s)]\n</code>"}></BlockCode><ul>
<li><strong><code class="inline-code">{"fix"}</code></strong>: correlates with <code class="inline-code">{"PATCH"}</code> in SemVer.</li>
<li><strong><code class="inline-code">{"feat"}</code></strong>: correlates with <code class="inline-code">{"MINOR"}</code> in SemVer.</li>
<li><strong><code class="inline-code">{"BREAKING CHANGE"}</code></strong>: a commit that has a footer <code class="inline-code">{"BREAKING CHANGE"}</code>, or appends a <code class="inline-code">{"!"}</code> after the type/scope, correlating with <code class="inline-code">{"MAJOR"}</code> in SemVer.</li>
<li><strong><code class="inline-code">{"<type>"}</code></strong>: <code class="inline-code">{"build"}</code>, <code class="inline-code">{"chore"}</code>, <code class="inline-code">{"ci"}</code>, <code class="inline-code">{"docs"}</code>, <code class="inline-code">{"style"}</code>, <code class="inline-code">{"refactor"}</code>, <code class="inline-code">{"perf"}</code>, <code class="inline-code">{"test"}</code>, etc.</li>
<li><strong><code class="inline-code">{"<description>"}</code></strong>:
<ul>
<li>use the imperative, present tense: “change” not “changed” nor “changes”.</li>
<li>don’t capitalize the first letter.</li>
<li>no dot (<code class="inline-code">{"."}</code>) at the end.</li>
</ul>
</li>
</ul>
<p>Example:</p>
<BlockCode lang="plain" html={"<code>chore!: drop support for Node 6\n\nBREAKING CHANGE: use JavaScript features not available in Node 6.\n</code>"}></BlockCode></>)
export default jsx;
