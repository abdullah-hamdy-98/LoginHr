import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"


function Topbar() {
    const isUserLoggedIn = true;
    return (
        <nav className="topbar">
            <Link href='/' className="flex item-center gap-1">
                <Image src='/logo/TopLogo.png' alt="Site Logo" width={170} height={37} />
            </Link>

            <div className="flex item-center gap-1">
                <div className="pt-1 block md:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cusror-pointer">
                                <Image src='/svg/logout.svg'
                                    alt="Logout"
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>

                <OrganizationSwitcher
                    appearance={{
                        elements: {
                            organizationSwitcherTrigger: "py-2 px-4"
                        }
                    }}
                />
            </div>
        </nav>

    )
}

export default Topbar