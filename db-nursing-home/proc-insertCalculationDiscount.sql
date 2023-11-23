-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 26.6.2023.
-- Description:	inserts calculation discount
-- =============================================
CREATE PROCEDURE [dbo].[insertCalculationDiscount]
	-- Add the parameters for the stored procedure here
	(
		@Name varchar(50),
		@Description varchar(2000)=NULL,
		@Quantity int,
		@PercentCalculation bit,
		@CalculationId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   insert into dbo.CalculationDiscountRelation ([Name], [Description], [Quantity], [PercentCalculation], [CalculationId])
   values (@Name, @Description, @Quantity, @PercentCalculation, @CalculationId);

   select SCOPE_IDENTITY() as [CalculationDiscountRelationId];

END