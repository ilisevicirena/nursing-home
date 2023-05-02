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
-- Create date: 2.5.2023.
-- Description:	inserts new package
-- =============================================
CREATE PROCEDURE [dbo].[insertPackage]
	-- Add the parameters for the stored procedure here
	(
		@Name varchar(50),
		@Description varchar(2000) = NULL,
		@DefaultPackagePrice float = NULL,
		@DefaultPackagePriceUnitId int = NULL,
		@PackagePriceCalculated bit
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO dbo.Package ([Name], [Description], DefaultPackagePrice, DefaultPackagePriceUnitId, PackagePriceCalculated)
	VALUES (@Name, @Description, @DefaultPackagePrice, @DefaultPackagePriceUnitId, @PackagePriceCalculated);

	SELECT SCOPE_IDENTITY() AS [PackageId];
END
GO
