-- Author:		Irena Ilisevic
-- Create date: 2.6.2023.
-- Description:	updates tag
-- =============================================
CREATE PROCEDURE [dbo].[updateTag]
	-- Add the parameters for the stored procedure here
	(
		@Id int,
		@Name varchar(50),
		@Color varchar(50)
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE dbo.NotesTag
	SET [Name]=@Name,
	[Color]=@Color
	WHERE Id=@Id;

END