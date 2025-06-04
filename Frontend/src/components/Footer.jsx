import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                {/* ---- Left Section of Footer ---- */}
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>ZRHealthLink, your new doctor scheduling platform. Made to be user friendly and helpful for those trying to stay on top of their health!</p>
                </div>

                {/* ---- Center Section of Footer ---- */}
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                {/* ---- Right Section of Footer ---- */}
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+1-123-456-7890</li>
                        <li>ZRHealth@outlook.com</li>
                    </ul>
                </div>
            </div>
            <div>
                {/* ---- Copyright Text ---- */}
                <div>
                    <hr />
                    <p className='py-5 text-sm text-center'>Copyright 2025 @ ZRHealthLink - All Rights Reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
