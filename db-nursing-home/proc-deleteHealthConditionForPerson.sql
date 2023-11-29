create PROCEDURE [dbo].[deleteHealthConditionsForPerson]
	-- Add the parameters for the stored procedure here
	(
		@Id int
	)
AS
BEGIN
	
	delete from dbo.PersonHealthConditionRelation
	where Id=@Id;
	
END
