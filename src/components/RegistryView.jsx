export default function RegistryView({ list, onToggleClaim, onBack }) {
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
          <div className="bar" style={{ width: `${list.gifts.length ? (claimedCount / list.gifts.length) * 100 : 0}%` }}></div>
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

        {list.gifts.length === 0 ? (
          <div style={{
            padding: '60px 40px',
            textAlign: 'center',
            background: 'var(--card)',
            border: '1px solid var(--line)'
          }}>
            <p style={{ color: 'var(--soft)', fontSize: '16px', lineHeight: 1.8 }}>
              No gifts added yet.
            </p>
          </div>
        ) : (
          list.gifts.map((gift, idx) => (
            <div key={gift.id} className={`row ${gift.claimed ? 'claimed' : ''}`}>
              <div className="idx">{String.fromCharCode(73 + idx)}</div>
              <div className="nm">
                <small>{gift.category}</small>
                <div>{gift.name}</div>
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
