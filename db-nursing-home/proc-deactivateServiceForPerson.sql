USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[deactivateServiceForPerson]    Script Date: 23.5.2023. 8:44:39 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.5.2023.
-- Description:	deactivates service for person
-- =============================================
CREATE PROCEDURE [dbo].[deactivateServiceForPerson]
	-- Add the parameters for the stored procedure here
	(
		@ServiceId int,
		@PersonId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	update dbo.PersonServiceRelation
	set Active=0,
	EndDate=GETDATE()
	where ServiceId=@ServiceId and PersonId=@PersonId;

END
GO

