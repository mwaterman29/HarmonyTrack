import UserControl from "./UserControl";


const Header = () => {
    return (
        <div className='w-full flex flex-row justify-between items-center px-4 p-2 bg-black'>
            <p className='flex h-full items-center text-2xl p-4'>Harmony Track</p>
            <UserControl />
        </div>
    )
}

export default Header;