import React, { useState } from 'react';
import { weekDay } from '../../../common/Arrays/arrays';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import next from '../../../common/svg/next.svg';
import prev from '../../../common/svg/prev.svg';

export const Calendar = () => {

    const currentDate = new Date();
    const [currentYear, setYear] = useState(currentDate.getFullYear());
    const [currentMonth, setMonth] = useState(currentDate.getMonth() + 1);

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

    const holidays = data?.data;

    const daysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonth - 1, 1).getDay();






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
                            <button className="mr-2" >
                                <img src={prev} alt='prev' />
                            </button>

                            <h1 className="text font-medium text-[#000853] ">
                                {new Date(currentYear, currentMonth - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </h1>

                            <button className="ml-2">
                                <img src={next} alt='next' />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

};

