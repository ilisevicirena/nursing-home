create PROCEDURE [dbo].[insertNote] 
    -- Add the parameters for the stored procedure here
    (
        @PersonId INT,
        @Title VARCHAR(1000),
        @Text VARCHAR(MAX),
        @Tags VARCHAR(MAX),
        @UserId UNIQUEIDENTIFIER, -- Added UserId parameter
        @ActingUserId NCHAR(36) = NULL
    )
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON;

    DECLARE @noteId INT;
    
    -- Insert statement for procedure
    INSERT INTO dbo.Note (PersonId, Title, [Text], CreationDate, LastModified, UserId) -- Added UserId column
    VALUES (@PersonId, @Title, @Text, GETDATE(), GETDATE(), @UserId);

    SET @noteId = SCOPE_IDENTITY();

    IF LEN(@Tags) > 0
    BEGIN
        DECLARE @tagList TABLE (Tag VARCHAR(100))
        INSERT INTO @tagList (Tag)
        SELECT value FROM STRING_SPLIT(@Tags, ',');
    END;

    INSERT INTO dbo.NoteTagRelation (NoteId, TagId)
    SELECT @noteId, Tag
    FROM @tagList;
    
    SELECT @noteId AS [NoteId];

    EXEC dbo.logUserActivity 'INSERT_NOTE', 'Note inserted', @ActingUserId;
END
