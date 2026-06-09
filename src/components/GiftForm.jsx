import { useState, useEffect } from 'react'

export default function GiftForm({ gift, onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Other')
  const [link, setLink] = useState('')

  useEffect(() => {
    if (gift) {
      setName(gift.name || '')
      setDescription(gift.description || '')
      setCategory(gift.category || 'Other')
      setLink(gift.link || '')
    }
  }, [gift])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit({
        name,
        description,
        category,
        link
      })
      setName('')
      setDescription('')
      setCategory('Other')
      setLink('')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: 'var(--card)',
      border: '1px solid var(--line)',
      padding: '40px',
      marginBottom: '32px'
    }}>
      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '24px',
        fontWeight: 300,
        marginBottom: '28px'
      }}>
        {gift ? 'Edit Gift' : 'Add Gift to Registry'}
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <div>
          <label style={{
            display: 'block',
            fontSize: '12px',
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '8px'
          }}>Gift Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Apple Watch"
            style={{
              width: '100%',
              padding: '14px 16px',
              border: '1px solid var(--line)',
              background: 'var(--paper)',
              fontFamily: "'Jost', sans-serif",
              fontSize: '14px',
              color: 'var(--ink)'
            }}
            autoFocus
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '12px',
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '8px'
          }}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px',
              border: '1px solid var(--line)',
              background: 'var(--paper)',
              fontFamily: "'Jost', sans-serif",
              fontSize: '14px',
              color: 'var(--ink)'
            }}
          >
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Books</option>
            <option>Home & Garden</option>
            <option>Sports</option>
            <option>Beauty</option>
            <option>Experiences</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <div>
          <label style={{
            display: 'block',
            fontSize: '12px',
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '8px'
          }}>Product Link</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://..."
            style={{
              width: '100%',
              padding: '14px 16px',
              border: '1px solid var(--line)',
              background: 'var(--paper)',
              fontFamily: "'Jost', sans-serif",
              fontSize: '14px',
              color: 'var(--ink)'
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          fontSize: '12px',
          letterSpacing: '0.26em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '8px'
        }}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add any details or notes..."
          style={{
            width: '100%',
            padding: '14px 16px',
            border: '1px solid var(--line)',
            background: 'var(--paper)',
            fontFamily: "'Jost', sans-serif",
            fontSize: '14px',
            color: 'var(--ink)',
            resize: 'vertical',
            minHeight: '80px'
          }}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px'
      }}>
        <button
          type="submit"
          style={{
            padding: '16px',
            background: 'var(--ink)',
            color: 'var(--paper)',
            border: 'none',
            fontFamily: "'Jost', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'opacity 0.3s'
          }}
          onMouseOver={(e) => e.target.style.opacity = '0.85'}
          onMouseOut={(e) => e.target.style.opacity = '1'}
        >
          {gift ? 'Save Changes' : 'Add to Registry'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '16px',
            background: 'transparent',
            color: 'var(--ink)',
            border: '1px solid var(--line)',
            fontFamily: "'Jost', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'var(--line)'
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'transparent'
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
