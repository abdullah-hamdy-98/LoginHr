import { useEffect, useState } from "react";
import { JobStructure } from '@/app/utils/dtos';

interface JobInfoProps {
    selectedJobTitle: string;
    setSelectedJobTitle: (value: string) => void;
    selectedJobCategory: number;
    setSelectedJobCategory: (value: number) => void;
}

function JobStructer({ selectedJobTitle, setSelectedJobTitle, selectedJobCategory, setSelectedJobCategory }: JobInfoProps) {
    const [jobStructures, setJobStructures] = useState<JobStructure[]>([]);
    const [jobCategories, setJobCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/JobStructure');
                const data: JobStructure[] = await response.json();
                setJobStructures(data);

                const uniqueCategories = Array.from(new Set(data.map(job => job.JobCategory)));
                setJobCategories(uniqueCategories);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching job structure data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleJobTitleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const jobCode = event.target.value;
        setSelectedJobTitle(jobCode);

        const selectedJob = jobStructures.find(job => job.JobCode === jobCode);
        if (selectedJob) {
            setSelectedJobCategory(selectedJob.JobCategoryCode);
        } else {
            setSelectedJobCategory(0);
        }
    };

    return (
        <div className="grid grid-cols-2 grid-rows-1 gap-4">
            <div className="col-span-1 col-start-1">
                <div>
                    <select
                        id="JobCode"
                        value={selectedJobTitle}
                        onChange={handleJobTitleChange}
                        className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue block w-full p-1.5"
                    >
                        <option value="" disabled>Select Job Title</option>
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
            </div>

            <div className="col-span-2 col-start-2">
                <div>
                    <select
                        id="JobCateg"
                        value={selectedJobCategory}
                        onChange={(e) => setSelectedJobCategory(Number(e.target.value))}
                        className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue block w-full p-1.5"
                    >
                        <option value="" >Select Job Category</option>
                        {loading ? (
                            <option>Loading...</option>
                        ) : (
                            jobCategories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))
                        )}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default JobStructer;
