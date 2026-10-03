# Bootlegance

Elegant Bootstrap themes that redefine your project's aesthetic.

Bootlegance is a collection of carefully crafted Bootstrap 5 themes designed to elevate the look and feel of your projects. From bold brutalist designs to refined minimalism, each theme is built to make your applications stand out.

## Preview / Demo

[**View Theme Gallery**](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/docs/index.html)

## Features

- **Native Dark Mode Support** — Built on Bootstrap 5.3+ with automatic light/dark mode switching via `data-bs-theme`
- **Production-Ready** — Thoroughly tested and optimized for real-world use
- **Easy Integration** — Simply swap in a CSS file; no configuration needed
- **Modern Design** — Contemporary aesthetics grounded in design principles
- **Responsive** — Fully responsive across all device sizes
- **Accessible** — WCAG compliant with semantic HTML

## Getting Started

### Installation

1. Download a theme CSS file from the [Bootlegance releases](https://github.com/yourusername/bootlegance/releases)
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
| **Adwaita** | Neutral GNOME/libadwaita foundation, adaptive | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/adwaita/index.html) | Enterprise/desktop apps, accessibility-first, Linux |
| **Ant Design** | Enterprise-grade UI design language | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/ant-design/index.html) | Enterprise dashboards, complex data-heavy applications |
| **Ayu** | A simple, bright, and elegant theme designed for all day coding comfort. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/ayu/index.html) | Developers, code-heavy UIs, editors |
| **Brutalski** | Bold, raw, geometric brutalism | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/brutalski/index.html) | Developers, tech-forward projects, design portfolios |
| **Carbon** | Clinical, precise, enterprise-ready | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/carbon/index.html) | Enterprise apps, dashboards, developer tools |
| **Catppuccin** | Official Catppuccin palette, 4 flavours | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/catppuccin/index.html) | Developer tools, terminals, editors, cozy apps |
| **Catppuccin Frappé** | The softer mid-dark Catppuccin flavour, with light accents re-mixed for a bright surface. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/catppuccin-frappe/index.html) | Sibling of **Catppuccin** |
| **Catppuccin Macchiato** | The mid-dark Catppuccin flavour, with light accents re-mixed for a bright surface. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/catppuccin-macchiato/index.html) | Sibling of **Catppuccin** |
| **Civic** | Inspired by the U.S. Web Design System (USWDS) | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/civic/index.html) | Government, digital services, accessibility-first |
| **Classic Mac OS** | System 7 / Mac OS 8 Platinum desktop interface | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/mac-classic/index.html) | Retro projects, nostalgic UIs |
| **Cyberpunk / Synthwave '84** | Neon option for gaming and entertainment with glowing cyan/magenta accents. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/cyberpunk/index.html) | Gaming, entertainment, synthwave UIs |
| **Dracula** | Vibrant neon palette with an optional glow layer | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/dracula/index.html) | Editor-adjacent apps, terminals, striking dashboards |
| **Dracula Soft** | The same eleven colours, softened | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/dracula-soft/index.html) | Long sessions, calmer workspaces, shared screens |
| **Dracula Soft** | The same eleven Dracula colours with the neon pulled back — muted surfaces and softer accents. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/dracula-soft/index.html) | Sibling of **Dracula** |
| **Editorial / Paper** | Serif typography and warm off-white parchment paper for blogs and docs. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/editorial/index.html) | Blogs, documentation, publishing |
| **Everforest** | A green, comfortable, low-contrast palette designed to be easy on the eyes. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/everforest/index.html) | Developers, code-heavy UIs, editors |
| **Fluent** | Windows 11 Fluent Design theme | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/fluent/index.html) | Modern desktop apps, Windows-centric UIs, web applications |
| **Forest** | Natural, earthy, organic | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/forest/index.html) | Eco-conscious brands, wellness, sustainability |
| **GitHub Primer** | GitHub's official Primer design system palette for developer tools and apps. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/github-primer/index.html) | Developers, code-heavy UIs, editors |
| **Glassmorphism** | Frosted glass panels, backdrop blurs, and ambient background gradients. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/glassmorphism/index.html) | Portfolios, dashboards, modern apps |
| **Gruvbox** | Retro-groove earthy palette, dark & light | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/gruvbox/index.html) | Developer tools, terminals, code-heavy UIs |
| **Kanagawa** | An elegant palette inspired by Japanese paintings and dark wood aesthetics. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/kanagawa/index.html) | Developers, code-heavy UIs, editors |
| **KDE Breeze** | KDE Plasma desktop inspired theme | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/kde-breeze/index.html) | Linux desktop apps, open source projects |
| **Material Design 3** | Material You design system | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/material-3/index.html) | Mobile-first web apps, modern Google-style UIs |
| **Midnight** | Dark, sophisticated, professional | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/midnight/index.html) | Corporate apps, SaaS, modern tech |
| **Neo-brutalism (soft)** | Thick borders and offset shadows in bright colors with soft rounded corners. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/neo-brutalism/index.html) | Portfolios, modern products, marketing |
| **Night Owl** | A theme for nocturnal programmers who like working late into the night. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/night-owl/index.html) | Developers, code-heavy UIs, editors |
| **Nord** | Arctic-based, 4 official styles | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/nord/index.html) | Professional tools, dashboards, long-session work |
| **Nord Aurora** | Nord's alternative colour scheme, deep aurora blue with the frost accent family. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/nord-aurora/index.html) | Sibling of **Nord** |
| **Nord Frost** | A lifted Polar Night with brighter frost accents — still one accent, two modes. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/nord-frost/index.html) | Sibling of **Nord** |
| **Ocean** | Cool, calm, trustworthy | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/ocean/index.html) | Finance, corporate, professional services |
| **One Dark** | Iconic Atom One Dark theme adapted for modern Bootstrap 5 interfaces. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/one-dark/index.html) | Developers, code-heavy UIs, editors |
| **Orchis** | Material Design × macOS, floating panels, 10 presets | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/orchis/index.html) | Designer-grade desktop apps, branded products, Linux |
| **Orchis Cyan** | The cyan Orchis accent — clean and contemporary. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/orchis-cyan/index.html) | Sibling of **Orchis** |
| **Orchis Green** | The green Orchis accent on floating, softly elevated panels. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/orchis-green/index.html) | Sibling of **Orchis** |
| **Orchis Orange** | The orange Orchis accent, energetic and Material-forward. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/orchis-orange/index.html) | Sibling of **Orchis** |
| **Orchis Pink** | The pink Orchis accent with a bright designer feel. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/orchis-pink/index.html) | Sibling of **Orchis** |
| **Orchis Purple** | The purple Orchis accent on floating, softly elevated panels. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/orchis-purple/index.html) | Sibling of **Orchis** |
| **Orchis Red** | The red Orchis accent, bold and high contrast. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/orchis-red/index.html) | Sibling of **Orchis** |
| **Orchis Sage** | The sage Orchis accent — muted, editorial and calm. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/orchis-sage/index.html) | Sibling of **Orchis** |
| **Orchis Slate** | The slate Orchis accent for understated professional interfaces. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/orchis-slate/index.html) | Sibling of **Orchis** |
| **Orchis Yellow** | The yellow Orchis accent with highlighter energy. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/orchis-yellow/index.html) | Sibling of **Orchis** |
| **Pantheon** | elementary OS desktop theme | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/pantheon/index.html) | Clean minimalist products, Linux apps |
| **Rosé Pine** | All natural pine, faux fur and a bit of soho vibes for the classy aesthetic. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/rose-pine/index.html) | Developers, code-heavy UIs, editors |
| **Seneca** | Enterprise UI inspired by ExtJS Classic | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/seneca/index.html) | Enterprise apps, internal dashboards, complex data UIs |
| **Sepia / Reading mode** | Kindle-style warm paper theme designed for long-form content. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/sepia/index.html) | Reading apps, blogs, articles |
| **Slate** | Minimal, neutral, clean | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/slate/index.html) | Content-heavy sites, reading, simplicity |
| **Solarized** | Precision color palette designed for maximum readability and visual comfort. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/solarized/index.html) | Developers, code-heavy UIs, editors |
| **Sunrise** | Warm, energetic, light | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/sunrise/index.html) | Creative portfolios, startups, inviting projects |
| **Swiss / International Style** | Strict grid, neutral palette, signal red accent and Helvetica-like type. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/swiss/index.html) | Design portfolios, typography-focused sites |
| **Terminal / CRT** | Green or amber phosphor CRT retro terminal theme with monospaced typography. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/terminal/index.html) | Dev tools, terminal apps, portfolios |
| **Tokyo Night** | A clean, dark/light theme inspired by the Tokyo Night editor theme with vibrant blues and purples. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/tokyo-night/index.html) | Developers, code-heavy UIs, editors |
| **Vanguard** | Faithfully recreated Bootstrap 3 aesthetic | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/vanguard/index.html) | Legacy projects, nostalgia, familiarity |
| **Vimix** | macOS-inspired GNOME theme with 9 colour variants | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/vimix/index.html) | Ubuntu/ GNOME apps, desktops, multi-brand products |
| **Vimix Dark** | The graphite Vimix accent — restrained, neutral and work-focused. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/vimix-dark/index.html) | Sibling of **Vimix** |
| **Vimix Green** | The green Vimix accent for a fresh, energetic interface. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/vimix-green/index.html) | Sibling of **Vimix** |
| **Vimix Orange** | The orange Vimix accent, closest to Ubuntu warmth. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/vimix-orange/index.html) | Sibling of **Vimix** |
| **Vimix Pink** | The pink Vimix accent with a friendly, modern feel. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/vimix-pink/index.html) | Sibling of **Vimix** |
| **Vimix Purple** | The purple Vimix accent for richer, more creative products. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/vimix-purple/index.html) | Sibling of **Vimix** |
| **Vimix Red** | The red Vimix accent with high visual urgency. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/vimix-red/index.html) | Sibling of **Vimix** |
| **Vimix Teal** | The teal Vimix accent — calm and technical. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/vimix-teal/index.html) | Sibling of **Vimix** |
| **Vimix Yellow** | The yellow Vimix accent, bright and high-visibility. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/vimix-yellow/index.html) | Sibling of **Vimix** |
| **Whitehall** | Clinical, high-accessibility UI | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/whitehall/index.html) | Public sector, high-accessibility, clinical apps |
| **WhiteSur** | macOS-inspired, frosted glass and vibrancy | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/whitesur/index.html) | Consumer apps, dashboards, polished product UIs |
| **Windows 98** | Classic Windows 98 3D bevel desktop theme | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/win98/index.html) | Retro apps, nostalgia, 90s web style |
| **Yaru** | Ubuntu Yaru inspired theme. Warm, approachable, and human-centric. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/yaru/index.html) | Open-source projects, personal blogs, friendly interfaces |

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
