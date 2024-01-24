"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'

const UserControl = () => {

    //const session = await getServerSession(authOptions);
    const { data: session, status } = useSession(); 

    if(status == 'loading')
    {
        return (
            <div className='min-w-24 border-2 p-3 px-12 border-white'>
                 
            </div>
        )
    }
    else if(!session || !session.user || session == undefined || session.user == undefined)
    {
        return (
            <div>
                <button className='border p-2 px-8 border-white' onClick={() => {signIn()}}>
                    Sign In
                </button>
            </div>
        )
    }
    else {
        return (
            <div>
                 <Menu>
                    {({ open }) => (
                        <>
                            <Menu.Button className='flex h-full items-center justify-center transition duration-150 ease-in-out'>
                                    <div className='flex flex-row px-1 border-2 hover:text-gray-500 active:bg-gray-50 active:text-gray-800'>
                                        <p className='flex items-center px-3'>
                                            {
                                                session?.user?.name
                                            }
                                        </p>
                                    </div>
                            </Menu.Button>

                            <Transition
                                show={open}
                            >
                                <Menu.Items
                                    static
                                    className='absolute right-4 top-16 w-56 origin-top-right bg-black dark:bg-vrtex-dark-gray border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none'
                                >
                                    <div className='px-4 py-3'>
                                        <p className='text-sm leading-5'>
                                            Hi {session.user?.name}!
                                        </p>
                                    </div>

                                    <div className=''>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href='/user/settings'
                                                    className={`${
                                                        active
                                                            ? 'bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white'
                                                            : 'text-gray-700 dark:text-white'
                                                    } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                                >
                                                    Account settings
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </div>

                                    <div className=''>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href='/api/auth/signout'
                                                    className={`${
                                                        active
                                                            ? 'bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white'
                                                            : 'text-gray-700 dark:text-white'
                                                    } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                                    onClick={e => {
                                                        e.preventDefault()
                                                        signOut()
                                                    }}
                                                >
                                                    Sign out
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </>
                    )}
                </Menu>
            </div>
        )
    }


}

export default UserControl