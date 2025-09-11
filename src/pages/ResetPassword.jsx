import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mailIcon from '../../src/assets/mail.png';
import lockIcon from '../../src/assets/lock.png';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext)
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email });
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const onSubmitOTP = (e) => {
    e.preventDefault();
    const otpValue = inputRefs.current.map(input => input.value).join('');
    setOtp(otpValue);
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', { email, otp, newPassword });
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate('/login');
    } catch (error) {
      toast.error(data.message);
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-green-200 to-green-500'>
      
      {/* Enter Email Id */}
      {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className='bg-white p-8 rounded-lg shadow-md w-96 text-sm'>
          <h1 className='text-center text-2xl font-bold tracking-widest mb-4'>Reset password</h1>
          <p className='text-center mb-6 text-gray-600'>Enter your registered email address</p>
          <div className='mb-4 flex items-center gap-3 w-full border-b border-gray-300 focus-within:border-green-400 px-3 py-2 rounded-md'>
            <img src={mailIcon} alt='' className='w-5 h-5' />
            <input
              type='email'
              placeholder='Email id'
              className='bg-transparent outline-none w-full'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className='w-full py-2 rounded-full bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold shadow-md hover:opacity-90 transition'>
            Submit
          </button>
        </form>
      )}

      {/* OTP input form */}
      {!isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitOTP} className='bg-white p-8 rounded-lg shadow-md w-96 text-sm'>
          <h1 className='text-center text-2xl font-bold tracking-widest mb-4'>Reset password OTP</h1>
          <p className='text-center mb-6 text-gray-600'>Enter the 6-digit code sent to your email id.</p>
          <div className='flex justify-between mb-8'>
            {Array(6).fill(0).map((_, index) => (
              <input
                type='text'
                maxLength='1'
                key={index}
                required
                className='w-12 h-12 border-b border-gray-300 text-center text-xl rounded-md focus:border-green-400 outline-none'
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
              />
            ))}
          </div>
          <button className='w-full py-2 rounded-full bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold shadow-md hover:opacity-90 transition'>
            Submit
          </button>
        </form>
      )}

      {/* Enter New Password */}
      {isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitNewPassword} className='bg-white p-8 rounded-lg shadow-md w-96 text-sm'>
          <h1 className='text-center text-2xl font-bold tracking-widest mb-4'>New password</h1>
          <p className='text-center mb-6 text-gray-600'>Enter the new password</p>
          <div className='mb-4 flex items-center gap-3 w-full border-b border-gray-300 focus-within:border-green-400 px-3 py-2 rounded-md'>
            <img src={lockIcon} alt='' className='w-5 h-5' />
            <input
              type='password'
              placeholder='Password'
              className='bg-transparent outline-none w-full'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button className='w-full py-2 rounded-full bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold shadow-md hover:opacity-90 transition'>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
