"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormData } from "@/app/utils/dtos";
import HButtons from "@/components/forms/empFiles/HButtons";
import BasicInfo from "@/components/forms/empFiles/BasicInfo";
import JobStructer from "@/components/forms/empFiles/JobStructer";
import HierStructer from "@/components/forms/empFiles/HierStructer";
import GeoStructer from "@/components/forms/empFiles/GeoStructer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EmpFiles() {
    const { register, handleSubmit, control, setValue, watch } = useForm<FormData>({
        defaultValues: {
            EmpCode: "",
            JobCode: "",
            JobCategoryCode: 0,
            L1_Hierarchy: "",
            L2_Hierarchy: "",
            L3_Hierarchy: "",
            L1_Geo: "",
            L2_Geo: "",
            L3_Geo: "",
            EmpImg: "",
        },
    });

    const [empImage, setEmpImage] = useState("/EmpPics/DefaultAvatar.png");
    const [isJobCollapsed, setIsJobCollapsed] = useState(false);
    const [isHierCollapsed, setIsHierCollapsed] = useState(false);
    const [isGeoCollapsed, setIsGeoCollapsed] = useState(false);

    const toggleCollapse = (section: string) => {
        if (section === "job") setIsJobCollapsed((prev) => !prev);
        else if (section === "hier") setIsHierCollapsed((prev) => !prev);
        else if (section === "geo") setIsGeoCollapsed((prev) => !prev);
    };

    const onSubmit = async (data: FormData) => {
        const empCodeRegex = /^[0-9]+$/;
        if (data.EmpCode && !empCodeRegex.test(data.EmpCode)) {
            toast.error("Employee Code can only contain numbers.");
            return;
        }

        if (!data.NameEN && !data.NameAR) {
            toast.error("You must fill Employee Name.");
            return;
        }

        if (!data.JobCode) {
            toast.error("You must choose Job Title.");
            return;
        }

        if (data.EmpCode) {
            try {
                const empCodeResponse = await fetch(`/api/checkEmpCode/${data.EmpCode}`);
                if (!empCodeResponse.ok) throw new Error(`API error: ${empCodeResponse.status}`);

                const empCodeExists = await empCodeResponse.json();
                if (empCodeExists.exists) {
                    toast.error("Employee Code already exists, please choose another.");
                    return;
                }

                await postEmployeeData(data);
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(`Network error: ${error.message}`);
                    console.error("Network error during employee data submission:", error);
                } else {
                    toast.error("An unexpected error occurred.");
                    console.error("Unexpected error:", error);
                }
            }
        } else {
            await postEmployeeData(data);
        }
    };

    const postEmployeeData = async (data: FormData) => {
        try {
            const employeeData = { ...data, EmpImg: empImage };
            const response = await fetch("/api/EmpFiles", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(employeeData),
            });

            if (response.ok) {
                console.log(employeeData);
                toast.success("Employee data posted successfully!");
            } else {
                toast.error(`Failed to post employee data, status: ${response.status}`);
            }
        } catch (error) {
            toast.error("Failed to post employee data.");
            console.error("Error posting employee data:", error);
        }
    };


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
            <div className="bg-light-1 p-3 row-span-4 md:col-span-2 rounded shadow-sm text-justify overflow-auto rounded-md">
                <HButtons onCreate={handleSubmit(onSubmit)} />
            </div>

            <div className="bg-light-1 p-4 row-span-4 md:col-span-2 rounded shadow-sm text-justify overflow-auto">
                <BasicInfo control={control} register={register} setValue={setValue} watch={watch}
                    empImage={empImage} onImageChange={setEmpImage} />
            </div>

            {/* Job Structure */}
            <div className="bg-light-1 p-4 row-span-4 md:col-span-2 rounded shadow-sm text-justify overflow-auto">
                <div className="border-b-2 pb-2 mb-4 flex">
                    <header className="text-base-semibold text-blue">Job Structure</header>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#FFFFFF"
                        className="bg-blue-1 rounded-md ml-auto hover:bg-red-2 hover:scale-105 transition-transform transition-colors duration-300 ease-in-out cursor-pointer"
                        onClick={() => toggleCollapse("job")}
                    >
                        <path d="M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z" />
                    </svg>
                </div>
                <div
                    className={`overflow-hidden transition-all duration-[600ms] ease-in-out transform ${isJobCollapsed ? "h-0 opacity-0 scale-90" : "h-auto opacity-100 scale-100"
                        }`}
                    style={{ height: isJobCollapsed ? 0 : "auto" }}
                >
                    {!isJobCollapsed && <JobStructer control={control} watch={watch} setValue={setValue} />}
                </div>
            </div>

            {/* Hierarchy */}
            <div className="bg-light-1 p-4 row-span-4 md:col-span-1 rounded shadow-sm text-justify overflow-auto">
                <div className="border-b-2 pb-2 mb-4 flex">
                    <header className="text-base-semibold text-blue">Hierarchy</header>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#FFFFFF"
                        className="bg-blue-1 rounded-md ml-auto hover:bg-red-2 hover:scale-105 transition-transform transition-colors duration-300 ease-in-out cursor-pointer"
                        onClick={() => toggleCollapse("hier")}
                    >
                        <path d="M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z" />
                    </svg>
                </div>
                <div
                    className={`overflow-hidden transition-all duration-[600ms] ease-in-out transform ${isHierCollapsed ? "h-0 opacity-0 scale-90" : "h-auto opacity-100 scale-100"
                        }`}
                    style={{ height: isHierCollapsed ? 0 : "auto" }}
                >
                    {!isHierCollapsed && <HierStructer control={control} setValue={setValue} />}
                </div>
            </div>

            {/* Geo Structure */}
            <div className="bg-light-1 p-4 row-span-4 md:col-span-1 rounded shadow-sm text-justify overflow-auto">
                <div className="border-b-2 pb-2 mb-4 flex">
                    <header className="text-base-semibold text-blue">Geo Structure</header>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#FFFFFF"
                        className="bg-blue-1 rounded-md ml-auto hover:bg-red-2 hover:scale-105 transition-transform transition-colors duration-300 ease-in-out cursor-pointer"
                        onClick={() => toggleCollapse("geo")}
                    >
                        <path d="M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z" />
                    </svg>
                </div>
                <div
                    className={`overflow-hidden transition-all duration-[600ms] ease-in-out transform ${isGeoCollapsed ? "h-0 opacity-0 scale-90" : "h-auto opacity-100 scale-100"
                        }`}
                    style={{ height: isGeoCollapsed ? 0 : "auto" }}
                >
                    {!isGeoCollapsed && <GeoStructer control={control} setValue={setValue} />}
                </div>
            </div>
        </form>
    );
}

export default EmpFiles;
