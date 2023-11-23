-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.5.2023.
-- Description:	deactivates service for person
-- =============================================
CREATE PROCEDURE [dbo].[deactivateServiceForPerson]
	-- Add the parameters for the stored procedure here
	(
		@ServiceId int,
		@PersonId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	update dbo.PersonServiceRelation
	set Active=0,
	EndDate=CAST(DATEADD(hour, 2, GETDATE()) AS DATE)
	where ServiceId=@ServiceId and PersonId=@PersonId;

END