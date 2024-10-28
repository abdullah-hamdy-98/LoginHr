import { NextRequest, NextResponse } from 'next/server'
import { employeeData } from '@/app/utils/data'
import { Props, updateEmpFileDto } from '@/app/utils/dtos'
import prisma from '@/app/utils/db'


/**
 * @method GET
 * @url ~/api/EmpFiles/:empCode
 * @desc Get Single Employee File
 * @access private
 */

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const empFile = await prisma.empFiles.findUnique(
            {
                where: {
                    EmpCode: params.empCode
                }
            })

        if (!empFile) {
            return NextResponse.json({ message: 'This File Not Found' }, { status: 404 })
        }

        return NextResponse.json(empFile, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" })
    }
}


/**
 * @method PUT
 * @url ~/api/EmpFiles/:empCode
 * @desc Update Employee File
 * @access private
 */

export async function PUT(request: NextRequest, { params }: Props) {
    try {
        const empFile = await prisma.empFiles.findUnique({
            where: {
                EmpCode: params.empCode
            }
        })
        if (!empFile) {
            return NextResponse.json({ message: 'This File Not Found' }, { status: 404 })
        }

        const body = (await request.json()) as updateEmpFileDto
        const updateEmpFile = await prisma.empFiles.update({
            where: { EmpCode: params.empCode },
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

        return NextResponse.json(updateEmpFile, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" })
    }
}

/**
 * @method DELETE
 * @url ~/api/EmpFiles/:empCode
 * @desc Delete File
 * @access private
 */

export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        const empFile = await prisma.empFiles.findUnique({
            where: {
                EmpCode: params.empCode
            }
        })
        if (!empFile) {
            return NextResponse.json({ message: 'This File Not Found' }, { status: 404 })
        }

        await prisma.empFiles.delete({
            where: { EmpCode: params.empCode }
        })

        return NextResponse.json({ message: 'File Deleted' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" })
    }
}
