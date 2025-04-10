"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Check, X, AlertCircle, Link, Unlink } from "lucide-react";

export default function MemoryManagementDemo() {
  const [activeTab, setActiveTab] = useState("heap-stack");
  const [stackObjects, setStackObjects] = useState<{ id: number; value: string | number | boolean | null; type: string }[]>([]);
  const [heapObjects, setHeapObjects] = useState<{ id: number; value: unknown; refs: number; size: number; circularRefs?: number[] }[]>([]);
  const [gcLogs, setGcLogs] = useState<{ time: string; message: string; type: string }[]>([]);
  const [leakingObjects, setLeakingObjects] = useState<{ id: number; count: number }[]>([]);
  const [leakWarning, setLeakWarning] = useState(false);
  const [nextId, setNextId] = useState(1);
  
  // 循環引用相關狀態
  const [circularRefGroups, setCircularRefGroups] = useState<{ id: number; objects: number[] }[]>([]);
  const [circularRefDetected, setCircularRefDetected] = useState(false);


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
      size,
      circularRefs: []
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
    
    // 檢查循環引用
    const circularGroups = findCircularReferences();
    if (circularGroups.length > 0) {
      setCircularRefDetected(true);
      addGcLog(`垃圾回收發現 ${circularGroups.length} 組循環引用，可能導致記憶體洩漏`, "warning");
    }
    
    // 標記-清除算法模擬
    setTimeout(() => {
      // 只移除引用計數為 0 且不在循環引用中的物件
      const removableIds = heapObjects
        .filter(obj => obj.refs === 0 && !isObjectInCircularRef(obj.id))
        .map(obj => obj.id);
      
      if (removableIds.length > 0) {
        setHeapObjects(prev => prev.filter(obj => obj.refs > 0 || isObjectInCircularRef(obj.id)));
        addGcLog(`垃圾回收已完成，清除了 ${removableIds.length} 個不再引用的物件`, "success");
      } else {
        addGcLog("垃圾回收已完成，沒有找到可回收的物件", "info");
        
        // 檢查是否有循環引用且無外部引用的物件
        const orphanedCircularGroups = circularRefGroups.filter(group => {
          return group.objects.every(id => {
            const obj = heapObjects.find(o => o.id === id);
            return obj && obj.refs === group.objects.length - 1; // 只有循環引用
          });
        });
        
        if (orphanedCircularGroups.length > 0) {
          addGcLog(`發現 ${orphanedCircularGroups.length} 組沒有外部引用的循環引用組合`, "warning");
        }
      }
    }, 1000);
  };

  // 檢查物件是否在任何循環引用組中
  const isObjectInCircularRef = (id: number) => {
    return circularRefGroups.some(group => group.objects.includes(id));
  };

  // 創建循環引用
  const createCircularReference = () => {
    // 需要至少兩個物件來創建循環引用
    if (heapObjects.length < 2) {
      addGcLog("需要至少兩個物件來創建循環引用", "warning");
      return;
    }
    
    // 隨機挑選兩個物件
    const availableObjects = heapObjects.filter(obj => !obj.circularRefs || obj.circularRefs.length === 0);
    if (availableObjects.length < 2) {
      addGcLog("沒有足夠的空閒物件來創建循環引用", "warning");
      return;
    }
    
    // 隨機選擇 2 到 3 個物件形成循環
    const count = Math.min(Math.floor(Math.random() * 2) + 2, availableObjects.length);
    const selectedIds = availableObjects
      .slice(0, count)
      .map(obj => obj.id);
    
    // 創建循環引用組
    const groupId = circularRefGroups.length + 1;
    setCircularRefGroups(prev => [...prev, {
      id: groupId,
      objects: selectedIds
    }]);
    
    // 更新每個物件的循環引用列表和引用計數
    setHeapObjects(prev => prev.map(obj => {
      if (selectedIds.includes(obj.id)) {
        // 為該物件添加所有其他選中的物件作為循環引用
        const circularRefs = selectedIds.filter(id => id !== obj.id);
        return {
          ...obj,
          refs: obj.refs + circularRefs.length, // 增加引用計數
          circularRefs
        };
      }
      return obj;
    }));
    
    addGcLog(`創建了一個包含 ${selectedIds.length} 個物件的循環引用組 (組 #${groupId})`, "info");
    setCircularRefDetected(true);
  };

  // 破解循環引用
  const breakCircularReference = (groupId: number) => {
    const group = circularRefGroups.find(g => g.id === groupId);
    if (!group) return;
    
    // 更新物件，移除循環引用關係
    setHeapObjects(prev => prev.map(obj => {
      if (group.objects.includes(obj.id)) {
        // 找出需要減少的引用數量
        const refsToRemove = (obj.circularRefs || []).filter(refId => 
          group.objects.includes(refId)
        ).length;
        
        return {
          ...obj,
          refs: obj.refs - refsToRemove, // 減少引用計數
          circularRefs: [] // 清空循環引用
        };
      }
      return obj;
    }));
    
    // 從循環引用組列表中移除該組
    setCircularRefGroups(prev => prev.filter(g => g.id !== groupId));
    
    addGcLog(`成功破解循環引用組 #${groupId}`, "success");
    
    // 檢查是否還有其他循環引用
    if (circularRefGroups.length <= 1) {
      setCircularRefDetected(false);
    }
    
    // 執行垃圾回收以清理可能被釋放的物件
    setTimeout(runGarbageCollection, 500);
  };

  // 檢測循環引用
  const findCircularReferences = () => {
    // 在實際應用中，這將使用深度優先搜索或其他算法來檢測
    // 這裡我們直接返回已知的循環引用組
    return circularRefGroups;
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">JavaScript 記憶體管理互動式示範</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="heap-stack">堆與棧</TabsTrigger>
          <TabsTrigger value="garbage-collection">垃圾回收</TabsTrigger>
          <TabsTrigger value="circular-references">循環引用</TabsTrigger>
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
                        {(obj.circularRefs && obj.circularRefs.length > 0) && (
                          <Badge className="ml-2 bg-yellow-500">循環引用</Badge>
                        )}
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
                            {(obj.circularRefs && obj.circularRefs.length > 0) && (
                              <Badge className="ml-2 bg-yellow-500">循環引用</Badge>
                            )}
                          </div>
                        </div>
                        {obj.refs === 0 && !isObjectInCircularRef(obj.id) && (
                          <p className="text-xs text-red-500 mt-1">此物件已標記為可回收</p>
                        )}
                        {obj.refs === 0 && isObjectInCircularRef(obj.id) && (
                          <p className="text-xs text-yellow-500 mt-1">引用計數為 0 但處於循環引用中，無法自動回收</p>
                        )}
                        {(obj.circularRefs && obj.circularRefs.length > 0) && (
                          <p className="text-xs text-blue-500 mt-1">
                            循環引用: {obj.circularRefs.map(id => `#${id}`).join(', ')}
                          </p>
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
                <h3 className="text-lg font-medium mb-2">垃圾回收演算法</h3>
                <div className="grid grid-cols-1 gap-6">
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
              </div>
              

            </CardContent>
          </Card>
        </TabsContent>
        
        {/* 循環引用的演示 */}
        <TabsContent value="circular-references">
          <Card>
            <CardHeader>
              <CardTitle>循環引用（Circular References）</CardTitle>
              <CardDescription>
                當物件之間互相引用形成閉環，可能導致引用計數無法降到 0
              </CardDescription>
            </CardHeader>
            <CardContent>
              {circularRefDetected && (
                <Alert className="mb-6 bg-yellow-50 border-yellow-200">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertTitle className="text-yellow-700">偵測到循環引用</AlertTitle>
                  <AlertDescription className="text-yellow-600">
                    有物件形成循環引用，這可能導致基於引用計數的垃圾回收無法回收這些物件，從而導致記憶體洩漏。
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">循環引用群組</h3>
                  <div className="border rounded-md p-4 h-64 overflow-y-auto">
                    {circularRefGroups.map(group => (
                      <div key={group.id} className="p-3 mb-2 bg-yellow-50 border border-yellow-200 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <Badge variant="outline" className="bg-yellow-100 border-yellow-400 text-yellow-700">
                            循環引用組 #{group.id}
                          </Badge>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 text-yellow-700 border-yellow-400 hover:bg-yellow-100" 
                            onClick={() => breakCircularReference(group.id)}
                          >
                            <Unlink className="h-4 w-4 mr-1" />
                            破解循環
                          </Button>
                        </div>
                        <div className="p-2 bg-white rounded">
                          <p className="text-sm mb-1 font-medium">包含的物件:</p>
                          <div className="flex flex-wrap gap-1">
                            {group.objects.map(objId => {
                              const obj = heapObjects.find(o => o.id === objId);
                              return (
                                <Badge key={objId} className="bg-gray-100 text-gray-700 mb-1">
                                  #{objId} ({obj ? `${obj.refs}引用` : '未知'})
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-yellow-600">
                          <p>
                            <AlertTriangle className="inline h-3 w-3 mr-1" />
                            這些物件互相引用形成一個循環，使得引用計數無法歸零
                          </p>
                        </div>
                      </div>
                    ))}
                    {circularRefGroups.length === 0 && (
                      <div className="text-gray-500 text-center my-10">
                        沒有偵測到循環引用
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Button onClick={createCircularReference}>
                      <Link className="h-4 w-4 mr-1" />
                      創建循環引用
                    </Button>
                    <Button variant="outline" onClick={runGarbageCollection}>
                      偵測循環引用
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">循環引用示意圖</h3>
                  <div className="border rounded-md p-4 h-64 bg-white flex items-center justify-center">
                    {circularRefGroups.length > 0 ? (
                      <div className="text-center">
                        <div className="flex justify-center mb-4">
                          {circularRefGroups[0].objects.map((objId, index) => (
                            <div key={objId} className="relative">
                              <div className="w-16 h-16 mx-2 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center">
                                <span className="font-bold">#{objId}</span>
                              </div>
                              {index < circularRefGroups[0].objects.length - 1 && (
                                <div className="absolute top-1/2 right-0 w-8 h-0.5 bg-red-400 transform translate-x-1/2"></div>
                              )}
                              {index === circularRefGroups[0].objects.length - 1 && (
                                <div className="absolute -bottom-4 left-1/2 h-8 w-0.5 bg-red-400 transform -translate-x-1/2"></div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="w-32 h-0.5 bg-red-400 mx-auto"></div>
                        <div className="mt-4 text-sm text-gray-600">
                          這些物件互相引用形成一個閉環，<br />
                          導致基於引用計數的垃圾回收無法釋放它們
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-500 text-center">
                        創建循環引用以查看示意圖
                      </div>
                    )}
                  </div>
                  </div>
                  <div className="md:col-span-2">
                  <Card className="mt-2 gap-1">
                    <CardHeader className="">
                      <CardTitle className="text-base">循環引用問題</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        循環引用是引用計數垃圾回收的一大挑戰。當物件互相引用形成閉環時，即使這些物件不再被外部引用，
                        其引用計數也不會降到零，因此不會被自動回收。現代 JavaScript 引擎使用標記-清除算法來解決這個問題。
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="memory-leaks">
          <Card>
            <CardHeader>
              <CardTitle>記憶體洩漏（Memory Leaks）</CardTitle>
              <CardDescription>
                當記憶體沒有被正確釋放時，程式會持續消耗更多記憶體
              </CardDescription>
            </CardHeader>
            <CardContent>
              {leakWarning && (
                <Alert className="mb-6 bg-red-50 border-red-200">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertTitle className="text-red-700">偵測到記憶體洩漏</AlertTitle>
                  <AlertDescription className="text-red-600">
                    有物件持續增加記憶體使用量，這可能導致應用程式效能下降甚至崩潰。
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">記憶體使用狀況</h3>
                  <div className="border rounded-md p-4 h-64 overflow-y-auto">
                    {leakingObjects.map(obj => (
                      <div key={obj.id} className="p-3 mb-2 bg-red-50 border border-red-200 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <Badge variant="outline" className="bg-red-100 border-red-400 text-red-700">
                            洩漏物件 #{obj.id}
                          </Badge>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 text-red-700 border-red-400 hover:bg-red-100" 
                            onClick={() => fixMemoryLeak(obj.id)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            修復洩漏
                          </Button>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-red-600 h-2.5 rounded-full" 
                            style={{ width: `${Math.min(obj.count * 10, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">記憶體使用量</span>
                          <span className="text-xs text-gray-500">{obj.count * 10}MB</span>
                        </div>
                        <div className="mt-2 text-xs text-red-600">
                          <p>
                            <AlertTriangle className="inline h-3 w-3 mr-1" />
                            此物件每秒增加 10MB 的記憶體使用量
                          </p>
                        </div>
                      </div>
                    ))}
                    {leakingObjects.length === 0 && (
                      <div className="text-gray-500 text-center my-10">
                        沒有偵測到記憶體洩漏
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Button onClick={createMemoryLeak} variant="secondary">
                      模擬記憶體洩漏
                    </Button>
                    <Button variant="outline" onClick={() => {
                      leakingObjects.forEach(obj => fixMemoryLeak(obj.id));
                      addGcLog("已修復所有記憶體洩漏", "success");
                    }}>
                      修復所有洩漏
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">常見記憶體洩漏原因</h3>
                  <div className="border rounded-md p-4 h-64 overflow-y-auto">
                    <div className="mb-4">
                      <h4 className="font-medium text-red-700 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        閉包未正確釋放
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        當閉包中的函數持有對外部變數的引用，而這些函數被長時間保存（如事件監聽器），
                        可能導致相關的變數無法被垃圾回收。
                      </p>
                      <div className="bg-gray-100 p-2 rounded mt-1 text-xs">
                        <code>
                          function setupHandler() &#123;<br />
                          &nbsp;&nbsp;const largeData = new Array(10000);<br />
                          &nbsp;&nbsp;element.addEventListener(&apos;click&apos;, () =&gt; &#123;<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;console.log(largeData.length); // 持有對 largeData 的引用<br />
                          &nbsp;&nbsp;&#125;);<br />
                          &#125;
                        </code>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-red-700 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        未移除的事件監聽器
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        當元素被移除但其事件監聽器未被清除時，相關的回調函數和上下文可能仍被保留在記憶體中。
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-red-700 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        定時器未清除
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        setInterval 或 setTimeout 創建的定時器如果沒有通過 clearInterval 或 clearTimeout 清除，
                        其回調函數及相關上下文可能會一直保留在記憶體中。
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-red-700 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        全局變數濫用
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        全局變數在應用程式的整個生命週期內都存在，如果不小心將大量數據存儲為全局變數，
                        可能導致記憶體持續增長。
                      </p>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-red-700 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        DOM 被移除但還被引用
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                      在一個 SPA 或動態網頁中建立了一個 DOM 元素，並儲存到變數中，後來你從畫面上移除了這個元素，但是忘了把 JS 裡的引用也清掉。
                      </p>
                    </div>


                  </div>
                  </div>
                  <div className="md:col-span-2">
                  
                  <Card className="mt-2 gap-2">
                    <CardHeader>
                      <CardTitle className="text-base">檢測與修復記憶體洩漏</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        可以使用 Chrome DevTools 的 Memory 面板來檢測記憶體洩漏。
                        通過多次創建堆快照（Heap Snapshot）並比較差異，可以找出隨時間增長的物件。
                        修復記憶體洩漏通常涉及清理未使用的引用、移除事件監聽器、清除定時器等。
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <div>
                  <h3 className="text-lg font-medium mb-2">垃圾回收日誌</h3>
                  <div className="border rounded-md p-4 h-64 overflow-y-auto">
                    {gcLogs.map((log, index) => (
                      <div key={index} className="mb-2 text-sm">
                        <span className="text-gray-500">[{log.time}]</span>{' '}
                        {log.type === 'warning' && <AlertTriangle className="inline h-4 w-4 text-yellow-500 mr-1" />}
                        {log.type === 'success' && <Check className="inline h-4 w-4 text-green-500 mr-1" />}
                        {log.type === 'info' && <AlertCircle className="inline h-4 w-4 text-blue-500 mr-1" />}
                        {log.message}
                      </div>
                    ))}
                    {gcLogs.length === 0 && (
                      <div className="text-gray-500 text-center my-10">沒有垃圾回收活動</div>
                    )}
                  </div>
                </div>
      </Tabs>
    </div>
  );
}