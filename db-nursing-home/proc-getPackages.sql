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
-- Create date: 3.5.2023.
-- Description:	gets all packages
-- =============================================
CREATE PROCEDURE [dbo].[getPackages] 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 
	[Id]=p.Id,
	[Name]=p.[Name],
	[Description]=[Description],
	[DefaultPackagePrice]=DefaultPackagePrice,
	[PackagePriceCalculated]=PackagePriceCalculated,
	[DefaultPackagePriceUnitId]=DefaultPackagePriceUnitId,
	[PriceUnitName]=pu.[Name],
	[PriceUnitTag]=pu.Tag
	FROM dbo.Package as p
	LEFT JOIN dbo.PriceUnit as pu ON pu.Id=p.DefaultPackagePriceUnitId;

END
GO
