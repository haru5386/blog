'use client'
import { useState } from 'react';

export default function BitConverterTool() {
  const [char, setChar] = useState('🐶');

  // 取得 UTF-8 的十六進位與位元表示
  const getUtf8HexAndBits = (inputChar: string) => {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(inputChar);
    const hex = Array.from(encoded).map((b) => b.toString(16).padStart(2, '0'));
    const bits = Array.from(encoded).map((b) => b.toString(2).padStart(8, '0'));
    return { hex, bits };
  };

  // 取得 UTF-16 的十六進位與位元表示
  const getUtf16HexAndBits = (inputChar: string) => {
    const codeUnits = Array.from(inputChar).map((c) => c.charCodeAt(0));
    const hex = codeUnits.map((cu) => cu.toString(16).padStart(4, '0'));
    const bits = codeUnits.map((cu) => cu.toString(2).padStart(16, '0'));
    return { hex, bits };
  };

  const codePoint = char.codePointAt(0);
  const { hex: utf8Hex, bits: utf8Bits } = getUtf8HexAndBits(char);
  const { hex: utf16Hex, bits: utf16Bits } = getUtf16HexAndBits(char);

  return (
    <div className=" mx-auto p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md w-full">
      <h1 className="text-xl font-bold mb-4">UTF-8 / UTF-16 位元轉換工具</h1>
      <label className="block mb-2 font-medium">請輸入一個字元：</label>
      <input
        type="text"
        maxLength={2}
        value={char}
        onChange={(e) => setChar(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <div className="mb-2">
        <strong>Unicode 碼點：</strong> U+{codePoint?.toString(16).toUpperCase()} （十進位：{codePoint}）
      </div>

    <div className="flex gap-2">
      <div className="flex-1">
      <div className="mb-2">
        <strong>UTF-8 十六進位：</strong> {utf8Hex.join(' ').toUpperCase()}
      </div>
      <div className="mb-2">
        <strong>UTF-8 位元：</strong>
        <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap break-all text-sm">
          {utf8Bits.join(' ')}
        </pre>
      </div>
      <div className="mb-4">
        <strong>UTF-8 總位元數：</strong> {utf8Bits.length * 8} bit
      </div>
      </div>
      <div className="flex-1">
      <div className="mb-2">
        <strong>UTF-16 十六進位：</strong> {utf16Hex.join(' ').toUpperCase()}
      </div>
      <div className="mb-2">
        <strong>UTF-16 位元：</strong>
        <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap break-all text-sm">
          {utf16Bits.join(' ')}
        </pre>
      </div>
      <div>
        <strong>UTF-16 總位元數：</strong> {utf16Bits.length * 16} bit
      </div>
      </div>
      </div>
    </div>
  );
}
