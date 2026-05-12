-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 30.5.2023.
-- Description:	gets document for person 
-- =============================================
CREATE PROCEDURE [dbo].[getDocumentsForPerson]
(
    @PersonId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        [Id] = d.[Id],
        [Name] = d.[Name],
        [PersonId] = d.[PersonId],
        [PersonFirstName] = CASE 
                                WHEN d.[UserId] IS NOT NULL THEN u.[FirstName] 
                                ELSE p.[FirstName] 
                            END,
        [PersonLastName] = CASE 
                               WHEN d.[UserId] IS NOT NULL THEN u.[LastName] 
                               ELSE p.[LastName] 
                           END,
        [DocumentTypeId] = d.[DocumentTypeId],
        [DocumentTypeName] = dt.[Name],
        [Path] = d.[Path],
        [StorageName] = d.[StorageName],
        [CreationDate] = d.[CreationDate],
        [Extension] = d.[Extension],
        [FileType] = d.[FileType]
    FROM dbo.[Document] AS d
    LEFT JOIN dbo.[DocumentType] AS dt ON d.[DocumentTypeId] = dt.[Id]
    LEFT JOIN dbo.[Person] AS p ON d.[PersonId] = p.[Id]
    LEFT JOIN dbo.[User] AS u ON d.[UserId] = u.[Id]
    WHERE d.[PersonId] = @PersonId
    ORDER BY d.[CreationDate] DESC;

END
