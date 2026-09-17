CREATE TABLE [dbo].[PersonDietaryRestriction](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[DietaryTypeId] [int] NOT NULL,
	[Restrictions] [varchar](max) NULL,
	[Notes] [varchar](max) NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NULL,
	[CreationDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_PersonDietaryRestriction] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[PersonDietaryRestriction]  WITH CHECK ADD  CONSTRAINT [FK_PersonDietaryRestriction_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])

ALTER TABLE [dbo].[PersonDietaryRestriction] CHECK CONSTRAINT [FK_PersonDietaryRestriction_Person]

ALTER TABLE [dbo].[PersonDietaryRestriction]  WITH CHECK ADD  CONSTRAINT [FK_PersonDietaryRestriction_DietaryType] FOREIGN KEY([DietaryTypeId])
REFERENCES [dbo].[DietaryType] ([Id])

ALTER TABLE [dbo].[PersonDietaryRestriction] CHECK CONSTRAINT [FK_PersonDietaryRestriction_DietaryType]
