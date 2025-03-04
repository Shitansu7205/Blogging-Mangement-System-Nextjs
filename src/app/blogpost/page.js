'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from "next/dynamic"; // ✅ Import dynamic


const TiptapEditor = dynamic(() => import("@/components/TiptapEditor"), {
    ssr: false, // ✅ Disables server-side rendering
});

const Blogpost = () => {
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("")
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null)

    const sendData = async (e) => {
        e.preventDefault() // Prevents the default form submission (page refresh)

        try {

            // Upload the image if one is selected
            let imageUrl = "";
            if (file) {
                try {
                    const formData = new FormData();
                    formData.append("file", file);

                    const uploadResponse = await fetch("/api/upload-feature-image", {
                        method: "POST",
                        body: formData,
                    });

                    if (!uploadResponse.ok) {
                        throw new Error("Image upload failed");
                    }

                    const uploadData = await uploadResponse.json();
                    imageUrl = uploadData.imageUrl;
                } catch (error) {
                    alert("Image upload failed, please try again.");
                    return; // Stop execution if image upload fails
                }
            }


            // Using axios to send a POST request with the title from state
            const response = await axios.post('/api/blogs', {
                Title_data: title,
                BlogContents: content,
                BlogCategory: category,
                FeatureImage: imageUrl
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




    // Function to handle file upload & preview
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));  // Create a temporary URL for preview
            setFile(event.target.files[0])
        }

    };

    return (
        // <form className="max-w-6xl mx-auto" onSubmit={sendData}>
        //     <div className="mb-5">
        //         <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        //             Title
        //         </label>
        //         <input
        //             type="text"
        //             value={title}
        //             onChange={(e) => setTitle(e.target.value)}
        //             id="title"
        //             className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //             placeholder="Enter blog title"
        //             required
        //         />
        //     </div>

        //     <TiptapEditor value={content} onChange={setContent} />


        //     <div>
        //         <button
        //             type="submit"
        //             className="block w-full p-2 text-white bg-blue-600 border border-blue-600 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-500 dark:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
        //         >
        //             Submit
        //         </button>
        //     </div>
        // </form>
        <>
            <form className="max-w-8xl mx-auto lg:px-16 bg-gray-100" onSubmit={sendData}>
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Left Section: Blog Editor */}
                    <div className="lg:w-2/3 w-full bg-white p-6 rounded-lg shadow-lg border">
                        <h2 className="text-xl font-semibold mb-3 text-gray-800">Write Your Blog</h2>
                        <TiptapEditor value={content} onChange={setContent} />
                    </div>

                    {/* Right Section: Blog Details */}
                    <div className="lg:w-1/3 w-full p-6 bg-white rounded-xl shadow-xl border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">Post Details</h2>

                        {/* Title */}
                        <div className="mb-5">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-2">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                id="title"
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                placeholder="Enter blog title"
                                required
                            />
                        </div>

                        {/* Feature Image Upload */}
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-600 mb-2">Feature Image</label>
                            <div className="relative flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    name="image"
                                    id="image"

                                    onChange={handleImageUpload}
                                />
                                {image ? (
                                    <img src={image} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                                ) : (
                                    <span className="text-gray-400 text-sm">Click to upload or drag & drop</span>
                                )}
                            </div>
                        </div>

                        {/* Author Name */}
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-600 mb-2">Author Name</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                placeholder="Enter Author Name"
                            />
                        </div>

                        {/* Category Selection */}
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-600 mb-2">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                                <option>Select Category</option>
                                <option>Technology</option>
                                <option>Lifestyle</option>
                                <option>Business</option>
                                <option>Health</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg font-semibold shadow-md hover:shadow-lg transition hover:scale-[1.02]"
                        >
                            Submit Post
                        </button>
                    </div>

                </div>
            </form>



        </>
    )
}

export default Blogpost
