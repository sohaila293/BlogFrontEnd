import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const port = '3000';
const BASE_URL = `http://localhost:${port}`;

const EditPost = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', desc: '', image: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/posts/${id}`)
    .then(res => {
      setPost(res.data.data);
      setLoading(false);
    })
    .catch(() => {
      setError('Failed to fetch post data');
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (user && post && post.createdBy && user._id !== post.createdBy._id) {
      navigate("/");
    }
  }, [user, post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios.put(`${BASE_URL}/posts/${id}`, post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      navigate('/');
    })
    .catch(() => alert('Failed to update post'));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-pink-600">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={post.title}
          onChange={e => setPost({ ...post, title: e.target.value })}
          placeholder="Title"
          className="w-full px-4 py-2 border-2 border-pink-600 rounded text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />
        <textarea
          value={post.desc}
          onChange={e => setPost({ ...post, desc: e.target.value })}
          placeholder="Description"
          className="w-full px-4 py-2 border-2 border-pink-600 rounded text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
          rows={5}
          required
        />
        <input
          type="text"
          value={post.image}
          onChange={e => setPost({ ...post, image: e.target.value })}
          placeholder="Image URL"
          className="w-full px-4 py-2 border-2 border-pink-600 rounded text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditPost;
