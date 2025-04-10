"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

const initialHeap = {
  A: ['B'],
  B: ['C'],
  C: [],
  D: [],
}

const GarbageCollector = () => {
  const [heap, setHeap] = useState(initialHeap)
  const [reachable, setReachable] = useState<string[]>([])

  const roots = ['A']

  const traverse = (node: string, visited: Set<string>) => {
    if (visited.has(node)) return
    visited.add(node)
    heap[node]?.forEach((child) => traverse(child, visited))
  }

  const collectGarbage = () => {
    const visited = new Set<string>()
    roots.forEach((root) => traverse(root, visited))
    setReachable(Array.from(visited))
  }

  const toggleReference = (from: string, to: string) => {
    setHeap((prev) => {
      const refs = new Set(prev[from])
      if (refs.has(to)) {
        refs.delete(to)
      } else {
        refs.add(to)
      }
      return { ...prev, [from]: Array.from(refs) }
    })
  }

  const addNode = () => {
    const name = prompt('請輸入新節點名稱（單一英文字母）')
    if (!name || name.length !== 1 || heap[name]) return
    setHeap((prev) => ({ ...prev, [name]: [] }))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {Object.entries(heap).map(([node, refs]) => (
          <div
            key={node}
            className={`p-4 rounded-xl shadow w-28 text-center ${
              reachable.includes(node) ? 'bg-green-200' : 'bg-gray-200'
            }`}
          >
            <div className="font-bold text-lg">{node}</div>
            <div className="text-sm">→ {refs.join(', ') || '無'}</div>
            <div className="flex justify-center gap-1 mt-1">
              {Object.keys(heap).map(
                (target) =>
                  target !== node && (
                    <button
                      key={target}
                      className={`text-xs px-1 py-0.5 rounded ${
                        heap[node].includes(target)
                          ? 'bg-blue-400 text-white'
                          : 'bg-white border'
                      }`}
                      onClick={() => toggleReference(node, target)}
                    >
                      {heap[node].includes(target) ? `移除 ${target}` : `加 ${target}`}
                    </button>
                  )
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Button onClick={collectGarbage}>執行垃圾回收</Button>
        <Button variant="secondary" onClick={addNode}>新增節點</Button>
      </div>
    </div>
  )
}

export default GarbageCollector