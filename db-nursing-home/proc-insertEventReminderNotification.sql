-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 22.06.2023.
-- Description:	inserts notification for event reminders
-- =============================================
CREATE PROCEDURE [dbo].[insertEventReminderNotification]
AS
BEGIN
     DECLARE @Today DATE = CAST(DATEADD(hour, 2, GETDATE()) AS DATE);

-- Insert notifications for events before the specified number of days
-- Insert notifications for events before the specified number of days
INSERT INTO dbo.[Notification] (NotificationTypeId, CreationDate, ReadDate, [Read], [Text], LinkId, GoToLink)
SELECT 
    nt.id AS NotificationTypeId,
    @Today AS CreationDate,
    NULL AS ReadDate,
    0 AS [Read],
    CONCAT('Događaj: ', ce.title, ' je za ', nt.DaysReminder, ' dana!') AS [Text],
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
        (ce.Recurring = 0 AND CAST(ce.[Start] AS DATE) >= DATEADD(DAY, nt.DaysReminder, @Today))
        OR
        -- Recurring events (ignore year)
        (
            ce.Recurring = 1 
            AND DATEPART(DAYOFYEAR, ce.[Start]) >= DATEPART(DAYOFYEAR, DATEADD(DAY, nt.DaysReminder, @Today))
        )
    )
    AND nt.[Enabled] = 1;


    -- Insert notifications for events that start on the current day and reminders are enabled
    INSERT INTO dbo.[Notification] (NotificationTypeId, CreationDate, ReadDate, [Read], [Text], LinkId, GoToLink)
    SELECT 
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
END;