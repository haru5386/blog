# post

1. CI/CD 部署到 vercel v
2. 進位制 v
3. 字元編碼 V
4. JavaScript 記憶體與儲存結構和垃圾回收機制 V
5. 處理程序（process）與執行緒（thread）V
6. 虛擬記憶體 V
7. 網路傳輸：HTTP 協議：HTTP, HTTPS, DNS、CDN、Cache V
8. TCP/IP V
9. 演算法：雙指針 V
10. Bom/ dom V
11. 瀏覽器渲染流程 V
12. design pattern V
13. design pattern V
14. design pattern V
15. web worker V
16. 狀態碼、GET vs Post V
17. side project - 詛咒辦公室同事
18. 從 JavaScript 到 TypeScript：一次搞懂 class 的完整用法
19. 前端Component 封裝與Design Pattern的最佳實踐


# 代辦

1. 演算法
2. i18n
3. mdn 轉文章
4. docker
5. Vite vs Webpack
6. HTML 標籤語意與 SEO 關係
7. CSR vs SSR vsSSG
8. html 無障礙
9. 資料夾結構
10. vue 底層寫法
11. clean code / SOLID
12. react rerender 機制
13. 檔案系統與權限
14. WebSocket、SSE
15. SEO優化
16. cors
17. 模組化設計、微前端
18. LCP CLS
19. PWA
20. rag 自己爬資料
21. Polling / WebSocket / WebRTC
22. SOAP / RESTful / GraphQL / gRPC
23. Web Security:分享常見 Web 攻擊：XSS、CSRF、Clickjacking 、防範方式（CSP、SameSite cookie、input sanitation）
24. Web 常見的 Authorization / Authentication
25.  Service Communications:可舉例：frontend ↔ backend、微服務之間如何傳資料、可補充：同步 vs 非同步，API gateway、事件驅動架構
26. Clean Architecture



# project

1. 加上 OG、seo

# to read

1. front roadmap https://roadmap.sh/frontend
2. [cs50](https://www.edx.org/learn/computer-science/harvard-university-cs50-s-introduction-to-computer-science)

# note

一、基本計算機概論（Computer Science Fundamentals）

2. 資料結構與演算法（Data Structures & Algorithms）
   基本資料結構：陣列、堆疊、佇列、鏈結串列、樹、圖

常見演算法：排序（quick sort, merge sort）、搜尋（binary search）

時間與空間複雜度（Big-O notation）

👉 每天都在跟這些打交道！理解 request lifecycle、瀏覽器如何載入頁面，對 debug、效能優化有極大幫助。

JS 執行環境（單執行緒 + 非同步）

👉 深入理解瀏覽器機制，能寫出更順、更快的互動體驗。

7. 編譯與執行（可選進階）
   編譯 vs 解譯 vs JIT

Babel 的轉譯流程

原始碼 → Bytecode → 機器碼

👉 想了解 JS 為何有 hoisting、closure、var/let 差異，會非常有幫助。

模組三：Vue/Nuxt 底層與進階技巧
✅ 筆記重點：
Vue 3 Composition API 原理與應用（reacive, ref, computed, watch, effect scope）

Virtual DOM 與渲染流程（Patch、Diff）

Nuxt3 架構：middleware, plugin, layout, app config, runtime config

SSR vs CSR vs Hybrid rendering

模組四：架構設計與模組化實踐
✅ 筆記重點：
Component Pattern：slot-based / renderless / HOC / mixin vs composables

應用架構拆分（Domain-based folder 結構、monorepo）

Pinia/Vuex 結構設計（狀態單一出口、邏輯解耦、模組化）

API 管理層封裝（service layer、error handling pattern）

🔍 推薦資源：
VueUse 開源庫（觀察怎麼做 composable abstraction）

你可複習自己的專案，畫出 folder structure 再回頭優化設計

組五：效能優化與可維護性
✅ 筆記重點：
Core Web Vitals 指標與 Lighthouse 分析

Lazy loading、code splitting、preload/prefetch 差異與應用

談重構：KISS / DRY / YAGNI、技術債整理方式

如何 Code Review（可讀性、效能、擴充性）

🔍 推薦資源：
Google DevTools 教學 & Web.dev 效能最佳實踐

Kent C. Dodds 的 testing & refactoring 系列文章

清晰架構範例：Nuxt3 + module 化的開源專案

# 演算法

1. 排序與搜尋（Sorting & Searching）
   Quick Sort、Merge Sort、Heap Sort 、Binary Search、Kth Largest / Smallest、搜尋旋轉排序陣列

🧱 2. 遞迴與分治（Recursion & Divide and Conquer）
爬樓梯（Climbing Stairs）、Merge Intervals（合併區間）、快速冪（Power(x, n)）、快速排序 / 合併排序

📦 3. 動態規劃（Dynamic Programming, DP）
一維 DP：爬樓梯、最大子陣列和（Kadane’s Algorithm）

二維 DP：編輯距離（Edit Distance）、0/1 背包問題、最長公共子序列（LCS）、最大正方形、最大矩形、記憶化搜尋（Top-down DP）

🔁 4. 滑動視窗（Sliding Window）
最長不重複子字串、最小覆蓋子字串（Minimum Window Substring）、最大滑動視窗（Sliding Window Maximum）、含有最多 K 種字元的最長子字串

🔗 6. 連結串列（Linked List）
翻轉連結串列、快慢指針找中點、環（Cycle Detection）、合併兩個有序連結串列、LRU Cache（常結合 HashMap + 雙向 Linked List）

🌲 7. 樹與二元樹（Tree / Binary Tree）
中序、前序、後序遍歷（遞迴 & 迴圈）、層序遍歷（BFS）、最小/最大深度、最近共同祖先（LCA）、最近共同祖先（LCA）、二元搜尋樹（BST）操作：插入、刪除、查找、路徑總和（Path Sum）

🧭 8. 圖論（Graph）
BFS / DFS 遍歷、拓撲排序（Topological Sort）、最短路徑（Dijkstra、Floyd-Warshall）、最小生成樹（Kruskal、Prim）、找環（Cycle Detection）

📚 9. 字串處理（String）
KMP / Rabin-Karp 演算法（字串搜尋）、反轉單字順序、句子順序、子字串處理、字元統計（通常搭配 HashMap）

🧩 10. 回溯（Backtracking）
子集 / 組合 / 排列、解數獨（Sudoku Solver）、N 皇后問題、分割回文串

🎲 11. 貪婪演算法（Greedy）
跳躍遊戲（Jump Game）、区间调度（Interval Scheduling）、分糖果（Candy）、合併區間、分發工作/資源

⚙️ 12. 堆與優先佇列（Heap / Priority Queue）
Kth Largest Element、Merge k Sorted Lists、Top K Frequent Elements

🗂 13. 位元運算（Bit Manipulation）
判斷奇偶、找出唯一出現一次的數、位移運算實作乘除法、子集生成（位元掩碼）
