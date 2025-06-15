import React from 'react';
import bg1 from "../assets/images/bg1.jpg";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

const LoginForm = ({ setUser }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { setStatus }) => {
      try {
        const res = await api.post(`/auth/login`, values);
        if (res.data.user) {
          localStorage.setItem('token', res.data.token);
          setUser(res.data.user);
          navigate('/');
        } else {
          setStatus('Invalid email or password');
        }
      } catch {
        navigate('/error');
      }
    }
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        fontFamily: "'Edu NSW ACT Cursive', cursive",
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-2xl p-8 sm:p-10 bg-pink-50 bg-opacity-90 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] animate-fade-in"
      >
        <h2 className="text-2xl text-pink-800 font-bold mb-6 text-center">Login</h2>

        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-pink-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className={`block w-full p-2 text-sm bg-transparent border-b-2
              ${formik.touched.email && formik.errors.email
                ? 'border-pink-600 text-pink-900 placeholder-pink-700 focus:outline-none focus:border-pink-700'
                : 'border-pink-300 text-pink-900 placeholder-pink-500 focus:outline-none focus:border-pink-600'
              }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-2 text-sm text-pink-600">{formik.errors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-pink-700">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className={`block w-full p-2 text-sm bg-transparent border-b-2
              ${formik.touched.password && formik.errors.password
                ? 'border-pink-600 text-pink-900 placeholder-pink-700 focus:outline-none focus:border-pink-700'
                : 'border-pink-300 text-pink-900 placeholder-pink-500 focus:outline-none focus:border-pink-600'
              }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="mt-2 text-sm text-pink-600">{formik.errors.password}</p>
          )}
        </div>

        {formik.status && (
          <p className="mb-4 text-center text-sm text-red-600 font-medium">{formik.status}</p>
        )}

        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
