create PROCEDURE [dbo].[getUserDashboardEvents]
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    -- Get the current month and year
    DECLARE @StartOfMonth DATE = CONVERT(DATE, DATEADD(MONTH, DATEDIFF(MONTH, 0, GETDATE()), 0));
    DECLARE @EndOfMonth DATE = CONVERT(DATE, DATEADD(DAY, -1, DATEADD(MONTH, 1, @StartOfMonth)));

    -- Retrieve events of type 1 for user's persons and all events of type 3 for the current month
    SELECT 
        [e].[Id],
        [e].[Start],
        [e].[End],
        [e].[Title],
        [e].[Description],
        [e].[Color],
        [e].[Recurring],
        [e].[PersonId],
        [e].[Reminder],
        [e].[EmployeeId],
        [e].[EventTypeId]
    FROM [dbo].[CalendarEvent] AS [e]
    LEFT JOIN [dbo].[Person] AS [p] ON [e].[PersonId] = [p].[Id]
    LEFT JOIN [dbo].[Contact] AS [c] ON [p].[Id] = [c].[PersonId]
    LEFT JOIN [dbo].[UserContactRelation] AS [ucr] ON [c].[Id] = [ucr].[ContactId]
    WHERE ([e].[EventTypeId] = 1 AND [ucr].[UserId] = @UserId AND [e].[Start] >= @StartOfMonth AND [e].[Start] <= @EndOfMonth)
       OR ([e].[EventTypeId] = 3 AND [e].[Start] >= @StartOfMonth AND [e].[Start] <= @EndOfMonth)
    ORDER BY [e].[Start] ASC;
END
