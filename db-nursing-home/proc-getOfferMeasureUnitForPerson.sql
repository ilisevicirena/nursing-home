-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 14.6.2023.
-- Description:	gets offer measure unit for person
-- =============================================
CREATE PROCEDURE [dbo].[getOfferMeasureUnitForPerson]
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
	[Id]=por.Id,
	[PersonId]=por.PersonId,
	[MeasureUnitId]=por.MeasureUnitId,
	[MeasureUnitName]=mu.[Name],
	[MeasureUnitTag]=mu.Tag,
	[MeasureUnitCode]=mu.Code
	from dbo.PersonOfferRelation as por
	left join dbo.MeasureUnit as mu on por.MeasureUnitId=mu.Id where por.PersonId=@PersonId;
END