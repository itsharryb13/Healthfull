//import Link from "next/link";
import React, { useState } from "react";
import { NavBarH } from "../components/Shared/NavbarH";
import RecipePage from "../RecipePageComponent/RecipePage";
//import "./App.css";

const Recipe = () => {
  return (
      <div>
        <NavBarH/>
        <RecipePage/> 
      </div>
  );
};

export default Recipe;