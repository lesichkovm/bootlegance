# Bootlegance

Elegant Bootstrap themes that redefine your project's aesthetic.

Bootlegance is a collection of carefully crafted Bootstrap 5 themes designed to elevate the look and feel of your projects. From bold brutalist designs to refined minimalism, each theme is built to make your applications stand out.

## Live Gallery

[**View Theme Gallery**](https://lesichkovm.github.io/bootlegance/)

## Features

- **Native Dark Mode Support** — Built on Bootstrap 5.3+ with automatic light/dark mode switching via `data-bs-theme`
- **Production-Ready** — Thoroughly tested and optimized for real-world use
- **Easy Integration** — Simply swap in a CSS file; no configuration needed
- **Modern Design** — Contemporary aesthetics grounded in design principles
- **Responsive** — Fully responsive across all device sizes
- **Accessible** — WCAG compliant with semantic HTML

## Getting Started

### Installation

1. Download a theme CSS file from the [Bootlegance releases](https://github.com/lesichkovm/bootlegance/releases)
2. Add it to your project after Bootstrap's default CSS:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<!-- Load latest theme CSS from CDN -->
<link href="https://cdn.jsdelivr.net/gh/lesichkovm/bootlegance@latest/themes/{theme-name}/theme.css" rel="stylesheet">

<!-- Load specific version of theme CSS from CDN -->
<link href="https://cdn.jsdelivr.net/gh/lesichkovm/bootlegance@{release-tag}/themes/{theme-name}/theme.css" rel="stylesheet">
```

3. That's it! Your Bootstrap components now have the Bootlegance theme applied.

### Dark Mode

Toggle dark mode by adding `data-bs-theme="dark"` to your `<html>` element:

```html
<html data-bs-theme="dark">
  <!-- Your content -->
</html>
```

Or dynamically switch with JavaScript:

```javascript
document.documentElement.setAttribute('data-bs-theme', 'dark');
```

## Available Themes

> Every theme ships exactly **two modes** — light and dark. A different palette is a
> separate theme (e.g. Dracula and Dracula Soft), not an extra mode.

| Theme | Description | Preview | Best For |
|---|---|---|---|
| **Adwaita** | Neutral GNOME/libadwaita foundation, adaptive | [Preview](https://lesichkovm.github.io/bootlegance/themes/adwaita/) | Enterprise/desktop apps, accessibility-first, Linux |
| **Ant Design** | Enterprise-grade UI design language | [Preview](https://lesichkovm.github.io/bootlegance/themes/ant-design/) | Enterprise dashboards, complex data-heavy applications |
| **Ayu** | A simple, bright, and elegant theme designed for all day coding comfort. | [Preview](https://lesichkovm.github.io/bootlegance/themes/ayu/) | Developers, code-heavy UIs, editors |
| **Brutalski** | Bold, raw, geometric brutalism | [Preview](https://lesichkovm.github.io/bootlegance/themes/brutalski/) | Developers, tech-forward projects, design portfolios |
| **Carbon** | Clinical, precise, enterprise-ready | [Preview](https://lesichkovm.github.io/bootlegance/themes/carbon/) | Enterprise apps, dashboards, developer tools |
| **Catppuccin** | Official Catppuccin palette, 4 flavours | [Preview](https://lesichkovm.github.io/bootlegance/themes/catppuccin/) | Developer tools, terminals, editors, cozy apps |
| **Catppuccin Frappé** | The softer mid-dark Catppuccin flavour, with light accents re-mixed for a bright surface. | [Preview](https://lesichkovm.github.io/bootlegance/themes/catppuccin-frappe/) | Sibling of **Catppuccin** |
| **Catppuccin Macchiato** | The mid-dark Catppuccin flavour, with light accents re-mixed for a bright surface. | [Preview](https://lesichkovm.github.io/bootlegance/themes/catppuccin-macchiato/) | Sibling of **Catppuccin** |
| **Civic** | Inspired by the U.S. Web Design System (USWDS) | [Preview](https://lesichkovm.github.io/bootlegance/themes/civic/) | Government, digital services, accessibility-first |
| **Classic Mac OS** | System 7 / Mac OS 8 Platinum desktop interface | [Preview](https://lesichkovm.github.io/bootlegance/themes/mac-classic/) | Retro projects, nostalgic UIs |
| **Cyberpunk / Synthwave '84** | Neon option for gaming and entertainment with glowing cyan/magenta accents. | [Preview](https://lesichkovm.github.io/bootlegance/themes/cyberpunk/) | Gaming, entertainment, synthwave UIs |
| **Dracula** | Vibrant neon palette with an optional glow layer | [Preview](https://lesichkovm.github.io/bootlegance/themes/dracula/) | Editor-adjacent apps, terminals, striking dashboards |
| **Dracula Soft** | The same eleven colours, softened | [Preview](https://lesichkovm.github.io/bootlegance/themes/dracula-soft/) | Long sessions, calmer workspaces, shared screens |
| **Editorial / Paper** | Serif typography and warm off-white parchment paper for blogs and docs. | [Preview](https://lesichkovm.github.io/bootlegance/themes/editorial/) | Blogs, documentation, publishing |
| **Everforest** | A green, comfortable, low-contrast palette designed to be easy on the eyes. | [Preview](https://lesichkovm.github.io/bootlegance/themes/everforest/) | Developers, code-heavy UIs, editors |
| **Fluent** | Windows 11 Fluent Design theme | [Preview](https://lesichkovm.github.io/bootlegance/themes/fluent/) | Modern desktop apps, Windows-centric UIs, web applications |
| **Forest** | Natural, earthy, organic | [Preview](https://lesichkovm.github.io/bootlegance/themes/forest/) | Eco-conscious brands, wellness, sustainability |
| **GitHub Primer** | GitHub's official Primer design system palette for developer tools and apps. | [Preview](https://lesichkovm.github.io/bootlegance/themes/github-primer/) | Developers, code-heavy UIs, editors |
| **Glassmorphism** | Frosted glass panels, backdrop blurs, and ambient background gradients. | [Preview](https://lesichkovm.github.io/bootlegance/themes/glassmorphism/) | Portfolios, dashboards, modern apps |
| **Gruvbox** | Retro-groove earthy palette, dark & light | [Preview](https://lesichkovm.github.io/bootlegance/themes/gruvbox/) | Developer tools, terminals, code-heavy UIs |
| **High Contrast** | WCAG AAA contrast compliance with high visibility focus indicators and bold component borders | [Preview](https://lesichkovm.github.io/bootlegance/themes/high-contrast/) | Accessibility-first UIs, public sector, low vision |
| **Kanagawa** | An elegant palette inspired by Japanese paintings and dark wood aesthetics. | [Preview](https://lesichkovm.github.io/bootlegance/themes/kanagawa/) | Developers, code-heavy UIs, editors |
| **KDE Breeze** | KDE Plasma desktop inspired theme | [Preview](https://lesichkovm.github.io/bootlegance/themes/kde-breeze/) | Linux desktop apps, open source projects |
| **Material Design 3** | Material You design system | [Preview](https://lesichkovm.github.io/bootlegance/themes/material-3/) | Mobile-first web apps, modern Google-style UIs |
| **Midnight** | Dark, sophisticated, professional | [Preview](https://lesichkovm.github.io/bootlegance/themes/midnight/) | Corporate apps, SaaS, modern tech |
| **Neo-brutalism (soft)** | Thick borders and offset shadows in bright colors with soft rounded corners. | [Preview](https://lesichkovm.github.io/bootlegance/themes/neo-brutalism/) | Portfolios, modern products, marketing |
| **Night Owl** | A theme for nocturnal programmers who like working late into the night. | [Preview](https://lesichkovm.github.io/bootlegance/themes/night-owl/) | Developers, code-heavy UIs, editors |
| **Nord** | Arctic-based, 4 official styles | [Preview](https://lesichkovm.github.io/bootlegance/themes/nord/) | Professional tools, dashboards, long-session work |
| **Nord Aurora** | Nord's alternative colour scheme, deep aurora blue with the frost accent family. | [Preview](https://lesichkovm.github.io/bootlegance/themes/nord-aurora/) | Sibling of **Nord** |
| **Nord Frost** | A lifted Polar Night with brighter frost accents — still one accent, two modes. | [Preview](https://lesichkovm.github.io/bootlegance/themes/nord-frost/) | Sibling of **Nord** |
| **Ocean** | Cool, calm, trustworthy | [Preview](https://lesichkovm.github.io/bootlegance/themes/ocean/) | Finance, corporate, professional services |
| **One Dark** | Iconic Atom One Dark theme adapted for modern Bootstrap 5 interfaces. | [Preview](https://lesichkovm.github.io/bootlegance/themes/one-dark/) | Developers, code-heavy UIs, editors |
| **Orchis** | Material Design × macOS, floating panels, 10 presets | [Preview](https://lesichkovm.github.io/bootlegance/themes/orchis/) | Designer-grade desktop apps, branded products, Linux |
| **Orchis Cyan** | The cyan Orchis accent — clean and contemporary. | [Preview](https://lesichkovm.github.io/bootlegance/themes/orchis-cyan/) | Sibling of **Orchis** |
| **Orchis Green** | The green Orchis accent on floating, softly elevated panels. | [Preview](https://lesichkovm.github.io/bootlegance/themes/orchis-green/) | Sibling of **Orchis** |
| **Orchis Orange** | The orange Orchis accent, energetic and Material-forward. | [Preview](https://lesichkovm.github.io/bootlegance/themes/orchis-orange/) | Sibling of **Orchis** |
| **Orchis Pink** | The pink Orchis accent with a bright designer feel. | [Preview](https://lesichkovm.github.io/bootlegance/themes/orchis-pink/) | Sibling of **Orchis** |
| **Orchis Purple** | The purple Orchis accent on floating, softly elevated panels. | [Preview](https://lesichkovm.github.io/bootlegance/themes/orchis-purple/) | Sibling of **Orchis** |
| **Orchis Red** | The red Orchis accent, bold and high contrast. | [Preview](https://lesichkovm.github.io/bootlegance/themes/orchis-red/) | Sibling of **Orchis** |
| **Orchis Sage** | The sage Orchis accent — muted, editorial and calm. | [Preview](https://lesichkovm.github.io/bootlegance/themes/orchis-sage/) | Sibling of **Orchis** |
| **Orchis Slate** | The slate Orchis accent for understated professional interfaces. | [Preview](https://lesichkovm.github.io/bootlegance/themes/orchis-slate/) | Sibling of **Orchis** |
| **Orchis Yellow** | The yellow Orchis accent with highlighter energy. | [Preview](https://lesichkovm.github.io/bootlegance/themes/orchis-yellow/) | Sibling of **Orchis** |
| **Pantheon** | elementary OS desktop theme | [Preview](https://lesichkovm.github.io/bootlegance/themes/pantheon/) | Clean minimalist products, Linux apps |
| **Print-Optimized** | Tuned for printed pages, PDFs, and document presentation with paper typography and page-break rules | [Preview](https://lesichkovm.github.io/bootlegance/themes/print-optimized/) | Reports, document publishing, PDF exports, printable UIs |
| **Rosé Pine** | All natural pine, faux fur and a bit of soho vibes for the classy aesthetic. | [Preview](https://lesichkovm.github.io/bootlegance/themes/rose-pine/) | Developers, code-heavy UIs, editors |
| **Seneca** | Enterprise UI inspired by ExtJS Classic | [Preview](https://lesichkovm.github.io/bootlegance/themes/seneca/) | Enterprise apps, internal dashboards, complex data UIs |
| **Sepia / Reading mode** | Kindle-style warm paper theme designed for long-form content. | [Preview](https://lesichkovm.github.io/bootlegance/themes/sepia/) | Reading apps, blogs, articles |
| **Slate** | Minimal, neutral, clean | [Preview](https://lesichkovm.github.io/bootlegance/themes/slate/) | Content-heavy sites, reading, simplicity |
| **Solarized** | Precision color palette designed for maximum readability and visual comfort. | [Preview](https://lesichkovm.github.io/bootlegance/themes/solarized/) | Developers, code-heavy UIs, editors |
| **Sunrise** | Warm, energetic, light | [Preview](https://lesichkovm.github.io/bootlegance/themes/sunrise/) | Creative portfolios, startups, inviting projects |
| **Swiss / International Style** | Strict grid, neutral palette, signal red accent and Helvetica-like type. | [Preview](https://lesichkovm.github.io/bootlegance/themes/swiss/) | Design portfolios, typography-focused sites |
| **Terminal / CRT** | Green or amber phosphor CRT retro terminal theme with monospaced typography. | [Preview](https://lesichkovm.github.io/bootlegance/themes/terminal/) | Dev tools, terminal apps, portfolios |
| **Tokyo Night** | A clean, dark/light theme inspired by the Tokyo Night editor theme with vibrant blues and purples. | [Preview](https://lesichkovm.github.io/bootlegance/themes/tokyo-night/) | Developers, code-heavy UIs, editors |
| **Vanguard** | Faithfully recreated Bootstrap 3 aesthetic | [Preview](https://lesichkovm.github.io/bootlegance/themes/vanguard/) | Legacy projects, nostalgia, familiarity |
| **Vimix** | macOS-inspired GNOME theme with 9 colour variants | [Preview](https://lesichkovm.github.io/bootlegance/themes/vimix/) | Ubuntu/ GNOME apps, desktops, multi-brand products |
| **Vimix Dark** | The graphite Vimix accent — restrained, neutral and work-focused. | [Preview](https://lesichkovm.github.io/bootlegance/themes/vimix-dark/) | Sibling of **Vimix** |
| **Vimix Green** | The green Vimix accent for a fresh, energetic interface. | [Preview](https://lesichkovm.github.io/bootlegance/themes/vimix-green/) | Sibling of **Vimix** |
| **Vimix Orange** | The orange Vimix accent, closest to Ubuntu warmth. | [Preview](https://lesichkovm.github.io/bootlegance/themes/vimix-orange/) | Sibling of **Vimix** |
| **Vimix Pink** | The pink Vimix accent with a friendly, modern feel. | [Preview](https://lesichkovm.github.io/bootlegance/themes/vimix-pink/) | Sibling of **Vimix** |
| **Vimix Purple** | The purple Vimix accent for richer, more creative products. | [Preview](https://lesichkovm.github.io/bootlegance/themes/vimix-purple/) | Sibling of **Vimix** |
| **Vimix Red** | The red Vimix accent with high visual urgency. | [Preview](https://lesichkovm.github.io/bootlegance/themes/vimix-red/) | Sibling of **Vimix** |
| **Vimix Teal** | The teal Vimix accent — calm and technical. | [Preview](https://lesichkovm.github.io/bootlegance/themes/vimix-teal/) | Sibling of **Vimix** |
| **Vimix Yellow** | The yellow Vimix accent, bright and high-visibility. | [Preview](https://lesichkovm.github.io/bootlegance/themes/vimix-yellow/) | Sibling of **Vimix** |
| **Whitehall** | Clinical, high-accessibility UI | [Preview](https://lesichkovm.github.io/bootlegance/themes/whitehall/) | Public sector, high-accessibility, clinical apps |
| **WhiteSur** | macOS-inspired, frosted glass and vibrancy | [Preview](https://lesichkovm.github.io/bootlegance/themes/whitesur/) | Consumer apps, dashboards, polished product UIs |
| **Windows 98** | Classic Windows 98 3D bevel desktop theme | [Preview](https://lesichkovm.github.io/bootlegance/themes/win98/) | Retro apps, nostalgia, 90s web style |
| **Yaru** | Ubuntu Yaru inspired theme. Warm, approachable, and human-centric. | [Preview](https://lesichkovm.github.io/bootlegance/themes/yaru/) | Open-source projects, personal blogs, friendly interfaces |

*More themes coming soon.*

## Usage Example

```html
<!DOCTYPE html>
<html lang="en" data-bs-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootlegance Example</title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="bootlegance-brutalski.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <span class="navbar-brand">My App</span>
        </div>
    </nav>
    
    <main class="container mt-5">
        <h1>Welcome to Bootlegance</h1>
        <p>Your Bootstrap projects, elevated.</p>
        <button class="btn btn-primary">Get Started</button>
    </main>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## Customization

Each theme is built using CSS custom properties (variables), making it easy to customize colors and spacing:

```css
:root {
  --bs-primary: #your-color;
  --bs-secondary: #your-color;
  --bs-body-bg: #your-color;
}
```

## Deployment

Bootlegance is published as a GitHub Pages site using GitHub Actions (`.github/workflows/pages.yml`).
The workflow automatically builds the site artifact (`_site/`) by assembling `docs/` and `themes/` together, creating `.nojekyll`, and generating `sitemap.xml` and `robots.txt`.

### Enabling GitHub Pages in Repository Settings
1. Go to repository **Settings** -> **Pages**.
2. Under **Build and deployment** -> **Source**, select **GitHub Actions**.

### Custom Domain Setup (Optional)
To use a custom domain in the future:
1. Create a file named `docs/CNAME` containing your custom domain name (e.g. `bootlegance.com`).
2. Add a CNAME DNS record pointing your domain to `lesichkovm.github.io`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License — feel free to use in personal and commercial projects.

## Contributing

Contributions are welcome! Please submit pull requests or open issues for suggestions and bug reports.

## Credits

Bootlegance themes are built on [Bootstrap](https://getbootstrap.com/), the world's most popular front-end framework.

---

Made with elegance.🎨
