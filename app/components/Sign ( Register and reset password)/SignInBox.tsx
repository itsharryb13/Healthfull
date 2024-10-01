"use client";
import { error } from "console";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from "firebase/compat/app";
import 'firebase/auth';
import Link from "next/link";
import React, {useRef, useState} from 'react';


export function SignInBox(){

  const auth = getAuth();
  const inputUserRef = useRef<HTMLInputElement>(null);
  const inputPassRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState('');
  
  const handleClick = () => {
    const email = inputUserRef.current?.value;
    const pass = inputPassRef.current?.value;

    if (email && pass) {
      signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Successful sign-in
        const user = userCredential.user;
        console.log("Signing in ", email, " with password ", pass);
        window.location.href = '../HomePage';
      })
      .catch((error) => {
        // Failed sign-in
        var errorMessage = error.message;
        setErrorMessage(errorMessage);
        console.error(errorMessage);
        console.log(email, "and", pass, "are not valid");
      });
    } else {
      var errorMessage = "";
      if (!email && !pass) {
        errorMessage = "Please enter your email and password.";
      }
      if (!email && pass) {
        errorMessage = "Please enter your email.";
      }
      if (email && !pass) {
        errorMessage = "Please enter your password.";
      }
      setErrorMessage(errorMessage);
      console.error(errorMessage);
    }
  };
  
    return(
         <div className='main-container flex w-[520px] h-[315px] pt-[24px] pr-[24px] pb-[24px] pl-[24px] flex-col gap-[24px] items-start flex-nowrap bg-[#e5dece] rounded-[8px] border-solid border border-[#d9d9d9] relative mx-auto my-0'>
      <div className='flex flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative'>
        <span className="h-[22px] self-stretch shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[22px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[1]">
          Email
        </span>
        <div className='flex pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] relative overflow-hidden z-[2]'>
          <input id="email" type="text" ref={inputUserRef}
            className='w-[472px] h-[40px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[4]' />
          <span className="h-[16px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#b3b3b3] relative text-left whitespace-nowrap z-[3]">
            Email
          </span>
        </div>
      </div>
      <div className='flex flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[5]'>
        <span className="h-[22px] self-stretch shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[22px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[6]">
          Password
        </span>
        <div className='flex pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] relative overflow-hidden z-[7]'>
          <input
            id="password"
            type="text"
            ref={inputPassRef}
            placeholder="Password"
            className='w-[472px] h-[40px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[9]' />
          {/* <span className="h-[16px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#b3b3b3] relative text-left whitespace-nowrap z-[8]">
            Password
          </span> */}
        </div>
      </div>
      <button onClick={handleClick}
        className='flex gap-[16px] items-center self-stretch shrink-0 flex-nowrap border-none relative z-10 pointer'>
        <div className='flex pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#2c2c2c] rounded-[8px] border-solid border border-[#2c2c2c] relative overflow-hidden z-[11]'>
          <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#f5f5f5] relative text-left whitespace-nowrap z-[12]">
            Sign In
          </span>
        </div>
      </button>
      {errorMessage &&
      <div
        className="error-message">{errorMessage}
      </div>}
      <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[13]'>
        <span className="h-[22px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[22px] text-[#1e1e1e] relative text-left underline whitespace-nowrap z-[14]">
          Forgot password?
        </span>
      </div>
    </div>
    );
}