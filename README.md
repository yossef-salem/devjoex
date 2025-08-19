# DevJoex Portfolio 🚀

A modern, animated, and fully responsive personal portfolio website built with vanilla HTML, CSS, and JavaScript. Features a DevOps-themed design with smooth animations and excellent mobile experience.

## ✨ Features

- **🎨 Modern Design**: Clean, professional layout with DevOps-themed accents
- **📱 Fully Responsive**: Mobile-first approach that works flawlessly on all devices
- **🎭 Smooth Animations**: CSS-based animations with reduced motion support
- **🌙 Theme Toggle**: Dark/light theme with smooth transitions
- **⚡ Performance Optimized**: Lazy loading, optimized assets, and smooth 60fps animations
- **♿ Accessibility**: Semantic HTML, ARIA labels, keyboard navigation, and screen reader support
- **🔍 SEO Optimized**: Meta tags, Open Graph, and structured data
- **📱 PWA Ready**: Web app manifest and service worker ready

## 🎯 Sections

- **Hero**: Animated introduction with floating DevOps icons and particle effects
- **About**: Interactive tabs for skills, experience, and education
- **Projects**: Responsive grid showcasing DevOps and infrastructure projects
- **Contact**: Animated form with micro-interactions and validation

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/devjoex-portfolio.git
   cd devjoex-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Build & Deploy

### Development

```bash
npm run dev          # Start development server
npm run preview      # Preview production build
```

### Production Build

```bash
npm run build        # Build for production
```

The build output will be in the `dist/` folder, ready for deployment.

### Deploy to GitHub Pages

1. **Update repository name** in `vite.config.js`:
   ```js
   base: '/your-actual-repo-name/',
   ```

2. **Deploy automatically**:
   ```bash
   npm run deploy
   ```

3. **Manual deployment**:
   - Run `npm run build`
   - Push the `dist/` folder to the `gh-pages` branch
   - Enable GitHub Pages in your repository settings

### Deploy to Other Platforms

The `dist/` folder contains a static build that can be deployed to:
- Netlify
- Vercel
- AWS S3
- Any static hosting service

## 🎨 Customization

### Colors & Theme

Edit CSS custom properties in `styles/main.css`:

```css
:root {
  --accent-primary: #7C3AED;    /* Dev Purple */
  --accent-secondary: #8B5CF6;  /* Secondary Purple */
  --bg-primary: #0a0a0a;        /* Dark Background */
  --text-primary: #ffffff;      /* White Text */
}
```

### Animations

Control animation behavior in `scripts/main.js`:

```js
// Disable animations for performance
const prefersReducedMotion = true;

// Customize animation delays
const animationDelay = 0.1; // seconds
```

### Content

Update content in `index.html`:
- Personal information
- Project details
- Skills and experience
- Contact information

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: 768px - 960px
- **Large Desktop**: > 960px

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios
- Focus indicators
- Reduced motion support

## 🎭 Animation System

### CSS Animations
- Entrance animations (fade-in, slide-in)
- Hover effects (scale, shadow, transform)
- Background animations (particles, floating elements)
- Micro-interactions (button states, form focus)

### JavaScript Animations
- Scroll-triggered reveals
- Parallax effects
- Magnetic hover effects
- Loading screen animations

### Performance
- CSS transforms and opacity for 60fps
- Throttled scroll events
- Intersection Observer for scroll animations
- Reduced motion preference support

## 🔧 Technical Details

### File Structure
```
devjoex-portfolio/
├── index.html              # Main HTML file
├── styles/
│   ├── main.css           # Core styles and variables
│   └── sections.css       # Section-specific styles
├── scripts/
│   └── main.js            # Main JavaScript functionality
├── assets/                 # Images, icons, and media
├── dist/                   # Production build output
├── package.json            # Dependencies and scripts
├── vite.config.js          # Build configuration
└── manifest.json           # PWA manifest
```

### Build Tools
- **Vite**: Fast build tool and dev server
- **CSS**: Custom properties and modern CSS features
- **JavaScript**: ES6+ with fallbacks
- **Optimization**: Minification, compression, and tree-shaking

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📊 Performance

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 95+
- **SEO**: 100

### Optimization Features
- Lazy loading images
- Critical CSS inlining
- Optimized asset delivery
- Minimal JavaScript bundle
- Efficient animations

## 🐛 Troubleshooting

### Common Issues

1. **Animations not working**
   - Check if `prefers-reduced-motion` is enabled
   - Ensure JavaScript is loaded properly
   - Verify CSS animations are supported

2. **Build errors**
   - Clear `node_modules` and reinstall
   - Check Node.js version compatibility
   - Verify all dependencies are installed

3. **Deployment issues**
   - Ensure repository name matches `vite.config.js`
   - Check GitHub Pages settings
   - Verify build output in `dist/` folder

### Debug Mode

Enable debug logging in `scripts/main.js`:

```js
const DEBUG = true;

function log(message) {
  if (DEBUG) console.log(`[DevJoex] ${message}`);
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons from [Feather Icons](https://feathericons.com/)
- Fonts from [Inter](https://rsms.me/inter/)
- Inspiration from modern portfolio designs
- DevOps community for technical insights

## 📞 Support

For questions or support:
- Create an issue on GitHub
- Contact: yossef.salem@example.com
- LinkedIn: [Yossef Salem](https://linkedin.com/in/yossef-salem)

---

**Built with ❤️ and ☕ by Yossef Salem**

*IT Engineer & Aspiring DevOps Engineer*
