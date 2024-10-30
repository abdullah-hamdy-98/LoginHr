/*
  Warnings:

  - The primary key for the `EmpFiles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `JobCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `JobTitles` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[EmpFiles] DROP CONSTRAINT [EmpFiles_JobCategoryCode_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[EmpFiles] DROP CONSTRAINT [EmpFiles_JobCode_fkey];

-- AlterTable
ALTER TABLE [dbo].[EmpFiles] DROP CONSTRAINT [EmpFiles_pkey];
ALTER TABLE [dbo].[EmpFiles] ADD CONSTRAINT EmpFiles_pkey PRIMARY KEY CLUSTERED ([Id]);

-- AlterTable
ALTER TABLE [dbo].[JobCategory] DROP CONSTRAINT [JobCategory_pkey];
ALTER TABLE [dbo].[JobCategory] ADD CONSTRAINT JobCategory_pkey PRIMARY KEY CLUSTERED ([Id]);

-- AlterTable
ALTER TABLE [dbo].[JobTitles] DROP CONSTRAINT [JobTitles_pkey];
ALTER TABLE [dbo].[JobTitles] ADD CONSTRAINT JobTitles_pkey PRIMARY KEY CLUSTERED ([Id]);

-- AddForeignKey
ALTER TABLE [dbo].[EmpFiles] ADD CONSTRAINT [EmpFiles_JobCode_fkey] FOREIGN KEY ([JobCode]) REFERENCES [dbo].[JobTitles]([JobCode]) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[EmpFiles] ADD CONSTRAINT [EmpFiles_JobCategoryCode_fkey] FOREIGN KEY ([JobCategoryCode]) REFERENCES [dbo].[JobCategory]([JobCategoryCode]) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[JobTitles] ADD CONSTRAINT [JobTitles_JobCategoryCode_fkey] FOREIGN KEY ([JobCategoryCode]) REFERENCES [dbo].[JobCategory]([JobCategoryCode]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
