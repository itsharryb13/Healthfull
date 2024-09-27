import Link from "next/link";
import SignInNavBar from "../components/Sign ( Register and reset password)/SignInNavBar";
import { SignInBox } from "../components/Sign ( Register and reset password)/SignInBox";
import SignInText from "../components/Sign ( Register and reset password)/SignInText";

const SignIn = () => {
  return (
      <div>
        <SignInNavBar/>
        <SignInText/>            
      </div>
  );
};

export default SignIn;