-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 13.4.2023
-- Description:	Select all floors.
-- =============================================
CREATE PROCEDURE [dbo].[getFloors]
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
SELECT 
		[Id] = Id,
		[Name] = Name		
	FROM [dbo].[Floor]
END