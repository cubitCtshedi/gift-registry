import { useState } from 'react'
import GiftForm from './GiftForm'

export default function RegistryView({ list, onAddGift, onUpdateGift, onDeleteGift, onToggleClaim, onBack }) {
  const [showForm, setShowForm] = useState(false)
  const [editingGift, setEditingGift] = useState(null)

  const handleAddGift = (giftData) => {
    onAddGift(giftData)
    setShowForm(false)
  }

  const handleEditGift = (giftData) => {
    onUpdateGift(editingGift.id, giftData)
    setEditingGift(null)
  }

  const claimedCount = list.gifts.filter(g => g.claimed).length

  return (
    <div>
      <div className="masthead">
        <button onClick={onBack} style={{
          background: 'none',
          border: 'none',
          color: 'var(--ink)',
          cursor: 'pointer',
          fontSize: '11px',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          padding: 0,
          fontFamily: "'Jost', sans-serif"
        }}>
          ← Back
        </button>
        <span className="vol">{list.name}</span>
        <span>{list.location}</span>
      </div>

      <header className="hero">
        <p className="kicker">{list.direction || 'Curated with care'}</p>
        <h1>{list.name}</h1>
        {list.description && <p className="lede">{list.description}</p>}
        {(list.occasion || list.location || list.direction) && (
          <div className="credits">
            {list.occasion && <div><span>The Occasion</span><b>{list.occasion}</b></div>}
            {list.direction && <div><span>Direction</span><b>{list.direction}</b></div>}
            {list.location && <div><span>Location</span><b>{list.location}</b></div>}
          </div>
        )}
      </header>

      <div className="tracker">
        <span>Claimed</span>
        <div className="barwrap">
          <div className="bar" style={{ width: `${(claimedCount / list.gifts.length) * 100}%` }}></div>
        </div>
        <span>
          <b>{claimedCount}</b>&nbsp;of&nbsp;<b>{list.gifts.length}</b>
        </span>
      </div>

      <main className="wrap">
        <div className="sec-head">
          <h2>The pieces</h2>
          <span className="ct">{claimedCount} of {list.gifts.length} reserved</span>
        </div>

        {!showForm && !editingGift && list.gifts.length > 0 && (
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
              marginBottom: '6px',
              transition: 'opacity 0.3s'
            }}
            onMouseOver={(e) => e.target.style.opacity = '0.85'}
            onMouseOut={(e) => e.target.style.opacity = '1'}
          >
            + Add Gift
          </button>
        )}

        {(showForm || editingGift) && (
          <GiftForm
            gift={editingGift}
            onSubmit={editingGift ? handleEditGift : handleAddGift}
            onCancel={() => {
              setShowForm(false)
              setEditingGift(null)
            }}
          />
        )}

        {list.gifts.length === 0 ? (
          <div>
            {!showForm && (
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
                  marginBottom: '32px',
                  transition: 'opacity 0.3s'
                }}
                onMouseOver={(e) => e.target.style.opacity = '0.85'}
                onMouseOut={(e) => e.target.style.opacity = '1'}
              >
                + Add First Gift
              </button>
            )}
            {!showForm && (
              <div style={{
                padding: '60px 40px',
                textAlign: 'center',
                background: 'var(--card)',
                border: '1px solid var(--line)'
              }}>
                <p style={{ color: 'var(--soft)', fontSize: '16px', lineHeight: 1.8 }}>
                  No gifts added yet. Begin with intention.
                </p>
              </div>
            )}
          </div>
        ) : (
          list.gifts.map((gift, idx) => (
            <div
              key={gift.id}
              className={`row ${gift.claimed ? 'claimed' : ''}`}
            >
              <div className="idx">{String.fromCharCode(73 + idx)}</div>
              <div className="nm">
                <small>{gift.category}</small>
                <div style={{ cursor: 'pointer' }} onClick={() => setEditingGift(gift)}>
                  {gift.name}
                </div>
                {gift.link && (
                  <a href={gift.link} target="_blank" rel="noopener noreferrer" className="view">
                    View ↗
                  </a>
                )}
              </div>
              <div className="dt">{gift.description}</div>
              <button
                onClick={() => onToggleClaim(gift.id)}
                className="claim"
                style={{ cursor: 'pointer' }}
              >
                {gift.claimed ? 'Unclaim' : 'Claim'}
              </button>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: '8px' }}>
                <button
                  onClick={() => setEditingGift(gift)}
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
                  title="Edit this gift"
                >
                  ✏️
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete "${gift.name}"?`)) {
                      onDeleteGift(gift.id)
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
                  title="Delete this gift"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </main>

      <footer>
        <p className="kicker">Merci infiniment</p>
        <h3>The thought, <em>more than the thing.</em></h3>
        <p>Whatever is chosen will be worn, used, and quietly treasured. Consider this the only registry where restraint is the highest compliment.</p>
        <p className="sig">&mdash; with love & considered taste</p>
      </footer>
    </div>
  )
}
