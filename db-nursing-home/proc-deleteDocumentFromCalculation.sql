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
-- Create date: 6.7.2023.
-- Description:	deletes document from calculation
-- =============================================
CREATE PROCEDURE [dbo].[deleteDocumentFromCalculation]
	-- Add the parameters for the stored procedure here
	(
		@DocumentId int,
		@CalculationId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   DELETE FROM dbo.CalculationDocumentRelation WHERE CalculationId=@CalculationId AND DocumentId=@DocumentId;

	DELETE FROM dbo.Document WHERE Id=@DocumentId;

END
GO
