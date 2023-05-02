USE [ENV01_NURSING_HOME]
GO

/****** Object:  Table [dbo].[PersonPackageRelation]    Script Date: 2.5.2023. 12:02:43 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PersonPackageRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[PackageId] [int] NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_PersonPackageRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[PersonPackageRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonPackageRelation_Package] FOREIGN KEY([PackageId])
REFERENCES [dbo].[Package] ([Id])
GO

ALTER TABLE [dbo].[PersonPackageRelation] CHECK CONSTRAINT [FK_PersonPackageRelation_Package]
GO

ALTER TABLE [dbo].[PersonPackageRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonPackageRelation_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])
GO

ALTER TABLE [dbo].[PersonPackageRelation] CHECK CONSTRAINT [FK_PersonPackageRelation_Person]
GO

