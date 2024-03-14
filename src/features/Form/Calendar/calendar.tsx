import React, { useState } from 'react';
import { weekDay } from '../../../common/Arrays/arrays';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import next from '../../../common/svg/next.svg';
import prev from '../../../common/svg/prev.svg';

interface HolidayProps {
    country: string;
    date: string;
    day: string;
    iso: string;
    name: string;
    type: string;
    year: number
}

export const Calendar = () => {

    const currentDate = new Date();
    const [currentYear, setYear] = useState(currentDate.getFullYear());
    const [currentMonth, setMonth] = useState(currentDate.getMonth() + 1);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    const country = 'PL';
    const year = '2023';
    const apiKey = '8DX8eEe67njS1lbThFsdSw==rQQNpQ8PYbPZBjrx';

    const url = `https://api.api-ninjas.com/v1/holidays?country=${country}&year=${year}`;
    const { isLoading, error, data } = useQuery({
        queryKey: ['holidays'],
        queryFn: () => axios
            .get(url, {
                headers: {
                    'X-Api-Key': apiKey
                },
            })
    });

    const holidays = [
        { country: 'Poland', iso: 'PL', year: 2023, date: '2023-12-28', day: 'Tuesday' },
        { country: 'Poland', iso: 'PL', year: 2023, date: '2023-12-22', day: 'Friday' },
    ];


    const daysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonth - 1, 1).getDay();

    const changeMonth = (step: number) => {
        const newMonth = (currentMonth + step);
        const newYear = currentYear
        setMonth(newMonth);
        setYear(newYear);
        setSelectedDay(null);
    };

    const generateDays = () => {
        const totalDays = daysInMonth(currentYear, currentMonth);
        const days = [];

        for (let i = 1; i < firstDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="flex items-center justify-center  "></div>);
        }

        // Dni miesiąca
        for (let day = 1; day <= totalDays; day++) {
            const isToday = day === currentDate.getDate() && currentMonth === currentDate.getMonth() + 1 && currentYear === currentDate.getFullYear();
            const isSelected = selectedDay === day;
            // const isDisabled = holidays.some((holiday: HolidayProps[]) => holiday.date === `<span class="math-inline">\{currentYear\}\-</span>{String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`)

            days.push(
                <div
                    key={day}
                    className={`flex items-center justify-center w-8 h-8  cursor-pointer rounded-full } ${isSelected ? 'text-white bg-[#761BE4] ' : ''}''}`}
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
        setSelectedDay(day);
    };




    return (
        <div >
            {isLoading ? (
                <span className='text-2xl'>Downloading holiday data...</span>
            ) : error ? (
                <span className='text-2xl'>Oops! Something went wrong...</span>
            ) : (
                <div>
                    <span>
                        Date
                    </span>
                    <div className=" p-6 max-w-80 	bg-white border border-[#CBB6E5] rounded-lg">
                        <div className="flex justify-between	 ">
                            <button className="mr-2" onClick={() => changeMonth(-1)}>
                                <img src={prev} alt='prev' />
                            </button>

                            <h1 className="text font-medium text-[#000853] ">
                                {new Date(currentYear, currentMonth - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </h1>

                            <button className="ml-2" onClick={() => changeMonth(1)}>
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
                </div>
            )}
        </div>
    );

};

