# 🛠️ 极简 HTML 工具箱 (Pure HTML Toolbox)

一个基于纯 HTML + Tailwind CSS 构建的静态工具箱导航网站。

**设计理念**：零依赖、配置化管理、支持本地工具和外部链接。无需 Node.js，无需构建工具，双击即可运行。

## 📦 工具列表

### 本地工具

| 名称 | 类型 | 描述 |
|------|------|------|
| 3:4 图片转换器 | 📁 folder | 自动将图片转为3:4比例，支持渐变背景、圆角、水印等 |
| 代码高亮工具 | 📁 folder | 代码语法高亮，支持多种语言和主题 |

### 外部链接

| 名称 | 链接 | 描述 |
|------|------|------|
| AI 导航网站 | [ai.zhanglearning.com](https://ai.zhanglearning.com/) | 一个纯粹的机器学习导航网站 |
| 机器学习入门指南 | [r2ml.zhanglearning.com](https://r2ml.zhanglearning.com/) | 系统学习机器学习的入门指南 |
| SVG to PNG 在线转换 | [svg.zhanglearning.com](https://svg.zhanglearning.com/) | 在线将 SVG 转换为 PNG 格式 |
| 知识卡片画廊 | [cards.zhanglearning.com](https://cards.zhanglearning.com/) | 深度解析行业趋势，一图胜千言 |

## 📂 目录结构

```
/tools-by-ai
│
├── index.html              # 门户主页
├── config.js               # 配置文件 (管理工具列表、图标库)
├── README.md               # 说明文档
│
├── 05-34Pic/               # 3:4 图片转换器
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── 03-code-highlight-tool/ # 代码高亮工具
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── ...                     # 更多工具
```

## 🚀 快速开始

1. **下载/克隆** 本仓库
2. **双击打开** `index.html` 即可在浏览器中预览

## ➕ 如何添加新工具

打开 `config.js`，在 `window.TOOLS_CONFIG` 数组中添加配置：

### 方式一：本地文件夹工具

```javascript
{
    name: "我的新工具",
    desc: "这是一段简短的描述",
    path: "my-tool-folder",    // 文件夹名
    type: "folder",            // 类型：文件夹
    icon: "code"               // 图标 ID
}
```

### 方式二：本地单文件工具

```javascript
{
    name: "单文件工具",
    desc: "描述...",
    path: "my-tool.html",      // 文件名
    type: "file",              // 类型：文件
    icon: "calculator"
}
```

### 方式三：外部链接

```javascript
{
    name: "外部网站",
    desc: "描述...",
    path: "https://example.com/",  // 完整 URL
    type: "url",                   // 类型：外部链接
    icon: "link"
}
```

> 外部链接会显示 "外链" 标识，点击在新窗口打开。

## 🎨 图标系统

所有图标定义在 `config.js` 的 `window.ICONS` 对象中。

### 可用图标 ID

| 图标 ID | 用途 |
|---------|------|
| `calculator` | 计算器 |
| `code` | 代码/开发 |
| `color` | 设计/颜色 |
| `text` | 文本处理 |
| `image` | 图片处理 |
| `photo` | 照片 |
| `video` | 视频 |
| `music` | 音频 |
| `link` | 链接/导航 |
| `clock` | 时间/日期 |
| `lock` | 安全/密码 |
| `wifi` | 网络 |
| `download` | 下载 |
| `chart` | 图表/统计 |
| `settings` | 设置 |
| `user` | 用户/身份 |
| `document` | 文档 |
| `card` | 卡片 |
| `external` | 外部链接 |
| `default` | 默认通用 |

### 添加自定义图标

1. 访问 [Heroicons](https://heroicons.com/) 或其他 SVG 图标库
2. 复制 SVG 中 `<path>` 标签的 `d="..."` 属性值
3. 在 `config.js` 的 `window.ICONS` 中添加：

```javascript
window.ICONS = {
    // ... 原有图标
    rocket: "M12 2C6.48 2... (复制的 path)",
};
```

## 🛠️ 技术栈

- **HTML5**: 语义化结构
- **Tailwind CSS (CDN)**: 通过 CDN 引入，无需安装
- **JavaScript (Vanilla)**: 原生 JS，极速轻量

## ⚠️ 常见问题

**Q: 打开网页后什么都没有显示？**

A: 请按 F12 打开控制台。如果提示 CORS 或 file protocol 错误：
- 使用 VS Code 的 "Live Server" 插件打开
- 或确保 `config.js` 与 `index.html` 在同一目录且无语法错误

**Q: 如何修改背景或主题颜色？**

A: 编辑 `index.html` 中的 `<style>` 标签或 body 标签上的 Tailwind 类名。

---

© 2026 My HTML Toolbox
