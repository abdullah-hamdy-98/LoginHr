"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sidebarLinks } from '@/constants';
import { SignedIn, SignOutButton } from '@clerk/nextjs';
import '../../app/globals.css'

function Sidebar() {
    const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSubMenu = (label: string) => {
        setOpenSubMenu((prev) => (prev === label ? null : label));
    };

    const toggleSidebar = () => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        <section id="sidebar" className={`leftsidebar ${isCollapsed ? 'collapsed' : ''}`}>
            {/* Conditionally render the logo */}
            {!isCollapsed && (
                <Link href='/' className="flex item-center gap-1 pb-8 pl-6">
                    <Image src='/logo/TopLogo.png' alt="Site Logo" width={140} height={0} />
                </Link>
            )}

            <div className="flex w-full flex-1 flex-col">
                {sidebarLinks.map((link) => {
                    const hasSubMenu = link.files || link.inquiry;
                    return (
                        <div key={link.label}>
                            <div
                                className="flex items-center cursor-pointer 
                                hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-1"
                            >
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
                                    {!isCollapsed && (
                                        <p className="text-dark-4">
                                            {link.label}
                                        </p>
                                    )}
                                </Link>
                                {hasSubMenu && (
                                    <Image
                                        src={link.dowenarrow}
                                        alt="Down Arrow"
                                        width={16}
                                        height={16}
                                        className={`transition-transform ${openSubMenu === link.label ? 'rotate-180' : ''} ${isCollapsed ? 'hidden' : 'max-lg:hidden mr-4'}`}
                                    />
                                )}
                            </div>

                            {/* Sub-links with smooth transitions */}
                            {hasSubMenu && (
                                <div
                                    className={`pl-10 flex flex-col gap-2 pt-1 transition-max-height duration-300 ease-in-out overflow-hidden ${openSubMenu === link.label ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    {link.files && (
                                        <Link href={link.files.route} className={`leftsidebar_sublink ${isCollapsed ? 'hidden' : 'max-lg:hidden'}`}>
                                            {link.files.label}
                                        </Link>
                                    )}
                                    {link.inquiry && (
                                        <Link href={link.inquiry.route} className={`leftsidebar_sublink ${isCollapsed ? 'hidden' : 'max-lg:hidden'}`}>
                                            {link.inquiry.label}
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Fold button with SVG icons */}
                <button onClick={toggleSidebar} className="fold-button p-3 hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-blue-1">
                    {isCollapsed ? (
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1F1F22">
                            <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1F1F22">
                            <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" />
                        </svg>
                    )}
                </button>
            </div>

            <div className="mt-10 pl-4 hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-red-1 max-lg:hidden">
                <SignedIn>
                    <SignOutButton>
                        <div className="flex cusror-pointer gap-4 p-4 pl-0 cursor-pointer">
                            <Image src='/svg/logout.svg' alt="Logout" width={24} height={24} />
                            {!isCollapsed && (
                                <p className='text-dark-4 mt-1'>Logout</p>
                            )}
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>
        </section>
    );
}

export default Sidebar;
