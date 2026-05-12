-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 9.5.2023.
-- Description:	checks if there any unread notification
-- =============================================
CREATE PROCEDURE [dbo].[checkNotificationsStatus]
	-- Add the parameters for the stored procedure here	
	@UserId UNIQUEIDENTIFIER
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	select [NotificationNumber]=isnull(t1.NotificationsNumber,0)
	from (select count(Id) as NotificationsNumber from dbo.[Notification] where [Read]=0 and UserId=@UserId) as t1;
END