import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const NoteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/notes/${id}`)
        .then((response) => {
          setTitle(response.data.title);
          setContent(response.data.content);
        })
        .catch((err) => setError(err.response?.data?.error || 'Failed to fetch note'));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }
    setError('');
    try {
      if (id) {
        await api.put(`/notes/${id}`, { title, content });
      } else {
        await api.post('/notes', { title, content });
      }
      navigate('/notes');
    } catch (err) {
      setError(err.response?.data?.error || (id ? 'Update failed' : 'Create failed'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-card p-6 sm:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
          {id ? 'Edit Note' : 'Create Note'}
        </h2>
        {error && <p className="text-danger text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter content"
              className="w-full p-3 border border-gray-300 rounded-md h-32 sm:h-40 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-sm sm:text-base"
          >
            {id ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;