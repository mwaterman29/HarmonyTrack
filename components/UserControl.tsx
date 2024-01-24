import { signIn, signOut, useSession } from 'next-auth/react'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

const UserControl = async () => {

    const session = await getServerSession(authOptions);

    if(session?.user) {
        return (
            <div>
                Hello {session.user.name}
            </div>
        )
    }
    else
    {
        return (
            <div>
                <button onClick={() => {
                    signIn();
                }}>
                    Sign In
                </button>
            </div>
        )
    }

}

export default UserControl