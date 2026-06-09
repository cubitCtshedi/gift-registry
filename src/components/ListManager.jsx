import { useState } from 'react'

export default function ListManager({ lists, onCreateList, onSelectList, onDeleteList }) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    occasion: '',
    location: '',
    direction: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name.trim()) {
      onCreateList(
        formData.name,
        formData.description,
        formData.occasion,
        formData.location,
        formData.direction
      )
      setFormData({ name: '', description: '', occasion: '', location: '', direction: '' })
      setShowForm(false)
    }
  }

  return (
    <div>
      <div className="masthead">
        <span>Gift Registry</span>
        <span className="vol">Edited with Love</span>
        <span>Create &mdash; Share &mdash; Celebrate</span>
      </div>

      <header className="hero">
        <p className="kicker">A new wishlist, curated</p>
        <h1>Objects of <em>desire.</em></h1>
        <p className="lede">Create a thoughtful gift registry and invite others to join in the celebration. Each list tells a story—make yours count. Start with intention, share with grace.</p>
      </header>

      <div className="wrap">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            style={{
              width: '100%',
              padding: '24px',
              background: 'var(--ink)',
              color: 'var(--paper)',
              border: 'none',
              fontFamily: "'Jost', sans-serif",
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              marginBottom: '48px',
              transition: 'opacity 0.3s'
            }}
            onMouseOver={(e) => e.target.style.opacity = '0.85'}
            onMouseOut={(e) => e.target.style.opacity = '1'}
          >
            + Create New Registry
          </button>
        ) : (
          <form onSubmit={handleSubmit} style={{
            background: 'var(--card)',
            padding: '40px',
            marginBottom: '48px',
            border: '1px solid var(--line)'
          }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '32px',
              fontWeight: 300,
              marginBottom: '32px'
            }}>New Registry</h2>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '12px',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '8px'
              }}>Registry Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Turning Twenty-Five"
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
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell your story..."
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '1px solid var(--line)',
                  background: 'var(--paper)',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '14px',
                  color: 'var(--ink)',
                  resize: 'vertical',
                  minHeight: '100px'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '24px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  marginBottom: '8px'
                }}>The Occasion</label>
                <input
                  type="text"
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  placeholder="Birthday, Wedding..."
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
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  marginBottom: '8px'
                }}>Direction / Style</label>
                <input
                  type="text"
                  name="direction"
                  value={formData.direction}
                  onChange={handleChange}
                  placeholder="Minimalist, Luxury..."
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
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  marginBottom: '8px'
                }}>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country..."
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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
                Create Registry
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
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
        )}

        <div>
          <div className="sec-head">
            <h2>Your Registries</h2>
            <span className="ct">{lists.length} total</span>
          </div>

          {lists.length === 0 ? (
            <div style={{
              padding: '60px 40px',
              textAlign: 'center',
              background: 'var(--card)',
              border: '1px solid var(--line)'
            }}>
              <p style={{ color: 'var(--soft)', fontSize: '16px', lineHeight: 1.8 }}>
                No registries yet. Create one to begin.
              </p>
            </div>
          ) : (
            lists.map((list, idx) => (
              <div
                key={list.id}
                className="row"
              >
                <div className="idx">{String.fromCharCode(73 + idx)}</div>
                <div className="nm">
                  <small>{list.occasion}</small>
                  <div onClick={() => onSelectList(list.id)} style={{ cursor: 'pointer' }}>
                    {list.name}
                    {list.direction && <span style={{ color: 'var(--soft)', marginLeft: '12px', fontSize: '14px' }}>• {list.direction}</span>}
                  </div>
                  {list.description && <p style={{ fontSize: '12px', color: 'var(--soft)', marginTop: '6px' }}>{list.description}</p>}
                </div>
                <div className="dt">{list.location}</div>
                <div className="pr" style={{ textAlign: 'right' }}>
                  <small>{list.gifts.length} gift{list.gifts.length !== 1 ? 's' : ''}</small>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => onSelectList(list.id)}
                    className="claim"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete "${list.name}"?`)) {
                        onDeleteList(list.id)
                      }
                    }}
                    style={{
                      border: '1px solid var(--line)',
                      background: 'transparent',
                      color: 'var(--soft)',
                      fontFamily: "'Jost', sans-serif",
                      fontSize: '10px',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      padding: '13px 16px',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = 'var(--accent)'
                      e.target.style.borderColor = 'var(--accent)'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = 'var(--soft)'
                      e.target.style.borderColor = 'var(--line)'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <footer>
        <p className="kicker">Begin here</p>
        <h3>Create with <em>intention.</em></h3>
        <p>A gift registry is more than a list—it's an invitation to share in what matters to you. Let thoughtfulness guide every choice.</p>
        <p className="sig">&mdash; thoughtfully curated</p>
      </footer>
    </div>
  )
}
