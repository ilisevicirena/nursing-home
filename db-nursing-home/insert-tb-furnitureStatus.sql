INSERT INTO [dbo].[FurnitureStatus]
           ([Name],[Color],[Active],[Icon])
     VALUES
           (N'Aktivan',N'success', 1, N'checkmark-circle-2-outline'),
		   (N'Neaktivan', N'danger', 1, N'close-circle-outline'),
		   (N'U kvaru',  N'warning', 1, N'alert-triangle-outline')