import { NextRequest, NextResponse } from 'next/server'
import { createEmpFileDto } from '@/app/utils/dtos'
import { EmpFileSchema } from '@/app/utils/validationSchemas'
import { EmpFiles } from '@prisma/client'
import prisma from '@/app/utils/db'

/**
 * @method GET
 * @url ~/api/EmpFiles
 * @desc Get all Employee Data
 * @access private
 */

export async function GET(request: NextRequest) {
    try {
        const empFiles = await prisma.empFiles.findMany()
        return NextResponse.json(empFiles, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" })
    }
}


/**
 * @method POST
 * @url ~/api/EmpFiles
 * @desc Create Employee File
 * @access private
 */


export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as createEmpFileDto

        const validation = EmpFileSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0] }, { status: 400 })
        }
        const empFile: EmpFiles = await prisma.empFiles.create({
            data: {
                EmpImg: body.EmpImg,
                EmpCode: body.EmpCode,
                NameAR: body.NameAR,
                NameEN: body.NameEN,
                JobCode: body.JobCode,
                JobCategoryCode: body.JobCategoryCode,
                L1_Hierarchy: body.L1_Hierarchy,
                L2_Hierarchy: body.L2_Hierarchy,
                L3_Hierarchy: body.L3_Hierarchy,
                L1_Geo: body.L1_Geo,
                L2_Geo: body.L2_Geo,
                L3_Geo: body.L3_Geo
            }
        })

        return NextResponse.json(empFile, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" })
    }
}