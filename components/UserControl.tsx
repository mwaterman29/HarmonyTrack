import { signIn, signOut, useSession } from 'next-auth/react'

const UserControl = () => {

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

export default UserControl