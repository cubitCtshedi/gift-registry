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
    const { data: listsData } = await supabase
      .from('registry_lists')
      .select('*')
      .order('created_at', { ascending: true })

    const { data: giftsData } = await supabase
      .from('gifts')
      .select('*')
      .order('created_at', { ascending: true })

    const listsWithGifts = (listsData || []).map(list => ({
      ...list,
      gifts: (giftsData || []).filter(g => g.list_id === list.id)
    }))

    setLists(listsWithGifts)
    if (listsWithGifts.length > 0) setCurrentListId(listsWithGifts[0].id)
    setLoading(false)
  }

  const createList = async (name, description, occasion, location, direction) => {
    const { data, error } = await supabase
      .from('registry_lists')
      .insert({ name, description, occasion, location, direction })
      .select()
      .single()
    if (error) { console.error(error); return }
    const newList = { ...data, gifts: [] }
    setLists(prev => [...prev, newList])
    setCurrentListId(newList.id)
    setView('registry')
  }

  const deleteList = async (id) => {
    const { error } = await supabase.from('registry_lists').delete().eq('id', id)
    if (error) { console.error(error); return }
    setLists(prev => {
      const updated = prev.filter(l => l.id !== id)
      if (currentListId === id) {
        setCurrentListId(updated.length > 0 ? updated[0].id : null)
        if (updated.length === 0) setView('home')
      }
      return updated
    })
  }

  const addGift = async (listId, gift) => {
    const { data, error } = await supabase
      .from('gifts')
      .insert({ list_id: listId, ...gift, claimed: false })
      .select()
      .single()
    if (error) { console.error(error); return }
    setLists(prev => prev.map(list =>
      list.id === listId ? { ...list, gifts: [...list.gifts, data] } : list
    ))
  }

  const updateGift = async (listId, giftId, updates) => {
    const { data, error } = await supabase
      .from('gifts')
      .update(updates)
      .eq('id', giftId)
      .select()
      .single()
    if (error) { console.error(error); return }
    setLists(prev => prev.map(list =>
      list.id === listId
        ? { ...list, gifts: list.gifts.map(g => g.id === giftId ? data : g) }
        : list
    ))
  }

  const deleteGift = async (listId, giftId) => {
    const { error } = await supabase.from('gifts').delete().eq('id', giftId)
    if (error) { console.error(error); return }
    setLists(prev => prev.map(list =>
      list.id === listId
        ? { ...list, gifts: list.gifts.filter(g => g.id !== giftId) }
        : list
    ))
  }

  const toggleClaim = async (listId, giftId) => {
    const list = lists.find(l => l.id === listId)
    const gift = list?.gifts.find(g => g.id === giftId)
    if (!gift) return
    await updateGift(listId, giftId, { claimed: !gift.claimed })
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
        <ListManager lists={lists} onCreateList={createList} onSelectList={(id) => {
          setCurrentListId(id)
          setView('registry')
        }} onDeleteList={deleteList} />
      ) : currentList ? (
        <RegistryView
          list={currentList}
          onAddGift={(gift) => addGift(currentList.id, gift)}
          onUpdateGift={(giftId, updates) => updateGift(currentList.id, giftId, updates)}
          onDeleteGift={(giftId) => deleteGift(currentList.id, giftId)}
          onToggleClaim={(giftId) => toggleClaim(currentList.id, giftId)}
          onBack={() => setView('home')}
        />
      ) : null}
    </>
  )
}

export default App
