"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { sidebarLinks } from '@/constants';
import { SignedIn, SignOutButton } from '@clerk/nextjs';


function Sidebar() {
    const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

    const toggleSubMenu = (label: string) => {
        setOpenSubMenu((prev) => (prev === label ? null : label));
    };

    return (
        <>
            <section id="sidebar" className="custom-scrollbar leftsidebar">
                <div className="flex w-full flex-1 flex-col gap-4 px-6">
                    {sidebarLinks.map((link) => {
                        const hasSubMenu = link.files || link.inquiry;
                        return (
                            <div key={link.label}>
                                <div className="flex items-center hover:bg-gray-2 rounded-md p-0 transition-colors duration-200 cursor-pointer">
                                    <Link
                                        href={link.route}
                                        className="leftsidebar_link flex-1"
                                        onClick={() => hasSubMenu && toggleSubMenu(link.label)}
                                    >
                                        <Image
                                            src={link.svgURL}
                                            alt={link.label}
                                            width={24}
                                            height={24}
                                        />
                                        <p className="text-ligh-1 max-lg:hidden ">
                                            {link.label}
                                        </p>
                                    </Link>

                                    {/* Show down arrow if sub-menu exists */}
                                    {hasSubMenu && (
                                        <Image
                                            src={link.dowenarrow}
                                            alt="Down Arrow"
                                            width={16}
                                            height={16}
                                            className={`transition-transform ${openSubMenu === link.label ? 'rotate-180' : ''} max-lg:hidden mr-2`}
                                        />
                                    )}
                                </div>

                                {/* Sub-links */}
                                {hasSubMenu && (
                                    <div
                                        className={`pl-10 flex flex-col gap-4 pt-2 transition-all duration-400 ease-in-out overflow-hidden ${openSubMenu === link.label ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        {link.files && (
                                            <Link href={link.files.route} className="leftsidebar_sublink max-lg:hidden">
                                                {link.files.label}
                                            </Link>
                                        )}
                                        {link.inquiry && (
                                            <Link href={link.inquiry.route} className="leftsidebar_sublink max-lg:hidden">
                                                {link.inquiry.label}
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="mt-10 px-6 max-lg:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cusror-pointer gap-4 p-4 hover:bg-gray-2 rounded-md p-0 transition-colors duration-200 cursor-pointer">
                                <Image src='/svg/logout.svg'
                                    alt="Logout"
                                    width={24}
                                    height={24}
                                />
                                <p className='text-light'>Logout</p>

                            </div>
                        </SignOutButton>
                    </SignedIn>

                </div>
            </section>
        </>
    );
}

export default Sidebar;
