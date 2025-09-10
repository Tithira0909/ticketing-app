import React, { useState, useEffect } from 'react';

// Main App component
export default function App() {
  const [premiumTickets, setPremiumTickets] = useState(0);
  const [standardTickets, setStandardTickets] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Ticket data
  const premium = { price: 7500, label: '7500 LKR Tickets', max: 400 };
  const standard = { price: 5000, label: '5000 LKR Tickets', max: 800 };

  // Recalculate total price whenever ticket counts change
  useEffect(() => {
    const total = (premiumTickets * premium.price) + (standardTickets * standard.price);
    setTotalPrice(total);
  }, [premiumTickets, standardTickets]);

  const handleTicketChange = (type, action) => {
    if (type === 'premium') {
      if (action === 'increment' && premiumTickets < premium.max) {
        setPremiumTickets(premiumTickets + 1);
      } else if (action === 'decrement' && premiumTickets > 0) {
        setPremiumTickets(premiumTickets - 1);
      }
    } else if (type === 'standard') {
      if (action === 'increment' && standardTickets < standard.max) {
        setStandardTickets(standardTickets + 1);
      } else if (action === 'decrement' && standardTickets > 0) {
        setStandardTickets(standardTickets - 1);
      }
    }
  };

  return (
    <div className="app-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
        }
        .app-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #1f2937, #18181b, #000000);
          color: #f3f4f6;
          font-family: 'Inter', sans-serif;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .text-gold {
          color: #FFD700;
        }
        .text-teal {
          color: #00A693;
        }
        .border-gold {
          border-color: #FFD700;
        }
        .border-teal {
          border-color: #00A693;
        }
        .bg-gold {
          background-color: #FFD700;
        }
        .bg-teal {
          background-color: #00A693;
        }

        .cinematic-card {
          background-color: rgba(39, 39, 42, 0.7);
          backdrop-filter: blur(8px);
          border-radius: 1.5rem;
          padding: 2.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          max-width: 48rem;
          width: 100%;
          border: 1px solid #374151;
        }

        .header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .banner-placeholder {
          width: 100%;
          height: 12rem;
          border-radius: 0.75rem;
          overflow: hidden;
          margin-bottom: 1.5rem;
          border: 2px solid #FFD700;
          box-shadow: 0 0 10px #FFD700, 0 0 20px #FFD700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (min-width: 640px) {
          .banner-placeholder {
            height: 16rem;
          }
        }
        
        .title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #FFD700;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        @media (min-width: 768px) {
          .title {
            font-size: 3rem;
          }
        }
        
        .ticket-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          background-color: rgba(63, 63, 70, 0.5);
          border-radius: 1rem;
          padding: 1rem 1.5rem;
          margin-bottom: 1rem;
          border: 1px solid;
          transition: all 0.3s ease;
        }
        .ticket-section:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        @media (min-width: 640px) {
          .ticket-section {
            flex-direction: row;
          }
        }

        .ticket-info {
          margin-bottom: 1rem;
        }
        @media (min-width: 640px) {
          .ticket-info {
            margin-bottom: 0;
          }
        }

        .ticket-label {
          font-size: 1.125rem;
          font-weight: 600;
        }
        @media (min-width: 640px) {
          .ticket-label {
            font-size: 1.25rem;
          }
        }
        
        .ticket-available {
          font-size: 0.875rem;
          color: #d1d5db;
        }

        .ticket-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .control-button {
          width: 2rem;
          height: 2rem;
          border-radius: 9999px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.25rem;
          box-shadow: 0 0 5px rgba(255, 215, 0, 0.5), 0 0 10px rgba(0, 166, 147, 0.5);
          transition: all 0.3s ease;
        }
        .control-button:hover {
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.8), 0 0 25px rgba(0, 166, 147, 0.8);
          transform: translateY(-2px);
        }
        .control-button.gold {
          background-color: #FFD700;
          color: #1f2937;
        }
        .control-button.gold:hover {
          background-color: #CCAA00;
        }
        .control-button.teal {
          background-color: #00A693;
        }
        .control-button.teal:hover {
          background-color: #00877C;
        }

        .ticket-count {
          font-size: 1.25rem;
          font-weight: 700;
          color: #f3f4f6;
          width: 2rem;
          text-align: center;
        }
        
        .total-section {
          border-top: 2px solid #374151;
          padding-top: 1.5rem;
        }

        .price-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .total-label {
          font-size: 1.5rem;
          font-weight: 700;
          color: #FFD700;
        }
        
        .total-price {
          font-size: 1.875rem;
          font-weight: 700;
          color: #00A693;
        }

        .book-button {
          width: 100%;
          padding: 1rem;
          text-align: center;
          font-size: 1.25rem;
          font-weight: 700;
          border-radius: 0.75rem;
          background: linear-gradient(to right, #FFD700, #00A693);
          color: #1f2937;
          box-shadow: 0 0 10px #FFD700, 0 0 20px #FFD700;
          transition: transform 0.3s ease;
        }
        .book-button:hover {
          transform: scale(1.05);
        }
        .book-button:disabled {
          background: linear-gradient(to right, #9ca3af, #4b5563);
          color: #d1d5db;
          cursor: not-allowed;
          box-shadow: none;
        }
        
        .footer {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.875rem;
          color: #9ca3af;
        }

      `}</style>

      <div className="cinematic-card">
        <header className="header">
          <div className="banner-placeholder">
            {/* Placeholder for Event Banner */}
            <p className="text-gray-400 text-lg">Event Banner Placeholder</p>
          </div>
          <h1 className="title">Sanda Ek Dinak</h1>
        </header>

        <main>
          {/* Premium Ticket Section */}
          <div className="ticket-section border-teal">
            <div className="ticket-info">
              <h2 className="ticket-label text-gold">{premium.label}</h2>
              <p className="ticket-available">Available: {premium.max - premiumTickets}</p>
            </div>
            <div className="ticket-controls">
              <button
                onClick={() => handleTicketChange('premium', 'decrement')}
                className="control-button teal"
              >
                -
              </button>
              <span className="ticket-count">{premiumTickets}</span>
              <button
                onClick={() => handleTicketChange('premium', 'increment')}
                className="control-button teal"
              >
                +
              </button>
            </div>
          </div>

          {/* Standard Ticket Section */}
          <div className="ticket-section border-gold">
            <div className="ticket-info">
              <h2 className="ticket-label text-teal">{standard.label}</h2>
              <p className="ticket-available">Available: {standard.max - standardTickets}</p>
            </div>
            <div className="ticket-controls">
              <button
                onClick={() => handleTicketChange('standard', 'decrement')}
                className="control-button gold"
              >
                -
              </button>
              <span className="ticket-count">{standardTickets}</span>
              <button
                onClick={() => handleTicketChange('standard', 'increment')}
                className="control-button gold"
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
