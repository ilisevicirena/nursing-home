INSERT INTO [dbo].[VacationStatus]
           ([Name], [Color], [Icon])
     VALUES
           (N'Created', 'info', 'checkmark-circle-2-outline'),
           (N'In Progress', 'warning', 'loader-outline'),
           (N'Cancelled', 'danger','close-circle-outline'),
           (N'Completed', 'success','checkmark-circle-outline')
