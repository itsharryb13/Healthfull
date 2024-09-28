// AllRecipes.js
export default function AllRecipes() {
  return (
    <div className="main-container w-[1614px] h-[1220px] relative mx-auto my-0 flex flex-row gap-[2vw]">
      {/* Filters Section on the Left */}
      <div className="w-[381px] h-[660px] bg-[#e5dece] rounded-[21px] pt-[1.5vw] pb-[1vw] flex flex-col items-center relative"> {/* Centered Filters section */}
        {/* Centered Filters Header */}
        <span className="block h-[45px] font-['Inter'] text-[32px] font-normal leading-[38.4px] text-[#000] relative text-center whitespace-nowrap z-[1] mt-0 mb-[20px]">
          Filters
        </span>
        {/* Filter Items Left-Aligned */}
        <div className="w-full flex flex-col items-start pl-[30px] pr-[20px]"> {/* Container for left-aligned items */}
          {[
            "Dairy-Free",
            "Gluten-Free",
            "Vegan",
            "Breakfast",
            "Lunch",
            "Dinner",
          ].map((filter, index) => (
            <span
              key={index}
              className="flex items-center h-[25px] font-['Inter'] text-[24px] font-semibold leading-[25px] text-[#000] tracking-[-0.48px] relative text-left whitespace-nowrap z-[27] mt-[20px] mr-0 mb-0 gap-[10px]"
            >
              <div className="w-[40px] h-[24px] bg-[#2c2c2c] rounded-full border-solid border border-[#2c2c2c] relative overflow-hidden">
                <div className="w-[18px] h-[18px] bg-gray-300 rounded-full relative z-[26] mt-[3px] ml-[19px]" />
              </div>
              {filter}
            </span>
          ))}
        </div>
        {/* Centered Clear Filter Button */}
        <div className="flex w-[113px] pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[8px] justify-center items-center flex-nowrap bg-[#2c2c2c] rounded-[8px] border-solid border border-[#2c2c2c] relative overflow-hidden z-[2] mt-[50px]">
          <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#f5f5f5] relative text-center whitespace-nowrap z-[3]">
            Clear Filter
          </span>
        </div>
      </div>

      {/* All Recipes Section on the Right */}
      <div className="w-[1185px] h-[1100px] bg-[#e5dece] rounded-[21px] pt-[1vw] pb-[1vw] flex flex-col items-center justify-between">
        {/* Search Bar and Header */}
        <div className="relative w-full flex flex-col items-center">
          <span className="font-['Inter'] text-[32px] font-normal leading-[38.4px] text-[#000] text-center mb-[20px]">
            All Recipes
          </span>
          <div className="flex w-[325px] h-[40px] pt-[14px] pr-[16px] pb-[12px] pl-[16px] gap-[10px] items-center bg-white rounded-full border border-gray-300 absolute top-[-0px] right-[5%] overflow-hidden z-[31]">
            <span className="h-[16px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[32]">
              Search for recipes
            </span>
            <div className="w-[16px] h-[16px] shrink-0 relative overflow-hidden z-[33] bg-gray-200 rounded-full" />
          </div>
        </div>
        {/* Pagination Section Moved Up */}
        <div className="flex w-[276px] gap-[8px] items-center flex-nowrap relative z-[36] mt-[40px] mx-auto">
          {["1", "2", "3", "...", "67", "68"].map((item, index) => (
            <div
              key={index}
              className={`flex w-[${item === "..." ? "47px" : "44px"}] pt-[8px] pr-[12px] pb-[8px] pl-[12px] flex-col justify-center items-center ${
                item === "1" ? "bg-[#2c2c2c]" : "bg-gray-200"
              } rounded-[8px] relative z-[${37 + index * 2}]`}
            >
              <span
                className={`h-[16px] shrink-0 font-['Inter'] text-[16px] ${
                  item === "..." ? "font-bold" : "font-normal"
                } leading-[16px] text-[#${item === "1" ? "f5f5f5" : "1e1e1e"}]`}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}