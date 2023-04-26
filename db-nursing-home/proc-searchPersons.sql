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
-- Create date: 25.4.2023.
-- Description:	find person matches
-- =============================================
CREATE PROCEDURE [dbo].[searchPersons]
	-- Add the parameters for the stored procedure here
	( @searchTerm varchar(10))
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select 
	[Id]=Id,
	[FirstName]=FirstName,
	[LastName]=LastName,
	[JMBG]=JMBG,
	[BirthDate]=BirthDate,
	[Active]=Active,
	[StartDate]=StartDate
	from dbo.Person 
	where FirstName like '%'+@searchTerm+'%' 
	or LastName like '%'+@searchTerm+'%' 
	or JMBG like '%'+@searchTerm+'%' 
	or [Address] like '%'+@searchTerm+'%';
END
GO
