import React, { useState, useEffect } from 'react';
import FlashcardViewer from './FlashcardViewer';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const [flashcards, setFlashcards] = useState([]);

  // Load flashcards from local storage on component mount
  useEffect(() => {
    const storedFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    setFlashcards(storedFlashcards);
  }, []);

  // Save flashcards to local storage
  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

  return (
    <div className="App">
      <h1>Flashcard Tool</h1>
      <FlashcardViewer flashcards={flashcards} />
      <Dashboard flashcards={flashcards} setFlashcards={setFlashcards} />
    </div>
  );
}

export default App;
