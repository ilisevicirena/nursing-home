INSERT INTO [dbo].[GeneralSettings]
           ([Tag]
           ,[Value]
		   ,[Description])
     VALUES
           (N'allowDifferentGenderPersonsInRoom', N'0', N'Accomodation-management setting: specifies are different gender persons allowed to be placed in same room. 0 for NO, 1 for YES.'),
           (N'currency', N'KM', N'App-wide currency symbol shown across calculations, packages and discounts.'),
           (N'language', N'en', N'App-wide UI language applied to all users (en or hr).')