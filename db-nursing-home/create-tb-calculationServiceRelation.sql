USE [ENV01_NURSING_HOME]
GO

/****** Object:  Table [dbo].[CalculationServiceRelation]    Script Date: 26.6.2023. 11:45:18 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CalculationServiceRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](2000) NULL,
	[MeasureUnitId] [int] NOT NULL,
	[CostPerUnit] [float] NOT NULL,
	[DefaultNumberOfUnits] [int] NULL,
	[PriceUnitId] [int] NOT NULL,
	[CalculationId] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
	[TotalPrice] [float] NULL,
	[PackageId] [int] NULL,
 CONSTRAINT [PK_CalculationServiceRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[CalculationServiceRelation]  WITH CHECK ADD  CONSTRAINT [FK_Table_1_Calculation] FOREIGN KEY([CalculationId])
REFERENCES [dbo].[Calculation] ([Id])
GO

ALTER TABLE [dbo].[CalculationServiceRelation] CHECK CONSTRAINT [FK_Table_1_Calculation]
GO

ALTER TABLE [dbo].[CalculationServiceRelation]  WITH CHECK ADD  CONSTRAINT [FK_Table_1_MeasureUnit] FOREIGN KEY([MeasureUnitId])
REFERENCES [dbo].[MeasureUnit] ([Id])
GO

ALTER TABLE [dbo].[CalculationServiceRelation] CHECK CONSTRAINT [FK_Table_1_MeasureUnit]
GO

ALTER TABLE [dbo].[CalculationServiceRelation]  WITH CHECK ADD  CONSTRAINT [FK_Table_1_PriceUnit] FOREIGN KEY([PriceUnitId])
REFERENCES [dbo].[PriceUnit] ([Id])
GO

ALTER TABLE [dbo].[CalculationServiceRelation] CHECK CONSTRAINT [FK_Table_1_PriceUnit]
GO

ALTER TABLE [dbo].[CalculationServiceRelation]  WITH CHECK ADD  CONSTRAINT [FK_Table_1_Table_1] FOREIGN KEY([PackageId])
REFERENCES [dbo].[CalculationPackageRelation] ([Id])
GO

ALTER TABLE [dbo].[CalculationServiceRelation] CHECK CONSTRAINT [FK_Table_1_Table_1]
GO

