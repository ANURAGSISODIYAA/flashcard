import React, { useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard({ flashcards, setFlashcards }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrEdit = () => {
    if (editIndex !== null) {
      const updatedFlashcards = flashcards.map((flashcard, index) => 
        index === editIndex ? { question, answer } : flashcard
      );
      setFlashcards(updatedFlashcards);
      axios.put(`http://localhost:5000/flashcards/${flashcards[editIndex].id}`, { question, answer })
        .catch(error => console.error('Error updating flashcard:', error));
      setEditIndex(null);
    } else {
      axios.post('http://localhost:5000/flashcards', { question, answer })
        .then(response => setFlashcards([...flashcards, response.data]))
        .catch(error => console.error('Error adding flashcard:', error));
    }
    setQuestion('');
    setAnswer('');
  };

  const handleEdit = (index) => {
    setQuestion(flashcards[index].question);
    setAnswer(flashcards[index].answer);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const id = flashcards[index].id;
    axios.delete(`http://localhost:5000/flashcards/${id}`)
      .then(() => {
        const updatedFlashcards = flashcards.filter((_, i) => i !== index);
        setFlashcards(updatedFlashcards);
      })
      .catch(error => console.error('Error deleting flashcard:', error));
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div className="form">
        <input 
          type="text" 
          placeholder="Question" 
          value={question} 
          onChange={e => setQuestion(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Answer" 
          value={answer} 
          onChange={e => setAnswer(e.target.value)} 
        />
        <button onClick={handleAddOrEdit}>
          {editIndex !== null ? 'Update Flashcard' : 'Add Flashcard'}
        </button>
      </div>

      <h3>Flashcard List</h3>
      <ul>
        {flashcards.map((flashcard, index) => (
          <li key={index} className="flashcard-item">
            <span><strong>Q:</strong> {flashcard.question} - <strong>A:</strong> {flashcard.answer}</span>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
