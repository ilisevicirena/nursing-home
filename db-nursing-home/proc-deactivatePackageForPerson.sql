USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[deactivatePackageForPerson]    Script Date: 23.5.2023. 8:42:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.5.2023.
-- Description:	deactivates package for person
-- =============================================
CREATE PROCEDURE [dbo].[deactivatePackageForPerson]
	-- Add the parameters for the stored procedure here
	(
		@PackageId int,
		@PersonId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE dbo.PersonPackageRelation
	SET 
	Active=0,
	EndDate=GETDATE()
	WHERE PackageId=@PackageId and PersonId=@PersonId;
END
GO

