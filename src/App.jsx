import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/Dashboard'
import Tickets from './pages/tickets/Tickets'
import TicketForm from './pages/tickets/TicketForm'
import { getSession } from './utils/session'
import Layout from './components/Layout'


function Protected({ children }){
const session = getSession()
if(!session?.token) return <Navigate to="/auth/login" replace />
return children
}


export default function App(){
return (
<Routes>
<Route path="/" element={<Layout><Landing /></Layout>} />


<Route path="/auth/login" element={<Layout><Login /></Layout>} />
<Route path="/auth/signup" element={<Layout><Signup /></Layout>} />


<Route path="/dashboard" element={<Layout><Protected><Dashboard /></Protected></Layout>} />


<Route path="/tickets" element={<Layout><Protected><Tickets /></Protected></Layout>} />
<Route path="/tickets/new" element={<Layout><Protected><TicketForm /></Protected></Layout>} />
<Route path="/tickets/:id/edit" element={<Layout><Protected><TicketForm /></Protected></Layout>} />


<Route path="*" element={<Navigate to="/" replace />} />
</Routes>
)
}

