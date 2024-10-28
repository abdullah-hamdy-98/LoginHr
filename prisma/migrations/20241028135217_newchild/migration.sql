/*
  Warnings:

  - A unique constraint covering the columns `[ChildID]` on the table `HierarchyStructure` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[HierarchyStructure] ADD CONSTRAINT [HierarchyStructure_ChildID_key] UNIQUE NONCLUSTERED ([ChildID]);

-- AddForeignKey
ALTER TABLE [dbo].[EmpFiles] ADD CONSTRAINT [EmpFiles_L1_Hierarchy_fkey] FOREIGN KEY ([L1_Hierarchy]) REFERENCES [dbo].[HierarchyStructure]([ChildID]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
