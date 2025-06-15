import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const EditPost = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', desc: '', image: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/posts/${id}`)
      .then((res) => {
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
      navigate('/');
    }
  }, [user, post, navigate]);

  const uploadImage = async (file) => {
    if (!file) {
      setError('Please select an image first');
      return null;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', import.meta.env.VITE_IMGBB_KEY);

    try {
      setUploading(true);
      const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploading(false);
      setError(null);
      return response.data.data.url;
    } catch (err) {
      setUploading(false);
      setError('Failed to upload image, please try again');
      console.error(err);
      return null;
    }
  };

  // Handle image file selection
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      setPost((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `${BASE_URL}/posts/${id}`,
        post,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/');
    } catch {
      alert('Failed to update post');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-pink-600">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-pink-600 font-bold mb-2">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border-2 border-pink-600 rounded text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
          {uploading && <p className="text-pink-600 mt-2">Uploading image...</p>}
          {post.image && (
            <div className="relative w-full h-80 bg-pink-400/30 mt-2 rounded-xl overflow-hidden">
              <img
                className="w-full h-full object-cover rounded-xl"
                src={post.image}
                alt="Preview"
              />
            </div>
          )}
        </div>
        <input
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          placeholder="Title"
          className="w-full px-4 py-2 border-2 border-pink-600 rounded text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />
        <textarea
          value={post.desc}
          onChange={(e) => setPost({ ...post, desc: e.target.value })}
          placeholder="Description"
          className="w-full px-4 py-2 border-2 border-pink-600 rounded text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
          rows={5}
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
          disabled={uploading} // Disable button while uploading
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditPost;