import { RecipeCard } from "./ReciepeCard";
import { RecipeCard2 } from "./RecipeCard2";
import { RecipeCard3 } from "./RecipeCard3";
import { RecipeCard4 } from "./RecipeCard4";

export default function InfoHomePage() {
    return (
        <div className='flex flex-row w-auto h-[80vw] pt-[2vw] pr-[2vw] pb-[2vw] pl-[2vw] gap-x-[2vw]'>
            {/* Left column with Trending List and Suggested List */}
          
            <div className='flex flex-col gap-y-10 w-[70%]'>
          
                {/* Trending Recipes Section */}
                <div className='flex flex-col w-full h-[40%] bg-[#e5dece] rounded-[21px] pt-[2vw] pb-[2vw] relative'>
                    {/* Trending Recipes Title */}
                    <span className="flex w-[381px] h-[69px] justify-start items-start font-['Inter'] text-[32px] font-normal leading-[38.4px] text-[#000] relative text-left z-[1] ml-[28px]">
                        Trending Recipes
                    </span>
                    
                    {/* Recipe Cards Container */}
                    <div className="flex flex-row gap-[2vw] mt-[2vw]">
                        <RecipeCard />
                        <RecipeCard3 />
                        <RecipeCard2 />
                    </div>
                </div>
                
                {/* Suggested Recipes Section */}
                <div className='flex flex-col w-full h-[40%] bg-[#e5dece] rounded-[21px] pt-[2vw] pb-[2vw] relative'>
                    {/* Suggested for You Title */}
                    <span className="flex w-[381px] h-[69px] justify-start items-start font-['Inter'] text-[32px] font-normal leading-[38.4px] text-[#000] relative text-left z-[1] ml-[28px]">
                        Suggested for you
                    </span>
                    
                    {/* Recipe Cards Container */}
                    <div className="flex flex-row gap-[2vw] mt-[2vw]">
                        <RecipeCard2 />
                        <RecipeCard />
                        <RecipeCard4 />
                    </div>
                </div>
            </div>
            {/* Right column with Grocery list */}
            <div className='flex flex-col w-[30%] h-[83.7%] bg-[#e5dece] rounded-[21px] pt-[1vw] pb-[1vw]'>
            {/* Header */}
            <div className='flex pt-[24px] pr-[24px] pb-[24px] pl-[24px] flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative overflow-hidden'>
                <span className="h-[32px] self-stretch shrink-0 basis-auto font-['Inter'] text-[24px] font-normal leading-[32px] text-[#1d1b20] relative text-left whitespace-nowrap z-[1]">
                    Grocery List
                </span>
                <span className="h-[20px] self-stretch shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[20px] text-[#49454f] tracking-[0.25px] relative text-left whitespace-nowrap z-[2]">
                    Add and remove items
                </span>
            </div>

            <div className='flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[3]'>
        <div className='flex flex-col justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[4]'>
          <div className='w-full h-[57px] shrink-0 absolute top-0 left-0 z-[5]' />
          <div className='flex h-[56px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative z-[6]'>
            <div className='flex w-[40px] h-[40px] p-0 flex-col justify-center items-start shrink-0 flex-nowrap relative overflow-hidden z-[7]' />
            <div className='flex flex-col justify-center items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[8]'>
              <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[24px] text-[#1d1b20] tracking-[0.5px] relative text-left whitespace-nowrap z-[9]">
                Lime
              </span>
            </div>
            <div className='flex w-[61px] gap-[10px] items-center shrink-0 flex-nowrap relative z-[25]'>
              <span className="flex w-[7px] h-[16px] justify-end items-start shrink-0 basis-auto font-['Inter'] text-[11px] font-medium leading-[16px] text-[#49454f] tracking-[0.5px] relative text-right whitespace-nowrap z-[26]">
                2
              </span>
              <div className='flex w-[44px] pt-[4px] pr-[4px] pb-[4px] pl-0 flex-col justify-center items-center shrink-0 flex-nowrap relative z-[27]'>
                <div className='flex w-[40px] pt-[11px] pr-[11px] pb-[11px] pl-[11px] justify-center items-center shrink-0 flex-nowrap rounded-[100px] relative z-[28]'>
                  <div className='w-[24px] h-[24px] shrink-0 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-30'>
                   
                  </div>
                  <div className='w-[18px] h-[18px] shrink-0 bg-[#fff] rounded-[2px] relative z-[29]' />
                </div>
              </div>
            </div>
            
        
          </div>
          <div className='flex pt-0 pr-[16px] pb-0 pl-[16px] flex-col justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[17]'>
            
          </div>
        </div>
        <div className='flex flex-col justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[19]'>
          <div className='w-full h-[56px] shrink-0 absolute top-0 left-0 z-20' />
          <div className='flex h-[56px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[16px] items-center self-stretch shrink-0 flex-nowrap relative z-[21]'>
            <div className='flex w-[40px] h-[40px] p-0 flex-col justify-center items-start shrink-0 flex-nowrap relative overflow-hidden z-[22]' />
            <div className='flex flex-col justify-center items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[23]'>
              <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[24px] text-[#1d1b20] tracking-[0.5px] relative text-left whitespace-nowrap z-[24]">
                Avocados
              </span>
            </div>
            <div className='flex w-[61px] gap-[10px] items-center shrink-0 flex-nowrap relative z-[25]'>
              <span className="flex w-[7px] h-[16px] justify-end items-start shrink-0 basis-auto font-['Inter'] text-[11px] font-medium leading-[16px] text-[#49454f] tracking-[0.5px] relative text-right whitespace-nowrap z-[26]">
                4
              </span>
              <div className='flex w-[44px] pt-[4px] pr-[4px] pb-[4px] pl-0 flex-col justify-center items-center shrink-0 flex-nowrap relative z-[27]'>
                <div className='flex w-[40px] pt-[11px] pr-[11px] pb-[11px] pl-[11px] justify-center items-center shrink-0 flex-nowrap rounded-[100px] relative z-[28]'>
                  <div className='w-[24px] h-[24px] shrink-0 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-30'>
                   
                  </div>
                  <div className='w-[18px] h-[18px] shrink-0 bg-[#fff] rounded-[2px] relative z-[29]' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex pt-[24px] pr-[24px] pb-[24px] pl-[16px] gap-[8px] justify-end items-start self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[32]'>
        <div className='flex w-[50px] h-[40px] flex-col gap-[8px] justify-center items-center shrink-0 flex-nowrap rounded-[100px] relative overflow-hidden z-[33]'>
          <div className='flex pt-[10px] pr-[12px] pb-[10px] pl-[12px] gap-[8px] justify-center items-center self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[34]'>
            <button className="w-[26px] h-[20px] shrink-0 font-['Roboto'] text-[14px] font-medium leading-[20px] text-[#1e1e1e] border-none tracking-[0.1px] relative whitespace-nowrap z-[35] pointer" />
          </div>
        </div>
        <div className='flex w-[76px] h-[40px] flex-col gap-[8px] justify-center items-center shrink-0 flex-nowrap rounded-[100px] relative overflow-hidden z-[36]'>
          <div className='flex pt-[10px] pr-[12px] pb-[10px] pl-[12px] gap-[8px] justify-center items-center self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[37]'>
            <button className="w-[52px] h-[20px] shrink-0 font-['Roboto'] text-[14px] font-medium leading-[20px] text-[#1e1e1e] border-none tracking-[0.1px] relative whitespace-nowrap z-[38] pointer" />
          </div>
        </div>
      </div>
    

            {/* Button Container positioned at the bottom */}
            <div className='flex pt-[10px] pr-[24px] pb-[10px] pl-[16px] gap-[8px] justify-end items-start self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[32]'>
                    <div className='flex w-[50px] h-[12px] flex-col gap-[8px] justify-center items-center shrink-0 flex-nowrap rounded-[100px] relative overflow-hidden z-[33]'>
                        <div className='flex pt-[10px] pr-[12px] pb-[10px] pl-[12px] gap-[8px] justify-center items-center self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[34]'>
                            <span className="flex w-[26px] h-[20px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[14px] font-medium leading-[20px] text-[#1e1e1e] tracking-[0.1px] relative text-center whitespace-nowrap z-[35]">
                                Add
                            </span>
                        </div>
                    </div>
                    <div className='flex w-[76px] h-[12px] flex-col gap-[8px] justify-center items-center shrink-0 flex-nowrap rounded-[100px] relative overflow-hidden z-[36]'>
                        <div className='flex pt-[10px] pr-[12px] pb-[10px] pl-[12px] gap-[8px] justify-center items-center self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[37]'>
                            <span className="flex w-[52px] h-[20px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[14px] font-medium leading-[20px] text-[#1e1e1e] tracking-[0.1px] relative text-center whitespace-nowrap z-[38]">
                                Remove
                            </span>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
