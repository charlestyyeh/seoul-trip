const fs = require('fs');
const path = require('path');

// 建立資料夾結構
const dirs = ['src'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log(`Created directory: ${dir}`);
  }
});

// 檔案內容定義
const files = {
  'package.json': JSON.stringify({
    "name": "seoul-trip",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "homepage": "https://YOUR_GITHUB_USERNAME.github.io/seoul-trip",
    "scripts": {
      "dev": "vite",
      "build": "tsc && vite build",
      "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
      "preview": "vite preview",
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    },
    "dependencies": {
      "lucide-react": "^0.292.0",
      "react": "^18.2.0",
      "react-dom": "^18.2.0"
    },
    "devDependencies": {
      "@types/react": "^18.2.37",
      "@types/react-dom": "^18.2.15",
      "@vitejs/plugin-react": "^4.2.0",
      "autoprefixer": "^10.4.16",
      "gh-pages": "^6.1.0",
      "postcss": "^8.4.31",
      "tailwindcss": "^3.3.5",
      "typescript": "^5.2.2",
      "vite": "^5.0.0"
    }
  }, null, 2),

  'vite.config.ts': `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/seoul-trip/', // 如果您有自定義網域，請改為 '/'
})`,

  'tailwind.config.js': `
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,

  'postcss.config.js': `
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`,

  'tsconfig.json': JSON.stringify({
    "compilerOptions": {
      "target": "ES2020",
      "useDefineForClassFields": true,
      "lib": ["ES2020", "DOM", "DOM.Iterable"],
      "module": "ESNext",
      "skipLibCheck": true,
      "moduleResolution": "bundler",
      "allowImportingTsExtensions": true,
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "jsx": "react-jsx",
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noFallthroughCasesInSwitch": true
    },
    "include": ["src"],
    "references": [{ "path": "./tsconfig.node.json" }]
  }, null, 2),

  'tsconfig.node.json': JSON.stringify({
    "compilerOptions": {
      "composite": true,
      "skipLibCheck": true,
      "module": "ESNext",
      "moduleResolution": "bundler",
      "allowSyntheticDefaultImports": true
    },
    "include": ["vite.config.ts"]
  }, null, 2),

  'index.html': `
<!doctype html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>首爾旅遊小幫手</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,

  'src/main.tsx': `
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,

  'src/index.css': `
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  background-color: #FFF5F5;
}
`,
  
  'src/vite-env.d.ts': `/// <reference types="vite/client" />`
};

// 寫入檔案
Object.entries(files).forEach(([fileName, content]) => {
  fs.writeFileSync(path.join(__dirname, fileName), content.trim());
  console.log(`Created file: ${fileName}`);
});

console.log('✅ 專案結構建立完成！請繼續執行後續步驟。');
