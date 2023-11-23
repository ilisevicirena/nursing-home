-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 23.5.2023.
-- Description:	deactivates discount for person
-- =============================================
CREATE PROCEDURE [dbo].[deactivateDiscountForPerson]
	-- Add the parameters for the stored procedure here
	(
		@DiscountId int,
		@PersonId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	update dbo.PersonDiscountRelation
	set Active=0,
	EndDate=CAST(DATEADD(hour, 2, GETDATE()) AS DATE)
	where DiscountId=@DiscountId and PersonId=@PersonId;
END