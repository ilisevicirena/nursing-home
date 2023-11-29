create proc [dbo].[getAccommodationRequestData]
(
	@PersonId int
)
as 
begin
-- basic person data
	select 
	[Id]=p.Id,
	FirstName,
	LastName,
	[MaidenName]=MaidenLastName,
	[FatherName]=FatherFirstName,
	[MotherName]=MotherFirstName,
	[MotherMaidenName]=MotherMaidenLastName,
	JMBG,
	BirthDate,
	[BirthCountry]=c.[Name],
	[BirthCity]=ct.[Name],
	[BirthMunicipality]=m.[Name],
	[ResidanceCity]=cty.[Name],
	[ResidanceStreet]=ResidanceStreetName,
	ResidanceHouseNumber,
	Telephone,
	Mobile,
	Email,
	DoctorName
	from dbo.Person as p 
	left join dbo.Country as c on p.BirthCountryId=c.Id
	left join dbo.City as ct on p.BirthCityId=ct.Id
	left join dbo.Municipality as m on p.BirthMunicipalityId=m.Id
	left join dbo.City as cty on p.ResidanceCityId=cty.Id
	where p.Id=@PersonId;

	-- obligee to pay data
	select 
	[PayFirstName]=FirstName,
	[PayLastName]=LastName,
	Jmbg,
	[PayTelephone]=Telephone,
	[PayMobile]=Mobile,
	[PayEmail]=Email,
	[PayCity]=cty.[Name],
	[PayStreet]=ResidanceStreetName,
	[PayHouseNumber]=ResidanceHouseNumber
	from dbo.Contact as con 
	left join dbo.City as cty on con.ResidanceCityId=cty.Id
	where con.PersonId=@PersonId and con.IsObligeeToPay=1;

	-- guardian data
	select 
	[GuardianFirstName]=FirstName,
	[GuardianLastName]=LastName,
	Jmbg,
	[GuardianTelephone]=Telephone,
	[GuardianMobile]=Mobile,
	[GuardianEmail]=Email,
	[GuardianCity]=cty.[Name],
	[GuardianStreet]=ResidanceStreetName,
	[GuardianHouseNumber]=ResidanceHouseNumber
	from dbo.Contact as con 
	left join dbo.City as cty on con.ResidanceCityId=cty.Id
	where con.PersonId=@PersonId and con.IsGuardian=1;

	-- health conditions
	select 
	HealthConditionId,
	[Description]
	from dbo.PersonHealthConditionRelation
	where PersonId=@PersonId;

	-- person category
	select 
	PersonCategoryId	
	from dbo.PersonCategoryRelation
	where PersonId=@PersonId;

	-- person accommodation type
	select 
	AccommodationTypeId	
	from dbo.PersonAccommodationTypeRelation
	where PersonId=@PersonId;
end