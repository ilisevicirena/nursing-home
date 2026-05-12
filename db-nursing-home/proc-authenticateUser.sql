CREATE PROCEDURE [dbo].[authenticateUser]
    @Identifier NVARCHAR(100),  -- Can be either username or email
    @Password NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @StoredPassword NVARCHAR(255);
    DECLARE @UserId UNIQUEIDENTIFIER;
    DECLARE @Active BIT;
    DECLARE @Blocked BIT;
    DECLARE @Verified BIT;
    DECLARE @Authenticated BIT = 0;
    DECLARE @ComputedHash NVARCHAR(255);
    DECLARE @StoredPasswordBinary VARBINARY(32);
    DECLARE @ComputedHashBinary VARBINARY(32);
    DECLARE @Message NVARCHAR(255) = '';
    DECLARE @Email NVARCHAR(255) = '';
    DECLARE @FirstName NVARCHAR(255) = '';
    DECLARE @LastName NVARCHAR(255) = '';
    DECLARE @Username NVARCHAR(255) = '';
	DECLARE @DateRegistered datetime = '';

    -- Retrieve the stored password, active status, blocked status, and verified status for the given username or email
    SELECT 
        @StoredPassword = [Password],
        @UserId = [Id],
        @Active = [Active],
        @Blocked = [Blocked],
        @Verified = [Verified],
        @Email = [Email],
        @FirstName = [FirstName],
        @LastName = [LastName],
        @Username = [Username],
		@DateRegistered = [DateRegistered],
        @StoredPasswordBinary = CONVERT(VARBINARY(32), [Password], 2)
    FROM [dbo].[User]
    WHERE [Username] = @Identifier OR [Email] = @Identifier;
    
    -- Check if user was found
    IF @StoredPassword IS NULL
    BEGIN
        SET @Message = 'errInvalidUsernameOrEmail';
        SELECT @Authenticated AS Authenticated, @Message AS Message;
        RETURN;
    END

    -- Check if the user is active, not blocked, and verified
    IF @Active = 0
    BEGIN
        SET @Message = 'errUserNotActive';
        SELECT @Authenticated AS Authenticated, @Message AS Message;
        RETURN;
    END

    IF @Blocked = 1
    BEGIN
        SET @Message = 'errUserBlocked';
        SELECT @Authenticated AS Authenticated, @Message AS Message;
        RETURN;
    END

    IF @Verified = 0
    BEGIN
        SET @Message = 'errUserNotVerified';
        SELECT @Authenticated AS Authenticated, @Message AS Message;
        RETURN;
    END

    -- Compute the hash of the provided password
    SET @ComputedHash = CONVERT(NVARCHAR(255), HASHBYTES('SHA2_256', @Password), 2);
    SET @ComputedHashBinary = HASHBYTES('SHA2_256', @Password);
    
    IF @StoredPasswordBinary = @ComputedHashBinary
    BEGIN
        SET @Authenticated = 1;
    END
   
    -- Return the authentication result and UserId if authenticated
    IF @Authenticated = 1
    BEGIN
        SELECT @Authenticated AS Authenticated, @UserId AS UserId, @Message AS Message, 
               @FirstName AS FirstName, @LastName AS LastName, @Email AS Email, @Username AS Username, @DateRegistered AS DateRegistered;
    END
    ELSE
    BEGIN
        SET @Message = 'errInvalidPassword';
        SELECT @Authenticated AS Authenticated, @Message AS Message;
    END
END;
