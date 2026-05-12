create PROCEDURE [dbo].[getEmployee]
	(
		@Id int
	)
AS
BEGIN
	SET NOCOUNT ON;

	select 
		[Id] = e.Id,
		[FirstName]=e.FirstName,
		[LastName]=e.LastName,
		[JMBG]=e.JMBG,
		[BirthDate]=e.BirthDate,
		[Active]=e.Active,
		[EmploymentDate]=e.EmploymentDate,
		[EmploymentEndDate]=e.EmploymentEndDate,		
		[GenderId]=GenderId,
		[GenderName]=g.[Name],
		[GenderTag]=g.Tag,
		[Telephone]=e.[Telephone],
        [Mobile]=e.[Mobile],
        [Email]=e.[Email],
		[ResidanceCityId]=e.[ResidanceCityId], 
        [ResidanceCity]=city.[Name],
        [ResidanceStreetName]=e.[ResidanceStreetName],
        [ResidanceHouseNumber]=e.[ResidanceHouseNumber],
		[BankName]=e.BankName,
		[BankAccountNumber]=e.BankAccountNumber,
		[FatherName]=e.[FatherName],
		[BirthCityId]=e.[BirthCityId],
        [BirthCity]=c.[Name],
        [BirthMunicipalityId]=e.[BirthMunicipalityId],
        [BirthMunicipality]=m.[Name],
        [BirthCountryId]=e.[BirthCountryId],
        [BirthCountry]=ct.[Name],
		[JobPositionId]=e.JobPositionId,
		[JobPositionName]=jp.[Name],
		[JobPositionIcon]=jp.[Icon],
		[EmploymentTypeId]=e.EmploymentTypeId,
		[EmploymentTypeName]=et.[Name],
		[YearsOfExperiance]=e.YearsOfExperiance,
		[DaysOfVacation]=e.DaysOfVacation,
		[SchoolName]=e.SchoolName,
		[SchoolQualificationName]=e.SchoolQualificationName,
		[QualificationId]=e.QualificationId,
		[QualificationName]=q.[Name],
		[UserId]=e.UserId
		from dbo.Employee as e
left join dbo.Gender as g on e.GenderId=g.Id
left join dbo.City as c on c.Id=e.BirthCityId
left join dbo.Municipality as m on m.Id=e.BirthMunicipalityId
left join dbo.Country as ct on ct.Id=e.BirthCountryId
left join dbo.City as city on city.Id=e.ResidanceCityId
left join dbo.JobPosition as jp on e.JobPositionId=jp.Id
left join dbo.EmploymentType as et on e.EmploymentTypeId=et.Id
left join dbo.Qualification as q on e.QualificationId=q.Id
where e.Id=@Id
	
	
END