import React from 'react';
import './LoadingSpinner.css';

const GramophoneIcon = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M75 25L25 37.5V75H75V25Z" stroke="white" strokeWidth="4"/>
    <path d="M25 50H75" stroke="white" strokeWidth="4"/>
    <path d="M50 75V25" stroke="white" strokeWidth="4"/>
    <circle cx="50" cy="50" r="10" fill="white"/>
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
