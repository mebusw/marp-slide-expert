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
  h1 { color: #c0392b; font-size: 1.9em; border-bottom: 3px solid #c0392b; }
  h2 { color: #2c3e50; font-size: 1.4em; }
  h3 { color: #e74c3c; font-size: 1.1em; }
  table {
    display: table !important;
    width: 100% !important;
    border-collapse: collapse;
    font-size: 0.82em;
  }
  /* ---- 页级分栏版式（C 族）----
     分栏不需要 --html，只有内联 SVG 才需要那个开关。 */
  .cols { display: grid; align-items: start; }
  .cols-2     { grid-template-columns: 1fr 1fr;       gap: 24px; }
  .cols-3     { grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .cols-main  { grid-template-columns: 2fr 1fr;        gap: 24px; }
  .split-h    { display: grid; grid-template-rows: auto auto; gap: 24px; align-items: start; }
  .cols h3, .split-h h3 { color: #c0392b; font-size: 1.05em; margin: 0 0 6px; }
  .cols p, .split-h p   { font-size: 0.8em; line-height: 1.5; margin: 0 0 8px; }
  .cols ul, .split-h ul { font-size: 0.82em; margin: 0 0 8px; }
  .cols table, .split-h table { font-size: 0.66em; }
  section.cover footer, section.divider footer, section.diagram footer { display: none; }
  th { background: #c0392b; color: white; padding: 8px 12px; }
  td { padding: 7px 12px; border-bottom: 1px solid #ddd; }
  tr:nth-child(even) { background: #f5f5f5; }
  section.cover {
    background: linear-gradient(135deg, #1a1a2e 0%, #c0392b 100%);
    color: white;
    display: flex; flex-direction: column;
    justify-content: center; align-items: flex-start;
  }
  section.cover h1 { color: white; border-bottom: 3px solid rgba(255,255,255,0.4); }
  section.cover h2 { color: rgba(255,255,255,0.85); }
  section.divider {
    background: #2c3e50; color: white;
    display: flex; flex-direction: column;
    justify-content: center; align-items: center; text-align: center;
  }
  section.divider h1 { color: #e74c3c; border-bottom: 3px solid #e74c3c; font-size: 2.4em; }
  code { background: #2c3e50; color: #2ecc71; padding: 3px 8px; border-radius: 4px; font-size: 0.85em; }
  footer { position: absolute; left: 900px; bottom: 25px; }
footer: UPerform AI & Agile Consulting
_paginate: skip
---

<!--
  渲染命令（这份不含内联 SVG，所以不需要 --html）：
  marp examples/infographic-columns.marp.md --pdf --allow-local-files

  注意：注释必须写在 frontmatter 的 `---` 之外。
  放进 frontmatter 里会破坏 YAML 解析，导致整个 style 块被静默丢弃——
  表现为分栏失效、配色全丢，而且不报任何错。

  这一份演示「页级版式」——一页的内容块怎么排。
  画图（内联 SVG 信息图）见 examples/infographics-gallery.html
  和 examples/smart-drawing-deck.marp.md。
-->

<!-- _class: cover -->

# 页级分栏版式

## 一页的内容块怎么排

> 什么时候该排版式，什么时候该画图

---

<!-- _class: divider -->

# 四族速查

## A 全幅 · B 单栏 · C 分栏 · D 混合

<!--
选择顺序：先试 B（单栏），超 15 行再考虑 C（分栏），有图再进 D。
分栏不是默认解——三栏塞三段话，不如拆成三页，每页一个论点。
-->

---

## B 单栏：默认解

内容线性、一次读完，就用最朴素的写法。

- 每页最多 15 行
- 表格最多 4 列、8 行（含表头）
- 超了就拆页，或把只讲给自己听的内容挪进演讲者备注

<!--
单栏能解决就别分栏。分栏的价值是「并置对比」——
判断问句：读者会来回看这两栏做比较吗？
不会 → 那是列表，不是对比，拆成两页。
-->

---

## C 分栏 · cols-2

<div class="cols cols-2">
<div class="col">

### 方案 A：自建

<p>团队已有基础，掌控力最强。</p>

- 周期 9 个月
- 长期成本高
- 可控性完全

</div>
<div class="col">

### 方案 B：采购

<p>上线快，但受限于厂商。</p>

- 周期 2 个月
- 长期成本中
- 可控性受限

</div>
</div>

<!--
每栏约 7 行预算（扣掉标题那 1 行）。
div 前后各留一个空行——div 内部的 markdown 才会被正确解析。
align-items:start 不能省，否则短栏被拉高、底部参差。
-->

---

## C 分栏 · cols-3

<div class="cols cols-3">
<div class="col">

### 演进

- 2024 试点
- 2025 扩面
- 2026 收敛

</div>
<div class="col">

### 挑战

- 数据孤岛
- 组织阻力
- 预算不足

</div>
<div class="col">

### 对策

- 建中台
- 搞对齐
- 分期投

</div>
</div>

<!--
三栏每栏只剩约 5 行预算（15 行是整页的，不是每栏的）。
再挤就是三堵字墙——那时拆成三页更好读。
-->

---

## C 分栏 · cols-main（最常用）

<div class="cols cols-main">
<div class="col">

### 核心结论

<p>把数据中台提到集团级，先统一口径，再谈分析。</p>

- 口径不一致是当前最大损耗
- 各业务线重复建设
- 指标无法横向比较

</div>
<div class="col">

| 维度 | 现状 | 目标 |
|---|---|---|
| 覆盖 | 3 团队 | 全公司 |
| 时延 | 5 天 | 1 天 |
| 成本 | 高 | 低 |

</div>
</div>

<!--
左边 2 份宽放要点，右边 1 份放佐证表。写反就写 1fr 2fr。
栏内表格要更小（font-size:0.66em），否则横向撑爆。
窄栏的表格列数上限是 2 列，这里 3 列已经偏挤。
-->

---

## C 分栏 · split-h

<div class="split-h">
<div>

**结论**：2026 年完成全量迁移，Q4 之前不停留在试点阶段。

</div>
<div>

| 阶段 | 时间 | 负责 |
|---|---|---|
| 试点 | 2025 Q3 | 平台组 |
| 扩面 | 2026 Q1 | 各业务线 |
| 收敛 | 2026 Q4 | PMO |

</div>
</div>

<!--
上结论下证据、上现状下目标。上半区不要超过 4 行，
下半区是表格，行数多了整页会往下撑。
-->

---

## C 分栏 · 双栏各带表

<div class="cols cols-2">
<div class="col">

### 改造前

| 痛点 | 影响 |
|---|---|
| 口径不一 | 决策慢 |
| 重复建设 | 浪费 |

</div>
<div class="col">

### 改造后

| 收益 | 幅度 |
|---|---|
| 时延 | -80% |
| 复用 | +3x |

</div>
</div>

<!--
两张对照表并排。分栏后宽度只有原来的 1/2，
4 列的表在栏里会横向溢出——每张控制在 2-3 列。
-->

---

## 版式 vs 画图：怎么选

**问一句：这一页要表达「内容之间的结构关系」吗？**

| | 排版式（本文件） | 画图 |
|---|---|---|
| 排的是什么 | 一页的内容块 | 一张图内部的节点和连线 |
| 手段 | CSS grid + `<div>` | 内联 `<svg>` |
| 要 `--html` 吗 | **不需要** | **需要** |
| 适合 | 并列内容、并置对比 | 依赖、演进、循环、定位 |

<!--
这是最容易返工的地方：内容多就排版式，要表达关系才画图。
版式 → references/layout-patterns.md
画图 → references/infographics-svg/
-->

---

<!-- _class: divider -->

# 图例

## SVG 信息图见另一个文件

> `examples/infographics-gallery.html`

用浏览器直接打开，那里有 13 个骨架、6 个隐喻外壳、9 套风格的横向总览。
