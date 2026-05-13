CREATE TABLE [dbo].[PersonFunctionalStatus](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[MobilityStatus] [varchar](50) NULL,
	[CognitiveStatus] [varchar](50) NULL,
	[FallRisk] [varchar](50) NULL,
	[VisualStatus] [varchar](50) NULL,
	[HearingStatus] [varchar](50) NULL,
	[AssessmentDate] [datetime] NOT NULL,
	[NotesDescription] [varchar](max) NULL,
	[CreationDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_PersonFunctionalStatus] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[PersonFunctionalStatus]  WITH CHECK ADD  CONSTRAINT [FK_PersonFunctionalStatus_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])

ALTER TABLE [dbo].[PersonFunctionalStatus] CHECK CONSTRAINT [FK_PersonFunctionalStatus_Person]
