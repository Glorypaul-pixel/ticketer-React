import React from 'react'
import { listTickets } from '../services/tickets'
import { Link } from 'react-router-dom'


function statFor(status, tickets){
return tickets.filter(t=>t.status===status).length
}


export default function Dashboard(){
const tickets = listTickets()
const total = tickets.length
const open = statFor('open', tickets)
const progress = statFor('in_progress', tickets)
const closed = statFor('closed', tickets)


return (
<div>
<h2>Dashboard</h2>
<div className="grid stats">
<div className="card stat">
<h3>Total tickets</h3>
<p className="big">{total}</p>
</div>
<div className="card stat">
<h3>Open</h3>
<p className="big">{open}</p>
</div>
<div className="card stat">
<h3>In progress</h3>
<p className="big">{progress}</p>
</div>
<div className="card stat">
<h3>Resolved</h3>
<p className="big">{closed}</p>
</div>
</div>


<div style={{marginTop:20}}>
<Link to="/tickets" className="btn">Manage tickets</Link>
</div>
</div>
)
}