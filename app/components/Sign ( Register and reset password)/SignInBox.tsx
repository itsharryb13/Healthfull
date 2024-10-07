"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../firebaseConfig';
import Link from "next/link";
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export function SignInBox() {
  const inputUserRef = useRef<HTMLInputElement>(null);
  const inputPassRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  // Handle sign-in button click
  const handleClick = () => {
    const email = inputUserRef.current?.value;
    const pass = inputPassRef.current?.value;

    if (email && pass) {
      signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          // Successful sign-in
          const user = userCredential.user;
          console.log("Signing in ", email, " with password ", pass);
          window.location.href = '../HomePage'; // Redirect to home page
        })
        .catch((error) => {
          // Handle sign-in error
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
          console.error(errorMessage);
        });
    } else {
      // Handle empty input fields
      let errorMessage = "";
      if (!email && !pass) {
        errorMessage = "Please enter your email and password.";
      } else if (!email) {
        errorMessage = "Please enter your email.";
      } else if (!pass) {
        errorMessage = "Please enter your password.";
      }
      setErrorMessage(errorMessage);
      console.error(errorMessage);
    }
  };

  return (
    <div className='flex flex-col w-[520px] h-[315px] p-[24px] bg-[#e5dece] rounded-[8px] border border-[#d9d9d9] mx-auto'>
      {/* Email Input */}
      <div className='flex flex-col gap-[8px]'>
        <label className="text-[#1e1e1e] text-[16px] font-normal">
          Email
        </label>
        <input
          id="email"
          type="text"
          ref={inputUserRef}
          placeholder="Email"
          className='w-full h-[40px] p-[12px] bg-white border border-[#d9d9d9] rounded-[8px] focus:outline-none'
        />
      </div>


      {/* Password Input */}
      <div className='flex flex-col gap-[8px] mt-[5%]'>
        <label className="text-[#1e1e1e] text-[16px] font-normal">
          Password
        </label>
        <div className='flex items-center'>
          <input
            id="password"
            type={showPassword ? "text" : "password"} // Toggle input type
            ref={inputPassRef}
            placeholder="Password"
            className='w-full h-[40px] p-[12px] bg-white border border-[#d9d9d9] rounded-[8px] focus:outline-none'
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            className='ml-2 text-[#2c2c2c] hover:text-[#1e1e1e]'
          >
           <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
      </div>

      {/* Sign In Button */}
      <button onClick={handleClick} className='flex items-center justify-center h-[40px] bg-[#2c2c2c] rounded-[8px] text-[#f5f5f5] mt-[5%]'>
        <span className="text-[16px] font-normal">
          Sign In
        </span>
      </button>

      {/* Error Message Display */}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}

      {/* Forgot Password Link */}
      <div className='flex justify-start mt-[5%]'>
        <Link href="/forgot-password" className="underline text-[#1e1e1e] text-[16px] font-normal">
          Forgot password?
        </Link>
      </div>
    </div>
  );
}
