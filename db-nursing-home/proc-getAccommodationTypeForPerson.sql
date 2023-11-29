create proc [dbo].[getAccommodationTypeForPerson]
(
	@PersonId int
)
as 
begin
	select 
	[Id]=patr.Id,
	[AccommodationTypeId]=patr.AccommodationTypeId,
	[AccommodationTypeName]=acc.[Name],
	[AccommodationTypeCapacity]=acc.Capacity
	from dbo.PersonAccommodationTypeRelation as patr
	left join dbo.AccommodationType as acc on patr.AccommodationTypeId=acc.Id
	where patr.PersonId=@PersonId;
end