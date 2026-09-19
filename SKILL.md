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

A reusable style block for new decks is in [references/style-bootstrap.md](references/style-bootstrap.md). It covers:

- CJK font stack (PingFang / Microsoft YaHei / Noto Sans CJK SC)
- Cover gradient (dark blue → red, white text)
- Divider (dark slate, centered)
- Table styling (red header, alternating row backgrounds)
- h1/h2/h3 color hierarchy

Copy the `style: |-` block into the frontmatter of any new deck.

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
