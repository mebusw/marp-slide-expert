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
  svg {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    height: auto;
  }
  svg text {
    font-family: 'PingFang SC', 'Microsoft YaHei', 'Noto Sans CJK SC', sans-serif;
  }
  svg .t   { font-size: 26px; font-weight: 700; }
  svg .tb  { font-size: 19px; font-weight: 700; }
  svg .sm  { font-size: 15px; }
  svg .lbl { font-size: 15px; fill: #7f8c8d; }
  svg .qt  { font-size: 20px; font-weight: 700; }
  /* marp default 主题给 table 设了 display:block，宽度撑不开，必须改回 table */
  table {
    display: table !important;
    width: 100% !important;
    border-collapse: collapse;
    font-size: 0.82em;
  }
  section.cover footer,
  section.divider footer,
  section.diagram footer {
    display: none;
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
  footer {
    position: absolute;
    left: 900px;
    bottom: 25px;
  }
footer: UPerform AI & Agile Consulting
_paginate: skip
header:
---

<!-- _class: cover -->

# Smart Drawing
## 用 Marp 画出咨询级图形
阶梯 · 矩阵 · 箭头串 · 关系图

<!--
⚠️ 渲染本 deck 必须带 --html，否则内联 SVG 会被 Marp 转义成一整页纯文本：
    marp examples/smart-drawing-deck.marp.md --html --pdf --allow-local-files
-->

---

<!-- _class: divider -->

# Smart Drawing
## 咨询顾问常用的四种关系图

<!--
Speaker notes:
- 这页只是过渡，直接翻到下一页。
- 强调：这些图不是 PPT 形状拼的，是内联 SVG，跟着 Markdown 一起走。
-->

---

## ① 阶梯图 · 成熟度递进

<!-- _class: diagram -->

<svg viewBox="0 0 1020 470" width="100%">
  <defs>
    <marker id="a1" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
      <path d="M0,0 L10,4 L0,8 z" fill="#c0392b"/>
    </marker>
  </defs>
  <text x="20" y="30" class="sm" fill="#c0392b" font-weight="700">能力成熟度递进 →</text>
  <line x1="20" y1="48" x2="990" y2="48" stroke="#c0392b" stroke-width="2" marker-end="url(#a1)"/>
  <line x1="10" y1="420" x2="1010" y2="420" stroke="#dcdcdc" stroke-width="1.5"/>
  <rect x="20"  y="330" width="176" height="90" fill="#95a5a6"/>
  <rect x="216" y="270" width="176" height="150" fill="#7f8c8d"/>
  <rect x="412" y="210" width="176" height="210" fill="#2c3e50"/>
  <rect x="608" y="150" width="176" height="270" fill="#a93226"/>
  <rect x="804" y="90"  width="176" height="330" fill="#c0392b"/>
  <text x="85"  y="382" class="t" fill="#ffffff" text-anchor="middle">L1</text>
  <text x="85"  y="404" class="sm" fill="#ffffff" text-anchor="middle" opacity=".85">个人英雄</text>
  <text x="304"  y="350" class="t" fill="#ffffff" text-anchor="middle">L2</text>
  <text x="304"  y="372" class="sm" fill="#ffffff" text-anchor="middle" opacity=".85">有流程文档</text>
  <text x="500"  y="322" class="t" fill="#ffffff" text-anchor="middle">L3</text>
  <text x="500"  y="344" class="sm" fill="#ffffff" text-anchor="middle" opacity=".85">团队自组织</text>
  <text x="696"  y="294" class="t" fill="#ffffff" text-anchor="middle">L4</text>
  <text x="696"  y="316" class="sm" fill="#ffffff" text-anchor="middle" opacity=".85">数据驱动</text>
  <text x="892"  y="266" class="t" fill="#ffffff" text-anchor="middle">L5</text>
  <text x="892"  y="288" class="sm" fill="#ffffff" text-anchor="middle" opacity=".85">持续进化</text>
  <text x="85" y="446" class="lbl" text-anchor="middle">靠个人</text>
  <text x="304" y="446" class="lbl" text-anchor="middle">可复制</text>
  <text x="500" y="446" class="lbl" text-anchor="middle">可度量</text>
  <text x="696" y="446" class="lbl" text-anchor="middle">可预测</text>
  <text x="892" y="446" class="lbl" text-anchor="middle">可自愈</text>
</svg>

> 🎯 每级台阶 = 现状与目标之间的一个可交付跃迁

<!--
Speaker notes:
- 阶梯图 = 现状（左下）到目标（右上）的叙事线，天然带"方向感"，适合讲路线图、成熟度。
- 五个色阶用同一色相由灰到红，最后一级最重 = 视觉焦点落在终点。
- 改内容只改 rect 的 y/height 和 text，不用动结构。
-->

---

## ② 箭头串 · 五步落地路径

<!-- _class: diagram -->

<svg viewBox="0 0 1020 300" width="100%">
  <defs>
    <marker id="a2" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
      <path d="M0,0 L10,4 L0,8 z" fill="#c0392b"/>
    </marker>
  </defs>
  <path d="M10,88 L160,88 L194,145 L160,202 L10,202 Z" fill="#95a5a6"/>
  <path d="M202,88 L352,88 L386,145 L352,202 L202,202 Z" fill="#7f8c8d"/>
  <path d="M394,88 L544,88 L578,145 L544,202 L394,202 Z" fill="#2c3e50"/>
  <path d="M586,88 L736,88 L770,145 L736,202 L586,202 Z" fill="#a93226"/>
  <path d="M778,88 L928,88 L962,145 L928,202 L778,202 Z" fill="#c0392b"/>
  <circle cx="85"  cy="46" r="23" fill="#ffffff" stroke="#95a5a6" stroke-width="2.5"/>
  <circle cx="277"  cy="46" r="23" fill="#ffffff" stroke="#7f8c8d" stroke-width="2.5"/>
  <circle cx="469"  cy="46" r="23" fill="#ffffff" stroke="#2c3e50" stroke-width="2.5"/>
  <circle cx="661"  cy="46" r="23" fill="#ffffff" stroke="#a93226" stroke-width="2.5"/>
  <circle cx="853"  cy="46" r="23" fill="#ffffff" stroke="#c0392b" stroke-width="2.5"/>
  <text x="85" y="54" class="tb" fill="#95a5a6" text-anchor="middle">1</text>
  <text x="277" y="54" class="tb" fill="#7f8c8d" text-anchor="middle">2</text>
  <text x="469" y="54" class="tb" fill="#2c3e50" text-anchor="middle">3</text>
  <text x="661" y="54" class="tb" fill="#a93226" text-anchor="middle">4</text>
  <text x="853" y="54" class="tb" fill="#c0392b" text-anchor="middle">5</text>
  <text x="85"  y="140" class="t" fill="#ffffff" text-anchor="middle">愿景</text>
  <text x="85"  y="168" class="sm" fill="#ffffff" text-anchor="middle" opacity=".85">统一共识</text>
  <text x="277" y="140" class="t" fill="#ffffff" text-anchor="middle">战略</text>
  <text x="277" y="168" class="sm" fill="#ffffff" text-anchor="middle" opacity=".85">有所取舍</text>
  <text x="469" y="140" class="t" fill="#ffffff" text-anchor="middle">举措</text>
  <text x="469" y="168" class="sm" fill="#ffffff" text-anchor="middle" opacity=".85">资源聚焦</text>
  <text x="661" y="140" class="t" fill="#ffffff" text-anchor="middle">项目</text>
  <text x="661" y="168" class="sm" fill="#ffffff" text-anchor="middle" opacity=".85">分组交付</text>
  <text x="853" y="140" class="t" fill="#ffffff" text-anchor="middle">度量</text>
  <text x="853" y="168" class="sm" fill="#ffffff" text-anchor="middle" opacity=".85">闭环校准</text>
  <line x1="108" y1="252" x2="914" y2="252" stroke="#c0392b" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#a2)"/>
  <text x="469" y="282" class="sm" fill="#7f8c8d" text-anchor="middle">从"想清楚"到"做出来"，每一步都有可交付物</text>
</svg>

<!--
Speaker notes:
- 箭头串（process arrow）= 流程叙事，横向阅读，一眼看五步。
- 关键技法：每个箭头是一条 5 点 path——矩形 + 右侧 34px 的三角尖。文字只放在矩形部分，居中于 (x+75)，不要按整个外框居中。
- 反面教材：做成 6 点的空心 ">" 形，左半边是镂空的，白字会浮在洞里完全看不见。
- 下方虚线是"结果反哺"，把五步变成一个闭环而不是一次性流程。
-->

---

## ③ 矩阵图 · 业务组合取舍

<!-- _class: diagram -->

<svg viewBox="0 0 1020 530" width="100%">
  <defs>
    <marker id="a3x" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
      <path d="M0,0 L10,4 L0,8 z" fill="#1a1a2e"/>
    </marker>
    <marker id="a3y" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
      <path d="M0,0 L10,4 L0,8 z" fill="#1a1a2e"/>
    </marker>
  </defs>
  <rect x="120" y="70"  width="375" height="200" fill="#f2f7fa"/>
  <rect x="495" y="70"  width="375" height="200" fill="#fdecea"/>
  <rect x="120" y="270" width="375" height="200" fill="#f7f7f7"/>
  <rect x="495" y="270" width="375" height="200" fill="#fdf6e8"/>
  <line x1="120" y1="470" x2="895" y2="470" stroke="#1a1a2e" stroke-width="2" marker-end="url(#a3x)"/>
  <line x1="120" y1="470" x2="120" y2="55"  stroke="#1a1a2e" stroke-width="2" marker-end="url(#a3y)"/>
  <line x1="495" y1="70" x2="495" y2="470" stroke="#ffffff" stroke-width="3"/>
  <line x1="120" y1="270" x2="870" y2="270" stroke="#ffffff" stroke-width="3"/>
  <text x="500" y="505" class="sm" fill="#1a1a2e" text-anchor="middle" font-weight="700">相对市场份额 →</text>
  <text x="60" y="270" class="sm" fill="#1a1a2e" text-anchor="middle" font-weight="700" transform="rotate(-90,60,270)">相对增长率 →</text>
  <text x="145" y="98"  class="qt" fill="#7f8c8d">问题业务</text>
  <text x="145" y="120" class="sm" fill="#95a5a6">高增长 · 低份额</text>
  <text x="520" y="98"  class="qt" fill="#c0392b">明星业务</text>
  <text x="520" y="120" class="sm" fill="#e74c3c">高增长 · 高份额</text>
  <text x="145" y="298" class="qt" fill="#95a5a6">瘦狗业务</text>
  <text x="145" y="320" class="sm" fill="#a6a6a6">低增长 · 低份额</text>
  <text x="520" y="298" class="qt" fill="#b9770e">现金牛业务</text>
  <text x="520" y="320" class="sm" fill="#c39b3a">低增长 · 高份额</text>
  <circle cx="700" cy="200" r="26" fill="#c0392b" opacity=".85"/>
  <text x="735" y="206" class="sm" fill="#1a1a2e" font-weight="700">AI 助手</text>
  <circle cx="640" cy="140" r="16" fill="#e74c3c" opacity=".8"/>
  <text x="662" y="146" class="sm" fill="#1a1a2e">云迁移</text>
  <circle cx="300" cy="200" r="18" fill="#7f8c8d" opacity=".85"/>
  <text x="326" y="206" class="sm" fill="#1a1a2e">出海版</text>
  <circle cx="661" cy="390" r="30" fill="#b9770e" opacity=".85"/>
  <text x="758" y="396" class="sm" fill="#1a1a2e" font-weight="700">核心订阅</text>
  <circle cx="280" cy="390" r="12" fill="#95a5a6" opacity=".85"/>
  <text x="300" y="396" class="sm" fill="#1a1a2e">硬件</text>
  <text x="880" y="30" class="sm" fill="#7f8c8d" text-anchor="end">气泡大小 = 收入贡献</text>
</svg>

<!--
Speaker notes:
- 矩阵 = 资源取舍图，四个象限给"行动指令"：加投 / 攻坚 / 收割 / 放弃。
- 画法要点：象限底色用极淡的色，文字才用重色，保证气泡是视觉主体。
- 象限分隔线用白色，比灰色干净（灰色会在浅底上显脏）。
-->

---

## ④ 关系图 · 价值驱动树

<!-- _class: diagram -->

<svg viewBox="0 0 1020 460" width="100%">
  <defs>
    <marker id="a4" markerWidth="9" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L9,4 L0,8 z" fill="#c0392b"/>
    </marker>
  </defs>
  <rect x="425" y="12" width="200" height="62" rx="6" fill="#1a1a2e"/>
  <text x="525" y="52" class="t" fill="#ffffff" text-anchor="middle">企业价值</text>
  <rect x="175" y="150" width="160" height="56" rx="6" fill="#2c3e50"/>
  <text x="255" y="186" class="tb" fill="#ffffff" text-anchor="middle">客户价值</text>
  <rect x="715" y="150" width="160" height="56" rx="6" fill="#2c3e50"/>
  <text x="795" y="186" class="tb" fill="#ffffff" text-anchor="middle">内部能力</text>
  <path d="M525,74 V108 H255 V146" fill="none" stroke="#b9c3cc" stroke-width="2"/>
  <path d="M525,74 V108 H795 V146" fill="none" stroke="#b9c3cc" stroke-width="2"/>
  <path d="M255,206 V238 H105 V284" fill="none" stroke="#b9c3cc" stroke-width="2"/>
  <path d="M255,206 V238 H245 V284" fill="none" stroke="#b9c3cc" stroke-width="2"/>
  <path d="M255,206 V238 H385 V284" fill="none" stroke="#b9c3cc" stroke-width="2"/>
  <path d="M795,206 V238 H655 V284" fill="none" stroke="#b9c3cc" stroke-width="2"/>
  <path d="M795,206 V238 H795 V284" fill="none" stroke="#b9c3cc" stroke-width="2"/>
  <path d="M795,206 V238 H935 V284" fill="none" stroke="#b9c3cc" stroke-width="2"/>
  <rect x="40"  y="290" width="130" height="54" rx="4" fill="#fdecea" stroke="#e74c3c" stroke-width="1.5"/>
  <text x="105" y="323" class="sm" fill="#1a1a2e" text-anchor="middle">客户洞察</text>
  <rect x="180" y="290" width="130" height="54" rx="4" fill="#fdecea" stroke="#e74c3c" stroke-width="1.5"/>
  <text x="245" y="323" class="sm" fill="#1a1a2e" text-anchor="middle">品牌资产</text>
  <rect x="320" y="290" width="130" height="54" rx="4" fill="#fdecea" stroke="#e74c3c" stroke-width="1.5"/>
  <text x="385" y="323" class="sm" fill="#1a1a2e" text-anchor="middle">服务体验</text>
  <rect x="590"  y="290" width="130" height="54" rx="4" fill="#eef2f5" stroke="#7f8c8d" stroke-width="1.5"/>
  <text x="655" y="323" class="sm" fill="#1a1a2e" text-anchor="middle">人才梯队</text>
  <rect x="730"  y="290" width="130" height="54" rx="4" fill="#eef2f5" stroke="#7f8c8d" stroke-width="1.5"/>
  <text x="795" y="323" class="sm" fill="#1a1a2e" text-anchor="middle">流程效率</text>
  <rect x="870"  y="290" width="130" height="54" rx="4" fill="#eef2f5" stroke="#7f8c8d" stroke-width="1.5"/>
  <text x="935" y="323" class="sm" fill="#1a1a2e" text-anchor="middle">技术平台</text>
  <line x1="255" y1="392" x2="780" y2="392" stroke="#c0392b" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#a4)"/>
  <text x="510" y="422" class="sm" fill="#7f8c8d" text-anchor="middle">闭环：客户反馈 → 能力迭代 → 新客户价值</text>
</svg>

<!--
Speaker notes:
- 关系树 = 讲"价值从哪来"，菱形向上收敛，天然回答"所以呢"。
- 层级只做 3 层，再深听众就断了。叶子用边框色区分归属，父节点用深色。
- 底部虚线把树变成闭环，是这类图最容易被忽略但最值钱的一笔。
-->

---

## 四种图的选用场景

| 图形 | 回答的问题 | 典型场景 |
|---|---|---|
| 阶梯图 | 我们现在在哪、下一步去哪 | 成熟度、路线图、演进路径 |
| 箭头串 | 先做什么后做什么 | 交付路径、转型路线、流程 |
| 矩阵图 | 资源该给谁、不给谁 | 业务组合、优先级、投入产出 |
| 关系图 | 这件事为什么重要 | 价值树、问题归因、指标分解 |

<!--
Speaker notes:
- 选图口诀：讲方向用阶梯，讲顺序用箭头，讲取舍用矩阵，讲因果用关系图。
- 四种图都只用一个颜色族 + 一个强调色，超过三个颜色就散了。
-->

---

## 做法要点

<!-- _class: diagram -->

<svg viewBox="0 0 1020 250" width="100%">
  <rect x="15"  y="30" width="310" height="180" rx="8" fill="#ffffff" stroke="#e2e6ea" stroke-width="1.5"/>
  <rect x="355" y="30" width="310" height="180" rx="8" fill="#ffffff" stroke="#e2e6ea" stroke-width="1.5"/>
  <rect x="695" y="30" width="310" height="180" rx="8" fill="#ffffff" stroke="#e2e6ea" stroke-width="1.5"/>
  <text x="170" y="72" class="tb" fill="#c0392b" text-anchor="middle">内联 SVG</text>
  <text x="170" y="106" class="sm" fill="#555" text-anchor="middle">写进 .md，随文件走</text>
  <text x="170" y="132" class="sm" fill="#555" text-anchor="middle">渲染需加 --html 开关</text>
  <text x="170" y="158" class="sm" fill="#555" text-anchor="middle">viewBox 自适应缩放</text>
  <text x="170" y="184" class="sm" fill="#95a5a6" text-anchor="middle">矢量，PDF 不糊</text>
  <text x="510" y="72" class="tb" fill="#c0392b" text-anchor="middle">CSS 复用类</text>
  <text x="510" y="106" class="sm" fill="#555" text-anchor="middle">.t / .tb / .sm 定字号</text>
  <text x="510" y="132" class="sm" fill="#555" text-anchor="middle">换主题只改 style 块</text>
  <text x="510" y="158" class="sm" fill="#555" text-anchor="middle">全篇视觉统一</text>
  <text x="510" y="184" class="sm" fill="#95a5a6" text-anchor="middle">改一处，四图同步</text>
  <text x="850" y="72" class="tb" fill="#c0392b" text-anchor="middle">软规则</text>
  <text x="850" y="106" class="sm" fill="#555" text-anchor="middle">SVG 内不空行</text>
  <text x="850" y="132" class="sm" fill="#555" text-anchor="middle">id 唯一，箭头不串</text>
  <text x="850" y="158" class="sm" fill="#555" text-anchor="middle">文字 ≥ 14px</text>
  <text x="850" y="184" class="sm" fill="#95a5a6" text-anchor="middle">讲解细节写进注释</text>
</svg>

> 🎯 图形是给观众的，推导过程是给讲者的 —— 推导写 `<!-- 注释 -->`，不占版面

<!--
Speaker notes:
- 这一页是给复用的：三张卡 = 三条可复制的做法。
- **必须记的坑：渲染要加 --html。** 少了这个开关，SVG 会被 Marp 转义成一整页纯文本代码。
  命令：marp examples/smart-drawing-deck.marp.md --html --pdf --allow-local-files
- 第二个坑：SVG 里打一个空行，markdown 会把 HTML 块切断，图形直接消失。
- 第三个坑：多张图用同一个 marker id，导出合并 HTML 时箭头会串。
-->
