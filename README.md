# JavaScript Calculator

使用 **HTML、CSS、原生 JavaScript** 製作的計算機，不依賴 Vue、React、Vite 或其他前端框架。

## Features

### 一般計算機
- 基本四則運算：加、減、乘、除
- 小數運算與連續運算
- 清除（C）、刪除最後一位（←）
- 鍵盤操作
- 除以 0 的錯誤處理

### 比例計算工具
- **比例化簡**：將整數或小數比例化為最簡整數比
- **比例求未知數**：依 A:B = C:X 計算 X
- **比例轉百分比**：計算比例各部分所佔百分比
- **百分比轉比例**：將百分比換算為「占比 : 剩餘比例」
- **依比例分配總量**：輸入總量與比例，計算各部分分配數量

## 專案結構

```text
Calculate-for-JS/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── calculator.js
│   └── ratio-calculator.js
├── .github/
│   └── workflows/
│       └── deploy.yml
└── README.md
```

## 技術

- HTML5
- CSS3
- JavaScript (ES6+)
- GitHub Actions
- GitHub Pages

## 執行

不需要安裝 Node.js 或 npm。直接用瀏覽器開啟 `index.html`，或使用 VS Code Live Server 預覽。

## 比例計算說明

- 化簡比例：輸入 A、B，求 A:B 的最簡整數比。
- 求未知數：輸入 A、B、C，依照 A:B = C:X，計算 X = B × C ÷ A。
- 比例轉百分比：前項百分比 = A ÷ (A+B) × 100%；後項同理。
- 百分比轉比例：P% 轉為 P:(100-P)，再化簡。
- 比例分配：前項分配 = 總量 × A ÷ (A+B)；後項同理。

輸入驗證會避免負數比例、無效數字、兩項同時為 0，以及除數為 0 等情況。

## GitHub Pages

本專案為純靜態網站，可直接部署至 GitHub Pages。

## License

目前未指定 License。
