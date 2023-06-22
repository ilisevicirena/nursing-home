-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 22.6.2023.
-- Description:	updates event
-- =============================================
CREATE PROCEDURE [dbo].[updateCalendarEvent]
	-- Add the parameters for the stored procedure here
	(
		@Start datetime,
		@End datetime,
		@Color varchar(50),
		@Title varchar(200),
		@Description varchar(max),
		@Recurring bit,
		@Id int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    update dbo.CalendarEvent
	set
	[Start]=@Start,
	[End]=@End,
	Color=@Color,
	Title=@Title,
	[Description]=@Description,
	Recurring=@Recurring
	where Id=@Id;

END
GO
