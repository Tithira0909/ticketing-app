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
          background: #fdfdfd; /* Very light grey */
          color: #212121; /* Dark grey for text */
          font-family: 'Inter', sans-serif;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Gold color helper classes - I will remove the teal ones from the JSX */
        .text-gold {
          color: #D4AF37;
        }
        .border-gold {
          border-color: #D4AF37;
        }
        .bg-gold {
          background-color: #D4AF37;
        }

        .cinematic-card {
          background-color: #ffffff;
          border-radius: 1.5rem;
          padding: 2.5rem;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
          max-width: 48rem;
          width: 100%;
          border: 1px solid #f0f0f0;
        }

        .header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .banner-placeholder {
          width: 100%;
          aspect-ratio: 9 / 16;
          height: auto;
          max-height: 400px; /* Add a max-height to prevent it from becoming too large on desktop */
          border-radius: 0.75rem;
          overflow: hidden;
          margin: 0 auto 1.5rem auto; /* Center the banner */
          border: 2px solid #D4AF37;
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
          background-color: #fafafa;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #aaa;
          font-style: italic;
        }

        .title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #D4AF37;
          text-shadow: none;
        }
        @media (min-width: 768px) { .title { font-size: 3rem; } }

        .ticket-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          background-color: #fff;
          border-radius: 1rem;
          padding: 1rem 1.5rem;
          margin-bottom: 1rem;
          border: 1px solid #eee;
          transition: all 0.3s ease;
        }
        .ticket-section:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.08);
        }
        @media (min-width: 640px) { .ticket-section { flex-direction: row; } }

        .ticket-info { margin-bottom: 1rem; }
        @media (min-width: 640px) { .ticket-info { margin-bottom: 0; } }

        .ticket-label {
          font-size: 1.125rem;
          font-weight: 600;
          color: #212121; /* Use default dark text color */
        }
        @media (min-width: 640px) { .ticket-label { font-size: 1.25rem; } }

        .ticket-available {
          font-size: 0.875rem;
          color: #888;
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
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.25rem;
          border: none;
          transition: all 0.3s ease;
        }
        .control-button:hover {
          transform: translateY(-1px);
        }

        /* Make all buttons gold */
        .control-button.gold, .control-button.teal {
          background-color: #D4AF37;
          color: #fff;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .control-button.gold:hover, .control-button.teal:hover {
          background-color: #c8a430;
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        .ticket-count {
          font-size: 1.25rem;
          font-weight: 700;
          color: #212121;
          width: 2rem;
          text-align: center;
        }

        .total-section {
          border-top: 1px solid #eee;
          padding-top: 1.5rem;
          margin-top: 1.5rem;
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
          color: #D4AF37;
        }

        .total-price {
          font-size: 1.875rem;
          font-weight: 700;
          color: #212121;
        }

        .book-button {
          width: 100%;
          padding: 1rem;
          text-align: center;
          font-size: 1.25rem;
          font-weight: 700;
          border-radius: 0.75rem;
          background: #D4AF37;
          color: #fff;
          border: none;
          box-shadow: 0 4px 15px -5px rgba(212, 175, 55, 0.5);
          transition: all 0.3s ease;
        }
        .book-button:hover {
          transform: scale(1.02);
          background: #c8a430;
          box-shadow: 0 6px 20px -5px rgba(212, 175, 55, 0.6);
        }
        .book-button:disabled {
          background: #f0f0f0;
          color: #bbb;
          cursor: not-allowed;
          box-shadow: none;
        }

        .footer {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.875rem;
          color: #aaa;
        }

      `}</style>

      <div className="cinematic-card">
        <header className="header">
          <div className="banner-placeholder">
            <p>Banner Image (9:16)</p>
          </div>
          <h1 className="title">Sanda Ek Dinak</h1>
        </header>

        <main>
          {/* Premium Ticket Section */}
          <div className="ticket-section">
            <div className="ticket-info">
              <h2 className="ticket-label">{premium.label}</h2>
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
          <div className="ticket-section">
            <div className="ticket-info">
              <h2 className="ticket-label">{standard.label}</h2>
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
