create PROCEDURE [dbo].[getHealthConditionsForPerson]
	-- Add the parameters for the stored procedure here
	(
		@PersonId int
	)
AS
BEGIN
	
	select
	[Id]=phcr.Id,
	[HealthConditionId]=phcr.HealthConditionId,
	[HealthConditionName]=h.[Name],
	[Description]=phcr.[Description]
	from dbo.PersonHealthConditionRelation as phcr
	left join dbo.HealthCondition as h on h.Id=phcr.HealthConditionId
	LEFT join dbo.Person as p on p.Id=phcr.PersonId where phcr.PersonId=@PersonId;
	
END
