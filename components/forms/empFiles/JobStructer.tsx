import { useEffect, useState } from "react";
import { useController, Control, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { FormData, JobStructure } from "@/app/utils/dtos";

interface JobStructerProps {
    control: Control<FormData>;
    setValue: UseFormSetValue<FormData>;
    watch: UseFormWatch<FormData>;
}

function JobStructer({ control, setValue, watch }: JobStructerProps) {
    const [jobStructures, setJobStructures] = useState<JobStructure[]>([]);
    const [jobCategories, setJobCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const jobCode = watch("JobCode");
    const jobCategoryCode = watch("JobCategoryCode"); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/JobStructure");
                const data: JobStructure[] = await response.json();
                setJobStructures(data);

                const uniqueCategories = Array.from(new Set(data.map(job => job.JobCategory)));
                setJobCategories(uniqueCategories);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching job structure data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleJobTitleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedJobCode = event.target.value;
        setValue("JobCode", selectedJobCode);

        const selectedJob = jobStructures.find(job => job.JobCode === selectedJobCode);
        setValue("JobCategoryCode", selectedJob ? selectedJob.JobCategoryCode : 0);
    };

    const handleJobCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValue("JobCategoryCode", Number(event.target.value));
    };

    return (
        <div className="grid grid-cols-2 grid-rows-1 gap-4">
            <div className="col-span-1 col-start-1">
                <select
                    id="JobCode"
                    value={jobCode}
                    onChange={handleJobTitleChange}
                    className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue block w-full p-1.5"
                >
                    <option value="" disabled>
                        Select Job Title
                    </option>
                    {loading ? (
                        <option>Loading...</option>
                    ) : (
                        jobStructures.map(job => (
                            <option key={job.JobCode} value={job.JobCode}>
                                {job.JobTitle}
                            </option>
                        ))
                    )}
                </select>
            </div>
            <div className="col-span-2 col-start-2">
                <select
                    id="JobCateg"
                    value={jobCategoryCode}
                    onChange={handleJobCategoryChange}
                    className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue block w-full p-1.5"
                >
                    <option value="" disabled>
                        Select Job Category
                    </option>
                    {loading ? (
                        <option>Loading...</option>
                    ) : (
                        jobCategories.map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))
                    )}
                </select>
            </div>
        </div>
    );
}

export default JobStructer;
