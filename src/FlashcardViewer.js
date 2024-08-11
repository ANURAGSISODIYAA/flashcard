import React, { useState } from 'react';
import './FlashcardViewer.css'; 

function FlashcardViewer({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  if (flashcards.length === 0) return <div>No flashcards available.</div>;

  const currentCard = flashcards[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setIsClicked(true); 
  };

  const handleNext = () => {
    setIsFlipped(false);
    setIsClicked(false); 
    setCurrentIndex((currentIndex + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setIsClicked(false); 
    setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="flashcard-viewer">
      <div className={`flashcard ${isClicked ? 'clicked' : ''}`} onClick={handleFlip}>
        {isFlipped ? currentCard.answer : currentCard.question}
      </div>
      <div className="button-container">
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default FlashcardViewer;
