# ![seedling](/public/seedling.svg) 安心小農 - 農產品電商網站 | React
![farm-ec-react demo](/public/farm-gh.png)

## 專案簡介
這是一個以販售農產與相關產品為主題的電商網站。顧客能在網站中瀏覽商品以及相關訊息，將喜歡的商品加入購物車，進行線上購物。

本專案為前後分離開發之前端部分，使用 React 搭配 Bootstrap，並串接後端 API（30多個）進行開發。

### Live Demo
本專案為技術練習作品，不具任何商業行為，測試操作時勿留下真實個人資料。

- 前台（顧客）https://rubylo718.github.io/farm-ec-react/#/

- 後台（管理員）https://rubylo718.github.io/farm-ec-react/#/login
- 管理員帳號 `rubylo718@gmail.com` 密碼 `12345678`

## 功能
### 前台（顧客）
- 使用者可從網站瀏覽商品，檢視特定類別商品，或透過關鍵字搜尋商品
- 使用者可將商品加入購物車，調整數量，或是刪除項目
- 使用者可在購物車中，套用不同的優惠碼，獲得不同程度的折扣
- 使用者可閱讀部落格文章，文章會將使用者引導至相關商品頁面
- 需時間載入時顯示Spinner，優化使用者體驗，亦避免資料重複送出
- RWD 響應式網站，支援多種尺寸介面瀏覽

### 後台（管理員）
- 需登入有效之帳號密碼，才可操作使用
- 使用者登入後，在 token 有效且尚未登出前，不需重複登入
- 使用者可操作管理商品、優惠券、訂單、部落格文章


## 使用技術
- 使用 React functional components & hooks 進行開發
- 使用 Create React App 建立專案環境
- 透過 useReducer & useContext 進行狀態管理
- 使用 React Hook Form 開發表單，實現表單監聽、驗證等功能
- 使用 Bootstrap 5 進行 RWD 響應式網頁排版
- 使用 Sass 客制樣式
- 使用 Github Actions 將更新內容自動部署至 GitHub Pages

## 專案安裝
```
$ git clone https://github.com/rubylo718/farm-ec-react.git
$ cd farm-ec-react
$ npm install
$ npm start
```

## 專案套件
- Runtime Environment: Node.js @16.4
- Front-end Library: React @18.2
- UI Framework: Bootstrap @5.3

詳細資訊請參閱 [package.json](https://github.com/rubylo718/farm-ec-react/blob/main/package.json)

## 資源
- 圖片來源：[Unsplash](https://unsplash.com/), [Pexels](https://www.pexels.com/zh-tw/)
- Logo & Icon: [Font Awesome](https://fontawesome.com/)
- 繁體中文字型 - 芫荽體：https://github.com/ButTaiwan/iansui

## 作者
Ruby Lo 

## License
Licensed under the MIT License, Copyright © 2023-present Ruby Lo
