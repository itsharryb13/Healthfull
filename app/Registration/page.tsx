//import Link from "next/link";
import React, { useState } from "react";
import { RegistrationNavBar } from "../components/Sign ( Register and reset password)/Register/RegistrationNavBar";
import CreateAccountText from "../components/Sign ( Register and reset password)/Register/CreateAccountText";
//import "./App.css";

const Register = () => {
  return (
      <div>
        <RegistrationNavBar/>
        <CreateAccountText/> 
      </div>
  );
};
/*
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const InputField = ({placeholder, handleChange, type}) => {
  const [inputValue, setInputValue] = useState("")
  const handleChangeEvent = (e) => {
    setInputValue(e.target.value)
    handleChange(e.target.value)
  }
  return (
    <input value={email} type={type} placeholder={placeholder} onChange={handleChangeEvent}/>
  )
}
*/

export default Register;