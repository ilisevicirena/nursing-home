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
-- Create date: 28.4.2023
-- Description:	creates new log row
-- =============================================
CREATE PROCEDURE [dbo].[writeLog]
	-- Add the parameters for the stored procedure here
	(
		@LogType varchar(50),
		@LogEntity varchar(50),
		@Key int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	declare @type int, @entity int;
	
	select @type=Id from dbo.LogType where [Name]=@LogType;
	select @entity=Id from dbo.LogEntity where [Name]=@LogEntity;

	insert into dbo.Log (LogTypeId, LogEntityId, KeyId, CreationDate) 
	values (@type, @entity, @Key, GETDATE());
END
GO
