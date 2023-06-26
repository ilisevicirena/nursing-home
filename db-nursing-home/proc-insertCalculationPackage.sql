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
-- Create date: 26.6.2023.
-- Description:	inserts calculation package
-- =============================================
CREATE PROCEDURE [dbo].[insertCalculationPackage]
	-- Add the parameters for the stored procedure here
	(
		@Name varchar(50),
		@Description varchar(2000) = NULL,
		@DefaultPackagePrice float = NULL,
		@PackagePriceCalculated bit,
		@DefaultPackagePriceUnitId int = NULL,
		@CalculationMeasureUnitId int,
		@CalculationId int,
		@TotalPrice float = NULL,
		@PriceUnitId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    insert into dbo.CalculationPackageRelation ([Name], [Description], [DefaultPackagePrice], [PackagePriceCalculated], [DefaultPackagePriceUnitId], [CalculationMeasureUnitId], [CalculationId], [TotalPrice], [PriceUnitId])
	values (@Name, @Description, @DefaultPackagePrice, @PackagePriceCalculated, @DefaultPackagePriceUnitId, @CalculationMeasureUnitId, @CalculationId, @TotalPrice, @PriceUnitId);

	select SCOPE_IDENTITY() as [CalculationPackageRelationId];
END
GO
