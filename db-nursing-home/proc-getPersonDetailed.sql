-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 21.4.2023.
-- Description:	Gets all data for person
-- =============================================
CREATE PROCEDURE [dbo].[getPersonDetailed]
	-- Add the parameters for the stored procedure here
	(
		@Id int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here

		
	select [Id] = p.Id,
		[FirstName]=p.FirstName,
		[LastName]=p.LastName,
		[JMBG]=p.JMBG,
		[BirthDate]=p.BirthDate,
		[Active]=p.Active,
		[StartDate]=p.StartDate,
		[EndDate]=p.EndDate,
		[CreationDate]=p.CreationDate,
		[RoomId]=r.Id,
		[RoomName]=r.[Name],
		[FloorId]=f.Id,
		[FloorName]=f.[Name],
		[Address]=p.[Address],
		[GenderId]=GenderId,
		[GenderName]=g.[Name],
		[GenderTag]=g.Tag,
        [MaidenLastName]=p.[MaidenLastName],
        [FatherFirstName]=p.[FatherFirstName],
        [MotherFirstName]=p.[MotherFirstName],
        [MotherMaidenLastName]=p.[MotherMaidenLastName],
        [BirthCityId]=p.[BirthCityId],
        [BirthCity]=c.[Name],
        [BirthMunicipalityId]=p.[BirthMunicipalityId],
        [BirthMunicipality]=m.[Name],
        [BirthCountryId]=p.[BirthCountryId],
        [BirthCountry]=ct.[Name],
        [ResidanceCityId]=p.[ResidanceCityId], 
        [ResidanceCity]=city.[Name],
        [ResidanceStreetName]=p.[ResidanceStreetName],
        [ResidanceHouseNumber]=p.[ResidanceHouseNumber],
        [Telephone]=p.[Telephone],
        [Mobile]=p.[Mobile],
        [Email]=p.[Email],
        [DoctorName]=p.[DoctorName]        
		from dbo.Person as p
left join dbo.PersonRoomRelation as prr on prr.PersonId=p.Id and prr.Active=1
left join dbo.Room as r on prr.RoomId=r.Id 
left join dbo.[Floor] as f on r.FloorId=f.Id
left join dbo.Gender as g on p.GenderId=g.Id
left join dbo.City as c on c.Id=p.BirthCityId
left join dbo.Municipality as m on m.Id=p.BirthMunicipalityId
left join dbo.Country as ct on ct.Id=p.BirthCountryId
left join dbo.City as city on city.Id=p.ResidanceCityId
where p.Id=@Id
	
END