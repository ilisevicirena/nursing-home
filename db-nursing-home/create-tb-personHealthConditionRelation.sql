CREATE TABLE [dbo].[PersonHealthConditionRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[HealthConditionId] [int] NOT NULL,
	[Description] [varchar](500) NULL,
 CONSTRAINT [PK_PersonHealthConditionRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
   

ALTER TABLE [dbo].[PersonHealthConditionRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonHealthConditionRelation_HealthCondition] FOREIGN KEY([HealthConditionId])
REFERENCES [dbo].[HealthCondition] ([Id])
   

ALTER TABLE [dbo].[PersonHealthConditionRelation] CHECK CONSTRAINT [FK_PersonHealthConditionRelation_HealthCondition]
   

ALTER TABLE [dbo].[PersonHealthConditionRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonHealthConditionRelation_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])
   

ALTER TABLE [dbo].[PersonHealthConditionRelation] CHECK CONSTRAINT [FK_PersonHealthConditionRelation_Person]
   

