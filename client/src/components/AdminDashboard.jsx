import { useEffect, useState } from 'react';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/tickets').then(r => r.json()).then(setTickets);
  }, []);

  const update = async () => {
    const res = await fetch('/api/tickets/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tickets)
    });
    if (res.ok) setStatus('Updated'); else setStatus('Error');
  };

  const setAvailable = (idx, val) => {
    const arr = [...tickets];
    arr[idx].available = val;
    setTickets(arr);
  };

  return (
    <div className="admin">
      <h2>Admin Dashboard</h2>
      {tickets.map((t, i) => (
        <div key={t.type} className="row">
          <span>{t.type}</span>
          <input type="number" value={t.available}
            onChange={e => setAvailable(i, e.target.value)} />
        </div>
      ))}
      <button onClick={update}>Save</button>
      {status && <p className="status">{status}</p>}
    </div>
  );
}
