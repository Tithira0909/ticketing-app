import { useEffect, useState } from 'react';
import './TicketBooking.css';

export default function TicketBooking() {
  const [tickets, setTickets] = useState([]);
  const [type, setType] = useState('VIP');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/tickets')
      .then(r => r.json())
      .then(setTickets)
      .catch(() => setTickets([]));
  }, []);

  const book = async () => {
    setStatus('');
    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId: 1, type })
    });
    const data = await res.json();
    if (res.ok) {
      setStatus('Booked!');
    } else {
      setStatus(data.error || 'Error');
    }
  };

  return (
    <div className="booking">
      <h2>Book Tickets</h2>
      <select value={type} onChange={e => setType(e.target.value)}>
        {tickets.map(t => (
          <option key={t.type} value={t.type}>
            {t.type} - {t.available} left
          </option>
        ))}
      </select>
      <button onClick={book}>Book</button>
      {status && <p className="status">{status}</p>}
    </div>
  );
}
