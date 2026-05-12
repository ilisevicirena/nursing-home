-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 19.6.2023.
-- Description:	gets all notification types
-- =============================================
CREATE PROCEDURE [dbo].[getNotificationTypes]
	-- Add the parameters for the stored procedure here
	@UserId UNIQUEIDENTIFIER
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT 
	[Id]=unts.[NotificationTypeId],
	[Code]=nt.[Code],
	[Name]=nt.[Name],
	[StringKey]=nt.[StringKey]
	from 
	dbo.UserNotificationTypeSettings as unts
	left join dbo.NotificationType as nt on unts.NotificationTypeId=nt.Id	
	where unts.[Enabled]=1 and unts.UserId=@UserId;

END