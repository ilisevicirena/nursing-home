CREATE PROCEDURE [dbo].[dailyNotificationCheck]
	-- Add the parameters for the stored procedure here	
	@UserId uniqueidentifier
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DECLARE @TodayDate DATE = CONVERT(DATE, GETDATE())
	DECLARE @RowCount INT

-- Check if a row with today's date exists
IF EXISTS (SELECT 1 FROM dbo.NotificationsChecked WHERE CONVERT(DATE, [Date]) = @TodayDate and UserId=@UserId)
BEGIN
    -- Row with today's date exists, perform necessary actions
    -- Replace the following code with your desired actions
    PRINT 'Row with today''s date exists'
    -- End of actions
END
ELSE
BEGIN
   exec dbo.insertAnniversaryNotifications @UserId;
   exec dbo.insertBirthdayNotifications @UserId;
   exec dbo.insertEventReminderNotification @UserId;
   exec dbo.insertCalculationNotification @UserId;
   exec dbo.checkVacationForUpdate;
    
    -- End of actions

    -- Insert a new row with the current date
    INSERT INTO dbo.NotificationsChecked ([Date], UserId) VALUES (GETDATE(), @UserId)
END

-- Get the row count
SELECT @RowCount = COUNT(*) FROM dbo.NotificationsChecked where UserId=@UserId;

-- Check if the row count exceeds 50
IF @RowCount > 50
BEGIN
    -- Delete all rows except the one with today's date
    DELETE FROM dbo.NotificationsChecked WHERE CONVERT(DATE, [Date]) != @TodayDate and UserId=@UserId;
END
END