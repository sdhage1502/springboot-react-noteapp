import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/notes')
      .then((response) => setNotes(response.data))
      .catch((err) => setError(err.response?.data?.error || 'Failed to fetch notes'));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await api.delete(`/notes/${id}`);
        setNotes(notes.filter((note) => note.id !== id));
      } catch (err) {
        setError(err.response?.data?.error || 'Delete failed');
      }
    }
  };

  return (
    <div className="max-w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left">Your Notes</h2>
        {error && <p className="text-danger text-sm text-center mb-4">{error}</p>}
        <Link
          to="/notes/new"
          className="mb-6 inline-block px-4 py-2 bg-secondary text-white rounded-md hover:bg-green-600 transition-colors duration-200 text-sm sm:text-base"
        >
          Create New Note
        </Link>
        {notes.length === 0 ? (
          <p className="text-gray-500 text-sm sm:text-base text-center">No notes yet. Create one!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {notes.map((note) => (
              <div
                key={note.id}
                className="p-4 border border-gray-200 rounded-md bg-card shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-col h-full">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">{note.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm sm:text-base flex-grow">
                    {note.content.length > 100 ? note.content.substring(0, 100) + '...' : note.content}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-2">
                    Created: {new Date(note.createdAt).toLocaleString()}
                  </p>
                  <div className="mt-4 flex justify-end space-x-3">
                    <Link
                      to={`/notes/${note.id}`}
                      className="text-primary hover:underline text-sm sm:text-base"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="text-danger hover:underline text-sm sm:text-base"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteList;