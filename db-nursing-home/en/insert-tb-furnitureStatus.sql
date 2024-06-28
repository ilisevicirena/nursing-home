INSERT INTO [dbo].[FurnitureStatus]
           ([Name],[Color],[Active],[Icon])
     VALUES
           (N'Active',N'success', 1, N'checkmark-circle-2-outline'),
		   (N'Inactive', N'danger', 1, N'close-circle-outline'),
		   (N'Inoperative',  N'warning', 1, N'alert-triangle-outline')