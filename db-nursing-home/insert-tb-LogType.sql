USE [ENV01_NURSING_HOME]
GO

INSERT INTO [dbo].[LogType]
           ([Name],[NamePretty])
     VALUES
           ('INSERT','Kreiranje'),
		   ('UPDATE','Promjena'),
		   ('DELETE','Brisanje')
GO


