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
 

ALTER TABLE [dbo].[Calculation]  WITH CHECK ADD  CONSTRAINT [FK_Calculation_CalculationStatus] FOREIGN KEY([StatusId])
REFERENCES [dbo].[CalculationStatus] ([Id])
 

ALTER TABLE [dbo].[Calculation] CHECK CONSTRAINT [FK_Calculation_CalculationStatus]
 

ALTER TABLE [dbo].[Calculation]  WITH CHECK ADD  CONSTRAINT [FK_Calculation_MeasureUnit] FOREIGN KEY([MeasureUnitId])
REFERENCES [dbo].[MeasureUnit] ([Id])
 

ALTER TABLE [dbo].[Calculation] CHECK CONSTRAINT [FK_Calculation_MeasureUnit]
 

ALTER TABLE [dbo].[Calculation]  WITH CHECK ADD  CONSTRAINT [FK_Calculation_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])
 

ALTER TABLE [dbo].[Calculation] CHECK CONSTRAINT [FK_Calculation_Person]
 

ALTER TABLE [dbo].[Calculation]  WITH CHECK ADD  CONSTRAINT [FK_Calculation_PriceUnit] FOREIGN KEY([PriceUnitId])
REFERENCES [dbo].[PriceUnit] ([Id])
 

ALTER TABLE [dbo].[Calculation] CHECK CONSTRAINT [FK_Calculation_PriceUnit]
 
