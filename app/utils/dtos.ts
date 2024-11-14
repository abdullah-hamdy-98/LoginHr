export interface NewChartDto {
    EmpCode: string,
    Salary: string,
    Job: string,
    Categ: string
}

export interface createEmpFileDto {
    EmpImg?: string,
    EmpCode?: string,
    NameAR?: string,
    NameEN: string,
    JobCode?: string,
    JobCategoryCode?: number,
    L1_Hierarchy?: string,
    L2_Hierarchy?: string,
    L3_Hierarchy?: string,
    L1_Geo?: string,
    L2_Geo?: string,
    L3_Geo?: string
}

export interface updateEmpFileDto {
    EmpImg?: string,
    EmpCode?: string,
    NameAR?: string,
    NameEN?: string,
    JobCode?: string,
    JobCategoryCode?: number,
    L1_Hierarchy?: string,
    L2_Hierarchy?: string,
    L3_Hierarchy?: string,
    L1_Geo?: string,
    L2_Geo?: string,
    L3_Geo?: string
}

export interface Props {
    params: { empCode: string }
}


export interface JobTitle {
    Id: number;
    JobCode: string;
    JobTitle: string;
    JobCategoryCode: number;
}

export interface JobCategory {
    Id: number;
    JobCategoryCode: number;
    JobCategory: string;
}

export interface Employee {
    Id: number;
    EmpCode: string;
    NameEN: string;
    NameAR: string;
    EmpImg: string;
    JobCode: string;
    JobCategoryCode: number;
    L1_Hierarchy: string;
    L2_Hierarchy: string;
    L3_Hierarchy: string;
    L1_HierarchyDesc: string;
    L2_HierarchyDesc: string;
    L3_HierarchyDesc: string;
    L1_Geo: string;
    L2_Geo: string;
    L3_Geo: string;
    L1_GeoDesc: string;
    L2_GeoDesc: string;
    L3_GeoDesc: string;
    EntryDate: string;
    UpdateDate: string;
    jobTitle: JobTitle;
    JobCategory: JobCategory;
}


export interface JobStructure {
    JobCode: string;
    JobTitle: string;
    JobCategory: string;
    JobCategoryCode: number;
}

export interface HierStructureItem {
    Id: number;
    HierID: string;
    Description: string;
    ParentID: string;
    ChildID: string;
}

export interface GeoStructureItem {
    Id: number;
    GeoID: string;
    Description: string;
    ParentID: string;
    ChildID: string;
}