import Image from "next/image";
import Dish1 from '../../public/Dish1.svg'

export function RecipeCard(){ 
    // the text is overflowing out of the container
    return(<>
     <div className='main-container flex w-[25%] h-[30%] pt-[1%] pr-[.5%] pb-[1%] pl-[.5%] flex-col items-start flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] relative mx-auto gap-y-5% overflow-hidden '>
        <div className='flex w-full h-[50%] flex-col justify-center items-center self-stretch flex-nowrap relative overflow-hidden'>
            <Image src={Dish1} alt="dish 1" />
        </div>
        <div className="flex w-full h-[40%] flex-col items-start shrink-0 flex-nowrap relative z-[1]">
            <div className="flex items-start self-stretch shrink-0 flex-nowrap relative z-[2]">
            <span className="h-[60%] grow shrink-0 basis-auto font-['Inter'] text-[1.4vw] font-normal leading-[2vw] text-[#1e1e1e] relative text-left whitespace-normal z-[3] pt-[1vw]">
      Breakfast Tacos
    </span>
  </div>
  <div className="flex items-start self-stretch shrink-0 flex-nowrap relative z-[4]">
    <span className="flex h-[30%] text-center shrink-0 font-['Inter'] text-[1vw] font-normal text-[#757575] break-words whitespace-normal">
      Filled with eggs, pico de gallo, and avocados - flavorful and easy to make!
    </span>
  </div>
</div>

<<<<<<< Updated upstream
    </div>
    </>);
}
=======
export function RecipeCard({ name, imageUrl, description, onSave }: RecipeCardProps) {
  return (
    <>
      
      <div className='main-container flex flex-row w-[20vw] h-[18vw] pt-[1%] pr-[.5%] pb-[1%] pl-[.5%] items-start bg-[#fff] rounded-[8px] border border-[#d9d9d9] relative mx-auto gap-y-1 overflow-hidden'>
        <div className='flex w-[50%] h-full flex-col items-center relative overflow-hidden pt-[2%] pr-[5%] pl-[5%] pb-[2%]'>
          <Image
            src={imageUrl ? imageUrl: "/default-image.jpg"}
            alt={name ?? "item"}
            fill
            sizes="(max-width: 200px) 100vw, (max-width: 400px) 50vw, 33vw "
            objectFit="cover"
          />
        </div>
        <div className="flex w-[50%] h-full flex-col relative text-center  ">
          <div className="flex h-[20%]items-start self-stretch flex-nowrap relative pt-[2%] pr-[2%] pl-[2%] pb-[2%] ">
            <span className="font-['Inter'] text-[1.2vw] font-normal leading-lg text-[#1e1e1e] relative  whitespace-normal z-[3]">
              {name || "Unnamed Item"}
            </span>
          </div>
          <div className="flex h-[60%] items-start self-stretch flex-nowrap relative mt-[10%] pr-[2%] pl-[5%] overflow-hidden">
            <span className="flex font-['Inter'] text-center text-[0.9vw] font-normal text-[#757575] break-words whitespace-normal max-h-[30%] pt-[5%]">
              {description || "No Description available"}
            </span>
          </div>
         
        </div>

        <button 
            onClick={onSave} 
            className="absolute bottom-[5%] right-[5%] bg-transparent border-none cursor-pointer"
          >
            <Image 
              src="" // Replace with your actual icon path
              alt="Save Recipe"
              width={20} // Adjust width as needed
              height={20} // Adjust height as needed
            />
          </button>
      </div>
    </>
  );
}
{/* TODO: add the save button and  make it working using the layout.txs which can alter route based on authentication */}
{/* TODO: find the other place to store picture which are accessible at any time without any problem */}
>>>>>>> Stashed changes
