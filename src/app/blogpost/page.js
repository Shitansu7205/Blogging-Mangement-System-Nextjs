'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const Blogpost = () => {
    const router = useRouter()
    const [title, setTitle] = useState("")

    const sendData = async (e) => {
        e.preventDefault() // Prevents the default form submission (page refresh)

        try {
            // Using axios to send a POST request with the title from state
            const response = await axios.post('/api/blogs', {
                Title_data: title
            })
            // Check if the request was successful (status code 200 or 201)
            if (response.status === 200 || response.status === 201) {
                alert("Form submitted successfully!")
                router.push('/blogs') // Redirects to the blogs page
            } else {
                alert("Failed to submit form.")
            }
         } catch (error) {
            console.error("Error submitting form:", error)
            alert("An error occurred while submitting the form.")
        }

    }

    return (
        <form className="max-w-sm mx-auto" onSubmit={sendData}>
            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter blog title"
                    required
                />
            </div>
            <div>
                <button
                    type="submit"
                    className="block w-full p-2 text-white bg-blue-600 border border-blue-600 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-500 dark:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
                >
                    Submit
                </button>
            </div>
        </form>
    )
}

export default Blogpost
