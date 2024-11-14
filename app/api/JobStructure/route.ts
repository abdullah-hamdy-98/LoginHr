import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";

/**
 * @method GET
 * @url ~/api/JobStructer
 * @desc GET All jobs with their categories
 * @access private 
 */
export async function GET(request: NextRequest) {
    try {
        const jobs = await prisma.jobTitles.findMany({});

        const jobCategories = await prisma.jobCategory.findMany({
            select: {
                JobCategoryCode: true,
                JobCategory: true
            }
        });

        // Format jobs to include their categories
        const formattedJobs = jobs.map(job => {
            const category = jobCategories.find(cat => cat.JobCategoryCode === job.JobCategoryCode);
            return {
                JobCode: job.JobCode,
                JobTitle: job.JobTitle,
                jobCategoryCode: job.JobCategoryCode,
                JobCategory: category ? category.JobCategory : null // Fallback if no category is found
            };
        });

        return NextResponse.json(formattedJobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
    }
}
