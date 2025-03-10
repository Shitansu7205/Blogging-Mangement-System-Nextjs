'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify';
import Image from 'next/image';
import { Suspense } from 'react';
const GettingData = () => {
    const router = useRouter()
    const searchParams = useSearchParams();    //getting  the full parameters

    const getAuthore = searchParams.get('author');       //getting  the full parameters
    const [name, setName] = useState('')
    const [mail, setMail] = useState('')
    const [number, setNumber] = useState('91637XXXXX')
    const [image, setImage] = useState('https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png')
    // console.log(getAuthore)
    const fetchUserInfo = async () => {
        try {
            const responce = await fetch(`/api/authoreinfo?author=${getAuthore}`, {
                method: 'GET',
            })
            const data = await responce.json();
            if (responce.ok) {
                toast.success("Fetching the Users Info....")

                setName(data.name)
                setMail(data.mail)
                setImage(data.image)
                setNumber(data.number)
            }
        } catch (error) {
            toast.error("Unable to find User Info")
        }
    }




    useEffect(() => {
        if (getAuthore) {
            fetchUserInfo(); // Only call when the 'author' parameter is available
            // fetchusermob()
        }
    }, []); // Adding getAuthore to the dependency array to call when it changes



    // console.log("w;lefkjrhg", searchParams)
    return (


        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md mx-auto lg:my-16">
            {/* Profile Picture & Status */}
            <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                    <Image
                        width={100}
                        height={100}
                        src={image}
                        alt="User Profile"
                        className="w-24 h-24 rounded-full border-4 border-gray-200 shadow-md"
                    />
                    <span className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 border-2 border-white rounded-full"></span>
                </div>

                {/* User Info */}
                <div className="text-center">
                    <h3 className="text-2xl font-semibold text-gray-900">{name}</h3>
                    <p className="text-gray-500 text-sm">{mail}</p>
                </div>

                {/* Profile Details */}
                <div className="w-full space-y-4 text-gray-700">
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500 text-sm">Username</span>
                        <p className="font-medium">johndoe_123</p>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500 text-sm">Role</span>
                        <p className="font-medium">User</p>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500 text-sm">Location</span>
                        <p className="font-medium">New York, USA</p>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500 text-sm">Phone</span>
                        <p className="font-medium">{number}</p>
                    </div>


                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-4 mt-4">
                    <a href="#" className="text-gray-600 hover:text-blue-500 transition">
                        <i className="ri-facebook-circle-fill text-2xl"></i>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-400 transition">
                        <i className="ri-twitter-fill text-2xl"></i>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-red-500 transition">
                        <i className="ri-instagram-fill text-2xl"></i>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-800 transition">
                        <i className="ri-github-fill text-2xl"></i>
                    </a>
                </div>

                {/* Buttons */}
                <div className="flex w-full mt-6 space-x-3">
                    <button className="w-1/2 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all">
                        Read all My Blogs
                    </button>

                    <button onClick={() => router.push(`https://wa.me/${number}`)} className="w-1/2 py-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition-all flex justify-center"
                    >
                        Chat with me
                    </button>
                </div>

            </div>
        </div>

    )
}

const Authoreprofile = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GettingData />
        </Suspense>
    );
};

export default Authoreprofile;





