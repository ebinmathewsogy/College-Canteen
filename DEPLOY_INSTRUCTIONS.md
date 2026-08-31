# Deployment Guide for GitHub Pages

## Method 1: Using `gh-pages` branch (Recommended for direct branch deployment)

Run this command in your terminal:
```bash
npm run deploy
```

Then in GitHub Settings -> Pages:
1. Source: **Deploy from a branch**
2. Branch: **gh-pages** / **/ (root)**
3. Click **Save**

---

## Method 2: Using GitHub Actions

In GitHub Settings -> Pages:
1. Source: **GitHub Actions**
2. In the **Actions** tab, trigger **Deploy to GitHub Pages**
