# QA 层 — 交付前的两道关

> **本文件自足**：SVG 图形有两类错误。**必然错的**（空行、id 冲突、坐标越界）用脚本抓；**看起来错的**（重叠、错位、留白失衡）只能靠眼睛看。两道关都要过。

## 核心原则

**不要相信「代码看起来对」。**

一段 SVG 源码在编辑器里读起来完全合理，渲染出来可能是文字压线、节点重叠、箭头方向反了。源码审查只能抓语法，抓不了观感。

## 第一关：lint（确定性检查）

```bash
node scripts/svg-lint.mjs deck.marp.md
```

对每个 `<svg>` 块做 6 项检查：

| # | 检查 | 为什么能脚本化 |
|---|---|---|
| 1 | SVG 块内**空行** | 字符串扫描。空行会切断 HTML 块，图形静默消失 |
| 2 | SVG 块内 `---` | 字符串扫描。仍被解析为分页符，一页裂成两页 |
| 3 | `marker` / `clipPath` **id 唯一**，且所有 `url(#id)` 引用都有定义 | 正则提取 id 集合与引用集合做差集 |
| 4 | 元素坐标**越出 viewBox** | 解析 `x/y/cx/cy/width/height`（含 `<rect>` `<circle>` `<text>`）与 viewBox 比对 |
| 5 | 硬编码 `font-size` 属性 | 应走 CSS class，否则改字号时全图不同步 |
| 6 | viewBox 宽度 = **1020** | 数值比对。宽度不统一会导致缩放比例不一致，图形大小参差 |

退出码非 0 表示有 ERROR（阻断交付），WARNING 不阻断但应逐条看一眼。

**lint 不做的事**：元素重叠检测、对比度检测、文字溢出检测。这几项的误报率高于检出率，反而会让人开始无脑忽略告警——那比不 lint 更糟。它们交给第二关。

## 第二关：渲染（肉眼过一遍）

```bash
marp deck.marp.md --html --images png -o check
# 产出 check.001 check.002 …（无扩展名，需重命名）
```

渲染成 PNG 逐页看。**不要在浏览器里看 HTML 就完事**——浏览器有缩放和滚动，容易掩盖实际投影效果。

### 视觉检查清单

| 维度 | 检查项 |
|---|---|
| **几何** | 元素重叠？超出 viewBox？同级对齐？间距一致？连线穿过节点？ |
| **排版** | 文字溢出节点？字号 < 15px？标签互相压？中文基线偏上？多行文字首行没对齐？ |
| **语义** | 有没有孤立的节点（声明了关系却没画线）？不查图例能读懂线的关系吗？ |
| **层级** | 是不是所有节点一样大（= 没有重点）？色相是否超过 3 个？ |
| **对比** | 深底上的文字够亮吗？浅底上的文字够深吗？灰度打印还读得出吗？ |
| **贴底** | 底部元素压到 footer 了吗？（→ 加 `<!-- _class: diagram -->`） |

### 修完要重渲

```
发现问题 → 改 → 重新渲染 → 再看
```

一次渲染发现的问题通常不止一个——看到第一个就该把整页重新扫一遍。

## 排版自查（不用渲染就能查）

这几条在写的时候就该拦住：

- [ ] 节点数 ≤ 7
- [ ] 树的层级 ≤ 3
- [ ] 单节点标签 ≤ 6 个中文字
- [ ] 节点宽度 ≥ 标签宽度 + 24px
- [ ] 多行文字 ≤ 3 行
- [ ] 颜色 ≤ 3 个色相 + 1 个强调色
- [ ] `marker` id 用了本图专属前缀
- [ ] 所有字号走 class

## 单图 HTML 预览

画图阶段不必每次都起 deck。内联 SVG 可以单独放进一个 `.html` 直接在浏览器里迭代：

```html
<!DOCTYPE html><html lang="zh"><head><meta charset="utf-8">
<title>图名</title>
<style>
  body { background:#FAFAFA; font-family:'PingFang SC','Noto Sans CJK SC',sans-serif; margin:0; padding:40px; }
  .card { max-width:1140px; margin:0 auto; }
  svg { display:block; margin:0 auto; max-width:100%; height:auto; }
  svg text { font-family:'PingFang SC','Noto Sans CJK SC',sans-serif; }
  svg .t { font-size:26px; font-weight:700; }
  svg .tb { font-size:19px; font-weight:700; }
  svg .qt { font-size:20px; font-weight:700; }
  svg .sm { font-size:15px; }
  svg .lbl { font-size:15px; fill:#7f8c8d; }
</style></head><body><div class="card">
<!-- SVG 在这里 -->
</div></body></html>
```

预览更快（不用跑 marp），改一个字刷新就看到。但**最终仍要过 marp 渲染那一步**——deck 环境里的 CSS 继承和 standalone 不完全一样，尤其是 `section` 的字号基准。

`examples/infographics-gallery.html` 就是这样组织的，可以直接当模板抄。
