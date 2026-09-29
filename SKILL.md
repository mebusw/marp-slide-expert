---
name: marp-slide-expert
description: Convert or create Marp slide decks from Markdown sources. Use when working with .marp.md / .md files meant for marp CLI rendering, designing slide layouts with mixed text and images, drawing consulting-style smart drawings / relation diagrams (staircase, arrow chain, 2x2 matrix, value tree) as inline SVG, splitting long content into slides (15-line per-slide cap), writing speaker notes as invisible HTML comments, preparing image assets, or troubleshooting marp syntax errors and content overflow. Applies to marp / marpit slide format.
---

# Marp Expert

Convert content into Marp slide decks that render cleanly via `marp --pdf --allow-local-files`. The constraints below are non-obvious pitfalls confirmed against [marpit.marp.app](https://marpit.marp.app/) — read once, apply always.

## Hard rules

These break rendering silently if violated:

- **Only `![bg ...](...)` for images.** Marp does NOT support `![w:60% center]`, `![width:200px]`, or any inline image sizing. If you need an image, it must be a background.
- **Wrap paths containing spaces in `<...>`**: `![bg](<path with spaces.png>)`. Without the brackets, marp silently treats the space as URL terminator.
- **No `<div>` wrappers.** Without the `--html` flag, Marp ignores HTML divs for layout. Use class directives (`<!-- _class: name -->`) for cover/divider styling.
- **Inline SVG requires `--html`.** Marp escapes HTML by default, so a `<svg>` diagram renders as a page of visible source code. Any deck containing inline SVG must be rendered with `marp deck.marp.md --html --pdf --allow-local-files`. See "Smart drawing" below.
- **Slides overflow when content is too dense.** Marp has no auto-shrink. Split proactively.
- **Max 15 visible lines per slide.** Count every rendered line — paragraph lines, bullet items, table rows (including the header row), code block lines, quote/callout-box lines. Over 15 and the bottom of the slide gets cut off in the PDF. See "15-line hard cap" below.

## Layout patterns (cheat sheet)

| Scenario | Pattern |
|---|---|
| Cover | `<!-- _class: cover -->` + `# Title` + `## Subtitle` |
| Major section break | `<!-- _class: divider -->` + `# Section Name` |
| Single image + text | `![bg left contain opacity:.9](<path>)` — image left, text right |
| Multi-image, no text | `![bg](<a>)` `![bg](<b>)` — horizontal row by default |
| Text + 2 images | `![bg right vertical](<a>)` + `![bg](<b>)` — img(a) right column, img(b) fills left, content overlays left |
| Portrait multi-image | Add `vertical` to each: `![bg vertical](<a>)` etc. |
| Smart drawing / 关系图 | `<!-- _class: diagram -->` + inline `<svg>` — see "Smart drawing" below |

For full syntax and orientation logic, read [references/image-syntax.md](references/image-syntax.md).

## Smart drawing — 咨询级关系图（内联 SVG）

Consulting smart drawings (staircase, arrow chain, 2×2 matrix, value tree, closed loop) are drawn as **inline SVG written directly in the `.md`** — not as images. A PNG has to be redrawn to change one number; SVG travels with the file, keeps its text searchable, stays vector in the PDF, and recolours with one hex value.

```bash
# 含关系图的 deck 必须带 --html，否则 SVG 被转义成一整页源码
marp deck.marp.md --html --pdf --allow-local-files
```

**Pick the diagram in two steps: relationship first, then metaphor.** Nine relationship families (hierarchy / sequence / cycle / comparison / matrix / framework / strategy / mapping / growth) route to one of the templates below. The narrative layer — staircase, pyramid, flywheel, iceberg, funnel, bridge, mountain, convergence — swaps the *shell* on that same skeleton without changing the routing. Full routing table and the metaphor → geometry map: [references/smart-drawing.md](references/smart-drawing.md) §4.

| Relationship | Answers | Template |
|---|---|---|
| Sequence | what happens first, then next | Arrow chain |
| Hierarchy (depth 3+) | where value comes from | Value tree |
| Matrix (2 dimensions) | who gets the money, who doesn't | 2×2 matrix |
| Growth / evolution | where we are, what's next | Staircase |
| Feedback | how it compounds | Closed-loop dashed line, overlaid |

**Non-negotiables when writing SVG into markdown:**

- **No blank lines inside the SVG block** — markdown cuts the HTML block at the first blank line and the diagram vanishes without an error.
- **Unique `marker` / `clipPath` ids per diagram** (`a1`, `a2`, …) — in a merged single-HTML export every SVG shares one DOM, so duplicate ids make all arrowheads resolve to the first definition.
- **No `---` inside the SVG** — it is still parsed as a page break.
- **Font sizes come from CSS classes, never a `font-size` attribute** — the deck's `style:` block already defines `svg .t / .tb / .sm / .qt / .lbl` (see [references/style-bootstrap.md](references/style-bootstrap.md)), so one edit re-sizes every diagram.
- **Add `<!-- _class: diagram -->`** when diagram content reaches the bottom of the viewBox (axis titles, legends, footnotes) — the CSS hides the footer on those slides so they don't collide.
- **Keep nodes ≤ 7 per diagram.** Past that, split the page or fall back to a table.
- **One colour family + one accent** (grey → navy → red, per the palette below). Three or more hues turn muddy under projection.

Two failure modes worth memorising:

- A **hollow chevron** (6-point path notched on both sides) leaves a triangular hole on its left half — white text lands in the hole and disappears. Draw a **5-point path: rectangle + a 34px right tip**, and centre the text on the rectangle at `x + 81`, not on the full 196px width.
- Trust the **rendered PNG**, never the SVG source. Render with `--images png` and inspect every page.

Full templates with coordinate formulas, the connector-semantics table, visual-hierarchy rules, and the QA checklist: **[references/smart-drawing.md](references/smart-drawing.md)**. A verified 8-page runnable deck: **[examples/smart-drawing-deck.marp.md](examples/smart-drawing-deck.marp.md)**.

## Content density — the 15-line hard cap

**Every slide renders at most 15 lines of content. Count them before shipping. HTML comments are excluded.**

Count each of these as one line:

| Element | How to count |
|---|---|
| Paragraph | One visual line as wrapped, ≈ 38 CJK chars or ≈ 75 Latin chars per line at default font. A 4-sentence paragraph ≈ 3 lines. |
| Bullet / numbered item | 1 line per item, plus 1 more if it wraps |
| Table | 1 line per row, **including the header row**. A 4-column × 4-row table = 5 lines. |
| Code block | 1 line per code line — no exceptions, no partial credit |
| Quote / tip / warn box (`>`) | Every wrapped line inside the box |
| Heading | Count it — `##` costs 1 line before the body starts |
| Speaker note / any HTML comment `<!-- -->` | **0 lines** — comments never render, so they never count |

A slide is a **budget of 15 total**, not 15 per element. `##` title (1) + table 6 rows (6) + 2 bullets (2) + closing paragraph (2 lines) = 11 → fine. Add a 5-line code block and you're at 16 → split.

**Speaker notes and other HTML comments do not count** — they never render. So an overflowing slide can often be fixed by moving detail into a note rather than cutting it.

Corollary limits that follow from the 15-line cap:

- **Title + 1 image** → ≤ 8 body lines. Images eat vertical space even though they don't count as lines.
- **Text only** → up to 15 lines, but aim for 10–12; long lines are hard to read from the back row.
- **Code blocks** → ≤ 10 lines per slide. More than that, split at logical boundaries (function def, between classes) or move to an appendix slide.
- **Tables** → ≤ 8 rows incl. header, ≤ 4 columns. Over 4 columns, the table overflows horizontally instead of vertically.
- **Bulleted lists** → ≤ 10 items. Past that, split around a logical midpoint or convert to a table.
- **Never split a bullet or a table row** across slides — a bullet cut in half, or a table with a dangling header, reads as broken.

Counting rule of thumb: **CJK ≈ 1 line per 38 characters; Latin ≈ 1 line per 75 characters.** A 600-character Chinese paragraph is already ~16 lines on its own.

For splitting heuristics, read [references/slide-density.md](references/slide-density.md).

## Image asset prep

When converting external image URLs (HTML course content, scraped diagrams):

1. Download all unique images to a local `assests/` (or `assets/`) directory.
2. Compress each to ≤ 100 KB using Pillow + sips. Convert complex diagrams with many colors to JPEG q=82; keep simple line art as PNG with `optimize=True`.
3. **Rename with a chapter prefix** so paths are stable across slides: `L1_1.1-01_section-overview.png` instead of raw URL slugs.
4. Build a URL → local-name mapping before generating slides so replacements are deterministic.

For full prep workflow, read [references/asset-prep.md](references/asset-prep.md).

## CSS bootstrap

**All UPerform / openclaw marp decks share one palette** (red + deep navy-black theme). The complete style block lives in [references/style-bootstrap.md](references/style-bootstrap.md). The palette is calibrated against `openclaw_lesson01.md` and the `fde_lesson*.marp.md` family.

It includes:
- CJK font stack (PingFang SC / Microsoft YaHei / Noto Sans CJK SC)
- Cover gradient (deep navy-black `#1a1a2e` → red `#c0392b`, white text)
- Divider slides (deep blue-grey `#2c3e50` background + red `#e74c3c` heading)
- Tables (red `#c0392b` header + `#f5f5f5` alternating rows) — plus the `display: table !important` fix, without which marp's default theme makes every table half-width
- H1/H2/H3 color scale (red / deep blue-grey / bright red)
- Code blocks (dark `#1a1a2e` background + green `#2ecc71` text)
- SVG helpers: `svg` sizing, CJK font for `svg text`, the `.t / .tb / .sm / .qt / .lbl` type scale, and `section.cover/divider/diagram footer { display: none }`

Copy the `style: |-` block verbatim into a new deck's frontmatter.

### Callout boxes (replacing the retired div classes)

**Do not** use `<div class="tip">` / `<div class="warn">` — marp ignores div-based layout. Use a blockquote plus an emoji instead:

```markdown
> 💡 Tip: xxx        (blockquote + emoji == tip)

> ⚠️ Warning: xxx    (== warn)

> ✅ Success: xxx    (== success)

> 🎯 Key point: xxx  (== highlight)
```

## Speaker notes (HTML comments — invisible in the PDF)

Different audiences need different things. **Anything only the speaker needs — background, transitions, backup numbers, Q&A prep — goes in an HTML comment `<!-- ... -->`:**

```markdown
## Three deployment modes

- Public cloud: fastest to launch
- On-premise: compliance first
- Hybrid: best cost

<!--
Speaker notes:
- "Hybrid" is the newest option; long-time customers ask about it most.
- Case: a bank went on-premise, 8M contract.
- If asked about pricing, jump to the table on the next slide.
-->
```

Rules:

- Notes are **never rendered**: absent from the generated HTML, PDF, and PPTX. They exist only in the `.md` source, which is where the speaker reads them.
- Notes **do not count toward the 15-line cap** — they cost zero lines and can be as long as needed.
- One note block per slide, placed after that slide's content and before the `---` separator.
- **Never write `---` inside a note** — it is still parsed as a page break and will split the slide.
- Also useful for draft markers that must not ship: `<!-- TODO: add real pricing data -->`.
- Marpit directives (`<!-- _class: ... -->`, `<!-- _paginate: -->`) also use `<!-- -->` but start with `_` and stay active. Speaker notes must not start with `_`.
- **First fix for an over-15-line slide:** ask "is this for the audience or for me?" If it's for you, move the whole thing into a comment — it costs no lines. Only content the audience genuinely needs to read is worth a new slide.

## Workflow

1. Read source markdown; identify cover, dividers (H1/H2), and content sections (H3+).
2. Prep image assets (see asset-prep above).
3. Generate slides with these defaults:
   - One `## section` → divider slide.
   - One `### topic` → content slide titled `## Topic`.
   - Split so **no slide exceeds 15 rendered lines** (see the count table above). When a section is long, decide per-paragraph: audience-facing content splits onto a new slide; speaker-only context moves into a `<!-- -->` note.
   - Never split mid-sentence, mid-bullet, or mid-table-row. Cut at paragraph boundaries.
   - Image placement per the cheat sheet above.
   - For relationship diagrams, route by relationship type → pick the template in [references/smart-drawing.md](references/smart-drawing.md) → mark the slide `<!-- _class: diagram -->`.
4. Count lines on every generated slide before rendering. Any slide > 15 → fix now.
5. Render preview: `marp deck.marp.md --pdf --allow-local-files` (add `--html` if the deck contains inline SVG) and visually check first 5 pages plus a sample from middle/end. For a deck with diagrams, render every page to PNG (`--images png`) — SVG geometry is not verifiable from the source.
6. Iterate on overflow / awkward layout.

## Quick troubleshooting

| Symptom | Likely cause |
|---|---|
| Image shows as markdown text instead of background | Path has unescaped spaces — wrap in `<...>` |
| Two images stack weirdly | Missing `vertical` keyword for portrait images |
| Content cut off at bottom | Slide has > 15 rendered lines — split, or move speaker-only detail into a `<!-- -->` note |
| Table rows truncated horizontally | Table too wide — keep ≤ 4 columns or shrink font in CSS |
| Table renders at half width | marp's default theme sets `table { display: block }` — the block box stretches but the inner anonymous table shrink-wraps. Fix with `display: table !important` (already in style-bootstrap) |
| Whole slide shows SVG source code | Missing `--html` at render time |
| SVG diagram disappeared entirely | A blank line inside the SVG block split the HTML block — remove it |
| One slide split into two | A `---` inside the SVG or inside an HTML comment |
| All diagrams' arrowheads look identical | Duplicate `marker` id across SVGs in one merged HTML export — suffix per diagram |
| White text invisible on an arrow shape | Drawn as a hollow chevron — use a 5-point path (rectangle + right tip) and centre text on the rectangle |
| SVG text ignores the deck's CSS classes | A `font-size` attribute was hardcoded, or the class was declared in an SVG-internal `<style>` instead of the frontmatter `style:` block |
| Axis title / legend overlaps the footer | Add `<!-- _class: diagram -->` to that slide |
| Slide split awkwardly | Cut mid-bullet or mid-table-row — re-split at paragraph boundaries |
| Speaker note text visible in the PDF | It's not inside an HTML comment — wrap it in `<!-- ... -->` |
| One slide became two / empty slide appeared | A `---` inside an HTML comment is still a page break — remove it |
| Cover slide has wrong background | Missing `<!-- _class: cover -->` directive |
| PDF render fails silently on images | Path doesn't resolve from .md file location — invoke marp from a directory where the relative path is valid |

For deeper marpit syntax reference, consult [https://marpit.marp.app/](https://marpit.marp.app/) — particularly the image-syntax and slide-layouts pages.
