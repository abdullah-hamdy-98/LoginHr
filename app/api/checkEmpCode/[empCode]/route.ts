import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/utils/db';

/**
 * @method GET
 * @url ~/api/checkEmpCode/[empCode]
 * @desc Check if an Employee File exists by EmpCode
 * @access private
 */

export async function GET(request: NextRequest, { params }: { params: { empCode: string } }) {
    const { empCode } = params;

    if (!empCode || typeof empCode !== 'string') {
        return NextResponse.json({ message: 'Invalid EmpCode provided' }, { status: 400 });
    }

    try {
        const empFile = await prisma.empFiles.findUnique({
            where: {
                EmpCode: empCode,
            },
        });

        if (empFile) {
            return NextResponse.json({ exists: true }, { status: 200 });
        } else {
            return NextResponse.json({ exists: false }, { status: 200 });
        }
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
