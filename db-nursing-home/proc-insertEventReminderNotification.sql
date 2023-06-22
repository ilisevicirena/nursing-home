-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 22.06.2023.
-- Description:	inserts notification for event reminders
-- =============================================
CREATE PROCEDURE [dbo].[insertEventReminderNotification]
AS
BEGIN
    DECLARE @Today DATE = CONVERT(DATE, GETDATE());

    INSERT INTO dbo.[Notification] (NotificationTypeId, CreationDate, ReadDate, [Read], [Text], LinkId, GoToLink)
    SELECT 
        nt.id AS NotificationTypeId,
        @Today AS CreationDate,
        NULL AS ReadDate,
        0 AS [Read],
        CONCAT('Dogaðaj: ', ce.title, ' je za ', nt.DaysReminder, ' dana!') AS [Text],
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
            (ce.Recurring = 0 AND DATEDIFF(DAY, ce.[Start], @Today) >= nt.DaysReminder)
            OR
            -- Recurring events (ignore year)
            (
                ce.Recurring = 1 
                AND DATEDIFF(DAY, DATEADD(YEAR, YEAR(ce.[Start]) - YEAR(@Today), ce.[Start]), @Today) >= nt.DaysReminder
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
        CONCAT('Dogaðaj: ', ce.title, ' je danas!') AS [Text],
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
            ce.[Start] = @Today
            OR
            (
                ce.Recurring = 1
                AND DATEPART(DAYOFYEAR, ce.[Start]) = DATEPART(DAYOFYEAR, @Today)
            )
        )
        AND nt.[Enabled] = 1;
END;

