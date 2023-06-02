USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[updateNote]    Script Date: 2.6.2023. 10:54:32 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.6.2023.
-- Description:	update note
-- =============================================
CREATE PROCEDURE [dbo].[updateNote] 
	-- Add the parameters for the stored procedure here
	(
		@Id int,
		@Title varchar(1000),
		@Text varchar(max)
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE dbo.Note 
	SET Title=@Title,
	[Text]=@Text,
	[LastModified]=GETDATE()
	WHERE Id=@Id;

END
GO

