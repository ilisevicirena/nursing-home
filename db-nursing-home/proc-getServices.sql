USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[getServices]    Script Date: 22.5.2023. 12:08:03 ******/
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
	[MeasureUnitCode]=m.Code,
	[MeasureUnitTag]=m.Tag,
	[CostPerUnit]= FORMAT(s.CostPerUnit, 'N2'),
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

