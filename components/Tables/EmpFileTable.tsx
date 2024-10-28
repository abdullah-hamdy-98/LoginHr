import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Employee } from '@/app/utils/dtos';

function EmpFileTable() {
    const [tableData, setTableData] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
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

    const totalPages = Math.ceil(tableData.length / rowsPerPage);
    const paginatedData = tableData.slice(
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
        setSelectedEmployee(selectedEmployee?.EmpCode === employee.EmpCode ? null : employee);
    };

    return (
        <div className="relative overflow-x-auto sm:rounded-lg">
            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-2 bg-white">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search-users"
                        className="block p-1.5 pl-10 text-subtle-semibold text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search for employee"
                    />
                </div>
            </div>
            <table className="w-full text-left text-gray-500">
                <thead className="text-subtle-semibold text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
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
                                className={`text-subtle-medium bg-white border-b ${selectedEmployee?.EmpCode === employee.EmpCode ? 'bg-gray-200' : ''}`} // Highlight selected row
                                onClick={() => handleRowClick(employee)}
                            >
                                <th scope="row" className="flex items-center px-4 py-2 text-gray-900 whitespace-nowrap">
                                    <Image className="rounded-full"
                                        src={employee.EmpImg}
                                        width={50} height={50}
                                        alt="Employee image" />
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">{employee.NameEN}</div>
                                        <div className="font-normal text-gray-500">{employee.EmpCode}</div>
                                    </div>
                                </th>
                                <td className="px-4 py-2">{employee.jobTitle?.JobTitle || 'N/A'}</td>
                                <td className="px-4 py-2">{employee.L1_Hierarchy}</td>
                                <td className="px-4 py-2">{employee.L2_Hierarchy}</td>
                                <td className="px-4 py-2">{employee.L3_Hierarchy}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="flex justify-end gap-4 items-center pt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="text-subtle-medium px-4 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className='text-subtle-medium'>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="text-subtle-medium px-4 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default EmpFileTable;
