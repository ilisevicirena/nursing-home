create proc [dbo].[getJobPositions]
as
begin
	select 
	Id,
	[Name]	
	from dbo.JobPosition;
end