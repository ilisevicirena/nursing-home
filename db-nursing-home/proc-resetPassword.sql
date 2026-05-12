CREATE PROCEDURE [dbo].[resetPassword]
    @UserId UNIQUEIDENTIFIER,  -- User ID
    @OldPassword NVARCHAR(255),
    @NewPassword NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @StoredPassword NVARCHAR(255);
    DECLARE @OldPasswordBinary VARBINARY(32);
    DECLARE @NewPasswordHash NVARCHAR(255);
    DECLARE @Message NVARCHAR(255) = '';

    -- Retrieve the stored password for the given UserId
    SELECT 
        @StoredPassword = [Password],
        @OldPasswordBinary = CONVERT(VARBINARY(32), [Password], 2)
    FROM [dbo].[User]
    WHERE [Id] = @UserId;
    
    -- Check if user was found
    IF @StoredPassword IS NULL
    BEGIN
        SET @Message = 'errUserIdIncorrect';
        SELECT 0 AS Success, @Message AS Message;
        RETURN;
    END

    -- Compute the hash of the provided old password
    DECLARE @ComputedOldPasswordHash VARBINARY(32) = HASHBYTES('SHA2_256', @OldPassword);

    -- Check if the old password matches
    IF @OldPasswordBinary <> @ComputedOldPasswordHash
    BEGIN
        SET @Message = 'errOldPasswordIncorrect';
        SELECT 0 AS Success, @Message AS Message;
        RETURN;
    END

    -- Compute the hash of the new password
    SET @NewPasswordHash = CONVERT(NVARCHAR(255), HASHBYTES('SHA2_256', @NewPassword), 2);

    -- Update the password in the database
    UPDATE [dbo].[User]
    SET [Password] = @NewPasswordHash
    WHERE [Id] = @UserId;

    -- Return success message
    SET @Message = 'Password has been reset successfully.';
    SELECT 1 AS Success, @Message AS Message;
END;
