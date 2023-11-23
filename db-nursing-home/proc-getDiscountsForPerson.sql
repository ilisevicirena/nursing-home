-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 23.5.2023.
-- Description:	gets discounts for person
-- =============================================
CREATE PROCEDURE [dbo].[getDiscountsForPerson]
	-- Add the parameters for the stored procedure here
	(
		@PersonId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	select
	[Id]=pdr.DiscountId,
	[Name]=d.[Name],
	[Description]=d.[Description],
	[Quantity]=d.Quantity,
	[PercentCalculation]=d.PercentCalculation
	from
	dbo.PersonDiscountRelation as pdr
	join dbo.Discount as d 
	on pdr.DiscountId=d.Id
	where pdr.PersonId=@PersonId and pdr.Active=1;
END