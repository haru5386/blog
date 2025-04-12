# post

1. 演算法
2. i18n
3. mdn 轉文章
4. CI/CD 部署到 vercel v
5. docker
6. Vite vs Webpack
7. 狀態碼、GET vs Post、HTML 標籤語意與 SEO 關係
8. CSR vs SSR vsSSG
9. html 無障礙
10. 進位制 v
11. 字元編碼 V
12. JavaScript 記憶體與儲存結構和垃圾回收機制 V
13. HTTP 協議：HTTP, HTTPS, TCP/IP | DNS、CDN、CORS、Cache、Cookie、Session、JWT | REST API vs GraphQL | WebSocket、SSE
14. 資料夾結構
15. vue底層寫法
16. clean code
17. 處理程序（process）與執行緒（thread）V
18. 虛擬記憶體 V
19. 檔案系統與權限

# project
1. 加上OG、seo

# to read
1. front roadmap https://roadmap.sh/frontend
2. [cs50](https://www.edx.org/learn/computer-science/harvard-university-cs50-s-introduction-to-computer-science)


# note
 一、基本計算機概論（Computer Science Fundamentals）
1. 數字與資料表示法
二進位、十六進位

補數（Two’s Complement）、浮點數表示

字元編碼：ASCII、UTF-8、Unicode

👉 為什麼前端需要知道？
因為你在處理像 emoji、中文字、base64 圖片、特殊符號時，會遇到字元編碼、字節長度等問題。

2. 資料結構與演算法（Data Structures & Algorithms）
基本資料結構：陣列、堆疊、佇列、鏈結串列、樹、圖

常見演算法：排序（quick sort, merge sort）、搜尋（binary search）

時間與空間複雜度（Big-O notation）

👉 為什麼前端需要？
處理 DOM 查找、Virtual DOM diffing、表單驗證、懶加載、搜尋時能選對資料結構與演算法，寫出效能更好的程式。

4. 作業系統基本概念
處理程序（process）與執行緒（thread）

非同步與同步

虛擬記憶體

檔案系統與權限

👉 為什麼重要？
你在設定 Vite、Webpack、Next.js、Docker，或在調優 bundle 大小、SSR、非同步 API 時會接觸到這些概念。

5. 網路與通訊協定（Networking）
HTTP, HTTPS, TCP/IP

DNS、CDN、CORS、Cache、Cookie、Session、JWT

REST API vs GraphQL

WebSocket、SSE

👉 每天都在跟這些打交道！理解 request lifecycle、瀏覽器如何載入頁面，對 debug、效能優化有極大幫助。

6. 瀏覽器原理
DOM 與 BOM

Event Loop、Call Stack、Task Queue、Microtask

瀏覽器渲染流程（Reflow vs Repaint）

JS 執行環境（單執行緒 + 非同步）

👉 深入理解瀏覽器機制，能寫出更順、更快的互動體驗。

7. 編譯與執行（可選進階）
編譯 vs 解譯 vs JIT

Babel 的轉譯流程

原始碼 → Bytecode → 機器碼

👉 想了解 JS 為何有 hoisting、closure、var/let 差異，會非常有幫助。
