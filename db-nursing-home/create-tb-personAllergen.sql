CREATE TABLE [dbo].[PersonAllergen](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[AllergenName] [varchar](100) NOT NULL,
	[ReactionDescription] [varchar](300) NULL,
	[SeverityId] [int] NOT NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[CreationDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_PersonAllergen] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[PersonAllergen]  WITH CHECK ADD  CONSTRAINT [FK_PersonAllergen_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])

ALTER TABLE [dbo].[PersonAllergen] CHECK CONSTRAINT [FK_PersonAllergen_Person]

ALTER TABLE [dbo].[PersonAllergen]  WITH CHECK ADD  CONSTRAINT [FK_PersonAllergen_AllergenSeverity] FOREIGN KEY([SeverityId])
REFERENCES [dbo].[AllergenSeverity] ([Id])

ALTER TABLE [dbo].[PersonAllergen] CHECK CONSTRAINT [FK_PersonAllergen_AllergenSeverity]
