# 🚀 GitHub Pages Deployment Guide

## 📋 **Step-by-Step Instructions**

### **Step 1: Create GitHub Repository**

1. **Go to GitHub.com** and sign in to your account
2. **Click "New repository"** (green button)
3. **Repository name:** `devjoex` (or your preferred name)
4. **Description:** `My personal portfolio website`
5. **Make it Public** (required for free GitHub Pages)
6. **Don't initialize** with README (we already have files)
7. **Click "Create repository"**

### **Step 2: Connect Local Repository to GitHub**

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/devjoex.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

### **Step 3: Enable GitHub Pages**

1. **Go to your repository** on GitHub
2. **Click "Settings"** tab
3. **Scroll down to "Pages"** section (in the left sidebar)
4. **Source:** Select "Deploy from a branch"
5. **Branch:** Select "main"
6. **Folder:** Select "/ (root)"
7. **Click "Save"**

### **Step 4: Update Formspree URL**

Once your site is live, update the Formspree redirect URL:

1. **Find your GitHub Pages URL** (usually `https://YOUR_USERNAME.github.io/devjoex`)
2. **Update the form in `index.html`:**
   ```html
   <input type="hidden" name="_next" value="https://YOUR_USERNAME.github.io/devjoex/thanks.html">
   ```

### **Step 5: Test Your Portfolio**

1. **Wait 5-10 minutes** for GitHub Pages to deploy
2. **Visit your site:** `https://YOUR_USERNAME.github.io/devjoex`
3. **Test the contact form** - should redirect to thanks page
4. **Check all sections** work properly

## 🔧 **Troubleshooting**

### **If GitHub Pages doesn't work:**
- Check repository is **public**
- Ensure you're using the **main branch**
- Wait 10-15 minutes for initial deployment
- Check repository settings for any errors

### **If contact form doesn't work:**
- Verify Formspree URL is updated with your GitHub Pages URL
- Check Formspree dashboard for form submissions
- Ensure your email is confirmed in Formspree

### **If images don't load:**
- Check file paths are correct
- Ensure all assets are committed to GitHub
- Verify image files are in the right folders

## 📱 **Custom Domain (Optional)**

If you want a custom domain (e.g., `yossefsalem.dev`):

1. **Buy a domain** from a registrar (Namecheap, GoDaddy, etc.)
2. **In GitHub repository settings:**
   - Go to Pages section
   - Add your custom domain
   - Check "Enforce HTTPS"
3. **Update DNS settings** with your domain provider
4. **Update Formspree URL** to use your custom domain

## 🎯 **Final Checklist**

- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Formspree URL updated
- [ ] Portfolio accessible online
- [ ] Contact form working
- [ ] All sections displaying correctly
- [ ] Mobile responsive design working

## 🌐 **Your Portfolio URL**

Once deployed, your portfolio will be available at:
`https://YOUR_USERNAME.github.io/devjoex`

Replace `YOUR_USERNAME` with your actual GitHub username.

---

**Need help?** Check GitHub's documentation or contact me for assistance!
