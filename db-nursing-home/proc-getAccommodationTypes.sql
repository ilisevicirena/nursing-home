create proc [dbo].[getAccommodationTypes]
as 
begin
	select 
	[Id]=[Id],
	[Name]=[Name],
	[Capacity]=[Capacity]
	from dbo.AccommodationType;
end