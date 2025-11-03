// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import api from '../services/api'

export default function Dashboard(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    api.get('/items')
      .then(res => {
        // debug: log the full response to the browser console
        console.debug('API /items response:', res)

        // defensive: ensure we always set an array
        const data = res && res.data
        if (Array.isArray(data)) {
          setItems(data)
        } else if (data && typeof data === 'object' && data.items && Array.isArray(data.items)) {
          // support { items: [...] } shape if backend returns wrapper
          setItems(data.items)
        } else {
          // fallback: if it's a single object, put it in an array; otherwise use empty array
          setItems(data ? [data] : [])
        }
      })
      .catch(err => {
        console.error('Failed to fetch items', err)
        setError('Unable to fetch items. Check backend or network.')
      })
      .finally(() => setLoading(false))
  },[])

  const addItem = async () => {
    if (!text) return
    try {
      const res = await api.post('/items', { name: text })
      // ensure new item added safely
      const newItem = res && res.data ? res.data : null
      setItems(prev => (newItem ? [...prev, newItem] : prev))
      setText('')
    } catch (err) {
      console.error('Add item failed', err)
      setError('Failed to add item.')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

      <Card title="Create item">
        <div className="flex gap-2">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            className="border p-2 rounded flex-1"
            placeholder="Item name"
          />
          <button onClick={addItem} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
        </div>
      </Card>

      <div className="mt-6">
        <h3 className="text-lg mb-2">Items</h3>

        {loading && <div className="text-gray-300">Loading...</div>}

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded mb-3">
            {error}
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="text-gray-400">No items yet.</div>
        )}

        {!loading && items.length > 0 && (
          <ul className="space-y-3 mt-2">
            {items.map(it => (
              <li key={it.id ?? it.name ?? Math.random()} className="bg-white/95 text-gray-900 rounded-2xl shadow p-3">
                {it.name ?? JSON.stringify(it)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
