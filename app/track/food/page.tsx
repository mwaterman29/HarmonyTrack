"use client";

import { useState } from "react";

const TrackFood = () =>
{
    const [autoCalculateCals, setAutoCalculateCals] = useState(false);
    const [macros, setMacros] = useState({
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
    });


    return (
        <div className="text-white p-4">
            <p className="text-3xl">Track Eating and Calories</p>

            <div className="flex flex-row px-4">
            <input type="checkbox" checked={autoCalculateCals} onChange={() => setAutoCalculateCals(!autoCalculateCals)} />
            <p className="pl-4">Auto Calculate Calories</p>
            </div>


            <div className="flex flex-row p-4">
                <p className="pr-4 w-32 text-white text-lg">Calories: </p>
                <input className='text-black' type="number" placeholder="Calories" value={macros.calories} onChange={(e) => {
                setMacros({
                    ...macros,
                    calories: parseInt(e.target.value),
                })
            }}/>
            </div>
            <div className="flex flex-row p-4">
                <p className="pr-4 w-32 text-white text-lg">- Protein: </p>
                <input className='text-black' type="number" placeholder="Protein" value={macros.protein} onChange={(e) => {
                setMacros({
                    ...macros,
                    protein: parseInt(e.target.value),
                    calories: autoCalculateCals ? macros.carbs * 4 + parseInt(e.target.value) * 4 + macros.fat * 9 : macros.calories,
                })
            }}/>
            </div>
            <div className="flex flex-row p-4">
                <p className="pr-4 w-32 text-white text-lg">- Carbs: </p>
                <input className='text-black'  type="number" placeholder="Carbs" value={macros.carbs} onChange={(e) => {
                setMacros({
                    ...macros,
                    carbs: parseInt(e.target.value),
                    calories: autoCalculateCals ? parseInt(e.target.value) * 4 + macros.protein * 4 + macros.fat * 9 : macros.calories,
                })
            }}/>
            </div>
            <div className="flex flex-row p-4">
                <p className="pr-4 w-32 text-white text-lg">- Fat: </p>
                <input className='text-black'  type="number" placeholder="Fat" value={macros.fat} onChange={(e) => {
                setMacros({
                    ...macros,
                    fat: parseInt(e.target.value),
                    calories: autoCalculateCals ? macros.carbs * 4 + macros.protein * 4 + parseInt(e.target.value) * 9 : macros.calories,
                })
            }}/>
            </div>






        </div>
    )
}

export default TrackFood;