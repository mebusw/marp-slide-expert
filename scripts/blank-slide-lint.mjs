#!/usr/bin/env node
// blank-slide-lint — 找出「读者视角的空白页」
//
// 用法: node scripts/blank-slide-lint.mjs <file.marp.md> [更多文件...]
//
// 为什么需要它：marp 按行首的 `---` 切页。一页如果去掉 HTML 注释、
// 围栏标记和空白后什么都不剩，它在源码上「不空白」——但投影出来是一片白。
// 肉眼扫源码永远发现不了，渲染成 PDF 再翻也要好几分钟。
//
// 抓两类问题：
//   1. EMPTY-SLIDE  一页只有注释 / 只有空行 —— 直接扔掉或补上可见内容
//   2. LEAKED-NOTE  注释块里提前闭合的 -->，讲稿漏到页面上
//   3. RENDER-ONLY  一页去掉注释后只剩内联 HTML（<svg> / <div>）——
//                   这页能不能显示，完全取决于渲染器有没有开 html。
//                   Obsidian 的 Marp 插件导出默认不开，这类页会整页变空白。
//
// 详见 SKILL.md「空白页：只有注释的页对读者等于不存在」

import { readFileSync } from 'node:fs';

const INK = { r: '\x1b[31m', y: '\x1b[33m', g: '\x1b[32m', d: '\x1b[2m', x: '\x1b[0m', b: '\x1b[1m' };
const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const c = (k, s) => (useColor ? INK[k] + s + INK.x : s);

/** 去掉 YAML frontmatter —— 它不是一页 */
function stripFrontmatter(text) {
  return text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
}

/** 按 marp 的规则切页：行首 --- 切；围栏代码内部的 --- 不切 */
function splitSlides(text) {
  const lines = text.split(/\r?\n/);
  const slides = [];
  let cur = [];
  let fence = null;
  let offset = 0;

  for (const line of lines) {
    const f = line.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (f) {
      if (fence === null) fence = f[1][0];
      else if (f[1][0] === fence) fence = null;
    }
    if (fence === null && /^\s{0,3}---\s*$/.test(line)) {
      slides.push({ lines: cur, startLine: offset + 1 });
      cur = [];
    } else {
      cur.push(line);
    }
    offset++;
  }
  slides.push({ lines: cur, startLine: offset + 1 });
  return slides;
}

/** 一页里「读者能看见」的部分：去注释、去围栏标记、去空行 */
function visibleText(lines) {
  const joined = lines.join('\n')
    .replace(/<!--[\s\S]*?-->/g, '')   // HTML 注释（含 speaker note 和 marpit 指令）
    .replace(/^\s*(`{3,}|~{3,}).*$/gm, ''); // 围栏标记行
  return joined.split('\n').filter((l) => l.trim().length > 0);
}

/** 注释块里提前闭合的 --> —— 讲稿会原样漏到页面上 */
function leakedNotes(lines) {
  const out = [];
  let inside = false, start = 0;
  lines.forEach((l, i) => {
    const t = l.trim();
    if (!inside && t.startsWith('<!--')) {
      if (/^<!--\s*_[^>]*-->\s*$/.test(t)) return;   // 正常的 marpit 指令
      // 单行注释（如 deck 顶部的渲染命令提示）：开与闭在同一行。
      // 不特判的话，下一行的 `<!-- _class: cover -->` 会被当成「提前闭合」误报。
      const closeIdx = t.indexOf('-->');
      if (closeIdx !== -1) {
        if (t.slice(closeIdx + 3).trim() !== '') out.push({ line: i + 1, text: t });
        return;
      }
      inside = true; start = i;
      return;
    }
    if (inside && l.includes('-->')) {
      if (t !== '-->') out.push({ line: start + 1, text: t });
      inside = false;
    }
  });
  return out;
}

/** 一页里被包在 HTML 块标签里的内容（渲染器不开 html 时会整页变空） */
function htmlOnlyBlocks(lines) {
  const joined = lines.join('\n').replace(/<!--[\s\S]*?-->/g, '');
  const tags = [...joined.matchAll(/<\/?(svg|div|table|img|picture|video|canvas)\b/gi)]
    .map((m) => m[1].toLowerCase());
  return [...new Set(tags)];
}

let errors = 0;
let warns = 0;
let totalSlides = 0;

for (const file of process.argv.slice(2)) {
  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch {
    console.log(`  ERROR   ${file}  读不到这个文件`);
    errors++;
    continue;
  }

  const slides = splitSlides(stripFrontmatter(text));
  totalSlides += slides.length;

  const found = [];
  slides.forEach((slide, i) => {
    const vis = visibleText(slide.lines);
    if (vis.length === 0) {
      found.push({ level: 'error', page: i + 1, line: slide.startLine,
        code: 'EMPTY-SLIDE',
        msg: `第 ${i + 1} 页没有任何可见内容（只有注释 / 空行）`,
        hint: '删掉多余的分页符，或给这一页补上可见内容。切页的 `---` 两侧都要有内容。' });
      return;
    }
    const leaks = leakedNotes(slide.lines);
    for (const lk of leaks) {
      found.push({ level: 'error', page: i + 1, line: lk.line,
        code: 'LEAKED-NOTE',
        msg: `第 ${i + 1} 页的 speaker note 提前闭合：${lk.text}`,
        hint: '注释块内部出现了 -->，后面的讲稿会原样显示在页面上。确认这一行该收尾成 --> 还是 】。' });
    }
    // 只剩 HTML 块 = 可见文字为零，但有 <svg>/<div> 这类块
    const plain = vis.filter((l) => !/^\s*<\/?[a-z]/i.test(l) && !/^\s*\|/.test(l));
    const htmlTags = htmlOnlyBlocks(slide.lines);
    if (plain.length === 0 && htmlTags.length > 0) {
      found.push({ level: 'warning', page: i + 1, line: slide.startLine,
        code: 'RENDER-ONLY',
        msg: `第 ${i + 1} 页去掉注释后只剩 <${htmlTags.join('> <')}>`,
        hint: '这一页能不能显示，完全取决于渲染器有没有开 HTML。命令行必须带 --html；'
          + 'Obsidian 的 Marp 插件导出命令不带，需改 main.js。注意：frontmatter 里写 html: true 无效。' });
    }
  });

  if (found.length === 0) {
    console.log(`${c('b', file)} — ${slides.length} 页，无空白页 ${c('g', '✅')}`);
  } else {
    console.log(`${c('b', file)} — ${slides.length} 页，${found.length} 个问题\n`);
    for (const f of found) {
      const tag = f.level === 'error' ? c('r', 'ERROR  ') : c('y', 'WARNING');
      console.log(`  ${tag} ${c('d', `${file}:${f.line}`)}  [${f.code}] ${f.msg}`);
      console.log(`          ${c('d', '→ ' + f.hint)}`);
    }
    console.log();
  }
  errors += found.filter((f) => f.level === 'error').length;
  warns += found.filter((f) => f.level === 'warning').length;
}

console.log();
if (errors === 0 && warns === 0) {
  console.log(c('g', '全部通过。') + c('d', '  每一页都有读者能看见的内容。'));
} else {
  console.log(`${errors} error, ${warns} warning`);
  if (errors === 0) console.log(c('y', '没有空白页，但有只靠渲染器才能显示的页，确认一下 html 开关。'));
}
process.exit(errors ? 1 : 0);
