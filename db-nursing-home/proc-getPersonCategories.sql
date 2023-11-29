create PROCEDURE [dbo].[getPersonCategories]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	
	select
	[Id]=Id,
	[Name]=[Name],
    [Description]=[Description]
	from dbo.PersonCategory;
	
END
