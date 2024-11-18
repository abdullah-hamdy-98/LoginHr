BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[EmpFiles] DROP CONSTRAINT [EmpFiles_EmpCode_key];

-- AlterTable
ALTER TABLE [dbo].[EmpFiles] ALTER COLUMN [NameEN] NVARCHAR(35) NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH