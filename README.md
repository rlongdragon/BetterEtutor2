# BetterEtutor2

本專案透過瀏覽器插件改善 etutor2 的使用體驗，解決網頁運行效率過低，改善內容顯示等。
未來將更新更多輔助功能

## 安裝步驟
本專案尚未上架至 chrome 擴充功能商店，需自行下載檔案安裝。[發布頁面](https://github.com/rlongdragon/BetterEtutor2/releases)

1. 前往 [chrome://extension](chrome://extension) 
2. 開啟開發者模式
3. 點選 `[載入未封裝項目]`
4. 將 dist 資料夾匯入
5. 重新啟動瀏覽器

## 自行編譯
編譯後的釋出版本在 repo 的 release 內。
目前發布的版本為 0.0.2-beta 預先發布版

本專案使用 Typescript 以及 webpack 製作，須先進行編譯後方可使用。
使用
```bash
npm run build 
```
會將 /src 以及 /public 編譯至 /dist 資料夾內。

專案 clone 後需要先執行 `npm i` 安裝本專案使用的函式庫。

## Bug 和 Issue
使用上遇到問題，或是想法都可以到 issue 提問或建議。
或是可以使用 email 聯絡我：[me@rlongdragon.com](mailto:me@rlongdragon.com)

---
最後如果你覺得此專案有幫到你希望不吝嗇給一顆星星

(讓我可以蒐集 github 的成就 哈哈