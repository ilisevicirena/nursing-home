-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 25.4.2024.
-- Description:	inserts new furniture status
-- =============================================
CREATE PROCEDURE [dbo].[insertFurnitureStatus] 
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
	INSERT INTO dbo.FurnitureStatus ([Name], Color, Active) VALUES (@Name, @Color, 1);

	SELECT SCOPE_IDENTITY() AS [FurnitureStatusId];
END