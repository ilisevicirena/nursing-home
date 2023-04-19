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
-- Create date: 19.4.2023.
-- Description:	updates person from Person table
-- =============================================
CREATE PROCEDURE [dbo].[updatePerson]
	-- Add the parameters for the stored procedure here
	(
		@Id int,
		@FirstName varchar(50),
		@LastName varchar(50),
		@JMBG varchar(50) = NULL,
		@BirthDate datetime = NULL,	
		@StartDate datetime = NULL,
		@EndDate datetime=NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE dbo.Person
	SET
		FirstName=@FirstName,
		LastName=@LastName,
		JMBG=@JMBG,
		BirthDate=@BirthDate,
		StartDate=@StartDate,
		EndDate=@EndDate
	WHERE Id = @Id
END
GO
