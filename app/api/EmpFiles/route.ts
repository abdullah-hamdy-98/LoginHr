import { NextRequest, NextResponse } from 'next/server'
import { employeeData } from '@/app/utils/data'
import { createEmpFileDto } from '@/app/utils/dtos'
import { EmpFileSchema } from '@/app/utils/validationSchemas'
/**
 * @method GET
 * @url ~/api/EmpFiles
 * @desc Get Employee Data
 * @access private
 */

export function GET(request: NextRequest) {
    return NextResponse.json(employeeData, { status: 200 })
}


/**
 * @method POST
 * @url ~/api/EmpFiles
 * @desc Create Employee File
 * @access private
 */


export async function POST(request: NextRequest) {
    const body = (await request.json()) as createEmpFileDto

    const validation = EmpFileSchema.safeParse(body)
    if (!validation.success) {
        return NextResponse.json({ message: validation.error.errors[0]}, { status: 400 })
    }

    employeeData.push(body)
    return NextResponse.json(body, { status: 201 })
}