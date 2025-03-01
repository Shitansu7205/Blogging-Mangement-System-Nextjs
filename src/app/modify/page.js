'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const Modify = () => {



    const searchParams = useSearchParams()
    const router = useRouter()

    const getId = searchParams.get('id')
    const getTitle = searchParams.get('title')

    const [modifiedtitle, setModifiedtitle] = useState(getTitle)





    const sendData = async (e) => {
        try {
            e.preventDefault();
       
            console.log(getId, getTitle)
            const response = await fetch(`/api/updateblog/${getId}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'Application/json'
                },
                body: JSON.stringify({ title: modifiedtitle })
            })
            if (response.ok) {
                alert("modified Done..!")
                router.push('/blogs')
            }
            else {
                alert("Not Modified..!")
            }
        } catch (error) {
            console.log("Somethings Went Wrongs...1")
        }

    }







    return (
        <>
          

            {/* <button onClick={sendData}>click me </button> */}

            <form className="max-w-sm mx-auto" onSubmit={sendData}>
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="text" value={modifiedtitle} onChange={(e) => setModifiedtitle(e.target.value)} id="title" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter blog title" required />
                </div>
                <div>
                    <button type="submit" className="block w-full p-2 text-white bg-blue-600 border border-blue-600 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-500 dark:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400">Submit</button>
                </div>
            </form>
        </>
    )
}

export default Modify
