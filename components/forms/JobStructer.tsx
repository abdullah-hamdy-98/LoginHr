
function JobStructer() {
    return (

        <div className="grid grid-cols-2 grid-rows-1 gap-4">
            <div className="col-span-1 col-start-1">
                <div>
                    <select id="JobCode"
                        className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue block w-full p-1.5"
                    >
                        <option value="" selected disabled>Select Job Title</option>
                        <option value="Developer">Developer</option>
                        <option value="Engineer">Engineer</option>
                        <option value="Technical">Technical Support</option>
                        <option value="Ceo">Ceo</option>

                    </select>
                </div>
            </div>

            <div className="col-span-2 col-start-2">
                <div>
                    <select id="JobCateg"
                        className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue block w-full p-1.5"
                    >
                        <option value="" selected disabled>Select Job Category</option>
                        <option value="White">White Collar</option>
                        <option value="Blue">Blue Collar</option>
                    </select>
                </div>
            </div>
        </div>

    )
}

export default JobStructer;