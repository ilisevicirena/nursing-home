-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 10.7.2023.
-- Description:	iserts payment reminder
-- =============================================
CREATE PROCEDURE [dbo].[insertCalculationNotification]
	-- Add the parameters for the stored procedure here

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
SET NOCOUNT ON;
DECLARE @currentDateTime DATETIME;
SET @currentDateTime = CAST(DATEADD(hour, 2, GETDATE()) AS DATE);

-- Check if notification type "reminder" is enabled
DECLARE @isReminderEnabled BIT;
SET @isReminderEnabled = (
    SELECT [Enabled]
    FROM dbo.NotificationType
    WHERE Code = 'reminders'
);

-- Insert rows into Notification table for eligible calculations only if reminder is enabled
IF @isReminderEnabled = 1
BEGIN
    INSERT INTO dbo.[Notification] (NotificationTypeId, CreationDate, ReadDate, [Read], [Text], LinkId, GoToLink)
    SELECT NT.Id AS NotificationTypeId,
           CAST(DATEADD(hour, 2, GETDATE()) AS DATE) AS CreationDate,
           NULL AS ReadDate,
           0 AS [Read],
           CONCAT('Uplata za osobu ',P.FirstName, ' ', P.LastName, ' za ', C.[Month],'. mjesec ', C.[Year],' kasni ',
                  ABS(DATEDIFF(DAY, @currentDateTime,  DATEADD(DAY, C.PaymentDaysDeadline,C.CreationDate))), ' dana!') AS [Text],
           PL.Id AS LinkId,
           PL.Link AS GoToLink
    FROM dbo.Calculation C
    INNER JOIN dbo.NotificationType NT ON NT.Code = 'reminders'
    INNER JOIN dbo.PageLink PL ON PL.Code = 'calculation'
    LEFT JOIN dbo.Person P ON C.PersonId = P.Id
    WHERE C.StatusId = 2
     AND DATEADD(DAY, C.PaymentDaysDeadline, C.CreationDate) < @currentDateTime;
END;

   
END