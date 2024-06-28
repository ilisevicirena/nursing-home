-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 16.6.2023.
-- Description:	inserts stay anniversary notifications
-- =============================================
CREATE PROCEDURE [dbo].[insertAnniversaryNotifications] 
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
DECLARE @CurrentDate DATE = CONVERT(DATE, CAST(DATEADD(hour, 2, GETDATE()) AS DATE));

-- Insert for anniversaries with a reminder
INSERT INTO dbo.[Notification] (NotificationTypeId, CreationDate, ReadDate, [Read], [Text])
SELECT 
    nt.[Id],
    CONVERT(DATE, DATEADD(DAY, -nt.[DaysReminder], DATEFROMPARTS(YEAR(@CurrentDate) + 1, MONTH(p.StartDate), DAY(p.StartDate)))),
    NULL,
    0,
    CONCAT('Arrival anniversary of ', p.FirstName, ' ', p.LastName, ' is ', DAY(p.StartDate), '.', MONTH(p.StartDate), '. (in ', nt.DaysReminder, ' days)')
FROM person p
INNER JOIN dbo.NotificationType nt ON nt.Code = 'events' AND nt.[Enabled] = 1
WHERE MONTH(p.StartDate) = MONTH(DATEADD(DAY, nt.DaysReminder, @CurrentDate))
    AND DAY(p.StartDate) = DAY(DATEADD(DAY, nt.DaysReminder, @CurrentDate)) and p.Active=1;

-- Insert for anniversaries on the current date if 'events' notification type is enabled
IF EXISTS (SELECT 1 FROM dbo.NotificationType WHERE Code = 'events' AND [Enabled] = 1)
BEGIN
    INSERT INTO dbo.[Notification] (NotificationTypeId, CreationDate, ReadDate, [Read], [Text])
    SELECT 
        nt.[Id],
        @CurrentDate,
        NULL,
        0,
        CONCAT('Arrival anniversary of ', p.FirstName, ' ', p.LastName, ' is today! (', DATEDIFF(YEAR, p.StartDate, @CurrentDate), ' years)')
    FROM person p
    INNER JOIN dbo.NotificationType nt ON nt.Code = 'events'
    WHERE MONTH(p.StartDate) = MONTH(@CurrentDate)
        AND DAY(p.StartDate) = DAY(@CurrentDate) and p.Active=1;
END
END