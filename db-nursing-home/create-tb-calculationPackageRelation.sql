USE [ENV01_NURSING_HOME]
GO

/****** Object:  Table [dbo].[CalculationPackageRelation]    Script Date: 26.6.2023. 11:44:58 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CalculationPackageRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](2000) NULL,
	[DefaultPackagePrice] [float] NULL,
	[PackagePriceCalculated] [bit] NOT NULL,
	[DefaultPackagePriceUnitId] [int] NULL,
	[CalculationMeasureUnitId] [int] NOT NULL,
	[CalculationId] [int] NOT NULL,
	[TotalPrice] [float] NULL,
	[PriceUnitId] [int] NOT NULL,
 CONSTRAINT [PK_CalculationPackageRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[CalculationPackageRelation]  WITH CHECK ADD  CONSTRAINT [FK_CalculationPackageRelation_Calculation] FOREIGN KEY([CalculationId])
REFERENCES [dbo].[Calculation] ([Id])
GO

ALTER TABLE [dbo].[CalculationPackageRelation] CHECK CONSTRAINT [FK_CalculationPackageRelation_Calculation]
GO

ALTER TABLE [dbo].[CalculationPackageRelation]  WITH CHECK ADD  CONSTRAINT [FK_CalculationPackageRelation_MeasureUnit] FOREIGN KEY([CalculationMeasureUnitId])
REFERENCES [dbo].[MeasureUnit] ([Id])
GO

ALTER TABLE [dbo].[CalculationPackageRelation] CHECK CONSTRAINT [FK_CalculationPackageRelation_MeasureUnit]
GO

ALTER TABLE [dbo].[CalculationPackageRelation]  WITH CHECK ADD  CONSTRAINT [FK_CalculationPackageRelation_PriceUnit] FOREIGN KEY([DefaultPackagePriceUnitId])
REFERENCES [dbo].[PriceUnit] ([Id])
GO

ALTER TABLE [dbo].[CalculationPackageRelation] CHECK CONSTRAINT [FK_CalculationPackageRelation_PriceUnit]
GO

ALTER TABLE [dbo].[CalculationPackageRelation]  WITH CHECK ADD  CONSTRAINT [FK_CalculationPackageRelation_PriceUnit1] FOREIGN KEY([PriceUnitId])
REFERENCES [dbo].[PriceUnit] ([Id])
GO

ALTER TABLE [dbo].[CalculationPackageRelation] CHECK CONSTRAINT [FK_CalculationPackageRelation_PriceUnit1]
GO

