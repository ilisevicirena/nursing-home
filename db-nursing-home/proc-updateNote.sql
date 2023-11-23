-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.6.2023.
-- Description:	update note
-- =============================================
CREATE PROCEDURE [dbo].[updateNote] 
	-- Add the parameters for the stored procedure here
	(
		@Id int,
		@Title varchar(1000),
		@Text varchar(max)
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE dbo.Note 
	SET Title=@Title,
	[Text]=@Text,
	[LastModified]=CAST(DATEADD(hour, 2, GETDATE()) AS DATE)
	WHERE Id=@Id;

END