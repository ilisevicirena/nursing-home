-- Author:		Irena Ilisevic
-- Create date: 25.4.2024.
-- Description:	updates furniture status
-- =============================================
CREATE PROCEDURE [dbo].[updateFurnitureStatus]
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
	UPDATE dbo.FurnitureStatus
	SET [Name]=@Name,
	[Color]=@Color
	WHERE Id=@Id;

END