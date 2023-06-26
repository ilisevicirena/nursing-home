USE [ENV01_NURSING_HOME]
GO

/****** Object:  Table [dbo].[CalculationDiscountRelation]    Script Date: 26.6.2023. 11:44:17 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

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
GO

ALTER TABLE [dbo].[CalculationDiscountRelation]  WITH CHECK ADD  CONSTRAINT [FK_CalculationDiscountRelation_Calculation] FOREIGN KEY([CalculationId])
REFERENCES [dbo].[Calculation] ([Id])
GO

ALTER TABLE [dbo].[CalculationDiscountRelation] CHECK CONSTRAINT [FK_CalculationDiscountRelation_Calculation]
GO

