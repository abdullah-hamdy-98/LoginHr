import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Employee } from '@/app/utils/dtos';

interface EmpFileTableProps {
    onSelectEmployee: (employee: Employee | null) => void;
}


function InquiryTable() {
    const [tableData, setTableData] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortColumn, setSortColumn] = useState<string | null>(null);
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
        employee.EmpCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.jobTitle?.JobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.L1_HierarchyDesc?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.L2_HierarchyDesc?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.L3_HierarchyDesc?.toLowerCase().includes(searchQuery.toLowerCase())

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

    };

    const handleSort = (column: string) => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setSortColumn(column);

        const sortedData = [...tableData].sort((a, b) => {
            const aValue = a[column as keyof Employee]?.toString().toLowerCase() || '';
            const bValue = b[column as keyof Employee]?.toString().toLowerCase() || '';
            return newSortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        });
        setTableData(sortedData);
    };

    return (

        <div className="relative overflow-x-auto sm:rounded-lg">
            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4">
                <input
                    type="text"
                    id="table-search-users"
                    className="block p-2.5 text-subtle-semibold text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Type any word..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <table className="w-full text-left text-gray-500">
                <thead className="text-subtle-semibold text-gray-700 uppercase bg-gray-100 border-b-2">
                    <tr>
                        <th scope="col" className="px-4 py-2 cursor-pointer" onClick={() => handleSort('NameEN')}>
                            Name {sortColumn === 'NameEN' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                        </th>
                        <th scope="col" className="px-4 py-2 cursor-pointer" onClick={() => handleSort('jobTitle.JobTitle')}>
                            Job {sortColumn === 'JobTitle' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                        </th>
                        <th scope="col" className="px-4 py-2 cursor-pointer" onClick={() => handleSort('L1_HierarchyDesc')}>
                            Company {sortColumn === 'L1_HierarchyDesc' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                        </th>
                        <th scope="col" className="px-4 py-2 cursor-pointer" onClick={() => handleSort('L2_HierarchyDesc')}>
                            Branch {sortColumn === 'L2_HierarchyDesc' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                        </th>
                        <th scope="col" className="px-4 py-2 cursor-pointer" onClick={() => handleSort('L3_HierarchyDesc')}>
                            Sector {sortColumn === 'L3_HierarchyDesc' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                        </th>
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
                                className={`cursor-pointer text-subtle-medium bg-white border-b ${selectedEmployee?.EmpCode === employee.EmpCode ? 'bg-gray-2' : ''}`}
                                onClick={() => handleRowClick(employee)}
                            >
                                <th scope="row" className="flex items-center px-4 py-2 text-gray-900 whitespace-nowrap">
                                    <Image className="rounded-full" src={employee.EmpImg || '/EmpPics/DefaultAvatar.png'} width={30} height={30} alt="Employee image" />
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
            <div className="flex gap-4 items-center pt-6">
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className="text-subtle-medium px-4 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50">Previous</button>
                <span className='text-subtle-medium'>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="text-subtle-medium px-4 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50">Next</button>
            </div>
        </div>

    )
}

export default InquiryTable;