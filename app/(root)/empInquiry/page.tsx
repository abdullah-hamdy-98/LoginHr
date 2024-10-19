"use client"
import EmpFilter from '@/components/forms/empInquiry/empFilter'
import InquiryTable from '@/components/forms/empInquiry/InquiryTable'


function empInquiry() {
    
    return (

        <div className="flex flex-1 flex-col gap-4">
            <EmpFilter />
            <InquiryTable />
        </div>

    )
}

export default empInquiry;