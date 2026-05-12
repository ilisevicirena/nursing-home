CREATE PROCEDURE [dbo].[insertUser]
    @Username NVARCHAR(100),
    @Password NVARCHAR(255),
    @Email NVARCHAR(100),
    @FirstName NVARCHAR(150) = NULL,
    @LastName NVARCHAR(150) = NULL,
    @DateRegistered DATETIME = NULL,
    @Active BIT = 1,
    @Blocked BIT = 0,
    @Verified BIT = 0
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Message NVARCHAR(255) = '';

    -- Check if a user with the same email or username already exists
    IF EXISTS (SELECT 1 FROM [dbo].[User] WHERE [Email] = @Email OR [Username] = @Username)
    BEGIN
        SET @Message = 'errUserAlreadyExists';
        SELECT @Message AS Message;
        RETURN;
    END

    -- Set default value for DateRegistered if it is not provided
    IF @DateRegistered IS NULL
    BEGIN
        SET @DateRegistered = GETDATE();
    END

    -- Generate a new GUID for the user
    DECLARE @NewUserId UNIQUEIDENTIFIER = NEWID();

    -- Hash the password using SHA2_256 and convert to NVARCHAR(255)
    DECLARE @HashedPassword NVARCHAR(255) = CONVERT(NVARCHAR(255), HASHBYTES('SHA2_256', @Password), 2);

    -- Insert the new user
    INSERT INTO [dbo].[User] (
        [Id],
        [Username],
        [Password],
        [Email],
        [FirstName],
        [LastName],
        [DateRegistered],
        [Active],
        [Blocked],
        [Verified]
    )
    VALUES (
        @NewUserId,
        @Username,
        @HashedPassword,
        @Email,
        @FirstName,
        @LastName,
        @DateRegistered,
        @Active,
        @Blocked,
        @Verified
    );

    INSERT INTO [dbo].[UserActivity] ([UserId], [ActivityType], [Timestamp], [Description])
    VALUES (@NewUserId, 'USER_CREATION', GETDATE(), 'User created');

	insert into dbo.UserRoleRelation ([UserId], [RoleId]) values (@NewUserId, 3);

	INSERT INTO [dbo].[UserActivity] ([UserId], [ActivityType], [Timestamp], [Description])
    VALUES (@NewUserId, 'ROLE_ASSIGNMENT', GETDATE(), 'New user role assignment');

    -- Return all the information about the new user
    SELECT 
        @NewUserId AS UserId,
        @Username AS Username,
        @Email AS Email,
        @FirstName AS FirstName,
        @LastName AS LastName,
        @DateRegistered AS DateRegistered,
        @Active AS Active,
        @Blocked AS Blocked,
        @Verified AS Verified,
        @Message AS Message;
END;
