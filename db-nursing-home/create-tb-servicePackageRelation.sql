USE [ENV01_NURSING_HOME]
GO

/****** Object:  Table [dbo].[ServicePackageRelation]    Script Date: 2.5.2023. 12:32:59 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ServicePackageRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ServiceId] [int] NOT NULL,
	[PackageId] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
	[Active] [bit] NULL,
 CONSTRAINT [PK_ServicePackageRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ServicePackageRelation]  WITH CHECK ADD  CONSTRAINT [FK_ServicePackageRelation_Package] FOREIGN KEY([PackageId])
REFERENCES [dbo].[Package] ([Id])
GO

ALTER TABLE [dbo].[ServicePackageRelation] CHECK CONSTRAINT [FK_ServicePackageRelation_Package]
GO

ALTER TABLE [dbo].[ServicePackageRelation]  WITH CHECK ADD  CONSTRAINT [FK_ServicePackageRelation_Service] FOREIGN KEY([ServiceId])
REFERENCES [dbo].[Service] ([Id])
GO

ALTER TABLE [dbo].[ServicePackageRelation] CHECK CONSTRAINT [FK_ServicePackageRelation_Service]
GO

