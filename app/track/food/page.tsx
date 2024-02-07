"use client";

import { use, useEffect, useState } from "react";
import { startOfDay, endOfDay } from "date-fns";
import prisma from "@/app/prisma";
import { useSession } from "next-auth/react";

type Food = {
    id: number;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    lastUsed: Date;
}

const TrackFood = () =>
{
    const [autoCalculateCals, setAutoCalculateCals] = useState(false);
    const [macros, setMacros] = useState({
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
    });

    const [addFoodMacros, setAddFoodMacros] = useState({
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
    });
    const [addFoodName, setAddFoodName] = useState('');

    const [existingFoods, setExistingFoods] = useState<Food[]>([]);
    const [todaysFoods, setTodaysFoods] = useState<Food[]>([]);

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

        //-Existing foods
        fetch(`/api/food`).then(async (response) => {
            const json = await response.json();
            setExistingFoods(json);
        });

        //-What was alr eaten today
        fetch(`/api/food/eat`).then(async (response) => {
            const json = await response.json();
            setTodaysFoods(json);
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
    
    function submitAddFood()
    {
        fetch('/api/food', {
            method: 'POST',
            body: JSON.stringify({
                date: new Date(),
                name: addFoodName,
                calories: addFoodMacros.calories,
                protein: addFoodMacros.protein,
                carbs: addFoodMacros.carbs,
                fat: addFoodMacros.fat,
            })
        }).then(async (response) => {
            const json = await response.json();
            console.log(json);
            todaysFoods.push(json);
        });
    }

    return (
        <div className="text-white p-4">
            <p className="text-3xl">Track Eating and Calories</p>

            <div className="grid grid-cols-3 gap-2">
                { /* Manual Entry for Food Tracking */}
                <div className="flex flex-col">
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

                { /* Create a new Food */}
                <div className="pl-4 bg-gray-700">
                    <p>Add New Food</p>
                    <div className="flex flex-col">
                        <div className="flex flex-row py-1">
                            <p className="pr-4">Food Name: </p>
                            <input type="text" className="text-black" value={addFoodName} onChange={(e) => {setAddFoodName(e.target.value)}} />
                            <p className="pr-4">Calories: </p>
                            <input type="number" className="text-black" min={0} value={addFoodMacros.calories} onChange={(e) => {
                            setAddFoodMacros({
                                ...addFoodMacros,
                                calories: parseInt(e.target.value),
                            })
                            }}/>
                        </div>
                        <div className="flex flex-col py-1">
                            <p className="pr-4">Protein: </p>
                            <input type="number" className="text-black" min={0} value={addFoodMacros.protein} onChange={(e) => {
                            setAddFoodMacros({
                                ...addFoodMacros,
                                protein: parseInt(e.target.value),
                                calories: autoCalculateCals ? addFoodMacros.carbs * 4 + parseInt(e.target.value) * 4 + addFoodMacros.fat * 9 : addFoodMacros.calories,
                            })
                            }}/>
                            <p className="pr-4">Carbs: </p>
                            <input type="number" className="text-black" min={0} value={addFoodMacros.carbs} onChange={(e) => {
                            setAddFoodMacros({
                                ...addFoodMacros,
                                carbs: parseInt(e.target.value),
                                calories: autoCalculateCals ? parseInt(e.target.value) * 4 + addFoodMacros.protein * 4 + addFoodMacros.fat * 9 : addFoodMacros.calories,
                            })
                            }}/>
                            <p className="pr-4">Fat: </p>
                            <input type="number" className="text-black" min={0} value={addFoodMacros.fat} onChange={(e) => {
                            setAddFoodMacros({
                                ...addFoodMacros,
                                fat: parseInt(e.target.value),
                                calories: autoCalculateCals ? addFoodMacros.carbs * 4 + addFoodMacros.protein * 4 + parseInt(e.target.value) * 9 : addFoodMacros.calories,
                            })
                            }}/>
                        </div>
                        <div className="flex items-center justify-center p-2">
                            <button className="bg-blue-700 py-3 items-center rounded-md px-24" onClick={submitAddFood}>Add</button>
                        </div>
                    </div>

                </div>
                
                { /* Record eaten foods today */}
                <div className="flex flex-col">
                    <p>Add From Existing Foods</p>
                    {existingFoods.length > 0 && 
                        <select className="text-black"
                        onChange={() => {

                        }}>
                                {existingFoods.map((food) => (
                                    <option key={food.id} value={food.name}>
                                        {food.name}
                                    </option>
                                ))}
                        </select>
                    }
                    {
                        todaysFoods.map((food) => (
                            <div key={food.id} className="flex flex-row">
                                <p>{food.name}</p>
                                <p>{food.calories}</p>
                            </div>
                        ))
                    }

                </div>

            </div>

        </div>
    )
}

export default TrackFood;