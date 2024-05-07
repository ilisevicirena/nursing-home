-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 7.5.2024.
-- Description:	deletes furniture from room
-- =============================================
CREATE PROCEDURE [dbo].[removeFurnitureFromRoom]
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
	update dbo.Furniture
	set RoomId=NULL
	where Id=@Id;

END

