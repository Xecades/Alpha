 - 注意防抖
 - 动画不要太多
 - 加快动画响应速度
 - 卡顿处理！！！
 - 参考 https://xdino.vercel.app/

**TODO:**

 - 在哪儿放回主页的按钮？（两个主页：网站主页 + 笔记主页）
 - 搜索点进去自动跳转到对应位置
 - Breadcrumb 删了
 - safari 下有大问题！
 - 左侧栏 categories，改成 a 标签，不然不知道可以点
 - 搜索点进去的动画很怪
 - code 块字体，不要直接 monospace
 - pre 块，目前只能触控板滚动，可能加上 word-wrap
 - 图片标题下划线被“LaTeX”截断了
 - 做 polyfill！！
 - 三角的 indicator 容易误解
 - ul ol 的行距
 - 排版系统，因为 justify 导致间距不一致
 - 搜索数据库中空格的处理，要不直接删掉？
 - 搜索的输入 trim 一下，不然搜空格会出来很多
 - 搜索拿 parser 处理
 - 搜索保留 latex 源码
 - 点两次链接，动画会卡住
 - 完善和主页的衔接（左右边栏的动画）
 - 横向滚动条，第一次展示保留
 - note 页面切换时右边栏的动画
 - 右边栏会因为滚动条而抖动
 - ScrollReveal 导致明显掉帧
 - ScrollReveal 滚动太快了会导致内容显示太慢
 - 添加页面加载的动画
 - 加一些彩蛋
 - 想办法过滤掉 \`[公式]\` 等 slot 内容
 - 完善文件夹监听，目前只有保存的时候才会触发，加上删除等操作
 - 加上时间戳
 - 优化 boundle 大小
 - 网页标题
 - TS-ize
 - Markdown 图片加载时的处理
 - Markdown 图片加载失败时的处理
 - 404 页面

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
