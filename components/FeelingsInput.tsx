"use client"

import React, { useState } from 'react';

const FeelingsInput = () => {
  const [feeling, setFeeling] = useState('');
  const [value, setValue] = useState(50);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/feelings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ feeling, value })
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <p>How are you feeling today?</p>
      <form onSubmit={handleSubmit} className=''>
        <input className='p-4 text-black' type="text" value={feeling} onChange={(e) => setFeeling(e.target.value)} placeholder="Happy" />
        <input className='p-4 text-black' type="number" min="0" max="100" value={value} onChange={(e) => setValue(Number(e.target.value))} placeholder="75" />
        <button className='p-4 bg-gray-500 rounded-md border-1' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FeelingsInput;