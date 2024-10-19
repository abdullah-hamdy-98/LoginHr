import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-light-3 p-4">
            <SignIn />
        </div>
    )
}
