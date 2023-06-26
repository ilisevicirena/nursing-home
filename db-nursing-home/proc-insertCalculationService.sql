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
-- Description:	inserts calculation service
-- =============================================
CREATE PROCEDURE [dbo].[insertCalculationService]
	-- Add the parameters for the stored procedure here
	(
		@Name varchar(50),
		@Description varchar(2000)=NULL,
		@MeasureUnitId int,
		@CostPerUnit float,
		@DefaultNumberOfUnits int=NULL,
		@PriceUnitId int,
		@CalculationId int,
		@Quantity int,
		@TotalPrice float=NULL,
		@PackageId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	insert into dbo.CalculationServiceRelation ([Name], [Description], [MeasureUnitId], [CostPerUnit], [DefaultNumberOfUnits], [PriceUnitId], [CalculationId], [Quantity], [TotalPrice], [PackageId])
	values (@Name, @Description, @MeasureUnitId, @CostPerUnit, @DefaultNumberOfUnits, @PriceUnitId, @CalculationId, @Quantity, @TotalPrice, @PackageId);

	select SCOPE_IDENTITY() as [CalculationServiceRelationId];
END
GO
