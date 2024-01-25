"use client"

import { TypeAnimation } from "react-type-animation"
import Link from "next/link"

const HomePage = () => {
    return (
        <div className="flex flex-col h-screen w-screen">
            <div className="w-full p-4 items-center justify-center text-center">
                <div className="py-24">
                    <TypeAnimation
                        sequence={[
                            "What did you feel today?",
                            1500,
                            "What did you do today?",
                            1500,
                            "What did you eat today?",
                            1500,
                        ]}
                        speed={30}
                        style={{ fontSize: '4em' }}
                        repeat={Infinity}
                    />
                </div>

                <p className="text-4xl p-4">Harmony Track</p>
                <p className="text-2xl p-4">A cross-platform life tracking solution</p>
                <Link
                    href='/track'
                    className="flex items-center justify-center text-2xl"
                >
                    <div className="p-4 px-12 border border-white rounded-md">
                        <p className="">Try It Now  {'>'}</p>       
                    </div>
                </Link>
            </div>
            <div className="grid grid-cols-3 p-4 gap-2">
                <div className="flex flex-col border-2 border-white rounded-md p-4">
                        <p>Feelings and Mood Tracking</p>
                        <p>Image Here</p>
                        <p>Details of features</p>
                </div>
                <div className="flex flex-col border-2 border-white rounded-md p-4">
                        <p>Eating and Calorie Tracking</p>
                        <p>Image Here</p>
                        <p>Details of features</p>
                </div>
                <div className="flex flex-col border-2 border-white rounded-md p-4">
                        <p>Workout and Activity tracking</p>
                        <p>Image Here</p>
                        <p>Details of features</p>
                </div>
            </div>

        </div>
    )
}


export default HomePage