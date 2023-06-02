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
-- Create date: 2.6.2023.
-- Description:	gets all note tags for note
-- =============================================
CREATE PROCEDURE [dbo].[getNoteTags] 
	-- Add the parameters for the stored procedure here
	(
		@NoteId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 
	[NoteId]=ntr.NoteId,
	[Id]=ntr.TagId,
	[Name]=nt.[Name],
	[Color]=nt.Color
	FROM dbo.NoteTagRelation as ntr 
	join dbo.NotesTag as nt on ntr.TagId=nt.Id
	where ntr.NoteId=@NoteId and nt.Active=1;

END
GO
