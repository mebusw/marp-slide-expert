# Marp Slide Expert

> [中文文档](README.zh-CN.md) · 56-page showcase: [examples/infographic-gallery.marp.md](examples/infographic-gallery.marp.md)

Build marp slide decks that render cleanly through `marp --pdf --allow-local-files`. Two things in one skill:

1. **Page-level layout** — cover / divider / single-column / multi-column / image splits
2. **Inline SVG infographics** — 16 skeletons, 6 narrative shells, 7 palettes, all wired into a four-layer module

The pitfalls that silently break marp rendering are captured once in the skill so you don't have to learn them from a bad PDF.

## Why

- **Marpslides look professional out of the box** — but the default theme is broken in obvious ways (tables half-width, no language fonts, content cut off the bottom). The skill ships a working palette and CSS that fixes all of it.
- **Inline SVG diagrams travel with the file** — a PNG has to be redrawn to change one number; an inline SVG changes with one hex edit. The skill ships 16 templates with coordinate formulas so you're not guessing.
- **One-shot reviews are inadequate** — the skill ships an SVG linter (6 deterministic checks) and tells you the exact render command. Two automated gates before ship.

## Install

```bash
# 1. Install marp CLI (for PDF export)
npm install -g @marp-team/marp-cli
# If npm -g fails, fall back to:
npx -y @marp-team/marp-cli --version
```

This skill is consumed by Agent Skills. Place it under `~/.claude/skills/marp-slide-expert/`, then any Claude session that needs marp authoring picks it up automatically.

## Quick start

```markdown
---
marp: true
theme: default
paginate: true
style: |-
  /* paste from references/style-bootstrap.md */
---

<!-- _class: cover -->

# My deck title

## Subtitle goes here

---

## First slide

- point 1
- point 2
- point 3
```

Render to PDF:

```bash
marp deck.marp.md --pdf --allow-local-files
```

For decks with inline SVG diagrams:

```bash
marp deck.marp.md --html --pdf --allow-local-files
```

## Two principles

**15 lines per slide, comments free.** A slide is full when it hits ~15 lines of visible content. HTML comments never render, so they don't count — they're how you stash speaker notes without adding slides.

**Page layout vs diagram layout.** Different problem, different tool:

- One page is content-heavy? → column / split layout (`<div class="cols cols-2">`)
- One page needs to express structural relationships? → inline SVG diagram

Use both on the same deck; they don't compete.

## What's inside

| | |
|---|---|
| `references/infographics-svg/` | 16 skeleton templates (staircase, arrow chain, 2×2, value tree, sankey, funnel, swimlanes, bento, icon-rail, card-row, wave-timeline, …) + 6 narrative shells (pyramid, flywheel, iceberg, funnel, onion, focus) + 7 palettes |
| `references/layout-patterns.md` | Page-level layout recipes (cover, divider, content, columns, splits, image overlays) |
| `references/style-bootstrap.md` | The UPerform / openclaw palette — paste it into frontmatter and you're done |
| `examples/infographic-gallery.marp.md` | A 56-page deck showing every template in use — start from here |
| `scripts/svg-lint.mjs` | 6 deterministic SVG checks (blank lines, `---`, duplicate ids, out-of-viewBox). Run before every render |
| `scripts/build-gallery.mjs` | Regenerates the example deck from the references. Run when you add a template, never hand-edit the example |

## Workflow

1. Copy the `style:` block from `references/style-bootstrap.md` into your frontmatter.
2. Write slides. Stay under 15 lines per slide. Use columns / splits when one slide is content-heavy. Use inline SVG when one slide needs to show structure.
3. Run `node scripts/svg-lint.mjs deck.marp.md` if you used any SVG.
4. Render with `marp deck.marp.md --pdf --allow-local-files` (add `--html` if you used inline SVG).
5. Open the PDF and look at every page. Don't trust your SVG source — render and read.
6. Iterate.

## License & maintenance

Part of the [mebusw/skills](https://github.com/mebusw/skills) collection. Report issues at the parent repo.
