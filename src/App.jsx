import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { supabase } from './lib/supabase'
import ListManager from './components/ListManager'
import RegistryView from './components/RegistryView'
import AdminView from './components/AdminView'

function AppRoutes() {
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadLists() }, [])

  async function loadLists() {
    setLoading(true)
    const { data: listsData, error: le } = await supabase
      .from('registry_lists').select('*').order('created_at')
    const { data: giftsData, error: ge } = await supabase
      .from('gifts').select('*').order('created_at')
    if (le) console.error(le)
    if (ge) console.error(ge)
    setLists((listsData || []).map(list => ({
      ...list,
      gifts: (giftsData || []).filter(g => g.list_id === list.id)
    })))
    setLoading(false)
  }

  const toggleClaim = async (listId, giftId, claimerName) => {
    const list = lists.find(l => l.id === listId)
    const gift = list?.gifts.find(g => g.id === giftId)
    if (!gift) return null
    const updates = gift.claimed
      ? { claimed: false, claimed_by: null }
      : { claimed: true, claimed_by: claimerName }
    const { data, error } = await supabase
      .from('gifts').update(updates).eq('id', giftId).select().single()
    if (error) { console.error(error); return null }
    setLists(prev => prev.map(l =>
      l.id === listId ? { ...l, gifts: l.gifts.map(g => g.id === giftId ? data : g) } : l
    ))
    return data
  }

  if (loading) return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',
      fontFamily: "'Jost', sans-serif", fontSize: '12px', letterSpacing: '0.26em',
      textTransform: 'uppercase', color: 'var(--soft)'
    }}>Loading...</div>
  )

  return (
    <Routes>
      <Route path="/" element={<HomeRoute lists={lists} />} />
      <Route path="/registry/:id" element={<RegistryRoute lists={lists} onToggleClaim={toggleClaim} />} />
      <Route path="/admin" element={<AdminView lists={lists} onReload={loadLists} />} />
    </Routes>
  )
}

function HomeRoute({ lists }) {
  const navigate = useNavigate()
  return <ListManager lists={lists} onSelectList={(id) => navigate(`/registry/${id}`)} />
}

function RegistryRoute({ lists, onToggleClaim }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const list = lists.find(l => l.id === id)
  if (!list) return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',
      fontFamily: "'Jost', sans-serif", fontSize: '12px', letterSpacing: '0.26em',
      textTransform: 'uppercase', color: 'var(--soft)'
    }}>Registry not found.</div>
  )
  return (
    <RegistryView
      list={list}
      onToggleClaim={(giftId, name) => onToggleClaim(id, giftId, name)}
      onBack={() => navigate('/')}
    />
  )
}

export default function App() {
  return <BrowserRouter><AppRoutes /></BrowserRouter>
}
