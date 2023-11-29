CREATE TABLE [dbo].[PersonAccommodationTypeRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[AccommodationTypeId] [int] NOT NULL,
 CONSTRAINT [PK_PersonAccommodationTypeRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
 

ALTER TABLE [dbo].[PersonAccommodationTypeRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonAccommodationTypeRelation_AccommodationType] FOREIGN KEY([AccommodationTypeId])
REFERENCES [dbo].[AccommodationType] ([Id])
 

ALTER TABLE [dbo].[PersonAccommodationTypeRelation] CHECK CONSTRAINT [FK_PersonAccommodationTypeRelation_AccommodationType]
 

ALTER TABLE [dbo].[PersonAccommodationTypeRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonAccommodationTypeRelation_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])
 

ALTER TABLE [dbo].[PersonAccommodationTypeRelation] CHECK CONSTRAINT [FK_PersonAccommodationTypeRelation_Person]
 
