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
-- Description:	inserts service for person
-- =============================================
CREATE PROCEDURE [dbo].[insertServiceForPerson]
	-- Add the parameters for the stored procedure here
	(
		@PersonId int,
		@ServiceId int,
		@Quantity int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO dbo.PersonServiceRelation (PersonId, ServiceId, StartDate, EndDate, Active, Quantity)
	VALUES (@PersonId, @ServiceId, GETDATE(), NULL, 1, @Quantity);

	SELECT SCOPE_IDENTITY() AS [RowId];
END
GO
