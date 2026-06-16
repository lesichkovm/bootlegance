# AGENTS.md — Bootlegance

## Project Overview

Bootlegance is a collection of drop-in CSS themes for Bootstrap 5.3+. Each theme is a single CSS file that overrides Bootstrap's CSS custom properties and components — no build tools, no preprocessors required.

---

## Repository Structure

```
/themes/{theme-slug}/
    theme.css       ← The theme stylesheet
    index.html      ← Interactive HTML preview page
```

### Theme Slugs

| Theme      | Slug         | Status  |
|------------|--------------|---------|
| Brutalski  | `brutalski`  | Available |
| Vanguard   | `vanguard`   | Available |
| Midnight   | `midnight`   | Planned |
| Sunrise    | `sunrise`    | Planned |
| Ocean      | `ocean`      | Planned |
| Forest     | `forest`     | Planned |
| Slate      | `slate`      | Planned |

---

## Theme File: `theme.css`

- Must only use CSS custom properties (`--bs-*`) and component-level overrides
- Must NOT import or bundle Bootstrap itself — it is loaded externally
- Must support Bootstrap 5.3+ light/dark mode via `data-bs-theme`
- Filename is always `theme.css` (lowercase)

---

## Preview Page: `index.html`

Each theme must include an `index.html` preview page demonstrating all major Bootstrap components, similar to [Bootswatch's preview pages](https://bootswatch.com/brite/).

### Required Sections (in order)

1. **Navbar** — light, dark, and primary variants
2. **Buttons** — all contextual variants, outline variants, sizes, and states; Button groups
3. **Typography** — headings, body text, display headings, emphasis classes, blockquotes
4. **Tables** — striped, hovered, bordered, and all contextual variants
5. **Forms** — controls, selects, checks/radios, switches, ranges, input groups, floating labels, validation states, color picker
6. **Navs & Tabs** — tabs, pills, underline, breadcrumbs, pagination
7. **Alerts** — all contextual variants, with dismiss buttons
8. **Badges** — contextual variants, pills, position-relative badges
9. **Progress & Spinners** — basic, contextual, striped, animated, stacked; border and grow spinners
10. **List groups** — default, active, linked, flush
11. **Cards** — all contextual and border variants, image cap, header/footer, with list groups
12. **Accordions** — default and flush variants
13. **Carousel**
14. **Modals** — default and static backdrop
15. **Offcanvas** — multiple directions (start, top)
16. **Popovers and Tooltips**
17. **Toasts** — live and static
18. **Placeholders**
19. **Misc** — Close buttons, standalone Dropdowns

### HTML Template Structure

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Bootlegance — {Theme Name}</title>
  <!-- 1. Bootstrap CSS (CDN) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <!-- 2. Theme override -->
  <link rel="stylesheet" href="theme.css">
</head>
<body>
  <!-- preview content here -->

  <!-- Bootstrap JS bundle (includes Popper) -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

The theme CSS is always loaded **after** Bootstrap so overrides apply correctly.

---

## Adding a New Theme

1. Create the directory: `themes/{theme-slug}/`
2. Add `theme.css` with your CSS custom property overrides
3. Copy the preview template and populate all required sections into `index.html`
4. Update the theme status table in this file from `Planned` to `Available`
5. Open a pull request with both files

---

## Coding Conventions

- Use CSS custom properties only — no hardcoded hex values in selectors
- Variable names must follow Bootstrap's `--bs-*` naming convention
- Dark mode overrides go inside `[data-bs-theme="dark"] { ... }`
- Keep `theme.css` focused and minimal — avoid layout or structural changes
- Preview pages use vanilla Bootstrap JS from CDN — no additional dependencies

---

## Validation Checklist (before PR)

- [ ] `theme.css` loads after Bootstrap without errors
- [ ] All 19 preview sections render correctly in `index.html`
- [ ] Light mode and dark mode (`data-bs-theme="dark"`) both look intentional
- [ ] No Bootstrap source files are bundled or committed
- [ ] Theme slug directory name is lowercase and hyphenated
