import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Flyer from './components/Flyer';
import TicketBooking from './components/TicketBooking';
import RegistrationForm from './components/RegistrationForm';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

export default function App() {
  return (
    <Router>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/book">Book</Link>
        <Link to="/register">Register</Link>
        <Link to="/admin">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Flyer />} />
        <Route path="/book" element={<TicketBooking />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
