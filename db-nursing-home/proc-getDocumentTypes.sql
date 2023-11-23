-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 30.5.2023.
-- Description:	gets all document types
-- =============================================
CREATE PROCEDURE [dbo].[getDocumentTypes]
	-- Add the parameters for the stored procedure here

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT 
	[Id]=Id,
	[Name]=[Name]
	FROM dbo.DocumentType;

END