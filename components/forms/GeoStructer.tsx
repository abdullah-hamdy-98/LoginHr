function GeoStructer() {
    return (

        <div className="grid grid-cols-1 grid-rows-3 gap-4 items-center text-center">
            <div className="row-start-1">
                <select id="JobCode"
                    className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue block w-full p-1.5"
                >
                    <option value="" selected disabled>Select Country</option>
                    <option value="Egypt">Egypt</option>
                </select>
            </div>

            <div className="row-start-2">
                <select id="JobCode"
                    className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue block w-full p-1.5"
                >
                    <option value="" selected disabled>Select Governorate</option>
                    <option value="Gharbia">Al-Gharbia</option>
                    <option value="Cairo">Cairo</option>
                    <option value="Alexandria">Alexandria</option>
                    <option value="Menofia">Al-Menofia</option>

                </select>
            </div>

            <div className="row-start-3">
                <select id="JobCode"
                    className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue block w-full p-1.5"
                >
                    <option value="" selected disabled>Select City</option>
                    <option value="Tanta">Tanta</option>
                    <option value="Cairo">Cairo</option>
                    <option value="Alexandria">Alexandria</option>
                    <option value="Sadat">Sadat</option>

                </select>
            </div>
        </div>

    )
}

export default GeoStructer;