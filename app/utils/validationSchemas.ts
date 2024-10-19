import { z } from 'zod'

export const createChartSchema = z.object({
    EmpCode: z.string()
        .min(4, 'Employee Code must be at least 4 Characters(s)')
        .max(4, 'Employee Code must not exceed 20 Characters(s)'),
    Salary: z.string()
        .min(4, 'Salary must be at least 1000 EGP')
        .max(6, 'Salary must not exceed 999,999 EGP'),
    Job: z.string()
        .min(3, 'Job must be at least 3 Characters (s)')
        .max(20, 'Job must not exceed 20 Characters (s)'),
    Categ: z.string()
        .min(3, 'Category must be at least 3 Characters(s)')
        .max(20, 'Category must not exceed 20 Characters(s)')
})

export const EmpFileSchema = z.object({
    EmpCode: z.string()
        .min(4, 'Employee Code must be at least 4 characters long')
        .max(4, 'Employee Code must not exceed 4 characters'),
    NameAr: z.string()
        .min(8, 'Arabic Name must be at least 8 characters long')
        .max(30, 'Arabic Name must not exceed 30 characters'),
    NameEn: z.string()
        .min(8, 'English Name must be at least 8 characters long')
        .max(30, 'English Name must not exceed 30 characters'),
    Job: z.string()
        .min(2, 'Job title must be at least 2 characters long')
        .max(20, 'Job title must not exceed 20 characters'),
    Category: z.string()
        .min(2, 'Category must be at least 2 characters long')
        .max(20, 'Category must not exceed 20 characters'),
    Company: z.string()
        .min(2, 'Company must be at least 2 characters long')
        .max(20, 'Company must not exceed 20 characters'),
    Bransh: z.string()
        .min(2, 'Branch must be at least 2 characters long')
        .max(25, 'Branch must not exceed 25 characters'),
    Sector: z.string()
        .min(2, 'Sector must be at least 2 characters long')
        .max(25, 'Sector must not exceed 25 characters'),
    DirectManager: z.string()
        .min(4, 'Direct Manager must be at least 4 characters long')
        .max(20, 'Direct Manager must not exceed 20 characters')
});
