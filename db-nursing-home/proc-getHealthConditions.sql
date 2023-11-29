create PROCEDURE [dbo].[getHealthConditions]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	
	select
	[Id]=Id,
	[Name]=[Name]
	from dbo.HealthCondition;
	
END
