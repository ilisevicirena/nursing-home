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