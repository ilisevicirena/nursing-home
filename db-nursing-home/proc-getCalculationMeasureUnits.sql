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
-- Create date: 5.5.2023.
-- Description:	gets all measure units for calculation
-- =============================================
CREATE PROCEDURE [dbo].[getCalculationMeasureUnits]
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select
	[Id]=Id,
	[Name]=[Name],
	[Tag]=Tag,
	[Code]=Code,
	[CalculationUnit]=CalculationUnit
	FROM dbo.MeasureUnit where CalculationUnit=1;
END
GO
