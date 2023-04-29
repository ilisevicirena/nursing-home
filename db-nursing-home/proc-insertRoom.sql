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
-- Create date: 14.4.2023.
-- Description:	Inserts new room to Room table.
-- =============================================
CREATE PROCEDURE [dbo].[insertRoom]
	-- Add the parameters for the stored procedure here
	(
	@Name varchar(50),
	@Capacity int,
	@FloorId int = NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO dbo.Room(Name, Capacity, FloorId)
	VALUES(@Name, @Capacity, @FloorId);

	DECLARE @NewIdent Int
SET @NewIdent = SCOPE_IDENTITY();

exec dbo.writeLog @LogType='INSERT', @LogEntity='Room', @Key= @NewIdent;

	SELECT SCOPE_IDENTITY() AS RoomId
END
GO
