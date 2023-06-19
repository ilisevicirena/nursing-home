USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[insertBirthdayNotifications]    Script Date: 19.6.2023. 8:28:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 16.6.2023.
-- Description:	inserts bithday reminder to notifications
-- =============================================
CREATE PROCEDURE [dbo].[insertBirthdayNotifications]
	-- Add the parameters for the stored procedure here	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

DECLARE @CurrentDate DATE = CONVERT(DATE, GETDATE());

INSERT INTO dbo.[Notification] (NotificationTypeId, CreationDate, ReadDate, [Read], [Text])
SELECT 
    nt.[Id],
    CONVERT(DATE, DATEADD(DAY, -nt.[DaysReminder], DATEFROMPARTS(YEAR(@CurrentDate), MONTH(p.BirthDate), DAY(p.BirthDate)))),
    NULL,
    0,
    CONCAT('Rođendan: ',DATEDIFF(YEAR, p.BirthDate, @CurrentDate),'. rođendan osobe ', p.FirstName, ' ', p.LastName, ' je ', DAY(p.BirthDate), '.', MONTH(p.BirthDate), '. (za ', nt.DaysReminder, ' dana)')
FROM person p
CROSS JOIN dbo.NotificationType nt
WHERE nt.Code = 'events' AND nt.[Enabled] = 1
    AND MONTH(p.BirthDate) = MONTH(DATEADD(DAY, nt.DaysReminder, @CurrentDate))
    AND DAY(p.BirthDate) = DAY(DATEADD(DAY, nt.DaysReminder, @CurrentDate)) and p.Active=1;


	-- Insert for birthdays on the current date if 'events' notification type is enabled
IF EXISTS (SELECT 1 FROM dbo.NotificationType WHERE Code = 'events' AND [Enabled] = 1)
BEGIN
    INSERT INTO dbo.[Notification] (NotificationTypeId, CreationDate, ReadDate, [Read], [Text])
    SELECT 
        nt.[Id],
        @CurrentDate,
        NULL,
        0,
        CONCAT('Rođendan osobe ', p.FirstName, ' ', p.LastName, ' danas! (', DATEDIFF(YEAR, p.BirthDate, @CurrentDate), ' godina)')
    FROM person p
    INNER JOIN dbo.NotificationType nt ON nt.Code = 'events'
    WHERE MONTH(p.BirthDate) = MONTH(@CurrentDate)
        AND DAY(p.BirthDate) = DAY(@CurrentDate) and p.Active=1;
END

END
GO

