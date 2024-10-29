import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Employee } from '@/app/utils/dtos';

interface EmpFileTableProps {
    onSelectEmployee: (employee: Employee | null) => void;
}

function EmpFileTable({ onSelectEmployee }: EmpFileTableProps) {
    const [tableData, setTableData] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const rowsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/EmpFiles');
                const data = await response.json();
                setTableData(data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const filteredData = tableData.filter((employee) =>
        employee.NameEN.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.EmpCode.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleRowClick = (employee: Employee) => {
        const isSameEmployee = selectedEmployee?.EmpCode === employee.EmpCode;
        const newSelectedEmployee = isSameEmployee ? null : employee;
        setSelectedEmployee(newSelectedEmployee);
        onSelectEmployee(newSelectedEmployee);
    };

    return (
        <div className="relative overflow-x-auto sm:rounded-lg">
            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-2 bg-white">
                <input
                    type="text"
                    id="table-search-users"
                    className="block p-1.5 text-subtle-semibold text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search for employee"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <table className="w-full text-left text-gray-500">
                <thead className="text-subtle-semibold text-gray-700 uppercase bg-gray-100 border-b-2">
                    <tr>
                        <th scope="col" className="px-4 py-2">Name</th>
                        <th scope="col" className="px-4 py-2">Job</th>
                        <th scope="col" className="px-4 py-2">Company</th>
                        <th scope="col" className="px-4 py-2">Branch</th>
                        <th scope="col" className="px-4 py-2">Sector</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={5} className="text-center text-subtle-semibold p-4">Loading...</td>
                        </tr>
                    ) : (
                        paginatedData.map((employee) => (
                            <tr
                                key={employee.EmpCode}
                                className={`cursor-pointer text-subtle-medium bg-white border-b ${selectedEmployee?.EmpCode === employee.EmpCode ? 'bg-[#f3f4f6] cursor-default' : ''}`}
                                onClick={() => handleRowClick(employee)}
                            >
                                <th scope="row" className="flex items-center px-4 py-2 text-gray-900 whitespace-nowrap">
                                    <Image className="rounded-full" src={employee.EmpImg} width={30} height={30} alt="Employee image" />
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">{employee.NameEN}</div>
                                        <div className="font-normal text-gray-500">{employee.EmpCode}</div>
                                    </div>
                                </th>
                                <td className="px-4 py-2">{employee.jobTitle?.JobTitle || 'NULL'}</td>
                                <td className="px-4 py-2">{employee.L1_HierarchyDesc}</td>
                                <td className="px-4 py-2">{employee.L2_HierarchyDesc}</td>
                                <td className="px-4 py-2">{employee.L3_HierarchyDesc}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="flex justify-center gap-4 items-center pt-6">
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className="text-subtle-medium px-4 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50">Previous</button>
                <span className='text-subtle-medium'>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="text-subtle-medium px-4 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50">Next</button>
            </div>
        </div>
    );
}

export default EmpFileTable;
