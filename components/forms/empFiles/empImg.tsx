import Image from "next/image";

interface EmpImgProps {
    empImage: string;
    onImageChange: (image: string) => void;
}

const EmpImg: React.FC<EmpImgProps> = ({ empImage, onImageChange }) => {
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    onImageChange(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        onImageChange("/EmpPics/DefaultAvatar.png");
    };

    return (
        <>
            <div className="flex justify-center">
                <Image
                    src={empImage}
                    alt="Employee Picture"
                    width={140}
                    height={140}
                    className="rounded-full"
                />
            </div>
            <div className="flex flex-col p-4 gap-2">
                <label
                    htmlFor="UpEmpPic"
                    className="cursor-pointer px-4 py-1 text-subtle-medium inline-flex items-center text-white bg-blue-1 rounded-lg hover:bg-blue transition-colors duration-300 ease-in-out"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="100 -960 960 960" width="16px" fill="#FFFFFF">
                        <path d="M440-160v-326L336-382l-56-58 200-200 200 200-56 58-104-104v326h-80ZM160-600v-120q0-33 23.5-56.5T240-800h480q33 0 56.5 23.5T800-720v120h-80v-120H240v120h-80Z" />
                    </svg>
                    Upload
                </label>
                <input
                    type="file"
                    id="UpEmpPic"
                    className="hidden"
                    onChange={handleImageUpload}
                />
                <button
                    type="button"
                    id="DelEmpPic"
                    className="px-4 py-1 text-subtle-medium font-medium inline-flex items-center text-white bg-red-1 rounded-lg hover:bg-red-2 transition-colors duration-300 ease-in-out"
                    onClick={handleRemoveImage}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="100 -960 960 960" width="16px" fill="#FFFFFF">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                    Remove
                </button>
            </div>
        </>
    );
};

export default EmpImg;
