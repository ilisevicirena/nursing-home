create proc [dbo].[getCategoryForPerson]
(
	@PersonId int
)
as 
begin
	select 
	[Id]=patr.Id,
	[PersonCategoryId]=patr.PersonCategoryId,
	[PersonCategoryName]=acc.[Name]
	from dbo.PersonCategoryRelation as patr
	left join dbo.PersonCategory as acc on patr.PersonCategoryId=acc.Id
	where patr.PersonId=@PersonId;
end