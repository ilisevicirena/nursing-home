CREATE TABLE [dbo].[PersonMedication](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[MedicationName] [varchar](100) NOT NULL,
	[Dosage] [varchar](100) NULL,
	[Frequency] [varchar](100) NULL,
	[Route] [varchar](50) NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NULL,
	[Indication] [varchar](300) NULL,
	[Notes] [varchar](max) NULL,
	[Status] [varchar](50) NOT NULL,
	[PrescriberName] [varchar](100) NULL,
	[CreationDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_PersonMedication] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[PersonMedication]  WITH CHECK ADD  CONSTRAINT [FK_PersonMedication_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])

ALTER TABLE [dbo].[PersonMedication] CHECK CONSTRAINT [FK_PersonMedication_Person]
