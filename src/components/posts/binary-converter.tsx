'use client'

import { useState } from 'react'

export default function TransferBaseConverter() {
  const [binary, setBinary] = useState('')
  const [decimal, setDecimal] = useState('')
  const [hex, setHex] = useState('')

  const updateFromBinary = (val: string) => {
    const clean = val.replace(/[^01]/g, '')
    setBinary(clean)
    const dec = parseInt(clean || '0', 2)
    setDecimal(dec.toString())
    setHex(dec.toString(16).toUpperCase())
  }

  const updateFromDecimal = (val: string) => {
    const clean = val.replace(/\D/g, '')
    setDecimal(clean)
    const dec = parseInt(clean || '0', 10)
    setBinary(dec.toString(2))
    setHex(dec.toString(16).toUpperCase())
  }

  const updateFromHex = (val: string) => {
    const clean = val.replace(/[^0-9A-Fa-f]/g, '').toUpperCase()
    setHex(clean)
    const dec = parseInt(clean || '0', 16)
    setDecimal(dec.toString())
    setBinary(dec.toString(2))
  }

  return (
    <div className="space-y-4 my-6">
      <div>
        <label className="block font-bold mb-1">Binary（二進位）</label>
        <input
          type="text"
          value={binary}
          onChange={(e) => updateFromBinary(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="例如：10101100"
        />
      </div>

      <div>
        <label className="block font-bold mb-1">Decimal（十進位）</label>
        <input
          type="text"
          value={decimal}
          onChange={(e) => updateFromDecimal(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="例如：172"
        />
      </div>

      <div>
        <label className="block font-bold mb-1">Hexadecimal（十六進位）</label>
        <input
          type="text"
          value={hex}
          onChange={(e) => updateFromHex(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="例如：AC"
        />
      </div>
    </div>
  )
}