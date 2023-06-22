USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[removeAllEventsForPerson]    Script Date: 22.6.2023. 8:03:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 21.6.2023.
-- Description:	removes all events for person
-- =============================================
CREATE PROCEDURE [dbo].[removeAllEventsForPerson] 
	-- Add the parameters for the stored procedure here
	(
	@PersonId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    delete from dbo.CalendarEvent where PersonId=@PersonId;
END
GO

