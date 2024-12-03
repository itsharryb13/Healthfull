"use client"
import Image from "next/image";
import saveButton from "../../public/save-button.svg";
import removeButton from "../../public/remove.svg";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { DropdownMenu, DropdownMenuArrowProps, DropdownMenuCheckboxItemProps, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuCheckboxItem, DropdownMenuSeparator, DropdownMenuLabel} from "@/components/ui/dropdown-menu";
import { collection,query,arrayUnion,where, getDocs,getDoc,doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useRouter } from "next/navigation"; 


interface RecipeCardProps {
  ID?: string; // id of the recipe
 name?: string; // Name of the recipe
 imageUrl?: string; // URL of the recipe image
 description?: string; // Description of the recipe
 onSaveButton?: boolean; // Optional save function
}

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function RecipeCard({ ID, name, imageUrl, description, onSaveButton}: RecipeCardProps) {

  const auth = getAuth();
  const user = auth.currentUser;
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
  const [displayButton, setDisplayButton] = useState<boolean>(true);
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const router = useRouter();

  const fetchRecipeStatus = async () => {
    if (!user) return;
    try {
      const DocumentSearch = query(
        collection(db, "users"),
        where("uid", "==", user.uid)
      );
      const userDocument = await getDocs(DocumentSearch);
      if (!userDocument.empty) {
        const userData = userDocument.docs[0].data();
        setSavedStatus(userData.SavedMeals?.includes(ID) || false);
        setEverydayStatus(userData.EverydayMeals?.includes(ID) || false);
        setMStatus(userData.MondayMeals?.includes(ID) || false);
        setTStatus(userData.TuesdayMeals?.includes(ID) || false);
        setWStatus(userData.WednesdayMeals?.includes(ID) || false);
        setThStatus(userData.ThursdayMeals?.includes(ID) || false);
        setFStatus(userData.FridayMeals?.includes(ID) || false);
        setSStatus(userData.SaturdayMeals?.includes(ID) || false);
        setSunStatus(userData.SundayMeals?.includes(ID) || false);
        setIsInitialized(true);
      } else {
        alert("No matching user document found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchRecipeStatus();
    if (onSaveButton === false) {
      setDisplayButton(false);
    }
  }, [user]);

  useEffect(() => {
    if (!isInitialized) return;

    const handleStatusChange = async () => {
      if (!user) {
        alert("No user logged in, cannot retrieve saved recipes.");
        return;
      }

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
          await addDayStatus(status, setStatus, container);
        } else {
          await removeDayStatus(status, setStatus, container);
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

  const addDayStatus = async (
    status: boolean,
    setStatus: React.Dispatch<React.SetStateAction<boolean>>,
    container: string
  ) => {
    if (!user) {
      alert("No user signed in. Please sign in and try again.");
      setStatus(false);
      return;
    }

    try {
      const DocumentSearch = query(collection(db, "users"), where("uid", "==", user.uid));
      const userDocument = await getDocs(DocumentSearch);
      if (userDocument.empty) {
        alert("No matching user document found.");
        setStatus(false);
      } else {
        const userRef = userDocument.docs[0].ref;

        await updateDoc(userRef, {
          [`${container}Meals`]: arrayUnion(ID),
        });
        setStatus(true);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setStatus(false);
    }
  };

  const removeDayStatus = async (
    status: boolean,
    setStatus: React.Dispatch<React.SetStateAction<boolean>>,
    container: string
  ) => {
    if (!user) {
      setStatus(false);
      return;
    }

    try {
      const DocumentSearch = query(collection(db, "users"), where("uid", "==", user.uid));
      const userDocument = await getDocs(DocumentSearch);
      if (userDocument.empty) {
        alert("No matching user document found.");
        setStatus(false);
      } else {
        const userRef = userDocument.docs[0].ref;

        await updateDoc(userRef, {
          [`${container}Meals`]: arrayRemove(ID),
        });
        setStatus(false);
      }
    } catch (error) {
      console.error("Error removing status:", error);
      setStatus(false);
    }
  };

  const handleCardClick = () => {
    if (ID) {
      router.push(`/recipes/${ID}`);
    } else {
      console.error("Invalid recipe ID");
    }
  };

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev); // Toggle dropdown open state
  };


  return (
    <div
    className="main-container flex flex-col w-[18vw] h-[22vw] p-[1%] items-center bg-card rounded-lg shadow-lg border-border-custom relative mx-auto transition-transform duration-300 hover:scale-105 hover:shadow-xl"
    onDoubleClick={handleCardClick}
  >
    {/* Image Section */}
    <div className="w-full h-[60%] relative overflow-hidden rounded-lg">
      <Image
        src={imageUrl || '/default-image.svg'}
        alt={name ?? "Recipe Image"}
        fill
        sizes="(max-width: 200px) 100vw, (max-width: 400px) 50vw, 33vw"
        className="object-cover"
      />
    </div>

    {/* Recipe Details */}
    <div className="w-full h-[40%] flex flex-col justify-center items-center text-center p-2">
      <h3 className="font-semibold text-lg text-foreground">{name || "Unnamed Recipe"}</h3>
      <p className="text-sm text-foreground line-clamp-3 overflow-hidden">{description || "No Description available"}</p>
    </div>

    {/* Dropdown Save Button */}
    {displayButton && (
      <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
            <button
              onClick={handleDropdownToggle} // Toggle dropdown on click
              className="absolute top-2 right-2 p-1 bg-card rounded-full shadow-md hover:bg-button-hover"
            >
              <Image
                src={saveButton}
                alt="Save Recipe"
                width={24}
                height={24}
                className="hover:opacity-80"
              />
            </button>
          </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent
            className="w-48 bg-input shadow-lg border border-gray-200 rounded-lg p-2"
            sideOffset={4} 
            alignOffset={-5} 
          >
            <DropdownMenuLabel className="text-center text-foreground font-semibold">Select days to save to Planner</DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuCheckboxItem className="text-foreground" checked={showSavedStatus} onCheckedChange={setSavedStatus}>
              Save Recipe
            </DropdownMenuCheckboxItem>
            {/* <DropdownMenuCheckboxItem className="text-foreground" checked={showEverydayStatus} onCheckedChange={setEverydayStatus}>
              Everyday
            </DropdownMenuCheckboxItem> */}
            <DropdownMenuSeparator className="my-1" />
            <div className="grid grid-cols-3 gap-x-1 pr-3">
              <DropdownMenuCheckboxItem className="text-foreground" checked={showMStatus} onCheckedChange={setMStatus}>Mon</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className="text-foreground" checked={showTStatus} onCheckedChange={setTStatus}>Tue</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className="text-foreground" checked={showWStatus} onCheckedChange={setWStatus}>Wed</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className="text-foreground" checked={showThStatus} onCheckedChange={setThStatus}>Th</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className="text-foreground" checked={showFStatus} onCheckedChange={setFStatus}>Fri</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className="text-foreground" checked={showSStatus} onCheckedChange={setSStatus}>Sat</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className="text-foreground" checked={showSunStatus} onCheckedChange={setSunStatus}>Sun</DropdownMenuCheckboxItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    )}
  </div>
);
}
{/*
  
    TODO: bug with recipe card that open without user data ( nOT SIGNED IN PAGE).

    */}


