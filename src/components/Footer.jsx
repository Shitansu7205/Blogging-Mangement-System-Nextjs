import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Example social icons

const Footer = () => {
    return (
        <footer className="bg-blue-800 text-white py-8 px-4 lg:px-32">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {/* Column 1: About Us */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">About Us</h3>
                    <p className="text-sm">
                        Your blog platform for sharing stories and ideas. Join our community and start blogging today.
                    </p>
                    <div className="flex mt-4 space-x-4">
                        <a href="#" className="hover:text-blue-400"><FaFacebook size={20} /></a>
                        <a href="#" className="hover:text-blue-400"><FaTwitter size={20} /></a>
                        <a href="#" className="hover:text-pink-600"><FaInstagram size={20} /></a>
                        <a href="#" className="hover:text-blue-600"><FaLinkedin size={20} /></a>
                    </div>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="text-sm flex flex-col ">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/blogs">Blogs</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </div>

                {/* Column 3: Services */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Services</h3>
                    <ul className="text-sm">
                        <li>Blog Hosting</li>
                        <li>Content Creation</li>
                        <li>Community Support</li>
                        <li>SEO Optimization</li>
                    </ul>
                </div>

                {/* Column 4: Contact Information */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact</h3>
                    <p className="text-sm">
                        Bhubaneswar , odisha , india, 751019
                    </p>
                    <p className="text-sm">
                        Email: shitansukumargochhayat@gmail.com
                    </p>
                    <p className="text-sm">
                        Phone: +91 7205121943
                    </p>
                </div>
            </div>

            {/* Bottom Copyright Section */}
            <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
                &copy; {new Date().getFullYear()} <span className='text-red-500 font-bold'>Shitansu</span> || All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;