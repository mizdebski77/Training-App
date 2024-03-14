import React from 'react';

export const Form = () => {
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
                </fieldset>
            </form>

        </div>
    );
};

