# Campus Canteen & Express Cafeteria 🍽️

> **Designed & Developed by Ebin Mathew Sogy**

A modern, responsive, client-side web application for campus dining services. Features cashless food token generation online without paying, bilingual Malayalam & English food menus, student/staff role selection, dietary filters, and meal timing schedules.

---

## ✨ Features

- **🎫 Cashless Online Token Portal**: Generate instant meal tokens online without payment for Students and Staff/Faculty.
- **🍛 Bilingual Food Menus**: Real-time screening and search with English & Malayalam food titles (*മെയിൻ കാന്റീൻ & എക്സ്പ്രസ്സ് കഫറ്റീരിയ*).
- **⏱️ Live Operational Schedules**: Real-time indicators for Breakfast, Lunch Mess, Evening Snacks, and continuous Hot Beverages.
- **🏷️ Dietary & Category Filters**: Easily filter by Vegetarian, Non-Veg, Breakfast, Lunch, Express Snacks, and Fresh Juices.
- **📱 Responsive & Mobile-Optimized**: Designed for desktop and mobile displays with printable/copyable digital tokens and QR watermarks.
- **🚀 100% GitHub Pages Friendly**: Configured with relative base asset paths and automated GitHub Actions deployment.

---

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **Vite 6** (with relative asset pathing for subfolder repository hosting)
- **Tailwind CSS v4**
- **Lucide Icons**
- **Motion**

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run in development mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the port indicated in terminal) in your browser.

### 4. Build for production
```bash
npm run build
```
Static production files will be compiled into the `dist/` directory.

---

## 🌐 How to Fix the "Blank Page" on GitHub Pages

If you see a blank white page on GitHub Pages, it is because GitHub Pages is attempting to serve the uncompiled root folder (`/`) rather than the built `dist/` directory or `gh-pages` branch.

Follow **either** of these two quick solutions:

---

### Solution 1: Enable GitHub Actions (Recommended - 1 Click)

1. Open your repository on GitHub.
2. Click **Settings** (tab at the top) ➔ **Pages** (on the left menu).
3. Under **Build and deployment** ➔ **Source**, change the dropdown from **"Deploy from a branch"** to **"GitHub Actions"**.
4. Go to the **Actions** tab in your repository and run or re-run the workflow, or push a commit.
5. Your website will be live without any blank page!

---

### Solution 2: Deploy with 1 Command (`npm run deploy`)

If you prefer deploying via branch:

1. In your local terminal, run:
   ```bash
   npm run deploy
   ```
2. In your GitHub repository, go to **Settings** ➔ **Pages**.
3. Under **Build and deployment** ➔ **Source**, select **"Deploy from a branch"**.
4. Select the **`gh-pages`** branch and the **`/ (root)`** folder, then click **Save**.

---

## 👨‍💻 Author & Attribution

- **Creator / Designer**: Ebin Mathew Sogy
- **License**: MIT
