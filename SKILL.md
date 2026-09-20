---
name: marp-slide-expert
description: Convert or create Marp slide decks from Markdown sources. Use when working with .marp.md / .md files meant for marp CLI rendering, designing slide layouts with mixed text and images, splitting long content into slides, preparing image assets, or troubleshooting marp syntax errors. Applies to marp / marpit slide format.
---

# Marp Expert

Convert content into Marp slide decks that render cleanly via `marp --pdf --allow-local-files`. The constraints below are non-obvious pitfalls confirmed against [marpit.marp.app](https://marpit.marp.app/) — read once, apply always.

## Hard rules

These break rendering silently if violated:

- **Only `![bg ...](...)` for images.** Marp does NOT support `![w:60% center]`, `![width:200px]`, or any inline image sizing. If you need an image, it must be a background.
- **Wrap paths containing spaces in `<...>`**: `![bg](<path with spaces.png>)`. Without the brackets, marp silently treats the space as URL terminator.
- **No `<div>` wrappers.** Marp ignores HTML divs for layout. Use class directives (`<!-- _class: name -->`) for cover/divider styling.
- **Slides overflow when content is too dense.** Marp has no auto-shrink. Split proactively.

## Layout patterns (cheat sheet)

| Scenario | Pattern |
|---|---|
| Cover | `<!-- _class: cover -->` + `# Title` + `## Subtitle` |
| Major section break | `<!-- _class: divider -->` + `# Section Name` |
| Single image + text | `![bg left contain opacity:.9](<path>)` — image left, text right |
| Multi-image, no text | `![bg](<a>)` `![bg](<b>)` — horizontal row by default |
| Text + 2 images | `![bg right vertical](<a>)` + `![bg](<b>)` — img(a) right column, img(b) fills left, content overlays left |
| Portrait multi-image | Add `vertical` to each: `![bg vertical](<a>)` etc. |

For full syntax and orientation logic, read [references/image-syntax.md](references/image-syntax.md).

## Content density

Per-slide budget for body content:

- **≤ 1100 chars** is comfortable; **> 1500 chars** usually overflows.
- **Split at paragraph boundaries**, never mid-sentence. If a single paragraph exceeds the budget, split by sentence punctuation (`。！？. `).
- **Tables**: wide tables overflow horizontally. Keep ≤ 4 columns or split rows across slides.
- **Code blocks**: long code needs `pre` with smaller font in CSS; otherwise overflows vertically.
- **Long bulleted lists**: if 8+ bullets, split into 2 slides around a logical midpoint.

For splitting heuristics, read [references/slide-density.md](references/slide-density.md).

## Image asset prep

When converting external image URLs (HTML course content, scraped diagrams):

1. Download all unique images to a local `assests/` (or `assets/`) directory.
2. Compress each to ≤ 100 KB using Pillow + sips. Convert complex diagrams with many colors to JPEG q=82; keep simple line art as PNG with `optimize=True`.
3. **Rename with a chapter prefix** so paths are stable across slides: `L1_1.1-01_本节脉络.png` instead of raw URL slugs.
4. Build a URL → local-name mapping before generating slides so replacements are deterministic.

For full prep workflow, read [references/asset-prep.md](references/asset-prep.md).

## CSS bootstrap

**所有优普丰 marp 课件统一使用 openclaw 配色**（红 + 深蓝黑主题）。完整样式块在 [references/style-bootstrap.md](references/style-bootstrap.md)。调色板与 `openclaw_lesson01.md` / `fde_lesson*.marp.md` 等保持一致。

包含：
- CJK 字体栈（PingFang SC / Microsoft YaHei / Noto Sans CJK SC）
- 封面渐变（深蓝黑 `#1a1a2e` → 红 `#c0392b`，白字）
- 分隔页（深蓝灰 `#2c3e50` 底 + 红色 `#e74c3c` 标题）
- 表格（红色 `#c0392b` 表头 + `#f5f5f5` 偶数行）
- H1/H2/H3 色阶（红 / 深蓝灰 / 亮红）
- code 块（深底 `#1a1a2e` + 绿字 `#2ecc71`）

直接复制 `style: |-` 块到新 deck 的 frontmatter 即可。

### 提示框写法（替代废弃的 div class）

**不要**用 `<div class="tip">` / `<div class="warn">` 等 div 写法（marp 不支持 div 布局）。改用：

```markdown
> 💡 提示：xxx     （引用块 + emoji，等价于 tip）

> ⚠️ 警告：xxx     （等价于 warn）

> ✅ 成功：xxx     （等价于 success）

> 🎯 要点：xxx     （等价于 highlight）
```

## Workflow

1. Read source markdown; identify cover, dividers (H1/H2), and content sections (H3+).
2. Prep image assets (see asset-prep above).
3. Generate slides with these defaults:
   - One `## section` → divider slide.
   - One `### topic` → content slide titled `## Topic`.
   - Long content slides → split at paragraph boundaries.
   - Image placement per the cheat sheet above.
4. Render preview: `marp deck.marp.md --pdf --allow-local-files` and visually check first 5 pages.
5. Iterate on overflow / awkward layout.

## Quick troubleshooting

| Symptom | Likely cause |
|---|---|
| Image shows as markdown text instead of background | Path has unescaped spaces — wrap in `<...>` |
| Two images stack weirdly | Missing `vertical` keyword for portrait images |
| Content cut off at bottom | Single slide has > 1500 chars — split |
| Table rows truncated horizontally | Table too wide — split columns or shrink font in CSS |
| Cover slide has wrong background | Missing `<!-- _class: cover -->` directive |
| PDF render fails silently on images | Path doesn't resolve from .md file location — invoke marp from a directory where the relative path is valid |

For deeper marpit syntax reference, consult [https://marpit.marp.app/](https://marpit.marp.app/) — particularly the image-syntax and slide-layouts pages.
