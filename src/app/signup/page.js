'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-toastify'
import Image from 'next/image'
const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [file, setFile] = useState(null);
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const sendData = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            // Upload the image if one is selected
            let imageUrl = "";
            if (file) {
                try {
                    const formData = new FormData();
                    formData.append("file", file);

                    const uploadResponse = await fetch("/api/upload", {
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

            // Register the user
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    mail: email,
                    password: password,
                    phone :phone,
                    profileImage: imageUrl
                })
            });

            // Get the JSON data from the response
            const data = await response.json();

            if (response.ok) {
                // Use toast.success to show a success message
                toast.success('User Created Successfully....');
                router.push('/login');
            } else {
                // If the API call wasn't ok, show a warning message
                toast.warn(data.message || "Registration failed.");
                // You might decide not to push to /login if registration failed.
            }
        } catch (error) {
            console.log("Creation Failed", error);
            toast.error("Creation Failed, please try again.");
        } finally {
            setLoading(false)
        }
    };


    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col-reverse lg:flex-row " >
                {/* Left Side - Form */}
                <div className="flex flex-col items-end justify-center px-6 py-8 w-full lg:w-1/2">
                    <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 sm:p-8">
                            <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <form className="space-y-4" onSubmit={sendData}>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        className="w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Shitansu kumar Gochhayat" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Your email
                                    </label>
                                    <input type="email"
                                        name="email"
                                        id="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
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
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Phone No
                                    </label>
                                    <input type="tel"
                                        name="phone"
                                        id="phone"
                                        maxLength='10'
                                        onChange={(e) => setPhone(e.target.value)}
                                        value={phone}
                                        className="w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Upload Image</label>
                                    <input type="file"
                                        name="image"
                                        id="image"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        className="w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />

                                </div>

                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" type="checkbox" className="w-4 h-4 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                                            I accept the{" "}
                                            <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                                Terms and Conditions
                                            </a>
                                        </label>
                                    </div>
                                </div>
                                <button
                                    disabled={loading}
                                    type="submit" className="w-full bg-blue-600 hover:bg-primary-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    {loading ? (
                                        <div className="flex justify-center items-center">
                                            <svg
                                                className="animate-spin h-5 w-5 mr-3"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="white"
                                            >
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M4 12a8 8 0 0116 0"
                                                />
                                            </svg>
                                            Creating your Account...
                                        </div>
                                    ) : (
                                        'Create Now'
                                    )}
                                </button>
                                <div className='flex flex-row justify-between items-center'>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account?{" "}
                                        <Link href="/login" className="font-medium text-blue-500 hover:underline dark:text-primary-500">
                                            Login here
                                        </Link>
                                    </p>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        <Link href="/resetpassword" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                            Forgot Password
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right Side - Image */}

                <div className="flex w-full lg:w-1/2 items-center justify-center p-4">
                    <Image
                        // src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg"
                        src='/images/login.svg'
                        alt="Signup Illustration"
                        width={500}
                        height={300}
                        className="w-3/4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-7xl h-auto object-contain"
                    />
                </div>

            </section>








        </>
    )
}

export default Signup
