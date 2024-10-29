/*
  Warnings:

  - A unique constraint covering the columns `[GeoID]` on the table `GeoStructure` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[HierID]` on the table `HierarchyStructure` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `GeoID` to the `GeoStructure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `HierID` to the `HierarchyStructure` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[GeoStructure] ADD [GeoID] NVARCHAR(15) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[HierarchyStructure] ADD [HierID] NVARCHAR(15) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[GeoStructure] ADD CONSTRAINT [GeoStructure_GeoID_key] UNIQUE NONCLUSTERED ([GeoID]);

-- CreateIndex
ALTER TABLE [dbo].[HierarchyStructure] ADD CONSTRAINT [HierarchyStructure_HierID_key] UNIQUE NONCLUSTERED ([HierID]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
