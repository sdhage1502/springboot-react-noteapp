import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import Navbar from './components/Navbar';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/notes" element={<NoteList />} />
      <Route path="/notes/new" element={<NoteForm />} />
      <Route path="/notes/:id" element={<NoteForm />} />
      <Route path="/" element={<Login />} />
    </Routes>
  </Router>
);

export default App;