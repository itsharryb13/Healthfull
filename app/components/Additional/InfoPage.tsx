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
  const [customAllergens, setCustomAllergens] = useState<string>("");




  // Monitor authentication state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Handle null or User
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

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
      if (userSnapshot.empty) {
        console.error("No data found for the logged-in user.");
        setLoading(false);
        return;
      }
      
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

      console.log(userData.image);
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

  const submitbutton = async () => {
    const requiredFields = [
      { key: "Birthday", value: birthday },
      { key: "Gender", value: gender },
      { key: "Allergies", value: allergies.length ? "filled" : "" },
      { key: "HealthIssues", value: healthIssues.length ? "filled" : "" },
      { key: "Height", value: height.feet && height.inches ? "filled" : "" },
      { key: "Weight", value: weight.value ? "filled" : "" },
    ];
  
    const emptyFields = requiredFields.filter(field => !field.value);
  
    if (emptyFields.length > 0) {
      alert(
        `Please fill out the following fields: ${emptyFields
          .map(field => field.key)
          .join(", ")}`
      );
      return;
    }
  
    if (!user) return;
  
    try {
      await handleUpload(); // Ensure the upload is completed before proceeding
  
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
          Weight: weight,
        });
  
        alert("Information saved successfully to the Database");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };
  

  const addCustomAllergens = () => {
    if (!customAllergens.trim()) {
      alert("Please enter valid allergens.");
      return;
    }
  
    // Split input by commas and remove whitespace
    const newAllergens = customAllergens
      .split(",")
      .map((allergen) => allergen.trim())
      .filter((allergen) => allergen);
  
    // Filter out duplicates
    const uniqueNewAllergens = newAllergens.filter(
      (allergen) => !allergies.includes(allergen)
    );
  
    if (uniqueNewAllergens.length === 0) {
      alert("All entered allergens are already listed.");
      return;
    }
  
    // Add unique allergens to the list
    setAllergies((prev) => [...prev, ...uniqueNewAllergens]);
    setCustomAllergens(""); // Clear the input field
  };
  return (
    <div className="w-full h-auto pt-8 px-8">
  
    <form className="flex flex-col space-y-6 p-10 bg-container rounded-lg w-[96%] mx-auto">
      <div className="flex">
        {/* Image Upload */}
        <div className="flex flex-col items-center w-1/4">
          <label className="text-lg text-foreground font-semibold mb-4">Upload an Image:</label>
          <div className="w-[200px] h-[200px] bg-input border border-gray-300 rounded-lg flex items-center justify-center mb-4">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-400">No Image Uploaded</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-[200px] text-sm text-foreground border border-gray-300 cursor-pointer focus:outline-none"
          />
        </div>

        {/* Profile Fields */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center">
            <label className="w-1/4 text-lg text-foreground font-semibold">Username:</label>
            <span className="flex-1 p-2 border rounded bg-input text-foreground">{username}</span>
          </div>
          <div className="flex items-center">
            <label className="w-1/4 text-lg text-foreground font-semibold">Name:</label>
            <span className="flex-1 p-2 border rounded bg-input text-foreground">{name}</span>
          </div>
          <div className="flex items-center">
            <label className="w-1/4 text-lg text-foreground font-semibold">Email:</label>
            <span className="flex-1 p-2 border rounded bg-input text-foreground">{email}</span>
          </div>
          <div className="flex items-center">
            <label className="w-1/4 text-lg text-foreground font-semibold">Birthday:</label>
            <input
              type="date"
              className="flex-1 p-2 border rounded bg-input text-foreground"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/4 text-lg text-foreground font-semibold">Gender:</label>
            <RadioGroup
              value={gender}
              className="flex flex-1 gap-8"
              onValueChange={(value) => handleGenderChange(value)}
            >
              <div className="flex items-center text-foreground">
                <RadioGroupItem value="male" id="option-male" />
                <label htmlFor="option-male" className="ml-2">Male</label>
              </div>
              <div className="flex items-center text-foreground">
                <RadioGroupItem value="female" id="option-female" />
                <label htmlFor="option-female" className="ml-2">Female</label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center">
            <label className="w-1/4 text-lg text-foreground font-semibold">Height:</label>
            <div className="flex flex-1 gap-4">
              <input
                type="number"
                className="w-1/2 p-2 border rounded bg-input text-foreground"
                placeholder="Feet"
                value={height.feet}
                onChange={(e) => setHeight({ ...height, feet: e.target.value })}
                min="0"
              />
              <input
                type="number"
                className="w-1/2 p-2 border rounded bg-input text-foreground"
                placeholder="Inches"
                value={height.inches}
                onChange={(e) => setHeight({ ...height, inches: e.target.value })}
                min="0"
              />
            </div>
          </div>
          <div className="flex items-center">
            <label className="w-1/4 text-lg text-foreground font-semibold">Weight:</label>
            <div className="flex flex-1 gap-4">
              <input
                type="number"
                className="w-1/2 p-2 border rounded bg-input text-foreground"
                placeholder="Weight"
                value={weight.value}
                onChange={(e) => setWeight({ ...weight, value: e.target.value })}
                min="0"
              />
              <select
                className="w-1/2 p-2 border rounded bg-input text-foreground"
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

      <div>
  <label className="text-lg text-foreground font-semibold mb-4">
    Allergies (select all that apply):
  </label>

  {/* Display Selected Allergies */}
  <div className="mb-4">
    <h3 className="text-md text-foreground font-semibold mb-2">Selected Allergies:</h3>
    <div className="flex flex-wrap gap-2">
      {allergies.length > 0 ? (
        allergies.map((allergy, index) => (
          <span
            key={`${allergy}-${index}`}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
          >
            {allergy}
          </span>
        ))
      ) : (
        <span className="text-gray-500 text-sm">No allergies selected.</span>
      )}
    </div>
  </div>

  {/* Allergen Selection */}
  <div className="grid grid-cols-3 gap-4">
    {["Milk", "Peanuts", "Eggs", "Tree Nuts", "Soy", "Wheat", "Shell Fish", "Sesame", "Mustard"].map(
      (allergy) => (
        <div key={allergy} className="flex items-center text-foreground">
          <Checkbox
            checked={allergies.includes(allergy)}
            onCheckedChange={(checked) => handleAllergyChange(allergy, checked)}
            id={`allergy-${allergy}`}
          />
          <label htmlFor={`allergy-${allergy}`} className="ml-2">{allergy}</label>
        </div>
      )
    )}
  </div>

  {/* Add New Allergens */}
  <div className="flex flex-col gap-4 mt-4">
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="p-2 border rounded bg-input text-foreground flex-1"
        placeholder="Add custom allergens (comma-separated)"
        value={customAllergens}
        onChange={(e) => setCustomAllergens(e.target.value)}
      />
      <button
        type="button"
        className="p-2 bg-button text-white rounded-lg"
        onClick={addCustomAllergens}
      >
        Add Allergens
      </button>
    </div>
    <small className="text-sm text-gray-500">
      Enter multiple allergens separated by commas, e.g., "Chocolate, Strawberries".
    </small>
  </div>
</div>


      {/* Health Issues Section */}
      <div>
        <label className="text-lg text-foreground font-semibold mb-4">Health Issues (select all that apply):</label>
        <div className="grid grid-cols-3 gap-4">
          {["Diabetes", "Hypertension", "Asthma", "Heart Disease", "Celiac Disease", 'none'].map((issue) => (
            <div key={issue} className="flex items-center text-foreground">
              <Checkbox
                checked={healthIssues.includes(issue)}
                onCheckedChange={(checked) => handleHealthIssueChange(issue, checked)}
                id={`health-issue-${issue}`}
              />
              <label htmlFor={`health-issue-${issue}`} className="ml-2">{issue}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button
          type="button"
          className="w-1/2 p-3 bg-button text-white rounded-lg hover: "
          onClick={submitbutton}
        >
          Save Profile
        </button>
      </div>
    </form>
  
</div>
);
}