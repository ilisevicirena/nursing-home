-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 30.5.2023.
-- Description:	inserts new document
-- =============================================
CREATE PROCEDURE [dbo].[insertDocument]
	-- Add the parameters for the stored procedure here
	(
		@PersonId int,
		@DocumentTypeId int,
		@Name varchar(50),
		@Extension varchar(50),
		@FileType varchar(50),
		@SavePath varchar(max)
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO dbo.Document (PersonId, DocumentTypeId, [Name], Extension, FileType, CreationDate)
	VALUES (@PersonId, @DocumentTypeId, @Name, @Extension, @FileType, GETDATE());

	declare @storageName varchar(200), @storagePath varchar(max);
	set @storageName=convert(varchar(max),SCOPE_IDENTITY())+'_'+convert(varchar(max),@PersonId)+'_'+convert(varchar(max),@DocumentTypeId)+'.'+@Extension;
	set @storagePath=@SavePath+@storageName;

	UPDATE dbo.Document 
	SET StorageName=@storageName,
	[Path]=@storagePath
	where Id=SCOPE_IDENTITY();

	SELECT 
	[Id]=Id,
	[Path]=[Path],
	[StorageName]=StorageName
	from dbo.Document
	where Id=SCOPE_IDENTITY();

END