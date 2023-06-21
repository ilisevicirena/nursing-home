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
		@Recurring bit
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	insert into dbo.CalendarEvent ([Start], [End], [Color], [Title], [Description], [PersonId], [Recurring])
	values (@Start, @End, @Color, @Title, @Description, @PersonId, @Recurring);

	select SCOPE_IDENTITY() as [EventId];
END
GO
