-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.5.2023.
-- Description:	update service
-- =============================================
CREATE PROCEDURE [dbo].[updateService]
	-- Add the parameters for the stored procedure here
	(
		@Id int,
		@Name varchar(50),
		@Description varchar(2000) = NULL,
		@MeasureUnitId int,
		@CostPerUnit float,
		@DefaultNumberOfUnits int = NULL,
		@PriceUnitId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE dbo.[Service]
	SET
	[Name]=@Name,
	[Description]=@Description,
	MeasureUnitId=@MeasureUnitId,
	CostPerUnit=@CostPerUnit,
	DefaultNumberOfUnits=@DefaultNumberOfUnits,
	PriceUnitId=@PriceUnitId
	WHERE Id=@Id;

END