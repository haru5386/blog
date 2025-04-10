"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const stackInit = []
const heapInit = {}
const queueInit = []

export default function MemoryExecutionSimulator() {
  const [stack, setStack] = useState(stackInit)
  const [heap, setHeap] = useState(heapInit)
  const [queue, setQueue] = useState(queueInit)
  const [log, setLog] = useState([])

  const addStackFrame = () => {
    const id = `func_${stack.length + 1}`
    setStack((prev) => [...prev, id])
    setLog((prev) => [...prev, `🔢 Push to stack: ${id}`])
  }

  const removeStackFrame = () => {
    const popped = stack[stack.length - 1]
    setStack((prev) => prev.slice(0, -1))
    setLog((prev) => [...prev, `❌ Pop from stack: ${popped}`])
  }

  const allocateHeap = () => {
    const id = `obj_${Object.keys(heap).length + 1}`
    setHeap((prev) => ({ ...prev, [id]: { data: '💾 someData' } }))
    setLog((prev) => [...prev, `📦 Allocate heap: ${id}`])
  }

  const deallocateHeap = () => {
    const keys = Object.keys(heap)
    if (keys.length === 0) return
    const last = keys[keys.length - 1]
    const newHeap = { ...heap }
    delete newHeap[last]
    setHeap(newHeap)
    setLog((prev) => [...prev, `🗑️ Deallocate heap: ${last}`])
  }

  const enqueueTask = () => {
    const task = `task_${queue.length + 1}`
    setQueue((prev) => [...prev, task])
    setLog((prev) => [...prev, `📥 Enqueue task: ${task}`])
  }

  const runNextTask = () => {
    if (queue.length === 0) return
    const [next, ...rest] = queue
    setQueue(rest)
    setStack((prev) => [...prev, next])
    setTimeout(() => {
      setStack((prev) => prev.filter((f) => f !== next))
      setLog((prev) => [...prev, `✅ Run and remove task: ${next}`])
    }, 500)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <Card>
        <CardContent className="space-y-2">
          <h2 className="text-xl font-bold">📚 Stack</h2>
          <div className="space-y-1">
            {stack.map((item, i) => (
              <div key={i} className="bg-blue-100 rounded px-2 py-1">{item}</div>
            ))}
          </div>
          <Button onClick={addStackFrame}>+ Push Stack</Button>
          <Button variant="destructive" onClick={removeStackFrame}>- Pop Stack</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2">
          <h2 className="text-xl font-bold">🧠 Heap</h2>
          <div className="space-y-1">
            {Object.keys(heap).map((key) => (
              <div key={key} className="bg-green-100 rounded px-2 py-1">{key}: {heap[key].data}</div>
            ))}
          </div>
          <Button onClick={allocateHeap}>+ Allocate Heap</Button>
          <Button variant="destructive" onClick={deallocateHeap}>- Deallocate Heap</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2">
          <h2 className="text-xl font-bold">📨 Task Queue</h2>
          <div className="space-y-1">
            {queue.map((task, i) => (
              <div key={i} className="bg-yellow-100 rounded px-2 py-1">{task}</div>
            ))}
          </div>
          <Button onClick={enqueueTask}>+ Enqueue Task</Button>
          <Button onClick={runNextTask}>▶ Run Next Task</Button>
        </CardContent>
      </Card>

      <Card className="md:col-span-3">
        <CardContent>
          <h2 className="text-xl font-bold mb-2">📝 Log</h2>
          <div className="max-h-40 overflow-y-auto text-sm text-gray-700 space-y-1">
            {log.map((entry, i) => (
              <div key={i}>{entry}</div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
