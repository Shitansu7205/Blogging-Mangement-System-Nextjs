'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, Suspense } from 'react'
import { toast } from 'react-toastify'

const ModifyComponent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const getId = searchParams.get('id');
    const getTitle = searchParams.get('title');

    const [modifiedTitle, setModifiedTitle] = useState(getTitle || ""); // Handle null title

    const sendData = async (e) => {
        e.preventDefault();

        if (!getId || !modifiedTitle.trim()) {
            toast.error("Invalid blog ID or title.");
            return;
        }

        try {
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
        <form className="max-w-sm mx-auto" onSubmit={sendData}>
            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Title
                </label>
                <input
                    type="text"
                    value={modifiedTitle}
                    onChange={(e) => setModifiedTitle(e.target.value)}
                    id="title"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter blog title"
                    required
                />
            </div>
            <div>
                <button type="submit" className="block w-full p-2 text-white bg-blue-600 border border-blue-600 rounded-lg text-sm">
                    Submit
                </button>
            </div>
        </form>
    );
};

const Modify = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ModifyComponent />
        </Suspense>
    );
};

export default Modify;
