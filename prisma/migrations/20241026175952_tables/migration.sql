BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[EmpFiles] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [EmpCode] NVARCHAR(15) NOT NULL,
    [NameEN] NVARCHAR(35) NOT NULL,
    [NameAR] NVARCHAR(35),
    [EmpImg] NVARCHAR(50),
    [JobCode] NVARCHAR(3),
    [JobCategoryCode] INT,
    [L1_Hierarchy] NVARCHAR(15),
    [L2_Hierarchy] NVARCHAR(15),
    [L3_Hierarchy] NVARCHAR(15),
    [L1_Geo] NVARCHAR(15),
    [L2_Geo] NVARCHAR(15),
    [L3_Geo] NVARCHAR(15),
    [EntryDate] DATETIME2 NOT NULL CONSTRAINT [EmpFiles_EntryDate_df] DEFAULT CURRENT_TIMESTAMP,
    [UpdateDate] DATETIME2 NOT NULL,
    CONSTRAINT [EmpFiles_pkey] PRIMARY KEY CLUSTERED ([Id],[EmpCode]),
    CONSTRAINT [EmpFiles_EmpCode_key] UNIQUE NONCLUSTERED ([EmpCode])
);

-- CreateTable
CREATE TABLE [dbo].[JobTitles] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [JobCode] NVARCHAR(3) NOT NULL,
    [JobTitle] NVARCHAR(25) NOT NULL,
    [JobCategoryCode] INT NOT NULL,
    CONSTRAINT [JobTitles_pkey] PRIMARY KEY CLUSTERED ([Id],[JobCode]),
    CONSTRAINT [JobTitles_JobCode_key] UNIQUE NONCLUSTERED ([JobCode])
);

-- CreateTable
CREATE TABLE [dbo].[JobCategory] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [JobCategoryCode] INT NOT NULL,
    [JobCategory] NVARCHAR(15) NOT NULL,
    CONSTRAINT [JobCategory_pkey] PRIMARY KEY CLUSTERED ([Id],[JobCategoryCode]),
    CONSTRAINT [JobCategory_JobCategoryCode_key] UNIQUE NONCLUSTERED ([JobCategoryCode])
);

-- CreateTable
CREATE TABLE [dbo].[HierarchyStructure] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Description] NVARCHAR(25) NOT NULL,
    [ParentID] NVARCHAR(15) NOT NULL,
    [ChildID] NVARCHAR(15) NOT NULL,
    CONSTRAINT [HierarchyStructure_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[GeoStructure] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Description] NVARCHAR(25) NOT NULL,
    [ParentID] NVARCHAR(15) NOT NULL,
    [ChildID] NVARCHAR(15) NOT NULL,
    CONSTRAINT [GeoStructure_pkey] PRIMARY KEY CLUSTERED ([Id])
);

-- AddForeignKey
ALTER TABLE [dbo].[EmpFiles] ADD CONSTRAINT [EmpFiles_JobCode_fkey] FOREIGN KEY ([JobCode]) REFERENCES [dbo].[JobTitles]([JobCode]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
