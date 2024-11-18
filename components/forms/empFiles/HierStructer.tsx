import React, { useEffect, useState } from 'react';
import { HierStructureItem, HierStructerProps } from '@/app/utils/dtos';
import { Control, Controller } from 'react-hook-form';


function HierStructer({ control, setValue }: HierStructerProps) {
    const [companies, setCompanies] = useState<{ value: string; label: string }[]>([]);
    const [branches, setBranches] = useState<{ value: string; label: string }[]>([]);
    const [sectors, setSectors] = useState<{ value: string; label: string }[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
    const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/HierStructure');
                const data: HierStructureItem[] = await response.json();

                const companies = data.filter((item: HierStructureItem) => item.ParentID === "1" && item.ChildID === "0")
                    .map((item: HierStructureItem) => (
                        { value: item.HierID, label: item.Description }
                    ));

                setCompanies(companies);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchBranches = async () => {
            if (selectedCompany) {
                try {
                    const response = await fetch('http://localhost:3000/api/HierStructure');
                    const data: HierStructureItem[] = await response.json();

                    const filteredBranches = data.filter((item: HierStructureItem) =>
                        item.ParentID === "2" && item.ChildID === selectedCompany
                    ).map((item: HierStructureItem) => (
                        { value: item.HierID, label: item.Description }
                    ));

                    setBranches(filteredBranches);
                    setSectors([]);
                    setSelectedBranch(null);
                    setValue('L1_Hierarchy', selectedCompany);
                } catch (error) {
                    console.error('Error fetching branches:', error);
                }
            } else {
                setBranches([]);
                setSectors([]);
                setSelectedBranch(null);
                setValue('L1_Hierarchy', '');
            }
        };

        fetchBranches();
    }, [selectedCompany, setValue]);

    useEffect(() => {
        const fetchSectors = async () => {
            if (selectedBranch) {
                try {
                    const response = await fetch('http://localhost:3000/api/HierStructure');
                    const data: HierStructureItem[] = await response.json();

                    const filteredSectors = data.filter((item: HierStructureItem) =>
                        item.ParentID === "3" && item.ChildID === selectedBranch
                    ).map((item: HierStructureItem) => (
                        { value: item.HierID, label: item.Description }
                    ));

                    setSectors(filteredSectors);
                    setValue('L2_Hierarchy', selectedBranch);
                } catch (error) {
                    console.error('Error fetching sectors:', error);
                }
            } else {
                setSectors([]);
                setValue('L2_Hierarchy', '');
            }
        };

        fetchSectors();
    }, [selectedBranch, setValue]);

    return (
        <div className="grid grid-cols-1 grid-rows-3 gap-4 items-center text-center">
            <div className="row-start-1">
                <Controller
                    name="L1_Hierarchy"
                    control={control}
                    render={({ field }) => (
                        <select
                            {...field}
                            id="CompanySelect"
                            className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue block w-full p-1.5"
                            onChange={(e) => {
                                setSelectedCompany(e.target.value);
                                field.onChange(e);  // Trigger form update
                            }}
                        >
                            <option value="" disabled>Select Company</option>
                            {companies.map(company => (
                                <option key={company.value} value={company.value}>{company.label}</option>
                            ))}
                        </select>
                    )}
                />
            </div>

            <div className="row-start-2">
                <Controller
                    name="L2_Hierarchy"
                    control={control}
                    render={({ field }) => (
                        <select
                            {...field}
                            id="BranchSelect"
                            className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue block w-full p-1.5"
                            onChange={(e) => {
                                setSelectedBranch(e.target.value);
                                field.onChange(e);
                            }}
                        >
                            <option value="" disabled>Select Branch</option>
                            {branches.map(branch => (
                                <option key={branch.value} value={branch.value}>{branch.label}</option>
                            ))}
                        </select>
                    )}
                />
            </div>

            <div className="row-start-3">
                <Controller
                    name="L3_Hierarchy"
                    control={control}
                    render={({ field }) => (
                        <select
                            {...field}
                            id="SectorSelect"
                            className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue block w-full p-1.5"
                        >
                            <option value="">Select Sector</option>
                            {sectors.map(sector => (
                                <option key={sector.value} value={sector.value}>{sector.label}</option>
                            ))}
                        </select>
                    )}
                />
            </div>
        </div>
    );
}

export default HierStructer;
