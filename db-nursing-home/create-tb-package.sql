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
 

ALTER TABLE [dbo].[Package]  WITH CHECK ADD  CONSTRAINT [FK_Package_MeasureUnit] FOREIGN KEY([CalculationMeasureUnitId])
REFERENCES [dbo].[MeasureUnit] ([Id])
 

ALTER TABLE [dbo].[Package] CHECK CONSTRAINT [FK_Package_MeasureUnit]
 

ALTER TABLE [dbo].[Package]  WITH CHECK ADD  CONSTRAINT [FK_Package_Package] FOREIGN KEY([Id])
REFERENCES [dbo].[Package] ([Id])
 

ALTER TABLE [dbo].[Package] CHECK CONSTRAINT [FK_Package_Package]
 

ALTER TABLE [dbo].[Package]  WITH CHECK ADD  CONSTRAINT [FK_Package_PriceUnit] FOREIGN KEY([DefaultPackagePriceUnitId])
REFERENCES [dbo].[PriceUnit] ([Id])
 

ALTER TABLE [dbo].[Package] CHECK CONSTRAINT [FK_Package_PriceUnit]
 

