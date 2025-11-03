const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { v4: uuidv4 } = require('uuid')

const app = express()
const port = process.env.PORT || 5001

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

// in-memory DB
const items = [
  { id: uuidv4(), name: 'Initial item 1' },
  { id: uuidv4(), name: 'Initial item 2' }
]

// health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', ts: Date.now() })
})

// get items
app.get('/api/items', (req, res) => {
  res.json(items)
})

// create item
app.post('/api/items', (req, res) => {
  const { name } = req.body
  if (!name) return res.status(400).json({ error: 'name required' })
  const newItem = { id: uuidv4(), name }
  items.push(newItem)
  res.status(201).json(newItem)
})

// sample echo
app.get('/api/echo', (req, res) => {
  res.json({ query: req.query, headers: req.headers })
})

app.listen(port, () => console.log(`Backend listening on ${port}`))
