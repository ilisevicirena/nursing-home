-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 19.6.2023.
-- Description:	gets all notification types
-- =============================================
CREATE PROCEDURE [dbo].[getNotificationTypes]
	-- Add the parameters for the stored procedure here

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 
	[Id]=[Id],
	[Code]=[Code],
	[Name]=[Name],
	[StringKey]=[StringKey]
	from dbo.NotificationType where [Enabled]=1;

END