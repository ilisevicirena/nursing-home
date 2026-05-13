CREATE TABLE [dbo].[PersonAllergen](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[AllergenId] [int] NULL,
	[AllergenName] [varchar](100) NULL,
	[ReactionDescription] [varchar](300) NULL,
	[Severity] [varchar](50) NOT NULL,
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

ALTER TABLE [dbo].[PersonAllergen]  WITH CHECK ADD  CONSTRAINT [FK_PersonAllergen_Allergen] FOREIGN KEY([AllergenId])
REFERENCES [dbo].[Allergen] ([Id])

ALTER TABLE [dbo].[PersonAllergen] CHECK CONSTRAINT [FK_PersonAllergen_Allergen]
