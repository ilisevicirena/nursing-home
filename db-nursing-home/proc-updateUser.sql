create PROCEDURE [dbo].[updateUser]
    @UserId UNIQUEIDENTIFIER,
    @Username NVARCHAR(100) = NULL,
    @Email NVARCHAR(100) = NULL,
    @FirstName NVARCHAR(150) = NULL,
    @LastName NVARCHAR(150) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Update the user record
    UPDATE [dbo].[User]
    SET
        [Username] = COALESCE(@Username, [Username]),
        [Email] = COALESCE(@Email, [Email]),
        [FirstName] = COALESCE(@FirstName, [FirstName]),
        [LastName] = COALESCE(@LastName, [LastName])
    WHERE [Id] = @UserId;

    -- Check if any row was updated in the User table
    IF @@ROWCOUNT = 0
    BEGIN
        DECLARE @UserIdStr NVARCHAR(36);
        SET @UserIdStr = CONVERT(NVARCHAR(36), @UserId);

        -- Handle the case where no row was found with the given UserId
        RAISERROR('User with Id %s not found.', 16, 1, @UserIdStr);
        RETURN; -- Exit the procedure if no user was found and updated
    END

    -- Variable to track log description
    DECLARE @LogDescription NVARCHAR(MAX) = 'User data updated';

    -- Update associated contacts in the Contact table based on UserContactRelation
    UPDATE c
    SET
        c.FirstName = COALESCE(@FirstName, c.FirstName),
        c.LastName = COALESCE(@LastName, c.LastName),
        c.Email = COALESCE(@Email, c.Email)
    FROM [dbo].[Contact] c
    INNER JOIN [dbo].[UserContactRelation] ucr ON c.Id = ucr.ContactId
    WHERE ucr.UserId = @UserId;

    -- Check if any rows were affected for contacts
    IF @@ROWCOUNT > 0
    BEGIN
        SET @LogDescription = @LogDescription + ' and associated contacts updated';
    END

    -- Update associated employee data if any
    UPDATE e
    SET
        e.FirstName = COALESCE(@FirstName, e.FirstName),
        e.LastName = COALESCE(@LastName, e.LastName),
        e.Email = COALESCE(@Email, e.Email)
    FROM [dbo].[Employee] e
    INNER JOIN [dbo].[User] u ON e.Email = u.Email -- assuming User and Employee share the same Email field for relation
    WHERE u.Id = @UserId;

    -- Check if any rows were affected for employees
    IF @@ROWCOUNT > 0
    BEGIN
        SET @LogDescription = @LogDescription + ' and associated employee data updated';
    END

    -- Log the activity in the UserActivity table
    INSERT INTO [dbo].[UserActivity] ([UserId], [ActivityType], [Timestamp], [Description])
    VALUES (@UserId, 'USER_UPDATE', GETDATE(), @LogDescription);

    SELECT
        [Id],
        [Username],
        [Email],
        [FirstName],
        [LastName],
        [DateRegistered],
        [Active],
        [Blocked],
        [Verified]
    FROM [dbo].[User]
    WHERE [Id] = @UserId;
END;
