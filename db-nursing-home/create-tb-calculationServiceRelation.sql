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
 

ALTER TABLE [dbo].[CalculationServiceRelation]  WITH CHECK ADD  CONSTRAINT [FK_Table_1_Calculation] FOREIGN KEY([CalculationId])
REFERENCES [dbo].[Calculation] ([Id])
 

ALTER TABLE [dbo].[CalculationServiceRelation] CHECK CONSTRAINT [FK_Table_1_Calculation]
 

ALTER TABLE [dbo].[CalculationServiceRelation]  WITH CHECK ADD  CONSTRAINT [FK_Table_1_MeasureUnit] FOREIGN KEY([MeasureUnitId])
REFERENCES [dbo].[MeasureUnit] ([Id])
 

ALTER TABLE [dbo].[CalculationServiceRelation] CHECK CONSTRAINT [FK_Table_1_MeasureUnit]
 

ALTER TABLE [dbo].[CalculationServiceRelation]  WITH CHECK ADD  CONSTRAINT [FK_Table_1_PriceUnit] FOREIGN KEY([PriceUnitId])
REFERENCES [dbo].[PriceUnit] ([Id])
 

ALTER TABLE [dbo].[CalculationServiceRelation] CHECK CONSTRAINT [FK_Table_1_PriceUnit]
 

ALTER TABLE [dbo].[CalculationServiceRelation]  WITH CHECK ADD  CONSTRAINT [FK_Table_1_Table_1] FOREIGN KEY([PackageId])
REFERENCES [dbo].[CalculationPackageRelation] ([Id])
 

ALTER TABLE [dbo].[CalculationServiceRelation] CHECK CONSTRAINT [FK_Table_1_Table_1]
 

