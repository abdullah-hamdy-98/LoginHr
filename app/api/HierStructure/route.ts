import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/utils/db'


/**
 * @method GET
 * @url ~/api/HierStructure
 * @Desc Get all Administrative Structure
 * @access private
 */

export async function GET(request: NextRequest) {
    try {
        const hierStructure = await prisma.hierarchyStructure.findMany({})

        const formattedHier = hierStructure.map(hier => {
            return {
                HierID: hier.HierID,
                Description: hier.Description
            }
        })
        return NextResponse.json(hierStructure, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" })
    }

}