'use client'
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, Layers } from 'lucide-react';

export default function TCPIPVisualization() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [direction, setDirection] = useState('down'); // 'down' or 'up'
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const layers = [
    {
      name: '应用层',
      protocols: ['HTTP', 'FTP', 'SMTP', 'DNS', 'SSH'],
      description: '负责应用程序间通信，提供用户接口和服务。如网页浏览、文件传输、电子邮件等服务。',
      color: '#3b82f6' // blue
    },
    {
      name: '传输层',
      protocols: ['TCP', 'UDP'],
      description: '负责端到端的连接管理、数据分段、流量控制和错误校验，确保数据可靠传输。',
      color: '#10b981' // emerald
    },
    {
      name: '网络层',
      protocols: ['IP', 'ICMP', 'ARP'],
      description: '处理数据包路由、寻址和转发，实现跨网络通信，负责数据包从源到目的地的传递。',
      color: '#f59e0b' // amber
    },
    {
      name: '链路层',
      protocols: ['以太网', 'Wi-Fi', 'PPP'],
      description: '负责设备间的物理连接和数据帧的传输，包括错误检测和媒体访问控制。',
      color: '#ef4444' // red
    }
  ];

  const animatePacket = () => {
    const timeline = gsap.timeline();
    const packet = document.querySelector('.data-packet');
    const initialTop = direction === 'down' ? 80 : 320;
    const targetTop = direction === 'down' ? 320 : 80;
    
    gsap.set(packet, { 
      top: initialTop, 
      left: '50%', 
      xPercent: -50,
      opacity: 1,
      display: 'flex'
    });
    
    timeline.to(packet, {
      top: targetTop,
      duration: 2,
      ease: "power1.inOut",
      onComplete: () => {
        gsap.to(packet, { opacity: 0, duration: 0.3 });
      }
    });
  };

  const handleDirectionChange = (newDirection: 'down' | 'up') => {
    setDirection(newDirection);
  };

  const handleLayerClick = (index: number | null) => {
    setActiveLayer(activeLayer === index ? null : index);
  };

  useEffect(() => {
    // Initialize layer animations
    layersRef.current.forEach((layer, index) => {
      gsap.fromTo(layer, 
        { x: -20, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.5, delay: index * 0.1 }
      );
    });
  }, []);

  return (
    <div className="w-full p-6 bg-gray-50 rounded-lg">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-2xl font-bold mb-2">TCP/IP 协议栈可视化</h1>
        <div className="flex space-x-2 mb-4">
          <Button 
            variant={direction === 'down' ? "default" : "outline"}
            size="sm"
            onClick={() => handleDirectionChange('down')}
          >
            <ArrowDown className="mr-1 h-4 w-4" /> 发送数据
          </Button>
          <Button 
            variant={direction === 'up' ? "default" : "outline"} 
            size="sm"
            onClick={() => handleDirectionChange('up')}
          >
            <ArrowUp className="mr-1 h-4 w-4" /> 接收数据
          </Button>
        </div>
      </div>

      <div className="relative h-96 bg-white rounded-lg shadow-md p-4 overflow-hidden">
        {/* TCP/IP Layers */}
        <div className="flex flex-col h-full">
          {layers.map((layer, index) => (
            <div 
              key={index}
              ref={el => { layersRef.current[index] = el; }}
              className={`relative flex-1 border border-gray-200 rounded-md mb-1 p-2 cursor-pointer transition-all duration-300 hover:shadow-md ${activeLayer === index ? 'shadow-lg' : ''}`}
              style={{ 
                backgroundColor: `${layer.color}10`,
                borderLeftWidth: '4px',
                borderLeftColor: layer.color
              }}
              onClick={() => handleLayerClick(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{layer.name}</h3>
                <div className="text-xs bg-gray-100 rounded px-2 py-1">
                  {layer.protocols.join(', ')}
                </div>
              </div>
              
              {activeLayer === index && (
                <div className="mt-2 text-sm text-gray-600 animate-fadeIn">
                  {layer.description}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Data Packet Animation */}
        <div className="data-packet absolute hidden w-16 h-8 bg-purple-500 text-white text-xs flex items-center justify-center rounded-md opacity-0">
          数据包
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <Button onClick={animatePacket} size="sm">
          <Layers className="mr-2 h-4 w-4" />
          模拟{direction === 'down' ? '发送' : '接收'}过程
        </Button>
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">概述</TabsTrigger>
          <TabsTrigger value="encapsulation">数据封装</TabsTrigger>
          <TabsTrigger value="protocols">主要协议</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-2">
          <Card>
            <CardHeader>
              <CardTitle>TCP/IP 模型概述</CardTitle>
              <CardDescription>互联网通信的基础架构</CardDescription>
            </CardHeader>
            <CardContent>
              <p>TCP/IP协议栈是互联网的基础，由四个层次组成，每层负责不同的通信任务。从应用层到链路层，数据在发送时逐层封装，接收时逐层解析，实现了不同网络设备间的可靠通信。</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="encapsulation" className="mt-2">
          <Card>
            <CardHeader>
              <CardTitle>数据封装过程</CardTitle>
              <CardDescription>数据如何在各层之间传递</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                <li>应用层：生成原始数据</li>
                <li>传输层：添加TCP/UDP头部（端口信息）</li>
                <li>网络层：添加IP头部（IP地址）</li>
                <li>链路层：添加MAC头部（物理地址）</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="protocols" className="mt-2">
          <Card>
            <CardHeader>
              <CardTitle>主要协议</CardTitle>
              <CardDescription>每层的关键协议及其功能</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div><strong>应用层</strong>: HTTP(网页)、FTP(文件传输)、SMTP(邮件)、DNS(域名解析)</div>
                <div><strong>传输层</strong>: TCP(可靠传输)、UDP(快速传输)</div>
                <div><strong>网络层</strong>: IP(寻址和路由)、ICMP(错误报告)、ARP(地址解析)</div>
                <div><strong>链路层</strong>: 以太网、Wi-Fi、PPP(点对点协议)</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}