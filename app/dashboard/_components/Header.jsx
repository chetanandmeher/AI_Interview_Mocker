"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

function Header() {
    // to make the header active based on the current path
    const path = usePathname();

  return (
    // Container div for the header with flexbox, padding, alignment, background color, and shadow
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
        {/* // Logo image with specified width and height */}
        <Image src={"/logo.svg"} alt="logo" width={160} height={100} />
        <ul className=' hidden md:flex gap-6'> 
            {/* // List items for navigation links with conditional styling based on the current path and hover effects */}
            <li className={`'hover:text-primary hover:font-bold transition-all cursor-pointer' ${path=="/dashboard" && 'text-primary font-bold'}`}>Dashboard</li>
            <li className={`'hover:text-primary hover:font-bold transition-all cursor-pointer' ${path=="/questions" && 'text-primary font-bold'}`}>Questions</li>
            <li className={`'hover:text-primary hover:font-bold transition-all cursor-pointer' ${path=="/upgrade" && 'text-primary font-bold'}`}>Upgrade</li>
            <li className={`'hover:text-primary hover:font-bold transition-all cursor-pointer' ${path=="/how-it-works?" && 'text-primary font-bold'}`}>How it Works?</li>
        </ul>
        {/* // User button component for accounts details and settings */}
        <UserButton />
    </div>
  )
}

export default Header