
export default function ResetPwdForm() {
  return (
    <div className='main-container w-[572px] h-[331px] bg-[#fff] border-solid border border-[#d9d9d9] relative mx-auto my-0'>
      <div className='flex w-[527.444px] flex-col gap-[8px] items-start flex-nowrap relative z-[1] mt-[36.132px] mr-0 mb-0 ml-[22.88px]'>
        <span className="h-[22px] self-stretch shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[22px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[2]">
          Username
        </span>
        <div className='flex pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] relative overflow-hidden z-[3]'>
          <span className="h-[16px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#b3b3b3] relative text-left whitespace-nowrap z-[4]">
            Username
          </span>
          <input className='w-[527.444px] h-[40px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[5]' />
        </div>
      </div>
      <div className='flex w-[527.444px] flex-col gap-[8px] items-start flex-nowrap relative z-[6] mt-[25.842px] mr-0 mb-0 ml-[22.88px]'>
        <span className="h-[22px] self-stretch shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[22px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[7]">
          New Password
        </span>
        <div className='flex pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] relative overflow-hidden z-[8]'>
          <span className="h-[16px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#b3b3b3] relative text-left whitespace-nowrap z-[9]">
            Password
          </span>
          <input className='w-[527.444px] h-[40px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-10' />
        </div>
      </div>
      <div className='flex w-[527.444px] h-[37.937px] gap-[16px] justify-center items-center flex-nowrap relative z-[11] mt-[47.026px] mr-0 mb-0 ml-[22.88px]'>
        <div className='flex w-[77px] pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[8px] justify-center items-center shrink-0 flex-nowrap rounded-[8px] relative overflow-hidden z-[12]'>
          <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#303030] relative text-left whitespace-nowrap z-[13]">
            Cancel
          </span>
        </div>
        <button className='flex w-[146px] pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#2c2c2c] rounded-[8px] border-solid border border-[#2c2c2c] relative overflow-hidden z-[14] pointer'>
          <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#f5f5f5] relative text-left whitespace-nowrap z-[15]">
            Reset Password
          </span>
        </button>
      </div>
      <div className='w-full h-full bg-[#e7e1d0] border-solid border border-[#d9d9d9] absolute top-[-0.3%] left-[-0.17%]' />
    </div>
  );
}