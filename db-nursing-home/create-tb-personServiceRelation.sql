CREATE TABLE [dbo].[PersonServiceRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[ServiceId] [int] NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NULL,
	[Active] [bit] NOT NULL,
	[Quantity] [int] NOT NULL,
 CONSTRAINT [PK_PersonServiceRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
 

ALTER TABLE [dbo].[PersonServiceRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonServiceRelation_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])
 

ALTER TABLE [dbo].[PersonServiceRelation] CHECK CONSTRAINT [FK_PersonServiceRelation_Person]
 

ALTER TABLE [dbo].[PersonServiceRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonServiceRelation_Service] FOREIGN KEY([ServiceId])
REFERENCES [dbo].[Service] ([Id])
 

ALTER TABLE [dbo].[PersonServiceRelation] CHECK CONSTRAINT [FK_PersonServiceRelation_Service]
 

