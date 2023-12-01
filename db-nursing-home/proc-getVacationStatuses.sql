CREATE PROCEDURE [dbo].[getVacationStatuses]

AS
BEGIN
	select 
	Id,
	[Name],
	Color,
	Icon
	from dbo.VacationStatus;
END