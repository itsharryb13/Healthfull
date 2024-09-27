import Link from "next/link";
import { NavBar } from "../components/Shared/NavBar";
import ResetPwdText from "../components/Sign ( Register and reset password)/Register/ResetPwdText";

const ResetPwd = () => {
  return (
      <div>
        <NavBar/>   
        <ResetPwdText/>
      </div>
  );
};

export default ResetPwd;