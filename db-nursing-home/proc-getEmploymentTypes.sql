create proc [dbo].[getEmploymentTypes]
as
begin
	select 
	Id,
	[Name]	
	from dbo.EmploymentType;
end