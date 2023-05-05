USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[getMeasureUnits]    Script Date: 5.5.2023. 11:45:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 3.5.2023.
-- Description:	gets all measure units
-- =============================================
CREATE PROCEDURE [dbo].[getMeasureUnits]
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT
	[Id]=Id,
	[Name]=[Name],
	[Tag]=Tag,
	[Code]=Code,
	[CalculationUnit]=CalculationUnit
	FROM dbo.MeasureUnit;

END
GO

