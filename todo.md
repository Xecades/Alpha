**TODO:**

 - 开一个独立的数据库存 note 的评论
 - ScrollReveal 导致评论系统功能按钮有时候不显示
 - 评论系统支持 cursor.js

 - 页面宽度改变时，Leftbar 实现动态响应
 - 测试平板上的显示效果
 - 测试移动设备上，当 Leftbar 目录太长时的显示效果（折行？）
 - 添加 index 页面的目录自动生成功能（写成一个 Markdown 组件？）
 - 深色模式切换按钮（切换的时候给所有元素设置临时的 transition !important）
 - 在合适的地方加上版权声明
 - 在哪儿放回主页的按钮？（两个主页：网站主页 + 笔记主页）
 - 搜索点进去自动跳转到对应位置
 - 优化 boundle 大小
 - Markdown 图片加载时的处理
 - Markdown 图片加载失败时的处理
 - 页面高度不够时，左右栏加上滚动
 - Note 404 页面加上一些自定义组件

**不重要的 TODO:**

 - Vitest 测试
 - 添加 HTML `<meta>` 那一堆属性 
 - 在较窄的移动设备上，主页的 ruby text 折行会出问题
 - 测试 Safari 上那一堆 logo 的显示
 - 导航时标题有些时候会闪
 - 字体异步加载
 - DOM 渲染完成后再加载 KaTeX
 - 卸载 DOM 的时候很卡（Safari）
 - 搜索拿 parser 处理：或许可以用 https://github.com/fb55/htmlparser2
 - 完善文件夹监听，目前只有保存的时候才会触发，加上删除等操作
 - 想办法过滤掉 \`[公式]\` 等 slot 内容
 - 搜索保留 latex 源码
 - safari 控制台字体问题
 - safari favicon 显示问题
 - 排版系统，因为 justify 导致间距不一致
 - 搜索数据库中空格的处理，要不直接删掉？
 - 加一些彩蛋
 - 联动 cursor
 - 动画顺序有问题
 - 评论系统（自己写？）

## Markdown

 - 代码块功能按钮（复制，etc.）
 - TikZ 支持
 - Snippet 支持：https://xdino.vercel.app/articles/FunctionModuleTest
 - Typst 支持（预先 `typst c -f svg xxx.typ` 编译得到 svg）
