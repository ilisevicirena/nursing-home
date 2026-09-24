-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 28.4.2023
-- Description:	creates new log row
-- =============================================
CREATE PROCEDURE [dbo].[writeLog]
	-- Add the parameters for the stored procedure here
	(
		@LogType varchar(50),
		@LogEntity varchar(50),
		@Key int,
		@UserId char(36) = NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	-- Prefer explicit param; fall back to SESSION_CONTEXT (set by PS1 bulk scripts)
	DECLARE @ActingUser char(36) = ISNULL(@UserId, CAST(SESSION_CONTEXT(N'UserId') AS char(36)));

    -- Insert statements for procedure here
	 INSERT INTO dbo.Log (LogTypeId, LogEntityId, KeyId, UserId, CreationDate)
    SELECT
        (SELECT Id FROM dbo.LogType WHERE [Name] = @LogType),
        (SELECT Id FROM dbo.LogEntity WHERE [Name] = @LogEntity),
        @Key,
        @ActingUser,
        GETDATE();
END