'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Modify = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const getId = searchParams.get('id');
    const getTitle = searchParams.get('title');

    const [modifiedTitle, setModifiedTitle] = useState(getTitle);

    const sendData = async (e) => {
        try {
            e.preventDefault();

            console.log("Updating blog:", getId, modifiedTitle);
            const response = await fetch(`/api/updateblog/${getId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: modifiedTitle })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Blog Modified Successfully!");
                router.push('/blogs'); // ✅ Redirect to blogs page
            } else {
                toast.error(data.message || "Unable to modify the blog");
            }
        } catch (error) {
            console.error("Error updating blog:", error);
            toast.error("Something went wrong.");
        }
    };


    return (
        <>


            {/* <button onClick={sendData}>click me </button> */}

            <form className="max-w-sm mx-auto" onSubmit={sendData}>
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="text" value={modifiedTitle} onChange={(e) => setModifiedTitle(e.target.value)} id="title" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter blog title" required />
                </div>
                <div>
                    <button type="submit" className="block w-full p-2 text-white bg-blue-600 border border-blue-600 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-500 dark:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400">Submit</button>
                </div>
            </form>
        </>
    )
}

export default Modify
