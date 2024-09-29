import Image from "next/image";

interface RecipeCardProps {
  name?: string; // Name of the recipe
  imageUrl?: string; // URL of the recipe image
  description?: string; // Description of the recipe
  onSave?: () => void; // Optional save function
}

export function RecipeCard({ name, imageUrl, description, onSave }: RecipeCardProps) {
  return (
    <>
      <div className='main-container flex w-[14vw] h-[20vw] pt-[1%] pr-[.5%] pb-[1%] pl-[.5%] flex-col items-start bg-[#fff] rounded-[8px] border border-[#d9d9d9] relative mx-auto gap-y-1 overflow-hidden'>
        <div className='flex w-full h-[50%] flex-col justify-center items-center relative overflow-hidden'>
          <Image
            src={imageUrl || '/default-image.svg'}
            alt={name || "item"}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex w-full h-[50%] flex-col relative z-[1]">
          <div className="flex items-start self-stretch flex-nowrap relative z-[2] pt-[5%] pr-[5%] pl-[5%]">
            <span className="font-['Inter'] text-[1.4vw] font-normal leading-[1.5vw] text-[#1e1e1e] relative text-center whitespace-normal z-[3]">
              {name || "Unnamed Item"}
            </span>
          </div>
          <div className="flex items-start self-stretch flex-nowrap relative z-[4] pt-[5%] pr-[5%] pl-[5%] overflow-hidden">
            <span className="flex font-['Inter'] text-left text-[0.9vw] font-normal text-[#757575] break-words whitespace-normal max-h-[30%] pt-[5%]">
              {description || "No Description available"}
            </span>
          </div>
          <button 
            onClick={onSave} 
            className="absolute top-[5%] right-[5%] bg-transparent border-none cursor-pointer"
          >
            <Image 
              src="" // Replace with your actual icon path
              alt="Save Recipe"
              width={20} // Adjust width as needed
              height={20} // Adjust height as needed
            />
          </button>
        </div>
      </div>
    </>
  );
}
{/* TODO: add the save button and  make it working using the layout.txs which can alter route based on authentication*/}
