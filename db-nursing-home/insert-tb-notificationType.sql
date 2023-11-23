
INSERT INTO [dbo].[NotificationType]
           ([Name]
           ,[Code]
           ,[StringKey]
           ,[Enabled]
           ,[DaysReminder])
     VALUES
           ('Events', 'events','events',1,2),
		   ('Reminders', 'reminders', 'reminders',1,2),
		   ('Other', 'other','other',1,2)