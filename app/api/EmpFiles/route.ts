import { NextRequest, NextResponse } from 'next/server'
import { createEmpFileDto } from '@/app/utils/dtos'
import { EmpFileSchema } from '@/app/utils/validationSchemas'
import { EmpFiles } from '@prisma/client'
import prisma from '@/app/utils/db'


/**
 * @method Get
 * @url ~/api/EmpFiles
 * @desc Get all Employee Files joinning Hierarchy and Geo
 * @access private
 */

export async function GET(request: NextRequest) {
    try {
        // Fetch employee files
        const empFiles = await prisma.empFiles.findMany({
            include: {
                jobTitle: true,
                JobCategory: true
            }
        });

        // Fetch hierarchy descriptions for each level
        const hierarchyDescriptions = await prisma.hierarchyStructure.findMany({
            where: { ParentID: { in: ['1', '2', '3'] } },
            select: {
                ParentID: true,
                Description: true,
                HierID: true,
                ChildID: true
            }
        });

        // Fetch geo descriptions for each level
        const geoDescriptions = await prisma.geoStructure.findMany({
            where: { ParentID: { in: ['1', '2', '3'] } },
            select: {
                ParentID: true,
                Description: true,
                GeoID: true,
                ChildID: true
            }
        });

        // Attach descriptions to each employee file record based on hierarchy and geo structures
        const enrichedEmpFiles = empFiles.map(emp => {
            const hierarchy1Desc = hierarchyDescriptions.find(
                item => item.ParentID === '1' && item.HierID === emp.L1_Hierarchy
            )?.Description || null;
            const hierarchy2Desc = hierarchyDescriptions.find(
                item => item.ParentID === '2' && item.HierID === emp.L2_Hierarchy
            )?.Description || null;
            const hierarchy3Desc = hierarchyDescriptions.find(
                item => item.ParentID === '3' && item.HierID === emp.L3_Hierarchy
            )?.Description || null;

            const geo1Desc = geoDescriptions.find(
                item => item.ParentID === '1' && item.GeoID === emp.L1_Geo
            )?.Description || null;

            const geo2Desc = geoDescriptions.find(
                item => item.ParentID === '2' && item.GeoID === emp.L2_Geo
            )?.Description || null;

            const geo3Desc = geoDescriptions.find(
                item => item.ParentID === '3' && item.GeoID === emp.L3_Geo
            )?.Description || null;

            return {
                ...emp,
                L1_HierarchyDesc: hierarchy1Desc,
                L2_HierarchyDesc: hierarchy2Desc,
                L3_HierarchyDesc: hierarchy3Desc,
                L1_GeoDesc: geo1Desc,
                L2_GeoDesc: geo2Desc,
                L3_GeoDesc: geo3Desc
            };
        });

        return NextResponse.json(enrichedEmpFiles, { status: 200 });
    } catch (error) {
        console.error("Error fetching employee files:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
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