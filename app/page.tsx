// this is the main landing page !!!
// do not change the directory of this file.
import { Banner } from "./components/Banner";
import { InformationSection } from "./components/InformationSection";
import { NavBar } from "./components/NavBar";
import { SignInBox } from "./components/SignInBox";
import Image from "next/image";



export default function Home() {
  return (
  <>
  <NavBar/>
  <Banner/>
  <InformationSection/>
  </>
  );
}
