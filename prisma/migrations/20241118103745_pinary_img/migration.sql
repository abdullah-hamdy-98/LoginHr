/*
  Warnings:

  - The `EmpImg` column on the `EmpFiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[EmpFiles] DROP COLUMN [EmpImg];
ALTER TABLE [dbo].[EmpFiles] ADD [EmpImg] VARBINARY(max);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
