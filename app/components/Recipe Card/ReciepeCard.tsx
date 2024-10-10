"use client"
import Image from "next/image";
import saveButton from "../../public/save-button.svg";
import removeButton from "../../public/remove.svg";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { DropdownMenu, DropdownMenuArrowProps, DropdownMenuCheckboxItemProps, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuCheckboxItem, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuSubTrigger} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { collection,query,arrayUnion,where, getDocs,getDoc,doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "@/firebaseConfig";

interface RecipeCardProps {
  ID?: string; // id of the recipe
 name?: string; // Name of the recipe
 imageUrl?: string; // URL of the recipe image
 description?: string; // Description of the recipe
 onSave?: () => void; // Optional save function
}

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function RecipeCard({ ID, name, imageUrl, description, onSave }: RecipeCardProps) {

  const auth = getAuth();
  const user = auth.currentUser;
  const [showSavedStatus, setSavedStatus] = useState<Checked>(false);
  const [showEverydayStatus, setEverydayStatus] = useState<Checked>(false);
  const [showMStatus, setMStatus] = useState<Checked>(false);
  const [showTStatus, setTStatus] = useState<Checked>(false);
  const [showWStatus, setWStatus] = useState<Checked>(false);
  const [showThStatus, setThStatus] = useState<Checked>(false);
  const [showFStatus, setFStatus] = useState<Checked>(false);
  const [showSStatus, setSStatus] = useState<Checked>(false);
  const [showSunStatus, setSunStatus] = useState<Checked>(false);

  // Reusable function for handling day status change
  const addDayStatus = async (status: Checked, setStatus: React.Dispatch<React.SetStateAction<Checked>>, container: string ) => {
      if (!user) {
        alert('No Signed in yet, Please sign in and try again');
        setStatus(false);
        // Reset the status to false if no user is signed in
      }else{
        try{
          const DocumentSearch = query(collection(db,"users"),where("uid","==",user.uid)); // why getDoc is not working;
        const userDocument = await getDocs(DocumentSearch);
        if(userDocument.empty){
          alert("No matching user document found.");
          setStatus(false);
        }else{
          const userdata = userDocument.docs[0];
          const user = userdata.ref;

          if(container == "Everyday"){
            await updateDoc(user, {
              EverydayForWeek: arrayUnion(ID),
              SavedRecipe:arrayUnion(ID)
            });
          }  if(container == "Saved") {
            await updateDoc(user, {
              SavedRecipe:arrayUnion(ID)
            });
          } if(container == "Monday") {
            await updateDoc(user, {
              MondayMeals: arrayUnion(ID),
              SavedRecipe:arrayUnion(ID)
            });
            setSavedStatus(true);
          } if(container == "Tuesday") {
            await updateDoc(user, {
              TuesdayMeals: arrayUnion(ID),
              SavedRecipe:arrayUnion(ID)
            });
            setSavedStatus(true);
          } if(container == "Wednesday") {
            await updateDoc(user, {
              WednesdayMeals: arrayUnion(ID),
              SavedRecipe:arrayUnion(ID)
            });
            setSavedStatus(true);
          } if(container == "Thursday") {
            await updateDoc(user, {
              ThursdayMeals: arrayUnion(ID),
              SavedRecipe:arrayUnion(ID)
            });
            setSavedStatus(true);
          } if(container == "Friday") {
            await updateDoc(user, {
              FridayMeals: arrayUnion(ID),
              SavedRecipe:arrayUnion(ID)
            });
            setSavedStatus(true);
          } if(container == "Saturday") {
            await updateDoc(user, {
              SaturdayMeals: arrayUnion(ID),
              SavedRecipe:arrayUnion(ID)
            });
            setSavedStatus(true);
           } if(container == "Sunday") {
            await updateDoc(user, {
              SundayMeals: arrayUnion(ID),
              SavedRecipe:arrayUnion(ID)
            });
            setSavedStatus(true);
          }
         
        }
        }catch(error){
          console.error("Error fetching user data:", error);
          setStatus(false);
        }
        
      }
    
  };

  // Reusable function for handling day status change
  const removeDayStatus = async (status: Checked, setStatus: React.Dispatch<React.SetStateAction<Checked>>, container: string ) => {
    if (!user) {
      // alert('No Signed in yet, Please sign in and try again');
      setStatus(false);
      // Reset the status to false if no user is signed in
    }else{
      try{
        const DocumentSearch = query(collection(db,"users"),where("uid","==",user.uid)); // why getDoc is not working;
      const userDocument = await getDocs(DocumentSearch);
      if(userDocument.empty){
        alert("No matching user document found.");
        setStatus(false);
      }else{
        const userdata = userDocument.docs[0];
        const user = userdata.ref;
      
        if(container == "Everyday"){
          await updateDoc(user, {
            EverydayForWeek: arrayRemove(ID),
          });
          
        } if(container == "Saved") {
          await updateDoc(user, {
            SavedRecipe:arrayRemove(ID)
          });
        }if(container == "Monday") {
          await updateDoc(user, {
            MondayMeals: arrayRemove(ID)
          });
        }if(container == "Tuesday") {
          await updateDoc(user, {
            TuesdayMeals: arrayRemove(ID)
          });
        }if(container == "Wednesday") {
          await updateDoc(user, {
            WednesdayMeals: arrayRemove(ID)
          });
        } if(container == "Thursday") {
          await updateDoc(user, {
            ThursdayMeals: arrayRemove(ID)
          });
        }if(container == "Friday") {
          await updateDoc(user, {
            FridayMeals: arrayRemove(ID)
          });
        } if(container == "Saturday") {
          await updateDoc(user, {
            SaturdayMeals: arrayRemove(ID)
          });
        }if(container == "Sunday") {
          await updateDoc(user, {
            SundayMeals: arrayRemove(ID)
          });
        }

      }
      }catch(error){
        console.error("Error fetching user data:", error);
        setStatus(false);
      }
      
    }
  
};


  
  useEffect(()=> {
    // const fetchRecipeStatus = async () => {
    //   if (user && ID) {
    //     const userDocRef = doc(db, "users", user.uid);
    //     const userDoc = await getDoc(userDocRef);
    //     if (userDoc.exists()) {
    //       const userData = userDoc.data();

    //       // Set status based on Firebase arrays
    //       setSavedStatus(userData.SavedRecipe?.includes(ID) || false);
    //       setEverydayStatus(userData.EverydayForWeek?.includes(ID) || false);
    //       setMStatus(userData.MondayMeals?.includes(ID) || false);
    //       setTStatus(userData.TuesdayMeals?.includes(ID) || false);
    //       setWStatus(userData.WednesdayMeals?.includes(ID) || false);
    //       setThStatus(userData.ThursdayMeals?.includes(ID) || false);
    //       setFStatus(userData.FridayMeals?.includes(ID) || false);
    //       setSStatus(userData.SaturdayMeals?.includes(ID) || false);
    //       setSunStatus(userData.SundayMeals?.includes(ID) || false);
    //     }
    //   }
    // };

    //fetchRecipeStatus();

    if(showEverydayStatus== true){
      addDayStatus(showEverydayStatus,setEverydayStatus, "Everyday");
    }else{
      removeDayStatus(showEverydayStatus,setEverydayStatus, "Everyday");
    }

    if(showSavedStatus== true){
      addDayStatus(showEverydayStatus,setEverydayStatus, "Saved");
    }else{
      removeDayStatus(showEverydayStatus,setEverydayStatus, "Saved");
    }

    if(showMStatus== true){
      addDayStatus(showEverydayStatus,setEverydayStatus, "Monday");
    }else{
      removeDayStatus(showEverydayStatus,setEverydayStatus, "Monday");
    }

    if(showTStatus== true){
      addDayStatus(showEverydayStatus,setEverydayStatus, "Tuesday");
    }else{
      removeDayStatus(showEverydayStatus,setEverydayStatus, "Tuesday");
    }

    if(showWStatus== true){
      addDayStatus(showEverydayStatus,setEverydayStatus, "Wednesday");
    }else{
      removeDayStatus(showEverydayStatus,setEverydayStatus, "Wednesday");
    }

    if(showThStatus== true){
      addDayStatus(showEverydayStatus,setEverydayStatus, "Thursday");
    }else{
      removeDayStatus(showEverydayStatus,setEverydayStatus, "Thursday");
    }

    if(showFStatus== true){
      addDayStatus(showEverydayStatus,setEverydayStatus, "Friday");
    }else{
      removeDayStatus(showEverydayStatus,setEverydayStatus, "Friday");
    }

    if(showSStatus== true){
      addDayStatus(showEverydayStatus,setEverydayStatus, "Saturday");
    }else{
      removeDayStatus(showEverydayStatus,setEverydayStatus, "Saturday");
    }
    if(showSunStatus== true){
      addDayStatus(showEverydayStatus,setEverydayStatus, "Sunday");
    }else{
      removeDayStatus(showEverydayStatus,setEverydayStatus, "Sunday");
    }
    
  },[showEverydayStatus, showSavedStatus,showMStatus,showTStatus,showWStatus, showTStatus,showFStatus,showSStatus,showSunStatus, user,ID
  ]);
  
  // useEffect(()=> {


  //   handleDayStatusChange(showMStatus, setMStatus);
    

  // }, [showMStatus]);

  return (
    <>
      <div className='main-container flex flex-row w-[20vw] h-[18vw] pt-[1%] pr-[1%] pb-[1%] pl-[1%] items-start bg-[#fff] rounded-[8px] border border-[#d9d9d9] relative mx-auto gap-y-1'>
        <div className='flex w-[50%] h-full flex-col items-center relative overflow-hidden rounded-lg'>
          <Image
            src={imageUrl || "/default-image.svg"}
            alt={name ?? "item"}
            fill
            sizes="(max-width: 200px) 100vw, (max-width: 400px) 50vw, 33vw"
            objectFit="cover"
          />
        </div>
        <div className="flex w-[50%] h-full flex-col relative justify-center items-center">
          <div className="flex flex-col justify-center items-center h-[20%] self-stretch pt-[1%] pb-[1%]">
            <span className="font-['Inter'] text-center text-[2vw] font-normal leading-lg text-[#1e1e1e]">
              {name || "Unnamed Item"}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center h-[50%] self-stretch px-[5%]">
            <span className="font-['Inter'] text-center text-[1vw] font-normal text-[#757575] break-words whitespace-normal max-h-[40%]">
              {description || "No Description available"}
            </span>
          </div>
        </div>

        <DropdownMenu  >
          <DropdownMenuTrigger className="w-[6%] absolute right-[.5%] bg-transparent cursor-pointer">
          <Image
            src={saveButton}
            alt="Save Recipe"
            width={30}
            height={20}
            className="hover:bg-[#e5dece]"
          />
          </DropdownMenuTrigger>

          <DropdownMenuContent className=" w-full bg-[#e5dece]">
            <DropdownMenuItem>
              <DropdownMenuLabel className="mx-auto">Select all that Apply</DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuCheckboxItem checked={showSavedStatus} onCheckedChange={setSavedStatus}>
                Saved Recipe
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={showEverydayStatus} onCheckedChange={setEverydayStatus}>
                Every day of week
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator/>
              <div className="flex flex-row ">
              <div className="flex flex-col">
              <DropdownMenuCheckboxItem checked={showMStatus} onCheckedChange={setMStatus}>
                M
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={showTStatus} onCheckedChange={setTStatus}>
                T
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={showWStatus} onCheckedChange={setWStatus}>
                W
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={showThStatus} onCheckedChange={setThStatus}>
                TH
              </DropdownMenuCheckboxItem>
              </div>
              <DropdownMenuSeparator/>
              <div className="flex flex-col">
              <DropdownMenuCheckboxItem checked={showFStatus} onCheckedChange={setFStatus}>
                F
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={showSStatus} onCheckedChange={setSStatus}>
                S
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={showSunStatus} onCheckedChange={setSunStatus}>
                Sun.
              </DropdownMenuCheckboxItem>
              </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>



        {/* <button
          onClick={onSave}
          className="w-[10%] absolute bottom-[5%] right-[5%] bg-transparent border-none cursor-pointer"
        >
          
        </button> */}
      </div>
    </>
  );
}
{/*
    TODO: set the status of the button based on the firebase array.

    */}


