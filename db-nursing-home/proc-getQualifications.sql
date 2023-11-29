create proc [dbo].[getQualifications]
as
begin
	select 
	Id,
	[Name],
	Degree
	from dbo.Qualification;
end