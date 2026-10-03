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

| Theme                 | Slug                  | Status    |
|-----------------------|-----------------------|-----------|
| Adwaita               | `adwaita`               | Available |
| Ant Design            | `ant-design`            | Available |
| Ayu                   | `ayu`                   | Available |
| Brutalski             | `brutalski`             | Available |
| Carbon                | `carbon`                | Available |
| Catppuccin            | `catppuccin`            | Available |
| Catppuccin Frappé     | `catppuccin-frappe`     | Available |
| Catppuccin Macchiato  | `catppuccin-macchiato`  | Available |
| Civic                 | `civic`                 | Available |
| Dracula               | `dracula`               | Available |
| Dracula Soft          | `dracula-soft`          | Available |
| Everforest            | `everforest`            | Available |
| Fluent                | `fluent`                | Available |
| Forest                | `forest`                | Available |
| GitHub Primer         | `github-primer`         | Available |
| Gruvbox               | `gruvbox`               | Available |
| Kanagawa              | `kanagawa`              | Available |
| KDE Breeze            | `kde-breeze`            | Available |
| Classic Mac OS        | `mac-classic`           | Available |
| Material Design 3     | `material-3`            | Available |
| Midnight              | `midnight`              | Available |
| Night Owl             | `night-owl`             | Available |
| Nord                  | `nord`                  | Available |
| Nord Aurora           | `nord-aurora`           | Available |
| Nord Frost            | `nord-frost`            | Available |
| Ocean                 | `ocean`                 | Available |
| One Dark              | `one-dark`              | Available |
| Orchis                | `orchis`                | Available |
| Orchis Cyan           | `orchis-cyan`           | Available |
| Orchis Green          | `orchis-green`          | Available |
| Orchis Orange         | `orchis-orange`         | Available |
| Orchis Pink           | `orchis-pink`           | Available |
| Orchis Purple         | `orchis-purple`         | Available |
| Orchis Red            | `orchis-red`            | Available |
| Orchis Sage           | `orchis-sage`           | Available |
| Orchis Slate          | `orchis-slate`          | Available |
| Orchis Yellow         | `orchis-yellow`         | Available |
| Pantheon              | `pantheon`              | Available |
| Rosé Pine             | `rose-pine`             | Available |
| Seneca                | `seneca`                | Available |
| Slate                 | `slate`                 | Available |
| Solarized             | `solarized`             | Available |
| Sunrise               | `sunrise`               | Available |
| Tokyo Night           | `tokyo-night`           | Available |
| Vanguard              | `vanguard`              | Available |
| Vimix                 | `vimix`                 | Available |
| Vimix Dark            | `vimix-dark`            | Available |
| Vimix Green           | `vimix-green`           | Available |
| Vimix Orange          | `vimix-orange`          | Available |
| Vimix Pink            | `vimix-pink`            | Available |
| Vimix Purple          | `vimix-purple`          | Available |
| Vimix Red             | `vimix-red`             | Available |
| Vimix Teal            | `vimix-teal`            | Available |
| Vimix Yellow          | `vimix-yellow`          | Available |
| Whitehall             | `whitehall`             | Available |
| WhiteSur              | `whitesur`              | Available |
| Windows 98            | `win98`                 | Available |
| Yaru                  | `yaru`                  | Available |


---

## Theme File: `theme.css`

- Must only use CSS custom properties (`--bs-*`) and component-level overrides
- Must NOT import or bundle Bootstrap itself — it is loaded externally
- Must support Bootstrap 5.3+ light/dark mode via `data-bs-theme`
- Filename is always `theme.css` (lowercase)

### Modes: exactly two, no more

A theme ships **exactly two modes**: `data-bs-theme="light"` and `data-bs-theme="dark"`.

- Do **not** add further colour styles as extra modes inside a theme
  (no `data-variant`, `data-style` or `data-flavour` palette switching)
- A visually distinct look — a different palette, accent family or contrast level —
  is a **separate theme** in its own directory, which itself has dark and light modes
  (e.g. `dracula` and `dracula-soft`, `nord` and `nord-aurora`)
- Opt-in *presentation* toggles that do not change the palette identity are still
  allowed: `data-bold` background, `data-density`, `data-neon` glow,
  `data-contrast="high"` accessibility mode, `data-panels="float"`
- Sibling themes should be near-copies: same structure and component overrides,
  differing only in their palette tokens

Naming: lowercase and hyphenated, with a variant suffix
(`dracula-soft`, `nord-aurora`).

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
- [ ] Exactly two modes — no palette variants inside the theme
- [ ] No Bootstrap source files are bundled or committed
- [ ] Theme slug directory name is lowercase and hyphenated
