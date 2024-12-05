"use client";


import { useState, useEffect } from "react";
import Link from "next/link";
import { auth, db } from "../../../../firebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification, sendSignInLinkToEmail } from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";


export default function RegistrationForm() {
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const [passwordError, setPasswordError] = useState("");
 const [confirmPasswordError, setConfirmPasswordError] = useState("");
 const [emailError, setEmailError] = useState("");
 const [usernameError, setUsernameError] = useState("");
 const router = useRouter();


 // Validate password
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


 // Validate confirm password
 const validateConfirmPassword = () => {
   if (password !== confirmPassword) {
     setConfirmPasswordError("Passwords do not match.");
     return false;
   } else {
     setConfirmPasswordError("");
     return true;
   }
 };


 // Check if the username already exists in Firestore
 const checkUsername = async () => {
   const q = query(collection(db, "users"), where("username", "==", username));
   const querySnapshot = await getDocs(q);
   if (!querySnapshot.empty) {
     setUsernameError("Username is already taken.");
     return false;
   } else {
     setUsernameError("");
     return true;
   }
 };


 // Check if the email is already registered with Firebase Authentication
 const checkEmail = async () => {
   try {
     // Attempt to create the user to trigger Firebase's email validation
     await createUserWithEmailAndPassword(auth, email, password);
     return true;
   } catch (error: any) {
     if (error.code === "auth/email-already-in-use") {
       setEmailError("Email is already in use.");
       return false;
     }
     setEmailError("Failed to register. Please try again.");
     return false;
   }
 };


 // Form submission handler
 const handleSubmit = async (e: React.FormEvent) => {
  router.prefetch('/additionalInfo');
   e.preventDefault();
    const isPasswordValid = validatePassword();
   const isConfirmPasswordValid = validateConfirmPassword();
   const isUsernameValid = await checkUsername();
  
   // Check email and proceed with registration if validations pass
   if (isPasswordValid && isConfirmPasswordValid && isUsernameValid) {
     try {
       // Use createUserWithEmailAndPassword to register the user
       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
       const user = userCredential.user;
        // Get the user UID from the authentication result
       const uid = user.uid;
        // Store user data along with UID in Firestore
       await addDoc(collection(db, "users"), {
         uid: uid, // Store the UID
         name: name,
         email: email,
         username: username,
         createdAt: new Date(),
       });
       await sendEmailVerification(user);
        alert("User registered successfully!");
        console.log("Redirecting.");
        router.push('/additionalInfo');
     } catch (error) {
       console.error("Error adding user to Firestore: ", error);
      
       if (error instanceof Error && 'code' in error) {
         if (error.code === "auth/email-already-in-use") {
           setEmailError("Email is already in use.");
         } else {
           setEmailError("Failed to register. Please try again.");
         }
       } else {
         setEmailError("An unexpected error occurred.");
       }
     }
   }
 };

 const handleRegister = async () => {
  // Setting form state
  await handleSubmit({preventDefault: () => {}} as unknown as React.FormEvent);
 }
 
 useEffect(() => {
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleRegister();
    }
  };
  document.addEventListener('keydown', handleKeyPress);
  return () => {
    document.removeEventListener('keydown', handleKeyPress);
  };
}, [handleSubmit]);


 useEffect(() => {
   if (password.length >= 8 && passwordError) {
     validatePassword();
   }
 }, [password]);


 useEffect(() => {
   if (password === confirmPassword && confirmPasswordError) {
     validateConfirmPassword();
   }
 }, [confirmPassword]);


 return (
   <form onSubmit={handleSubmit} className="flex flex-col w-[520px] h-[600px] p-[24px] mb-8 bg-container rounded-[8px] border border-[#d9d9d9] mx-auto">
     {/* Name Field */}
     <div className="flex flex-col gap-[8px]">
       <label className="block text-[16px] font-normal text-foreground">Name</label>
       <input
         type="text"
         placeholder="Full Name"
         value={name}
         onChange={(e) => setName(e.target.value)}
         className="w-full h-[40px] bg-[#fff] rounded-[8px] border border-[#d9d9d9] p-[12px] text-[#b3b3b3] bg-input"
       />
     </div>


     {/* Email Field */}
     <div className="flex flex-col gap-[6px] mt-[4%]">
       <label className="block text-[16px] font-normal text-foreground">Email</label>
       <input
         type="email"
         placeholder="email@example.com"
         value={email}
         onChange={(e) => {
           setEmail(e.target.value);
           setEmailError("");
         }}
         className="w-full h-[40px] bg-[#fff] rounded-[8px] border border-[#d9d9d9] p-[12px] text-[#b3b3b3] bg-input"
       />
       {emailError && (
         <span className="block text-red-500 text-sm mt-1">
           {emailError}
         </span>
       )}
     </div>


     {/* Username Field */}
     <div className="flex flex-col gap-[6px] mt-[4%]">
       <label className="block text-[16px] font-normal text-foreground">Username</label>
       <input
         type="text"
         placeholder="Username"
         value={username}
         onChange={(e) => {
           setUsername(e.target.value);
           setUsernameError(""); // Clear username error on typing
         }}
         className="w-full h-[40px] bg-[#fff] rounded-[8px] border border-[#d9d9d9] p-[12px] text-[#b3b3b3] bg-input"
       />
       {usernameError && (
         <span className="block text-red-500 text-sm mt-1">
           {usernameError}
         </span>
       )}
     </div>


     {/* Password Field */}
     <div className="flex flex-col gap-[6px] mt-[4%]">
       <label className="block text-[16px] font-normal text-foreground">Password</label>
       <input
         type="password"
         placeholder="Password"
         value={password}
         onChange={(e) => {
           setPassword(e.target.value);
           validatePassword();
         }}
         className="w-full h-[40px] bg-[#fff] rounded-[8px] border border-[#d9d9d9] p-[12px] text-[#b3b3b3] bg-input"
       />
       {passwordError && (
         <span className="block text-red-500 text-sm mt-1">
           {passwordError}
         </span>
       )}
     </div>


     {/* Confirm Password Field */}
     <div className="flex flex-col gap-[6px] mt-[4%]">
       <label className="block text-[16px] font-normal text-foreground">Confirm Password</label>
       <input
         type="password"
         placeholder="Confirm Password"
         value={confirmPassword}
         onChange={(e) => {
           setConfirmPassword(e.target.value);
           validateConfirmPassword();
         }}
         className="w-full h-[40px] bg-[#fff] rounded-[8px] border border-[#d9d9d9] p-[12px] text-[#b3b3b3] bg-input"
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
       className="w-full gap-[6px] mt-[4%] h-[40px]  bg-button text-white rounded-[12px] text-center"
     >
       Register
     </button>


     {/* Sign In Link */}
     <Link href="../SignIn">
       <span className="block text-[16px] font-normal text-foreground underline text-right mt-4">
         Already have an account?
       </span>
     </Link>
   </form>
 );
}
