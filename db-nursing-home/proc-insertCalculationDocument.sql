create PROCEDURE [dbo].[insertCalculationDocument]
(
    @PersonId INT,
    @DocumentName VARCHAR(50),
    @Extension VARCHAR(10),
    @FileType VARCHAR(50),
    @SavePath VARCHAR(MAX),
    @CalculationId INT,
    @UserId UNIQUEIDENTIFIER -- Added parameter for UserId as uniqueidentifier
)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @DocumentId INT;
    DECLARE @CalculationDocumentRelationId INT;

    DECLARE @DocumentTable TABLE (
        Id INT,
        Path VARCHAR(MAX),
        StorageName VARCHAR(200)
    );

    -- Insert the document with the UserId
    INSERT INTO @DocumentTable
    EXEC [dbo].[insertDocument] @PersonId, 3, @DocumentName, @Extension, @FileType, @SavePath, @UserId;

    -- Retrieve the DocumentId from the inserted document
    SELECT TOP 1 @DocumentId = Id
    FROM @DocumentTable;

    -- Insert into CalculationDocumentRelation with the DocumentId
    INSERT INTO dbo.[CalculationDocumentRelation] ([CalculationId], [DocumentId])
    VALUES (@CalculationId, @DocumentId);

    SET @CalculationDocumentRelationId = SCOPE_IDENTITY();

    -- Return the inserted document details and the relation ID
    SELECT * FROM @DocumentTable;
    SELECT @CalculationDocumentRelationId AS CalculationDocumentRelationId;

END
