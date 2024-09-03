 - 注意防抖
 - 动画不要太多
 - 加快动画响应速度
 - 参考 https://xdino.vercel.app/

**卡顿分析:**

 - KaTeX 在组件挂载同时渲染

**解决方案:**

 - DOM 渲染完成后再加载 KaTeX

**TODO:**

 - 字体异步加载
 - 在哪儿放回主页的按钮？（两个主页：网站主页 + 笔记主页）
 - 搜索点进去自动跳转到对应位置
 - Breadcrumb 改成 Metadata
 - 排版系统，因为 justify 导致间距不一致
 - 搜索数据库中空格的处理，要不直接删掉？
 - 点两次链接，动画会卡住
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

**不重要的 TODO:**

 - 搜索拿 parser 处理：或许可以用 https://github.com/fb55/htmlparser2
 - 搜索保留 latex 源码
 - safari 控制台字体问题
 - safari favicon 显示问题

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
