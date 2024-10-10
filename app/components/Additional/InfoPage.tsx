"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from '../../../firebaseConfig';
import { ref, getDownloadURL } from "firebase/storage";
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"




export default function InfoPage() {
  return (
    <div className="w-full h-[62vw] pt-[2%]">
      <form className="flex flex-col space-y-4 p-8 bg-[#e5dece] rounded-lg w-[90%] h-[95%] mx-auto">
        <div className="flex flex-wrap justify-between">
          {/* Image Upload */}
          <div className="flex flex-col items-center w-[20%]">
            <label className="text-lg font-semibold mb-2">Upload an Image:</label>
            <div className="w-[15vw] h-[10vw] bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center mb-4">
              {/* Image preview logic */}
            </div>
            <input type="file" accept="image/*" className="block w-[15vw] text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none" />
          </div>

          {/* User Info Fields */}
          <div className="w-[80%] flex flex-col space-y-4">
            <div className="flex flex-col items-start">
              <label className="text-lg font-semibold mb-1">Username:</label>
              <input className="w-full p-2 border rounded border-gray-400" placeholder="Enter your username" />
            </div>
            
            <div className="flex flex-col items-start">
              <label className="text-lg font-semibold mb-1">Name:</label>
              <input className="w-full p-2 border rounded border-gray-400" placeholder="Enter your name" />
            </div>
            
            <div className="flex flex-col items-start">
              <label className="text-lg font-semibold mb-1">Email:</label>
              <input className="w-full p-2 border rounded border-gray-400" placeholder="Enter your email" />
            </div>

            {/* Birthday Date Picker */}
            <div className="flex flex-row items-start">
            <div className="flex w-[50%] flex-col items-start">
              <label className="text-lg font-semibold mb-1">Birthday:</label>
              <input
                type="date"
                className="w-[80%] p-2 border rounded border-gray-400"
              />
            </div>
            <div className="flex w-[50%] flex-col items-start">
              <label className="text-lg font-semibold mb-1">Gender:</label>
              <RadioGroup defaultValue="option-one" className="flex flex-row mt-4 gap-x-5">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <label htmlFor="option-one">Male</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <label htmlFor="option-two">Female</label>
                </div>
              </RadioGroup>
            </div>
            </div>
            {/* Height Fields */}
            <div className="flex flex-row items-start">
            <div className="flex flex-col w-[50%] items-start">
              <label className="text-lg font-semibold mb-1">Height:</label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  className="w-1/3 p-2 border rounded border-gray-400"
                  placeholder="Feet"
                  min="0"
                />
                <input
                  type="number"
                  className="w-1/3 p-2 border rounded border-gray-400"
                  placeholder="Inches"
                  min="0"
                />
              </div>
            </div>

            {/* Weight Fields */}
            <div className="flex flex-col w-[50%] items-start">
              <label className="text-lg font-semibold mb-1">Weight:</label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  className="w-1/3 p-2 border rounded border-gray-400"
                  placeholder="Weight"
                  min="0"
                />
                <select className="w-1/3 p-2 border rounded border-gray-400">
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
            </div>
            </div>
          </div>
        </div>

        
        {/* Gender Selection */}
        <div className="flex flex-col justify-left mt-10 bottom-0 gap-y-[5%]">
          <label className="text-lg font-semibold pt-[2%] ">Allergies (select all that Apply)</label>
          
          <div className="flex flex-row mt-4 gap-x-[5%]">
          <div className="flex items-center space-x-2">
            <Checkbox value="option-one" id="option-one" />
            <label htmlFor="option-one">Milk</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox value="option-two" id="option-two" />
            <label htmlFor="option-two">Peanuts</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox value="option-one" id="option-one" />
            <label htmlFor="option-three">Eggs</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox value="option-two" id="option-two" />
            <label htmlFor="option-four">Tree Nuts</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox value="option-one" id="option-one" />
            <label htmlFor="option-five">Soy</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox value="option-two" id="option-two" />
            <label htmlFor="option-six">Wheat (Gluten)</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox value="option-two" id="option-two" />
            <label htmlFor="option-seven">Shell Fish</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox value="option-two" id="option-two" />
            <label htmlFor="option-eight">Sesame</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox value="option-two" id="option-two" />
            <label htmlFor="option-nine">Mustard</label>
          </div>
        </div>

        <label className="text-lg font-semibold pt-[2%] ">Health Issues (select all that Apply)</label>
          {/* adding health issue */}
          <div className="flex flex-row mt-4 gap-x-[5%]">
          <div className="flex items-center space-x-2">
            <Checkbox value="option-one" id="option-one" />
            <label htmlFor="option-one">Milk</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox value="option-two" id="option-two" />
            <label htmlFor="option-two">Peanuts</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox value="option-three" id="option-three" />
            <label htmlFor="option-three">Eggs</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox value="option-four" id="option-four" />
            <label htmlFor="option-four">Tree Nuts</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox value="option-five" id="option-five" />
            <label htmlFor="option-five">Soy</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox value="option-six" id="option-six" />
            <label htmlFor="option-six">Wheat (Gluten)</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox value="option-seven" id="option-seven" />
            <label htmlFor="option-seven">Shell Fish</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox value="option-eight" id="option-eight" />
            <label htmlFor="option-eight">Sesame</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox value="option-nine" id="option-nine" />
            <label htmlFor="option-nine">Mustard</label>
          </div>
        </div>


        <label className="text-lg font-semibold mb-1 pt-[2%]">Other :</label>
        <input className="w-full p-2 border rounded border-gray-400" placeholder="Allergies/ Health Issues" />
        
        </div>


        {/* Save Button */}
        <div className="flex justify-center pt-[4%]">
          <button type="button" className="w-1/2 p-2 bg-gray-800 text-white rounded">
            Save Profile
          </button>
        </div>

      </form>
    </div>
  );
}
