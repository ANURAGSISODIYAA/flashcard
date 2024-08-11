import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlashcardViewer from './FlashcardViewer';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    axios.get('https://backend-flashcard-eta.vercel.app/flashcards')
      .then(response => setFlashcards(response.data))
      .catch(error => console.error('Error fetching flashcards:', error));
  }, []);

  return (
    <div className="App">
      <h1>Flashcard Tool</h1>
      <FlashcardViewer flashcards={flashcards} />
      <Dashboard flashcards={flashcards} setFlashcards={setFlashcards} />
    </div>
  );
}

export default App;
