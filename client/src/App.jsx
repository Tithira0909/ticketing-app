import React, { useState, useEffect } from 'react';
import './App.css';

// Registration Modal Component
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

// Main App component
export default function App() {
  const [vipTickets, setVipTickets] = useState(0);
  const [generalTickets, setGeneralTickets] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null); // 'success' or 'error'

  // Ticket data from the backend schema
  const vip = { type: 'VIP', price: 7500, label: 'VIP Tickets', max: 400 };
  const general = { type: 'GENERAL', price: 5000, label: 'General Tickets', max: 800 };

  // Recalculate total price whenever ticket counts change
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
      // 1. Register the customer
      const registerRes = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerDetails),
      });

      if (!registerRes.ok) {
        throw new Error('Failed to register customer.');
      }

      const { id: customerId } = await registerRes.json();

      // 2. Book tickets for the new customer
      const bookings = [];
      for (let i = 0; i < vipTickets; i++) {
        bookings.push({ customerId, type: vip.type });
      }
      for (let i = 0; i < generalTickets; i++) {
        bookings.push({ customerId, type: general.type });
      }

      // Execute all booking promises
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
      // Reset selections after successful booking
      setVipTickets(0);
      setGeneralTickets(0);
    } catch (error) {
      console.error('Booking failed:', error);
      setBookingStatus('error');
    } finally {
      setIsLoading(false);
      setIsModalOpen(false); // Close modal on success or error
    }
  };

  return (
    <div className="app-container">
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleRegistrationSubmit}
        totalPrice={totalPrice}
        isLoading={isLoading}
      />

      <div className="cinematic-card">
        <header className="header">
          <div className="banner-placeholder">
            <img src="/flyer.png" alt="Event Banner" />
          </div>
          <h1 className="title">Sanda Ek Dinak</h1>
        </header>

        <main>
          {bookingStatus === 'success' && (
            <div className="alert-success">
              Your booking was successful! A confirmation has been sent to your email.
            </div>
          )}
          {bookingStatus === 'error' && (
            <div className="alert-error">
              There was an error with your booking. Please try again.
            </div>
          )}

          {/* VIP Ticket Section */}
          <div className="ticket-section">
            <div className="ticket-info">
              <h2 className="ticket-label">{vip.label}</h2>
              <p className="ticket-available">Available: {vip.max - vipTickets}</p>
            </div>
            <div className="ticket-controls">
              <button
                onClick={() => handleTicketChange('vip', 'decrement')}
                className="control-button"
              >
                -
              </button>
              <span className="ticket-count">{vipTickets}</span>
              <button
                onClick={() => handleTicketChange('vip', 'increment')}
                className="control-button"
              >
                +
              </button>
            </div>
          </div>

          {/* General Ticket Section */}
          <div className="ticket-section">
            <div className="ticket-info">
              <h2 className="ticket-label">{general.label}</h2>
              <p className="ticket-available">Available: {general.max - generalTickets}</p>
            </div>
            <div className="ticket-controls">
              <button
                onClick={() => handleTicketChange('general', 'decrement')}
                className="control-button"
              >
                -
              </button>
              <span className="ticket-count">{generalTickets}</span>
              <button
                onClick={() => handleTicketChange('general', 'increment')}
                className="control-button"
              >
                +
              </button>
            </div>
          </div>
        </main>

        {/* Total and Book Button */}
        <div className="total-section">
          <div className="price-container">
            <p className="total-label">Total Price:</p>
            <p className="total-price">{totalPrice.toLocaleString('en-US')} LKR</p>
          </div>
          <button
            className="book-button"
            disabled={totalPrice === 0}
            onClick={handleBook}
          >
            Book Tickets
          </button>
        </div>

        <footer className="footer">
          <p>by Eventz One</p>
        </footer>
      </div>
    </div>
  );
}
