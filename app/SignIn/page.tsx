import Link from "next/link";
import SignInNavBar from "../components/SignInNavBar";
import { SignInBox } from "../components/SignInBox";
import SignInText from "../components/SignInText";

const SignIn = () => {
  return (
      <div>
        <SignInNavBar/>
        <SignInText/>            
      </div>
  );
};

export default SignIn;