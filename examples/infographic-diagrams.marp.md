---
marp: true
theme: default
paginate: true
style: |-
  section { font-family:'PingFang SC','Microsoft YaHei','Noto Sans CJK SC',sans-serif; font-size:22px; background:#FAFAFA; color:#1a1a2e; }
  h1 { color:#c0392b; font-size:1.9em; border-bottom:3px solid #c0392b; }
  h2 { color:#2c3e50; font-size:1.3em; margin-bottom:4px; }
  h3 { color:#c0392b; font-size:1.05em; margin:0 0 6px; }
  svg { display:block; margin:0 auto; max-width:100%; height:auto; }
  svg text { font-family:'PingFang SC','Microsoft YaHei','Noto Sans CJK SC',sans-serif; }
  svg .t   { font-size:26px; font-weight:700; }
  svg .tb  { font-size:19px; font-weight:700; }
  svg .qt  { font-size:20px; font-weight:700; }
  svg .sm  { font-size:15px; }
  svg .lbl { font-size:15px; fill:#7f8c8d; }
  .cols { display:grid; align-items:start; }
  .cols-2 { grid-template-columns:1fr 1fr; gap:24px; }
  .stylewrap { background:#FAFAFA; border-radius:6px; padding:4px; }
  section.cover footer, section.divider footer, section.diagram footer { display:none; }
  section.cover { background:linear-gradient(135deg,#1a1a2e 0%,#c0392b 100%); color:white; display:flex; flex-direction:column; justify-content:center; align-items:flex-start; }
  section.cover h1 { color:white; border-bottom:3px solid rgba(255,255,255,0.4); }
  section.cover h2 { color:rgba(255,255,255,0.85); }
  section.divider { background:#2c3e50; color:white; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; }
  section.divider h1 { color:#e74c3c; border-bottom:3px solid #e74c3c; font-size:2.4em; }
  footer { position:absolute; left:900px; bottom:25px; }
footer: UPerform AI & Agile Consulting
_paginate: skip
---

<!--
  渲染命令（含内联 SVG，必须带 --html）：
  marp examples/infographic-diagrams.marp.md --html --pdf --allow-local-files

  注释必须写在 frontmatter 的 --- 之外。放进 frontmatter 会破坏 YAML 解析，
  导致整个 style 块被静默丢弃。

  本文件由 node scripts/build-diagram-deck.mjs 从 references/infographics-svg/ 生成。
  改完模板重跑一次即可，不要手改。

  svg-lint-ignore: viewbox-width
  ③ 风格预览用 480 宽的紧凑 viewBox（两栏并排需要），正文模板统一 1020。
-->

---
<!-- _class: cover -->

# 图形与风格总览

## 13 骨架 · 6 隐喻 · 7 风格

> 同一副骨架换外壳换配色
---

---
<!-- _class: divider -->

# ① 骨架

## 关系类型决定图形

每个模板的坐标公式在 references/infographics-svg/skeletons/ 下。
---

---
<!-- _class: diagram -->

## 变体：图尔敏论证 Toulmin

<svg viewBox="0 0 1020 520" width="100%">
<defs>
<marker id="a1_d0" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8 z" fill="#1a1a2e"/></marker>
<marker id="a2_d0" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8 z" fill="#e74c3c"/></marker>
<marker id="a3_d0" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8 z" fill="#7f8c8d"/></marker>
</defs>
<rect x="400" y="40"  width="220" height="64" rx="6" fill="#c0392b"/>
<text x="510" y="80"  class="t"  fill="#ffffff" text-anchor="middle">应当全面推行</text>
<rect x="60"  y="108" width="220" height="64" rx="6" fill="#fdecea" stroke="#e74c3c" stroke-width="1.5" stroke-dasharray="5 4"/>
<text x="170" y="148" class="sm" fill="#1a1a2e" text-anchor="middle">反例：小团队不适用</text>
<text x="960" y="120" class="sm" fill="#7f8c8d" text-anchor="end">限定：大部分场景</text>
<path d="M280,140 H360 V100 H400" fill="none" stroke="#e74c3c" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#a2_d0)"/>
<path d="M510,400 V316" fill="none" stroke="#1a1a2e" stroke-width="2.5" marker-end="url(#a1_d0)"/>
<text x="528" y="360" class="sm" fill="#7f8c8d">所以</text>
<path d="M510,104 V184" fill="none" stroke="#1a1a2e" stroke-width="2.5" marker-end="url(#a1_d0)"/>
<text x="528" y="150" class="sm" fill="#7f8c8d">因为</text>
<path d="M510,188 L660,250 L510,312 L360,250 Z" fill="#2c3e50"/>
<text x="510" y="257" class="sm" fill="#ffffff" text-anchor="middle">试点数据充分</text>
<path d="M740,336 H706 Q666,336 666,300 Q666,268 666,252" fill="none" stroke="#7f8c8d" stroke-width="2" marker-end="url(#a3_d0)"/>
<text x="690" y="286" class="sm" fill="#7f8c8d">依据</text>
<rect x="740" y="300" width="220" height="72" rx="6" fill="#eef1f4"/>
<text x="850" y="332" class="sm" fill="#1a1a2e" text-anchor="middle">第三方评估报告</text>
<text x="850" y="358" class="lbl" text-anchor="middle">（2025 抽样 2.4 万）</text>
<rect x="380" y="400" width="260" height="72" rx="6" fill="#2c3e50"/>
<text x="510" y="432" class="sm" fill="#ffffff" text-anchor="middle">6 个部门试点 9 个月</text>
<text x="510" y="456" class="lbl" fill="#cccccc" text-anchor="middle">效率 +32%，投入 -18%</text>
</svg>

<!-- 箭头一律向上/向内；Warrant 用菱形（推理≠事实） -->

---
<!-- _class: diagram -->

## 变体 A：环形循环 Circular Flow

<svg viewBox="0 0 1020 460" width="100%">
<defs>
<marker id="a1_d1" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8 z" fill="#c0392b"/></marker>
</defs>
<circle cx="510" cy="230" r="150" fill="none" stroke="#dcdcdc" stroke-width="1.5" stroke-dasharray="4 6"/>
<circle cx="510" cy="80"  r="46" fill="#2c3e50"/>
<text x="510" y="88" class="tb" fill="#ffffff" text-anchor="middle">计划</text>
<circle cx="640" cy="230" r="46" fill="#34495e"/>
<text x="640" y="238" class="tb" fill="#ffffff" text-anchor="middle">执行</text>
<circle cx="510" cy="380" r="46" fill="#7f8c8d"/>
<text x="510" y="388" class="tb" fill="#ffffff" text-anchor="middle">检查</text>
<circle cx="380" cy="230" r="46" fill="#95a5a6"/>
<text x="380" y="238" class="tb" fill="#ffffff" text-anchor="middle">改进</text>
<path d="M556,124 A150,150 0 0 1 604,184" fill="none" stroke="#c0392b" stroke-width="2.5" marker-end="url(#a1_d1)"/>
<path d="M604,276 A150,150 0 0 1 556,336" fill="none" stroke="#c0392b" stroke-width="2.5" marker-end="url(#a1_d1)"/>
<path d="M464,336 A150,150 0 0 1 416,276" fill="none" stroke="#c0392b" stroke-width="2.5" marker-end="url(#a1_d1)"/>
<path d="M416,184 A150,150 0 0 1 464,124" fill="none" stroke="#c0392b" stroke-width="2.5" marker-end="url(#a1_d1)"/>
<text x="510" y="238" class="sm" fill="#7f8c8d" text-anchor="middle">持续改进</text>
</svg>

<!-- 环形弧段切于节点圆；漏斗四条斜边共线（母线 s=1.118） -->

---
<!-- _class: diagram -->

## 变体 B：漏斗 Funnel

<svg viewBox="0 0 1020 460" width="100%">
<path d="M120,50 L900,50 L820,122 L200,122 Z" fill="#2c3e50"/>
<text x="510" y="94" class="tb" fill="#ffffff" text-anchor="middle">线索 10,000</text>
<path d="M207,128 L813,128 L732,200 L288,200 Z" fill="#34495e"/>
<text x="510" y="172" class="tb" fill="#ffffff" text-anchor="middle">商机 1,200</text>
<path d="M294,206 L726,206 L645,278 L375,278 Z" fill="#7f8c8d"/>
<text x="510" y="250" class="tb" fill="#ffffff" text-anchor="middle">提案 380</text>
<path d="M382,284 L638,284 L558,356 L462,356 Z" fill="#c0392b"/>
<text x="510" y="328" class="tb" fill="#ffffff" text-anchor="middle">96</text>
<text x="510" y="392" class="lbl" text-anchor="middle">成交 96 · 整体转化率 0.96%</text>
<text x="510" y="420" class="lbl" text-anchor="middle">层宽为示意形状，量级以数字为准</text>
</svg>

<!-- 环形弧段切于节点圆；漏斗四条斜边共线（母线 s=1.118） -->

---
<!-- _class: diagram -->

## 变体 A：关系树 Value Tree

<svg viewBox="0 0 1020 460" width="100%">
<defs>
<marker id="a4_d3" markerWidth="9" markerHeight="8" refX="8" refY="4" orient="auto"><path d="M0,0 L9,4 L0,8 z" fill="#c0392b"/></marker>
</defs>
<rect x="425" y="12" width="200" height="62" rx="6" fill="#1a1a2e"/>
<text x="525" y="52" class="t" fill="#ffffff" text-anchor="middle">企业价值</text>
<rect x="175" y="150" width="160" height="56" rx="6" fill="#2c3e50"/>
<text x="255" y="186" class="tb" fill="#ffffff" text-anchor="middle">客户价值</text>
<path d="M525,74 V108 H255 V146" fill="none" stroke="#b9c3cc" stroke-width="2"/>
<path d="M525,74 V108 H795 V146" fill="none" stroke="#b9c3cc" stroke-width="2"/>
<rect x="40"  y="290" width="130" height="54" rx="4" fill="#fdecea" stroke="#e74c3c" stroke-width="1.5"/>
<text x="105" y="323" class="sm" fill="#1a1a2e" text-anchor="middle">客户洞察</text>
<rect x="180" y="290" width="130" height="54" rx="4" fill="#fdecea" stroke="#e74c3c" stroke-width="1.5"/>
<text x="245" y="323" class="sm" fill="#1a1a2e" text-anchor="middle">品牌资产</text>
<path d="M255,206 V238 H105 V284" fill="none" stroke="#b9c3cc" stroke-width="2"/>
<path d="M255,206 V238 H245 V284" fill="none" stroke="#b9c3cc" stroke-width="2"/>
<line x1="255" y1="392" x2="780" y2="392" stroke="#c0392b" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#a4_d3)"/>
<text x="510" y="422" class="lbl" text-anchor="middle">闭环：客户反馈 → 能力迭代</text>
</svg>

<!-- 直角连接器 M 父cx,父底 V 中继y H 子cx V 子顶；层级连线不带箭头 -->

---
<!-- _class: diagram -->

## 变体 B：分层框架 Layered Framework

<svg viewBox="0 0 1020 420" width="100%">
<text x="60" y="36" class="sm" fill="#7f8c8d">自下而上：每一层支撑上一层</text>
<rect x="60" y="60"  width="900" height="64" rx="4" fill="#dcdcdc"/>
<text x="510" y="100" class="tb" fill="#1a1a2e" text-anchor="middle">L1 基础设施</text>
<rect x="60" y="142" width="900" height="64" rx="4" fill="#95a5a6"/>
<text x="510" y="182" class="tb" fill="#ffffff" text-anchor="middle">L2 平台能力</text>
<rect x="60" y="224" width="900" height="64" rx="4" fill="#2c3e50"/>
<text x="510" y="264" class="tb" fill="#ffffff" text-anchor="middle">L3 业务应用</text>
<rect x="60" y="306" width="900" height="64" rx="4" fill="#c0392b"/>
<text x="510" y="346" class="tb" fill="#ffffff" text-anchor="middle">L4 用户价值</text>
</svg>

<!-- 直角连接器 M 父cx,父底 V 中继y H 子cx V 子顶；层级连线不带箭头 -->

---
<!-- _class: diagram -->

## 变体：并行泳道 Swimlanes

<svg viewBox="0 0 1020 300" width="100%">
<defs>
<marker id="a1_d5" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8 z" fill="#c0392b"/></marker>
</defs>
<text x="290" y="36" class="sm" fill="#7f8c8d" text-anchor="middle">Q1</text>
<text x="565" y="36" class="sm" fill="#7f8c8d" text-anchor="middle">Q2</text>
<text x="840" y="36" class="sm" fill="#7f8c8d" text-anchor="middle">Q3</text>
<line x1="150" y1="50" x2="980" y2="50" stroke="#c0392b" stroke-width="2" marker-end="url(#a1_d5)"/>
<line x1="428" y1="50" x2="428" y2="256" stroke="#dcdcdc" stroke-width="1" stroke-dasharray="3 4"/>
<line x1="703" y1="50" x2="703" y2="256" stroke="#dcdcdc" stroke-width="1" stroke-dasharray="3 4"/>
<rect x="150" y="66"  width="830" height="86" fill="#f7f8f9"/>
<rect x="150" y="166" width="830" height="86" fill="#f7f8f9"/>
<text x="130" y="118" class="tb" fill="#1a1a2e" text-anchor="end">基础设施</text>
<text x="130" y="218" class="tb" fill="#1a1a2e" text-anchor="end">业务应用</text>
<line x1="290" y1="106" x2="565" y2="106" stroke="#c9ced4" stroke-width="2"/>
<circle cx="290" cy="106" r="18" fill="#2c3e50"/>
<text x="290" y="113" class="sm" fill="#ffffff" text-anchor="middle">P1</text>
<text x="290" y="140" class="lbl" text-anchor="middle">试点</text>
<circle cx="565" cy="106" r="18" fill="#2c3e50"/>
<text x="565" y="113" class="sm" fill="#ffffff" text-anchor="middle">P2</text>
<text x="565" y="140" class="lbl" text-anchor="middle">扩面</text>
<circle cx="840" cy="206" r="18" fill="#c0392b"/>
<text x="840" y="213" class="sm" fill="#ffffff" text-anchor="middle">P3</text>
<text x="840" y="240" class="lbl" text-anchor="middle">收敛</text>
</svg>

<!-- 阶段竖线必须与事件列对齐；同泳道事件加水平连线，先画线再画圆 -->

---
<!-- _class: diagram -->

## 变体 A：箭头串 Arrow Chain

<svg viewBox="0 0 1020 300" width="100%">
<defs>
<marker id="a2_d6" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8 z" fill="#c0392b"/></marker>
</defs>
<path d="M10,88  L160,88  L194,145  L160,202  L10,202 Z" fill="#95a5a6"/>
<path d="M202,88 L352,88 L386,145 L352,202 L202,202 Z" fill="#7f8c8d"/>
<path d="M394,88 L544,88 L578,145 L544,202 L394,202 Z" fill="#2c3e50"/>
<path d="M586,88 L736,88 L770,145 L736,202 L586,202 Z" fill="#a93226"/>
<path d="M778,88 L928,88 L962,145 L928,202 L778,202 Z" fill="#c0392b"/>
<circle cx="85"  cy="46" r="23" fill="#ffffff" stroke="#95a5a6" stroke-width="2.5"/>
<text x="85"  y="54" class="tb" fill="#95a5a6" text-anchor="middle">1</text>
<text x="85"  y="140" class="t"  fill="#ffffff" text-anchor="middle">愿景</text>
<text x="85"  y="168" class="sm" fill="#ffffff" text-anchor="middle" opacity=".85">统一共识</text>
<circle cx="277" cy="46" r="23" fill="#ffffff" stroke="#7f8c8d" stroke-width="2.5"/>
<text x="277" y="54" class="tb" fill="#7f8c8d" text-anchor="middle">2</text>
<text x="277" y="140" class="t"  fill="#ffffff" text-anchor="middle">共识</text>
<text x="277" y="168" class="sm" fill="#ffffff" text-anchor="middle" opacity=".85">对齐目标</text>
<circle cx="469" cy="46" r="23" fill="#ffffff" stroke="#2c3e50" stroke-width="2.5"/>
<text x="469" y="54" class="tb" fill="#2c3e50" text-anchor="middle">3</text>
<text x="469" y="140" class="t"  fill="#ffffff" text-anchor="middle">路径</text>
<text x="469" y="168" class="sm" fill="#ffffff" text-anchor="middle" opacity=".85">分期落地</text>
<circle cx="661" cy="46" r="23" fill="#ffffff" stroke="#a93226" stroke-width="2.5"/>
<text x="661" y="54" class="tb" fill="#a93226" text-anchor="middle">4</text>
<text x="661" y="140" class="t"  fill="#ffffff" text-anchor="middle">里程碑</text>
<text x="661" y="168" class="sm" fill="#ffffff" text-anchor="middle" opacity=".85">验收标准</text>
<circle cx="853" cy="46" r="23" fill="#ffffff" stroke="#c0392b" stroke-width="2.5"/>
<text x="853" y="54" class="tb" fill="#c0392b" text-anchor="middle">5</text>
<text x="853" y="140" class="t"  fill="#ffffff" text-anchor="middle">闭环</text>
<text x="853" y="168" class="sm" fill="#ffffff" text-anchor="middle" opacity=".85">持续演进</text>
<line x1="85" y1="252" x2="853" y2="252" stroke="#c0392b" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#a2_d6)"/>
<text x="469" y="282" class="sm" fill="#7f8c8d" text-anchor="middle">每一步都有可交付物</text>
</svg>

<!-- 步距 192、箭头宽 184、尖长 34；文字居中于矩形部分 x_i+75，不是整个外框 -->

---
<!-- _class: diagram -->

## 变体 B：阶梯 Staircase

<svg viewBox="0 0 1020 470" width="100%">
<defs>
<marker id="a1_d7" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8 z" fill="#c0392b"/></marker>
</defs>
<text x="20" y="30" class="sm" fill="#c0392b" font-weight="700">能力成熟度递进 →</text>
<line x1="20" y1="48" x2="990" y2="48" stroke="#c0392b" stroke-width="2" marker-end="url(#a1_d7)"/>
<line x1="10" y1="420" x2="1010" y2="420" stroke="#dcdcdc" stroke-width="1.5"/>
<rect x="20"  y="330" width="176" height="90"  fill="#95a5a6"/>
<rect x="216" y="270" width="176" height="150" fill="#7f8c8d"/>
<rect x="412" y="210" width="176" height="210" fill="#2c3e50"/>
<rect x="608" y="150" width="176" height="270" fill="#a93226"/>
<rect x="804" y="90"  width="176" height="330" fill="#c0392b"/>
<text x="108" y="382" class="tb" fill="#ffffff" text-anchor="middle">L1</text>
<text x="108" y="404" class="sm" fill="#ffffff" text-anchor="middle" opacity=".85">个人英雄</text>
<text x="304" y="382" class="tb" fill="#ffffff" text-anchor="middle">L2</text>
<text x="304" y="404" class="sm" fill="#ffffff" text-anchor="middle" opacity=".85">团队协作</text>
<text x="500" y="382" class="tb" fill="#ffffff" text-anchor="middle">L3</text>
<text x="500" y="404" class="sm" fill="#ffffff" text-anchor="middle" opacity=".85">流程固化</text>
<text x="696" y="382" class="tb" fill="#ffffff" text-anchor="middle">L4</text>
<text x="696" y="404" class="sm" fill="#ffffff" text-anchor="middle" opacity=".85">平台化</text>
<text x="892" y="382" class="tb" fill="#ffffff" text-anchor="middle">L5</text>
<text x="892" y="404" class="sm" fill="#ffffff" text-anchor="middle" opacity=".85">自愈</text>
<text x="108" y="446" class="lbl" text-anchor="middle">靠个人</text>
<text x="892" y="446" class="lbl" text-anchor="middle">可自愈</text>
</svg>

<!-- 步距 192、箭头宽 184、尖长 34；文字居中于矩形部分 x_i+75，不是整个外框 -->

---
<!-- _class: diagram -->

## 变体：双维矩阵 2×2

<svg viewBox="0 0 1020 530" width="100%">
<defs>
<marker id="a3x_d8" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8 z" fill="#1a1a2e"/></marker>
<marker id="a3y_d8" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8 z" fill="#1a1a2e"/></marker>
</defs>
<rect x="120" y="70"  width="375" height="200" fill="#f2f7fa"/>
<rect x="495" y="70"  width="375" height="200" fill="#fdecea"/>
<rect x="120" y="270" width="375" height="200" fill="#f7f7f7"/>
<rect x="495" y="270" width="375" height="200" fill="#fdf6e8"/>
<line x1="120" y1="470" x2="895" y2="470" stroke="#1a1a2e" stroke-width="2" marker-end="url(#a3x_d8)"/>
<line x1="120" y1="470" x2="120" y2="55"  stroke="#1a1a2e" stroke-width="2" marker-end="url(#a3y_d8)"/>
<line x1="495" y1="70" x2="495" y2="470" stroke="#ffffff" stroke-width="3"/>
<line x1="120" y1="270" x2="870" y2="270" stroke="#ffffff" stroke-width="3"/>
<text x="500" y="505" class="sm" fill="#1a1a2e" text-anchor="middle" font-weight="700">相对市场份额 →</text>
<text x="60" y="270" class="sm" fill="#1a1a2e" text-anchor="middle" font-weight="700" transform="rotate(-90,60,270)">相对增长率 →</text>
<text x="140" y="98"  class="qt" fill="#7f8c8d">问题儿童</text>
<text x="140" y="120" class="sm" fill="#95a5a6">高增长 · 低份额</text>
<text x="515" y="98"  class="qt" fill="#c0392b">明星业务</text>
<text x="515" y="120" class="sm" fill="#e74c3c">高增长 · 高份额</text>
<text x="140" y="298"  class="qt" fill="#95a5a6">瘦狗业务</text>
<text x="140" y="320" class="sm" fill="#b2bec3">低增长 · 低份额</text>
<text x="515" y="298"  class="qt" fill="#2c3e50">现金牛</text>
<text x="515" y="320" class="sm" fill="#5d7d95">低增长 · 高份额</text>
<circle cx="700" cy="200" r="26" fill="#c0392b" opacity=".85"/>
<text x="735" y="206" class="sm" fill="#1a1a2e" font-weight="700">AI 助手</text>
<text x="880" y="30" class="lbl" text-anchor="end">气泡大小 = 收入贡献</text>
</svg>

<!-- 两个轴必须独立；四条象限都必须有名字，位置要反映真实数值 -->

---
<!-- _class: diagram -->

## 变体 A：中心辐射 Hub & Spoke

<svg viewBox="0 0 1020 460" width="100%">
<line x1="510" y1="102" x2="510" y2="164" stroke="#b9c3cc" stroke-width="2"/>
<line x1="621" y1="166" x2="567" y2="197" stroke="#b9c3cc" stroke-width="2"/>
<line x1="621" y1="294" x2="567" y2="263" stroke="#b9c3cc" stroke-width="2"/>
<line x1="510" y1="358" x2="510" y2="296" stroke="#b9c3cc" stroke-width="2"/>
<line x1="399" y1="294" x2="453" y2="263" stroke="#b9c3cc" stroke-width="2"/>
<line x1="399" y1="166" x2="453" y2="197" stroke="#b9c3cc" stroke-width="2"/>
<circle cx="510" cy="230" r="66" fill="#1a1a2e"/>
<text x="510" y="238" class="t" fill="#ffffff" text-anchor="middle">数据中台</text>
<circle cx="510" cy="62"  r="40" fill="#c0392b"/>
<text x="510" y="69" class="sm" fill="#ffffff" text-anchor="middle">采集</text>
<circle cx="656" cy="146" r="40" fill="#2c3e50"/>
<text x="656" y="153" class="sm" fill="#ffffff" text-anchor="middle">治理</text>
<circle cx="656" cy="314" r="40" fill="#2c3e50"/>
<text x="656" y="321" class="sm" fill="#ffffff" text-anchor="middle">服务</text>
<circle cx="510" cy="398" r="40" fill="#7f8c8d"/>
<text x="510" y="405" class="sm" fill="#ffffff" text-anchor="middle">资产</text>
<circle cx="364" cy="314" r="40" fill="#2c3e50"/>
<text x="364" y="321" class="sm" fill="#ffffff" text-anchor="middle">分析</text>
<circle cx="364" cy="146" r="40" fill="#7f8c8d"/>
<text x="364" y="153" class="sm" fill="#ffffff" text-anchor="middle">安全</text>
</svg>

<!-- 连线落在径向上：起点 R-r_n，终点 r_c。手估端点会留缝 -->

---
<!-- _class: diagram -->

## 变体 B：关系网 Network Graph

<svg viewBox="0 0 1020 460" width="100%">
<line x1="300" y1="170" x2="700" y2="170" stroke="#c0392b" stroke-width="2.5"/>
<line x1="300" y1="200" x2="480" y2="330" stroke="#7f8c8d" stroke-width="1.5"/>
<line x1="700" y1="200" x2="540" y2="330" stroke="#7f8c8d" stroke-width="1.5"/>
<circle cx="230" cy="120" r="34" fill="#2c3e50"/><text x="230" y="127" class="sm" fill="#ffffff" text-anchor="middle">A1</text>
<circle cx="320" cy="120" r="34" fill="#2c3e50"/><text x="320" y="127" class="sm" fill="#ffffff" text-anchor="middle">A2</text>
<circle cx="700" cy="120" r="34" fill="#c0392b"/><text x="700" y="127" class="sm" fill="#ffffff" text-anchor="middle">B1</text>
<circle cx="790" cy="120" r="34" fill="#c0392b"/><text x="790" y="127" class="sm" fill="#ffffff" text-anchor="middle">B2</text>
<circle cx="510" cy="370" r="34" fill="#7f8c8d"/><text x="510" y="377" class="sm" fill="#ffffff" text-anchor="middle">C1</text>
</svg>

<!-- 连线落在径向上：起点 R-r_n，终点 r_c。手估端点会留缝 -->

---
<!-- _class: diagram -->

## 变体 A：便当格 Bento Grid

<svg viewBox="0 0 1020 490" width="100%">
<text x="20" y="32" class="t" fill="#1a1a2e">平台能力全景</text>
<rect x="20"  y="60"  width="660" height="280" rx="6" fill="#1a1a2e"/>
<text x="48"  y="112" class="t"   fill="#ffffff">统一数据底座</text>
<text x="48"  y="146" class="sm"  fill="#cccccc">打通采集、治理、服务全链路</text>
<text x="48"  y="196" class="sm"  fill="#cccccc">· 12 个业务域接入</text>
<text x="48"  y="226" class="sm"  fill="#cccccc">· 日均 3 亿次调用</text>
<text x="48"  y="256" class="sm"  fill="#cccccc">· 复用率 78%</text>
<rect x="700" y="60"  width="300" height="130" rx="6" fill="#c0392b"/>
<text x="724" y="112" class="tb" fill="#ffffff">自助分析</text>
<text x="724" y="146" class="sm" fill="#ffd9d4">取数从 3 天到 5 分钟</text>
<rect x="700" y="210" width="300" height="130" rx="6" fill="#eef1f4"/>
<text x="724" y="262" class="tb" fill="#1a1a2e">指标平台</text>
<text x="724" y="296" class="sm" fill="#7f8c8d">统一口径，减少争议</text>
<rect x="20"  y="360" width="320" height="110" rx="6" fill="#eef1f4"/>
<text x="44"  y="404" class="tb" fill="#1a1a2e">数据治理</text>
<text x="44"  y="436" class="sm" fill="#7f8c8d">标准先行，质量可控</text>
<rect x="360" y="360" width="320" height="110" rx="6" fill="#eef1f4"/>
<text x="384" y="404" class="tb" fill="#1a1a2e">资产目录</text>
<text x="384" y="436" class="sm" fill="#7f8c8d">找得到，才用得上</text>
<rect x="700" y="360" width="300" height="110" rx="6" fill="#eef1f4"/>
<text x="724" y="404" class="tb" fill="#1a1a2e">成本治理</text>
<text x="724" y="436" class="sm" fill="#7f8c8d">按量计费，省下 30%</text>
</svg>

<!-- 没有连线；便当格必须有一个 hero 格，对比矩阵高亮须等于一整列 -->

---
<!-- _class: diagram -->

## 变体 C：对比矩阵 Comparison Matrix

<svg viewBox="0 0 1020 370" width="100%">
<text x="20" y="32" class="t" fill="#1a1a2e">三方案横向对比</text>
<rect x="750" y="92" width="250" height="224" fill="#fdecea"/>
<line x1="20" y1="90" x2="1000" y2="90" stroke="#1a1a2e" stroke-width="2"/>
<text x="375" y="78" class="tb" fill="#1a1a2e" text-anchor="middle">自建</text>
<text x="625" y="78" class="tb" fill="#1a1a2e" text-anchor="middle">采购</text>
<text x="875" y="78" class="tb" fill="#c0392b" text-anchor="middle">混合</text>
<text x="20"  y="123" class="sm" fill="#7f8c8d">上线周期</text>
<text x="20"  y="179" class="sm" fill="#7f8c8d">长期成本</text>
<text x="20"  y="235" class="sm" fill="#7f8c8d">可控性</text>
<text x="20"  y="291" class="sm" fill="#7f8c8d">团队要求</text>
<text x="375" y="123" class="sm" fill="#1a1a2e" text-anchor="middle">9 个月</text>
<text x="625" y="123" class="sm" fill="#1a1a2e" text-anchor="middle">2 个月</text>
<text x="875" y="123" class="tb" fill="#c0392b" text-anchor="middle">4 个月</text>
<text x="375" y="179" class="sm" fill="#1a1a2e" text-anchor="middle">高</text>
<text x="625" y="179" class="sm" fill="#1a1a2e" text-anchor="middle">中</text>
<text x="875" y="179" class="tb" fill="#c0392b" text-anchor="middle">低</text>
<text x="375" y="235" class="sm" fill="#1a1a2e" text-anchor="middle">完全</text>
<text x="625" y="235" class="sm" fill="#1a1a2e" text-anchor="middle">受限</text>
<text x="875" y="235" class="tb" fill="#c0392b" text-anchor="middle">较强</text>
<text x="375" y="291" class="sm" fill="#1a1a2e" text-anchor="middle">需 8 人</text>
<text x="625" y="291" class="sm" fill="#1a1a2e" text-anchor="middle">需 2 人</text>
<text x="875" y="291" class="tb" fill="#c0392b" text-anchor="middle">需 4 人</text>
<line x1="20" y1="330" x2="1000" y2="330" stroke="#dcdcdc" stroke-width="1"/>
<text x="20" y="352" class="lbl">混合方案在四项中三项最优</text>
</svg>

<!-- 没有连线；便当格必须有一个 hero 格，对比矩阵高亮须等于一整列 -->

---
<!-- _class: divider -->

# ② 隐喻外壳

## 叙事意图决定语气

骨架定了之后换壳。**一页只讲一个隐喻。**
---

---
<!-- _class: diagram -->

## 1. Pyramid 金字塔

<svg viewBox="0 0 1020 400" width="100%">
<rect x="410" y="60"  width="200" height="56" rx="4" fill="#1a1a2e"/>
<text x="510" y="96"  class="tb" fill="#ffffff" text-anchor="middle">愿景</text>
<rect x="370" y="134" width="280" height="56" rx="4" fill="#2c3e50"/>
<text x="510" y="170" class="tb" fill="#ffffff" text-anchor="middle">战略</text>
<rect x="330" y="208" width="360" height="56" rx="4" fill="#5d7d95"/>
<text x="510" y="244" class="tb" fill="#ffffff" text-anchor="middle">举措</text>
<rect x="290" y="282" width="440" height="56" rx="4" fill="#95a5a6"/>
<text x="510" y="318" class="tb" fill="#ffffff" text-anchor="middle">执行动作</text>
<text x="510" y="374" class="lbl" text-anchor="middle">自上而下拆解，越往下越具体</text>
</svg>

<!-- 顶层最窄（收敛到一点）——与基础块方向相反，别搞混 -->

---
<!-- _class: diagram -->

## 2. Flywheel 飞轮

<svg viewBox="0 0 1020 500" width="100%">
<defs>
<marker id="a1_d14" markerUnits="userSpaceOnUse" markerWidth="13" markerHeight="10" refX="12" refY="5" orient="auto"><path d="M0,0 L13,5 L0,10 z" fill="#c0392b"/></marker>
<marker id="a2_d14" markerUnits="userSpaceOnUse" markerWidth="15" markerHeight="11" refX="14" refY="5.5" orient="auto"><path d="M0,0 L15,5.5 L0,11 z" fill="#c0392b"/></marker>
<marker id="a3_d14" markerUnits="userSpaceOnUse" markerWidth="17" markerHeight="12" refX="16" refY="6" orient="auto"><path d="M0,0 L17,6 L0,12 z" fill="#c0392b"/></marker>
<marker id="a4_d14" markerUnits="userSpaceOnUse" markerWidth="19" markerHeight="14" refX="18" refY="7" orient="auto"><path d="M0,0 L19,7 L0,14 z" fill="#c0392b"/></marker>
</defs>
<path d="M598.6,395.1 A170,170 0 0 1 421.2,394.9" fill="none" stroke="#c0392b" stroke-width="2.5" marker-end="url(#a1_d14)"/>
<path d="M365.1,338.8 A170,170 0 0 1 360.6,168.9" fill="none" stroke="#c0392b" stroke-width="4" marker-end="url(#a2_d14)"/>
<path d="M421.4,104.9 A170,170 0 0 1 591.1,100.6" fill="none" stroke="#c0392b" stroke-width="5.5" marker-end="url(#a3_d14)"/>
<path d="M654.9,161.2 A170,170 0 0 1 659.4,331.1" fill="none" stroke="#c0392b" stroke-width="7" marker-end="url(#a4_d14)"/>
<circle cx="630" cy="130" r="40" fill="#2c3e50"/><text x="630" y="137" class="sm" fill="#ffffff" text-anchor="middle">用户</text>
<circle cx="630" cy="370" r="40" fill="#34495e"/><text x="630" y="377" class="sm" fill="#ffffff" text-anchor="middle">价值</text>
<circle cx="390" cy="370" r="40" fill="#5d7d95"/><text x="390" y="377" class="sm" fill="#ffffff" text-anchor="middle">规模</text>
<circle cx="390" cy="130" r="40" fill="#95a5a6"/><text x="390" y="137" class="sm" fill="#ffffff" text-anchor="middle">效率</text>
<text x="510" y="258" class="t" fill="#1a1a2e" text-anchor="middle">飞轮</text>
<text x="510" y="470" class="lbl" text-anchor="middle">线宽与箭头同步递增 = 势能自我积累；弧段切于节点圆</text>
</svg>

<!-- 线宽逐段递增是「势能自我积累」的唯一识别特征；弧段切于节点圆 -->

---
<!-- _class: diagram -->

## 3. Iceberg 冰山

<svg viewBox="0 0 1020 510" width="100%">
<text x="510" y="34" class="sm" fill="#7f8c8d" text-anchor="middle">显性成本只占冰山一角</text>
<path d="M330,180 L510,60 L690,180 Z" fill="#B5DEDE"/>
<text x="510" y="150" class="sm" fill="#1a1a2e" text-anchor="middle">显性：预算 / 人力 / 迁移</text>
<rect x="20" y="179" width="980" height="2" fill="#2563EB"/>
<path d="M330,180 L690,180 L770,290 L620,450 L400,450 L250,290 Z" fill="#1E3A5F"/>
<text x="510" y="235" class="sm" fill="#93C5FD">隐性：组织惯性 / 切换成本 / 学习曲线</text>
<text x="510" y="285" class="sm" fill="#93C5FD">数据一致性风险 / 长期运维债</text>
<text x="510" y="410" class="tb" fill="#FFFFFF" text-anchor="middle">水下体积约为水上的 5 倍</text>
</svg>

<!-- 等腰三角形 + 6 边多边形；水下面积约为水上 5 倍 -->

---
<!-- _class: diagram -->

## 4. Onion 洋葱

<svg viewBox="0 0 1020 460" width="100%">
<ellipse cx="510" cy="230" rx="250" ry="170" fill="#eef1f4" stroke="#9CA3AF" stroke-width="1.5"/>
<ellipse cx="510" cy="230" rx="205" ry="135" fill="#CDDDD8" stroke="#7f8c8d" stroke-width="1.5"/>
<ellipse cx="510" cy="230" rx="152" ry="98" fill="#5d7d95" stroke="#4a6fa5" stroke-width="1.5"/>
<circle cx="510" cy="230" r="64" fill="#c0392b"/>
<text x="510" y="222" class="tb" fill="#ffffff" text-anchor="middle">核心价值</text>
<text x="510" y="252" class="sm" fill="#ffd9d4" text-anchor="middle">动机</text>
<text x="510" y="122" class="sm" fill="#1a1a2e" text-anchor="middle">手段</text>
<text x="510" y="88"  class="sm" fill="#1a1a2e" text-anchor="middle">外层语境</text>
<text x="510" y="436" class="lbl" text-anchor="middle">越往内越核心</text>
</svg>

<!-- 用椭圆不用圆角矩形——圆角矩形会读成套娃盒子 -->

---
<!-- _class: diagram -->

## 5. Focus / Spotlight 聚焦

<svg viewBox="0 0 1020 400" width="100%">
<ellipse cx="330" cy="200" rx="220" ry="120" fill="#c0392b" fill-opacity="0.10" stroke="#c0392b" stroke-width="2"/>
<circle cx="330" cy="200" r="46" fill="#c0392b"/>
<text x="330" y="208" class="t" fill="#ffffff" text-anchor="middle">核心</text>
<line x1="450" y1="180" x2="700" y2="120" stroke="#dcdcdc" stroke-width="1.5"/>
<line x1="450" y1="200" x2="700" y2="200" stroke="#dcdcdc" stroke-width="1.5"/>
<line x1="450" y1="220" x2="700" y2="280" stroke="#dcdcdc" stroke-width="1.5"/>
<circle cx="730" cy="115" r="30" fill="#eef1f4"/><text x="730" y="122" class="sm" fill="#1a1a2e" text-anchor="middle">资源 A</text>
<circle cx="730" cy="200" r="30" fill="#eef1f4"/><text x="730" y="207" class="sm" fill="#1a1a2e" text-anchor="middle">资源 B</text>
<circle cx="730" cy="285" r="30" fill="#eef1f4"/><text x="730" y="292" class="sm" fill="#1a1a2e" text-anchor="middle">资源 C</text>
</svg>

<!-- 高亮用 fill-opacity=0.10，不透明色块会挡住内容 -->

---
<!-- _class: diagram -->

## 6. Convergence / Divergence 汇聚与发散

<svg viewBox="0 0 1020 380" width="100%">
<defs>
<marker id="a1_d18" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8 z" fill="#c0392b"/></marker>
</defs>
<path d="M150,80 Q340,80 500,190" fill="none" stroke="#95a5a6" stroke-width="2.5" marker-end="url(#a1_d18)"/>
<path d="M150,190 Q340,190 500,190" fill="none" stroke="#5d7d95" stroke-width="2.5" marker-end="url(#a1_d18)"/>
<path d="M150,300 Q340,300 500,190" fill="none" stroke="#2c3e50" stroke-width="2.5" marker-end="url(#a1_d18)"/>
<circle cx="500" cy="190" r="44" fill="#c0392b"/>
<text x="500" y="197" class="t" fill="#ffffff" text-anchor="middle">汇聚</text>
<path d="M544,190 Q640,90 850,90" fill="none" stroke="#c0392b" stroke-width="2.5" marker-end="url(#a1_d18)"/>
<path d="M544,190 Q640,190 850,190" fill="none" stroke="#e74c3c" stroke-width="2.5" marker-end="url(#a1_d18)"/>
<path d="M544,190 Q640,290 850,290" fill="none" stroke="#a93226" stroke-width="2.5" marker-end="url(#a1_d18)"/>
<circle cx="880" cy="90"  r="28" fill="#eef1f4"/><text x="880" y="97" class="sm" fill="#1a1a2e" text-anchor="middle">A</text>
<circle cx="880" cy="190" r="28" fill="#eef1f4"/><text x="880" y="197" class="sm" fill="#1a1a2e" text-anchor="middle">B</text>
<circle cx="880" cy="290" r="28" fill="#eef1f4"/><text x="880" y="297" class="sm" fill="#1a1a2e" text-anchor="middle">C</text>
<circle cx="110" cy="80"  r="26" fill="#eef1f4"/><text x="110" y="87" class="sm" fill="#1a1a2e" text-anchor="middle">x1</text>
<circle cx="110" cy="190" r="26" fill="#eef1f4"/><text x="110" y="197" class="sm" fill="#1a1a2e" text-anchor="middle">x2</text>
<circle cx="110" cy="300" r="26" fill="#eef1f4"/><text x="110" y="307" class="sm" fill="#1a1a2e" text-anchor="middle">x3</text>
</svg>

<!-- 控制点在两端连线的垂直平分线上，曲度才对称 -->

---
<!-- _class: divider -->

# ③ 风格

## 配色与字阶

同一张图横排对比才看得出差别。**默认选第一个（deck 调色板）。**
---

---
<div class="cols cols-2">
<div class="col">

### deck 默认（UPerform）

<div class="stylewrap" style="--s-hero:#1a1a2e;--s-on-hero:#ffffff;--s-accent:#c0392b;--s-on-accent:#ffffff;--s-neutral:#eef1f4;--s-ink:#1a1a2e;--s-rule:#c0392b">
<svg viewBox="0 0 480 300" width="100%">
<rect x="12" y="12" width="250" height="160" rx="6" fill="var(--s-hero)"/>
<text x="32" y="62" class="t" fill="var(--s-on-hero)">核心结论</text>
<text x="32" y="98" class="sm" fill="var(--s-on-hero)" opacity=".85">一句话说清价值</text>
<text x="32" y="130" class="sm" fill="var(--s-on-hero)" opacity=".7">· 要点一</text>
<text x="32" y="156" class="sm" fill="var(--s-on-hero)" opacity=".7">· 要点二</text>
<rect x="272" y="12" width="196" height="76" rx="6" fill="var(--s-accent)"/>
<text x="290" y="58" class="tb" fill="var(--s-on-accent)">强调项</text>
<line x1="272" y1="106" x2="468" y2="106" stroke="var(--s-rule)" stroke-width="2"/>
<rect x="12" y="184" width="146" height="104" rx="6" fill="var(--s-neutral)"/>
<text x="28" y="244" class="sm" fill="var(--s-ink)">支撑 A</text>
<rect x="166" y="184" width="146" height="104" rx="6" fill="var(--s-neutral)"/>
<text x="182" y="244" class="sm" fill="var(--s-ink)">支撑 B</text>
<rect x="320" y="124" width="148" height="164" rx="6" fill="var(--s-neutral)"/>
<text x="336" y="216" class="sm" fill="var(--s-ink)">支撑 C</text>
</svg>
</div>

</div>
<div class="col">

### clean-analytics

<div class="stylewrap" style="--s-hero:#3B9B9B;--s-on-hero:#ffffff;--s-accent:#E87461;--s-on-accent:#ffffff;--s-neutral:#E4F3F3;--s-ink:#1A1A1A;--s-rule:#4EBDBA">
<svg viewBox="0 0 480 300" width="100%">
<rect x="12" y="12" width="250" height="160" rx="6" fill="var(--s-hero)"/>
<text x="32" y="62" class="t" fill="var(--s-on-hero)">核心结论</text>
<text x="32" y="98" class="sm" fill="var(--s-on-hero)" opacity=".85">一句话说清价值</text>
<text x="32" y="130" class="sm" fill="var(--s-on-hero)" opacity=".7">· 要点一</text>
<text x="32" y="156" class="sm" fill="var(--s-on-hero)" opacity=".7">· 要点二</text>
<rect x="272" y="12" width="196" height="76" rx="6" fill="var(--s-accent)"/>
<text x="290" y="58" class="tb" fill="var(--s-on-accent)">强调项</text>
<line x1="272" y1="106" x2="468" y2="106" stroke="var(--s-rule)" stroke-width="2"/>
<rect x="12" y="184" width="146" height="104" rx="6" fill="var(--s-neutral)"/>
<text x="28" y="244" class="sm" fill="var(--s-ink)">支撑 A</text>
<rect x="166" y="184" width="146" height="104" rx="6" fill="var(--s-neutral)"/>
<text x="182" y="244" class="sm" fill="var(--s-ink)">支撑 B</text>
<rect x="320" y="124" width="148" height="164" rx="6" fill="var(--s-neutral)"/>
<text x="336" y="216" class="sm" fill="var(--s-ink)">支撑 C</text>
</svg>
</div>

</div>
</div>

<!-- 跟随 style-bootstrap，图与正文同源。默认选它。 ／ 数据自信、圆形签名、超大数字 -->

---
<div class="cols cols-2">
<div class="col">

### mckinsey-report

<div class="stylewrap" style="--s-hero:#1B2838;--s-on-hero:#ffffff;--s-accent:#2563EB;--s-on-accent:#ffffff;--s-neutral:#F5F5F5;--s-ink:#1A1A1A;--s-rule:#2563EB">
<svg viewBox="0 0 480 300" width="100%">
<rect x="12" y="12" width="250" height="160" rx="6" fill="var(--s-hero)"/>
<text x="32" y="62" class="t" fill="var(--s-on-hero)">核心结论</text>
<text x="32" y="98" class="sm" fill="var(--s-on-hero)" opacity=".85">一句话说清价值</text>
<text x="32" y="130" class="sm" fill="var(--s-on-hero)" opacity=".7">· 要点一</text>
<text x="32" y="156" class="sm" fill="var(--s-on-hero)" opacity=".7">· 要点二</text>
<rect x="272" y="12" width="196" height="76" rx="6" fill="var(--s-accent)"/>
<text x="290" y="58" class="tb" fill="var(--s-on-accent)">强调项</text>
<line x1="272" y1="106" x2="468" y2="106" stroke="var(--s-rule)" stroke-width="2"/>
<rect x="12" y="184" width="146" height="104" rx="6" fill="var(--s-neutral)"/>
<text x="28" y="244" class="sm" fill="var(--s-ink)">支撑 A</text>
<rect x="166" y="184" width="146" height="104" rx="6" fill="var(--s-neutral)"/>
<text x="182" y="244" class="sm" fill="var(--s-ink)">支撑 B</text>
<rect x="320" y="124" width="148" height="164" rx="6" fill="var(--s-neutral)"/>
<text x="336" y="216" class="sm" fill="var(--s-ink)">支撑 C</text>
</svg>
</div>

</div>
<div class="col">

### tricon-infographic

<div class="stylewrap" style="--s-hero:#8B1A2B;--s-on-hero:#ffffff;--s-accent:#C41E3A;--s-on-accent:#ffffff;--s-neutral:#F5F5F5;--s-ink:#1A1A1A;--s-rule:#C41E3A">
<svg viewBox="0 0 480 300" width="100%">
<rect x="12" y="12" width="250" height="160" rx="6" fill="var(--s-hero)"/>
<text x="32" y="62" class="t" fill="var(--s-on-hero)">核心结论</text>
<text x="32" y="98" class="sm" fill="var(--s-on-hero)" opacity=".85">一句话说清价值</text>
<text x="32" y="130" class="sm" fill="var(--s-on-hero)" opacity=".7">· 要点一</text>
<text x="32" y="156" class="sm" fill="var(--s-on-hero)" opacity=".7">· 要点二</text>
<rect x="272" y="12" width="196" height="76" rx="6" fill="var(--s-accent)"/>
<text x="290" y="58" class="tb" fill="var(--s-on-accent)">强调项</text>
<line x1="272" y1="106" x2="468" y2="106" stroke="var(--s-rule)" stroke-width="2"/>
<rect x="12" y="184" width="146" height="104" rx="6" fill="var(--s-neutral)"/>
<text x="28" y="244" class="sm" fill="var(--s-ink)">支撑 A</text>
<rect x="166" y="184" width="146" height="104" rx="6" fill="var(--s-neutral)"/>
<text x="182" y="244" class="sm" fill="var(--s-ink)">支撑 B</text>
<rect x="320" y="124" width="148" height="164" rx="6" fill="var(--s-neutral)"/>
<text x="336" y="216" class="sm" fill="var(--s-ink)">支撑 C</text>
</svg>
</div>

</div>
</div>

<!-- 咨询蓝、衬线标题、行动式标题 ／ 出版物红、锐利、极简 -->

---
<div class="cols cols-2">
<div class="col">

### technical-schematic

<div class="stylewrap" style="--s-hero:#1E3A5F;--s-on-hero:#ffffff;--s-accent:#F59E0B;--s-on-accent:#1a1a2e;--s-neutral:#E2E8F0;--s-ink:#1E3A5F;--s-rule:#2563EB">
<svg viewBox="0 0 480 300" width="100%">
<rect x="12" y="12" width="250" height="160" rx="6" fill="var(--s-hero)"/>
<text x="32" y="62" class="t" fill="var(--s-on-hero)">核心结论</text>
<text x="32" y="98" class="sm" fill="var(--s-on-hero)" opacity=".85">一句话说清价值</text>
<text x="32" y="130" class="sm" fill="var(--s-on-hero)" opacity=".7">· 要点一</text>
<text x="32" y="156" class="sm" fill="var(--s-on-hero)" opacity=".7">· 要点二</text>
<rect x="272" y="12" width="196" height="76" rx="6" fill="var(--s-accent)"/>
<text x="290" y="58" class="tb" fill="var(--s-on-accent)">强调项</text>
<line x1="272" y1="106" x2="468" y2="106" stroke="var(--s-rule)" stroke-width="2"/>
<rect x="12" y="184" width="146" height="104" rx="6" fill="var(--s-neutral)"/>
<text x="28" y="244" class="sm" fill="var(--s-ink)">支撑 A</text>
<rect x="166" y="184" width="146" height="104" rx="6" fill="var(--s-neutral)"/>
<text x="182" y="244" class="sm" fill="var(--s-ink)">支撑 B</text>
<rect x="320" y="124" width="148" height="164" rx="6" fill="var(--s-neutral)"/>
<text x="336" y="216" class="sm" fill="var(--s-ink)">支撑 C</text>
</svg>
</div>

</div>
<div class="col">

### ui-wireframe

<div class="stylewrap" style="--s-hero:#374151;--s-on-hero:#ffffff;--s-accent:#3B82F6;--s-on-accent:#ffffff;--s-neutral:#E5E5E5;--s-ink:#374151;--s-rule:#9CA3AF">
<svg viewBox="0 0 480 300" width="100%">
<rect x="12" y="12" width="250" height="160" rx="6" fill="var(--s-hero)"/>
<text x="32" y="62" class="t" fill="var(--s-on-hero)">核心结论</text>
<text x="32" y="98" class="sm" fill="var(--s-on-hero)" opacity=".85">一句话说清价值</text>
<text x="32" y="130" class="sm" fill="var(--s-on-hero)" opacity=".7">· 要点一</text>
<text x="32" y="156" class="sm" fill="var(--s-on-hero)" opacity=".7">· 要点二</text>
<rect x="272" y="12" width="196" height="76" rx="6" fill="var(--s-accent)"/>
<text x="290" y="58" class="tb" fill="var(--s-on-accent)">强调项</text>
<line x1="272" y1="106" x2="468" y2="106" stroke="var(--s-rule)" stroke-width="2"/>
<rect x="12" y="184" width="146" height="104" rx="6" fill="var(--s-neutral)"/>
<text x="28" y="244" class="sm" fill="var(--s-ink)">支撑 A</text>
<rect x="166" y="184" width="146" height="104" rx="6" fill="var(--s-neutral)"/>
<text x="182" y="244" class="sm" fill="var(--s-ink)">支撑 B</text>
<rect x="320" y="124" width="148" height="164" rx="6" fill="var(--s-neutral)"/>
<text x="336" y="216" class="sm" fill="var(--s-ink)">支撑 C</text>
</svg>
</div>

</div>
</div>

<!-- 工程精度、琥珀高亮、白底图纸 ／ 灰阶线框、中性克制 -->

---
<div class="cols cols-2">
<div class="col">

### subway-map

<div class="stylewrap" style="--s-hero:#E03A3E;--s-on-hero:#ffffff;--s-accent:#2563EB;--s-on-accent:#ffffff;--s-neutral:#E5E7EB;--s-ink:#1A1A1A;--s-rule:#0E9F6E">
<svg viewBox="0 0 480 300" width="100%">
<rect x="12" y="12" width="250" height="160" rx="6" fill="var(--s-hero)"/>
<text x="32" y="62" class="t" fill="var(--s-on-hero)">核心结论</text>
<text x="32" y="98" class="sm" fill="var(--s-on-hero)" opacity=".85">一句话说清价值</text>
<text x="32" y="130" class="sm" fill="var(--s-on-hero)" opacity=".7">· 要点一</text>
<text x="32" y="156" class="sm" fill="var(--s-on-hero)" opacity=".7">· 要点二</text>
<rect x="272" y="12" width="196" height="76" rx="6" fill="var(--s-accent)"/>
<text x="290" y="58" class="tb" fill="var(--s-on-accent)">强调项</text>
<line x1="272" y1="106" x2="468" y2="106" stroke="var(--s-rule)" stroke-width="2"/>
<rect x="12" y="184" width="146" height="104" rx="6" fill="var(--s-neutral)"/>
<text x="28" y="244" class="sm" fill="var(--s-ink)">支撑 A</text>
<rect x="166" y="184" width="146" height="104" rx="6" fill="var(--s-neutral)"/>
<text x="182" y="244" class="sm" fill="var(--s-ink)">支撑 B</text>
<rect x="320" y="124" width="148" height="164" rx="6" fill="var(--s-neutral)"/>
<text x="336" y="216" class="sm" fill="var(--s-ink)">支撑 C</text>
</svg>
</div>

</div>
</div>

<!-- 多线路色、45°/90° 折线 -->

---
<!-- _class: divider -->

# 用法

## 四层依次过

**体裁 → 语气 → 配色 → 笔法**
