USE [ENV01_NURSING_HOME]
GO

/****** Object:  Table [dbo].[Calculation]    Script Date: 26.6.2023. 11:43:50 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Calculation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CreationDate] [datetime] NOT NULL,
	[Month] [int] NOT NULL,
	[Year] [int] NOT NULL,
	[PersonId] [int] NOT NULL,
	[SystemPrice] [float] NOT NULL,
	[RealPrice] [float] NULL,
	[PaidPrice] [float] NULL,
	[DateFrom] [datetime] NOT NULL,
	[DateTo] [datetime] NOT NULL,
	[StatusId] [int] NOT NULL,
	[PaymentDaysDeadline] [int] NULL,
	[PriceUnitId] [int] NOT NULL,
	[MeasureUnitId] [int] NOT NULL,
	[DatePaid] [datetime] NULL,
 CONSTRAINT [PK_Calculation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Calculation]  WITH CHECK ADD  CONSTRAINT [FK_Calculation_CalculationStatus] FOREIGN KEY([StatusId])
REFERENCES [dbo].[CalculationStatus] ([Id])
GO

ALTER TABLE [dbo].[Calculation] CHECK CONSTRAINT [FK_Calculation_CalculationStatus]
GO

ALTER TABLE [dbo].[Calculation]  WITH CHECK ADD  CONSTRAINT [FK_Calculation_MeasureUnit] FOREIGN KEY([MeasureUnitId])
REFERENCES [dbo].[MeasureUnit] ([Id])
GO

ALTER TABLE [dbo].[Calculation] CHECK CONSTRAINT [FK_Calculation_MeasureUnit]
GO

ALTER TABLE [dbo].[Calculation]  WITH CHECK ADD  CONSTRAINT [FK_Calculation_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])
GO

ALTER TABLE [dbo].[Calculation] CHECK CONSTRAINT [FK_Calculation_Person]
GO

ALTER TABLE [dbo].[Calculation]  WITH CHECK ADD  CONSTRAINT [FK_Calculation_PriceUnit] FOREIGN KEY([PriceUnitId])
REFERENCES [dbo].[PriceUnit] ([Id])
GO

ALTER TABLE [dbo].[Calculation] CHECK CONSTRAINT [FK_Calculation_PriceUnit]
GO

