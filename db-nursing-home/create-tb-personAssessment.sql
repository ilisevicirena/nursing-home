CREATE TABLE [dbo].[PersonAssessment](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[AssessmentDate] [datetime] NOT NULL,
	[BradenScore] [int] NULL,
	[FallRiskScore] [int] NULL,
	[MobilityScore] [int] NULL,
	[NutritionScore] [int] NULL,
	[Notes] [varchar](max) NULL,
	[AssessorName] [varchar](100) NULL,
	[CreationDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_PersonAssessment] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[PersonAssessment]  WITH CHECK ADD  CONSTRAINT [FK_PersonAssessment_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])

ALTER TABLE [dbo].[PersonAssessment] CHECK CONSTRAINT [FK_PersonAssessment_Person]
