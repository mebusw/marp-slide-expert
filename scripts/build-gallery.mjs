#!/usr/bin/env node
// build-gallery — 从 references 生成 examples/infographics-gallery.html
//
// 用法: node scripts/build-gallery.mjs
//
// 为什么用生成器而不是手写 HTML：图库是回归检查的一部分。
// 手写的图库会和 references 里的模板悄悄漂移；生成的不会——改完模板重跑一次即可。

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const mod = join(root, 'references/infographics-svg');

// ---------- 提取 ----------

// 取每个 <svg> 前面最近的 markdown 标题当它的名字
function extract(file) {
  const src = readFileSync(file, 'utf8');
  const out = [];
  const re = /<svg[\s\S]*?<\/svg>/g;
  let m;
  while ((m = re.exec(src))) {
    const before = src.slice(0, m.index);
    const heads = [...before.matchAll(/^#{1,3}\s+(.+)$/gm)];
    const name = heads.length ? heads[heads.length - 1][1].trim() : '未命名';
    if (/\n[ \t]*\n/.test(m[0])) {
      console.error(`✗ ${file} — 「${name}」的 SVG 块内有空行，会被切断`);
      process.exitCode = 1;
    }
    out.push({ name, svg: m[0] });
  }
  return out;
}

const skeletons = [];
for (const f of readdirSync(join(mod, 'skeletons')).filter((f) => f.endsWith('.md') && f !== 'INDEX.md').sort()) {
  for (const item of extract(join(mod, 'skeletons', f))) {
    skeletons.push({ ...item, group: f.replace('.md', '') });
  }
}
const metaphors = extract(join(mod, 'metaphor.md')).map((m) => ({ ...m, group: 'metaphor' }));

// marker id 全局唯一：按出现顺序重编号
let n = 0;
const uniq = (svg) =>
  svg.replace(/id="(a\d*[a-z]?)"/g, (_, id) => `id="${id}_g${n}"`).replace(/url\(#(a\d*[a-z]?)\)/g, (_, id) => `url(#${id}_g${n})`);
for (const s of skeletons) { s.svg = uniq(s.svg); n++; }
for (const s of metaphors) { s.svg = uniq(s.svg); n++; }

// ---------- 风格预览 ----------

// 一张图，8 套配色。颜色全走 CSS 变量，换 style 只改变量。
// viewBox 与骨架层统一用 1020 宽，避免同一份产物里缩放比例不一致。
const STYLE_SVG = `<svg viewBox="0 0 1020 480" width="100%">
<rect x="20" y="20" width="540" height="300" rx="6" fill="var(--s-hero)"/>
<text x="46" y="106" class="t" fill="var(--s-on-hero)">核心结论</text>
<text x="46" y="164" class="sm" fill="var(--s-on-hero)" opacity=".85">一句话说清楚这张图的价值</text>
<text x="46" y="216" class="sm" fill="var(--s-on-hero)" opacity=".7">· 支撑要点一</text>
<text x="46" y="258" class="sm" fill="var(--s-on-hero)" opacity=".7">· 支撑要点二</text>
<rect x="580" y="20" width="420" height="140" rx="6" fill="var(--s-accent)"/>
<text x="606" y="100" class="tb" fill="var(--s-on-accent)">强调项</text>
<line x1="580" y1="186" x2="1000" y2="186" stroke="var(--s-rule)" stroke-width="2"/>
<rect x="20" y="340" width="310" height="120" rx="6" fill="var(--s-neutral)"/>
<text x="44" y="410" class="sm" fill="var(--s-ink)">支撑 A</text>
<rect x="350" y="340" width="310" height="120" rx="6" fill="var(--s-neutral)"/>
<text x="374" y="410" class="sm" fill="var(--s-ink)">支撑 B</text>
<rect x="680" y="210" width="320" height="250" rx="6" fill="var(--s-neutral)"/>
<text x="704" y="340" class="sm" fill="var(--s-ink)">支撑 C</text>
</svg>`;

const STYLES = [
  { id: 'default', name: 'deck 默认（UPerform）', note: '跟随 style-bootstrap，图与正文同源。默认选它。', v: { '--s-hero': '#1a1a2e', '--s-on-hero': '#ffffff', '--s-accent': '#c0392b', '--s-on-accent': '#ffffff', '--s-neutral': '#eef1f4', '--s-ink': '#1a1a2e', '--s-rule': '#c0392b' } },
  { id: 'clean-analytics', name: 'clean-analytics', note: '数据自信、圆形签名、超大数字', v: { '--s-hero': '#3B9B9B', '--s-on-hero': '#ffffff', '--s-accent': '#E87461', '--s-on-accent': '#ffffff', '--s-neutral': '#E4F3F3', '--s-ink': '#1A1A1A', '--s-rule': '#4EBDBA' } },
  { id: 'mckinsey-report', name: 'mckinsey-report', note: '咨询蓝、衬线标题、行动式标题', v: { '--s-hero': '#1B2838', '--s-on-hero': '#ffffff', '--s-accent': '#2563EB', '--s-on-accent': '#ffffff', '--s-neutral': '#F5F5F5', '--s-ink': '#1A1A1A', '--s-rule': '#2563EB' } },
  { id: 'tricon-infographic', name: 'tricon-infographic', note: '出版物红、锐利、极简', v: { '--s-hero': '#8B1A2B', '--s-on-hero': '#ffffff', '--s-accent': '#C41E3A', '--s-on-accent': '#ffffff', '--s-neutral': '#F5F5F5', '--s-ink': '#1A1A1A', '--s-rule': '#C41E3A' } },
  { id: 'technical-schematic', name: 'technical-schematic', note: '工程精度、琥珀高亮、白底图纸', v: { '--s-hero': '#1E3A5F', '--s-on-hero': '#ffffff', '--s-accent': '#F59E0B', '--s-on-accent': '#1a1a2e', '--s-neutral': '#E2E8F0', '--s-ink': '#1E3A5F', '--s-rule': '#2563EB' } },
  { id: 'ui-wireframe', name: 'ui-wireframe', note: '灰阶线框、中性克制', v: { '--s-hero': '#374151', '--s-on-hero': '#ffffff', '--s-accent': '#3B82F6', '--s-on-accent': '#ffffff', '--s-neutral': '#E5E5E5', '--s-ink': '#374151', '--s-rule': '#9CA3AF' } },
  { id: 'bandung-circuit', name: 'bandung-circuit', note: '米纸底、墨绿+芥黄、编辑插画', v: { '--s-hero': '#1F5F66', '--s-on-hero': '#F4EAD5', '--s-accent': '#D6A946', '--s-on-accent': '#1F1F1F', '--s-neutral': '#CDDDD8', '--s-ink': '#1F1F1F', '--s-rule': '#B86A55', '--s-paper': '#F4EAD5' } },
  { id: 'subway-map', name: 'subway-map', note: '多线路色、45°/90° 折线', v: { '--s-hero': '#E03A3E', '--s-on-hero': '#ffffff', '--s-accent': '#2563EB', '--s-on-accent': '#ffffff', '--s-neutral': '#E5E7EB', '--s-ink': '#1A1A1A', '--s-rule': '#0E9F6E' } },
  { id: 'aged-academia', name: 'aged-academia', note: '羊皮纸底、乌贼墨、编号标本', v: { '--s-hero': '#704214', '--s-on-hero': '#F4E4BC', '--s-accent': '#9E2B25', '--s-on-accent': '#F4E4BC', '--s-neutral': '#EBD9A8', '--s-ink': '#3D2B14', '--s-rule': '#A8895C', '--s-paper': '#F4E4BC' } },
];

// ---------- 渲染 ----------

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const nav = (items) =>
  items.map((i) => `<a href="#${i.id}">${esc(i.label)}</a>`).join('');

const card = (c) => `<figure class="card" id="${c.anchor}">
<figcaption><span class="gname">${esc(c.group)}</span>${esc(c.name)}</figcaption>
${c.svg}
${c.note ? `<p class="note">${esc(c.note)}</p>` : ''}
</figure>`;

const skeletonCards = skeletons.map((s, i) => ({ ...s, anchor: `sk-${i}` }));
const metaphorCards = metaphors.map((m, i) => ({ ...m, anchor: `mp-${i}` }));
const styleCards = STYLES.map((s, i) => ({
  anchor: `st-${i}`, name: s.name, group: 'style', note: s.note,
  svg: `<div class="stylewrap" style="${Object.entries(s.v).map(([k, val]) => `${k}:${val}`).join(';')}">${STYLE_SVG}</div>`,
}));

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>内联 SVG 信息图总览 · marp-slide-expert</title>
<style>
:root { --ink:#1a1a2e; --muted:#7f8c8d; --line:#e3e6ea; --accent:#c0392b; --page:#FAFAFA; }
* { box-sizing: border-box; }
body { margin:0; background:var(--page); color:var(--ink);
  font-family:'PingFang SC','Microsoft YaHei','Noto Sans CJK SC',sans-serif; }
header { padding:44px 40px 26px; border-bottom:2px solid var(--accent); background:#fff; }
h1 { margin:0 0 8px; font-size:26px; letter-spacing:-.2px; }
.sub { margin:0; color:var(--muted); font-size:14px; max-width:760px; line-height:1.65; }
nav { position:sticky; top:0; z-index:9; display:flex; gap:8px; flex-wrap:wrap;
  padding:12px 40px; background:rgba(255,255,255,.94); backdrop-filter:blur(8px);
  border-bottom:1px solid var(--line); }
nav a { font-size:13px; color:var(--ink); text-decoration:none; padding:5px 12px;
  border:1px solid var(--line); border-radius:999px; background:#fff; }
nav a:hover { border-color:var(--accent); color:var(--accent); }
section { padding:30px 40px 10px; }
h2 { font-size:17px; color:var(--accent); margin:0 0 4px; }
.desc { color:var(--muted); font-size:13px; margin:0 0 20px; max-width:820px; line-height:1.7; }
.grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(540px,1fr)); gap:20px; }
.card { margin:0; padding:20px 22px 22px; background:#fff; border:1px solid var(--line);
  border-radius:8px; }
figcaption { font-size:14px; font-weight:600; margin-bottom:14px; display:flex;
  align-items:center; gap:9px; }
.gname { font-size:11px; font-weight:600; color:#fff; background:var(--ink);
  padding:3px 9px; border-radius:4px; letter-spacing:.3px; }
.note { margin:12px 0 0; font-size:12.5px; color:var(--muted); line-height:1.6; }
.stylewrap { background:var(--s-paper, var(--page)); border-radius:6px; padding:4px; }
svg { display:block; margin:0 auto; max-width:100%; height:auto; }
svg text { font-family:'PingFang SC','Microsoft YaHei','Noto Sans CJK SC',sans-serif; }
svg .t   { font-size:26px; font-weight:700; }
svg .tb  { font-size:19px; font-weight:700; }
svg .qt  { font-size:20px; font-weight:700; }
svg .sm  { font-size:15px; }
svg .lbl { font-size:15px; fill:#7f8c8d; }
footer { padding:34px 40px 46px; color:var(--muted); font-size:12.5px; line-height:1.8; }
code { background:#eef1f4; padding:2px 6px; border-radius:4px; font-size:12.5px; }
</style>
</head>
<body>
<header>
<h1>内联 SVG 信息图总览</h1>
<p class="sub">同一副骨架换叙事外壳换配色。画图前先扫一眼，定位到要的那个形状再回
<code>references/infographics-svg/</code> 抄模板。
本文件由 <code>node scripts/build-gallery.mjs</code> 从 references 生成——改完模板重跑一次即可，不要手改。</p>
</header>
<nav>
${nav([{ id: 'skeletons', label: `① 骨架 ${skeletons.length} 个` }, { id: 'metaphor', label: `② 隐喻外壳 ${metaphors.length} 个` }, { id: 'styles', label: `③ 风格 ${STYLES.length} 套` }, { id: 'usage', label: '用法' }])}
</nav>

<section id="skeletons">
<h2>① 骨架 — 关系类型决定图形</h2>
<p class="desc">先判断「这些节点之间到底是什么关系」，再选骨架。这一层决定结构，不决定语气和颜色。
每个卡片对应 <code>skeletons/</code> 下的一份规格，含坐标公式。</p>
<div class="grid">
${skeletonCards.map(card).join('\n')}
</div>
</section>

<section id="metaphor">
<h2>② 隐喻外壳 — 叙事意图决定语气</h2>
<p class="desc">骨架定了之后问「这页要什么情绪」，在同一副骨架上换壳。
<strong>一页只讲一个隐喻，不要结构叠隐喻。</strong>这一层是单文件表，扩充骨架时它永远不用动。</p>
<div class="grid">
${metaphorCards.map(card).join('\n')}
</div>
</section>

<section id="styles">
<h2>③ 风格 — 配色与字阶</h2>
<p class="desc">同一张图换 8 套配色。横排对比才看得出差别——token 表读不出「这个蓝比那个蓝更适合我的 deck」。
<strong>默认用第一行（deck 调色板）</strong>，只有整份 deck 都是那个调性、或用户点名时才换。</p>
<div class="grid">
${styleCards.map(card).join('\n')}
</div>
</section>

<section id="usage">
<h2>用法</h2>
<p class="desc">四层依次过，每层只回答一个问题。</p>
<div class="grid"><figure class="card">
<figcaption>从选型到交付</figcaption>
<p class="note" style="font-size:13.5px">
<b>1. 选题</b> — 这份内容能画哪几张图？→ <code>structures.md</code><br>
<b>2. 体裁</b> — 用什么图形承载？→ <code>skeletons/INDEX.md</code><br>
<b>3. 语气</b> — 换什么叙事外壳？→ <code>metaphor.md</code><br>
<b>4. 配色</b> — 什么颜色字阶？→ <code>styles/INDEX.md</code><br>
<b>5. 笔法</b> — 画布/连线/排版 → <code>craft/</code><br><br>
<b>交付前两道关：</b><br>
<code>node scripts/svg-lint.mjs deck.marp.md</code><br>
<code>marp deck.marp.md --html --images png -o check</code><br><br>
第一道抓「必然错」的（空行、---、id 冲突、坐标越界），<br>
第二道抓「看起来错」的（重叠、错位、留白失衡）。<br>
<b>不要相信代码看起来对。</b>
</p>
</figure></div>
</section>

<footer>
共 ${skeletons.length} 个骨架 + ${metaphors.length} 个隐喻模板 + ${STYLES.length} 套风格。
由 <code>node scripts/build-gallery.mjs</code> 生成，源在 <code>references/infographics-svg/</code>。<br>
本文件只是选型目录；把图放进 deck 时用 <code>examples/smart-drawing-deck.marp.md</code> 那样的内联写法，并加 <code>&lt;!-- _class: diagram --&gt;</code>。
</footer>
</body>
</html>
`;

writeFileSync(join(root, 'examples/infographics-gallery.html'), html);
console.log(`✓ examples/infographics-gallery.html — ${skeletons.length} 骨架 + ${metaphors.length} 隐喻 + ${STYLES.length} 风格`);
