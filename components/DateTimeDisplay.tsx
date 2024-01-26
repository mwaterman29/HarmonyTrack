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
        </div>
      )
}

export default DateTimeDisplay;