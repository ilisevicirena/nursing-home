CREATE TABLE [dbo].[Employee](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[JMBG] [nvarchar](50) NOT NULL,
	[QualificationId] [int] NULL,
	[GenderId] [int] NULL,
	[Telephone] [nvarchar](50) NULL,
	[Mobile] [nvarchar](50) NULL,
	[Email] [nvarchar](50) NULL,
	[ResidanceCityId] [int] NULL,
	[ResidanceStreetName] [nvarchar](200) NULL,
	[ResidanceHouseNumber] [nvarchar](50) NULL,
	[BirthDate] [datetime] NOT NULL,
	[EmploymentDate] [datetime] NOT NULL,
	[BankName] [nvarchar](500) NULL,
	[BankAccountNumber] [nvarchar](50) NULL,
	[JobPositionId] [int] NULL,
	[EmploymentTypeId] [int] NULL,
	[FatherName] [nvarchar](50) NULL,
	[YearsOfExperiance] [int] NULL,
	[EmploymentEndDate] [datetime] NULL,
	[DaysOfVacation] [int] NULL,
	[SchoolName] [nvarchar](150) NULL,
	[SchoolQualificationName] [nvarchar](150) NULL,
	[BirthCountryId] [int] NULL,
	[BirthMunicipalityId] [int] NULL,
	[BirthCityId] [int] NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
 

ALTER TABLE [dbo].[Employee]  WITH CHECK ADD  CONSTRAINT [FK_Employee_City] FOREIGN KEY([ResidanceCityId])
REFERENCES [dbo].[City] ([Id])
 

ALTER TABLE [dbo].[Employee] CHECK CONSTRAINT [FK_Employee_City]
 

ALTER TABLE [dbo].[Employee]  WITH CHECK ADD  CONSTRAINT [FK_Employee_City1] FOREIGN KEY([BirthCityId])
REFERENCES [dbo].[City] ([Id])
 

ALTER TABLE [dbo].[Employee] CHECK CONSTRAINT [FK_Employee_City1]
 

ALTER TABLE [dbo].[Employee]  WITH CHECK ADD  CONSTRAINT [FK_Employee_Country] FOREIGN KEY([BirthCountryId])
REFERENCES [dbo].[Country] ([Id])
 

ALTER TABLE [dbo].[Employee] CHECK CONSTRAINT [FK_Employee_Country]
 

ALTER TABLE [dbo].[Employee]  WITH CHECK ADD  CONSTRAINT [FK_Employee_EmploymentType] FOREIGN KEY([EmploymentTypeId])
REFERENCES [dbo].[EmploymentType] ([Id])
 

ALTER TABLE [dbo].[Employee] CHECK CONSTRAINT [FK_Employee_EmploymentType]
 

ALTER TABLE [dbo].[Employee]  WITH CHECK ADD  CONSTRAINT [FK_Employee_Gender] FOREIGN KEY([GenderId])
REFERENCES [dbo].[Gender] ([Id])
 

ALTER TABLE [dbo].[Employee] CHECK CONSTRAINT [FK_Employee_Gender]
 

ALTER TABLE [dbo].[Employee]  WITH CHECK ADD  CONSTRAINT [FK_Employee_JobPosition] FOREIGN KEY([JobPositionId])
REFERENCES [dbo].[JobPosition] ([Id])
 

ALTER TABLE [dbo].[Employee] CHECK CONSTRAINT [FK_Employee_JobPosition]
 

ALTER TABLE [dbo].[Employee]  WITH CHECK ADD  CONSTRAINT [FK_Employee_Municipality] FOREIGN KEY([BirthMunicipalityId])
REFERENCES [dbo].[Municipality] ([Id])
 

ALTER TABLE [dbo].[Employee] CHECK CONSTRAINT [FK_Employee_Municipality]
 

ALTER TABLE [dbo].[Employee]  WITH CHECK ADD  CONSTRAINT [FK_Employee_Qualification] FOREIGN KEY([QualificationId])
REFERENCES [dbo].[Qualification] ([Id])
 

ALTER TABLE [dbo].[Employee] CHECK CONSTRAINT [FK_Employee_Qualification]
 


