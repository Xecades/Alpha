 - 注意防抖
 - 动画不要太多
 - 加快动画响应速度
 - 卡顿处理
 - 参考 https://xdino.vercel.app/

## General

 - 移动端设备支持
 - 黑色模式
 - 全局动画
 - 评论系统（自己写？）
 - 搜索系统
 - 版权声明

## Markdown
 
 - 修改 Permalink 样式
 - 修改 hr 样式
 - Markdown 内部链接 Router-link 化
 - 外部链接标识
 - 图片标题
 - 图片点击放大
 - 引用的颜色太浅了
 - 行内代码，`{language=xxx}` 格式优化
 - 代码块样式优化
 - 字体优化
 - Task List 样式支持
 - LaTeX 支持
 - Snippet 支持：https://xdino.vercel.app/articles/FunctionModuleTest
 - TikZ 支持
 - Typst 支持（？）

## 优化

1. 渲染 Markdown + LaTeX：快
2. 读取文件：超级快（显著快于渲染）
3. 瓶颈出在 `import.meta.glob`，每次都要遍历当前目录，考虑预先生成缓存

**需要的缓存：**

1. 文件名及目录结构
2. 文章标题
3. 文章目录

没必要生成文件，直接在 `vite.config.js` 中预处理后挂载到全局中

要不同时把 Yaml 也解析了？

读取文件 -> MD 渲染 -> Vue SFC 编译 -> 挂载
       *-> 预处理标题及目录 -> 挂载
       *-> 处理搜索用的索引（用 `fuse.js`） -> 挂载 `fuse` 对象

（性能影响如何？是否需要保存到临时文件里？）

TODO: 舍弃 vite-plugin-markdown，自己实现渲染，提前编译成 Vue 组件
      舍弃 vite-plugin-yaml

~~问题：HMR 怎么办？用 liveReload 插件即可~~

参考：
 - https://github.com/hmsk/vite-plugin-markdown/blob/1c1dfb46c055a5325f17b00913d4e48e88ed731b/src/index.ts#L134
 - https://github.com/vuejs/core/blob/fbc0c42bcf6dea5a6ae664223fa19d4375ca39f0/packages/compiler-sfc/__tests__/compileTemplate.spec.ts
 - https://github.com/vuejs/core/blob/fbc0c42bcf6dea5a6ae664223fa19d4375ca39f0/packages/compiler-sfc/README.md
