-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 21.4.2023
-- Description:	gets all contacts for person
-- =============================================
CREATE PROCEDURE [dbo].[getContacts] 
	-- Add the parameters for the stored procedure here
	(
		@PersonId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT 
	[Id]=Id,
	[FirstName]=FirstName,
	[LastName]=LastName,
	[Email]=Email,
	[Telephone]=Telephone,
	[Mobile]=Mobile
	FROM dbo.Contact WHERE PersonId=@PersonId;
END