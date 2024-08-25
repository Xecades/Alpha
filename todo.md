 - 注意防抖
 - 动画不要太多
 - 加快动画响应速度
 - 卡顿处理
 - 参考 https://xdino.vercel.app/

**TODO:**

 - 给左右侧边栏加上背景，方便在较窄屏幕上展示
 - 在哪儿放回主页的按钮？
 - markdown 数学公式过大，行间距过小
 - 处理数学公式超出 div 的情况（横向滚动条）
 - 用 heti 处理标点挤压等排版问题（e.g. `），`）
 - a 标签的左右没必要留 margin，交给排版系统解决
 - 调高搜索的阈值
 - 搜索点进去自动跳转到对应位置
 - Breadcrumb 删了
 - 完善和主页的衔接
 - 加一些彩蛋
 - 搜索系统，标题也做高亮
 - 想办法过滤掉 \`[公式]\` 等 slot 内容
 - 完善文件夹监听，目前只有保存的时候才会触发，加上删除等操作
 - 加上时间戳

## General

 - 移动端设备支持
 - 黑色模式
 - 全局动画
 - 评论系统（自己写？）
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
 - Snippet 支持：https://xdino.vercel.app/articles/FunctionModuleTest
 - TikZ 支持
 - Typst 支持（？）

## Cursor

 - 切换页面时，为避免卡顿，尝试隐藏副光标
