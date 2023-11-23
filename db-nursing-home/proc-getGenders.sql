-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 23.4.2023.
-- Description:	gets all genders
-- =============================================
CREATE PROCEDURE [dbo].[getGenders] 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT 
	[Id]=Id,
	[Name]=Name,
	[Tag]=Tag
	from dbo.Gender;
END