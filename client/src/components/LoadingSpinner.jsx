import React from 'react';
import './LoadingSpinner.css';

const GramophoneIcon = () => (
  <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 120H120V130H30V120Z" fill="#5A3E36"/>
    <path d="M35 90H115V120H35V90Z" fill="#A0522D"/>
    <path d="M40 95H110V115H40V95Z" fill="#8B4513"/>
    <circle cx="75" cy="75" r="30" fill="#CD853F"/>
    <circle cx="75" cy="75" r="10" fill="#2F4F4F"/>
    <path d="M75 45L110 20L120 25L85 50L75 45Z" fill="#D2B48C"/>
    <path d="M110 20L130 30L135 20L115 10L110 20Z" fill="#C0C0C0"/>
  </svg>
);

const MusicNoteIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18V6.5C9 5.12 10.12 4 11.5 4C12.88 4 14 5.12 14 6.5V14.5M9 18H12C13.1 18 14 17.1 14 16V14.5M9 18C7.9 18 7 17.1 7 16V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 14.5C15.1 14.5 16 13.6 16 12.5V9C16 7.9 15.1 7 14 7C12.9 7 12 7.9 12 9V14.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="gramophone">
        <GramophoneIcon />
        <div className="notes">
          <div className="note n1"><MusicNoteIcon /></div>
          <div className="note n2"><MusicNoteIcon /></div>
          <div className="note n3"><MusicNoteIcon /></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
