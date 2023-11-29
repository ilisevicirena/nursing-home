CREATE TABLE [dbo].[Contact](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[Email] [varchar](50) NULL,
	[Telephone] [varchar](50) NULL,
	[Mobile] [varchar](50) NULL,
	[PersonId] [int] NOT NULL,
	[Jmbg] [varchar](50) NULL,
	[ResidanceCityId] [int] NULL,
	[ResidanceStreetName] [varchar](300) NULL,
	[ResidanceHouseNumber] [varchar](50) NULL,
	[IsObligeeToPay] [bit] NULL,
	[IsGuardian] [bit] NULL,
 CONSTRAINT [PK_Contact] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
 

ALTER TABLE [dbo].[Contact]  WITH CHECK ADD  CONSTRAINT [FK_Contact_Person] FOREIGN KEY([ResidanceCityId])
REFERENCES [dbo].[City] ([Id])
 

ALTER TABLE [dbo].[Contact] CHECK CONSTRAINT [FK_Contact_Person]

