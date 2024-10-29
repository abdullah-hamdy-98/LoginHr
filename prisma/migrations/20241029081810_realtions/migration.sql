BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[EmpFiles] DROP CONSTRAINT [EmpFiles_L1_Hierarchy_fkey];

-- AlterTable
ALTER TABLE [dbo].[EmpFiles] ADD [L1_GeoDesc] NVARCHAR(25),
[L1_HierarchyDesc] NVARCHAR(25),
[L2_GeoDesc] NVARCHAR(25),
[L2_HierarchyDesc] NVARCHAR(25),
[L3_GeoDesc] NVARCHAR(25),
[L3_HierarchyDesc] NVARCHAR(25);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
