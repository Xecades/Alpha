## 长期

 - 重构动画模块
 - 重构 Cursor.js（参考 iPad 光标效果，或许可以联动 DOM 元素）
 - 完善控制台日志系统
 - 搓一个评论系统（考虑使用 Serverless）
 - Status 页面（如果有了后端）
 - CDN

## 当前

 - 支持 Markdown 内部 style 标签
 - Tab 内图片，高度获取出了问题
 - AnimateHeight 嵌套的时候，第一次点击内部的 fold 会不反应（推测是 AnimateHeight 库的问题）
 - 在哪儿放回主页的按钮？（两个主页：网站主页 + 笔记主页）（放 index 页的 Vue components 里？）
 - 深色模式切换按钮（切换的时候给所有元素设置临时的 transition !important？）（放 rightbar？）
 - ScrollReveal 导致评论系统回复评论的窗口不显示
 - ScrollReveal 导致评论系统功能按钮有时候不显示
 - ToC 层级关系看起来很怪
 - Table 加上滚动条
 - Note 404 页面加上一些自定义组件
 - 搜索改成 token 级别的
 - 手机上 “Typst 渲染” 点 “源码” 点不动
 - fold、tab 等支持搜索
 - Code block 添加标题
 - block code meta 参数的处理（转义、引号）
 - 搜索支持上下键选择，回车跳转
 - 评论系统支持 Cursor.js
 - 在合适的地方加上版权声明
 - 页面高度不够时，左右栏加上滚动

## 暂时不重要的 TODO

 - KaTeX 中文字体，手机上不显示
 - 代码块功能按钮（复制，etc.）
 - Typst 添加中文字体的支持
 - 代码块换行
 - Command + P 打印样式
 - 动画顺序有问题
 - 导航时标题有些时候动画会消失
 - 双击标题有些时候动画会卡住
 - Markdown 图片加载时的处理
 - Markdown 图片加载失败时的处理
 - 添加 HTML `<meta>` 那一堆属性 
 - 在较窄的移动设备上，主页的 ruby text 折行会出问题
 - 字体异步加载
 - 完善文件夹监听（目前只有保存的时候才会触发，需要加上删除等操作）
 - 想办法过滤掉 \`[公式]\` 等 slot 内容
 - 搜索功能保留 LaTeX 源码（？）
 - Safari 上那一堆 favicon 的显示
 - Safari 卸载 DOM 的时候很卡（DOM 渲染完成后再加载 KaTeX？）
 - Safari 控制台字体问题
 - 标点挤压，需要中英文排版系统
 - 搜索数据库中空格的处理（要不直接删掉？）
 - 加一些彩蛋（例如 https://www.kirilv.com/canvas-confetti/）
