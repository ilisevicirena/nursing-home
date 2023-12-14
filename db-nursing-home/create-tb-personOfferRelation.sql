CREATE TABLE [dbo].[PersonOfferRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[MeasureUnitId] [int] NOT NULL,
 CONSTRAINT [PK_PersonOfferRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
 

ALTER TABLE [dbo].[PersonOfferRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonOfferRelation_MeasureUnit] FOREIGN KEY([MeasureUnitId])
REFERENCES [dbo].[MeasureUnit] ([Id])
 

ALTER TABLE [dbo].[PersonOfferRelation] CHECK CONSTRAINT [FK_PersonOfferRelation_MeasureUnit]
 

ALTER TABLE [dbo].[PersonOfferRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonOfferRelation_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])
 

ALTER TABLE [dbo].[PersonOfferRelation] CHECK CONSTRAINT [FK_PersonOfferRelation_Person]
 


