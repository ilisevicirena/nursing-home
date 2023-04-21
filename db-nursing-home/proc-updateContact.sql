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
-- Create date: 21.4.2023.
-- Description:	updates contact for person
-- =============================================
CREATE PROCEDURE [dbo].[updateContact]
	-- Add the parameters for the stored procedure here
(
	@Id int,
	@FirstName varchar(50),
	@LastName varchar(50),
	@Email varchar(50),
	@Telephone varchar(50),
	@Mobile varchar(50)
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE dbo.Contact
	SET FirstName=@FirstName, LastName=@LastName, Email=@Email, Telephone=@Telephone, Mobile=@Mobile
	WHERE Id=@Id;
END
GO
