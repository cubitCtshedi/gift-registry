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
        <div>
          <div className="sec-head">
            <h2>Registries</h2>
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
                No registries yet.
              </p>
            </div>
          ) : (
            lists.map((list, idx) => (
              <div key={list.id} className="row">
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
                <button onClick={() => onSelectList(list.id)} className="claim">
                  View
                </button>
              </div>
            ))
          )}
        </div>
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
