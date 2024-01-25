"use client"

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const DateTimeDisplay = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
          setCurrentDateTime(new Date());
        }, 5 * 1000); // Update every minute
    
        return () => {
          clearInterval(timer);
        };
      }, []);

      return (
        <div className='p-4 items-center justify-center text-center'>
            <p className='text-4xl'>{format(currentDateTime, "EEEE, MMMM do - h:mm a")}</p>
            <div className='grid grid-cols-2 p-4 gap-4 px-24'>
                <div className='flex flex-row border-2 border-white rounded-md '>
                    <p>image here</p>
                    <p>Track Feelings and Mood</p>
                </div>
                <div className='flex flex-row '>
                    <p>image here</p>
                    <p>Track Feelings and Mood</p>
                </div>
                <div className='flex flex-row '>
                    <p>image here</p>
                    <p>Track Feelings and Mood</p>
                </div>
                <div className='flex flex-row '>
                    <p>image here</p>
                    <p>Track Feelings and Mood</p>
                </div>
            </div>
            <p>Settings</p>
        </div>
      )
}

export default DateTimeDisplay;