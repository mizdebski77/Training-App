import React, { useEffect, useState } from 'react';
import validation from '../../common/svg/validation.svg';
import rangeInput from '../../common/svg/rangeInput.svg';
import { Calendar } from './Calendar/calendar';
import axios from 'axios';

export const Form = () => {

    const [sliderValue, setSliderValue] = useState(8);
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState('');
    const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<string | null>(null);
    const [selectedHourOfDay, setSelectedHourOfDay] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {

        setIsFormValid(
            name.trim() !== '' &&
            lastName.trim() !== '' &&
            email.trim() !== '' &&
            selectedDayOfWeek !== null &&
            selectedHourOfDay !== null
        );
    }, [name, lastName, email, selectedDayOfWeek, selectedHourOfDay]);


    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Last Name', lastName);
    formData.append('E-Mail', email);
    formData.append('Age', sliderValue.toString());
    if (file) {
        formData.append('File', file);
    }
    formData.append('Day', selectedDayOfWeek || '');
    formData.append('Hour', selectedHourOfDay || '');

    const updateTextPosition = (event: React.FormEvent<HTMLInputElement>) => {
        const value = parseInt(event.currentTarget.value, 10);
        setSliderValue(value);
    };

    const textContainerStyle = {
        left: `calc(${(sliderValue / 100) * 100}% - ${window.innerWidth <= 500 ? '36px' : '44px'} + ${(sliderValue / 100) * (window.innerWidth <= 500 ? 10 : 18)}px)`,
    };


    const handleFileChange = (event: React.FormEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        if (file) {
            const validImageTypes = ['image/jpeg', 'image/png', 'image/JPG', 'image/PNG'];

            if (validImageTypes.includes(file.type)) {
                setFile(file);
                setFileName(file.name);
            } else {
                alert('Please upload a JPG or PNG file.');
            }
        }
    };

    const handleFileRemove = () => {
        setFile(null);
        setFileName('');
    };

    const handleDaySelect = (date: Date) => {
        setSelectedDayOfWeek(date.toDateString());
    };

    const handleHourSelect = (hour: string) => {
        setSelectedHourOfDay(hour);
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await axios.post('http://letsworkout.pl/submit', formData);
            console.log('Form submitted successfully');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const resetTimeValues = () => {
        setSelectedDayOfWeek(null);
        setSelectedHourOfDay(null);
    };

    const isSmallScreen = window.innerWidth <= 768;


    return (
        <div className='max-w-[426px] m-auto'>
            <h1 className=' text-2xl mb-6 text-[#000853] font-medium'>Personal Info</h1>

            <form className="grid gap-6  group" encType="multipart/form-data" onSubmit={handleSubmit}>
                <fieldset className='grid  gap-2 '>
                    <label className='text-[#000853]'>First Name</label>
                    <input
                        type='name'
                        value={name}
                        required
                        onChange={({ target }) => setName(target.value)}
                        className='p-2 rounded-lg h-12  w-full  border border-[#cbb6e5] focus:outline-[#761BE4]  active:bg-[#FAF9FA]' />
                </fieldset>

                <fieldset className='grid  gap-2'>
                    <label className='text-[#000853]'>Last Name</label>
                    <input
                        type='name'
                        required
                        value={lastName}
                        onChange={({ target }) => setLastName(target.value)}
                        className='p-2 rounded-lg h-12 border required border-[#cbb6e5] focus:outline-[#761BE4]' />
                </fieldset>


                <fieldset className='grid gap-2'>
                    <label className='text-[#000853]'>Email</label>
                    <input
                        type="email"
                        className="bg-[#FFFFFF] p-2 h-12 rounded-lg border border-[#cbb6e5] focus:outline-[#761BE4]  active:bg-[#FAF9FA] appearance-none  text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-[#ED4545] invalid:[&:not(:placeholder-shown):not(:focus)]:border-2 invalid:[&:not(:placeholder-shown):not(:focus)]:bg-[#FEECEC] peer"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        required
                        placeholder=" "
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    />

                    <span className=" text-[#000853] hidden text-sm peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
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
                        className="mb-1 inline-block text-[#000853] dark:text-neutral-200">
                        Age
                    </label>

                    <label className='flex justify-between text-xs px-1'>
                        <span>8</span>
                        <span>100</span>
                    </label>
                    <div className="relative">
                        <input
                            type="range"
                            min={8}
                            max={100}
                            id="range"
                            className="bg-[#CBB6E5] w-full focus:outline-none h-1.5 focus:ring-purple-600 accent-[#761BE4] cursor-pointer appearance rounded-lg "
                            value={sliderValue}
                            onChange={updateTextPosition}
                        />
                        <div style={textContainerStyle} className='relative flex items-center max-w-12 '>
                            <img className='relative flex justify-center' alt='range input' src={rangeInput} />
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

                <fieldset className='grid  gap-2'>
                    <label className='text-[#000853]'>Photo</label>
                    <div>
                        <label
                            htmlFor="formFileLg"
                            className="cursor-pointer bg-white w-full h-24 flex justify-center items-center border rounded-lg border-[#cbb6e5]"
                        >
                            <p className="text-base text-[#898DA9] dark:text-gray-400 ">
                                <span className={`${fileName ? 'text-[#000853]  font-medium mr-2' : 'text-[#761BE4] underline underline-offset-4 font-regular mr-2'}`}>
                                    {fileName ? fileName : (isSmallScreen ? 'Upload file' : 'Upload a file')}
                                </span>
                                {fileName ? '' : (isSmallScreen ? '' : '  or drag and drop here')}
                            </p>
                            {fileName && (
                                <button
                                    className="bg-[#000853] ml-2 text-white flex justify-center items-center duration-300  rounded-full w-6 h-6 text-xs hover:bg-[#ED4545] "
                                    onClick={handleFileRemove}
                                >
                                    ✖
                                </button>
                            )}
                            <input
                                onChange={handleFileChange}
                                required
                                className="hidden relative m-0 w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal leading-[2.15] text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
                                id="formFileLg"
                                type="file"
                            />
                        </label>

                    </div>
                </fieldset>

                <h2 className='text-[24px] font-medium text-[#000853]'>Your Workout</h2>
                <Calendar onDaySelect={handleDaySelect} onHourSelect={handleHourSelect} resetTimeValues={resetTimeValues} />
                <button
                    type="submit"
                    className={`hover:bg-[#6A19CD] duration-300 rounded-md bg-[#761BE4] py-2.5 px-8 text-[18px] text-white group-invalid:pointer-events-none group-invalid:bg-[#CBB6E5] mt-6 ${!isFormValid ? ' bg-[#CBB6E5] hover:bg-[#CBB6E5]' : ''}`}
                    disabled={!isFormValid}
                >
                    Send Application
                </button>
            </form >

        </div >
    );
};

