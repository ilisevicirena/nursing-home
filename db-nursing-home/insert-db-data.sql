-- insert users (User.Id is CHAR(36), not IDENTITY — explicit GUIDs are correct)
INSERT [dbo].[User] ([Id], [Username], [Password], [Email], [FirstName], [LastName], [DateRegistered], [Active], [Blocked], [Verified])
VALUES (N'16ADA2BC-C382-415C-83E7-98EFE779C31F', N'user', N'ECE6128060FCDA0AFC43C2D59109C410E89DE2BEF602D70ED62C0640FD795970', N'i__ili@hotmail.com', N'User', N'User', CAST(N'2024-08-09T14:00:58.177' AS DateTime), 1, 0, 1)
INSERT [dbo].[User] ([Id], [Username], [Password], [Email], [FirstName], [LastName], [DateRegistered], [Active], [Blocked], [Verified])
VALUES (N'71028972-A6F2-410A-AA65-C0C671126523', N'admin', N'7523C62ABDB7628C5A9DAD8F97D8D8C5C040EDE36535E531A8A3748B6CAE7E00', N'irena.ilisevic@hotmail.com', N'Admin', N'Admin', CAST(N'2024-08-07T00:00:00.000' AS DateTime), 1, 0, 1)
INSERT [dbo].[User] ([Id], [Username], [Password], [Email], [FirstName], [LastName], [DateRegistered], [Active], [Blocked], [Verified])
VALUES (N'B822AC12-49E6-4F7B-90ED-E39807899560', N'employee', N'67A5727F577F6DB94C1AFDD895D02960AA9A6117EF22C985D22EF3CCC261FA75', N'no-reply.ngx-nursing-home@hotmail.com', N'Employee', N'Employee', CAST(N'2024-09-05T11:50:39.867' AS DateTime), 1, 0, 1)

-- assign roles
INSERT [dbo].[UserRoleRelation] ([UserId], [RoleId]) VALUES (N'71028972-A6F2-410A-AA65-C0C671126523', 1)
INSERT [dbo].[UserRoleRelation] ([UserId], [RoleId]) VALUES (N'16ADA2BC-C382-415C-83E7-98EFE779C31F', 3)
INSERT [dbo].[UserRoleRelation] ([UserId], [RoleId]) VALUES (N'B822AC12-49E6-4F7B-90ED-E39807899560', 4)

-- insert services
INSERT [dbo].[Service] ([Name], [Description], [MeasureUnitId], [CostPerUnit], [DefaultNumberOfUnits], [PriceUnitId], [Active])
VALUES (N'Smještaj trokrevetna soba', N'Smještaj u sobu. Boravak i noćenje.', 2, 300, NULL, 1, 1)
INSERT [dbo].[Service] ([Name], [Description], [MeasureUnitId], [CostPerUnit], [DefaultNumberOfUnits], [PriceUnitId], [Active])
VALUES (N'Hrana', N'Mjesečna hrana (doručak, ručak, večera)', 2, 300, NULL, 1, 1)
INSERT [dbo].[Service] ([Name], [Description], [MeasureUnitId], [CostPerUnit], [DefaultNumberOfUnits], [PriceUnitId], [Active])
VALUES (N'Pranje rublja', N'Pranje rublja', 4, 5, NULL, 1, 1)
INSERT [dbo].[Service] ([Name], [Description], [MeasureUnitId], [CostPerUnit], [DefaultNumberOfUnits], [PriceUnitId], [Active])
VALUES (N'Liječnička posjeta', N'Posjeta liječnika u domu', 4, 50, NULL, 1, 1)
INSERT [dbo].[Service] ([Name], [Description], [MeasureUnitId], [CostPerUnit], [DefaultNumberOfUnits], [PriceUnitId], [Active])
VALUES (N'Usluge frizera', N'Posjeta frizera u domu', 4, 10, NULL, 1, 1)
INSERT [dbo].[Service] ([Name], [Description], [MeasureUnitId], [CostPerUnit], [DefaultNumberOfUnits], [PriceUnitId], [Active])
VALUES (N'Fizioterapija', N'Posjeta fizioterapeuta u domu i vježbe 45 minuta', 4, 20, NULL, 1, 1)
INSERT [dbo].[Service] ([Name], [Description], [MeasureUnitId], [CostPerUnit], [DefaultNumberOfUnits], [PriceUnitId], [Active])
VALUES (N'Obrok', N'Pojedinačni obrok', 4, 10, NULL, 1, 1)
INSERT [dbo].[Service] ([Name], [Description], [MeasureUnitId], [CostPerUnit], [DefaultNumberOfUnits], [PriceUnitId], [Active])
VALUES (N'Noćenje', N'Pojedinačno noćenje', 4, 30, NULL, 1, 1)
INSERT [dbo].[Service] ([Name], [Description], [MeasureUnitId], [CostPerUnit], [DefaultNumberOfUnits], [PriceUnitId], [Active])
VALUES (N'Smještaj jednokrevetna soba', N'Smještaj i noćenje u jednokrevetnoj sobi.', 2, 500, NULL, 1, 1)
INSERT [dbo].[Service] ([Name], [Description], [MeasureUnitId], [CostPerUnit], [DefaultNumberOfUnits], [PriceUnitId], [Active])
VALUES (N'Smještaj dvokrevetna soba', N'Smještaj i noćenje u dvokrevetnoj sobi', 2, 400, NULL, 1, 1)

-- insert packages
INSERT [dbo].[Package] ([Name], [Description], [DefaultPackagePrice], [PackagePriceCalculated], [DefaultPackagePriceUnitId], [Active], [CalculationMeasureUnitId], [CreationDate])
VALUES (N'Smještaj jednokrevetna soba', N'Paket usluga na bazi mjesec dana u jednokrevetnoj sobi', 1100, 0, 1, 1, 2, CAST(N'2024-09-16T08:42:00.260' AS DateTime))
INSERT [dbo].[Package] ([Name], [Description], [DefaultPackagePrice], [PackagePriceCalculated], [DefaultPackagePriceUnitId], [Active], [CalculationMeasureUnitId], [CreationDate])
VALUES (N'Smještaj dvokrevetna soba', N'Paket usluga za smještaj u dvokrevetnoj sobi na bazi mjesec dana.', 1000, 0, 1, 1, 2, CAST(N'2024-09-16T08:43:17.430' AS DateTime))
INSERT [dbo].[Package] ([Name], [Description], [DefaultPackagePrice], [PackagePriceCalculated], [DefaultPackagePriceUnitId], [Active], [CalculationMeasureUnitId], [CreationDate])
VALUES (N'Smještaj trokrevetna soba', N'Smještaj u trokrevetnoj sobi na bazi mjesec dana.', NULL, 1, 1, 1, 2, CAST(N'2024-09-16T08:44:16.593' AS DateTime))
INSERT [dbo].[Package] ([Name], [Description], [DefaultPackagePrice], [PackagePriceCalculated], [DefaultPackagePriceUnitId], [Active], [CalculationMeasureUnitId], [CreationDate])
VALUES (N'Smještaj dvokrevetna soba kategorija 3', N'Smještaj dvokrevetna soba kategorija 3', 1200, 0, 1, 1, 2, CAST(N'2024-09-16T08:45:15.290' AS DateTime))

-- insert services for packages (ServiceId references: 9=jednokrevetna, 10=dvokrevetna, 1=trokrevetna, 2=hrana, 3=rublje, 4=liječnik)
INSERT [dbo].[ServicePackageRelation] ([ServiceId], [PackageId], [Quantity], [Active]) VALUES (9, 1, 1, 1)
INSERT [dbo].[ServicePackageRelation] ([ServiceId], [PackageId], [Quantity], [Active]) VALUES (4, 1, 1, 1)
INSERT [dbo].[ServicePackageRelation] ([ServiceId], [PackageId], [Quantity], [Active]) VALUES (2, 1, 1, 1)
INSERT [dbo].[ServicePackageRelation] ([ServiceId], [PackageId], [Quantity], [Active]) VALUES (3, 1, 3, 1)
INSERT [dbo].[ServicePackageRelation] ([ServiceId], [PackageId], [Quantity], [Active]) VALUES (2, 2, 1, 1)
INSERT [dbo].[ServicePackageRelation] ([ServiceId], [PackageId], [Quantity], [Active]) VALUES (3, 2, 3, 1)
INSERT [dbo].[ServicePackageRelation] ([ServiceId], [PackageId], [Quantity], [Active]) VALUES (4, 2, 1, 1)
INSERT [dbo].[ServicePackageRelation] ([ServiceId], [PackageId], [Quantity], [Active]) VALUES (10, 2, 1, 1)
INSERT [dbo].[ServicePackageRelation] ([ServiceId], [PackageId], [Quantity], [Active]) VALUES (1, 3, 1, 1)
INSERT [dbo].[ServicePackageRelation] ([ServiceId], [PackageId], [Quantity], [Active]) VALUES (2, 3, 1, 1)
INSERT [dbo].[ServicePackageRelation] ([ServiceId], [PackageId], [Quantity], [Active]) VALUES (4, 3, 1, 1)
INSERT [dbo].[ServicePackageRelation] ([ServiceId], [PackageId], [Quantity], [Active]) VALUES (3, 3, 3, 1)
INSERT [dbo].[ServicePackageRelation] ([ServiceId], [PackageId], [Quantity], [Active]) VALUES (3, 4, 3, 1)
INSERT [dbo].[ServicePackageRelation] ([ServiceId], [PackageId], [Quantity], [Active]) VALUES (10, 4, 1, 1)
INSERT [dbo].[ServicePackageRelation] ([ServiceId], [PackageId], [Quantity], [Active]) VALUES (2, 4, 1, 1)
INSERT [dbo].[ServicePackageRelation] ([ServiceId], [PackageId], [Quantity], [Active]) VALUES (4, 4, 1, 1)

-- insert discounts
INSERT [dbo].[Discount] ([Name], [Description], [Quantity], [PercentCalculation], [Active]) VALUES (N'Popust 10% ', N'Popust 10%', 10, 1, 1)

-- insert persons (via stored proc — IDs auto-assigned 1, 2, 3)
EXEC [dbo].[insertPerson] @FirstName=N'Pero', @LastName=N'Perić', @JMBG=N'0101936124356', @BirthDate=N'1936-01-01 00:00:00.000', @StartDate=N'2023-11-01 00:00:00.000',
  @GenderId=1, @MaidenLastName=N'', @FatherFirstName=N'Ivica', @MotherFirstName='Marica', @MotherMaidenLastName=N'Ivić', @BirthCityId=485,
  @BirthMunicipalityId=649, @BirthCountryId=1, @ResidanceCityId=485, @ResidanceStreetName=N'Vladimira Nazora', @ResidanceHouseNumber=N'36', @Telephone=N'031754123',
  @DoctorName=N'Josip Josipović';
EXEC [dbo].[insertPerson] @FirstName=N'Ana', @LastName=N'Anić', @JMBG=N'0202932187973', @BirthDate=N'1932-02-01T23:00:00.000Z', @StartDate=N'2023-10-31T23:00:00.000Z',
  @Address=N'', @GenderId=2, @MaidenLastName=N'Matić', @FatherFirstName=N'Anto', @MotherFirstName=N'Marija',
  @MotherMaidenLastName=N'Andrijević', @BirthCityId=978, @BirthMunicipalityId=427, @BirthCountryId=2, @ResidanceCityId=101, @ResidanceStreetName=N'Josipa Bana Jelačića',
  @ResidanceHouseNumber=N'bb', @Telephone=N'031741741', @Mobile=N'063222222', @Email=N'', @DoctorName=N'Antonio Antonijević';
EXEC [dbo].[insertPerson] @FirstName=N'Josip', @LastName=N'Josipović', @JMBG=N'0303933121315', @BirthDate=N'1933-03-02T23:00:00.000Z',
  @StartDate=N'2023-12-04T23:00:00.000Z', @Address=N'', @GenderId=1, @MaidenLastName=N'', @FatherFirstName=N'Marko',
  @MotherFirstName=N'Mara', @MotherMaidenLastName=N'Marković', @BirthCityId=485, @BirthMunicipalityId=649,
  @BirthCountryId=1, @ResidanceCityId=485, @ResidanceStreetName=N'Sportska', @ResidanceHouseNumber=N'26',
  @Telephone=N'', @Mobile=N'', @Email=N'', @DoctorName=N'Anto Antonijević';

-- insert notes (PersonId 1/2/3 match persons inserted above)
INSERT [dbo].[Note] ([PersonId], [CreationDate], [LastModified], [Title], [Text], [UserId])
VALUES (1, CAST(N'2024-09-26T11:26:48.540' AS DateTime), CAST(N'2024-09-26T11:26:48.540' AS DateTime), N'Raspored uzimanja lijekova', N'<div style="margin: 0px 14.3906px 0px 28.7969px; padding: 0px; width: 436.797px; float: left; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px;"><h2 style="margin-right: 0px; margin-bottom: 10px; margin-left: 0px; padding: 0px; font-weight: 400; font-family: DauphinPlain; font-size: 24px; line-height: 24px;">What is Lorem Ipsum?</h2><p style="margin-right: 0px; margin-bottom: 15px; margin-left: 0px; padding: 0px; text-align: justify;"><strong style="margin: 0px; padding: 0px;">Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><p style="margin-right: 0px; margin-bottom: 15px; margin-left: 0px; padding: 0px; text-align: justify;"><br></p><p style="margin-right: 0px; margin-bottom: 15px; margin-left: 0px; padding: 0px; text-align: justify;"><span style="color: var(--text-basic-color); font-family: DauphinPlain; font-size: 24px; background-color: var(--card-background-color); text-align: left;">Why do we use it?</span></p><p style="margin-right: 0px; margin-bottom: 15px; margin-left: 0px; padding: 0px; text-align: justify;"><span style="color: var(--text-basic-color); font-family: var(--text-paragraph-font-family); font-size: var(--text-paragraph-font-size); font-weight: var(--text-paragraph-font-weight); background-color: var(--card-background-color);">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ''Content here, content here'', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for ''lorem ipsum'' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</span></p></div>', N'71028972-A6F2-410A-AA65-C0C671126523')
INSERT [dbo].[Note] ([PersonId], [CreationDate], [LastModified], [Title], [Text], [UserId])
VALUES (1, CAST(N'2024-09-26T11:27:56.503' AS DateTime), CAST(N'2024-09-26T11:27:56.503' AS DateTime), N'Popis priloženih nalaza', N'<h3 style="margin: 15px 0px; padding: 0px; font-weight: 700; font-size: 14px; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif;">The standard Lorem Ipsum passage, used since the 1500s</h3><p style="margin-right: 0px; margin-bottom: 15px; margin-left: 0px; padding: 0px; text-align: justify; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; font-weight: 400;">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p><h3 style="margin: 15px 0px; padding: 0px; font-weight: 700; font-size: 14px; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif;">Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h3><p style="margin-right: 0px; margin-bottom: 15px; margin-left: 0px; padding: 0px; text-align: justify; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; font-weight: 400;">"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>', N'71028972-A6F2-410A-AA65-C0C671126523')
INSERT [dbo].[Note] ([PersonId], [CreationDate], [LastModified], [Title], [Text], [UserId])
VALUES (2, CAST(N'2024-09-26T11:29:40.453' AS DateTime), CAST(N'2024-09-26T11:29:40.453' AS DateTime), N'Raspored uzimanja lijekova', N'<p><span style="color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;">"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</span><br></p>', N'71028972-A6F2-410A-AA65-C0C671126523')
INSERT [dbo].[Note] ([PersonId], [CreationDate], [LastModified], [Title], [Text], [UserId])
VALUES (3, CAST(N'2024-09-26T11:45:12.047' AS DateTime), CAST(N'2024-09-26T11:45:12.047' AS DateTime), N'Raspored uzimanja lijekova', N'<p><span style="color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;">"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</span><br></p>', N'71028972-A6F2-410A-AA65-C0C671126523')

-- note tags (NoteId 1-4 match notes inserted above)
INSERT [dbo].[NoteTagRelation] ([TagId], [NoteId]) VALUES (4, 1)
INSERT [dbo].[NoteTagRelation] ([TagId], [NoteId]) VALUES (2, 2)
INSERT [dbo].[NoteTagRelation] ([TagId], [NoteId]) VALUES (4, 3)
INSERT [dbo].[NoteTagRelation] ([TagId], [NoteId]) VALUES (2, 3)
INSERT [dbo].[NoteTagRelation] ([TagId], [NoteId]) VALUES (2, 4)
INSERT [dbo].[NoteTagRelation] ([TagId], [NoteId]) VALUES (4, 4)

-- insert contacts
INSERT [dbo].[Contact] ([FirstName], [LastName], [Email], [Telephone], [Mobile], [PersonId], [Jmbg], [ResidanceCityId], [ResidanceStreetName], [ResidanceHouseNumber], [IsObligeeToPay], [IsGuardian])
VALUES (N'User', N'User', N'i__ili@hotmail.com', NULL, NULL, 2, NULL, NULL, NULL, NULL, 0, 0)
INSERT [dbo].[Contact] ([FirstName], [LastName], [Email], [Telephone], [Mobile], [PersonId], [Jmbg], [ResidanceCityId], [ResidanceStreetName], [ResidanceHouseNumber], [IsObligeeToPay], [IsGuardian])
VALUES (N'Anto', N'Antić', N'aantic@gmail.com', NULL, N'063255255', 1, N'01019990203632', 101, N'Franjevačka', N'22a', 1, 1)
INSERT [dbo].[Contact] ([FirstName], [LastName], [Email], [Telephone], [Mobile], [PersonId], [Jmbg], [ResidanceCityId], [ResidanceStreetName], [ResidanceHouseNumber], [IsObligeeToPay], [IsGuardian])
VALUES (N'User', N'User', N'i__ili@hotmail.com', NULL, NULL, 1, NULL, NULL, NULL, NULL, 0, 0)
INSERT [dbo].[Contact] ([FirstName], [LastName], [Email], [Telephone], [Mobile], [PersonId], [Jmbg], [ResidanceCityId], [ResidanceStreetName], [ResidanceHouseNumber], [IsObligeeToPay], [IsGuardian])
VALUES (N'Employee', N'Employee', N'no-reply.ngx-nursing-home@hotmail.com', NULL, NULL, 3, NULL, NULL, NULL, NULL, 0, 0)
INSERT [dbo].[Contact] ([FirstName], [LastName], [Email], [Telephone], [Mobile], [PersonId], [Jmbg], [ResidanceCityId], [ResidanceStreetName], [ResidanceHouseNumber], [IsObligeeToPay], [IsGuardian])
VALUES (N'Admin', N'Admin', N'irena.ilisevic@hotmail.com', NULL, NULL, 3, NULL, NULL, NULL, NULL, 0, 0)

-- link users to contacts (ContactId 1-5 match contacts inserted above)
INSERT [dbo].[UserContactRelation] ([UserId], [ContactId]) VALUES (N'16ADA2BC-C382-415C-83E7-98EFE779C31F', 1)
INSERT [dbo].[UserContactRelation] ([UserId], [ContactId]) VALUES (N'16ADA2BC-C382-415C-83E7-98EFE779C31F', 3)
INSERT [dbo].[UserContactRelation] ([UserId], [ContactId]) VALUES (N'B822AC12-49E6-4F7B-90ED-E39807899560', 4)
INSERT [dbo].[UserContactRelation] ([UserId], [ContactId]) VALUES (N'71028972-A6F2-410A-AA65-C0C671126523', 5)

INSERT [dbo].[PersonAccommodationTypeRelation] ([PersonId], [AccommodationTypeId]) VALUES (2, 2)
INSERT [dbo].[PersonAccommodationTypeRelation] ([PersonId], [AccommodationTypeId]) VALUES (1, 2)
INSERT [dbo].[PersonAccommodationTypeRelation] ([PersonId], [AccommodationTypeId]) VALUES (3, 2)

INSERT [dbo].[PersonCategoryRelation] ([PersonId], [PersonCategoryId]) VALUES (2, 2)
INSERT [dbo].[PersonCategoryRelation] ([PersonId], [PersonCategoryId]) VALUES (1, 2)
INSERT [dbo].[PersonCategoryRelation] ([PersonId], [PersonCategoryId]) VALUES (3, 3)

INSERT [dbo].[PersonHealthConditionRelation] ([PersonId], [HealthConditionId], [Description]) VALUES (2, 2, N'')
INSERT [dbo].[PersonHealthConditionRelation] ([PersonId], [HealthConditionId], [Description]) VALUES (2, 5, N'')
INSERT [dbo].[PersonHealthConditionRelation] ([PersonId], [HealthConditionId], [Description]) VALUES (2, 4, N'')
INSERT [dbo].[PersonHealthConditionRelation] ([PersonId], [HealthConditionId], [Description]) VALUES (1, 1, N'')
INSERT [dbo].[PersonHealthConditionRelation] ([PersonId], [HealthConditionId], [Description]) VALUES (1, 7, N'')
INSERT [dbo].[PersonHealthConditionRelation] ([PersonId], [HealthConditionId], [Description]) VALUES (3, 4, N'')
INSERT [dbo].[PersonHealthConditionRelation] ([PersonId], [HealthConditionId], [Description]) VALUES (3, 5, N'')
INSERT [dbo].[PersonHealthConditionRelation] ([PersonId], [HealthConditionId], [Description]) VALUES (3, 6, N'')

INSERT [dbo].[PersonOfferRelation] ([PersonId], [MeasureUnitId]) VALUES (2, 2)
INSERT [dbo].[PersonOfferRelation] ([PersonId], [MeasureUnitId]) VALUES (1, 2)
INSERT [dbo].[PersonOfferRelation] ([PersonId], [MeasureUnitId]) VALUES (3, 2)

INSERT [dbo].[PersonPackageRelation] ([PersonId], [PackageId], [StartDate], [EndDate], [Active])
VALUES (2, 2, CAST(N'2024-09-26T11:21:52.313' AS DateTime), NULL, 1)
INSERT [dbo].[PersonPackageRelation] ([PersonId], [PackageId], [StartDate], [EndDate], [Active])
VALUES (1, 2, CAST(N'2024-09-26T11:28:52.933' AS DateTime), NULL, 1)
INSERT [dbo].[PersonPackageRelation] ([PersonId], [PackageId], [StartDate], [EndDate], [Active])
VALUES (3, 4, CAST(N'2024-09-26T11:45:29.620' AS DateTime), NULL, 1)

INSERT [dbo].[PersonRoomRelation] ([PersonId], [RoomId], [Active], [CreationDate], [StartDate], [EndDate])
VALUES (1, 1, 1, CAST(N'2024-09-26T00:00:00.000' AS DateTime), CAST(N'2024-09-26T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[PersonRoomRelation] ([PersonId], [RoomId], [Active], [CreationDate], [StartDate], [EndDate])
VALUES (3, 1, 1, CAST(N'2024-09-26T00:00:00.000' AS DateTime), CAST(N'2024-09-26T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[PersonRoomRelation] ([PersonId], [RoomId], [Active], [CreationDate], [StartDate], [EndDate])
VALUES (2, 2, 1, CAST(N'2024-09-26T00:00:00.000' AS DateTime), CAST(N'2024-09-26T00:00:00.000' AS DateTime), NULL)

INSERT [dbo].[PersonServiceRelation] ([PersonId], [ServiceId], [StartDate], [EndDate], [Active], [Quantity])
VALUES (1, 6, CAST(N'2024-09-26T11:28:52.943' AS DateTime), NULL, 1, 3)
INSERT [dbo].[PersonServiceRelation] ([PersonId], [ServiceId], [StartDate], [EndDate], [Active], [Quantity])
VALUES (1, 5, CAST(N'2024-09-26T11:28:52.943' AS DateTime), NULL, 1, 1)
INSERT [dbo].[PersonServiceRelation] ([PersonId], [ServiceId], [StartDate], [EndDate], [Active], [Quantity])
VALUES (3, 6, CAST(N'2024-09-26T11:45:29.620' AS DateTime), NULL, 1, 5)
INSERT [dbo].[PersonServiceRelation] ([PersonId], [ServiceId], [StartDate], [EndDate], [Active], [Quantity])
VALUES (3, 3, CAST(N'2024-09-26T11:45:29.620' AS DateTime), NULL, 1, 3)
