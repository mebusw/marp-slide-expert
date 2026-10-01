#!/usr/bin/env node
// build-diagram-deck — 从 references 生成 examples/infographic-diagrams.marp.md
//
// 用法:
//   node scripts/build-diagram-deck.mjs                 # 只生成 .md
//   node scripts/build-diagram-deck.mjs --pdf           # 同时渲染 PDF（需要 marp CLI）
//
// 为什么用生成器而不是手写 deck：这份 deck 是全部模板的回归检查。
// 手写的会和 references 里的模板悄悄漂移；生成的不会——改完模板重跑一次即可。
//
// PDF 用 marp CLI 渲染（内联 SVG 需要 --html）：
//   marp examples/infographic-diagrams.marp.md --html --pdf --allow-local-files

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const mod = join(root, 'references/infographics-svg');
const outDeck = join(root, 'examples/infographic-diagrams.marp.md');

// ---------- 提取 ----------

// 取每个 <svg> 前面最近的 markdown 标题当它的名字
function extract(file) {
  const src = readFileSync(file, 'utf8');
  const out = [];
  const re = /<svg[\s\S]*?<\/svg>/g;
  let m;
  while ((m = re.exec(src))) {
    const before = src.slice(0, m.index);
    const heads = [...before.matchAll(/^##\s+(.+)$/gm)];   // 只认二级标题 = 变体名
    out.push({ name: heads.length ? heads[heads.length - 1][1].trim() : '未命名', svg: m[0] });
  }
  return out;
}

const skeletons = [];
for (const f of readdirSync(join(mod, 'skeletons')).filter((f) => f.endsWith('.md') && f !== 'INDEX.md').sort()) {
  for (const item of extract(join(mod, 'skeletons', f))) skeletons.push({ ...item, group: f.replace('.md', '') });
}
const metaphors = extract(join(mod, 'metaphor.md')).map((m) => ({ ...m, group: 'metaphor' }));

// marker id 全局唯一：按出现顺序重编号（模板里的 a1 只是占位符）
let n = 0;
const uniq = (svg) =>
  svg.replace(/id="(a\d*[a-z]?)"/g, (_, id) => `id="${id}_d${n}"`).replace(/url\(#(a\d*[a-z]?)\)/g, (_, id) => `url(#${id}_d${n})`);
for (const s of [...skeletons, ...metaphors]) { s.svg = uniq(s.svg); n++; }

// ---------- 风格预览 ----------
// 风格要横排对比才看得出差别。两张并排 = 每张只有约 540px 宽，
// 所以预览图用 480 宽的紧凑 viewBox——正文的 1020 宽缩到半栏会看不清字。

const STYLE_SVG = `<svg viewBox="0 0 480 300" width="100%">
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
</svg>`;

const STYLES = [
  { name: 'deck 默认（UPerform）', note: '跟随 style-bootstrap，图与正文同源。默认选它。', v: { '--s-hero': '#1a1a2e', '--s-on-hero': '#ffffff', '--s-accent': '#c0392b', '--s-on-accent': '#ffffff', '--s-neutral': '#eef1f4', '--s-ink': '#1a1a2e', '--s-rule': '#c0392b' } },
  { name: 'clean-analytics', note: '数据自信、圆形签名、超大数字', v: { '--s-hero': '#3B9B9B', '--s-on-hero': '#ffffff', '--s-accent': '#E87461', '--s-on-accent': '#ffffff', '--s-neutral': '#E4F3F3', '--s-ink': '#1A1A1A', '--s-rule': '#4EBDBA' } },
  { name: 'mckinsey-report', note: '咨询蓝、衬线标题、行动式标题', v: { '--s-hero': '#1B2838', '--s-on-hero': '#ffffff', '--s-accent': '#2563EB', '--s-on-accent': '#ffffff', '--s-neutral': '#F5F5F5', '--s-ink': '#1A1A1A', '--s-rule': '#2563EB' } },
  { name: 'tricon-infographic', note: '出版物红、锐利、极简', v: { '--s-hero': '#8B1A2B', '--s-on-hero': '#ffffff', '--s-accent': '#C41E3A', '--s-on-accent': '#ffffff', '--s-neutral': '#F5F5F5', '--s-ink': '#1A1A1A', '--s-rule': '#C41E3A' } },
  { name: 'technical-schematic', note: '工程精度、琥珀高亮、白底图纸', v: { '--s-hero': '#1E3A5F', '--s-on-hero': '#ffffff', '--s-accent': '#F59E0B', '--s-on-accent': '#1a1a2e', '--s-neutral': '#E2E8F0', '--s-ink': '#1E3A5F', '--s-rule': '#2563EB' } },
  { name: 'ui-wireframe', note: '灰阶线框、中性克制', v: { '--s-hero': '#374151', '--s-on-hero': '#ffffff', '--s-accent': '#3B82F6', '--s-on-accent': '#ffffff', '--s-neutral': '#E5E5E5', '--s-ink': '#374151', '--s-rule': '#9CA3AF' } },
  { name: 'subway-map', note: '多线路色、45°/90° 折线', v: { '--s-hero': '#E03A3E', '--s-on-hero': '#ffffff', '--s-accent': '#2563EB', '--s-on-accent': '#ffffff', '--s-neutral': '#E5E7EB', '--s-ink': '#1A1A1A', '--s-rule': '#0E9F6E' } },
];

// ---------- 渲染 ----------

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const diagramSlide = (title, svg, note) => `<!-- _class: diagram -->

## ${title}

${svg}

<!-- ${note} -->
`;

const stylePair = (a, b) => `<div class="cols cols-2">
<div class="col">

### ${esc(a.name)}

<div class="stylewrap" style="${Object.entries(a.v).map(([k, val]) => `${k}:${val}`).join(';')}">
${STYLE_SVG}
</div>

</div>
<div class="col">

### ${esc(b.name)}

<div class="stylewrap" style="${Object.entries(b.v).map(([k, val]) => `${k}:${val}`).join(';')}">
${STYLE_SVG}
</div>

</div>
</div>

<!-- ${esc(a.note)} ／ ${esc(b.note)} -->
`;

const HEAD = `---
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
`;

const parts = [HEAD];

parts.push(`<!-- _class: cover -->

# 图形与风格总览

## ${skeletons.length} 骨架 · ${metaphors.length} 隐喻 · ${STYLES.length} 风格

> 同一副骨架换外壳换配色
---
`);

parts.push(`<!-- _class: divider -->

# ① 骨架

## 关系类型决定图形

每个模板的坐标公式在 references/infographics-svg/skeletons/ 下。
---
`);

const SKEL_NOTE = {
  'linear-sequence': '步距 192、箭头宽 184、尖长 34；文字居中于矩形部分 x_i+75，不是整个外框',
  'hierarchy-tree': '直角连接器 M 父cx,父底 V 中继y H 子cx V 子顶；层级连线不带箭头',
  'matrix-quadrant': '两个轴必须独立；四条象限都必须有名字，位置要反映真实数值',
  'flow-cycle': '环形弧段切于节点圆；漏斗四条斜边共线（母线 s=1.118）',
  'network-hub': '连线落在径向上：起点 R-r_n，终点 r_c。手估端点会留缝',
  lanes: '阶段竖线必须与事件列对齐；同泳道事件加水平连线，先画线再画圆',
  'structure-block': '没有连线；便当格必须有一个 hero 格，对比矩阵高亮须等于一整列',
  evidence: '箭头一律向上/向内；Warrant 用菱形（推理≠事实）',
};
for (const s of skeletons) {
  parts.push(diagramSlide(`${s.name}`, s.svg, SKEL_NOTE[s.group] || '见 skeletons 规格文件'));
}

parts.push(`<!-- _class: divider -->

# ② 隐喻外壳

## 叙事意图决定语气

骨架定了之后换壳。**一页只讲一个隐喻。**
---
`);

const MP_NOTE = {
  Pyramid: '顶层最窄（收敛到一点）——与基础块方向相反，别搞混',
  Flywheel: '线宽逐段递增是「势能自我积累」的唯一识别特征；弧段切于节点圆',
  Iceberg: '等腰三角形 + 6 边多边形；水下面积约为水上 5 倍',
  Onion: '用椭圆不用圆角矩形——圆角矩形会读成套娃盒子',
  'Focus / Spotlight': '高亮用 fill-opacity=0.10，不透明色块会挡住内容',
  'Convergence / Divergence': '控制点在两端连线的垂直平分线上，曲度才对称',
};
for (const m of metaphors) {
  const key = Object.keys(MP_NOTE).find((k) => m.name.includes(k));
  parts.push(diagramSlide(m.name, m.svg, key ? MP_NOTE[key] : '见 metaphor 速查表'));
}

parts.push(`<!-- _class: divider -->

# ③ 风格

## 配色与字阶

同一张图横排对比才看得出差别。**默认选第一个（deck 调色板）。**
---
`);

for (let i = 0; i < STYLES.length; i += 2) {
  const a = STYLES[i], b = STYLES[i + 1];
  parts.push(b ? stylePair(a, b) : `<div class="cols cols-2">
<div class="col">

### ${esc(a.name)}

<div class="stylewrap" style="${Object.entries(a.v).map(([k, val]) => `${k}:${val}`).join(';')}">
${STYLE_SVG}
</div>

</div>
</div>

<!-- ${esc(a.note)} -->
`);
}

parts.push(`<!-- _class: divider -->

# 用法

## 四层依次过

**体裁 → 语气 → 配色 → 笔法**
`);

writeFileSync(outDeck, parts.join('\n---\n'));
console.log(`✓ examples/infographic-diagrams.marp.md — ${skeletons.length} 骨架 + ${metaphors.length} 隐喻 + ${STYLES.length} 风格`);

if (process.argv.includes('--pdf')) {
  execFileSync('marp', [outDeck, '--html', '--pdf', '--allow-local-files'], { stdio: 'inherit' });
  console.log('✓ examples/infographic-diagrams.marp.pdf');
}
