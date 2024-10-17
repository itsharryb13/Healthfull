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
import { collection,query,arrayUnion,where, getDocs,getDoc,doc, updateDoc, arrayRemove, getFirestore } from "firebase/firestore";
import { db } from "@/firebaseConfig";

interface RecipeCardProps {
  ID?: string; // id of the recipe
 name?: string; // Name of the recipe
 imageUrl?: string; // URL of the recipe image
 description?: string; // Description of the recipe
 onSave?: () => void; // Optional save function
}

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function RecipeCard({ ID, name, imageUrl, description}: RecipeCardProps) {

  const auth = getAuth();
  const user = auth.currentUser ;
  const [showSavedStatus, setSavedStatus] = useState<boolean>(false);
  const [showEverydayStatus, setEverydayStatus] = useState<boolean>(false);
  const [showMStatus, setMStatus] = useState<boolean>(false);
  const [showTStatus, setTStatus] = useState<boolean>(false);
  const [showWStatus, setWStatus] = useState<boolean>(false);
  const [showThStatus, setThStatus] = useState<boolean>(false);
  const [showFStatus, setFStatus] = useState<boolean>(false);
  const [showSStatus, setSStatus] = useState<boolean>(false);
  const [showSunStatus, setSunStatus] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false); // Track initialization

  // Function to fetch the initial recipe status
  const fetchRecipeStatus = async () => {
    if (!user) return; // No signed-in user

    try {
      const DocumentSearch = query(collection(db, "users"), where("uid", "==", user.uid));
      const userDocument = await getDocs(DocumentSearch);

      if (!userDocument.empty) {
        const userData = userDocument.docs[0].data();
        setSavedStatus(userData.SavedRecipe?.includes(ID) || false);
        setEverydayStatus(userData.EverydayForWeek?.includes(ID) || false);
        setMStatus(userData.MondayMeals?.includes(ID) || false);
        setTStatus(userData.TuesdayMeals?.includes(ID) || false);
        setWStatus(userData.WednesdayMeals?.includes(ID) || false);
        setThStatus(userData.ThursdayMeals?.includes(ID) || false);
        setFStatus(userData.FridayMeals?.includes(ID) || false);
        setSStatus(userData.SaturdayMeals?.includes(ID) || false);
        setSunStatus(userData.SundayMeals?.includes(ID) || false);
        setIsInitialized(true); // Mark as initialized
      } else {
        alert("No matching user document found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Effect to fetch recipe status on mount
  useEffect(() => {
    fetchRecipeStatus();
  }, [user, ID]);

  // Effect to handle changes to the status once it's set
  useEffect(() => {
    if (!isInitialized) return; // Ensure initialization is complete

    const handleStatusChange = async () => {
      if (!user) return; // Ensure user is logged in

      const updates = [
        { status: showEverydayStatus, setStatus: setEverydayStatus, container: "Everyday" },
        { status: showSavedStatus, setStatus: setSavedStatus, container: "Saved" },
        { status: showMStatus, setStatus: setMStatus, container: "Monday" },
        { status: showTStatus, setStatus: setTStatus, container: "Tuesday" },
        { status: showWStatus, setStatus: setWStatus, container: "Wednesday" },
        { status: showThStatus, setStatus: setThStatus, container: "Thursday" },
        { status: showFStatus, setStatus: setFStatus, container: "Friday" },
        { status: showSStatus, setStatus: setSStatus, container: "Saturday" },
        { status: showSunStatus, setStatus: setSunStatus, container: "Sunday" },
      ];

      for (const { status, setStatus, container } of updates) {
        if (status) {
          await addDayStatus(status, setStatus as React.Dispatch<React.SetStateAction<boolean>>, container);
        } else {
          await removeDayStatus(status, setStatus as React.Dispatch<React.SetStateAction<boolean>>, container);
        }
      }
    };

    handleStatusChange();
  }, [
    showEverydayStatus,
    showSavedStatus,
    showMStatus,
    showTStatus,
    showWStatus,
    showThStatus,
    showFStatus,
    showSStatus,
    showSunStatus,
    user,
    ID,
    isInitialized,
  ]);


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

          console.log(userdata.data().SavedRecipe.includes(ID));

          if(container == "Everyday"){
            await updateDoc(user, {
              EverydayForWeek: arrayUnion(ID)
            });
            setSavedStatus(true);
          }  if(container == "Saved") {
            await updateDoc(user, {
              SavedRecipe:arrayUnion(ID)
            });
          } if(container == "Monday") {
            await updateDoc(user, {
              MondayMeals: arrayUnion(ID)
             
            });
            setSavedStatus(true);

          } if(container == "Tuesday") {
            await updateDoc(user, {
              TuesdayMeals: arrayUnion(ID)
             
            });
            setSavedStatus(true);

          } if(container == "Wednesday") {
            await updateDoc(user, {
              WednesdayMeals: arrayUnion(ID)              
            });
            setSavedStatus(true);

          } if(container == "Thursday") {
            await updateDoc(user, {
              ThursdayMeals: arrayUnion(ID)
            
            });
            setSavedStatus(true);

          } if(container == "Friday") {
            await updateDoc(user, {
              FridayMeals: arrayUnion(ID)
             
            });
            setFStatus(true);

          } if(container == "Saturday") {
            await updateDoc(user, {
              SaturdayMeals: arrayUnion(ID)
             
            });
            setSavedStatus(true);

           } if(container == "Sunday") {
            await updateDoc(user, {
              SundayMeals: arrayUnion(ID)
              
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
            EverydayForWeek: arrayRemove(ID)
          });
          
        } if(container == "Saved") {
          await updateDoc(user, {
            SavedRecipe:arrayRemove(ID)
          });
        }if(container == "Monday") {
          await updateDoc(user, {
            MondayMeals: arrayRemove(ID)
          });
          //setMStatus(false);
        }if(container == "Tuesday") {
          await updateDoc(user, {
            TuesdayMeals: arrayRemove(ID)
          });
          //setTStatus(false);
        }if(container == "Wednesday") {
          await updateDoc(user, {
            WednesdayMeals: arrayRemove(ID)
          });
          //setWStatus(false);
        } if(container == "Thursday") {
          await updateDoc(user, {
            ThursdayMeals: arrayRemove(ID)
          });
          //setThStatus(false);
        }if(container == "Friday") {
          await updateDoc(user, {
            FridayMeals: arrayRemove(ID)
          });
          //setFStatus(false);
        } if(container == "Saturday") {
          await updateDoc(user, {
            SaturdayMeals: arrayRemove(ID)
          });
          //setSStatus(false);
        }if(container == "Sunday") {
          await updateDoc(user, {
            SundayMeals: arrayRemove(ID)
          });
          //setSunStatus(false);
        }

      }
      }catch(error){
        console.error("Error fetching user data:", error);
        setStatus(false);
      }
      
    }
  
  };

  return (
    <>
      <div className='main-container flex flex-row w-[18vw] h-[18vw] pt-[1%] pr-[1%] pb-[1%] pl-[1%] items-start bg-[#fff] rounded-[8px] border border-[#d9d9d9] relative mx-auto gap-y-1'>
        <div className='flex w-[50%] h-full flex-col items-center relative overflow-hidden rounded-lg'>
          <Image
            src={imageUrl || '/image'}
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
      </div>
    </>
  );
}
{/*
  
    TODO: work on read writes to get a sweet spot for each thing.

    */}


