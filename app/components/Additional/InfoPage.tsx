"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where,updateDoc } from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { db, storage } from "../../../firebaseConfig";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function InfoPage() {
  const [user, setUser] = useState<User | null>(null); // Updated type
  const [uuid] = useState(() => crypto.randomUUID());
  const storageRef = ref(storage, `images/${uuid}`);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState<any>("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [birthday, setBirthday] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [allergies, setAllergies] = useState<string[]>([]); // Track allergies
  const [healthIssues, setHealthIssues] = useState<string[]>([]); // Track health issues
  const [height, setHeight] = useState({ feet: "", inches: "" }); // Height state
  const [weight, setWeight] = useState({ value: "", unit: "kg" }); // Weight state




  // Monitor authentication state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Handle null or User
    });

    return () => unsubscribe();
  }, []);

  const handleUpload = async () => {
    if (!image) return console.log("No image to upload");

    try {
      await uploadString(storageRef, image, "data_url");
      const url = await getDownloadURL(storageRef);
      setImagePreview(url);
      console.log("Image uploaded successfully:", url);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      return console.log("Invalid file type");
    }
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      setImage(readerEvent.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const fetchUserData = async () => {
    if (!user) {
      console.error("No user logged in, cannot retrieve user data.");
      setLoading(false);
      return;
    }

    try {
      const userQuery = query(
        collection(db, "users"),
        where("uid", "==", user.uid)
      );
      const userSnapshot = await getDocs(userQuery);
      const userData = userSnapshot.docs[0]?.data();

      if (userData) {
        setUsername(userData.username || "");
        setName(userData.name || "");
        setEmail(userData.email || "");
        setBirthday(userData.Birthday || "");
        setGender(userData.Gender || "");
        setImagePreview(userData.image || "");
        setAllergies(userData.Allergies || []);
        setHealthIssues(userData.HealthIssues || []);
        setHeight(userData.Height || { feet: Number, inches: Number });
        setWeight(userData.Weight || { value: Number, unit: "kg" });

      }
    } catch (error) {
      console.error("fetchUserData error:", error);
    }
    setLoading(false);
  };
  
  const handleGenderChange = (value: string) => {
    setGender(value); // Update local state
  };

  const handleAllergyChange = (value: string, checked: boolean | string) => {
    const isChecked = Boolean(checked); // Ensure it’s a boolean
    setAllergies((prev) =>
      isChecked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };
  
  // Handle checkbox changes for health issues
  const handleHealthIssueChange = (value: string, checked: boolean | string) => {
    const isChecked = Boolean(checked); // Ensure it’s a boolean
    setHealthIssues((prev) =>
      isChecked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const submitbutton = async() => {
    if (!user) return;
    try{
      handleUpload();
      const DocumentSearch = query(
        collection(db, "users"),
        where("uid", "==", user.uid)
      );
      const userDocument = await getDocs(DocumentSearch);
      if (userDocument.empty) {
        alert("No matching user document found.");
      } else {
        const userRef = userDocument.docs[0].ref;

        await updateDoc(userRef, {
          Birthday: birthday,
          Gender: gender,
          image: imagePreview,
          Allergies: allergies,
          HealthIssues: healthIssues,
          Height: height,
          Weight: weight
        });
      }

    }catch(error){
      console.error("fetchUserData error:", error);
    }
    console.log(allergies);
    console.log(healthIssues);
  }

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);
  return (
    <div className="w-full h-[65vw] pt-[2%]">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form className="flex flex-col space-y-4 p-8 bg-[#e5dece] rounded-lg w-[90%] h-[95%] mx-auto">
          <div className="flex flex-wrap justify-between">
            {/* Image Upload */}
            <div className="flex flex-col items-center w-[20%]">
              <label className="text-lg font-semibold mb-2">
                Upload an Image:
              </label>
              <div className="w-[15vw] h-[10vw] bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center mb-4">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-400">No image uploaded</span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-[15vw] text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none"
              />
            </div>

            {/* User Info Fields */}
            <div className="w-[80%] flex flex-col space-y-4">
              <div className="flex flex-col items-start">
                <label className="text-lg font-semibold mb-1">
                  Username:
                </label>
                <span className="w-full text-lg p-2 border rounded border-gray-400 bg-white">
                  {username}
                </span>
              </div>

              <div className="flex flex-col items-start">
                <label className="text-lg font-semibold mb-1">
                  Name:
                </label>
                <span className="w-full text-lg p-2 border rounded border-gray-400 bg-white">
                  {name}
                </span>
              </div>

              <div className="flex flex-col items-start">
                <label className="text-lg font-semibold mb-1">
                  Email:
                </label>
                <span className="w-full text-lg p-2 border rounded border-gray-400 bg-white">
                  {email}
                </span>
              </div>

              {/* Birthday Date Picker */}
              <div className="flex flex-row items-start">
                <div className="flex w-[50%] flex-col items-start">
                  <label className="text-lg font-semibold mb-1">
                    Birthday:
                  </label>
                  <input
                    type="date"
                    className="w-[80%] p-2 border rounded border-gray-400"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </div>
                <div className="flex w-[50%] flex-col items-start">
                  <label className="text-lg font-semibold mb-1">
                    Gender:
                  </label>
                  <RadioGroup
                    value={gender}
                    className="flex flex-row mt-4 gap-x-5"
                    onValueChange={(value) => handleGenderChange(value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="option-male" />
                      <label htmlFor="option-male">Male</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="option-female" />
                      <label htmlFor="option-female">Female</label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
               {/* Height Fields */}
          <div className="flex flex-col w-full">
            <label className="text-lg font-semibold mb-1">Height:</label>
            <div className="flex space-x-4">
              <input
                type="number"
                className="w-1/3 p-2 border rounded border-gray-400"
                placeholder="Feet"
                value={height.feet}
                onChange={(e) => setHeight({ ...height, feet: e.target.value })}
                min="0"
              />
              <input
                type="number"
                className="w-1/3 p-2 border rounded border-gray-400"
                placeholder="Inches"
                value={height.inches}
                onChange={(e) => setHeight({ ...height, inches: e.target.value })}
                min="0"
              />
            </div>
          </div>

          {/* Weight Fields */}
          <div className="flex flex-col w-full">
            <label className="text-lg font-semibold mb-1">Weight:</label>
            <div className="flex space-x-4">
              <input
                type="number"
                className="w-1/3 p-2 border rounded border-gray-400"
                placeholder="Weight"
                value={weight.value}
                onChange={(e) => setWeight({ ...weight, value: e.target.value })}
                min="0"
              />
              <select
                className="w-1/3 p-2 border rounded border-gray-400"
                value={weight.unit}
                onChange={(e) => setWeight({ ...weight, unit: e.target.value })}
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
            </div>
          </div>
            </div>
          </div>

           {/* Allergies Section */}
           <label className="text-lg font-semibold pt-[2%]">Allergies (select all that apply)</label>
          <div className="flex flex-row mt-4 gap-x-[5%]">
            {["Milk", "Peanuts", "Eggs", "Tree Nuts", "Soy", "Wheat", "Shell Fish", "Sesame", "Mustard"].map((allergy) => (
              <div key={allergy} className="flex items-center space-x-2">
                <Checkbox
                  checked={allergies.includes(allergy)}
                  onCheckedChange={(checked) => handleAllergyChange(allergy, checked)}
                  id={`allergy-${allergy}`}
                />
                <label htmlFor={`allergy-${allergy}`}>{allergy}</label>
              </div>
            ))}
          </div>

          {/* Health Issues Section */}
          <label className="text-lg font-semibold pt-[2%]">Health Issues (select all that apply)</label>
          <div className="flex flex-row mt-4 gap-x-[5%]">
            {["Diabetes", "Hypertension", "Asthma", "Heart Disease", "Celiac Disease"].map((issue) => (
              <div key={issue} className="flex items-center space-x-2">
                <Checkbox
                  checked={healthIssues.includes(issue)}
                  onCheckedChange={(checked) => handleHealthIssueChange(issue, checked)}
                  id={`health-issue-${issue}`}
                />
                <label htmlFor={`health-issue-${issue}`}>{issue}</label>
              </div>
            ))}
          </div>
          
          {/* Save Button */}
          <div className="flex justify-center pt-[2%]">
            <button
              type="button"
              className="w-1/2 p-2 bg-gray-800 text-white rounded"
              onClick={submitbutton}
            >
              Save Profile
            </button>
          </div>

          
        </form>
      )}
    </div>
    
   
  );
}
