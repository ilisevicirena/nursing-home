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
		@Key int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	 INSERT INTO dbo.Log (LogTypeId, LogEntityId, KeyId, CreationDate)
    SELECT
        (SELECT Id FROM dbo.LogType WHERE [Name] = @LogType),
        (SELECT Id FROM dbo.LogEntity WHERE [Name] = @LogEntity),
        @Key,
        GETDATE();
END