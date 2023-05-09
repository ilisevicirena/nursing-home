USE [ENV01_NURSING_HOME]
GO

INSERT INTO [dbo].[NotificationType]
           ([Name]
           ,[Code]
           ,[StringKey])
     VALUES
           ('Events', 'events','events'),
		   ('Reminders', 'reminders', 'reminders'),
		   ('Other', 'other','')
GO


