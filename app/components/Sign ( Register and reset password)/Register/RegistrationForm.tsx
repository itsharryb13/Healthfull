"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Password validation
  const validatePassword = () => {
    let error = "";
    if (password.length < 8) {
      error = "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(password)) {
      error = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      error = "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(password)) {
      error = "Password must contain at least one number.";
    } else if (!/[!@#$%^&*]/.test(password)) {
      error = "Password must contain at least one special character (!@#$%^&*).";
    }
    setPasswordError(error);
    return error === "";
  };

  // Password matching validation
  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return false;
    } else {
      setConfirmPasswordError("");
      return true;
    }
  };

  // Watch password and confirmPassword fields to reset errors when valid
  useEffect(() => {
    if (password.length >= 8 && passwordError) {
      validatePassword(); // Reset error if password becomes valid
    }
  }, [password]);

  useEffect(() => {
    if (password === confirmPassword && confirmPasswordError) {
      validateConfirmPassword(); // Reset error if passwords match
    }
  }, [confirmPassword]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (isPasswordValid && isConfirmPasswordValid) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="main-container w-[500px] relative mx-auto my-0 space-y-4">
      {/* Name Field */}
      <div className="w-full">
        <label className="block text-[16px] font-normal text-[#1e1e1e]">Name</label>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-[40px] bg-[#fff] rounded-[8px] border border-[#d9d9d9] p-[12px] text-[#b3b3b3]"
        />
      </div>

      {/* Email Field */}
      <div className="w-full">
        <label className="block text-[16px] font-normal text-[#1e1e1e]">Email</label>
        <input
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-[40px] bg-[#fff] rounded-[8px] border border-[#d9d9d9] p-[12px] text-[#b3b3b3]"
        />
      </div>

      {/* Username Field */}
      <div className="w-full">
        <label className="block text-[16px] font-normal text-[#1e1e1e]">Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full h-[40px] bg-[#fff] rounded-[8px] border border-[#d9d9d9] p-[12px] text-[#b3b3b3]"
        />
      </div>

      {/* Password Field */}
      <div className="w-full">
        <label className="block text-[16px] font-normal text-[#1e1e1e]">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword();
          }}
          className="w-full h-[40px] bg-[#fff] rounded-[8px] border border-[#d9d9d9] p-[12px] text-[#b3b3b3]"
        />
        {passwordError && (
          <span className="block text-red-500 text-sm mt-1">
            {passwordError}
          </span>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="w-full">
        <label className="block text-[16px] font-normal text-[#1e1e1e]">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            validateConfirmPassword();
          }}
          className="w-full h-[40px] bg-[#fff] rounded-[8px] border border-[#d9d9d9] p-[12px] text-[#b3b3b3]"
        />
        {confirmPasswordError && (
          <span className="block text-red-500 text-sm mt-1">
            {confirmPasswordError}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full h-[40px] mt-[10px] p-[12px] bg-[#2c2c2c] text-white rounded-[12px] text-center flex justify-center items-center"
      >
        Register
      </button>

      {/* Sign In Link */}
      <Link href="../SignIn">
        <span className="block text-[16px] font-normal text-[#1e1e1e] underline text-right mt-4">
          Already have an account?
        </span>
      </Link>
    </form>
  );
}