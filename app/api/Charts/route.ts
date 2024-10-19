import { NextRequest, NextResponse } from 'next/server'
import { charts } from '@/app/utils/data'
import { NewChartDto } from '@/app/utils/dtos'
import { createChartSchema } from '@/app/utils/validationSchemas'

/**
 * @method GET
 * @route ~/api/charts
 * @desc Get Dashboard Charts
 * @access private
 */

export function GET(request: NextRequest) {
    return (
        NextResponse.json(charts, { status: 200 })
    )
}


/**
 * @method POST
 * @route ~/api/charts
 * @desc Create Charts
 * @access private
 */


export async function POST(request: NextRequest) {
    const body = (await request.json()) as NewChartDto

    const validation = createChartSchema.safeParse(body)
    if (!validation.success) {
        return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 })
    }

    charts.push(body)
    return NextResponse.json(body, { status: 201 })
}
