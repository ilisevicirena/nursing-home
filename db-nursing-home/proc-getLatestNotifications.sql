
-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 9.5.2023.
-- Description:	gets first 50 notifications
-- =============================================
CREATE PROCEDURE [dbo].[getLatestNotifications]
	-- Add the parameters for the stored procedure here	
	@UserId UNIQUEIDENTIFIER
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	select top 50 
	[Id]=n.Id,
	[Text]=n.[Text],
	[CreationDate]=n.CreationDate,
	[ReadDate]=n.ReadDate,
	[Read]=n.[Read],
	[NotificationTypeId]=n.NotificationTypeId,
	[TypeCode]=nt.Code,
	[TypeStringKey]=nt.StringKey,
	[LinkId]=n.LinkId,
	[GoToLink]=n.GoToLink
	from dbo.[Notification] as n
	join dbo.NotificationType as nt on n.NotificationTypeId=nt.Id
	where n.UserId=@UserId
	order by n.CreationDate desc;

END


