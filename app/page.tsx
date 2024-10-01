// this is the main landing page !!!
// do not change the directory of this file.

"use client"
import { Banner } from "./components/Welcome page/Banner";
import { InformationSection } from "./components/Welcome page/InformationSection";
import { NavBar } from "./components/Shared/NavBar";
import {Footer} from "./components/Shared/Footer"
//import { SignInBox } from "./components/SignInBox";
//import Image from "next/image";



export default function Home() {
  return (
  <>
  <NavBar/>
  <Banner/>
  <InformationSection collectionName="Recipes"/>
  <Footer/>
  </>
  );
}
