USE [ENV01_NURSING_HOME]
GO

/****** Object:  Table [dbo].[PersonServiceRelation]    Script Date: 2.5.2023. 14:00:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PersonServiceRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[ServiceId] [int] NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NULL,
	[Active] [bit] NOT NULL,
	[Quantity] [int] NULL,
 CONSTRAINT [PK_PersonServiceRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[PersonServiceRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonServiceRelation_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])
GO

ALTER TABLE [dbo].[PersonServiceRelation] CHECK CONSTRAINT [FK_PersonServiceRelation_Person]
GO

ALTER TABLE [dbo].[PersonServiceRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonServiceRelation_Service] FOREIGN KEY([ServiceId])
REFERENCES [dbo].[Service] ([Id])
GO

ALTER TABLE [dbo].[PersonServiceRelation] CHECK CONSTRAINT [FK_PersonServiceRelation_Service]
GO

