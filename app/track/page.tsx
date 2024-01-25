import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import Link from "next/link";

import DateTimeDisplay from "@/components/DateTimeDisplay";

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
    </div>
    );
}

export default TrackDashboardPage;