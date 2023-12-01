
-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 21.6.2023.
-- Description:	removes all events for person
-- =============================================
CREATE PROCEDURE [dbo].[removeAllEventsForPerson] 
	-- Add the parameters for the stored procedure here
	(
	@PersonId int,
	@EventTypeId int=NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
IF @EventTypeId IS NULL begin
    delete from dbo.CalendarEvent where PersonId=@PersonId;
	End
	else begin
	delete from dbo.CalendarEvent where PersonId=@PersonId and @EventTypeId=@EventTypeId;
	end
END