CREATE TABLE [dbo].[Person](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[JMBG] [varchar](50) NOT NULL,
	[BirthDate] [datetime] NULL,
	[Address] [varchar](200) NULL,
	[Active] [bit] NOT NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[CreationDate] [datetime] NOT NULL,
	[GenderId] [int] NOT NULL,	
	[MaidenLastName] [varchar](50) NULL,
	[FatherFirstName] [varchar](50) NULL,
	[MotherFirstName] [varchar](50) NULL,
	[MotherMaidenLastName] [varchar](50) NULL,
	[BirthCityId] [int] NULL,
	[BirthMunicipalityId] [int] NULL,
	[BirthCountryId] [int] NULL,
	[ResidanceCityId] [int] NULL,
	[ResidanceStreetName] [varchar](200) NULL,
	[ResidanceHouseNumber] [varchar](50) NULL,
	[Telephone] [varchar](50) NULL,
	[Mobile] [varchar](50) NULL,
	[Email] [varchar](50) NULL,
	[DoctorName] [varchar](200) NULL,
 CONSTRAINT [PK_Person] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
 

ALTER TABLE [dbo].[Person]  WITH CHECK ADD  CONSTRAINT [FK_Person_City] FOREIGN KEY([BirthCityId])
REFERENCES [dbo].[City] ([Id])
 

ALTER TABLE [dbo].[Person] CHECK CONSTRAINT [FK_Person_City]
 

ALTER TABLE [dbo].[Person]  WITH CHECK ADD  CONSTRAINT [FK_Person_City1] FOREIGN KEY([ResidanceCityId])
REFERENCES [dbo].[City] ([Id])
 

ALTER TABLE [dbo].[Person] CHECK CONSTRAINT [FK_Person_City1]
 

ALTER TABLE [dbo].[Person]  WITH CHECK ADD  CONSTRAINT [FK_Person_Country] FOREIGN KEY([BirthCountryId])
REFERENCES [dbo].[Country] ([Id])
 

ALTER TABLE [dbo].[Person] CHECK CONSTRAINT [FK_Person_Country]
 

ALTER TABLE [dbo].[Person]  WITH CHECK ADD  CONSTRAINT [FK_Person_Gender] FOREIGN KEY([GenderId])
REFERENCES [dbo].[Gender] ([Id])
 

ALTER TABLE [dbo].[Person] CHECK CONSTRAINT [FK_Person_Gender]
 

ALTER TABLE [dbo].[Person]  WITH CHECK ADD  CONSTRAINT [FK_Person_Municipality] FOREIGN KEY([BirthMunicipalityId])
REFERENCES [dbo].[Municipality] ([Id])
 

ALTER TABLE [dbo].[Person] CHECK CONSTRAINT [FK_Person_Municipality]
 


