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
-- Description:	Gets all active services
-- =============================================
CREATE PROCEDURE [dbo].[getServices]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 
	[Id]=s.Id,
	[Name]=s.[Name],
	[Description]=s.[Description],
	[MeasureUnitId]=s.MeasureUnitId,
	[MeasureUnitName]=m.[Name],
	[MeasureUnitTag]=m.Tag,
	[CostPerUnit]=s.CostPerUnit,
	[DefaultNumberOfUnits]=s.DefaultNumberOfUnits,
	[PriceUnitId]=s.PriceUnitId,
	[PriceUnitName]=p.[Name],
	[PriceUnitTag]=p.Tag
	FROM dbo.[Service] as s
	LEFT JOIN dbo.PriceUnit as p ON p.Id=s.PriceUnitId
	LEFT JOIN dbo.MeasureUnit as m on m.Id=s.MeasureUnitId
	WHERE s.Active=1;

END
GO
