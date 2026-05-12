-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 21.6.2023
-- Description:	gets all events
-- =============================================
CREATE PROCEDURE [dbo].[getCalendarEventsForMonth]
	-- Add the parameters for the stored procedure here
	(
		@Month int,
		@Year int,
		@UserId uniqueidentifier
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.

	SET NOCOUNT ON;

	declare @UserRoleId int;

	 -- Determine the role of the user
    SELECT @UserRoleId = ur.RoleId
    FROM dbo.UserRoleRelation ur
    WHERE ur.UserId = @UserId;

	if @UserRoleId=3
	begin 
	SELECT 
    [e].[Id],
    CASE 
        WHEN [e].[Recurring] = 1 THEN DATEADD(YEAR, @Year - YEAR([e].[Start]), [e].[Start]) 
        ELSE [e].[Start] 
    END AS [Start],
    CASE 
        WHEN [e].[Recurring] = 1 THEN DATEADD(YEAR, @Year - YEAR([e].[End]), [e].[End]) 
        ELSE [e].[End] 
    END AS [End],
    [e].[Color],
    [e].[Title],
    [e].[Description],
    [e].[Recurring],
    [e].[PersonId],
    [e].[EmployeeId],
    [e].[Reminder]
FROM [dbo].[CalendarEvent] AS [e]
LEFT JOIN [dbo].[Person] AS [p] ON [e].[PersonId] = [p].[Id]
LEFT JOIN [dbo].[Contact] AS [c] ON [p].[Id] = [c].[PersonId]
LEFT JOIN [dbo].[UserContactRelation] AS [ucr] ON [c].[Id] = [ucr].[ContactId]
WHERE 
    (
        [e].[EventTypeId] = 1 
        AND [ucr].[UserId] = @UserId
        AND (
            ([e].[Recurring] = 0 AND YEAR([e].[Start]) = @Year AND MONTH([e].[Start]) = @Month)
            OR ([e].[Recurring] = 0 AND YEAR([e].[End]) = @Year AND MONTH([e].[End]) = @Month)
            OR ([e].[Recurring] = 1 AND (MONTH([e].[Start]) = @Month OR MONTH([e].[End]) = @Month))
        )
    )
    OR 
    (
        [e].[EventTypeId] = 3
        AND (
            ([e].[Recurring] = 0 AND YEAR([e].[Start]) = @Year AND MONTH([e].[Start]) = @Month)
            OR ([e].[Recurring] = 0 AND YEAR([e].[End]) = @Year AND MONTH([e].[End]) = @Month)
            OR ([e].[Recurring] = 1 AND (MONTH([e].[Start]) = @Month OR MONTH([e].[End]) = @Month))
        )
    );
	end
	else begin
     SELECT 
        [Id],
      CASE WHEN [Recurring] = 1 THEN DATEADD(YEAR, @Year - YEAR([Start]), [Start]) ELSE [Start] END AS [Start],
        CASE WHEN [Recurring] = 1 THEN DATEADD(YEAR, @Year - YEAR([End]), [End]) ELSE [End] END AS [End],
        [Color],
        [Title],
        [Description],
		[Recurring]=Recurring,
		[PersonId]=PersonId,
    [EmployeeId]=EmployeeId,
		[Reminder]=Reminder
    FROM dbo.CalendarEvent
    WHERE ([Recurring] = 0 AND YEAR([Start]) = @Year AND MONTH([Start]) = @Month)
        OR ([Recurring] = 0 AND YEAR([End]) = @Year AND MONTH([End]) = @Month)
        OR ([Recurring] = 1 AND (MONTH([Start]) = @Month OR MONTH([End]) = @Month));
	end
END