import React from 'react';
import { weekDay } from '../../../common/Arrays/arrays';

export const Calendar = () => {
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

