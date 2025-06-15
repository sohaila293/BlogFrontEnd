import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
  const navigate = useNavigate();
  const [post, setPost] = React.useState({
    title: '',
    desc: '',
    image: '',
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_API_URL}/posts`, post, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/');
    } catch {
      alert('Failed to create post');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-pink-600 p-4 text-white">
        <h1 className="text-2xl font-bold">Create New Post</h1>
      </header>

      <main className="container mx-auto p-4 mb-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow border-2 border-pink-600"
        >
          <label className="block text-pink-600 font-bold mb-2">Image URL</label>
          <input
            type="text"
            name="image"
            value={post.image}
            onChange={handleChange}
            className="border border-pink-600 rounded w-full py-2 px-3 mb-5 text-pink-600 focus:outline-none focus:shadow-outline"
            placeholder="Enter image URL"
            required
          />
          <div className="relative w-full h-80 bg-pink-400/30 mb-5 rounded-xl overflow-hidden">
            {post.image ? (
              <img
                className="w-full h-full object-cover rounded-xl"
                src={post.image}
                alt="Preview"
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center text-pink-600 text-lg font-semibold">
                Image Preview
              </div>
            )}
          </div>

          <label htmlFor="title" className="block text-pink-600 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="border border-pink-600 rounded w-full py-2 px-3 mb-4 text-pink-600 focus:outline-none focus:shadow-outline"
            required
          />

          <label htmlFor="description" className="block text-pink-600 font-bold mb-2">Description</label>
          <textarea
            id="description"
            name="desc"
            value={post.desc}
            onChange={handleChange}
            className="border border-pink-600 rounded w-full h-44 py-2 px-3 mb-4 text-pink-600 focus:outline-none focus:shadow-outline"
            required
          />

          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="
                bg-white
                text-pink-600
                font-bold
                py-2 px-6
                rounded
                border-2 border-pink-600
                cursor-pointer
                transition
                duration-300
                hover:bg-pink-600
                hover:text-white
              "
            >
              Create Post
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreatePost;
