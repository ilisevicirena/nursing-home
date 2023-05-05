USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[insertServiceForPackage]    Script Date: 5.5.2023. 21:02:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.5.2023.
-- Description: inserts service for package
-- =============================================
CREATE PROCEDURE [dbo].[insertServiceForPackage]
	-- Add the parameters for the stored procedure here
	(
		@ServiceId int,
		@PackageId int,
		@Quantity int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO dbo.ServicePackageRelation (ServiceId, PackageId, Quantity, Active)
	VALUES (@ServiceId, @PackageId, @Quantity, 1);

	SELECT SCOPE_IDENTITY() AS [RowId];
END
GO

