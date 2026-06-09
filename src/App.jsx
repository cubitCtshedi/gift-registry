import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import ListManager from './components/ListManager'
import RegistryView from './components/RegistryView'

function App() {
  const [lists, setLists] = useState([])
  const [currentListId, setCurrentListId] = useState(null)
  const [view, setView] = useState('home')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLists()
  }, [])

  async function loadLists() {
    setLoading(true)
    const { data: listsData, error: listsError } = await supabase
      .from('registry_lists')
      .select('*')
      .order('created_at', { ascending: true })

    if (listsError) console.error('Lists fetch error:', listsError)

    const { data: giftsData, error: giftsError } = await supabase
      .from('gifts')
      .select('*')
      .order('created_at', { ascending: true })

    if (giftsError) console.error('Gifts fetch error:', giftsError)

    const listsWithGifts = (listsData || []).map(list => ({
      ...list,
      gifts: (giftsData || []).filter(g => g.list_id === list.id)
    }))

    setLists(listsWithGifts)
    if (listsWithGifts.length > 0) setCurrentListId(listsWithGifts[0].id)
    setLoading(false)
  }

  const toggleClaim = async (listId, giftId) => {
    const list = lists.find(l => l.id === listId)
    const gift = list?.gifts.find(g => g.id === giftId)
    if (!gift) return

    const { data, error } = await supabase
      .from('gifts')
      .update({ claimed: !gift.claimed })
      .eq('id', giftId)
      .select()
      .single()

    if (error) { console.error(error); return }

    setLists(prev => prev.map(l =>
      l.id === listId
        ? { ...l, gifts: l.gifts.map(g => g.id === giftId ? data : g) }
        : l
    ))
  }

  const currentList = lists.find(l => l.id === currentListId)

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: "'Jost', sans-serif",
        fontSize: '12px',
        letterSpacing: '0.26em',
        textTransform: 'uppercase',
        color: 'var(--soft)'
      }}>
        Loading...
      </div>
    )
  }

  return (
    <>
      {view === 'home' ? (
        <ListManager
          lists={lists}
          onSelectList={(id) => {
            setCurrentListId(id)
            setView('registry')
          }}
        />
      ) : currentList ? (
        <RegistryView
          list={currentList}
          onToggleClaim={(giftId) => toggleClaim(currentList.id, giftId)}
          onBack={() => setView('home')}
        />
      ) : null}
    </>
  )
}

export default App
