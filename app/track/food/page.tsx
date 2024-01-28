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
        <div className="text-black">
            <p>Track Eating and Calories</p>
            <input type="checkbox" checked={autoCalculateCals} onChange={() => setAutoCalculateCals(!autoCalculateCals)} />

            <input type="number" placeholder="Calories" value={macros.calories} onChange={(e) => {
                setMacros({
                    ...macros,
                    calories: parseInt(e.target.value),
                })
            }}/>
            <input type="number" placeholder="Protein" value={macros.protein} onChange={(e) => {
                setMacros({
                    ...macros,
                    protein: parseInt(e.target.value),
                    calories: autoCalculateCals ? macros.carbs * 4 + parseInt(e.target.value) * 4 + macros.fat * 7 : macros.calories,
                })
            }}/>
            <input type="number" placeholder="Carbs" value={macros.carbs} onChange={(e) => {
                setMacros({
                    ...macros,
                    carbs: parseInt(e.target.value),
                    calories: autoCalculateCals ? parseInt(e.target.value) * 4 + macros.protein * 4 + macros.fat * 7 : macros.calories,
                })
            }}/>
            <input type="number" placeholder="Fat" value={macros.fat} onChange={(e) => {
                setMacros({
                    ...macros,
                    fat: parseInt(e.target.value),
                    calories: autoCalculateCals ? macros.carbs * 4 + macros.protein * 4 + parseInt(e.target.value) * 7 : macros.calories,
                })
            }}/>

        </div>
    )
}

export default TrackFood;