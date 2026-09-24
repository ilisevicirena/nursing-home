-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 17.9.2026
-- Description: Adds the acting UserId to the Log table so the audit trail records
--              WHO made each change (migration for existing databases).
-- =============================================
ALTER TABLE [dbo].[Log]
ADD [UserId] [char](36) NULL;
