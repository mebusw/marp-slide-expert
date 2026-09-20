# CSS Style Bootstrap

A reusable style block to drop into a new deck's frontmatter. **这是优普丰 / openclaw 课程的标准配色**（红 + 深蓝黑主题），与 `openclaw_lesson01.md`、`fde_lesson*.marp.md` 等所有优普丰 marp 课件保持视觉一致。

调色板来源：从 `openclaw_lesson01.md` 提取并校准。

## 配色锚点（不许改）

| 用途 | 色值 |
|------|------|
| 主红（accent） | `#c0392b` |
| 亮红（H3 / 强调） | `#e74c3c` |
| 深蓝黑（背景 / 标题 / code 背景） | `#1a1a2e` |
| 深蓝灰（divider 背景 / H2） | `#2c3e50` |
| 文本主色 | `#1a1a2e` |
| 背景色 | `#FAFAFA` |
| 表格偶数行 | `#f5f5f5` |
| code 文字（绿） | `#2ecc71` |

## Full style block（与 openclaw 完全一致）

```yaml
---
marp: true
theme: default
paginate: true
style: |-
  section {
    font-family: 'PingFang SC', 'Microsoft YaHei', 'Noto Sans CJK SC', sans-serif;
    font-size: 22px;
    background: #FAFAFA;
    color: #1a1a2e;
  }
  h1 {
    color: #c0392b;
    font-size: 1.9em;
    border-bottom: 3px solid #c0392b;
  }
  h2 {
    color: #2c3e50;
    font-size: 1.4em;
  }
  h3 {
    color: #e74c3c;
    font-size: 1.1em;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.82em;
  }
  th {
    background: #c0392b;
    color: white;
    padding: 8px 12px;
  }
  td {
    padding: 7px 12px;
    border-bottom: 1px solid #ddd;
  }
  tr:nth-child(even) { background: #f5f5f5; }
  section.cover {
    background: linear-gradient(135deg, #1a1a2e 0%, #c0392b 100%);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  section.cover h1 {
    color: white;
    border-bottom: 3px solid rgba(255,255,255,0.4);
    font-size: 2.2em;
    white-space: nowrap;
    box-sizing: content-box;
    width: 60%;
  }
  section.cover h2 {
    color: rgba(255,255,255,0.85);
    white-space: nowrap;
    box-sizing: content-box;
    width: 60%;
  }
  section.cover p {
    color: rgba(255,255,255,0.75);
    white-space: nowrap;
    box-sizing: content-box;
    width: 70%;
  }
  section.divider {
    background: #2c3e50;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  section.divider h1 {
    color: #e74c3c;
    border-bottom: 3px solid #e74c3c;
    font-size: 2.4em;
    white-space: nowrap;
    box-sizing: content-box;
    width: 25%;
  }
  section.divider h2 {
    color: rgba(255,255,255,0.8);
    font-size: 1.1em;
    white-space: nowrap;
    box-sizing: content-box;
    width: 50%;
  }
  code {
    background: #2c3e50;
    color: #2ecc71;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 0.85em;
  }
  pre {
    background: #1a1a2e;
    color: #2ecc71;
    padding: 16px;
    border-radius: 8px;
    font-size: 0.78em;
    line-height: 1.45;
  }
  pre code {
    background: transparent;
    color: inherit;
    padding: 0;
  }
  blockquote {
    border-left: 4px solid #e74c3c;
    background: #fff;
    padding: 10px 20px;
    font-style: italic;
    color: #555;
  }
  footer {
    position: absolute;
    left: 900px;
    bottom: 25px;
  }
footer: UPerform AI & Agile Consulting
_paginate: skip
header:
---
```

## 用法

1. 把上面 `style: |-` 整块（含 `footer` 和 `header` 行）复制到新 deck 的 frontmatter
2. 顶部加 `<!-- _class: cover -->` 做封面页
3. 大章节用 `<!-- _class: divider -->` 做分隔页
4. **不要** 用 `<div class="tip">` 之类的 div 提示框（marp 不支持 div 布局），改用：
   - 引用块 + emoji：`> 💡 提示：xxx`
   - 表格
   - Emoji + 加粗段落：`**✅ 产出**：xxx`

## Customization points

| 想改什么 | 编辑哪里 |
|---|---|
| 不同 accent 色 | 改 `h1` color + `section.cover`/`section.divider` 渐变两端的色值 |
| 更大正文 | `section { font-size: 24px; }` |
| 更小表格 | `table { font-size: 0.7em; }` |
| code 块更大 | `pre { font-size: 0.85em; }` |
| 封面/分隔页不显示页码 | 加 `<!-- _paginate: skip -->` 到那些 slide |

## 已知差异 vs openclaw 参考

- openclaw 模板里的 `class="tip"` / `class="warn"` / `class="danger"` / `class="success"` / `class="formula"` / `class="time"` 这类 div class 已废弃。本风格去掉，提示改用引用块 + emoji。
- 时间标签（`.time`）可改用 `> ⏰ **20 min**` 风格。
- 公式高亮（`.formula`）可改用引用块 + 居中 + 加粗。

## Validation

渲染后检查：
1. 中文无缺字（确保渲染机装了 `PingFang SC` / `Microsoft YaHei` / `Noto Sans CJK SC` 之一）
2. 封面 / 分隔页背景为深蓝黑→红渐变 / 深蓝灰底
3. 表格不超出 slide 宽（每页 ≤ 4 列）
4. code 块无横向滚动条（提示词模板较长时用 `pre { font-size: 0.7em }` 缩）
5. 提示词模板用 `<details>` 折叠（marp 支持 HTML details）或拆为多 slide，避免单页过载
