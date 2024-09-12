## 亟待解决

 - 在哪儿放回主页的按钮？（两个主页：网站主页 + 笔记主页）（放 index 页的 Vue components 里？）
 - 深色模式切换按钮（切换的时候给所有元素设置临时的 transition !important？）（放 rightbar？）
 - ScrollReveal 导致评论系统回复评论的窗口不显示
 - ScrollReveal 导致评论系统功能按钮有时候不显示

## 当前 TODO

 - Typst 添加中文字体的支持
 - <li class="task-list-item"><input type="checkbox" id="cbx_0" checked="true" disabled="true" /><label for="cbx_0"><span>x</span> 选中</label></li> span x 去掉
 - 搜索支持上下键选择，回车跳转
 - Snippet 支持：参考 https://xdino.vercel.app/articles/FunctionModuleTest，https://squidfunk.github.io/mkdocs-material/reference/admonitions/
 - 刷新记忆阅读进度
 - Markdown 引用图片，相对路径的处理
 - 评论系统支持 Cursor.js
 - 页面宽度改变时，Leftbar 实现动态响应
 - 测试平板上的显示效果
 - 测试移动设备上，当 Leftbar 目录太长时的显示效果（折行？）
 - 添加 index 页面的目录自动生成功能（写成一个 Markdown 组件？）
 - 在合适的地方加上版权声明
 - 页面高度不够时，左右栏加上滚动
 - 搜索点进去自动跳转到对应位置
 - Note 404 页面加上一些自定义组件

## 暂时不重要的 TODO

 - 打印样式
 - 动画顺序有问题
 - 导航时标题有些时候动画会消失
 - Markdown 图片加载时的处理
 - Markdown 图片加载失败时的处理
 - 添加 HTML `<meta>` 那一堆属性 
 - 在较窄的移动设备上，主页的 ruby text 折行会出问题
 - 字体异步加载
 - 搜索拿 parser 处理：或许可以用 https://github.com/fb55/htmlparser2
 - 完善文件夹监听（目前只有保存的时候才会触发，需要加上删除等操作）
 - 想办法过滤掉 \`[公式]\` 等 slot 内容
 - 搜索功能保留 LaTeX 源码（？）
 - Safari 上那一堆 favicon 的显示
 - Safari 卸载 DOM 的时候很卡（DOM 渲染完成后再加载 KaTeX？）
 - Safari 控制台字体问题
 - 标点挤压，需要中英文排版系统
 - 搜索数据库中空格的处理（要不直接删掉？）
 - 加一些彩蛋（例如 https://www.kirilv.com/canvas-confetti/）
 - CI 流程：目前是本地预处理后连着 cache 一起上传，考虑配置 Vercel 保存临时文件（只有 Serverless 能用：https://medium.com/@nksCodingLearnings/how-to-read-and-write-files-in-next-js-on-a-vercel-deployed-website-c1e9ea606cb6，写个 Serverless？）

## Markdown

 - 代码块功能按钮（复制，etc.）

## 长期

 - 搓一个评论系统（考虑使用 Serverless）
 - CDN
 - Status 页面（如果有了后端）
 - 联动 Cursor.js（参考 iPad 光标效果）

## 有丶意思

https://vercel.com/docs/image-optimization
