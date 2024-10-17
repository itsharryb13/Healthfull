import React from 'react';

export default function RecipePage() {

  return (
    <div className='main-container w-[1687px] h-[2305px] bg-[#fff] relative overflow-hidden mx-auto my-0'>
      <div className='w-[1687px] h-[88.901px] bg-[#fff] relative z-30 mt-0 mr-0 mb-0 ml-0'>
        <button className='flex w-[9.13%] h-[52.87%] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#f5f5f5] rounded-[8px] border-none absolute top-[16.22%] left-[30.53%] z-[31] pointer'>
          <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[32]">
            New Recipe
          </span>
        </button>
        <button className='flex w-[9.13%] h-[52.87%] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#f5f5f5] rounded-[8px] border-none absolute top-[16.22%] left-[41.91%] z-[33] pointer'>
          <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[34]">
            Macros
          </span>
        </button>
        <button className='flex w-[9.13%] h-[52.87%] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#f5f5f5] rounded-[8px] border-none absolute top-[16.22%] left-[53.76%] z-[35] pointer'>
          <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[36]">
            Planner
          </span>
        </button>
        <button className='flex w-[9.13%] h-[52.87%] pt-[8px] pr-[8px] pb-[8px] pl-[8px] justify-between items-center flex-nowrap bg-[#f5f5f5] rounded-[8px] border-none absolute top-[16.22%] left-[18.67%] z-[37] pointer'>
          <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[38]">
            All Recipes
          </span>
        </button>
        <button className='flex w-[154px] h-[47px] pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[8px] justify-center items-center flex-nowrap bg-[#2c2c2c] rounded-[8px] border-solid border border-[#2c2c2c] absolute top-[18px] left-[1500px] overflow-hidden z-[44] pointer'>
          <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#f5f5f5] relative text-left whitespace-nowrap z-[45]">
            My Account
          </span>
        </button>
        <div className='flex w-[20.09%] h-[43.87%] pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-[8px] items-center flex-nowrap bg-[#fff] rounded-full border-solid border border-[#d9d9d9] absolute top-[24.75%] left-[66.15%] overflow-hidden z-[39]'>
          <span className="h-[16px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#1e1e1e] relative text-left whitespace-nowrap z-40">
            Search for recipes
          </span>
          <div className='w-[16px] h-[16px] shrink-0 relative overflow-hidden z-[41]'>
            </div>
        </div>
      </div>
      <div className='w-[1564px] h-[1383px] relative z-[72] mt-[34.099px] mr-0 mb-0 ml-[58px]'>
        <div className='w-[957px] h-[312px] bg-[#e5dece] rounded-[21px] absolute top-0 left-0 z-[72]'>
          <span className="flex w-[420px] h-[115px] justify-center items-center font-['Roboto'] text-[40px] font-semibold leading-[32px] text-[#000] absolute top-[calc(50%-149px)] left-[calc(50%-50.5px)] text-center z-[73]">
            Recipe Name
          </span>
          <div className='w-[36px] h-[30px] absolute top-[20px] left-[901px] overflow-hidden z-[79]'>
            </div>
          <span className="flex w-[279px] h-[40px] justify-center items-center font-['Roboto'] text-[24px] font-normal leading-[32px] text-[#000] absolute top-[calc(50%-29px)] left-[calc(50%-140.5px)] text-center whitespace-nowrap z-[74]">
            Author Name
          </span>
          <span className="flex w-[279px] h-[40px] justify-center items-center font-['Roboto'] text-[24px] font-normal leading-[32px] text-[#000] absolute top-[calc(50%-29px)] left-[calc(50%--179.5px)] text-center whitespace-nowrap z-[78]">
            Likes: 0
          </span>
          <span className="flex w-[145px] h-[63px] justify-center items-center font-['Roboto'] text-[20px] font-normal leading-[32px] text-[#000] absolute top-[calc(50%--44px)] left-[calc(50%-78.5px)] text-center z-[75]">
            Prep Time:
            <br />0 min
          </span>
          <span className="flex w-[145px] h-[63px] justify-center items-center font-['Roboto'] text-[20px] font-normal leading-[32px] text-[#000] absolute top-[calc(50%--44px)] left-[calc(50%--87.5px)] text-center z-[76]">
            Cook Time:
            <br />0 min
          </span>
          <span className="flex w-[145px] h-[63px] justify-center items-center font-['Roboto'] text-[20px] font-normal leading-[32px] text-[#000] absolute top-[calc(50%--44px)] left-[calc(50%--261.5px)] text-center z-[77]">
            Servings:
            <br />1
          </span>
        </div>
        <div className='w-[561px] h-[1383px] bg-[#e5dece] rounded-[21px] absolute top-0 left-[1003px] z-[57]'>
          <div className='flex w-[279px] h-[407px] pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[16px] items-start flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] absolute top-[122px] left-[141px] z-[82]'>
            <div className='flex w-[208px] flex-col gap-[8px] items-start shrink-0 flex-nowrap relative z-[84]'>
              <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[85]'>
                <span className="h-[24px] grow shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[24px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[86]">
                  Breakfast Tacos
                </span>
              </div>
              <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[87]'>
                <span className="flex w-[229px] h-[66px] justify-start items-start shrink-0 font-['Inter'] text-[16px] font-normal leading-[22.4px] text-[#757575] relative text-left z-[88]">
                  Filled with eggs, pico de gallo,
                  <br />
                  and avocados - flavorful and <br />
                  easy to make!
                </span>
              </div>
            </div>
          </div>
          <span className="flex w-[420px] h-[83px] justify-center items-center font-['Roboto'] text-[28px] font-semibold leading-[32px] text-[#000] absolute top-[calc(50%-497.5px)] left-[calc(50%-226.5px)] text-center z-[68]">
            Related Recipes
          </span>
          <div className='flex w-[279px] h-[407px] pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[16px] items-start flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] absolute top-[854px] left-[141px] z-[89]'>
            <div className='flex h-[247px] flex-col justify-center items-center self-stretch shrink-0 flex-nowrap bg-contain bg-no-repeat relative overflow-hidden z-[90]' />
            <div className='flex w-[208px] flex-col gap-[8px] items-start shrink-0 flex-nowrap relative z-[91]'>
              <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[92]'>
                <span className="h-[24px] grow shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[24px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[93]">
                  Breakfast Tacos
                </span>
              </div>
              <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[94]'>
                <span className="flex w-[229px] h-[66px] justify-start items-start shrink-0 font-['Inter'] text-[16px] font-normal leading-[22.4px] text-[#757575] relative text-left z-[95]">
                  Filled with eggs, pico de gallo,
                  <br />
                  and avocados - flavorful and <br />
                  easy to make!
                </span>
              </div>
            </div>
          </div>
          <span className="flex w-[420px] h-[83px] justify-center items-center font-['Roboto'] text-[28px] font-semibold leading-[32px] text-[#000] absolute top-[calc(50%--231.5px)] left-[calc(50%-226.5px)] text-center z-[69]">
            Trending Recipes
          </span>
        </div>
        <div className='w-[957px] h-[323.62px] text-[0px] bg-cover bg-no-repeat absolute top-[346.38px] left-0 z-[66]'>
          <span className="flex w-[420px] h-[68px] justify-center items-center font-['Roboto'] text-[36px] font-semibold leading-[32px] text-[#000] relative text-center z-[67] mt-[20.62px] mr-0 mb-0 ml-[270px]">
            Ingredients
          </span>
          <div className='flex w-[228px] gap-[24px] items-center flex-nowrap relative z-[96] mt-[-5px] mr-0 mb-0 ml-[358px]'>
            <div className='flex w-[44px] pt-[4px] pr-[4px] pb-[4px] pl-0 flex-col justify-center items-center shrink-0 flex-nowrap relative z-[97]'>
              <div className='flex w-[40px] pt-[11px] pr-[11px] pb-[11px] pl-[11px] justify-center items-center shrink-0 flex-nowrap rounded-[100px] relative z-[98]'>
                <div className='w-[24px] h-[24px] shrink-0 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-[100]'>
                  </div>
                <div className='w-[18px] h-[18px] shrink-0 bg-[#fff] rounded-[2px] relative z-[99]' />
              </div>
            </div>
            <span className="flex w-[7px] h-[16px] justify-end items-start shrink-0 basis-auto font-['Roboto'] text-[11px] font-medium leading-[16px] text-[#49454f] tracking-[0.5px] relative text-right whitespace-nowrap z-[102]">
              2
            </span>
            <span className="flex w-[285px] h-[47px] justify-start items-center shrink-0 basis-auto font-['Roboto'] text-[24px] font-normal leading-[47px] text-[#000] relative text-left whitespace-nowrap z-[103]">
              Large Eggs
            </span>
          </div>
        </div>
        <div className='w-[957px] h-[675px] text-[0px] bg-cover bg-no-repeat absolute top-[708px] left-0 z-[59]'>
          <span className="flex w-[420px] h-[76.132px] justify-center items-center font-['Roboto'] text-[36px] font-semibold leading-[32px] text-[#000] relative text-center z-[63] mt-[10px] mr-0 mb-0 ml-[270px]">
            Instructions
          </span>
          <span className="flex w-[848px] h-[414px] justify-start items-start font-['Roboto'] text-[24px] font-normal leading-[32px] text-[#000] relative text-left z-[62] mt-[-0.13px] mr-0 mb-0 ml-[53px]">
            Preheat the oven to 400 degrees Fahrenheit.
            <br />
            In a medium bowl combine eggs, egg whites, cheese and a pinch of
            salt and pepper. Set aside.
            <br />
            Heat a 10-inch skillet on low heat; melt half of the butter and add
            the onions with a pinch of salt and pepper.
            <br />
            Other steps, etc., etc.
            <br />
            Serve and enjoy!
          </span>
          <span className="flex w-[891px] h-[72px] justify-start items-center font-['Roboto'] text-[20px] font-normal leading-[32px] text-[#000] relative text-left z-[61] mt-[6px] mr-0 mb-0 ml-[28px]">
            Nutrition Facts: Calories, Carbs, Protein, Fat, Sugar
          </span>
          <span className="flex w-[891px] h-[72px] justify-start items-center font-['Roboto'] text-[20px] font-normal leading-[32px] text-[#000] relative text-left z-[60] mt-[-4px] mr-0 mb-0 ml-[28px]">
            Tags: GlutenFree, Vegan, Lunch
          </span>
        </div>
      </div>
      <span className="flex w-[420px] h-[76.132px] justify-center items-center font-['Roboto'] text-[36px] font-semibold leading-[32px] text-[#000] relative text-center z-[64] mt-[10px] mr-0 mb-0 ml-[633px]">
        Comments
      </span>
      <div className='w-[1687px] h-[394px] relative z-[46] mt-[270.868px] mr-0 mb-0 ml-0'>
        <div className='flex w-[1687px] h-[394px] pt-[32px] pr-[32px] pb-[160px] pl-[32px] gap-[16px] items-start flex-wrap bg-[#e5dece] border-solid border-b border-b-[#d9d9d9] absolute top-0 left-0 overflow-hidden'>
          <div className='flex w-[262px] flex-col gap-[24px] items-start flex-nowrap relative z-[1]'>
            <div className='flex w-[143.98px] gap-[16px] items-center shrink-0 flex-nowrap relative z-[2]'>
              <div className='w-[23.98px] h-[24px] shrink-0 relative z-[3]'>
                </div>
              <div className='w-[24px] h-[24px] shrink-0 relative overflow-hidden z-[5]'>
                </div>
              <div className='w-[24px] h-[24px] shrink-0 relative overflow-hidden z-[7]'>
                </div>
              <div className='w-[24px] h-[24px] shrink-0 relative overflow-hidden z-[9]'>
                </div>
            </div>
          </div>
          <div className='flex w-[262px] flex-col gap-[12px] items-start flex-nowrap relative z-[11]'>
            <div className='flex pt-0 pr-0 pb-[16px] pl-0 flex-col gap-[10px] items-start self-stretch shrink-0 flex-nowrap relative z-[12]'>
              <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[13]'>
                <span className="h-[22px] shrink-0 basis-auto font-['Inter'] text-[16px] font-semibold leading-[22px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[14]">
                  About Us
                </span>
              </div>
            </div>
            <div className='w-[89px] h-[22px] shrink-0 relative z-[15]'>
              <span className="flex h-full justify-start items-center font-['Inter'] text-[16px] font-normal leading-[22px] text-[#1e1e1e] absolute top-0 left-0 text-left whitespace-nowrap z-[16]">
                Blog
              </span>
            </div>
            <div className='w-[89px] h-[22px] shrink-0 relative z-[17]'>
              <span className="flex h-full justify-start items-center font-['Inter'] text-[16px] font-normal leading-[22px] text-[#1e1e1e] absolute top-0 left-0 text-left whitespace-nowrap z-[18]">
                Best practices
              </span>
            </div>
            <div className='w-[89px] h-[22px] shrink-0 relative z-[19]'>
              <span className="flex h-full justify-start items-center font-['Inter'] text-[16px] font-normal leading-[22px] text-[#1e1e1e] absolute top-0 left-0 text-left whitespace-nowrap z-20">
                Colors
              </span>
            </div>
            <div className='w-[89px] h-[22px] shrink-0 relative z-[21]'>
              <span className="flex h-full justify-start items-center font-['Inter'] text-[16px] font-normal leading-[22px] text-[#1e1e1e] absolute top-0 left-0 text-left whitespace-nowrap z-[22]">
                Color wheel
              </span>
            </div>
            <div className='w-[89px] h-[22px] shrink-0 relative z-[23]'>
              <span className="flex h-full justify-start items-center font-['Inter'] text-[16px] font-normal leading-[22px] text-[#1e1e1e] absolute top-0 left-0 text-left whitespace-nowrap z-[24]">
                Support
              </span>
            </div>
            <div className='w-[89px] h-[22px] shrink-0 relative z-[25]'>
              <span className="flex h-full justify-start items-center font-['Inter'] text-[16px] font-normal leading-[22px] text-[#1e1e1e] absolute top-0 left-0 text-left whitespace-nowrap z-[26]">
                Developers
              </span>
            </div>
          </div>
        </div>
        <div className='flex w-[652px] h-[253px] pt-[64px] pr-[64px] pb-[64px] pl-[64px] flex-col gap-[24px] items-center flex-nowrap bg-[#e5dece] absolute top-[48px] left-[530px] z-[46]'>
          <div className='flex w-[261px] flex-col gap-[8px] items-center shrink-0 flex-nowrap relative z-[47]'>
            <span className="h-[29px] self-stretch shrink-0 basis-auto font-['Inter'] text-[24px] font-semibold leading-[28.8px] text-[#1e1e1e] tracking-[-0.48px] relative text-center whitespace-nowrap z-[48]">
              Follow the latest trends
            </span>
            <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[24px] text-[#757575] relative text-center whitespace-nowrap z-[49]">
              With our daily newsletter
            </span>
          </div>
          <div className='flex w-[338px] gap-[12px] items-end shrink-0 flex-nowrap relative z-50'>
            <div className='flex w-[249px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] relative overflow-hidden z-[51]'>
              <input className='w-[249px] h-[40px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[53]' />
              <span className="h-[16px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#b3b3b3] relative text-left whitespace-nowrap z-[52]">
                you@example.com
              </span>
            </div>
            <button className='flex w-[77px] pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#2c2c2c] rounded-[8px] border-solid border border-[#2c2c2c] relative overflow-hidden z-[54] pointer'>
              <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#f5f5f5] relative text-left whitespace-nowrap z-[55]">
                Submit
              </span>
            </button>
          </div>
        </div>
        </div>
    </div>
  );
}