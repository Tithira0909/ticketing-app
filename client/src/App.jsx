import React, { useState, useEffect } from 'react';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';

// Registration Modal Component (kept from original)
const RegistrationModal = ({
  isOpen,
  onClose,
  onSubmit,
  totalPrice,
  isLoading,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Please fill in all fields.');
      return;
    }
    onSubmit({ name, email, phone });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2 className="modal-title">Complete Your Booking</h2>
          <button className="modal-close-button" onClick={onClose}>
            &times;
          </button>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="total-section">
            <div className="price-container">
              <p className="total-label">Total to Pay:</p>
              <p className="total-price">{totalPrice.toLocaleString('en-US')} LKR</p>
            </div>
          </div>
          <div className="form-actions">
            <button
              type="submit"
              className="book-button"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Confirm & Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default function App() {
  const [vipTickets, setVipTickets] = useState(0);
  const [generalTickets, setGeneralTickets] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 3000); // Simulate a 3-second load time
    return () => clearTimeout(timer);
  }, []);

  const vip = { type: 'VIP', price: 7500, label: 'VIP Tickets', max: 400 };
  const general = { type: 'GENERAL', price: 5000, label: 'General Tickets', max: 800 };

  useEffect(() => {
    const total = vipTickets * vip.price + generalTickets * general.price;
    setTotalPrice(total);
  }, [vipTickets, generalTickets]);

  const handleTicketChange = (type, action) => {
    if (type === 'vip') {
      if (action === 'increment' && vipTickets < vip.max) {
        setVipTickets(vipTickets + 1);
      } else if (action === 'decrement' && vipTickets > 0) {
        setVipTickets(vipTickets - 1);
      }
    } else if (type === 'general') {
      if (action === 'increment' && generalTickets < general.max) {
        setGeneralTickets(generalTickets + 1);
      } else if (action === 'decrement' && generalTickets > 0) {
        setGeneralTickets(generalTickets - 1);
      }
    }
  };

  const handleBook = () => {
    if (totalPrice > 0) {
      setIsModalOpen(true);
    }
  };

  const handleRegistrationSubmit = async (customerDetails) => {
    setIsLoading(true);
    setBookingStatus(null);
    try {
      const registerRes = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerDetails),
      });

      if (!registerRes.ok) throw new Error('Failed to register customer.');

      const { id: customerId } = await registerRes.json();
      const bookings = [];
      for (let i = 0; i < vipTickets; i++) {
        bookings.push({ customerId, type: vip.type });
      }
      for (let i = 0; i < generalTickets; i++) {
        bookings.push({ customerId, type: general.type });
      }

      await Promise.all(
        bookings.map((booking) =>
          fetch('http://localhost:3000/api/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking),
          }).then((res) => {
            if (!res.ok) throw new Error('A ticket could not be booked.');
          })
        )
      );

      setBookingStatus('success');
      setVipTickets(0);
      setGeneralTickets(0);
    } catch (error) {
      console.error('Booking failed:', error);
      setBookingStatus('error');
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const fullDescription = "Electronic music festival held in Belgium. Tomorrowland was first held in 2005 and has since become one of the world's largest and most notable music festivals. It is known for its impressive stage design, lineup of popular DJs, and vibrant atmosphere.";
  const shortDescription = fullDescription.substring(0, 100) + "...";

  if (isAppLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="app-container">
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleRegistrationSubmit}
        totalPrice={totalPrice}
        isLoading={isLoading}
      />

      <div className="event-card">
        <header className="event-header">
          <img src="/flyer.png" alt="Event Banner" className="event-banner" />
          <div className="header-overlay">
            <div className="header-top">
              <button className="icon-button">&larr;</button>
              <button className="icon-button">&hearts;</button>
            </div>
            <h1 className="event-title">Sanda Ek Dinak</h1>
          </div>
        </header>

        <main className="event-details">
          {bookingStatus === 'success' && (
            <div className="alert-success">
              Booking successful! Check your email.
            </div>
          )}
          {bookingStatus === 'error' && (
            <div className="alert-error">
              Booking failed. Please try again.
            </div>
          )}

          <div className="info-section">
             <div className="info-item">
              <span className="info-icon">🗓️</span>
              <div className="info-text">
                <p>25 - 26 July, 2021</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🕔</span>
              <div className="info-text">
                <p>4pm - 12pm</p>
              </div>
            </div>
          </div>

          <div className="description-section">
            <h2 className="section-title">Description</h2>
            <p className="description-text">
              {isDescriptionExpanded ? fullDescription : shortDescription}
              <a href="#" className="read-more" onClick={toggleDescription}>
                {isDescriptionExpanded ? ' Read less' : ' Read more'}
              </a>
            </p>
          </div>

          {/* Ticket Selection */}
          <div className="ticket-selection-section">
            <h2 className="section-title">Select Tickets</h2>
            <div className="ticket-option">
              <div className="ticket-info">
                <h3 className="ticket-type">{vip.label}</h3>
                <p className="ticket-price">{vip.price} LKR</p>
              </div>
              <div className="ticket-controls">
                <button onClick={() => handleTicketChange('vip', 'decrement')} className="control-button">-</button>
                <span className="ticket-count">{vipTickets}</span>
                <button onClick={() => handleTicketChange('vip', 'increment')} className="control-button">+</button>
              </div>
            </div>
            <div className="ticket-option">
              <div className="ticket-info">
                <h3 className="ticket-type">{general.label}</h3>
                <p className="ticket-price">{general.price} LKR</p>
              </div>
              <div className="ticket-controls">
                <button onClick={() => handleTicketChange('general', 'decrement')} className="control-button">-</button>
                <span className="ticket-count">{generalTickets}</span>
                <button onClick={() => handleTicketChange('general', 'increment')} className="control-button">+</button>
              </div>
            </div>
          </div>
        </main>

        <footer className="event-footer">
          <div className="total-display">
            <p className="total-text">Total:</p>
            <p className="total-amount">{totalPrice.toLocaleString('en-US')} LKR</p>
          </div>
          <button
            className="buy-button"
            onClick={handleBook}
            disabled={totalPrice === 0}
          >
            Book Now
          </button>
          <div className="copyright-footer">
            <p>&copy; eventz one, powered by zeatralabs</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
