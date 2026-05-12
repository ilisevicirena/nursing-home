-- Author:		Irena Ilisevic
-- Create date: 25.4.2024.
-- Description:	updates furniture status
-- =============================================
CREATE PROCEDURE [dbo].[updateFurnitureStatus]
	-- Add the parameters for the stored procedure here
	(
		@Id int,
		@Name varchar(50),
		@Color varchar(10),
		@Icon varchar(50),
    @ActingUserId NCHAR(36) = NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE dbo.FurnitureStatus
	SET [Name]=@Name,
	[Color]=@Color,
	[Icon]=@Icon
	WHERE Id=@Id;

	EXEC dbo.logUserActivity 'UPDATE_FURNITURE_STATUS', 'Furniture status type updated', @ActingUserId;
END