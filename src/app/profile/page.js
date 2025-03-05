"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Profile = () => {
    const [email, setEmail] = useState(""); // State to store user email
    const [name , setName] = useState('User name')
    const [image, setImage] = useState("https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png")

    const router = useRouter()
    const fetchCurrentUser = async () => {
        try {
            const response = await fetch("/api/currentuser", {
                method: "GET",
                credentials: "include", // Ensures cookies (JWT token) are sent
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user");
            }

            const data = await response.json();
         
            setName(data.sendingUsername); // Set user email in state
            setImage(data.sendimageurl)

        } catch (err) {
            toast.error("Permission Denied..")
            router.push('/login')
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <div>
      
            <main>
            {/* navbar */}
            <div className="py-2 px-6 bg-[#f8f4f3] flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
                <button
                    type="button"
                    className="text-lg text-gray-900 font-semibold sidebar-toggle"
                >
                    <i className="ri-menu-line" />
                </button>
                <ul className="ml-auto flex items-center">
                    <li className="mr-1 dropdown">
                        <button
                            type="button"
                            className="dropdown-toggle text-gray-400 mr-4 w-8 h-8 rounded flex items-center justify-center  hover:text-gray-600"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                className="hover:bg-gray-100 rounded-full"
                                viewBox="0 0 24 24"
                                style={{ fill: "gray", transform: "", msfilter: "" }}
                            >
                                <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z" />
                            </svg>
                        </button>
                        <div className="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-xs w-full bg-white rounded-md border border-gray-100">
                            <form action="" className="p-4 border-b border-b-gray-100">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        className="py-2 pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500"
                                        placeholder="Search..."
                                    />
                                    <i className="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-gray-900" />
                                </div>
                            </form>
                        </div>
                    </li>
                    <li className="dropdown">
                        <button
                            type="button"
                            className="dropdown-toggle text-gray-400 mr-4 w-8 h-8 rounded flex items-center justify-center  hover:text-gray-600"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                className="hover:bg-gray-100 rounded-full"
                                viewBox="0 0 24 24"
                                style={{ fill: "gray", transform: "", msfilter: "" }}
                            >
                                <path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z" />
                            </svg>
                        </button>
                        <div className="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-xs w-full bg-white rounded-md border border-gray-100">
                            <div className="flex items-center px-4 pt-4 border-b border-b-gray-100 notification-tab">
                                <button
                                    type="button"
                                    data-tab="notification"
                                    data-tab-page="notifications"
                                    className="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1 active"
                                >
                                    Notifications
                                </button>
                                <button
                                    type="button"
                                    data-tab="notification"
                                    data-tab-page="messages"
                                    className="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1"
                                >
                                    Messages
                                </button>
                            </div>
                            <div className="my-2">
                                <ul
                                    className="max-h-64 overflow-y-auto"
                                    data-tab-for="notification"
                                    data-page="notifications"
                                >
                                    <li>
                                        <a
                                            href="#"
                                            className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                                        >
                                            <img
                                                src="https://placehold.co/32x32"
                                                alt=""
                                                className="w-8 h-8 rounded block object-cover align-middle"
                                            />
                                            <div className="ml-2">
                                                <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                    New order
                                                </div>
                                                <div className="text-[11px] text-gray-400">
                                                    from a user
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                                        >
                                            <img
                                                src="https://placehold.co/32x32"
                                                alt=""
                                                className="w-8 h-8 rounded block object-cover align-middle"
                                            />
                                            <div className="ml-2">
                                                <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                    New order
                                                </div>
                                                <div className="text-[11px] text-gray-400">
                                                    from a user
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                                        >
                                            <img
                                                src="https://placehold.co/32x32"
                                                alt=""
                                                className="w-8 h-8 rounded block object-cover align-middle"
                                            />
                                            <div className="ml-2">
                                                <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                    New order
                                                </div>
                                                <div className="text-[11px] text-gray-400">
                                                    from a user
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                                        >
                                            <img
                                                src="https://placehold.co/32x32"
                                                alt=""
                                                className="w-8 h-8 rounded block object-cover align-middle"
                                            />
                                            <div className="ml-2">
                                                <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                    New order
                                                </div>
                                                <div className="text-[11px] text-gray-400">
                                                    from a user
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                                        >
                                            <img
                                                src="https://placehold.co/32x32"
                                                alt=""
                                                className="w-8 h-8 rounded block object-cover align-middle"
                                            />
                                            <div className="ml-2">
                                                <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                    New order
                                                </div>
                                                <div className="text-[11px] text-gray-400">
                                                    from a user
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <ul
                                    className="max-h-64 overflow-y-auto hidden"
                                    data-tab-for="notification"
                                    data-page="messages"
                                >
                                    <li>
                                        <a
                                            href="#"
                                            className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                                        >
                                            <img
                                                src="https://placehold.co/32x32"
                                                alt=""
                                                className="w-8 h-8 rounded block object-cover align-middle"
                                            />
                                            <div className="ml-2">
                                                <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                    John Doe
                                                </div>
                                                <div className="text-[11px] text-gray-400">
                                                    Hello there!
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                                        >
                                            <img
                                                src="https://placehold.co/32x32"
                                                alt=""
                                                className="w-8 h-8 rounded block object-cover align-middle"
                                            />
                                            <div className="ml-2">
                                                <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                    John Doe
                                                </div>
                                                <div className="text-[11px] text-gray-400">
                                                    Hello there!
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                                        >
                                            <img
                                                src="https://placehold.co/32x32"
                                                alt=""
                                                className="w-8 h-8 rounded block object-cover align-middle"
                                            />
                                            <div className="ml-2">
                                                <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                    John Doe
                                                </div>
                                                <div className="text-[11px] text-gray-400">
                                                    Hello there!
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                                        >
                                            <img
                                                src="https://placehold.co/32x32"
                                                alt=""
                                                className="w-8 h-8 rounded block object-cover align-middle"
                                            />
                                            <div className="ml-2">
                                                <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                    John Doe
                                                </div>
                                                <div className="text-[11px] text-gray-400">
                                                    Hello there!
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="py-2 px-4 flex items-center hover:bg-gray-50 group"
                                        >
                                            <img
                                                src="https://placehold.co/32x32"
                                                alt=""
                                                className="w-8 h-8 rounded block object-cover align-middle"
                                            />
                                            <div className="ml-2">
                                                <div className="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                    John Doe
                                                </div>
                                                <div className="text-[11px] text-gray-400">
                                                    Hello there!
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <button id="fullscreen-button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            className="hover:bg-gray-100 rounded-full"
                            viewBox="0 0 24 24"
                            style={{ fill: "gray", transform: "", msfilter: "" }}
                        >
                            <path d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z" />
                        </svg>
                    </button>
                    <li className="dropdown ml-3">
                        <button type="button" className="dropdown-toggle flex items-center">
                            <div className="flex-shrink-0 w-10 h-10 relative">
                                <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
                                    <Image
                                        className="w-8 h-8 rounded-full"
                                        src={image}
                                        width={30}
                                        height={30}
                                        alt="Profile image"
                                    />
                                    <div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping" />
                                    <div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full" />
                                </div>
                            </div>
                            <div className="p-2 md:block text-left">
                                <h2 className="text-sm font-semibold text-gray-800">{name}</h2>
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                        </button>
                        <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50"
                                >
                                    Profile
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50"
                                >
                                    Settings
                                </a>
                            </li>
                            <li>
                                <form method="POST" action="">
                                    <a
                                        role="menuitem"
                                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50 cursor-pointer"

                                    >
                                        Log Out
                                    </a>
                                </form>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            {/* end navbar */}

            {/* Content */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                        <div className="flex justify-between mb-6">
                            <div>
                                <div className="flex items-center mb-1">
                                    <div className="text-2xl font-semibold">2</div>
                                </div>
                                <div className="text-sm font-medium text-gray-400">Users</div>
                            </div>
                            <div className="dropdown">
                                <button
                                    type="button"
                                    className="dropdown-toggle text-gray-400 hover:text-gray-600"
                                >
                                    <i className="ri-more-fill" />
                                </button>
                                <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                        >
                                            Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                        >
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                        >
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <a
                            href="/gebruikers"
                            className="text-[#f84525] font-medium text-sm hover:text-red-800"
                        >
                            View
                        </a>
                    </div>
                    <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                        <div className="flex justify-between mb-4">
                            <div>
                                <div className="flex items-center mb-1">
                                    <div className="text-2xl font-semibold">100</div>
                                    <div className="p-1 rounded bg-emerald-500/10 text-emerald-500 text-[12px] font-semibold leading-none ml-2">
                                        +30%
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-gray-400">Companies</div>
                            </div>
                            <div className="dropdown">
                                <button
                                    type="button"
                                    className="dropdown-toggle text-gray-400 hover:text-gray-600"
                                >
                                    <i className="ri-more-fill" />
                                </button>
                                <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                        >
                                            Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                        >
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                        >
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <a
                            href="/dierenartsen"
                            className="text-[#f84525] font-medium text-sm hover:text-red-800"
                        >
                            View
                        </a>
                    </div>
                    <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                        <div className="flex justify-between mb-6">
                            <div>
                                <div className="text-2xl font-semibold mb-1">100</div>
                                <div className="text-sm font-medium text-gray-400">Blogs</div>
                            </div>
                            <div className="dropdown">
                                <button
                                    type="button"
                                    className="dropdown-toggle text-gray-400 hover:text-gray-600"
                                >
                                    <i className="ri-more-fill" />
                                </button>
                                <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                        >
                                            Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                        >
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                        >
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <a
                            href=""
                            className="text-[#f84525] font-medium text-sm hover:text-red-800"
                        >
                            View
                        </a>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="p-6 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
                        <div className="rounded-t mb-0 px-0 border-0">
                            <div className="flex flex-wrap items-center px-4 py-2">
                                <div className="relative w-full max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">
                                        Users
                                    </h3>
                                </div>
                            </div>
                            <div className="block w-full overflow-x-auto">
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Role
                                            </th>
                                            <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Amount
                                            </th>
                                            <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="text-gray-700 dark:text-gray-100">
                                            <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                Administrator
                                            </th>
                                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                1
                                            </td>
                                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <div className="flex items-center">
                                                    <span className="mr-2">70%</span>
                                                    <div className="relative w-full">
                                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                                                            <div
                                                                style={{ width: "70%" }}
                                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="text-gray-700 dark:text-gray-100">
                                            <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                User
                                            </th>
                                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                6
                                            </td>
                                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <div className="flex items-center">
                                                    <span className="mr-2">40%</span>
                                                    <div className="relative w-full">
                                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                                                            <div
                                                                style={{ width: "40%" }}
                                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="text-gray-700 dark:text-gray-100">
                                            <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                User
                                            </th>
                                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                5
                                            </td>
                                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <div className="flex items-center">
                                                    <span className="mr-2">45%</span>
                                                    <div className="relative w-full">
                                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-pink-200">
                                                            <div
                                                                style={{ width: "45%" }}
                                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="text-gray-700 dark:text-gray-100">
                                            <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                User
                                            </th>
                                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                4
                                            </td>
                                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <div className="flex items-center">
                                                    <span className="mr-2">60%</span>
                                                    <div className="relative w-full">
                                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                                                            <div
                                                                style={{ width: "60%" }}
                                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                        <div className="flex justify-between mb-4 items-start">
                            <div className="font-medium">Activities</div>
                            <div className="dropdown">
                                <button
                                    type="button"
                                    className="dropdown-toggle text-gray-400 hover:text-gray-600"
                                >
                                    <i className="ri-more-fill" />
                                </button>
                                <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                        >
                                            Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                        >
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                        >
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="overflow-hidden">
                            <table className="w-full min-w-[540px]">
                                <tbody>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <a
                                                    href="#"
                                                    className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                                                >
                                                    Lorem Ipsum
                                                </a>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-gray-400">
                                                02-02-2024
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-gray-400">
                                                17.45
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    className="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"
                                                >
                                                    <i className="ri-more-2-fill" />
                                                </button>
                                                <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                                        >
                                                            Profile
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                                        >
                                                            Settings
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                                        >
                                                            Logout
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <a
                                                    href="#"
                                                    className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                                                >
                                                    Lorem Ipsum
                                                </a>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-gray-400">
                                                02-02-2024
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-gray-400">
                                                17.45
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    className="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"
                                                >
                                                    <i className="ri-more-2-fill" />
                                                </button>
                                                <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                                        >
                                                            Profile
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                                        >
                                                            Settings
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                                        >
                                                            Logout
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
                        <div className="flex justify-between mb-4 items-start">
                            <div className="font-medium">Order Statistics</div>
                            <div className="dropdown">
                                <button
                                    type="button"
                                    className="dropdown-toggle text-gray-400 hover:text-gray-600"
                                >
                                    <i className="ri-more-fill" />
                                </button>
                                <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                        >
                                            Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                        >
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                        >
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            <div className="rounded-md border border-dashed border-gray-200 p-4">
                                <div className="flex items-center mb-0.5">
                                    <div className="text-xl font-semibold">10</div>
                                    <span className="p-1 rounded text-[12px] font-semibold bg-blue-500/10 text-blue-500 leading-none ml-1">
                                        $80
                                    </span>
                                </div>
                                <span className="text-gray-400 text-sm">Active</span>
                            </div>
                            <div className="rounded-md border border-dashed border-gray-200 p-4">
                                <div className="flex items-center mb-0.5">
                                    <div className="text-xl font-semibold">50</div>
                                    <span className="p-1 rounded text-[12px] font-semibold bg-emerald-500/10 text-emerald-500 leading-none ml-1">
                                        +$469
                                    </span>
                                </div>
                                <span className="text-gray-400 text-sm">Completed</span>
                            </div>
                            <div className="rounded-md border border-dashed border-gray-200 p-4">
                                <div className="flex items-center mb-0.5">
                                    <div className="text-xl font-semibold">4</div>
                                    <span className="p-1 rounded text-[12px] font-semibold bg-rose-500/10 text-rose-500 leading-none ml-1">
                                        -$130
                                    </span>
                                </div>
                                <span className="text-gray-400 text-sm">Canceled</span>
                            </div>
                        </div>
                        <div>
                            <canvas id="order-chart" />
                        </div>
                    </div>
                    <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                        <div className="flex justify-between mb-4 items-start">
                            <div className="font-medium">Earnings</div>
                            <div className="dropdown">
                                <button
                                    type="button"
                                    className="dropdown-toggle text-gray-400 hover:text-gray-600"
                                >
                                    <i className="ri-more-fill" />
                                </button>
                                <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                        >
                                            Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                        >
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                        >
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[460px]">
                                <thead>
                                    <tr>
                                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                                            Service
                                        </th>
                                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                                            Earning
                                        </th>
                                        <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <img
                                                    src="https://placehold.co/32x32"
                                                    alt=""
                                                    className="w-8 h-8 rounded object-cover block"
                                                />
                                                <a
                                                    href="#"
                                                    className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                                                >
                                                    Create landing page
                                                </a>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-emerald-500">
                                                +$235
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                                                Pending
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <img
                                                    src="https://placehold.co/32x32"
                                                    alt=""
                                                    className="w-8 h-8 rounded object-cover block"
                                                />
                                                <a
                                                    href="#"
                                                    className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                                                >
                                                    Create landing page
                                                </a>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-rose-500">
                                                -$235
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                                                Withdrawn
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <img
                                                    src="https://placehold.co/32x32"
                                                    alt=""
                                                    className="w-8 h-8 rounded object-cover block"
                                                />
                                                <a
                                                    href="#"
                                                    className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                                                >
                                                    Create landing page
                                                </a>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-emerald-500">
                                                +$235
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                                                Pending
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <img
                                                    src="https://placehold.co/32x32"
                                                    alt=""
                                                    className="w-8 h-8 rounded object-cover block"
                                                />
                                                <a
                                                    href="#"
                                                    className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                                                >
                                                    Create landing page
                                                </a>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-rose-500">
                                                -$235
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                                                Withdrawn
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <img
                                                    src="https://placehold.co/32x32"
                                                    alt=""
                                                    className="w-8 h-8 rounded object-cover block"
                                                />
                                                <a
                                                    href="#"
                                                    className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                                                >
                                                    Create landing page
                                                </a>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-emerald-500">
                                                +$235
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                                                Pending
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <img
                                                    src="https://placehold.co/32x32"
                                                    alt=""
                                                    className="w-8 h-8 rounded object-cover block"
                                                />
                                                <a
                                                    href="#"
                                                    className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                                                >
                                                    Create landing page
                                                </a>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-rose-500">
                                                -$235
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                                                Withdrawn
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <img
                                                    src="https://placehold.co/32x32"
                                                    alt=""
                                                    className="w-8 h-8 rounded object-cover block"
                                                />
                                                <a
                                                    href="#"
                                                    className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                                                >
                                                    Create landing page
                                                </a>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-emerald-500">
                                                +$235
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                                                Pending
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <img
                                                    src="https://placehold.co/32x32"
                                                    alt=""
                                                    className="w-8 h-8 rounded object-cover block"
                                                />
                                                <a
                                                    href="#"
                                                    className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                                                >
                                                    Create landing page
                                                </a>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-rose-500">
                                                -$235
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                                                Withdrawn
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <img
                                                    src="https://placehold.co/32x32"
                                                    alt=""
                                                    className="w-8 h-8 rounded object-cover block"
                                                />
                                                <a
                                                    href="#"
                                                    className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                                                >
                                                    Create landing page
                                                </a>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-emerald-500">
                                                +$235
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                                                Pending
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <img
                                                    src="https://placehold.co/32x32"
                                                    alt=""
                                                    className="w-8 h-8 rounded object-cover block"
                                                />
                                                <a
                                                    href="#"
                                                    className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                                                >
                                                    Create landing page
                                                </a>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-rose-500">
                                                -$235
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                                                Withdrawn
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Content */}
            </main>



            
        </div>
    );
};

export default Profile;
