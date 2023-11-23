-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 14.4.2023.
-- Description:	Inserts new floor to Floor table
-- =============================================
CREATE PROCEDURE [dbo].[insertFloor]
	-- Add the parameters for the stored procedure here
	(	
	@Name varchar(50)
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO dbo.Floor(Name)
	VALUES(@Name)
	
	SELECT SCOPE_IDENTITY() AS FloorId
END