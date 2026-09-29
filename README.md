# Marp Slide Expert

[中文文档](README.zh-CN.md)

An Agent Skill for building Marp slide decks that render cleanly through `marp --pdf --allow-local-files`. It captures the pitfalls that break Marp rendering silently, plus a strict per-slide density budget and a convention for speaker notes.

## The two rules that matter most

### 1. 15 rendered lines per slide, comments excluded

Every slide shows at most **15 lines** of content. HTML comments are excluded — they never render, so they never count.

| Element | Lines |
|---|---|
| Paragraph | 1 per wrapped line (≈38 CJK chars or ≈75 Latin chars each) |
| Bullet / numbered item | 1 per item, +1 if it wraps |
| Table | 1 per row, **header row included** |
| Code block | 1 per code line |
| Callout box (`>`) | 1 per wrapped line inside the box |
| Heading | 1 |
| Speaker note `<!-- -->` | **0** |

The 15 is a **total budget per slide**, not an allowance per element. Images don't count as lines but they do consume vertical space, so a slide with a background image should stay under 8 body lines.

Corollary limits: code ≤ 10 lines, tables ≤ 8 rows and ≤ 4 columns, lists ≤ 10 items. Never split a bullet or a table row across slides.

### 2. Speaker notes live in HTML comments

Content meant for the speaker, not the audience, goes inside `<!-- ... -->`:

```markdown
## Three deployment modes

- Public cloud: fastest to launch
- On-premise: compliance first
- Hybrid: best cost

<!--
Speaker notes: Hybrid is the newest option; long-time customers ask about it most.
Case: a bank went on-premise, 8M contract.
-->
```

It never appears in the rendered HTML, PDF, or PPTX — only in the `.md` source. It costs zero lines.

Three traps:

- **Never write `---` inside a note.** It is still parsed as a page break and splits the slide.
- Marpit directives (`<!-- _class: cover -->`, `<!-- _paginate: -->`) also use `<!-- -->` but start with `_` and remain active. Speaker notes must not start with `_`.
- One note block per slide, placed after the slide's content and before the `---` separator.

**When a slide runs over 15 lines, reach for a note before you reach for a new slide.** A note is free; an extra slide costs the audience's attention.

## Layout quick reference

| Scenario | Pattern |
|---|---|
| Cover | `<!-- _class: cover -->` + `# Title` + `## Subtitle` |
| Section break | `<!-- _class: divider -->` + `# Section Name` |
| Image + text | `![bg left contain opacity:.9](<path>)` — image left, text right |
| Multiple images | `![bg](<a>)` `![bg](<b>)` — horizontal row by default |
| Text + 2 images | `![bg right vertical](<a>)` + `![bg](<b>)` |
| Portrait images | Add `vertical` to each |
| Smart drawing / 关系图 | `<!-- _class: diagram -->` + inline `<svg>` — needs `--html` |

Every image must be a `![bg ...]` background — Marp has no inline image sizing. Paths containing spaces or non-ASCII characters must be wrapped in `<...>`, or Marp truncates the URL at the first space and renders the path as text.

## Smart drawing (inline SVG)

Consulting diagrams — staircase, arrow chain, 2×2 matrix, value tree, closed loop — are written as inline SVG in the `.md`, not as image files. They stay vector in the PDF, their text stays searchable, and a colour change is one hex value.

```bash
marp deck.marp.md --html --pdf --allow-local-files   # --html is required
```

Without `--html` Marp escapes the markup and the diagram renders as a page of visible source code.

Four rules that break rendering silently:

- **No blank lines inside the SVG block** — markdown cuts the HTML block there and the diagram disappears with no error.
- **Unique `marker` ids per diagram** — a merged single-HTML export shares one DOM, so duplicates make every arrowhead resolve to the first definition.
- **No `---` inside the SVG** — still a page break.
- **Font sizes via CSS class, not a `font-size` attribute** — `svg .t / .tb / .sm` are defined in the style block, so one edit rescales every diagram.

Draw a **5-point arrow path (rectangle + 34px right tip)** and centre the text on the rectangle, not the full width. A hollow 6-point chevron leaves a hole on its left half and the text vanishes into it.

Then render every page to PNG and look at it — SVG geometry is not verifiable from the source.

Details: [references/smart-drawing.md](references/smart-drawing.md). Runnable deck: [examples/smart-drawing-deck.marp.md](examples/smart-drawing-deck.marp.md).

## Workflow

1. Read the source markdown; identify cover, dividers, and content sections.
2. Prep image assets (download, compress to ≤ 100 KB, rename with a chapter prefix).
3. Generate slides, splitting so no slide exceeds 15 rendered lines.
4. Count the lines on every slide before rendering.
5. Render with `marp deck.marp.md --pdf --allow-local-files` and inspect the first 5 pages plus a sample from the middle and end.
6. Iterate on overflow and awkward layout.

## Files

| Path | Contents |
|---|---|
| `SKILL.md` | Entry point — hard rules, 15-line cap, speaker notes, CSS bootstrap, workflow, troubleshooting |
| `references/slide-density.md` | Full line-counting rules, splitting heuristics, tables, code blocks, lists |
| `references/image-syntax.md` | `![bg ...]` syntax, orientation rules, path escaping, anti-patterns |
| `references/smart-drawing.md` | Consulting relationship diagrams as inline SVG — `--html`, canvas conventions, ready-to-copy templates, connector semantics, QA checklist |
| `references/layout-patterns.md` | Cover, divider, content, and multi-image slide skeletons |
| `references/style-bootstrap.md` | The UPerform / openclaw CSS palette, ready to paste into frontmatter |
| `references/asset-prep.md` | Downloading, compressing, and naming image assets |
| `examples/smart-drawing-deck.marp.md` | Verified 8-page deck: staircase, arrow chain, 2×2 matrix, value tree |
| `agents/openai.yaml` | OpenAI-compatible agent metadata |

## Common failures

| Symptom | Cause |
|---|---|
| Image renders as markdown text | Path has unescaped spaces — wrap in `<...>` |
| Two images stack oddly | Missing `vertical` for portrait images |
| Content cut off at the bottom | Slide has > 15 rendered lines |
| Table truncated on the right | More than 4 columns |
| Speaker note visible in the PDF | Not inside an HTML comment |
| One slide became two | A `---` inside an HTML comment |
| Whole slide shows SVG source | Missing `--html` at render time |
| SVG renders in Obsidian but exports to PDF as source | Obsidian's built-in exporter flattens inline HTML — use Marp CLI `--html --pdf`, or the Enhanced PDF Export plugin |
| SVG diagram vanished | A blank line inside the SVG block |
| Table renders at half width | Dropped the `display: table !important` rule — marp's default theme sets `table { display: block }` |
