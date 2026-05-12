-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 21.6.2023.
-- Description:	gets notifications settings
-- =============================================
CREATE PROCEDURE [dbo].[getNotificationsSettings]
	-- Add the parameters for the stored procedure here
	@UserId UNIQUEIDENTIFIER
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   	select 
	Id=unts.Id,
	[NotificationTypeId]=unts.NotificationTypeId,
	[Name]=nt.[Name],
	[Code]=nt.[Code],
	[Enabled]=unts.[Enabled],
	[DaysReminder]=unts.[DaysReminder],
	[StringKey]=nt.StringKey
	from dbo.UserNotificationTypeSettings as unts 
	left join dbo.NotificationType as nt on unts.NotificationTypeId=nt.Id
	where unts.UserId=@UserId;
END