import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const BlogPage = ({ user }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/posts`).then(res => {
      setPosts(res.data.data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const token = localStorage.getItem("token");
        console.log(token)
        
        if (user._id !== posts.filter(p => p._id === id)[0].createdBy._id) {
          throw new Error ("Acess Denied");
        }

        await axios.delete(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(posts.filter(post => post._id !== id));
      } catch (error) {
        alert(error);
      }
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center max-w-md mx-auto mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-grow px-4 py-2 border-2 border-pink-600 rounded-md text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        {
          user && (
            <button
              onClick={() => navigate('/create')}
              className="flex items-center space-x-2 border-2 border-pink-800 text-pink-700 px-6 py-3 rounded text-lg font-semibold transition-all duration-300 hover:bg-pink-600 hover:border-pink-600 hover:text-white cursor-pointer select-none"
            >
              <FaPlus />
              <span>Create Post</span>
            </button>
          )
        }
      </div>

      {filteredPosts.map(post => (
        <div
          key={post._id}
          className="bg-pink-50 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 w-full"
        >
          <img src={post.image} alt={post.title} className="w-full h-60 object-cover" />
          <div className="p-6 text-center">
            <h2 className="text-2xl font-semibold mb-3 text-pink-600">{post.title}</h2>
            <h2 className="text-lg font-semibold mb-3 text-pink-600">By {post.createdBy.name}</h2>
            <p className="mb-5 text-pink-500">{post.desc}</p>
            <div className="flex justify-center space-x-4">
              {
                user && user._id === post.createdBy._id && (
                  <>
                    <button
                    onClick={() => navigate(`/edit/${post._id}`)}
                    className="flex items-center space-x-2 border-2 border-pink-800 text-[#b57edc] px-5 py-2 rounded transition-all duration-300 hover:bg-pink-500 hover:border-pink-500 hover:text-white cursor-pointer"
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="flex items-center space-x-2 border-2 border-pink-800 text-[#b57edc] px-5 py-2 rounded transition-all duration-300 hover:bg-pink-500 hover:border-pink-500 hover:text-white cursor-pointer"
                  >
                    <FaTrash />
                    <span>Delete</span>
                  </button>
                  </>
                )
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
