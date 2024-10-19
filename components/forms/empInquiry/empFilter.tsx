const options = [
    "Select All Columns",
    "Employee Picture",
    "Employee Code",
    "Name Arabic",
    "Name English",
    "Job",
    "Category",
    "Company",
    "Bransh",
    "Sector"
];

const employees = [
    "Select All Employees",
    "Abdullah Hamdy",
    "Ibrahim Farag",
    "Muhammed Mussalam"
];

function EmpFilter() {
    return (
        <>
            <div className="grid grid-rows-5 z-20">
                <div className="col-span-3">
                    <label className="relative cursor-pointer border p-4 rounded px-60">
                        <input type="checkbox" className="hidden peer" />
                        {"Select Employees"}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 inline ml-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>

                        <div className="absolute ml-14 mt-5 p-4 px-40 bg-white border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto">
                            <ul>
                                {employees.map((employee, i) => {
                                    return (
                                        <li key={employee}>
                                            <label className="flex whitespace-nowrap px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200">
                                                <input
                                                    type="checkbox"
                                                    value={employee}
                                                    className="cursor-pointer"
                                                />
                                                <span className="ml-1">{employee}</span>
                                            </label>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </label>
                </div>

                <div className="col-span-3 col-start-4">
                    <label className="relative cursor-pointer border p-4 rounded px-28">
                        <input type="checkbox" className="hidden peer" />
                        {"Select specific columns"}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 inline ml-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>

                        <div className="absolute ml-8 mt-5 p-4 px-24 bg-white border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto">
                            <ul>
                                {options.map((option, i) => {
                                    return (
                                        <li key={option}>
                                            <label className="flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200">
                                                <input
                                                    type="checkbox"
                                                    value={option}
                                                    className="cursor-pointer"
                                                />
                                                <span className="ml-1">{option}</span>
                                            </label>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </label>
                </div>
            </div>
        </>
    );
};

export default EmpFilter;
