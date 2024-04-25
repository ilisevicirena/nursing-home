-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 25.4.2024.
-- Description:	gets all active furniture statuses
-- =============================================
CREATE PROCEDURE [dbo].[getFurnitureStatuses] 
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
	FROM dbo.FurnitureStatus WHERE Active=1;

END

