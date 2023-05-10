USE [ENV01_NURSING_HOME]
GO

/****** Object:  Table [dbo].[Package]    Script Date: 10.5.2023. 9:19:31 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Package](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](2000) NULL,
	[DefaultPackagePrice] [float] NULL,
	[PackagePriceCalculated] [bit] NOT NULL,
	[DefaultPackagePriceUnitId] [int] NULL,
	[Active] [bit] NOT NULL,
	[CalculationMeasureUnitId] [int] NOT NULL,
	[CreationDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Package] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Package]  WITH CHECK ADD  CONSTRAINT [FK_Package_MeasureUnit] FOREIGN KEY([CalculationMeasureUnitId])
REFERENCES [dbo].[MeasureUnit] ([Id])
GO

ALTER TABLE [dbo].[Package] CHECK CONSTRAINT [FK_Package_MeasureUnit]
GO

ALTER TABLE [dbo].[Package]  WITH CHECK ADD  CONSTRAINT [FK_Package_Package] FOREIGN KEY([Id])
REFERENCES [dbo].[Package] ([Id])
GO

ALTER TABLE [dbo].[Package] CHECK CONSTRAINT [FK_Package_Package]
GO

ALTER TABLE [dbo].[Package]  WITH CHECK ADD  CONSTRAINT [FK_Package_PriceUnit] FOREIGN KEY([DefaultPackagePriceUnitId])
REFERENCES [dbo].[PriceUnit] ([Id])
GO

ALTER TABLE [dbo].[Package] CHECK CONSTRAINT [FK_Package_PriceUnit]
GO

