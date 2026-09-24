-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 17.9.2026
-- Description:	User activity feed (who did what, when) over the UserActivity table,
--              with optional date-range and free-text filters.
-- =============================================
CREATE PROCEDURE [dbo].[getUserActivity]
(
    @DateFrom DATETIME = NULL,
    @DateTo DATETIME = NULL,
    @Search VARCHAR(100) = NULL,
    @Top INT = 500
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP (@Top)
        [Id]           = a.Id,
        [Timestamp]    = a.[Timestamp],
        [UserId]       = a.UserId,
        [UserName]     = ISNULL(NULLIF(LTRIM(RTRIM(ISNULL(u.FirstName, '') + ' ' + ISNULL(u.LastName, ''))), ''), u.Username),
        [ActivityType] = a.ActivityType,
        [Description]  = a.[Description]
    FROM dbo.UserActivity AS a
    LEFT JOIN dbo.[User] AS u ON u.Id = a.UserId
    WHERE (@DateFrom IS NULL OR a.[Timestamp] >= @DateFrom)
      AND (@DateTo   IS NULL OR a.[Timestamp] <  DATEADD(DAY, 1, @DateTo))
      AND (@Search   IS NULL
           OR a.ActivityType LIKE '%' + @Search + '%'
           OR a.[Description] LIKE '%' + @Search + '%'
           OR ISNULL(u.FirstName, '') + ' ' + ISNULL(u.LastName, '') LIKE '%' + @Search + '%'
           OR u.Username LIKE '%' + @Search + '%')
    ORDER BY a.Id DESC;
END
