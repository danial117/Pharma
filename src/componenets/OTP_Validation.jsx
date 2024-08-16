// src/components/OtpPage.js
import { useState } from 'react';
import BackgroundImage from '../assets/form.jpg'
import { WindowSharp } from '@mui/icons-material';

const OtpPage = () => {
  const [otp, setOtp] = useState('');
const apiUrl=process.env.VITE_API_URL
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${apiUrl}/admin/verify-otp`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
        body:JSON.stringify({otp:otp})
    }).then((response)=>response.json()).then((data)=>{
        console.log(data)
        localStorage.setItem('token',data.accessToken);
        localStorage.setItem('permissions',data.permission);
        window.location.href='/'
        
    })


    



  };

  return (
    <div >
    <div style={{width:'100%',height:'100vh',backgroundImage: `linear-gradient(to right,rgba(0,0,0,0.5), rgba(0,0,0,0.1)), url(${BackgroundImage})`,backgroundPosition:'center',backgroundSize:'cover'}} className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-4 text-center">OTP Verification</h1>
        <p className="text-gray-600 mb-6 text-center">Please enter the OTP sent to your email or phone number.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">OTP:</label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter OTP"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default OtpPage;
