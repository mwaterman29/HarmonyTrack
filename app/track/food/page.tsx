"use client";

import { use, useEffect, useState } from "react";
import { startOfDay, endOfDay } from "date-fns";
import prisma from "@/app/prisma";
import { useSession } from "next-auth/react";

const TrackFood = () =>
{
    const [autoCalculateCals, setAutoCalculateCals] = useState(false);
    const [macros, setMacros] = useState({
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
    });

    const { data: session, status } = useSession()

    useEffect(() => {
        if(status !== "authenticated")
            return;

        //Fetch:

        //-Any previous macro entry for the day
        fetch(`/api/food/macros?date=${new Date()}`).then(async (response) => {
            const json = await response.json();
            if(json && json.length > 0)
            {
                setMacros({
                    calories: json[0].calories,
                    protein: json[0].protein,
                    carbs: json[0].carbs,
                    fat: json[0].fat,
                });
            }
        });

    }, [status]);

    function submitMacros()
    {
        fetch('/api/food/macros', {
            method: 'POST',
            body: JSON.stringify({
                date: new Date(),
                calories: macros.calories,
                protein: macros.protein,
                carbs: macros.carbs,
                fat: macros.fat,
            })
        }).then(async (response) => {
            const json = await response.json();
            console.log(json);
        });
    }

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