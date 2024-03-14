import React, { useState } from 'react';
import { Hours, weekDay } from '../../../common/Arrays/arrays';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import next from '../../../common/svg/next.svg';
import prev from '../../../common/svg/prev.svg';
import { apiKey, url } from '../../../common/apiData';
import holidayName from '../../../common/svg/holidayName.svg';
interface HolidayProps {
    country: string;
    iso: string;
    year: number;
    date: string;
    day: string;
    name: string;
    type: string;
}

export const Calendar = ({ onDaySelect, onHourSelect }: { onDaySelect: (date: Date) => void; onHourSelect: (hour: string) => void; }) => {
    const [currentYear, setYear] = useState(2023);
    const [currentMonth, setMonth] = useState(1);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedHour, setSelectedHour] = useState('');


    const { isLoading, error, data } = useQuery({
        queryKey: ['holidays'],
        queryFn: () => axios.get(url, { headers: { 'X-Api-Key': apiKey } })
    });

    const holidays = data?.data

    const daysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonth - 1, 1).getDay() || 7;

    const changeMonth = (step: number) => {
        const newMonth = currentMonth + step;
        const newYear = currentYear;

        setMonth(newMonth);
        setYear(newYear);
        setSelectedDay(null);
        setSelectedHour('');
    };

    const generateDays = () => {
        const totalDays = daysInMonth(currentYear, currentMonth);
        const days = [];

        for (let i = 1; i < firstDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="flex items-center justify-center"></div>);
        }

        for (let day = 1; day <= totalDays; day++) {
            const isSelected = selectedDay === day;
            const dayOfWeek = new Date(currentYear, currentMonth - 1, day).getDay();
            const formattedDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isHoliday = holidays?.some(
                (holiday: HolidayProps) => holiday.date === formattedDate && holiday.type === "NATIONAL_HOLIDAY"
            );
            const isSunday = dayOfWeek === 0;
            const isDisabled = isSunday || isHoliday;

            days.push(
                <div
                    key={day}
                    className={`flex items-center justify-center w-8 h-8 cursor-pointer rounded-full text-[#000853] ${isSelected ? 'text-white bg-[#761BE4]' : ''} ${isDisabled ? 'text-[#898DA9] cursor-no-drop' : ''} `}
                    onClick={() => handleDayClick(day)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    const handleDayClick = (day: number) => {
        const selectedDate = new Date(currentYear, currentMonth - 1, day);
        const dayOfWeek = selectedDate.getDay();
        const formattedDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isHoliday = holidays?.some(
            (holiday: HolidayProps) => holiday.date === formattedDate && holiday.type === "NATIONAL_HOLIDAY"
        );
        const isDisabled = dayOfWeek === 0 || isHoliday;

        if (isDisabled) {
            return;
        }

        setSelectedDay(day);
        onDaySelect(selectedDate);
        setSelectedHour('');
    };

    const handleSelectHour = (hour: string) => {
        setSelectedHour(hour);
        onHourSelect(hour);
    };

    return (
        <div className='sm:flex justify-start w-full gap-6'>
            {isLoading ? (
                <span className='text-xl'>Downloading holiday data...</span>
            ) : error ? (
                <span className='text-xl'>Oops! Something went wrong...</span>
            ) : (
                <div>
                    <span>Date</span>
                    <div className=" p-6 max-w-80 	bg-white border border-[#CBB6E5] rounded-lg">
                        <div className="flex justify-between">
                            <button type='button' className="mr-2" onClick={() => changeMonth(-1)}>
                                <img src={prev} alt='prev' />
                            </button>

                            <h1 className="text font-medium text-[#000853] ">
                                {new Date(currentYear, currentMonth - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </h1>

                            <button type='button' className="ml-2" onClick={() => changeMonth(1)}>
                                <img src={next} alt='next' />
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-2 mt-4">
                            {weekDay.map((day) => (
                                <div
                                    key={day}
                                    className="col-span-1 flex items-center justify-center font-medium text-sm">
                                    {day}
                                </div>
                            ))}
                            {generateDays()}
                        </div>
                    </div>
                    {selectedDay && (
                        <div>
                            {holidays?.map(
                                (holiday: HolidayProps) =>
                                    holiday.date === `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}` && (
                                        <span key={holiday.date} className="text-[#000853] flex gap-2 mt-1">
                                            <img src={holidayName} alt='Holiday Name Icon' />
                                            It is {holiday.name}.
                                        </span>
                                    ))}
                        </div>
                    )}
                </div>
            )}
            <div>
                {selectedDay && (
                    <div>
                        <span>Time</span>
                        <div className='flex flex-wrap gap-2 sm:grid'>
                            {Hours.map((hour) => (
                                <div
                                    key={hour}
                                    className={`w-[76px] h-[46px] flex items-center justify-center bg-white rounded-lg border cursor-pointer ${selectedHour === hour ? ' border-2 border-[#761BE4]' : 'border-[#cbb6e5]'}
                                    }`}
                                    onClick={() => handleSelectHour(hour)}
                                >
                                    {hour}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};