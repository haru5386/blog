'use client'
import { useState } from 'react'

export default function Base64PadDemo() {
  const [input, setInput] = useState('Hi')

  const encodeBase64 = (str: string) => {
    const encoder = new TextEncoder()
    const bytes = encoder.encode(str)
    const binary = Array.from(bytes)
      .map((b) => b.toString(2).padStart(8, '0'))
      .join('')

    const chunks = binary.match(/.{1,6}/g) || []
    const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    const encoded = chunks.map((chunk) =>
      base64Chars[parseInt(chunk.padEnd(6, '0'), 2)]
    )

    while (encoded.length % 4 !== 0) {
      encoded.push('=')
    }

    return {
      binary,
      base64: encoded.join(''),
      padding: encoded.filter((c) => c === '=').length,
    }
  }

  const { binary, base64, padding } = encodeBase64(input)

  return (
    <div className="p-4 border rounded shadow bg-white dark:bg-slate-800 text-sm">
      <label className="block mb-2 font-medium">請輸入文字：</label>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <div className="mb-2"><strong>UTF-8 Binary：</strong> {binary}</div>
      <div className="mb-2"><strong>Base64：</strong> {base64}</div>
      <div><strong>補齊的 `=` 數量：</strong> {padding}</div>
    </div>
  )
}
