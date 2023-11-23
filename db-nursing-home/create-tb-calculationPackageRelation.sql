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
 

ALTER TABLE [dbo].[CalculationPackageRelation]  WITH CHECK ADD  CONSTRAINT [FK_CalculationPackageRelation_Calculation] FOREIGN KEY([CalculationId])
REFERENCES [dbo].[Calculation] ([Id])
 

ALTER TABLE [dbo].[CalculationPackageRelation] CHECK CONSTRAINT [FK_CalculationPackageRelation_Calculation]
 

ALTER TABLE [dbo].[CalculationPackageRelation]  WITH CHECK ADD  CONSTRAINT [FK_CalculationPackageRelation_MeasureUnit] FOREIGN KEY([CalculationMeasureUnitId])
REFERENCES [dbo].[MeasureUnit] ([Id])
 

ALTER TABLE [dbo].[CalculationPackageRelation] CHECK CONSTRAINT [FK_CalculationPackageRelation_MeasureUnit]
 

ALTER TABLE [dbo].[CalculationPackageRelation]  WITH CHECK ADD  CONSTRAINT [FK_CalculationPackageRelation_PriceUnit] FOREIGN KEY([DefaultPackagePriceUnitId])
REFERENCES [dbo].[PriceUnit] ([Id])
 

ALTER TABLE [dbo].[CalculationPackageRelation] CHECK CONSTRAINT [FK_CalculationPackageRelation_PriceUnit]
 

ALTER TABLE [dbo].[CalculationPackageRelation]  WITH CHECK ADD  CONSTRAINT [FK_CalculationPackageRelation_PriceUnit1] FOREIGN KEY([PriceUnitId])
REFERENCES [dbo].[PriceUnit] ([Id])
 

ALTER TABLE [dbo].[CalculationPackageRelation] CHECK CONSTRAINT [FK_CalculationPackageRelation_PriceUnit1]
 

