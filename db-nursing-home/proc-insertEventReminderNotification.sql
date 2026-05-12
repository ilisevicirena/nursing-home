CREATE PROCEDURE [dbo].[insertEventReminderNotification]
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Today DATE = CAST(DATEADD(hour, 2, GETDATE()) AS DATE);

    -- Check if notification type "reminders" is enabled for the user
    DECLARE @isReminderEnabled BIT;
    DECLARE @DaysReminder INT;
    SELECT 
        @isReminderEnabled = [Enabled],
        @DaysReminder = [DaysReminder]
    FROM dbo.UserNotificationTypeSettings
    WHERE UserId = @UserId
      AND NotificationTypeId = 2; -- Assuming reminder type has NotificationTypeId = 2

    -- Proceed only if reminders are enabled
    IF @isReminderEnabled = 1
    BEGIN
        -- Insert notifications for events before the specified number of days
        INSERT INTO dbo.[Notification] (UserId, NotificationTypeId, CreationDate, ReadDate, [Read], [Text], LinkId, GoToLink)
        SELECT 
            @UserId,
            nt.id AS NotificationTypeId,
            @Today AS CreationDate,
            NULL AS ReadDate,
            0 AS [Read],
            CONCAT('Događaj: ', ce.title, ' je za ', @DaysReminder, ' dana!') AS [Text],
            pl.Id AS LinkId,
            pl.Link AS GoToLink
        FROM 
            dbo.CalendarEvent ce
        INNER JOIN 
            dbo.NotificationType nt ON nt.Code = 'reminders'
        INNER JOIN
            dbo.PageLink pl ON pl.Code = 'calendar'
        WHERE 
            ce.Reminder = 1
            AND (
                -- Non-recurring events
                (ce.Recurring = 0 AND CAST(ce.[Start] AS DATE) >= DATEADD(DAY, @DaysReminder, @Today))
                OR
                -- Recurring events (ignore year)
                (
                    ce.Recurring = 1 
                    AND DATEPART(DAYOFYEAR, ce.[Start]) >= DATEPART(DAYOFYEAR, DATEADD(DAY, @DaysReminder, @Today))
                )
            )
            AND nt.[Enabled] = 1;

        -- Insert notifications for events that start on the current day
        INSERT INTO dbo.[Notification] (UserId, NotificationTypeId, CreationDate, ReadDate, [Read], [Text], LinkId, GoToLink)
        SELECT 
            @UserId,
            nt.id AS NotificationTypeId,
            @Today AS CreationDate,
            NULL AS ReadDate,
            0 AS [Read],
            CONCAT('Događaj: ', ce.title, ' je danas!') AS [Text],
            pl.Id AS LinkId,
            pl.Link AS GoToLink
        FROM 
            dbo.CalendarEvent ce
        INNER JOIN 
            dbo.NotificationType nt ON nt.Code = 'reminders'
        INNER JOIN
            dbo.PageLink pl ON pl.Code = 'calendar'
        WHERE 
            ce.Reminder = 1
            AND (
                CAST(ce.[Start] AS DATE) = @Today
                OR
                (
                    ce.Recurring = 1
                    AND DATEPART(DAYOFYEAR, ce.[Start]) = DATEPART(DAYOFYEAR, @Today)
                )
            )
            AND nt.[Enabled] = 1;
    END
END
