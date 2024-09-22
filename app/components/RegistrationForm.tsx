

export default function RegistrationForm() {
  return (
    <div className='main-container w-[567px] h-[774px] bg-[#ede6d6] border-solid border border-[#d9d9d9] relative mx-auto my-0'>
      <div className='flex w-[500px] h-[70px] flex-col gap-[8px] items-start flex-nowrap bg-[#e6e0d0] relative z-[23] mt-[32px] mr-0 mb-0 ml-[21px]'>
        <span className="h-[22px] self-stretch shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[22px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[24]">
          Name
        </span>
        <div className='flex pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] relative overflow-hidden z-[25]'>
          <input className='w-[500px] h-[40px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[27]' />
          <span className="h-[16px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#b3b3b3] relative text-left whitespace-nowrap z-[26]">
            Full Name
          </span>
        </div>
      </div>
      <div className='flex w-[500px] flex-col gap-[8px] items-start flex-nowrap relative z-[8] mt-[16px] mr-0 mb-0 ml-[21px]'>
        <span className="h-[22px] self-stretch shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[22px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[9]">
          Height
        </span>
        <div className='flex pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] relative overflow-hidden z-10'>
          <input className='w-[500px] h-[40px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[12]' />
          <span className="h-[16px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#b3b3b3] relative text-left whitespace-nowrap z-[11]">
            5’10”
          </span>
        </div>
      </div>
      <div className='flex w-[500px] flex-col gap-[8px] items-start flex-nowrap relative z-[28] mt-[16px] mr-0 mb-0 ml-[21px]'>
        <span className="h-[22px] self-stretch shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[22px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[29]">
          Weight
        </span>
        <div className='flex pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] relative overflow-hidden z-30'>
          <input className='w-[500px] h-[40px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[32]' />
          <span className="h-[16px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#b3b3b3] relative text-left whitespace-nowrap z-[31]">
            180 lbs
          </span>
        </div>
      </div>
      <div className='flex w-[500px] flex-col gap-[8px] items-start flex-nowrap relative z-[33] mt-[16px] mr-0 mb-0 ml-[21px]'>
        <span className="h-[22px] self-stretch shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[22px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[34]">
          Age
        </span>
        <div className='flex pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] relative overflow-hidden z-[35]'>
          <input className='w-[500px] h-[40px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[37]' />
          <span className="h-[16px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#b3b3b3] relative text-left whitespace-nowrap z-[36]">
            Age
          </span>
        </div>
      </div>
      <div className='flex w-[500px] flex-col gap-[8px] items-start flex-nowrap relative z-[18] mt-[16px] mr-0 mb-0 ml-[21px]'>
        <span className="h-[22px] self-stretch shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[22px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[19]">
          Email
        </span>
        <div className='flex pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] relative overflow-hidden z-20'>
          <input className='w-[500px] h-[40px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[22]' />
          <span className="h-[16px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#b3b3b3] relative text-left whitespace-nowrap z-[21]">
            email@example.com
          </span>
        </div>
      </div>
      <div className='flex w-[500px] flex-col gap-[8px] items-start flex-nowrap relative z-[13] mt-[16px] mr-0 mb-0 ml-[21px]'>
        <span className="h-[22px] self-stretch shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[22px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[14]">
          Username
        </span>
        <div className='flex pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] relative overflow-hidden z-[15]'>
          <input className='w-[500px] h-[40px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[17]' />
          <span className="h-[16px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#b3b3b3] relative text-left whitespace-nowrap z-[16]">
            Username
          </span>
        </div>
      </div>
      <div className='flex w-[500px] h-[109px] flex-col gap-[8px] items-start flex-nowrap relative z-[3] mt-[16px] mr-0 mb-0 ml-[21px]'>
        <span className="h-[22px] self-stretch shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[22px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[4]">
          Password
        </span>
        <div className='flex pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] relative overflow-hidden z-[5]'>
          <input className='w-[500px] h-[40px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[7]' />
          <span className="h-[16px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#b3b3b3] relative text-left whitespace-nowrap z-[6]">
            Password
          </span>
        </div>
      </div>
      <button className='flex w-[500px] pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[8px] justify-center items-center flex-nowrap bg-[#2c2c2c] rounded-[8px] border-solid border border-[#2c2c2c] relative overflow-hidden z-[1] pointer mt-px mr-0 mb-0 ml-[21px]'>
        <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#f5f5f5] relative text-left whitespace-nowrap z-[2]">
          Register
        </span>
      </button>
      <div className='flex w-[472px] items-start flex-nowrap relative z-[38] mt-[52px] mr-0 mb-0 ml-[37px]'>
        <span className="h-[22px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[22px] text-[#1e1e1e] relative text-left underline whitespace-nowrap z-[39]">
          Already have an account?
        </span>
      </div>
    </div>
  );
}