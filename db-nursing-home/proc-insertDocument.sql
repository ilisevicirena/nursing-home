create PROCEDURE [dbo].[insertDocument]
(
    @PersonId INT,
    @DocumentTypeId INT,
    @Name VARCHAR(50),
    @Extension VARCHAR(50),
    @FileType VARCHAR(50),
    @SavePath VARCHAR(MAX),
    @UserId UNIQUEIDENTIFIER, -- Added parameter for UserId
    @ActingUserId NCHAR(36) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    -- Insert the document with the UserId
    INSERT INTO dbo.[Document] (PersonId, DocumentTypeId, [Name], Extension, FileType, CreationDate, UserId)
    VALUES (@PersonId, @DocumentTypeId, @Name, @Extension, @FileType, GETDATE(), @UserId);

    DECLARE @storageName VARCHAR(200), @storagePath VARCHAR(MAX);
    SET @storageName = CONVERT(VARCHAR(MAX), SCOPE_IDENTITY()) + '_' + CONVERT(VARCHAR(MAX), @PersonId) + '_' + CONVERT(VARCHAR(MAX), @DocumentTypeId) + '.' + @Extension;
    SET @storagePath = @SavePath + @storageName;

    -- Update the document with the storage name and path
    UPDATE dbo.[Document] 
    SET StorageName = @storageName,
        [Path] = @storagePath
    WHERE Id = SCOPE_IDENTITY();

    -- Return the inserted document details
    SELECT 
        [Id] = Id,
        [Path] = [Path],
        [StorageName] = StorageName
    FROM dbo.[Document]
    WHERE Id = SCOPE_IDENTITY();

    EXEC dbo.logUserActivity 'INSERT_DOCUMENT', 'Document inserted', @ActingUserId;

END
