-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 21.6.2023
-- Description:	update notification type
-- =============================================
CREATE PROCEDURE [dbo].[updateNotificationType]
	-- Add the parameters for the stored procedure here
(
	@Id int,
	@Enabled bit,
	@DaysReminder int,
	@ActingUserId NCHAR(36) = NULL
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	update dbo.UserNotificationTypeSettings
	set 
	[Enabled]=@Enabled,
	[DaysReminder]=@DaysReminder
	where Id=@Id;

	EXEC dbo.logUserActivity 'UPDATE_NOTIFICATION_TYPE', 'Notification type updated', @ActingUserId;

END