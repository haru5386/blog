'use client'
import { useState } from 'react';

export default function BitConverterTool() {
  const [char, setChar] = useState('🐶');

  const getUtf8HexAndBits = (inputChar: string) => {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(inputChar);
    const hex = Array.from(encoded).map((b) => b.toString(16).padStart(2, '0'));
    const bits = Array.from(encoded).map((b) => b.toString(2).padStart(8, '0'));
    return { hex, bits };
  };

  const { hex, bits } = getUtf8HexAndBits(char);

  return (
    <div className="max-w-md mx-auto p-4 bg-white dark:bg-slate-900 rounded-xl shadow-md">
      <h1 className="text-xl font-bold mb-4">🔤 UTF-8 位元轉換小工具</h1>
      <label className="block mb-2 font-medium">請輸入一個字元：</label>
      <input
        type="text"
        maxLength={2}
        value={char}
        onChange={(e) => setChar(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <div className="mb-2">
        <strong>Unicode：</strong> U+{char.codePointAt(0)?.toString(16).toUpperCase()}
      </div>
      <div className="mb-2">
        <strong>UTF-8 十六進位：</strong> {hex.join(' ').toUpperCase()}
      </div>
      <div className="mb-2">
        <strong>位元（bit）：</strong>
        <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap break-all text-sm">
          {bits.join(' ')}
        </pre>
      </div>
      <div>
        <strong>總位元數：</strong> {bits.length * 8} bit
      </div>
    </div>
  );
}
