import { useState } from 'react'
import { supabase } from '../lib/supabase'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'registry2026'

const inputStyle = {
  width: '100%', padding: '12px 14px', border: '1px solid var(--line)',
  background: 'var(--paper)', fontFamily: "'Jost', sans-serif",
  fontSize: '14px', color: 'var(--ink)', outline: 'none'
}
const btnPrimary = {
  padding: '12px 24px', background: 'var(--ink)', color: 'var(--paper)',
  border: 'none', fontFamily: "'Jost', sans-serif", fontSize: '11px',
  fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', cursor: 'pointer'
}
const btnGhost = {
  padding: '12px 24px', background: 'transparent', color: 'var(--ink)',
  border: '1px solid var(--line)', fontFamily: "'Jost', sans-serif", fontSize: '11px',
  fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', cursor: 'pointer'
}
const btnDanger = {
  padding: '8px 14px', background: 'transparent', color: 'var(--accent)',
  border: '1px solid var(--accent)', fontFamily: "'Jost', sans-serif",
  fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer'
}

export default function AdminView({ lists, onReload }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('adminAuthed') === '1')
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)

  const [showNewList, setShowNewList] = useState(false)
  const [newList, setNewList] = useState({ name: '', description: '', occasion: '' })
  const [addingGiftTo, setAddingGiftTo] = useState(null)
  const [newGift, setNewGift] = useState({ name: '', category: 'Other', description: '', link: '' })
  const [editingGift, setEditingGift] = useState(null)
  const [saving, setSaving] = useState(false)

  const login = () => {
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('adminAuthed', '1')
      setAuthed(true)
    } else {
      setPwError(true)
      setTimeout(() => setPwError(false), 2000)
    }
  }

  const logout = () => {
    sessionStorage.removeItem('adminAuthed')
    setAuthed(false)
  }

  const createList = async () => {
    if (!newList.name.trim() || saving) return
    setSaving(true)
    await supabase.from('registry_lists').insert({ ...newList })
    await onReload()
    setNewList({ name: '', description: '', occasion: '' })
    setShowNewList(false)
    setSaving(false)
  }

  const deleteList = async (id, name) => {
    if (!window.confirm(`Delete "${name}" and all its gifts?`)) return
    await supabase.from('registry_lists').delete().eq('id', id)
    await onReload()
  }

  const addGift = async (listId) => {
    if (!newGift.name.trim() || saving) return
    setSaving(true)
    await supabase.from('gifts').insert({ ...newGift, list_id: listId, claimed: false })
    await onReload()
    setNewGift({ name: '', category: 'Other', description: '', link: '' })
    setAddingGiftTo(null)
    setSaving(false)
  }

  const saveEditGift = async () => {
    if (!editingGift.name.trim() || saving) return
    setSaving(true)
    await supabase.from('gifts').update({
      name: editingGift.name,
      category: editingGift.category,
      description: editingGift.description,
      link: editingGift.link
    }).eq('id', editingGift.id)
    await onReload()
    setEditingGift(null)
    setSaving(false)
  }

  const deleteGift = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return
    await supabase.from('gifts').delete().eq('id', id)
    await onReload()
  }

  const unclaimGift = async (id) => {
    await supabase.from('gifts').update({ claimed: false, claimed_by: null }).eq('id', id)
    await onReload()
  }

  if (!authed) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--paper)' }}>
        <div style={{ width: '100%', maxWidth: '400px', padding: '48px', background: 'var(--card)', border: '1px solid var(--line)' }}>
          <p className="kicker" style={{ marginBottom: '12px' }}>Admin</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '36px', marginBottom: '32px' }}>Registry Manager</h2>
          <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '10px' }}>
            Password
          </label>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            autoFocus
            style={{ ...inputStyle, marginBottom: '16px', border: pwError ? '1px solid var(--accent)' : '1px solid var(--line)' }}
            placeholder="Enter password"
          />
          {pwError && <p style={{ color: 'var(--accent)', fontSize: '12px', marginBottom: '12px', letterSpacing: '0.1em' }}>Incorrect password</p>}
          <button onClick={login} style={{ ...btnPrimary, width: '100%' }}>Enter</button>
        </div>
      </div>
    )
  }

  const categories = ['Electronics', 'Fashion', 'Books', 'Home & Garden', 'Sports', 'Beauty', 'Experiences', 'Other']

  return (
    <div>
      <div className="masthead">
        <span>Admin</span>
        <span className="vol">Registry Manager</span>
        <button onClick={logout} style={{ background: 'none', border: 'none', color: 'var(--soft)', cursor: 'pointer', fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', fontFamily: "'Jost', sans-serif" }}>
          Log out
        </button>
      </div>

      <div className="wrap">
        <div className="sec-head" style={{ marginBottom: '32px' }}>
          <h2>Manage Registries</h2>
          <button onClick={() => setShowNewList(v => !v)} style={btnPrimary}>
            {showNewList ? 'Cancel' : '+ New Registry'}
          </button>
        </div>

        {showNewList && (
          <div style={{ background: 'var(--card)', border: '1px solid var(--line)', padding: '32px', marginBottom: '40px' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '26px', marginBottom: '24px' }}>New Registry</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>Name *</label>
                <input style={inputStyle} value={newList.name} onChange={e => setNewList(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Lebo's Birthday" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>Occasion</label>
                <input style={inputStyle} value={newList.occasion} onChange={e => setNewList(p => ({ ...p, occasion: e.target.value }))} placeholder="Birthday, Wedding..." />
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>Description</label>
              <input style={inputStyle} value={newList.description} onChange={e => setNewList(p => ({ ...p, description: e.target.value }))} placeholder="A short note..." />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={createList} style={btnPrimary} disabled={saving}>{saving ? 'Creating...' : 'Create'}</button>
              <button onClick={() => setShowNewList(false)} style={btnGhost}>Cancel</button>
            </div>
          </div>
        )}

        {lists.map(list => {
          const claimed = list.gifts.filter(g => g.claimed).length
          return (
            <div key={list.id} style={{ marginBottom: '60px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: '1px solid var(--ink)', paddingBottom: '16px', marginBottom: '4px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '32px' }}>{list.name}</h3>
                  {list.occasion && <span style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--soft)' }}>{list.occasion}</span>}
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: 'var(--soft)', letterSpacing: '0.1em' }}>{claimed}/{list.gifts.length} claimed</span>
                  <button onClick={() => setAddingGiftTo(addingGiftTo === list.id ? null : list.id)} style={btnGhost}>+ Add Gift</button>
                  <button onClick={() => deleteList(list.id, list.name)} style={btnDanger}>Delete List</button>
                </div>
              </div>

              {addingGiftTo === list.id && (
                <div style={{ background: 'var(--card)', border: '1px solid var(--line)', padding: '28px', marginBottom: '8px' }}>
                  <p style={{ fontSize: '11px', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px' }}>New Gift</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '6px' }}>Name *</label>
                      <input style={inputStyle} value={newGift.name} onChange={e => setNewGift(p => ({ ...p, name: e.target.value }))} placeholder="Gift name" />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '6px' }}>Category</label>
                      <select style={inputStyle} value={newGift.category} onChange={e => setNewGift(p => ({ ...p, category: e.target.value }))}>
                        {categories.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '6px' }}>Description</label>
                    <input style={inputStyle} value={newGift.description} onChange={e => setNewGift(p => ({ ...p, description: e.target.value }))} placeholder="Notes, sizes, colours..." />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '6px' }}>Link</label>
                    <input style={inputStyle} value={newGift.link} onChange={e => setNewGift(p => ({ ...p, link: e.target.value }))} placeholder="https://..." type="url" />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => addGift(list.id)} style={btnPrimary} disabled={saving}>{saving ? 'Adding...' : 'Add Gift'}</button>
                    <button onClick={() => setAddingGiftTo(null)} style={btnGhost}>Cancel</button>
                  </div>
                </div>
              )}

              {list.gifts.map((gift, idx) => (
                <div key={gift.id} style={{
                  display: 'grid', gridTemplateColumns: '32px 1fr auto',
                  gap: '20px', alignItems: 'start', padding: '20px 4px',
                  borderBottom: '1px solid var(--line)',
                  background: gift.claimed ? 'transparent' : 'inherit',
                  opacity: gift.claimed ? 0.65 : 1
                }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '18px', color: 'var(--gold)', paddingTop: '2px' }}>
                    {String.fromCharCode(73 + idx)}
                  </div>

                  {editingGift?.id === gift.id ? (
                    <div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                        <input style={inputStyle} value={editingGift.name} onChange={e => setEditingGift(p => ({ ...p, name: e.target.value }))} />
                        <select style={inputStyle} value={editingGift.category} onChange={e => setEditingGift(p => ({ ...p, category: e.target.value }))}>
                          {categories.map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <input style={{ ...inputStyle, marginBottom: '10px' }} value={editingGift.description} onChange={e => setEditingGift(p => ({ ...p, description: e.target.value }))} placeholder="Description" />
                      <input style={{ ...inputStyle, marginBottom: '12px' }} value={editingGift.link || ''} onChange={e => setEditingGift(p => ({ ...p, link: e.target.value }))} placeholder="Link" type="url" />
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={saveEditGift} style={{ ...btnPrimary, padding: '10px 18px', fontSize: '10px' }} disabled={saving}>{saving ? '...' : 'Save'}</button>
                        <button onClick={() => setEditingGift(null)} style={{ ...btnGhost, padding: '10px 18px', fontSize: '10px' }}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 400 }}>{gift.name}</div>
                      <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginTop: '3px' }}>{gift.category}</div>
                      {gift.description && <div style={{ fontSize: '13px', color: 'var(--soft)', marginTop: '4px' }}>{gift.description}</div>}
                      {gift.claimed && <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginTop: '6px' }}>Claimed by {gift.claimed_by || 'unknown'}</div>}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0, paddingTop: '2px' }}>
                    {gift.claimed && (
                      <button onClick={() => unclaimGift(gift.id)} style={{ ...btnGhost, padding: '8px 12px', fontSize: '10px' }}>Unclaim</button>
                    )}
                    {editingGift?.id !== gift.id && (
                      <button onClick={() => setEditingGift(gift)} style={{ ...btnGhost, padding: '8px 12px', fontSize: '10px' }}>Edit</button>
                    )}
                    <button onClick={() => deleteGift(gift.id, gift.name)} style={{ ...btnDanger, padding: '8px 12px' }}>Del</button>
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
