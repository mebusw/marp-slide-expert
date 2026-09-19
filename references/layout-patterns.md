# Slide Layout Patterns

Reference: [marpit.marp.app/directives-and-comment](https://marpit.marp.app/directives-and-comment) and [slide-layouts](https://marpit.marp.app/slide-layouts).

## Slide separators

Marp uses `---` on its own line as the slide separator. Frontmatter sits at the top, before the first `---`.

```markdown
---
marp: true
theme: default
---

# First slide

---

# Second slide
```

## Special classes

Apply a class to a single slide using an HTML comment directive **before** the slide content:

```markdown
<!-- _class: cover -->

# Title slide
```

Common classes (defined in CSS):

| Class | Purpose |
|---|---|
| `cover` | Title slide, often full-screen gradient |
| `divider` | Section break, often dark and centered |
| `lead` | First content slide after cover, can have larger text |

For class definitions to work, your frontmatter `style:` block must define them.

## Cover slide

Standard pattern:

```markdown
<!-- _class: cover -->

# Main Title

## Subtitle

> Optional description or quote

**Speaker:** Name
**Date:** YYYY
```

CSS template:

```css
section.cover {
  background: linear-gradient(135deg, #1a1a2e 0%, #c0392b 100%);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
section.cover h1 { color: white; border-bottom: 3px solid rgba(255,255,255,0.4); }
section.cover h2 { color: rgba(255,255,255,0.85); }
```

## Divider slide

```markdown
<!-- _class: divider -->

# Chapter X

## Section name
```

CSS template:

```css
section.divider {
  background: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
section.divider h1 { color: #e74c3c; border-bottom: 3px solid #e74c3c; font-size: 2.4em; }
```

## Content slide

Default. Just markdown content; CSS applies the body font, table, and code styling.

```markdown
## Topic title

Body paragraph...

- Bullet 1
- Bullet 2

| Col A | Col B |
|---|---|
| A1   | B1   |
```

## Multi-image content slide

For a row of related images (screenshots, diagrams):

```markdown
## Topic

Brief intro sentence.

![bg](<shot1.png>)
![bg](<shot2.png>)
```

If images are tall/portrait:

```markdown
## Topic

![bg vertical](<shot1.png>)
![bg vertical](<shot2.png>)
```

## Text + supporting images

When text needs prominence and images are illustrative:

```markdown
## Topic

Lead paragraph explaining the concept.

Detailed point 1.
Detailed point 2.
Detailed point 3.

![bg right w:60%](<illustration.png>)
```

Wait — `bg right w:60%` is NOT valid marp syntax (the `w:` shortcut doesn't combine with `bg right`). Use the split pattern instead:

```markdown
## Topic

Lead paragraph explaining the concept.

Detailed point 1.
Detailed point 2.
Detailed point 3.

![bg right vertical](<illustration1.png>)
![bg](<illustration2.png>)
```

The first image takes the right column (stacks vertically with other right images); the second image fills the left area as a background; content overlays on the left.

## End-of-deck slide

Common patterns:

```markdown
---

## Q&A

Thanks!
```

Or a divider-style closing:

```markdown
<!-- _class: divider -->

# Thanks

Questions?
```

## Header / footer (paginate)

Add page numbers via frontmatter:

```yaml
paginate: true
```

Style the page number with:

```css
footer {
  position: absolute;
  left: 900px;
  bottom: 25px;
}
```

Or hide it on cover/divider:

```yaml
_paginate: skip
```

(place this as a directive on the slide where you want to skip)
