INSERT INTO [dbo].[CalculationStatus]
           ([Name]
           ,[StringKey]
           ,[Color])
     VALUES
            (N'Paid','calculationPaid', 'success'),
	      (N'Not paid','calculationNotPaid', 'danger'),
		(N'Cancelled','calculationCancelled', 'warning');