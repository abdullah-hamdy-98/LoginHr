export interface NewChartDto {
    EmpCode: string,
    Salary: string,
    Job: string,
    Categ: string
}

export interface createEmpFileDto {
    EmpImg?: string,
    EmpCode: string,
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
    L1_Geo: string;
    L2_Geo: string;
    L3_Geo: string;
    EntryDate: string;
    UpdateDate: string;
    jobTitle: JobTitle;
    JobCategory: JobCategory;
  }