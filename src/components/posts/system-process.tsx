
export default function ProcessSimulator() {

  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  {/* <!-- 背景與標題 --> */}
  <rect width="800" height="600" fill="#f9f9f9" rx="10" ry="10"/>
  <text x="400" y="40" fontFamily="Arial" fontSize="24" fontWeight="bold" textAnchor="middle" fill="#333">瀏覽器處理程序(Process)與執行緒(Thread)關係圖</text>
  
  {/* <!-- 主處理程序 --> */}
  <rect x="50" y="80" width="700" height="120" fill="#e1f5fe" stroke="#0288d1" strokeWidth="2" rx="8" ry="8"/>
  <text x="400" y="105" fontFamily="Arial" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#0288d1">主處理程序</text>
  
  {/* <!-- 主處理程序中的執行緒 --> */}
  <rect x="70" y="120" width="150" height="60" fill="#bbdefb" stroke="#0288d1" strokeWidth="1" rx="5" ry="5"/>
  <text x="145" y="145" fontFamily="Arial" fontSize="14" textAnchor="middle" fill="#333">UI 執行緒</text>
  <text x="145" y="165" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#666">處理用戶介面</text>
  
  <rect x="240" y="120" width="150" height="60" fill="#bbdefb" stroke="#0288d1" strokeWidth="1" rx="5" ry="5"/>
  <text x="315" y="145" fontFamily="Arial" fontSize="14" textAnchor="middle" fill="#333">I/O 執行緒</text>
  <text x="315" y="165" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#666">處理檔案操作</text>
  
  <rect x="410" y="120" width="150" height="60" fill="#bbdefb" stroke="#0288d1" strokeWidth="1" rx="5" ry="5"/>
  <text x="485" y="145" fontFamily="Arial" fontSize="14" textAnchor="middle" fill="#333">管理執行緒</text>
  <text x="485" y="165" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#666">協調其他處理程序</text>
  
  <rect x="580" y="120" width="150" height="60" fill="#bbdefb" stroke="#0288d1" strokeWidth="1" rx="5" ry="5"/>
  <text x="655" y="145" fontFamily="Arial" fontSize="14" textAnchor="middle" fill="#333">儲存執行緒</text>
  <text x="655" y="165" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#666">管理書籤、設定等</text>
  
  {/* <!-- 網路處理程序 --> */}
  <rect x="50" y="220" width="220" height="100" fill="#e8f5e9" stroke="#388e3c" strokeWidth="2" rx="8" ry="8"/>
  <text x="160" y="245" fontFamily="Arial" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#388e3c">網路處理程序</text>
  
  <rect x="70" y="260" width="80" height="45" fill="#c8e6c9" stroke="#388e3c" strokeWidth="1" rx="5" ry="5"/>
  <text x="110" y="285" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#333">請求執行緒</text>
  
  <rect x="170" y="260" width="80" height="45" fill="#c8e6c9" stroke="#388e3c" strokeWidth="1" rx="5" ry="5"/>
  <text x="210" y="285" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#333">快取執行緒</text>
  
  {/* <!-- GPU處理程序 --> */}
  <rect x="290" y="220" width="220" height="100" fill="#fff3e0" stroke="#f57c00" strokeWidth="2" rx="8" ry="8"/>
  <text x="400" y="245" fontFamily="Arial" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#f57c00">GPU處理程序</text>
  
  <rect x="310" y="260" width="80" height="45" fill="#ffe0b2" stroke="#f57c00" strokeWidth="1" rx="5" ry="5"/>
  <text x="350" y="285" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#333">合成執行緒</text>
  
  <rect x="410" y="260" width="80" height="45" fill="#ffe0b2" stroke="#f57c00" strokeWidth="1" rx="5" ry="5"/>
  <text x="450" y="285" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#333">繪製執行緒</text>
  
  {/* <!-- 儲存處理程序 --> */}
  <rect x="530" y="220" width="220" height="100" fill="#f3e5f5" stroke="#7b1fa2" strokeWidth="2" rx="8" ry="8"/>
  <text x="640" y="245" fontFamily="Arial" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#7b1fa2">儲存處理程序</text>
  
  <rect x="550" y="260" width="80" height="45" fill="#e1bee7" stroke="#7b1fa2" strokeWidth="1" rx="5" ry="5"/>
  <text x="590" y="285" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#333">SQL執行緒</text>
  
  <rect x="650" y="260" width="80" height="45" fill="#e1bee7" stroke="#7b1fa2" strokeWidth="1" rx="5" ry="5"/>
  <text x="690" y="285" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#333">索引執行緒</text>
  
  {/* <!-- 渲染處理程序1 --> */}
  <rect x="50" y="340" width="350" height="120" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2" rx="8" ry="8"/>
  <text x="225" y="365" fontFamily="Arial" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#1976d2">渲染處理程序 - 分頁1</text>
  
  <rect x="70" y="380" width="100" height="60" fill="#bbdefb" stroke="#1976d2" strokeWidth="1" rx="5" ry="5"/>
  <text x="120" y="405" fontFamily="Arial" fontSize="14" textAnchor="middle" fill="#333">主執行緒</text>
  <text x="120" y="425" fontFamily="Arial" fontSize="11" textAnchor="middle" fill="#666">JS/DOM/渲染</text>
  
  <rect x="185" y="380" width="100" height="60" fill="#bbdefb" stroke="#1976d2" strokeWidth="1" rx="5" ry="5"/>
  <text x="235" y="405" fontFamily="Arial" fontSize="14" textAnchor="middle" fill="#333">Web Worker</text>
  <text x="235" y="425" fontFamily="Arial" fontSize="11" textAnchor="middle" fill="#666">背景JS處理</text>
  
  <rect x="300" y="380" width="80" height="60" fill="#bbdefb" stroke="#1976d2" strokeWidth="1" rx="5" ry="5"/>
  <text x="340" y="405" fontFamily="Arial" fontSize="14" textAnchor="middle" fill="#333">解析執行緒</text>
  <text x="340" y="425" fontFamily="Arial" fontSize="11" textAnchor="middle" fill="#666">HTML/CSS</text>
  
  {/* <!-- 渲染處理程序2 --> */}
  <rect x="420" y="340" width="330" height="120" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2" rx="8" ry="8"/>
  <text x="585" y="365" fontFamily="Arial" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#1976d2">渲染處理程序 - 分頁2</text>
  
  <rect x="440" y="380" width="100" height="60" fill="#bbdefb" stroke="#1976d2" strokeWidth="1" rx="5" ry="5"/>
  <text x="490" y="405" fontFamily="Arial" fontSize="14" textAnchor="middle" fill="#333">主執行緒</text>
  <text x="490" y="425" fontFamily="Arial" fontSize="11" textAnchor="middle" fill="#666">JS/DOM/渲染</text>
  
  <rect x="555" y="380" width="100" height="60" fill="#bbdefb" stroke="#1976d2" strokeWidth="1" rx="5" ry="5"/>
  <text x="605" y="405" fontFamily="Arial" fontSize="14" textAnchor="middle" fill="#333">Web Worker</text>
  <text x="605" y="425" fontFamily="Arial" fontSize="11" textAnchor="middle" fill="#666">背景JS處理</text>
  
  <rect x="670" y="380" width="60" height="60" fill="#bbdefb" stroke="#1976d2" strokeWidth="1" rx="5" ry="5"/>
  <text x="700" y="405" fontFamily="Arial" fontSize="14" textAnchor="middle" fill="#333">服務</text>
  <text x="700" y="425" fontFamily="Arial" fontSize="11" textAnchor="middle" fill="#666">Worker</text>
  
  {/* <!-- 插件處理程序 --> */}
  <rect x="50" y="480" width="300" height="100" fill="#fbe9e7" stroke="#d32f2f" strokeWidth="2" rx="8" ry="8"/>
  <text x="200" y="505" fontFamily="Arial" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#d32f2f">插件處理程序</text>
  
  <rect x="70" y="520" width="120" height="45" fill="#ffcdd2" stroke="#d32f2f" strokeWidth="1" rx="5" ry="5"/>
  <text x="130" y="545" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#333">插件主執行緒</text>
  
  <rect x="210" y="520" width="120" height="45" fill="#ffcdd2" stroke="#d32f2f" strokeWidth="1" rx="5" ry="5"/>
  <text x="270" y="545" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#333">插件工作執行緒</text>
  
  {/* <!-- 說明區域 --> */}
  <rect x="370" y="480" width="380" height="100" fill="#efebe9" stroke="#795548" strokeWidth="2" rx="8" ry="8"/>
  <text x="560" y="505" fontFamily="Arial" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#795548">說明</text>
  
  <rect x="390" y="520" width="20" height="20" fill="#e3f2fd" stroke="#1976d2" strokeWidth="1"/>
  <text x="420" y="535" fontFamily="Arial" fontSize="12" textAnchor="start" fill="#333">方框代表 Process</text>
  
  <rect x="390" y="550" width="15" height="15" fill="#bbdefb" stroke="#1976d2" strokeWidth="1" rx="3" ry="3"/>
  <text x="420" y="562" fontFamily="Arial" fontSize="12" textAnchor="start" fill="#333">圓角方框代表 Thread</text>
  
  <text x="560" y="535" fontFamily="Arial" fontSize="12" textAnchor="start" fill="#333">• 每個分頁有獨立的渲染處理程序</text>
  <text x="560" y="562" fontFamily="Arial" fontSize="12" textAnchor="start" fill="#333">• 處理程序之間透過IPC通訊</text>
</svg>
  );
}
