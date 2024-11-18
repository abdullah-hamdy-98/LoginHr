import { BasicInfoProps } from "@/app/utils/dtos";
import { ChangeEvent, useState } from "react";
import EmpImg from '@/components/forms/empFiles/empImg';

const BasicInfo: React.FC<BasicInfoProps & { empImage: string; onImageChange: (image: string) => void; }> =
    ({ register, setValue, empImage, onImageChange }) => {
        const [EmpCodeEnabled, setEmpCodeEnabled] = useState(false);

        const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
            const value = event.target.value;
            setEmpCodeEnabled(value === "Manual");

            if (value === "sequence") {
                setValue("EmpCode", "0000");  
            } else if (value === "Manual") {
                setValue("EmpCode", ""); 
            }
        };

        return (
            <div className="grid grid-cols-4 grid-rows-3 gap-4 items-center text-center">
                <div className="col-span-2 row-span-4 flex justify-center items-center">
                    <EmpImg onImageChange={onImageChange} empImage={empImage} />
                </div>

                <div className="col-span-1 col-start-3">
                    <select
                        id="codeCateg"
                        onChange={handleSelectChange}
                        className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue block w-full p-1.5"
                    >
                        <option value="" disabled>Select Sequence</option>
                        <option value="sequence">Sequence</option>
                        <option value="Manual">Manual</option>
                    </select>
                </div>
                <div className="col-span-2 col-start-4">
                    <input
                        type="text"
                        id="EmpCode"
                        disabled={!EmpCodeEnabled}
                        {...register("EmpCode")}
                        className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue block w-full p-1.5"
                        placeholder="Employee Code"
                        required
                    />
                </div>
                <div className="col-span-3 col-start-3 row-start-2">
                    <input
                        type="text"
                        id="NameAR"
                        {...register("NameAR")}
                        className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue block w-full p-1.5"
                        placeholder="Name Arabic"
                        required
                    />
                </div>
                <div className="col-span-3 col-start-3 row-start-3">
                    <input
                        type="text"
                        id="NameEN"
                        {...register("NameEN")}
                        className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue block w-full p-1.5"
                        placeholder="Name English"
                    />
                </div>
            </div>
        );
    };

export default BasicInfo;
