import { useState } from "react";
import Image from "next/image";

function BasicInfo() {
    const [empCodeEnabled, setEmpCodeEnabled] = useState(false); // State to control empCode input

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEmpCodeEnabled(event.target.value === "Manual"); // Enable empCode when "Manual" is selected
    };

    return (
        <>
            <div className="grid grid-cols-4 grid-rows-3 gap-4 items-center text-center">
                <div className="col-span-2 row-span-4 flex justify-center items-center">
                    <Image src='/EmpPics/DefaultAvatar.png' alt="Employee Picture" width={180} height={0} />

                    <div className="flex flex-col p-4 gap-2">
                        {/* Upload Image */}
                        <label htmlFor="UpEmpPic" className="cursor-pointer px-4 py-1 text-subtle-medium inline-flex items-center text-white bg-blue-1 rounded-lg hover:bg-blue transition-colors duration-300 ease-in-out">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="100 -960 960 960" width="16px" fill="#FFFFFF">
                                <path d="M440-160v-326L336-382l-56-58 200-200 200 200-56 58-104-104v326h-80ZM160-600v-120q0-33 23.5-56.5T240-800h480q33 0 56.5 23.5T800-720v120h-80v-120H240v120h-80Z" />
                            </svg>
                            Upload
                        </label>
                        <input type="file" id="UpEmpPic" className="hidden" />

                        {/* Remove Image */}
                        <button
                            type="button"
                            id="DelEmpPic"
                            className="px-4 py-1 text-subtle-medium font-medium inline-flex items-center text-white bg-red-1 rounded-lg hover:bg-red-2 transition-colors duration-300 ease-in-out"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="100 -960 960 960" width="16px" fill="#FFFFFF">
                                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                            </svg>
                            Remove
                        </button>
                    </div>
                </div>
                <div className="col-span-1 col-start-3">
                    <div>
                        <select
                            id="codeCateg"
                            onChange={handleSelectChange}
                            className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue block w-full p-1.5"
                        >
                            <option value="" selected disabled>Select Sequence</option>
                            <option value="sequence">Sequence</option>
                            <option value="Manual">Manual</option>
                        </select>
                    </div>
                </div>
                <div className="col-span-2 col-start-4">
                    <div>
                        <input
                            type="text"
                            id="empCode"
                            className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue focus:text-subtle-medium focus:text-dark-1 block w-full p-1.5"
                            placeholder="Employee Code"
                            required
                            disabled={!empCodeEnabled} // Disable input when not enabled
                        />
                    </div>
                </div>

                <div className="col-span-3 col-start-3 row-start-2">
                    <div>
                        <input
                            type="text"
                            id="empNameAr"
                            className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue focus:text-subtle-medium focus:text-dark-1 block w-full p-1.5"
                            placeholder="Name Arabic"
                            required
                        />
                    </div>
                </div>

                <div className="col-span-3 col-start-3 row-start-3">
                    <div>
                        <input
                            type="text"
                            id="empNameEn"
                            className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue focus:text-subtle-medium focus:text-dark-1 block w-full p-1.5"
                            placeholder="Name English"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default BasicInfo;
