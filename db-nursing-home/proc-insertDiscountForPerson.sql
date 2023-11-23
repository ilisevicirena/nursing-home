-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 23.5.2023.
-- Description:	inserts discount for person
-- =============================================
CREATE PROCEDURE [dbo].[insertDiscountForPerson]
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

    -- Insert statements for procedure here
	INSERT INTO dbo.PersonDiscountRelation(PersonId, DiscountId, StartDate, EndDate, Active)
	VALUES (@PersonId, @DiscountId, GETDATE(), NULL, 1);

	SELECT SCOPE_IDENTITY() AS [RowId];
END