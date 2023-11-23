-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 24.4.2023
-- Description:	deactivate room for person
-- =============================================
CREATE PROCEDURE [dbo].[deactivateRoomPerson]
	-- Add the parameters for the stored procedure here
	(
		@PersonId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	Update dbo.PersonRoomRelation set Active=0, EndDate=CAST(DATEADD(hour, 2, GETDATE()) AS DATE) where PersonId=@PersonId;
END