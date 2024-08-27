 - 注意防抖
 - 动画不要太多
 - 加快动画响应速度
 - 卡顿处理
 - 参考 https://xdino.vercel.app/

**TODO:**

 - 在哪儿放回主页的按钮？（两个主页：网站主页 + 笔记主页）
 - anchor 点击的跳转没有动画
 - 搜索点进去自动跳转到对应位置
 - 关闭搜索的时候会闪烁，感觉是滚动条的问题
 - Breadcrumb 删了
 - 完善和主页的衔接
 - 加一些彩蛋
 - 想办法过滤掉 \`[公式]\` 等 slot 内容
 - 完善文件夹监听，目前只有保存的时候才会触发，加上删除等操作
 - 加上时间戳
 - 优化 boundle 大小
 - 网页标题
 - TS-ize

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
