# Deployment Guide 🚀

## Quick Deploy (No Build Required)

Since this portfolio is built with vanilla HTML, CSS, and JavaScript, you can deploy it directly without any build process:

### Option 1: Direct Upload to GitHub Pages

1. **Create a new repository** on GitHub named `devjoex-portfolio`
2. **Upload all files** to the repository
3. **Enable GitHub Pages**:
   - Go to Settings > Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
4. **Your site will be available** at: `https://yourusername.github.io/devjoex-portfolio`

### Option 2: Netlify Drop

1. **Go to** [netlify.com/drop](https://netlify.com/drop)
2. **Drag and drop** the entire `devjoex-portfolio` folder
3. **Your site will be deployed** instantly with a random URL
4. **Customize the URL** in your Netlify dashboard

### Option 3: Vercel

1. **Go to** [vercel.com](https://vercel.com)
2. **Import your repository** or drag and drop the folder
3. **Deploy** with one click

## Build & Deploy (Advanced)

If you want to use the build tools for optimization:

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview build
npm run preview
```

### Build Output

The build process will create a `dist/` folder with:
- Minified HTML
- Optimized CSS
- Compressed JavaScript
- Optimized assets

### Deploy Build Output

Upload the contents of the `dist/` folder to your hosting service.

## Customization Before Deploy

### 1. Update Personal Information

Edit `index.html`:
- Your name and title
- Contact information
- Social media links
- Project details

### 2. Add Your Assets

Replace placeholder files in `assets/`:
- `avatar.jpg` - Your profile picture
- `about-image.jpg` - About section image
- `resume.pdf` - Your resume
- `favicon.svg` - Your logo/favicon

### 3. Update Repository Name

If using GitHub Pages, update `vite.config.js`:
```js
base: '/your-actual-repo-name/',
```

### 4. Update Meta Tags

Edit `index.html` head section:
- Open Graph URLs
- Twitter Card URLs
- Meta descriptions

## Performance Optimization

### Before Deploy

1. **Compress images** to WebP format when possible
2. **Optimize SVG icons** by removing unnecessary attributes
3. **Minify CSS/JS** (build process handles this)
4. **Enable gzip compression** on your hosting service

### After Deploy

1. **Test on PageSpeed Insights**
2. **Verify mobile responsiveness**
3. **Check accessibility** with Lighthouse
4. **Test on different devices**

## Troubleshooting

### Common Issues

1. **Images not loading**
   - Check file paths in HTML
   - Ensure images are in the correct folder
   - Verify file permissions

2. **Styles not applying**
   - Check CSS file paths
   - Verify CSS syntax
   - Clear browser cache

3. **JavaScript errors**
   - Check browser console for errors
   - Verify script file paths
   - Test on different browsers

### Debug Mode

Enable debug logging in `scripts/main.js`:
```js
const DEBUG = true;
```

## Post-Deployment

### 1. Test Everything
- [ ] All links work
- [ ] Forms submit correctly
- [ ] Animations work on mobile
- [ ] Theme toggle functions
- [ ] Social media links open

### 2. SEO Verification
- [ ] Meta tags are correct
- [ ] Open Graph images display
- [ ] Sitemap is generated (if needed)
- [ ] Robots.txt is configured

### 3. Analytics Setup
- [ ] Google Analytics (if desired)
- [ ] Search Console verification
- [ ] Performance monitoring

## Maintenance

### Regular Updates
- Keep dependencies updated
- Refresh content regularly
- Monitor performance metrics
- Update project information

### Security
- Keep hosting platform updated
- Monitor for security issues
- Use HTTPS (most platforms provide this)

---

**Need Help?** Create an issue on GitHub or contact the developer.
