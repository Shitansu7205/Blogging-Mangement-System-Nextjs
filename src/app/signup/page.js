'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const sendData = async (e) => {
        e.preventDefault()

        try {
            const responce = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mail: email,
                    password: password
                })
            })


            if (responce.ok) {
                alert("User Created Sucessufully......")
                router.push('/login')
            }
            else {
                alert("User Exits...")
                router.push('/login')

            }


        } catch (error) {
            console.log("Creation Failed")
        }

    }

    return (
        <>
            <form className='bg-blue-700 flex flex-col items-center justify-center p-6 rounded-lg w-80 mx-auto mt-10 shadow-lg' onSubmit={sendData}>
                <input
                    type='email'
                    placeholder='Enter Email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className='w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <input
                    type='password'
                    placeholder='Enter Password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className='w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <input
                    type='submit'
                    value="Create Account"
                    className='bg-white text-blue-700 font-semibold px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200 transition'
                />
            </form>


        </>
    )
}

export default Signup
