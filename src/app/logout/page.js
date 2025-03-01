'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
const Logout = () => {
const router = useRouter()
    const logOut = async()=>{
        const responce = await fetch('/api/logout',{
            method:'GET'
        })
        if(responce.ok){
            alert('Logout Sucessfully')
            router.push('/login')
        }
    }
    return (
        <>
          <button type="button" onClick={logOut} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Log Out</button>
        </>
    )
}

export default Logout
