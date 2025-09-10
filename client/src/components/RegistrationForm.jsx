import { useState } from 'react';
import './RegistrationForm.css';

export default function RegistrationForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState('');

  const submit = async e => {
    e.preventDefault();
    setStatus('');
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (res.ok) setStatus('Registered!');
    else setStatus(data.error || 'Error');
  };

  return (
    <form className="register" onSubmit={submit}>
      <h2>Register</h2>
      {['name','email','phone'].map(field => (
        <input key={field} required placeholder={field}
          value={form[field]}
          onChange={e => setForm({ ...form, [field]: e.target.value })} />
      ))}
      <button type="submit">Submit</button>
      {status && <p className="status">{status}</p>}
    </form>
  );
}
