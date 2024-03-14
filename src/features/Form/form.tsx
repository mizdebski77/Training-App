import React, { useState } from 'react';
import validation from '../../common/svg/validation.svg';
import rangeInput from '../../common/svg/rangeInput.svg';

export const Form = () => {

    const [sliderValue, setSliderValue] = useState(8);

    const updateTextPosition = (event: React.FormEvent<HTMLInputElement>) => {
        const value = parseInt(event.currentTarget.value, 10);
        setSliderValue(value);
    };

    const textContainerStyle = {
        left: `calc(${(sliderValue / 100) * 100}% - 44px + ${(sliderValue / 100) * 18}px)`,
    };


    return (
        <div className='max-w-[426px] m-auto'>
            <h1 className='  text-2xl mb-6 text-[#000853] font-medium'>Personal Info</h1>

            <form className="grid gap-4  group" >
                <fieldset className='grid  gap-2 '>
                    <label className='text-[#000853]'>First Name</label>
                    <input className='p-2 rounded-md  w-full  border border-[#cbb6e5] focus:outline-[#761BE4]  active:bg-[#FAF9FA]' />
                </fieldset>

                <fieldset className='grid  gap-2'>
                    <label className='text-[#000853]'>Last Name</label>
                    <input className='p-2 rounded-md border required border-[#cbb6e5] focus:outline-[#761BE4]' />
                </fieldset>


                <fieldset className='grid gap-2'>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-[#FFFFFF] p-2 rounded-md border border-[#cbb6e5] focus:outline-[#761BE4]  active:bg-[#FAF9FA] appearance-none  text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-[#ED4545] invalid:[&:not(:placeholder-shown):not(:focus)]:border-2 invalid:[&:not(:placeholder-shown):not(:focus)]:bg-[#FEECEC] peer"
                        placeholder=" "
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    />

                    <span className="mt-2 hidden text-sm peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        <div className='flex gap-2 items-start'>
                            <img src={validation} alt='validation' className='mt-1 font-medium' />
                            <span>
                                Please use correct formatting.
                                <p>
                                    Example: address@email.com
                                </p>
                            </span>
                        </div>
                    </span>
                </fieldset>

                <fieldset>
                    <label
                        htmlFor="customRange1"
                        className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                    >
                        Age
                    </label>

                    <label className='flex justify-between'>
                        <span>8</span>
                        <span>100</span>
                    </label>
                    <div className="relative">
                        <input
                            type="range"
                            min={8}
                            max={100}
                            id="range"
                            // unit="number"
                            className="bg-[#CBB6E5] w-full focus:outline-none h-1.5 focus:ring-purple-600 accent-[#761BE4] cursor-pointer appearance rounded-lg "
                            value={sliderValue}
                            onChange={updateTextPosition}
                        />
                        <div style={textContainerStyle} className='relative flex items-center overflow-hidden'>
                            <img className='relative flex justify-center' src={rangeInput} />
                            {/* <svg className='relative flex justify-center	' width="37" height="31" viewBox="0 0 37 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="path-1-inside-1_1_1349" fill="white">
                                    <path fill-rule="evenodd" clipRule="evenodd" d="M22.3971 6L18.5 0L14.6029 6H4C1.79086 6 0 7.79086 0 10V27C0 29.2091 1.79086 31 4 31H33C35.2091 31 37 29.2091 37 27V10C37 7.79086 35.2091 6 33 6H22.3971Z" />
                                </mask>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M22.3971 6L18.5 0L14.6029 6H4C1.79086 6 0 7.79086 0 10V27C0 29.2091 1.79086 31 4 31H33C35.2091 31 37 29.2091 37 27V10C37 7.79086 35.2091 6 33 6H22.3971Z" fill="#FAF9FA" />
                                <path d="M18.5 0L19.3386 -0.544705L18.5 -1.83586L17.6614 -0.544705L18.5 0ZM22.3971 6L21.5585 6.5447L21.8542 7H22.3971V6ZM14.6029 6V7H15.1458L15.4415 6.5447L14.6029 6ZM17.6614 0.544705L21.5585 6.5447L23.2357 5.4553L19.3386 -0.544705L17.6614 0.544705ZM15.4415 6.5447L19.3386 0.544705L17.6614 -0.544705L13.7643 5.4553L15.4415 6.5447ZM4 7H14.6029V5H4V7ZM1 10C1 8.34315 2.34315 7 4 7V5C1.23858 5 -1 7.23858 -1 10H1ZM1 27V10H-1V27H1ZM4 30C2.34315 30 1 28.6569 1 27H-1C-1 29.7614 1.23858 32 4 32V30ZM33 30H4V32H33V30ZM36 27C36 28.6569 34.6569 30 33 30V32C35.7614 32 38 29.7614 38 27H36ZM36 10V27H38V10H36ZM33 7C34.6569 7 36 8.34315 36 10H38C38 7.23858 35.7614 5 33 5V7ZM22.3971 7H33V5H22.3971V7Z" fill="#CBB6E5" mask="url(#path-1-inside-1_1_1349)" />
                            </svg> */}
                            <span className={`absolute text-xs text-[#761BE4] 
                                ${sliderValue < 10 ? 'left-[14px]' :
                                    sliderValue <= 99 ? 'left-[10px]' :
                                        'left-[8px]'
                                } top-2.5`}>
                                {sliderValue}
                            </span>
                        </div>
                    </div>
                </fieldset>
            </form>

        </div>
    );
};

