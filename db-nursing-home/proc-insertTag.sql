USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[insertTag]    Script Date: 2.6.2023. 8:29:11 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.6.2023.
-- Description:	inserts new notes tag
-- =============================================
CREATE PROCEDURE [dbo].[insertTag] 
	-- Add the parameters for the stored procedure here
	(
		@Name varchar(50),
		@Color varchar(50) = NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO dbo.NotesTag ([Name], Color, Active) VALUES (@Name, @Color, 1);

	SELECT SCOPE_IDENTITY() AS [NotesTagId];
END
GO

