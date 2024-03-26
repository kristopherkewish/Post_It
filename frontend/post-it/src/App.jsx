import './App.css'
import Header from './components/Header/Header.jsx';
import PostItContainer from './components/PostItContainer/PostItContainer.jsx';
import NewNoteForm from './components/NewNoteForm/NewNoteForm.jsx';
import { fetchNotes } from './utils/fetchNotes.js';
import { createNote } from './utils/createNote.js';
import { deleteNote } from './utils/deleteNote.js';
import { updateNote } from './utils/updateNote.js';
import { isLoggedIn } from './utils/isLoggedIn.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const loadingNote = [{
    id: 'loading',
    title: "Loading...",
    description: "Please wait while data is fetched from the server."
  }];

  // const navigate = useNavigate();
  const [notes, setNotes] = useState(loadingNote);
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    // isLoggedIn().then(loggedIn => !loggedIn && navigate('/login'));
    fetchNotes().then(data => setNotes(data));
  },[])

  const handleNewNoteSubmit = (newNote) => {
    createNote(newNote)
      .then(() => {
        fetchNotes().then(data => setNotes(data));
      })
      .catch(err => console.log('Error creating note!', err));
  };

  const handleNoteDelete = (noteId) => {
    deleteNote(noteId)
      .then(() => {
        fetchNotes().then(data => setNotes(data));
      })
      .catch(err => console.log('Error deleting note!', err));
  };
  
  const handleEditClick = (noteId) => setEditMode(noteId);

  const handleNoteUpdate = (id, newNote) => {
    updateNote(id, newNote)
      .then(() => {
        setEditMode(null);
        fetchNotes().then(data => setNotes(data));
      })
      .catch(err => console.log('Error updating note!', err));
  };

  return (
    <>
      <Header />
      <PostItContainer 
        notes={notes} 
        editMode={editMode}
        onNoteDelete={handleNoteDelete} 
        onEditClick={handleEditClick}
        onUpdateClick={handleNoteUpdate}
      />
      <NewNoteForm onSubmit={handleNewNoteSubmit}/>
    </>
  )
}

export default App
