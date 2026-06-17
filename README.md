# Bootlegance

Elegant Bootstrap themes that redefine your project's aesthetic.

Bootlegance is a collection of carefully crafted Bootstrap 5 themes designed to elevate the look and feel of your projects. From bold brutalist designs to refined minimalism, each theme is built to make your applications stand out.

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
<link href="https://cdn.jsdelivr.net/gh/lesichkovm/bootlegance@v2.9.0/themes/{theme-name}/theme.css" rel="stylesheet">
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

| Theme | Description | Preview | Best For |
|---|---|---|---|
| **Brutalski** | Bold, raw, geometric brutalism | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/brutalski/index.html) | Developers, tech-forward projects, design portfolios |
| **Vanguard** | Faithfully recreated Bootstrap 3 aesthetic | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/vanguard/index.html) | Legacy projects, nostalgia, familiarity |
| **Carbon** | Clinical, precise, enterprise-ready | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/carbon/index.html) | Enterprise apps, dashboards, developer tools |
| **Civic** | Inspired by the U.S. Web Design System (USWDS) | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/civic/index.html) | Government, digital services, accessibility-first |
| **Whitehall** | Clinical, high-accessibility UI | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/whitehall/index.html) | Public sector, high-accessibility, clinical apps |
| **Yaru** | Ubuntu Yaru inspired theme. Warm, approachable, and human-centric. | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/yaru/index.html) | Open-source projects, personal blogs, friendly interfaces |
| **Seneca** | Enterprise UI inspired by ExtJS Classic | [Preview](https://html-preview.github.io/?url=https://github.com/lesichkovm/bootlegance/blob/main/themes/seneca/index.html) | Enterprise apps, internal dashboards, complex data UIs |
| **Midnight** | Dark, sophisticated, professional | | Corporate apps, SaaS, modern tech |
| **Sunrise** | Warm, energetic, light | | Creative portfolios, startups, inviting projects |
| **Ocean** | Cool, calm, trustworthy | | Finance, corporate, professional services |
| **Forest** | Natural, earthy, organic | | Eco-conscious brands, wellness, sustainability |
| **Slate** | Minimal, neutral, clean | | Content-heavy sites, reading, simplicity |

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
