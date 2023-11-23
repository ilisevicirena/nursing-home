-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.6.2023.
-- Description:	gets all tags
-- =============================================
CREATE PROCEDURE [dbo].[getNotesTags] 
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 
	[Id]=Id,
	[Name]=[Name],
	[Color]=Color
	FROM dbo.NotesTag WHERE Active=1;

END