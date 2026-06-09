export default function ListManager({ lists, onSelectList }) {
  return (
    <div>
      <div className="masthead">
        <span>Gift Registry</span>
        <span className="vol">Edited with Love</span>
        <span>Create &mdash; Share &mdash; Celebrate</span>
      </div>

      <header className="hero">
        <p className="kicker">A wishlist, curated</p>
        <h1>Objects of <em>desire.</em></h1>
        <p className="lede">Browse the registry and claim a gift for someone special. Each choice is a gesture — make yours count.</p>
      </header>

      <div className="wrap">
        <div className="sec-head">
          <h2>Registries</h2>
          <span className="ct">{lists.length} total</span>
        </div>

        {lists.length === 0 ? (
          <div style={{ padding: '60px 40px', textAlign: 'center', background: 'var(--card)', border: '1px solid var(--line)' }}>
            <p style={{ color: 'var(--soft)', fontSize: '16px', lineHeight: 1.8 }}>No registries yet.</p>
          </div>
        ) : (
          lists.map((list, idx) => {
            const claimed = list.gifts.filter(g => g.claimed).length
            const total = list.gifts.length
            const pct = total ? (claimed / total) * 100 : 0
            return (
              <div key={list.id} className="row" style={{ cursor: 'pointer' }} onClick={() => onSelectList(list.id)}>
                <div className="idx">{String.fromCharCode(73 + idx)}</div>
                <div className="nm">
                  <small>{list.occasion}</small>
                  <div>{list.name}</div>
                  {list.description && (
                    <p style={{ fontSize: '13px', color: 'var(--soft)', marginTop: '6px' }}>{list.description}</p>
                  )}
                  <div className="reg-progress-wrap">
                    <div className="reg-progress-bar" style={{ width: `${pct}%` }} />
                  </div>
                  <span style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--soft)', marginTop: '8px', display: 'block' }}>
                    {claimed} of {total} claimed
                  </span>
                </div>
                <button className="claim" onClick={e => { e.stopPropagation(); onSelectList(list.id) }}>
                  View
                </button>
              </div>
            )
          })
        )}
      </div>

      <footer>
        <p className="kicker">Begin here</p>
        <h3>Give with <em>intention.</em></h3>
        <p>A gift registry is more than a list—it's an invitation to share in what matters. Let thoughtfulness guide every choice.</p>
        <p className="sig">&mdash; thoughtfully curated</p>
      </footer>
    </div>
  )
}
