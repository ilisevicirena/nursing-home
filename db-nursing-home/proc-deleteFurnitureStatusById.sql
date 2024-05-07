-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 7.5.2024.
-- Description:	deletes furniture status by id
-- =============================================
CREATE PROCEDURE [dbo].[deleteFurnitureStatusById]
	-- Add the parameters for the stored procedure here
	(
		@Id int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	delete from dbo.FurnitureFurnitureStatusRelation where Id=@Id;
END

