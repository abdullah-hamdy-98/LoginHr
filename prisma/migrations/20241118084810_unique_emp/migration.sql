/*
  Warnings:

  - A unique constraint covering the columns `[EmpCode]` on the table `EmpFiles` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[EmpFiles] ADD CONSTRAINT [EmpFiles_EmpCode_key] UNIQUE NONCLUSTERED ([EmpCode]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
