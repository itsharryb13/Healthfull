import { RecipeCard } from "../Recipe Card/ReciepeCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { addDoc, collection,query,where,getDocs } from "firebase/firestore";
import useAuth from "@/lib/useAuth";
import {db} from "../../../firebaseConfig";

export default async function InfoContainer(){

    // const auth = useAuth;
    // if (!auth) {
    //    alert('No user logged in, cannot save recipe to profile');
    //    return;
    // }
    // const usersRef = collection(db, "users");
    // const q = query(usersRef, where("uid", "==", auth?.uid));
    // const querySnapshot = await getDocs(q);
    // if (querySnapshot.empty) {
    //    alert("No matching user document found.");
    //    return;
    // }

    return(
        <div className='flex flex-col w-auto h-[80vw] pt-[2vw] pr-[2vw]  pl-[2vw] gap-x-[5%]  mx-auto'>
            {/* <div className="flex flex-col w-[95%] h-[5%] bg-slate-300 rounded-[21px] pt-[1vw] pb-[1vw] mx-auto"> */}
            <Tabs defaultValue="Saved" className="flex flex-col w-auto pt-[2%] pb-[2%] gap-y-[2%] mx-auto" >
                <TabsList>
                    <TabsTrigger value="Saved" className="text-lg w-[50%]">Saved Recipes</TabsTrigger>
                    <TabsTrigger value="draft_create" className="text-lg w-[50%]">Draft/Created Recipes</TabsTrigger>
                </TabsList>
                <TabsContent value="Saved">
                    <div className="w-[85vw] h-[70vw] bg-[#e5dece] rounded-[21px] pt-[1vw] pb-[1vw] mx-auto recipe-cards grid grid-cols-3 gap-x-10">
                        <h1>
                            saved recipe
                        </h1>

                    </div>

                </TabsContent>

                <TabsContent value="draft_create">
                    <div className="w-[85vw] h-[70vw] bg-[#e5dece] rounded-[21px] pt-[1vw] pb-[1vw] mx-auto recipe-cards grid grid-cols-3 gap-x-10">

                        <h1>
                            recipe create
                        </h1>

                    </div>

                </TabsContent>
            </Tabs>

            {/* </div> */}
            
            
            
            {/* need to add the profile picture box which has capabilty to update the profile picture using dropdown picture */}

            {/* <div className='flex flex-col w-[30%] h-[70%] bg-[#e5dece] rounded-[21px] pt-[1vw] pb-[1vw] relative pr-[2%] pl-[2%] overflow-hidden'>
                <button className='flex w-full h-[8%] justify-center items-center flex-nowrap bg-[#1e1e1e] rounded-[8px] border-solid border border-[#2c2c2c] relative top-[50%]'>
                    <span className=" shrink-0 basis-auto font-['Inter'] text-[2vw] font-semibold  text-[#f5f5f5] relative text-left whitespace-nowrap z-[5]">
                        Saved Recipes
                    </span>
                </button>
                <button className='flex w-full h-[8%] justify-center items-center flex-nowrap bg-[#1e1e1e] rounded-[8px] border-solid border border-[#2c2c2c] relative top-[55%] '>
                    <span className=" shrink-0 basis-auto font-['Inter'] text-[2vw] font-semibold  text-[#f5f5f5] relative text-left whitespace-nowrap z-[5]">
                        Recipe Drafts
                    </span>
                </button>
                <button className='flex w-full h-[8%] justify-center items-center flex-nowrap bg-[#1e1e1e] rounded-[8px] border-solid border border-[#2c2c2c] relative top-[60%] '>
                    <span className=" shrink-0 basis-auto font-['Inter'] text-[2vw] font-semibold  text-[#f5f5f5] relative text-left whitespace-nowrap z-[5]">
                        Settings
                    </span>
                </button>
                <button className='flex w-full h-[8%] justify-center items-center flex-nowrap bg-[#1e1e1e] rounded-[8px] border-solid border border-[#2c2c2c] relative top-[65%]'>
                    <span className=" shrink-0 basis-auto font-['Inter'] text-[2vw] font-semibold  text-[#f5f5f5] relative text-left whitespace-nowrap z-[5]">
                        Logout.
                    </span>
                </button>
            </div> */}
        </div>
    );
}
{/* TODO: Connect to the user document and get the recipe id for display in the saved recipe pane and create recipe pane;
    TODO: Query the firebase for only the recipes that is stored in an array;
    
    */}