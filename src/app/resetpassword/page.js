'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
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
                alert("Updates")
                router.push('/login')
            }
        }
        else {
            alert("Not ,ached")
        }

    }

    return (
        <>
            <form className="bg-gray-100 flex flex-col items-center justify-center p-6 rounded-lg w-80 mx-auto mt-10 shadow-lg" onSubmit={sendData}>
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
            </form>

        </>
    )
}

export default Resetpassword
