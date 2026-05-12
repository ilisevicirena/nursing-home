create PROCEDURE [dbo].[getCalculationDocuments]
(
    @CalculationId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    -- Retrieve documents associated with the given CalculationId
    SELECT 
        [Id] = cdr.[Id],
        [CalculationId] = cdr.[CalculationId],
        [DocumentId] = cdr.[DocumentId],
        [PersonId] = doc.[PersonId],
        [PersonFirstName] = CASE 
                                WHEN doc.[UserId] IS NOT NULL THEN u.[FirstName] 
                                ELSE p.[FirstName] 
                            END,
        [PersonLastName] = CASE 
                               WHEN doc.[UserId] IS NOT NULL THEN u.[LastName] 
                               ELSE p.[LastName] 
                           END,
        [DocumentTypeId] = doc.[DocumentTypeId],
        [DocumentTypeName] = dt.[Name],
        [Path] = doc.[Path],
        [Name] = doc.[Name],
        [StorageName] = doc.[StorageName],
        [CreationDate] = doc.[CreationDate],
        [Extension] = doc.[Extension],
        [FileType] = doc.[FileType]
    FROM 
        dbo.[CalculationDocumentRelation] AS cdr
    LEFT JOIN 
        dbo.[Document] AS doc ON doc.[Id] = cdr.[DocumentId]
    LEFT JOIN 
        dbo.[Person] AS p ON p.[Id] = doc.[PersonId]
    LEFT JOIN 
        dbo.[User] AS u ON doc.[UserId] = u.[Id]
    LEFT JOIN 
        dbo.[DocumentType] AS dt ON doc.[DocumentTypeId] = dt.[Id]
    WHERE 
        cdr.[CalculationId] = @CalculationId;

END
