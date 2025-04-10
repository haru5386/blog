// app/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {  AlertTriangle, Check, X } from "lucide-react";

export default function MemoryManagementDemo() {
  const [activeTab, setActiveTab] = useState("heap-stack");
  const [stackObjects, setStackObjects] = useState<{ id: number; value: string | number | boolean | null; type: string }[]>([]);
  const [heapObjects, setHeapObjects] = useState<{ id: number; value: unknown; refs: number; size: number }[]>([]);
  const [gcLogs, setGcLogs] = useState<{ time: string; message: string; type: string }[]>([]);
  const [leakingObjects, setLeakingObjects] = useState<{ id: number; count: number }[]>([]);
  const [leakWarning, setLeakWarning] = useState(false);
  const [nextId, setNextId] = useState(1);

  // 添加棧上的基本型別
  const addStackValue = () => {
    const types = ["number", "boolean", "string", "undefined"];
    const randomType = types[Math.floor(Math.random() * types.length)];
    let value;
    
    switch (randomType) {
      case "number":
        value = Math.floor(Math.random() * 1000);
        break;
      case "boolean":
        value = Math.random() > 0.5;
        break;
      case "string":
        value = `字串-${Math.floor(Math.random() * 100)}`;
        break;
      case "undefined":
        value = "undefined";
        break;
      default:
        value = null;
    }
    
    setStackObjects(prev => [...prev, { id: nextId, value, type: randomType }]);
    setNextId(prevId => prevId + 1);
    
    // 超過 5 個項目時自動移除最舊的項目，模擬棧的自動清理
    setTimeout(() => {
      setStackObjects(prev => {
        if (prev.length > 5) {
          return prev.slice(1);
        }
        return prev;
      });
      addGcLog("自動釋放棧上不再使用的變數", "info");
    }, 3000);
  };

  // 添加堆上的複雜型別
  const addHeapObject = () => {
    const size = Math.floor(Math.random() * 50) + 10;
    const newObject = {
      id: nextId,
      value: Array(size).fill(0).map(() => Math.random().toString(36).substring(2, 15)),
      refs: 1,
      size
    };
    
    setHeapObjects(prev => [...prev, newObject]);
    setNextId(prevId => prevId + 1);
    addGcLog(`建立大小為 ${size}KB 的新物件`, "info");
  };

  // 增加引用計數
  const addReference = (id: number) => {
    setHeapObjects(prev => 
      prev.map(obj => 
        obj.id === id ? { ...obj, refs: obj.refs + 1 } : obj
      )
    );
    addGcLog(`增加物件 #${id} 的引用計數`, "info");
  };

  // 減少引用計數
  const removeReference = (id: number) => {
    setHeapObjects(prev => {
      const updated = prev.map(obj => 
        obj.id === id ? { ...obj, refs: Math.max(0, obj.refs - 1) } : obj
      );
      
      // 引用計數為 0 的物件稍後將被回收
      const toRemove = updated.filter(obj => obj.refs === 0).map(obj => obj.id);
      if (toRemove.length > 0) {
        setTimeout(() => {
          setHeapObjects(current => 
            current.filter(obj => obj.refs > 0)
          );
          addGcLog(`垃圾回收已清除引用計數為 0 的物件：#${toRemove.join(", #")}`, "success");
        }, 2000);
      }
      
      return updated;
    });
    addGcLog(`減少物件 #${id} 的引用計數`, "info");
  };

  // 模擬記憶體洩漏
  const createMemoryLeak = () => {
    const leakId = nextId;
    setNextId(prevId => prevId + 1);
    
    // 新增洩漏物件計數
    setLeakingObjects(prev => [...prev, { id: leakId, count: 1 }]);
    
    // 模擬持續增加的記憶體洩漏
    const leakInterval = setInterval(() => {
      setLeakingObjects(prev => 
        prev.map(obj => 
          obj.id === leakId ? { ...obj, count: obj.count + 1 } : obj
        )
      );
    }, 1000);
    
    addGcLog(`警告：建立了一個可能的記憶體洩漏 #${leakId}`, "warning");
    
    // 5 秒後顯示洩漏警告
    setTimeout(() => {
      setLeakWarning(true);
    }, 5000);
    
    // 清理函數 - 在真實情況不會執行，這裡是為了演示
    return () => {
      clearInterval(leakInterval);
      setLeakingObjects(prev => prev.filter(obj => obj.id !== leakId));
    };
  };

  // 修復記憶體洩漏
  const fixMemoryLeak = (id: number) => {
    setLeakingObjects(prev => prev.filter(obj => obj.id !== id));
    addGcLog(`修復了記憶體洩漏 #${id}`, "success");
    
    if (leakingObjects.length <= 1) {
      setLeakWarning(false);
    }
  };

  // 添加 GC 日誌
  const addGcLog = (message: string, type: string) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    setGcLogs(prev => [{
      time: timeStr,
      message,
      type
    }, ...prev].slice(0, 10)); // 只保留最新的 10 條日誌
  };

  // 執行垃圾回收
  const runGarbageCollection = () => {
    addGcLog("啟動垃圾回收...", "info");
    
    // 標記-清除算法模擬
    setTimeout(() => {
      const removedCount = heapObjects.filter(obj => obj.refs === 0).length;
      setHeapObjects(prev => prev.filter(obj => obj.refs > 0));
      
      if (removedCount > 0) {
        addGcLog(`垃圾回收已完成，清除了 ${removedCount} 個不再引用的物件`, "success");
      } else {
        addGcLog("垃圾回收已完成，沒有找到可回收的物件", "info");
      }
    }, 1000);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">JavaScript 記憶體管理互動式示範</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="heap-stack">堆與棧</TabsTrigger>
          <TabsTrigger value="garbage-collection">垃圾回收</TabsTrigger>
          <TabsTrigger value="memory-leaks">記憶體洩漏</TabsTrigger>
        </TabsList>
        
        {/* 堆與棧的演示 */}
        <TabsContent value="heap-stack">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>棧（Stack）</CardTitle>
                <CardDescription>
                  儲存基本資料類型，大小固定且有限，訪問速度快
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64 overflow-y-auto border rounded-md p-4 flex flex-col-reverse">
                {stackObjects.map(obj => (
                  <div key={obj.id} className="p-2 mb-2 bg-gray-100 rounded flex justify-between items-center">
                    <div>
                      <Badge variant="outline">{obj.type}</Badge>
                      <span className="ml-2">{String(obj.value)}</span>
                    </div>
                    <Badge>{obj.id}</Badge>
                  </div>
                ))}
                {stackObjects.length === 0 && (
                  <div className="text-gray-500 text-center my-10">棧是空的，請添加基本型別</div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={addStackValue} className="w-full">添加基本型別變數</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>堆（Heap）</CardTitle>
                <CardDescription>
                  儲存複雜資料類型，動態分配空間，需要垃圾回收
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64 overflow-y-auto border rounded-md p-4">
                {heapObjects.map(obj => (
                  <div key={obj.id} className="p-2 mb-2 bg-gray-100 rounded">
                    <div className="flex justify-between mb-1">
                      <Badge variant="outline">物件 #{obj.id}</Badge>
                      <div>
                        <Badge className={obj.refs === 0 ? "bg-red-500" : ""}>{obj.refs} 引用</Badge>
                        <Badge variant="outline" className="ml-2">{obj.size}KB</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline" onClick={() => addReference(obj.id)}>
                        增加引用
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => removeReference(obj.id)}>
                        減少引用
                      </Button>
                    </div>
                  </div>
                ))}
                {heapObjects.length === 0 && (
                  <div className="text-gray-500 text-center my-10">堆是空的，請添加物件</div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={addHeapObject} className="w-full">添加物件到堆</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* 垃圾回收的演示 */}
        <TabsContent value="garbage-collection">
          <Card>
            <CardHeader>
              <CardTitle>垃圾回收機制（Garbage Collection）</CardTitle>
              <CardDescription>
                JavaScript 自動管理記憶體，釋放不再使用的物件
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">堆物件狀態</h3>
                  <div className="border rounded-md p-4 h-64 overflow-y-auto">
                    {heapObjects.map(obj => (
                      <div key={obj.id} className="p-2 mb-2 bg-gray-100 rounded">
                        <div className="flex justify-between">
                          <Badge variant="outline">物件 #{obj.id}</Badge>
                          <div>
                            <Badge className={obj.refs === 0 ? "bg-red-500" : ""}>
                              {obj.refs} 引用
                            </Badge>
                            <Badge variant="outline" className="ml-2">{obj.size}KB</Badge>
                          </div>
                        </div>
                        {obj.refs === 0 && (
                          <p className="text-xs text-red-500 mt-1">此物件已標記為可回收</p>
                        )}
                      </div>
                    ))}
                    {heapObjects.length === 0 && (
                      <div className="text-gray-500 text-center my-10">堆是空的，請添加物件</div>
                    )}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button onClick={addHeapObject}>添加物件</Button>
                    <Button variant="outline" onClick={runGarbageCollection}>執行垃圾回收</Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">垃圾回收日誌</h3>
                  <div className="border rounded-md p-4 h-64 overflow-y-auto">
                    {gcLogs.map((log, index) => (
                      <div key={index} className="mb-2 text-sm">
                        <span className="text-gray-500">[{log.time}]</span>{' '}
                        {log.type === 'warning' && <AlertTriangle className="inline h-4 w-4 text-yellow-500 mr-1" />}
                        {log.type === 'success' && <Check className="inline h-4 w-4 text-green-500 mr-1" />}
                        {log.type === 'info' && <div className="inline h-4 w-4 text-blue-500 mr-1" />}
                        {log.message}
                      </div>
                    ))}
                    {gcLogs.length === 0 && (
                      <div className="text-gray-500 text-center my-10">沒有垃圾回收活動</div>
                    )}
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="text-lg font-medium mb-4">垃圾回收演算法</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>標記-清除（Mark and Sweep）</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        從根物件開始，標記所有可到達的物件，然後清除未被標記的物件。
                        在這個演示中，引用計數為 0 的物件將被標記為可清除。
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>引用計數（Reference Counting）</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        追蹤每個物件被引用的次數，當引用計數降為零時釋放物件。
                        可以使用「增加引用」和「減少引用」按鈕來模擬。
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* 記憶體洩漏的演示 */}
        <TabsContent value="memory-leaks">
          <Card>
            <CardHeader>
              <CardTitle>記憶體洩漏（Memory Leaks）</CardTitle>
              <CardDescription>
                記憶體洩漏發生在不再使用的物件未被垃圾回收的情況
              </CardDescription>
            </CardHeader>
            <CardContent>
              {leakWarning && (
                <Alert variant="destructive" className="mb-6">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>記憶體洩漏警告！</AlertTitle>
                  <AlertDescription>
                    偵測到記憶體使用量持續增加，可能存在記憶體洩漏。請檢查未清理的計時器、事件監聽器或閉包。
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">記憶體洩漏模擬</h3>
                  <div className="border rounded-md p-4 h-64 overflow-y-auto">
                    {leakingObjects.map(obj => (
                      <div key={obj.id} className="p-3 mb-2 bg-red-50 border border-red-200 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <Badge variant="outline" className="bg-red-100">
                            洩漏 #{obj.id}
                          </Badge>
                          <Badge variant="destructive">
                            {obj.count * 10}KB 記憶體洩漏
                          </Badge>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                          <div 
                            className="bg-red-600 h-2.5 rounded-full" 
                            style={{ width: `${Math.min(100, obj.count * 5)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-red-600">
                            洩漏物件已存活 {obj.count} 秒
                          </span>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8" 
                            onClick={() => fixMemoryLeak(obj.id)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            修復洩漏
                          </Button>
                        </div>
                      </div>
                    ))}
                    {leakingObjects.length === 0 && (
                      <div className="text-gray-500 text-center my-10">
                        沒有偵測到記憶體洩漏
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <Button onClick={createMemoryLeak}>
                      模擬記憶體洩漏
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">常見的記憶體洩漏原因</h3>
                  <div className="space-y-3">
                    <Card>
                      <CardContent className="pt-6">
                        <h4 className="font-medium">1. 意外的全域變數</h4>
                        <p className="text-sm text-gray-600">
                          未使用 var、let 或 const 宣告的變數會被添加到全域物件，無法被回收。
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <h4 className="font-medium">2. 被遺忘的計時器和回調</h4>
                        <p className="text-sm text-gray-600">
                          未清理的 setInterval 或事件監聽器會導致其閉包和相關變數無法被回收。
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <h4 className="font-medium">3. DOM 引用</h4>
                        <p className="text-sm text-gray-600">
                          保留對已從頁面移除的 DOM 元素的引用會阻止垃圾回收。
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <h4 className="font-medium">4. 循環引用</h4>
                        <p className="text-sm text-gray-600">
                          兩個或多個物件互相引用，導致引用計數無法歸零。
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}