# CSS Style Bootstrap

A reusable style block to drop into a new deck's frontmatter. Tuned for Chinese courseware with red accent palette.

## Full style block

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
    color: #cc7e50;
    font-size: 1.35em;
  }
  h3 {
    color: #e74c3c;
    font-size: 1.05em;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.78em;
    margin: 8px 0;
  }
  th {
    background: #c0392b;
    color: white;
    padding: 6px 10px;
  }
  td {
    padding: 6px 10px;
    border-bottom: 1px solid #ddd;
  }
  tr:nth-child(even) { background: #f5f5f5; }
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
    padding: 14px;
    border-radius: 8px;
    font-size: 0.75em;
    line-height: 1.4;
  }
  pre code {
    background: transparent;
    color: inherit;
    padding: 0;
  }
  blockquote {
    border-left: 4px solid #e74c3c;
    background: #fff;
    padding: 8px 16px;
    font-style: italic;
    color: #555;
  }
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
    font-size: 1.9em;
  }
  section.cover h2 {
    color: rgba(255,255,255,0.85);
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
  }
  section.divider h2 {
    color: rgba(255,255,255,0.8);
    font-size: 1.1em;
  }
---
```

## Customization points

| Want | Edit |
|---|---|
| Different accent color | `h1` color + `section.cover`/`section.divider` gradients |
| Larger body text | `section { font-size: 24px; }` (default is 22px) |
| Smaller tables | `table { font-size: 0.7em; }` |
| Code block larger | `pre { font-size: 0.85em; }` |
| Hide page number on cover/divider | Add `<!-- _paginate: skip -->` directive to those slides |

## Theme alternatives

`marp/theme: default` is fine for most cases. Alternatives:

- `theme: gaia` — softer, more modern look.
- `theme: uncover` — bold typography, good for talks.

When using `gaia` or `uncover`, some of the class-based styling (`.cover`, `.divider`) may need adjustment because those themes have their own conventions.

## Minimal style block (if you just want it to work)

If the full block is too much, this minimal version renders fine:

```yaml
style: |-
  section {
    font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
    font-size: 22px;
  }
  h1 { color: #c0392b; }
  h2 { color: #cc7e50; }
```

Everything else (tables, code, blocks) will use marp's default styling.

## Validation

After applying CSS, render one slide and check:

1. Chinese text renders correctly (no missing glyphs).
2. Cover and divider slides have their distinctive backgrounds.
3. Tables fit within slide width.
4. Code blocks don't have horizontal scroll bars.

If Chinese glyphs are missing, ensure the font-family list includes at least one CJK font installed on the rendering machine (`fc-list :lang=zh` to check).
