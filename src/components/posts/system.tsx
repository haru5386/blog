"use client"
// components/ProcessSimulator.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";

const ProcessBlock = ({ title }: { title: string }) => {
  const blockRef = React.useRef(null);

  React.useEffect(() => {
    gsap.fromTo(
      blockRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  return (
    <div
      ref={blockRef}
      className="p-4 rounded-2xl shadow-md bg-white text-sm border w-64"
    >
      <p className="font-bold text-base mb-2">{title}</p>
      <div className="space-y-2">
        <div className="bg-gray-100 p-2 rounded">🧠 Call Stack</div>
        <div className="bg-gray-100 p-2 rounded">📦 Heap</div>
        <div className="bg-gray-100 p-2 rounded">🔄 Event Loop</div>
      </div>
    </div>
  );
};

const BrowserTabBlock = () => {
  const blockRef = React.useRef(null);

  React.useEffect(() => {
    gsap.fromTo(
      blockRef.current,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  return (
    <div
      ref={blockRef}
      className="p-4 rounded-2xl shadow-md bg-blue-50 text-sm border w-64"
    >
      <p className="font-bold text-base mb-2">🌐 Chrome Tab</p>
      <div className="space-y-2">
        <div className="bg-white p-2 rounded">🧠 JS Context</div>
        <div className="bg-white p-2 rounded">🎨 DOM</div>
        <div className="bg-white p-2 rounded">📡 Web API</div>
      </div>
    </div>
  );
};

export default function ProcessSimulator() {
  const [showBrowser, setShowBrowser] = useState(false);
  const [showNode, setShowNode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStartAnimation = () => {
    setIsAnimating(true);

    // GSAP動畫示範
    gsap.to(".process-block", {
      opacity: 1,
      duration: 2,
      ease: "power2.out",
    });

    gsap.from(".process-thread div", {
      x: -100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "bounce.out",
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="space-x-4">
        <Button onClick={() => setShowBrowser(true)}>開啟 Chrome tab</Button>
        <Button onClick={() => setShowNode(true)}>執行 node main.js</Button>
      </div>

      <div className="flex gap-8 mt-4 flex-wrap">
        {showBrowser && <BrowserTabBlock />}
        {showNode && (
          <div className="process-block">
            <ProcessBlock title="🖥️ Node Process" />
            <div className="process-thread">
              <div>🧠 Main Thread</div>
              <div>📦 Background Thread</div>
              <div>🔄 IPC Communication</div>
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={handleStartAnimation}
        disabled={isAnimating}
        className="mt-6"
      >
        開始模擬動畫
      </Button>
    </div>
  );
}
