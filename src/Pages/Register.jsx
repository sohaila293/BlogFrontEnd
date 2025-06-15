import React from 'react';
import bg1 from "../assets/images/bg1.jpg";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

const RegisterForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await api.post('/auth/register', values);
        navigate('/Login');  
      } catch(err) {
        console.log(err);
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
        className="w-full max-w-2xl p-8 sm:p-10 bg-pink-50 bg-opacity-90 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] space-y-6 animate-fade-in"
      >
        <h2 className="text-2xl text-pink-800 font-bold text-center">Register</h2>

        <div>
          <input
            name="name"
            placeholder="Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={`block w-full p-2 bg-transparent border-b-2
              ${formik.touched.name && formik.errors.name
                ? 'border-pink-600 text-pink-900 placeholder-pink-700 focus:outline-none focus:border-pink-700'
                : 'border-pink-300 text-pink-900 placeholder-pink-500 focus:outline-none focus:border-pink-600'
              }`}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="mt-1 text-sm text-pink-600">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <input
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={`block w-full p-2 bg-transparent border-b-2
              ${formik.touched.email && formik.errors.email
                ? 'border-pink-600 text-pink-900 placeholder-pink-700 focus:outline-none focus:border-pink-700'
                : 'border-pink-300 text-pink-900 placeholder-pink-500 focus:outline-none focus:border-pink-600'
              }`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-sm text-pink-600">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={`block w-full p-2 bg-transparent border-b-2
              ${formik.touched.password && formik.errors.password
                ? 'border-pink-600 text-pink-900 placeholder-pink-700 focus:outline-none focus:border-pink-700'
                : 'border-pink-300 text-pink-900 placeholder-pink-500 focus:outline-none focus:border-pink-600'
              }`}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="mt-1 text-sm text-pink-600">{formik.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
