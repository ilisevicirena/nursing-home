USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[insertService]    Script Date: 2.5.2023. 12:16:18 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.5.2023.
-- Description:	inserts new service
-- =============================================
CREATE PROCEDURE [dbo].[insertService] 
	-- Add the parameters for the stored procedure here
	(
		@Name varchar(50),
		@Description varchar(2000) = NULL,
		@MeasureUnitId int,
		@CostPerUnit int,
		@DefaultNumberOfUnits int = NULL,
		@PriceUnitId int = NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO dbo.[Service] ([Name], [Description], MeasureUnitId, CostPerUnit, DefaultNumberOfUnits, PriceUnitId, Active)
	VALUES (@Name, @Description, @MeasureUnitId, @CostPerUnit, @DefaultNumberOfUnits, @PriceUnitId, 1);

	SELECT SCOPE_IDENTITY() AS [ServiceId];
END
GO

