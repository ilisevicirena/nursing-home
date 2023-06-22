USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[insertCalendarEvent]    Script Date: 22.6.2023. 14:25:37 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 21.6.2023.
-- Description:	inserts new event
-- =============================================
CREATE PROCEDURE [dbo].[insertCalendarEvent]
	-- Add the parameters for the stored procedure here
	(
		@Start datetime,
		@End datetime,
		@Color varchar(50),
		@Title varchar(200),
		@Description varchar(max),
		@PersonId int=NULL,
		@Recurring bit,
		@Reminder bit
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	insert into dbo.CalendarEvent ([Start], [End], [Color], [Title], [Description], [PersonId], [Recurring], Reminder)
	values (@Start, @End, @Color, @Title, @Description, @PersonId, @Recurring, @Reminder);

	select SCOPE_IDENTITY() as [EventId];
END
GO

