import React from 'react';
import { weekDay } from '../../../common/Arrays/arrays';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const Calendar = () => {

    const country = 'PL';
    const year = '2023';
    const apiKey = '8DX8eEe67njS1lbThFsdSw==rQQNpQ8PYbPZBjrx';

    const url = `https://api.api-ninjas.com/v1/holidays?country=${country}&year=${year}`;
    const { isLoading, error, data } = useQuery({
        queryKey: ['kaj'],
        queryFn: () => axios
            .get(url, {
                headers: {
                    'X-Api-Key': apiKey
                },
            })
    });
    return (
        <div className="grid grid-cols-7 gap-2 mt-4">
            {weekDay.map((day) => (
                <div
                    key={day}
                    className="col-span-1 flex items-center justify-center font-medium text-sm">{day}</div>
            ))}

        </div>
    );
};

