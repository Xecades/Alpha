## 当前 TODO

 - AnimateHeight 嵌套的时候，第一次点击内部的 fold 会不反应（推测是 AnimateHeight 库的问题）
 - 搜索刚开始加载的时候，显示一个 loading 动画
 - 改 ::note 的样式：https://note.tonycrane.cc/ctf/misc/steg/
 - 左右栏 hover 的区域不要太大，不然很难受
 - metadata 鼠标 hover 显示详情的区域不要太大
 - Dark Mode 颜色得改一改
 - 在哪儿放回主页的按钮？（两个主页：网站主页 + 笔记主页）（放 index 页的 Vue components 里？）
 - 深色模式切换按钮（切换的时候给所有元素设置临时的 transition !important？）（放 rightbar？）
 - ScrollReveal 导致评论系统回复评论的窗口不显示
 - ScrollReveal 导致评论系统功能按钮有时候不显示
 - ToC 层级关系看起来很怪
 - Table 加上滚动条
 - Note 404 页面加上一些自定义组件
 - 搜索改成 token 级别的
 - 手机上 “Typst 渲染” 点 “源码” 点不动
 - tab fold 嵌套，高度改变会出问题
 - fold、tab 等支持搜索
 - KaTeX 中文字体，手机上不显示
 - Code block 添加标题
 - block code meta 参数的处理（转义、引号）
 - 搜索支持上下键选择，回车跳转
 - 评论系统支持 Cursor.js
 - 页面宽度改变时，Leftbar 实现动态响应
 - 测试平板上的显示效果
 - 测试移动设备上，当 Leftbar 目录太长时的显示效果（折行？）
 - 在合适的地方加上版权声明
 - 页面高度不够时，左右栏加上滚动
 - 重构动画模块

## 暂时不重要的 TODO

 - Typst 添加中文字体的支持
 - 代码块换行
 - 打印样式
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

## Markdown

 - 代码块功能按钮（复制，etc.）

## 长期

 - 搓一个评论系统（考虑使用 Serverless）
 - CDN
 - Status 页面（如果有了后端）
 - 联动 Cursor.js（参考 iPad 光标效果）
