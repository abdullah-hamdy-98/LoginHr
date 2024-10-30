import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/utils/db'


/**
 * @method GET
 * @url ~/api/GeoStructure
 * @Desc Get all Administrative Structure
 * @access private
 */

export async function GET(request: NextRequest) {
    try {
        const geoStructure = await prisma.geoStructure.findMany({})

        const formattedGeo = geoStructure.map(geo => {
            return {
                GeoID: geo.GeoID,
                Description: geo.Description
            }
        })
        return NextResponse.json(geoStructure, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" })
    }

}