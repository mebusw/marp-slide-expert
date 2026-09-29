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

Every image must be a `![bg ...]` background — Marp has no inline image sizing. Paths containing spaces or non-ASCII characters must be wrapped in `<...>`, or Marp truncates the URL at the first space and renders the path as text.

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
| `references/layout-patterns.md` | Cover, divider, content, and multi-image slide skeletons |
| `references/style-bootstrap.md` | The UPerform / openclaw CSS palette, ready to paste into frontmatter |
| `references/asset-prep.md` | Downloading, compressing, and naming image assets |
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
