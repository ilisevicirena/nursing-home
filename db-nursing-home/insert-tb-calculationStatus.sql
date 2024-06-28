INSERT INTO [dbo].[CalculationStatus]
           ([Name]
           ,[StringKey]
           ,[Color])
     VALUES
            (N'Plaćeno','calculationPaid', 'success'),
	      (N'Nije plaćeno','calculationNotPaid', 'danger'),
		(N'Storniran','calculationCancelled', 'warning');