import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/forgot-password`, { 
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email:email})
       }).then((response)=>{
        
        if(response.status === 200){
          setMessage('Email link succesfully sent.')
        }
      })
      
    } catch (error) {
      
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded">
      <h1 className="text-xl font-bold mb-4">Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
