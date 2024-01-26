import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import Link from "next/link";
import Image from "next/image";

import DateTimeDisplay from "@/components/DateTimeDisplay";

import food from '@/public/food.svg';
import feelings from '@/public/feelings.svg';
import workout from '@/public/workout.svg';
import review from '@/public/review.svg';

//Static image data

const TrackDashboardPage = async () => {

    const session = await getServerSession(authOptions);

    if(!session || !session.user) 
    {
        return (
            <div>
                <h1>Not Logged In!</h1>
                <p>To track data, you have to sign in.</p>
                <Link
                    href='/api/auth/signin'
                >
                    Sign In
                </Link>
            </div>
        )
    }

    return (
    <div>
        <h1>Track Dashboard</h1>
        <DateTimeDisplay />
        <div className='grid grid-cols-2 p-4 gap-12 px-24'>
            <Link href={'/track/feelings'}
             className='flex flex-row border border-white rounded-md p-2 hover:border-[3px] hover:p-[6px]'>
                <div className="flex basis-1/4">
                    <Image
                        src={feelings}
                        alt="feelings"
                        className={'w-full h-full aspect-square display-cover'}
                        height={100}
                        width={100}
                    />
                </div>

                <div className="flex flex-col basis-3/4 pl-12 p-2">
                    <p className="text-xl">Track Feelings</p>
                    <p>Populate Today's Results Later</p>
                    <ul className="list-disc pl-6">
                        <li>Track Emotions and Moods</li>
                        <li>Pre-set feelings wheel or custom input</li>
                        <li>Add 0 - 100 score</li>
                    </ul>
                </div>
            </Link>
            <Link href={'/track/food'}
             className='flex flex-row border border-white rounded-md p-2 hover:border-[3px] hover:p-[6px]'>
                <div className="flex basis-1/4">
                    <Image
                        src={food}
                        alt="food"
                        className={'w-full h-full aspect-square display-cover'}
                        height={100}
                        width={100}
                    />
                </div>

                <div className="flex flex-col basis-3/4 pl-12 p-2">
                    <p className="text-xl pb-2">Track Eating</p>
                    <p>Populate Today's Results Later</p>
                    <ul className="list-disc pl-6">
                        <li>Track Calories</li>
                        <li>Track Macros</li>
                        <li>Set Goals and Requirements</li>
                    </ul>
                </div>
            </Link>
            <Link href={'/track/workouts'}
             className='flex flex-row border border-white rounded-md p-2 hover:border-[3px] hover:p-[6px]'>
                <div className="flex basis-1/4">
                    <Image
                        src={workout}
                        alt="workout"
                        className={'w-full h-full aspect-square display-cover'}
                        height={100}
                        width={100}
                    />
                </div>

                <div className="flex flex-col basis-3/4 pl-12 p-2">
                    <p className="text-xl pb-2">Track Workouts</p>
                    <p>Populate Today's Results Later</p>
                    <ul className="list-disc pl-6">
                        <li>Track Workouts</li>
                        <li>Record PRs</li>
                        <li>Add workout plan or split design</li>
                    </ul>
                </div>
            </Link>
            <Link href={'/review'}
             className='flex flex-row border border-white rounded-md p-2 hover:border-[3px] hover:p-[6px]'>
                <div className="flex basis-1/4">
                    <Image
                        src={review}
                        alt="review"
                        className={'w-full h-full aspect-square display-cover'}
                        height={100}
                        width={100}
                    />
                </div>

                <div className="flex flex-col basis-3/4 pl-12 p-2">
                    <p className="text-xl pb-2">Review</p>
                    <p>Populate Today's Results Later</p>
                    <ul className="list-disc pl-6">
                        <li>See feeling, eating, and workout data</li>
                        <li>Choose time range</li>
                        <li>Set and review goals</li>
                    </ul>
                </div>
            </Link>
        </div>
        <p>Settings</p>
    </div>
    );
}

export default TrackDashboardPage;