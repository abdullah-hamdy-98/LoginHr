"use client";
import { useState } from 'react';
import HButtons from '@/components/forms/empFiles/HButtons';
import BasicInfo from '@/components/forms/empFiles/BasicInfo';
import JobStructer from '@/components/forms/empFiles/JobStructer';
import HierStructer from '@/components/forms/empFiles/HierStructer';
import GeoStructer from '@/components/forms/empFiles/GeoStructer';

function EmpFiles() {
    const [isJobStructerVisible, setIsJobStructerVisible] = useState(true);
    const [isHierarchyStructerVisible, setIsHierarchyStructerVisible] = useState(true);
    const [isGeographyStructureVisible, setIsGeographyStructureVisible] = useState(true);

    const toggleVisibility = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
        setter(prev => !prev);
    };

    return (
        <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Header or Button Section */}
            <div className="bg-light-1 p-3 row-span-4 md:col-span-2 rounded shadow-sm text-justify overflow-auto rounded-md">
                <HButtons />
            </div>

            {/* Basic Info Section */}
            <div className="bg-light-1 p-4 row-span-4 md:col-span-2 rounded shadow-sm text-justify overflow-auto">
                <BasicInfo />
            </div>

            {/* Job Structer Section */}
            <div className="bg-light-1 p-4 row-span-4 md:col-span-2 rounded shadow-sm text-justify overflow-auto">
                <div className="border-b-2 pb-2 mb-4 flex">
                    <header className="text-base-semibold text-blue">Job Structer</header>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#FFFFFF"
                        onClick={() => toggleVisibility(setIsJobStructerVisible)}
                        className='bg-blue-1 rounded-md ml-auto hover:bg-red-2 hover:scale-105 transition-transform transition-colors duration-300 ease-in-out cursor-pointer'
                    >
                        <path
                            d={isJobStructerVisible
                                ? "M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z"
                                : "M440-440v240h-80v-160H200v-80h240Zm160-320v160h160v80H520v-240h80Z"
                            }
                        />
                    </svg>
                </div>
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isJobStructerVisible ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                    <JobStructer />
                </div>
            </div>

            {/* Hierarchy Structer Section */}
            <div className="bg-light-1 p-4 row-span-4 md:col-span-1 rounded shadow-sm text-justify overflow-auto">
                <div className="border-b-2 pb-2 mb-4 flex">
                    <header className="text-base-semibold text-blue">Hierarchy</header>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#FFFFFF"
                        onClick={() => toggleVisibility(setIsHierarchyStructerVisible)}
                        className='bg-blue-1 rounded-md ml-auto hover:bg-red-2 hover:scale-105 transition-transform transition-colors duration-300 ease-in-out cursor-pointer'
                    >
                        <path
                            d={isHierarchyStructerVisible
                                ? "M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z"
                                : "M440-440v240h-80v-160H200v-80h240Zm160-320v160h160v80H520v-240h80Z"
                            }
                        />
                    </svg>
                </div>
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isHierarchyStructerVisible ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                    <HierStructer />
                </div>
            </div>

            {/* Geography Structer Section */}
            <div className="bg-light-1 p-4 row-span-4 md:col-span-1 rounded shadow-sm text-justify overflow-auto">
                <div className="border-b-2 pb-2 mb-4 flex">
                    <header className="text-base-semibold text-blue">Geographical</header>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#FFFFFF"
                        onClick={() => toggleVisibility(setIsGeographyStructureVisible)}
                        className='bg-blue-1 rounded-md ml-auto hover:bg-red-2 hover:scale-105 transition-transform transition-colors duration-300 ease-in-out cursor-pointer'
                    >
                        <path
                            d={isGeographyStructureVisible
                                ? "M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z"
                                : "M440-440v240h-80v-160H200v-80h240Zm160-320v160h160v80H520v-240h80Z"
                            }
                        />
                    </svg>
                </div>
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isGeographyStructureVisible ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                    <GeoStructer />
                </div>
            </div>

        </main>
    );
}

export default EmpFiles;
