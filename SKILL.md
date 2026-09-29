---
name: marp-slide-expert
description: Convert or create Marp slide decks from Markdown sources. Use when working with .marp.md / .md files meant for marp CLI rendering, designing slide layouts with mixed text and images, splitting long content into slides (15-line per-slide cap), writing speaker notes as invisible HTML comments, preparing image assets, or troubleshooting marp syntax errors and content overflow. Applies to marp / marpit slide format.
---

# Marp Expert

Convert content into Marp slide decks that render cleanly via `marp --pdf --allow-local-files`. The constraints below are non-obvious pitfalls confirmed against [marpit.marp.app](https://marpit.marp.app/) — read once, apply always.

## Hard rules

These break rendering silently if violated:

- **Only `![bg ...](...)` for images.** Marp does NOT support `![w:60% center]`, `![width:200px]`, or any inline image sizing. If you need an image, it must be a background.
- **Wrap paths containing spaces in `<...>`**: `![bg](<path with spaces.png>)`. Without the brackets, marp silently treats the space as URL terminator.
- **No `<div>` wrappers.** Marp ignores HTML divs for layout. Use class directives (`<!-- _class: name -->`) for cover/divider styling.
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

For full syntax and orientation logic, read [references/image-syntax.md](references/image-syntax.md).

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
- Tables (red `#c0392b` header + `#f5f5f5` alternating rows)
- H1/H2/H3 color scale (red / deep blue-grey / bright red)
- Code blocks (dark `#1a1a2e` background + green `#2ecc71` text)

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
4. Count lines on every generated slide before rendering. Any slide > 15 → fix now.
5. Render preview: `marp deck.marp.md --pdf --allow-local-files` and visually check first 5 pages plus a sample from middle/end.
6. Iterate on overflow / awkward layout.

## Quick troubleshooting

| Symptom | Likely cause |
|---|---|
| Image shows as markdown text instead of background | Path has unescaped spaces — wrap in `<...>` |
| Two images stack weirdly | Missing `vertical` keyword for portrait images |
| Content cut off at bottom | Slide has > 15 rendered lines — split, or move speaker-only detail into a `<!-- -->` note |
| Table rows truncated horizontally | Table too wide — keep ≤ 4 columns or shrink font in CSS |
| Slide split awkwardly | Cut mid-bullet or mid-table-row — re-split at paragraph boundaries |
| Speaker note text visible in the PDF | It's not inside an HTML comment — wrap it in `<!-- ... -->` |
| One slide became two / empty slide appeared | A `---` inside an HTML comment is still a page break — remove it |
| Cover slide has wrong background | Missing `<!-- _class: cover -->` directive |
| PDF render fails silently on images | Path doesn't resolve from .md file location — invoke marp from a directory where the relative path is valid |

For deeper marpit syntax reference, consult [https://marpit.marp.app/](https://marpit.marp.app/) — particularly the image-syntax and slide-layouts pages.
