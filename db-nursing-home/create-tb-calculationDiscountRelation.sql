CREATE TABLE [dbo].[CalculationDiscountRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](2000) NULL,
	[Quantity] [int] NOT NULL,
	[PercentCalculation] [bit] NOT NULL,
	[CalculationId] [int] NOT NULL,
 CONSTRAINT [PK_CalculationDiscountRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
 

ALTER TABLE [dbo].[CalculationDiscountRelation]  WITH CHECK ADD  CONSTRAINT [FK_CalculationDiscountRelation_Calculation] FOREIGN KEY([CalculationId])
REFERENCES [dbo].[Calculation] ([Id])
 

ALTER TABLE [dbo].[CalculationDiscountRelation] CHECK CONSTRAINT [FK_CalculationDiscountRelation_Calculation]
 

