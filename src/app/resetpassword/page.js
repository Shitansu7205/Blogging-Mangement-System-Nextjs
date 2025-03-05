'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-toastify'
import Image from 'next/image'
const Resetpassword = () => {

    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmpassword] = useState('')
    const router = useRouter()


    const sendData = async (e) => {
        e.preventDefault()
        if (password === confirmpassword) {

            //    hit the api
            const responce = await fetch('/api/resetpassword', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    mail: mail,
                    password: password,
                    cpassword: confirmpassword
                })
            })

            if (responce.ok) {
                toast.success("Password reset Sucessuful.....")
                router.push('/login')
            }
            else {
                toast.error("User Not Found")
                router.push('/signup')
            }

        }
        else {
            toast.warn("Password not mached")
        }

    }

    return (
        <>
            {/* <form className="bg-gray-100 flex flex-col items-center justify-center p-6 rounded-lg w-80 mx-auto mt-10 shadow-lg" onSubmit={sendData}>
                <h2 className="text-lg font-semibold mb-4">Reset Password</h2>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    required
                    className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    placeholder="Enter New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmpassword}
                    onChange={(e) => setConfirmpassword(e.target.value)}
                    required
                    className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition"
                >
                    Reset Password
                </button>
            </form> */}



            <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col-reverse lg:flex-row" >
                {/* Left Side - Form */}
                <div className="flex flex-col items-end justify-center  py-8 w-full lg:w-1/2">
                    <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 sm:p-8">
                            <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
                                Reset password

                            </h1>
                            <form className="space-y-4" onSubmit={sendData}>


                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Email address
                                    </label>
                                    <input type="email"
                                        name="email"
                                        id="email"
                                        onChange={(e) => setMail(e.target.value)}
                                        value={mail}
                                        className="w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Password
                                    </label>
                                    <input type="password"
                                        name="password"
                                        id="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        className="w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="••••••••" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Confirm Password
                                    </label>
                                    <input type="password"
                                        name="password"
                                        id="cpassword"
                                        value={confirmpassword}
                                        onChange={(e) => setConfirmpassword(e.target.value)}
                                        className="w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="••••••••" required />
                                </div>

                                <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                    </svg>

                                    <span>Reset password</span>
                                </button>
                                <div className='flex flex-row justify-between items-center'>
                                    <p className="text-center">Not registered yet? <Link href='/signup' className="text-indigo-600 font-medium inline-flex space-x-1 items-center"><span>Register now </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg></span></Link></p>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>

                {/* Right Side - Image */}

                <div className="flex w-full lg:w-1/2 items-center justify-center p-4">
                    <Image
                        src="https://cdni.iconscout.com/illustration/premium/thumb/forget-pin-illustration-download-in-svg-png-gif-file-formats--forgot-security-password-access-lock-pack-crime-illustrations-3805761.png?f=webp"
                        alt="Reset Password Image"
                        width={500}
                        height={500}
                        className="w-3/4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-7xl h-auto object-contain"
                    />
                </div>

            </section>


        </>
    )
}

export default Resetpassword
