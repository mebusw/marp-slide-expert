# Slide Density and Splitting

Marp slides have no auto-shrink. If content overflows the slide canvas, it just disappears off the bottom. You must split proactively.

## Per-slide budget

| Content type | Soft limit | Hard limit |
|---|---|---|
| Plain text + 1 image | ~1100 chars | ~1500 chars |
| Text only | ~1200 chars | ~1800 chars |
| Single table | 6 rows × 4 cols | 8 rows × 4 cols |
| Code block | 15 lines | 25 lines |
| Bulleted list | 8 items | 12 items |

The hard limits are not "this is the max" — they're "if you exceed this, the slide will visibly overflow." Aim for the soft limits.

## When to split

Trigger a split when ANY of these is true:

- Total slide content > 1500 chars.
- A single paragraph is > 600 chars (especially Chinese which has more characters per concept).
- A table has > 6 rows.
- A code block is > 20 lines.
- A bulleted list has > 8 items.

## How to split

**Split at paragraph boundaries, not mid-paragraph.** If two adjacent paragraphs together exceed the budget, the second one becomes the start of the next slide. If a single paragraph is too long, split by sentence-ending punctuation:

```python
# Python pseudo-code
sentences = re.split(r'(?<=[。！？\n])|(?<=\.\s)', paragraph)
chunk = ""
for sent in sentences:
    if len(chunk) + len(sent) > 1100 and chunk:
        emit(chunk.strip())
        chunk = sent
    else:
        chunk += sent
if chunk.strip():
    emit(chunk.strip())
```

**Keep the slide title on the first chunk only.** Subsequent chunks from the same source section should NOT repeat the title — otherwise you get a wall of identical H2s.

## Tables

Wide tables overflow horizontally. Strategies:

1. **Reduce columns**: drop optional columns.
2. **Split rows**: half the rows go on slide N, half on slide N+1. Add a small header note like `(续上表)` on the second slide.
3. **Shrink font**: in CSS, set `table { font-size: 0.78em; }`. Below 0.7em the text becomes hard to read.

For tables with Chinese text, the default font size will render narrower than Latin tables, so you have a bit more room.

## Code blocks

Long code needs CSS adjustment:

```css
pre {
  background: #1a1a2e;
  color: #2ecc71;
  padding: 14px;
  border-radius: 8px;
  font-size: 0.75em;     /* shrink default */
  line-height: 1.4;
}
pre code {
  background: transparent;
  color: inherit;
  padding: 0;
}
```

If code is still too long, split at logical boundaries (function def, between classes, between blocks). For SQL / shell output that's inherently long, consider moving it to an appendix slide.

## Lists

When splitting a long list, look for natural grouping:

- Topical groupings (e.g., "3 things about X" then "3 things about Y").
- Sequential steps with named phases.
- Pairs of concept + example.

If the list is too flat to split meaningfully, consider converting to a table — tables often pack more information per slide.

## Image-heavy slides

When a slide has multiple images and they collectively fill the slide, leave text minimal or off the slide entirely. A title + 2-3 images is a complete slide.

If text is essential alongside images, use the split layout (see [layout-patterns.md](layout-patterns.md)) and keep text under 600 chars.

## Detection heuristics

When scanning a generated slide, watch for these warning signs:

- Slide body ends with content cut at the bottom edge of the PDF preview.
- A bullet list has more bullets than fit in the slide height (~10 visible bullets is the practical max at default font size).
- Code block scrolls past the visible area in PDF preview.
- Table extends beyond the right edge.

Render preview after every batch of changes and visually scan the first 3-5 slides plus a sample from middle/end.
