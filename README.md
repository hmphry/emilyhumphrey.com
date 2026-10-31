# EmilyHumphrey.com

Personal website and blog of Emily Humphrey. Built in Typescript, React, TailwindCSS, and Vite. 

## Recommended VS Code Extensions
This project includes recommended extensions. Install them by:
1. Open Command Palette (`Ctrl+Shift+P`)
2. Run "Extensions: Show Recommended Extensions"
3. Install the workspace recommendations

## Prerequisites
- Node.js 22.5.1+ (use `nvm use` if you have nvm installed; `.nvmrc` pins the version)
- npm or yarn

## Deploy
GitHub Pages should publish the `gh-pages` branch. `npm run deploy` builds the site and publishes `build/client` there.

`public/CNAME` is the custom domain (`emilyhumphrey.com`). Vite copies `public/` into `build/client`, so every build includes a root `CNAME` in the deploy output. The repo-root `CNAME` matches it so the domain still resolves while Pages is serving `main`. Keep the two files identical.