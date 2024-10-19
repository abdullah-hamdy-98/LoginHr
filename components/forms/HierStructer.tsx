function HierStructer() {
    return (

        <div className="grid grid-cols-1 grid-rows-3 gap-4 items-center text-center">
            <div className="row-start-1">
                <select id="JobCode"
                    className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue block w-full p-1.5"
                >
                    <option value="" selected disabled>Select Company</option>
                    <option value="Login">Login Hr System</option>
                    <option value="Mesco">Mesco</option>
                    <option value="Hammer">Hammer</option>

                </select>
            </div>

            <div className="row-start-2">
                <select id="JobCode"
                    className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue block w-full p-1.5"
                >
                    <option value="" selected disabled>Select Branch</option>
                    <option value="Tanta">Tanta</option>
                    <option value="Cairo">Cairo</option>
                    <option value="Alexandria">Alexandria</option>
                    <option value="Sadat">Sadat</option>

                </select>
            </div>

            <div className="row-start-3">
                <select id="JobCode"
                    className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue block w-full p-1.5"
                >
                    <option value="" selected disabled>Select Sector</option>
                    <option value="Development">Development</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Technicality">Technicality</option>
                    <option value="Managment">Managment</option>

                </select>
            </div>
        </div>

    )
}

export default HierStructer;