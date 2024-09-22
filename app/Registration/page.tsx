import Link from "next/link";
import React, { useState } from "react";
//import "./App.css";

const Register = () => {
  return (
      <div>
          <Link href="/">Registration Page</Link>
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