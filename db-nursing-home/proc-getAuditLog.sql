-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 17.9.2026
-- Description:	Audit log viewer over Log / LogEntity / LogType.
--              Returns entity-change history (what record, which action, when),
--              resolving KeyId to a human-readable label per entity, with optional
--              filters on entity, action, date range and a free-text search.
-- =============================================
CREATE PROCEDURE [dbo].[getAuditLog]
(
    @LogEntity VARCHAR(50) = NULL,   -- entity name (Person / Room / Floor / Contact); NULL = all
    @LogType VARCHAR(50) = NULL,     -- action code (INSERT / UPDATE / DELETE); NULL = all
    @DateFrom DATETIME = NULL,
    @DateTo DATETIME = NULL,
    @Search VARCHAR(100) = NULL,     -- matches record label or key id
    @Top INT = 500
)
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH audit AS (
        SELECT
            l.Id,
            l.CreationDate,
            [Entity]       = e.[Name],
            [EntityKey]    = e.[Key],
            [ActionCode]   = t.[Name],
            [ActionPretty] = t.NamePretty,
            l.KeyId,
            [RecordLabel]  = CASE e.[Name]
                WHEN 'Person'  THEN (SELECT TOP 1 p.FirstName + ' ' + p.LastName FROM dbo.Person  AS p WHERE p.Id = l.KeyId)
                WHEN 'Contact' THEN (SELECT TOP 1 c.FirstName + ' ' + c.LastName FROM dbo.Contact AS c WHERE c.Id = l.KeyId)
                WHEN 'Room'    THEN (SELECT TOP 1 r.[Name]                       FROM dbo.Room    AS r WHERE r.Id = l.KeyId)
                WHEN 'Floor'   THEN (SELECT TOP 1 f.[Name]                       FROM dbo.Floor   AS f WHERE f.Id = l.KeyId)
                ELSE NULL
            END,
            l.UserId,
            [UserName] = (
                SELECT TOP 1 ISNULL(NULLIF(LTRIM(RTRIM(ISNULL(u.FirstName, '') + ' ' + ISNULL(u.LastName, ''))), ''), u.Username)
                FROM dbo.[User] AS u WHERE u.Id = l.UserId
            )
        FROM dbo.[Log] AS l
        JOIN dbo.LogType   AS t ON l.LogTypeId   = t.Id
        JOIN dbo.LogEntity AS e ON l.LogEntityId = e.Id
        WHERE (@LogEntity IS NULL OR e.[Name] = @LogEntity)
          AND (@LogType   IS NULL OR t.[Name] = @LogType)
          AND (@DateFrom  IS NULL OR l.CreationDate >= @DateFrom)
          AND (@DateTo    IS NULL OR l.CreationDate <  DATEADD(DAY, 1, @DateTo))
    )
    SELECT TOP (@Top)
        [Id],
        [CreationDate],
        [Entity],
        [EntityKey],
        [ActionCode],
        [ActionPretty],
        [KeyId],
        [RecordLabel],
        [UserId],
        [UserName]
    FROM audit
    WHERE (@Search IS NULL
           OR CAST(KeyId AS VARCHAR(20)) LIKE '%' + @Search + '%'
           OR RecordLabel LIKE '%' + @Search + '%'
           OR UserName LIKE '%' + @Search + '%')
    ORDER BY Id DESC;
END
