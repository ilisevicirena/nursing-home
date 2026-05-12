CREATE PROCEDURE [dbo].[insertAnniversaryNotifications] 
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @CurrentDate DATE = CONVERT(DATE, CAST(DATEADD(hour, 2, GETDATE()) AS DATE));
    DECLARE @UserRoleId INT;

    -- Determine the role of the user
    SELECT @UserRoleId = ur.RoleId
    FROM dbo.UserRoleRelation ur
    WHERE ur.UserId = @UserId;

    -- Insert for anniversaries with a reminder if notifications are enabled based on the user role
    IF @UserRoleId IN (1, 4, 5)  -- Roles 1, 4, and 5: Insert for all persons
    BEGIN
        -- Insert reminders for all persons
        IF EXISTS (SELECT 1 FROM dbo.UserNotificationTypeSettings WHERE UserId = @UserId AND [Enabled] = 1 AND NotificationTypeId = 2)
        BEGIN
            INSERT INTO dbo.[Notification] (UserId, NotificationTypeId, CreationDate, ReadDate, [Read], [Text])
            SELECT 
                ur.UserId,
                nt.NotificationTypeId,
                CONVERT(DATE, DATEADD(DAY, -nt.[DaysReminder], DATEFROMPARTS(YEAR(@CurrentDate) + 1, MONTH(p.StartDate), DAY(p.StartDate)))),
                NULL,
                0,
                CONCAT('Arrival anniversary of ', p.FirstName, ' ', p.LastName, ' is ', DAY(p.StartDate), '.', MONTH(p.StartDate), '. (in ', nt.DaysReminder, ' days)')
            FROM person p
            INNER JOIN dbo.UserNotificationTypeSettings nt ON nt.[Enabled] = 1 AND nt.NotificationTypeId = 2
            INNER JOIN dbo.UserRoleRelation ur ON ur.UserId = nt.UserId AND ur.RoleId IN (1, 4, 5)
            WHERE MONTH(p.StartDate) = MONTH(DATEADD(DAY, nt.DaysReminder, @CurrentDate))
              AND DAY(p.StartDate) = DAY(DATEADD(DAY, nt.DaysReminder, @CurrentDate))
              AND p.Active = 1;
        END;

        -- Insert events for all persons
        IF EXISTS (SELECT 1 FROM dbo.UserNotificationTypeSettings WHERE UserId = @UserId AND [Enabled] = 1 AND NotificationTypeId = 1)
        BEGIN
            INSERT INTO dbo.[Notification] (UserId, NotificationTypeId, CreationDate, ReadDate, [Read], [Text])
            SELECT 
                ur.UserId,
                nt.[NotificationTypeId],
                @CurrentDate,
                NULL,
                0,
                CONCAT('Arrival anniversary of ', p.FirstName, ' ', p.LastName, ' is today! (', DATEDIFF(YEAR, p.StartDate, @CurrentDate), ' years)')
            FROM person p
            INNER JOIN dbo.UserNotificationTypeSettings nt ON nt.[Enabled] = 1 AND nt.NotificationTypeId = 1
            INNER JOIN dbo.UserRoleRelation ur ON ur.UserId = nt.UserId AND ur.RoleId IN (1, 4, 5)
            WHERE MONTH(p.StartDate) = MONTH(@CurrentDate)
              AND DAY(p.StartDate) = DAY(@CurrentDate)
              AND p.Active = 1;
        END;
    END
    ELSE IF @UserRoleId = 3  -- Role 3: Insert only for persons whose contact is the user
    BEGIN
        -- Insert reminders for contacts of the user
        IF EXISTS (SELECT 1 FROM dbo.UserNotificationTypeSettings WHERE UserId = @UserId AND [Enabled] = 1 AND NotificationTypeId = 2)
        BEGIN
            INSERT INTO dbo.[Notification] (UserId, NotificationTypeId, CreationDate, ReadDate, [Read], [Text])
            SELECT 
                @UserId,
                nt.NotificationTypeId,
                CONVERT(DATE, DATEADD(DAY, -nt.[DaysReminder], DATEFROMPARTS(YEAR(@CurrentDate) + 1, MONTH(p.StartDate), DAY(p.StartDate)))),
                NULL,
                0,
                CONCAT('Arrival anniversary of ', p.FirstName, ' ', p.LastName, ' is ', DAY(p.StartDate), '.', MONTH(p.StartDate), '. (in ', nt.DaysReminder, ' days)')
            FROM person p
            INNER JOIN dbo.Contact c ON c.PersonId = p.Id
            INNER JOIN dbo.UserContactRelation ucr ON ucr.ContactId = c.Id
            INNER JOIN dbo.UserNotificationTypeSettings nt ON nt.UserId = @UserId AND nt.[Enabled] = 1 AND nt.NotificationTypeId = 2
            WHERE ucr.UserId = @UserId
              AND MONTH(p.StartDate) = MONTH(DATEADD(DAY, nt.DaysReminder, @CurrentDate))
              AND DAY(p.StartDate) = DAY(DATEADD(DAY, nt.DaysReminder, @CurrentDate))
              AND p.Active = 1;
        END;

        -- Insert events for contacts of the user
        IF EXISTS (SELECT 1 FROM dbo.UserNotificationTypeSettings WHERE UserId = @UserId AND [Enabled] = 1 AND NotificationTypeId = 1)
        BEGIN
            INSERT INTO dbo.[Notification] (UserId, NotificationTypeId, CreationDate, ReadDate, [Read], [Text])
            SELECT 
                @UserId,
                nt.NotificationTypeId,
                @CurrentDate,
                NULL,
                0,
                CONCAT('Arrival anniversary of ', p.FirstName, ' ', p.LastName, ' is today! (', DATEDIFF(YEAR, p.StartDate, @CurrentDate), ' years)')
            FROM person p
            INNER JOIN dbo.Contact c ON c.PersonId = p.Id
            INNER JOIN dbo.UserContactRelation ucr ON ucr.ContactId = c.Id
            INNER JOIN dbo.UserNotificationTypeSettings nt ON nt.UserId = @UserId AND nt.[Enabled] = 1 AND nt.NotificationTypeId = 1
            WHERE ucr.UserId = @UserId
              AND MONTH(p.StartDate) = MONTH(@CurrentDate)
              AND DAY(p.StartDate) = DAY(@CurrentDate)
              AND p.Active = 1;
        END;
    END
END
