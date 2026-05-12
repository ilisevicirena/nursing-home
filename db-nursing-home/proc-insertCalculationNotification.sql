CREATE PROCEDURE [dbo].[insertCalculationNotification]
	-- Add the parameters for the stored procedure here
	 @UserId UNIQUEIDENTIFIER
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
SET NOCOUNT ON;
DECLARE @currentDateTime DATETIME;
SET @currentDateTime = CAST(DATEADD(hour, 2, GETDATE()) AS DATE);

DECLARE @UserRoleId INT;

    -- Determine the role of the user
    SELECT @UserRoleId = ur.RoleId
    FROM dbo.UserRoleRelation ur
    WHERE ur.UserId = @UserId;

-- Insert rows into Notification table for eligible calculations only if reminder is enabled
IF @UserRoleId = 1
BEGIN
		IF EXISTS (SELECT 1 FROM dbo.UserNotificationTypeSettings WHERE UserId = @UserId AND [Enabled] = 1 AND NotificationTypeId = 2)
        BEGIN
			INSERT INTO dbo.[Notification] (UserId, NotificationTypeId, CreationDate, ReadDate, [Read], [Text], LinkId, GoToLink)
			SELECT 
					@UserId as UserId,
					2 as NotificationTypeId,
				   CAST(DATEADD(hour, 2, GETDATE()) AS DATE) AS CreationDate,
				   NULL AS ReadDate,
				   0 AS [Read],
				   CONCAT('Uplata za osobu ',P.FirstName, ' ', P.LastName, ' za ', C.[Month],'. mjesec ', C.[Year],' kasni ',
						  ABS(DATEDIFF(DAY, @currentDateTime,  DATEADD(DAY, C.PaymentDaysDeadline,C.CreationDate))), ' dana!') AS [Text],
				   PL.Id AS LinkId,
				   PL.Link AS GoToLink
			FROM dbo.Calculation C			
			INNER JOIN dbo.PageLink PL ON PL.Code = 'calculation'
			LEFT JOIN dbo.Person P ON C.PersonId = P.Id
			WHERE C.StatusId = 2
			 AND DATEADD(DAY, C.PaymentDaysDeadline, C.CreationDate) < @currentDateTime;
		END;
END;
ELSE IF @UserRoleId = 3  -- Role 3: Insert only for persons whose contact is the user
    BEGIN
        -- Insert reminders for contacts of the user
        IF EXISTS (SELECT 1 FROM dbo.UserNotificationTypeSettings WHERE UserId = @UserId AND [Enabled] = 1 AND NotificationTypeId = 2)
        BEGIN
            INSERT INTO dbo.[Notification] (UserId, NotificationTypeId, CreationDate, ReadDate, [Read], [Text], LinkId, GoToLink)
			SELECT 
					@UserId as UserId,
					2 as NotificationTypeId,
				   CAST(DATEADD(hour, 2, GETDATE()) AS DATE) AS CreationDate,
				   NULL AS ReadDate,
				   0 AS [Read],
				   CONCAT('Uplata za osobu ',P.FirstName, ' ', P.LastName, ' za ', C.[Month],'. mjesec ', C.[Year],' kasni ',
						  ABS(DATEDIFF(DAY, @currentDateTime,  DATEADD(DAY, C.PaymentDaysDeadline,C.CreationDate))), ' dana!') AS [Text],
				   PL.Id AS LinkId,
				   PL.Link AS GoToLink
			FROM dbo.Calculation C			
			INNER JOIN dbo.PageLink PL ON PL.Code = 'calculation'
			LEFT JOIN dbo.Person P ON C.PersonId = P.Id
			INNER JOIN dbo.Contact cont ON cont.PersonId = p.Id
            INNER JOIN dbo.UserContactRelation ucr ON ucr.ContactId = cont.Id
			WHERE C.StatusId = 2 and  ucr.UserId = @UserId
			 AND DATEADD(DAY, C.PaymentDaysDeadline, C.CreationDate) < @currentDateTime;
        END;
	end;
   
END