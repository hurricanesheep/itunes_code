# Free Deployment Guide

Here are several **free** ways to deploy your iTunes Song Search app:

## 🚀 Recommended Options (Easiest)

### 1. **Vercel** (Recommended - Easiest)
**Best for:** React/Vite apps, automatic deployments

**Steps:**
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "New Project"
3. Import your GitHub repository (or drag & drop your `dist` folder)
4. Vercel auto-detects Vite - no configuration needed!
5. Click "Deploy"
6. Your app will be live in ~2 minutes!

**Features:**
- ✅ Free SSL certificate
- ✅ Custom domain support
- ✅ Automatic deployments on git push
- ✅ Preview deployments for PRs
- ✅ Global CDN

**Build Settings (auto-detected):**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

---

### 2. **Netlify**
**Best for:** Static sites, drag & drop deployment

**Option A: Drag & Drop (Easiest)**
1. Build your app: `npm run build`
2. Go to [netlify.com](https://netlify.com) and sign up
3. Drag the `dist` folder to Netlify's deploy area
4. Done! Your app is live!

**Option B: Git Integration**
1. Connect your GitHub repository
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy!

**Features:**
- ✅ Free SSL
- ✅ Custom domains
- ✅ Form handling
- ✅ Branch previews

---

### 3. **Cloudflare Pages**
**Best for:** Fast global CDN, unlimited bandwidth

**Steps:**
1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Sign up (free)
3. Connect GitHub repository
4. Build settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Deploy!

**Features:**
- ✅ Unlimited bandwidth
- ✅ Fast global CDN
- ✅ Free SSL
- ✅ Custom domains

---

## 📦 Other Free Options

### 4. **GitHub Pages**
**Best for:** Open source projects

**Steps:**
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Update `vite.config.ts`:
   ```ts
   export default defineConfig({
     base: '/your-repo-name/', // Add this
     // ... rest of config
   })
   ```
4. Run: `npm run deploy`

**Note:** Requires public repository for free tier

---

### 5. **Render**
**Best for:** Full-stack apps (has free tier)

**Steps:**
1. Go to [render.com](https://render.com)
2. Create new "Static Site"
3. Connect GitHub repo
4. Build command: `npm run build`
5. Publish directory: `dist`

**Features:**
- ✅ Free SSL
- ✅ Custom domains
- ⚠️ Free tier spins down after inactivity

---

### 6. **Surge.sh**
**Best for:** Quick deployments via CLI

**Steps:**
1. Install: `npm install -g surge`
2. Build: `npm run build`
3. Deploy: `surge dist your-app-name.surge.sh`
4. Follow prompts

**Features:**
- ✅ Free subdomain
- ✅ Custom domain support
- ✅ Simple CLI

---

## 🎯 Quick Start (Vercel - Recommended)

### Method 1: Via GitHub (Recommended)
```bash
# 1. Make sure your code is on GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Go to vercel.com and import your repo
# 3. Click Deploy - that's it!
```

### Method 2: Via Vercel CLI
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Build your app
npm run build

# 3. Deploy
vercel

# 4. Follow the prompts
```

---

## ⚙️ Build Configuration

Your app is already configured correctly! Just make sure:

1. **Build command works:**
   ```bash
   npm run build
   ```

2. **Output directory:** `dist` (Vite default)

3. **No special config needed** - Vite handles everything!

---

## 🔧 Troubleshooting

### CORS Issues
If you encounter CORS errors with the iTunes API:
- The CORS proxies in your code should handle this
- If issues persist, consider using a backend proxy

### Build Errors
- Make sure all dependencies are in `package.json`
- Run `npm install` before building
- Check that TypeScript compiles: `npm run build`

### Routing Issues
- For client-side routing, configure your host:
  - **Vercel:** Create `vercel.json` with redirect rules
  - **Netlify:** Create `_redirects` file in `public/`

---

## 📝 Example: Vercel Configuration (Optional)

Create `vercel.json` in project root (optional):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

---

## 🌐 Recommended: Vercel

**Why Vercel?**
- ✅ Zero configuration needed
- ✅ Automatic deployments
- ✅ Fast global CDN
- ✅ Free SSL
- ✅ Custom domains
- ✅ Preview deployments
- ✅ Best for React/Vite apps

**Get started:** [vercel.com](https://vercel.com)

---

## 📱 After Deployment

Once deployed, you can:
1. Share your live URL
2. Test on mobile devices
3. Add a custom domain (free)
4. Set up automatic deployments

**Your app will be accessible worldwide!** 🌍

