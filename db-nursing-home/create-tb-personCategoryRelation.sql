
CREATE TABLE [dbo].[PersonCategoryRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[PersonCategoryId] [int] NOT NULL,
 CONSTRAINT [PK_PersonCategoryRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[PersonCategoryRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonCategoryRelation_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])

ALTER TABLE [dbo].[PersonCategoryRelation] CHECK CONSTRAINT [FK_PersonCategoryRelation_Person]
   

ALTER TABLE [dbo].[PersonCategoryRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonCategoryRelation_PersonCategory] FOREIGN KEY([PersonCategoryId])
REFERENCES [dbo].[PersonCategory] ([Id])
   

ALTER TABLE [dbo].[PersonCategoryRelation] CHECK CONSTRAINT [FK_PersonCategoryRelation_PersonCategory]
   


