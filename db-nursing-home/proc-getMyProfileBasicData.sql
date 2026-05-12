create PROCEDURE [dbo].[getMyProfileBasicData]
	@UserId uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

	declare @FirstLogin datetime;
	declare @LastPasswordChange datetime;
	declare @LastDataChange datetime;
	declare @UnreadNotifications int = 0;

	select top 1 @FirstLogin = [Timestamp]
	from dbo.UserActivity
	where UserId=@UserId and ActivityType='LOGIN' order by [Timestamp];

	select top 1 @LastPasswordChange = [Timestamp]
	from dbo.UserActivity
	where UserId=@UserId and ActivityType='PASSWORD_RESET' order by [Timestamp] desc;

	select top 1 @LastDataChange = [Timestamp]
	from dbo.UserActivity
	where UserId=@UserId and ActivityType='USER_UPDATE' order by [Timestamp] desc;

	select @UnreadNotifications = count(*) from dbo.[Notification] where UserId=@UserId and [Read]=0;

	select @FirstLogin as FirstLogin, @LastPasswordChange as LastPasswordChange, @LastDataChange as LastDataChange, @UnreadNotifications as UnreadNotifications;
END
