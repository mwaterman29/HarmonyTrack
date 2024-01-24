"use client" 

import React from 'react';

const FeelingsEmoji: React.FC = () => {
    const emotions = [
        { name: 'Great!', emoji: '😄', value: 90 },
        { name: 'Good', emoji: '😀', value: 70 },
        { name: 'Average', emoji: '😐', value: 50  },
        { name: 'Sad', emoji: '🙁', value: 30  },
        { name: 'Terrible', emoji: '😥', value: 10  },
    ];

    const handleSubmit = async (event: React.FormEvent, emotion: {name: string, emoji: string, value: number}) => {
        event.preventDefault();

        const response = await fetch('/api/feelings', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ feeling: emotion.name, value: emotion.value })
        });

        const data = await response.json();
        console.log(data);
    };

    return (
        <div>
            {emotions.map((emotion) => (
                <button key={emotion.name} onClick={(e) => handleSubmit(e, emotion)}>
                    {emotion.emoji}
                </button>
            ))}
        </div>
    );
};

export default FeelingsEmoji;
