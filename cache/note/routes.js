import note from "@/layout/note.vue";
export default [
{path: "/note/cs/c",component: note,meta: {pathname: "note/cs/c/index.md",category: "",body: () => import("@cache/note/posts/cs/c/index.jsx"),},},
{path: "/note/cs/c/snippets",component: note,meta: {pathname: "note/cs/c/snippets.md",category: "",body: () => import("@cache/note/posts/cs/c/snippets.jsx"),},},
{path: "/note/cs/cldf",component: note,meta: {pathname: "note/cs/cldf.md",category: "",body: () => import("@cache/note/posts/cs/cldf.jsx"),},},
{path: "/note/cs/fds",component: note,meta: {pathname: "note/cs/fds.md",category: "",body: () => import("@cache/note/posts/cs/fds.jsx"),},},
{path: "/note/cs",component: note,meta: {pathname: "note/cs/index.md",category: "",body: () => import("@cache/note/posts/cs/index.jsx"),},},
{path: "/note/cs/test/customToken",component: note,meta: {pathname: "note/cs/test/customToken.md",category: "",body: () => import("@cache/note/posts/cs/test/customToken.jsx"),},},
{path: "/note/cs/test",component: note,meta: {pathname: "note/cs/test/index.md",category: "",body: () => import("@cache/note/posts/cs/test/index.jsx"),},},
{path: "/note/cs/test/latex",component: note,meta: {pathname: "note/cs/test/latex.md",category: "",body: () => import("@cache/note/posts/cs/test/latex.jsx"),},},
{path: "/note/cs/test/markdown",component: note,meta: {pathname: "note/cs/test/markdown.md",category: "",body: () => import("@cache/note/posts/cs/test/markdown.jsx"),},},
{path: "/note/cs/test/toc",component: note,meta: {pathname: "note/cs/test/toc.md",category: "",body: () => import("@cache/note/posts/cs/test/toc.jsx"),},},
{path: "/note",component: note,meta: {pathname: "note/index.md",category: "",body: () => import("@cache/note/posts/index.jsx"),},},
{path: "/note/math/dm",component: note,meta: {pathname: "note/math/dm.md",category: "",body: () => import("@cache/note/posts/math/dm.jsx"),},},
{path: "/note/math/fourier",component: note,meta: {pathname: "note/math/fourier.md",category: "",body: () => import("@cache/note/posts/math/fourier.jsx"),},},
{path: "/note/math",component: note,meta: {pathname: "note/math/index.md",category: "",body: () => import("@cache/note/posts/math/index.jsx"),},},
{path: "/note/math/la",component: note,meta: {pathname: "note/math/la.md",category: "",body: () => import("@cache/note/posts/math/la.jsx"),},},
];