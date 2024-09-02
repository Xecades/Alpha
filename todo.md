 - 注意防抖
 - 动画不要太多
 - 加快动画响应速度
 - 卡顿处理！！！
 - 参考 https://xdino.vercel.app/

**卡顿分析:**

 - KaTeX 在组件挂载同时渲染
 - Vue 组件编译耗时

**解决方案:**

 - DOM 渲染完成后再加载 KaTeX
 - 传递静态 HTML（✓）-> 采用 JSX 渲染，这样还是可以使用 Vue 的组件
 - 可能有用：web worker（vue-worker）

**TODO:**

 - 用 vue-virtual-scroller 优化 dom 渲染
 - 字体异步加载
 - LaTeX 渲染导致页面卡顿 -> 尝试预渲染 LaTeX（x）
 - devDependencies 和 dependencies 分开
 - 在哪儿放回主页的按钮？（两个主页：网站主页 + 笔记主页）
 - 搜索点进去自动跳转到对应位置
 - 把左右侧边栏改成 position: absolute，不用 flex 了
 - Breadcrumb 删了
 - safari 下有大问题！
 - safari 下 console message 用不了 ascii art
 - safari 下网页 logo 颜色有问题
 - safari 下加载较大的页面，cursor 会卡住
 - safari 下右边栏完全不能用
 - safari 下左侧栏 categories 下划线显示很怪
 - safari 下 breadcrumb 的 sans-serif 字体无法显示
 - 搜索点进去的动画很怪
 - pre 块，目前只能触控板滚动，可能加上 word-wrap
 - 图片标题下划线被“LaTeX”截断了
 - 排版系统，因为 justify 导致间距不一致
 - 搜索数据库中空格的处理，要不直接删掉？
 - 搜索拿 parser 处理
 - 搜索保留 latex 源码
 - 点两次链接，动画会卡住
 - 完善和主页的衔接（左右边栏的动画）
 - note 页面切换时右边栏的动画
 - 右边栏会因为滚动条而抖动
 - 滚动条防抖
 - ScrollReveal 导致明显掉帧
 - ScrollReveal 滚动太快了会导致内容显示太慢
 - 添加页面加载的动画
 - 加一些彩蛋
 - 想办法过滤掉 \`[公式]\` 等 slot 内容
 - 完善文件夹监听，目前只有保存的时候才会触发，加上删除等操作
 - 加上时间戳
 - 优化 boundle 大小
 - 网页标题
 - Markdown 图片加载时的处理
 - Markdown 图片加载失败时的处理
 - 404 页面
 - Vitest 测试
 - 页面高度不够时，左右栏加上滚动
 - 使用 Suspense

## General

 - 移动端设备支持
 - 黑色模式
 - 全局动画
 - 评论系统（自己写？）
 - 版权声明

## Markdown

 - 外部链接标识
 - `{language=xxx}` 格式优化
 - 代码块复制按钮
 - Snippet 支持：https://xdino.vercel.app/articles/FunctionModuleTest
 - TikZ 支持
 - Typst 支持（预先 `typst c -f svg xxx.typ` 编译得到 svg）

## Cursor

 - 切换页面时，为避免卡顿，尝试隐藏副光标
