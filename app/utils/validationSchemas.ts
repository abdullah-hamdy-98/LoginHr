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
    NameEN: z.string()
        .min(8, 'English Name must be at least 8 characters long')
        .max(30, 'English Name must not exceed 30 characters')
});
