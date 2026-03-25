# 性格测试 H5

7道题，发现你最适合的故事

## 部署指南

### 方案一：Netlify（推荐，完全免费）

1. **注册 Netlify**
   - 访问 https://app.netlify.com
   - 使用 GitHub / Google / Email 注册

2. **上传文件**
   - 方式A：直接拖拽文件夹到 Netlify
   - 方式B：连接 GitHub 仓库部署

3. **完成！**
   - 获得免费域名
   - 可绑定自定义域名

### 方案二：Vercel

1. **注册 Vercel**
   - 访问 https://vercel.com
   - 使用 GitHub 注册

2. **部署**
   - New Project → Import GitHub
   - 选择仓库 → Deploy

### 方案三：GitHub Pages

1. **创建仓库**
   - 将文件推送到 GitHub 仓库

2. **开启 Pages**
   - Settings → Pages → 选择 main branch

3. **访问**
   - `用户名.github.io/仓库名`

---

## 文件说明

```
personality-test/
├── index.html    # 主页面
├── style.css     # 样式文件
├── app.js        # 测试逻辑
├── data.js       # 题目和结果数据
└── README.md     # 说明文档
```

---

## 自定义配置

### 修改书名
打开 `data.js`，修改：
```javascript
const BOOK_NAME = "你的书名";
```

### 修改购买链接
打开 `app.js`，找到 `btn-buy`，添加购买链接：
```javascript
document.getElementById('buyLink').href = "购买链接";
```

### 修改颜色主题
打开 `style.css`，修改 `:root` 中的颜色变量：
```css
:root {
  --primary-color: #你的主色;
  --secondary-color: #你的辅色;
  --text-color: #你的文字色;
}
```

---

## 使用方法

1. 修改 `data.js` 中的书名和购买链接
2. 部署到 Netlify/Vercel/GitHub Pages
3. 获取链接，插入小红书笔记

---

## 注意事项

- 测试链接需要填写到小红书笔记中
- 建议在笔记中放置多个入口（正文 + 评论区置顶）
- 分享图会自动生成为 750x1000 像素
