🛠️ 极简 HTML 工具箱门户 (Pure HTML Toolbox)

这是一个基于纯 HTML + Tailwind CSS 构建的静态工具箱导航网站。 其设计理念是：零依赖、单文件组件、配置化管理。无需 Node.js，无需构建工具，双击即可运行。

📂 目录结构

/工具箱文件夹
│
├── index.html        # 门户主页 (核心引擎，通常不需要修改)
├── config.js         # 配置文件 (管理工具列表、图标库)
├── README.md         # 说明文档 (本文件)
│
├── json-formatter.html   # 工具文件示例
├── timestamp.html        # 工具文件示例
└── ...                   # 更多工具文件
🚀 快速开始

下载/保存：确保 index.html 和 config.js 在同一个文件夹内。
运行：直接双击打开 index.html 即可在浏览器中预览。
➕ 如何添加新工具

当你获得一个新的工具代码（HTML文件）时，只需两步即可将其集成到门户中。

第 1 步：保存文件

将工具的 HTML 代码保存为文件（例如 my-tool.html），并放入项目根目录。

第 2 步：注册工具

用记事本或代码编辑器打开 config.js，在 window.TOOLS_CONFIG 数组中添加一项：

{
    name: "我的新工具",             // 标题
    desc: "这是一段简短的描述...",   // 描述
    file: "my-tool.html",          // 文件名 (必须与第1步保存的一致)
    icon: "code"                   // 图标 ID (见下方图标列表)
},
保存 config.js 并刷新网页，新工具卡片就会出现。

🎨 图标系统

所有的图标都定义在 config.js 的 window.ICONS 对象中。

常用图标 ID

你可以在添加工具时直接使用以下 ID：

calculator (计算器)
code (代码/开发)
color (设计/颜色)
text (文本处理)
image (图片处理)
video (视频)
music (音频)
link (链接/转换)
clock (时间/日期)
lock (安全/密码)
wifi (网络)
download (下载)
chart (图表/统计)
settings (设置/配置)
user (用户/身份)
default (默认通用)
如何添加自定义图标？

如果你需要一个特殊的图标（比如“火箭”）：

访问 Heroicons 或其他 SVG 图标库。
复制 SVG 代码中 <path> 标签里的 d="..." 属性值。
打开 config.js，在 window.ICONS 里添加一行：
<!-- end list -->

window.ICONS = {
    // ... 原有图标
    rocket: "M12 2C6.48 2... (你复制的一长串代码) ...",
};
现在你可以在工具配置里使用 icon: "rocket" 了。
🛠️ 技术栈说明

HTML5: 语义化结构。
Tailwind CSS (CDN): 通过 CDN 引入，无需安装，负责所有样式。
JavaScript (Vanilla): 原生 JS 负责读取配置和渲染列表，极速轻量。
⚠️ 常见问题

Q: 打开网页后什么都没有显示？ A: 请按 F12 打开控制台。如果提示 CORS 或 file protocol 错误，说明你的浏览器严格禁止从本地文件读取 .js。

解决方法 1 (推荐)：使用 VS Code 的 "Live Server" 插件打开。
解决方法 2：通常直接双击 index.html 在 Chrome/Edge 中是支持读取同级 .js 文件的。如果不行，请确保 config.js 就在旁边且没有语法错误。
Q: 如何修改背景或主题颜色？ A: 编辑 index.html 中的 <style> 标签或 body 标签上的 Tailwind 类名。
