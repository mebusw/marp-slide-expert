# CSS Style Bootstrap

A reusable style block to drop into a new deck's frontmatter. **This is the standard UPerform / openclaw courseware palette** (red + deep navy-black theme), kept visually consistent across every UPerform marp deck: `openclaw_lesson01.md`, `fde_lesson*.marp.md`, and so on.

Palette provenance: extracted and calibrated from `openclaw_lesson01.md`.

## Color anchors (do not change)

| Use | Value |
|------|------|
| Primary red (accent) | `#c0392b` |
| Bright red (H3 / emphasis) | `#e74c3c` |
| Deep navy-black (background / heading / code background) | `#1a1a2e` |
| Deep blue-grey (divider background / H2) | `#2c3e50` |
| Body text | `#1a1a2e` |
| Page background | `#FAFAFA` |
| Table alternating row | `#f5f5f5` |
| Code text (green) | `#2ecc71` |

## Full style block (identical to openclaw)

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
  /* marp default 主题给 table 设了 display:block;width:max-content。
     块盒会被撑开，但内部的匿名表格仍然收缩到内容宽度 —— 结果是表格永远半宽。
     width 加 !important 也救不回来，必须把 display 改回 table。 */
  table {
    display: table !important;
    width: 100% !important;
    border-collapse: collapse;
    font-size: 0.82em;
  }
  /* ---- Smart drawing (inline SVG) helpers ---- */
  svg {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    height: auto;
  }
  svg text {
    font-family: 'PingFang SC', 'Microsoft YaHei', 'Noto Sans CJK SC', sans-serif;
  }
  svg .t   { font-size: 26px; font-weight: 700; }   /* 图形主标题 */
  svg .tb  { font-size: 19px; font-weight: 700; }   /* 节点 / 序号 */
  svg .sm  { font-size: 15px; }                     /* 副标签 */
  svg .qt  { font-size: 20px; font-weight: 700; }   /* 象限标题 */
  svg .lbl { font-size: 15px; fill: #7f8c8d; }     /* 底部浅灰注脚 */
  /* 封面/分隔页/整幅关系图页隐藏 footer：深色背景上灰字对比度低，
     且图形贴底时（X 轴标题、图例）会与 footer 撞在一起。 */
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

## Usage

1. Copy the whole `style: |-` block above (including the `footer` and `header` lines) into the new deck's frontmatter.
2. Add `<!-- _class: cover -->` at the top of the title slide.
3. Use `<!-- _class: divider -->` for major section breaks.
4. Add `<!-- _class: diagram -->` to any slide holding a full-width inline-SVG diagram.
5. **Do not** use div callouts like `<div class="tip">` (without `--html`, marp does not support div layout). Use instead:
   - Blockquote + emoji: `> 💡 Tip: xxx`
   - A table
   - Emoji + bold paragraph: `**✅ Output**: xxx`

## Customization points

| Want to change | Edit |
|---|---|
| Different accent color | `h1` color + both ends of the `section.cover` / `section.divider` gradient |
| Larger body text | `section { font-size: 24px; }` |
| Smaller tables | `table { font-size: 0.7em; }` |
| Larger code blocks | `pre { font-size: 0.85em; }` |
| No page number on cover/divider | Add `<!-- _paginate: skip -->` to those slides |
| Bigger/smaller diagram type | `svg .t / .tb / .sm / .qt / .lbl` — one edit rescales every diagram in the deck |
| Footer back on a diagram page | Drop `<!-- _class: diagram -->` and remove that selector from the `footer` rule |

## Smart drawing support

The `svg` / `svg text` / type-scale rules and the `section.diagram footer` rule exist for inline-SVG consulting diagrams. Two notes:

- **Inline SVG only renders with the `--html` flag.** `marp deck.marp.md --html --pdf --allow-local-files`. Without it Marp escapes the markup and the diagram shows up as a page of source code. Write the required command into a comment at the top of any deck that ships diagrams.
- **Put font sizes in the class, not in a `font-size` attribute.** The deck `<style>` reaches into `<svg>` fine, so `class="t"` resizes across every diagram at once; a hardcoded `font-size="26"` does not.

Templates and coordinate formulas: [smart-drawing.md](smart-drawing.md). Runnable deck: `../examples/smart-drawing-deck.marp.md`.

## Known differences vs the openclaw reference

- The openclaw template's div classes — `class="tip"`, `class="warn"`, `class="danger"`, `class="success"`, `class="formula"`, `class="time"` — are retired. This style drops them and uses blockquote + emoji instead.
- The time label (`.time`) becomes a blockquote such as `> ⏰ **20 min**`.
- Formula highlighting (`.formula`) becomes a centered, bolded blockquote.

## Validation

After rendering, check:
1. No missing CJK glyphs (confirm the rendering machine has `PingFang SC`, `Microsoft YaHei`, or `Noto Sans CJK SC` installed).
2. Cover shows the deep navy-black → red gradient; dividers show the deep blue-grey background.
3. No table exceeds the slide width (≤ 4 columns per slide), **and tables actually reach the full slide width** — if they render at roughly half width, the `display: table !important` rule was dropped.
4. Diagram slides: bottom-most labels (axis titles, legends) do not collide with the footer; the type scale (`svg .t/.tb/.sm`) is applied via `class`, not `font-size` attributes.
5. Code blocks have no horizontal scrollbar (use `pre { font-size: 0.7em }` for long prompt templates).
6. Long prompt templates use `<details>` collapse (marp supports HTML details) or are split across slides, so no single page is overloaded — remember the 15-line cap, and push speaker-only detail into `<!-- -->` notes.
