
import Image from "next/image";
import saveButton from "../../public/save-button.svg";
import removeButton from "../../public/remove.svg";
import { db } from "../../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import useAuth from "@/lib/useAuth";

interface RecipeCardProps {
  id?: string; // id of the recipe
  name?: string; // Name of the recipe
  imageUrl?: string; // URL of the recipe image
  description?: string; // Description of the recipe
  onSave?: () => void; // Optional save function
}

export function RecipeCard({ name, imageUrl, description, onSave }: RecipeCardProps) {
  const auth = useAuth();
  return (
    <>
      <div className='main-container flex flex-row w-[20vw] h-[20vw] pt-[1%] pr-[1%] pb-[1%] pl-[1%] items-start bg-[#fff] rounded-[8px] border border-[#d9d9d9] relative mx-auto gap-y-1 overflow-hidden'>
        <div className='flex w-[50%] h-full flex-col items-center relative overflow-hidden rounded-lg'>
          <Image
            src={imageUrl || "/default-image.svg"}
            alt={name ?? "item"}
            fill
            sizes="(max-width: 200px) 100vw, (max-width: 400px) 50vw, 33vw"
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

        <button
          onClick={onSave}
          className="w-[10%] absolute bottom-[5%] right-[5%] bg-transparent border-none cursor-pointer"
        >
          <Image
            src={saveButton}
            alt="Save Recipe"
            width={20}
            height={20}
            className="hover:bg-[#e5dece]"
          />
        </button>

        <button
          onClick={onSave}
          className="absolute bottom-[5%] right-[32%] bg-transparent border-none cursor-pointer"
        >
          <Image
            src={removeButton}
            alt="Remove Recipe"
            width={20}
            height={20}
            className="hover:bg-[#e5dece]"
          />
        </button>
      </div>
    </>
  );
}

{/* TODO: add the save button and  make it working using the layout.txs which can alter route based on authentication*/}
