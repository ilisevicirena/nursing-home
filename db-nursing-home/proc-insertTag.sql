-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.6.2023.
-- Description:	inserts new notes tag
-- =============================================
CREATE PROCEDURE [dbo].[insertTag] 
	-- Add the parameters for the stored procedure here
	(
		@Name varchar(50),
		@Color varchar(50) = NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO dbo.NotesTag ([Name], Color, Active) VALUES (@Name, @Color, 1);

	SELECT SCOPE_IDENTITY() AS [NotesTagId];
END