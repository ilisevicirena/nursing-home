CREATE TABLE [dbo].[Service](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](2000) NULL,
	[MeasureUnitId] [int] NOT NULL,
	[CostPerUnit] [float] NOT NULL,
	[DefaultNumberOfUnits] [int] NULL,
	[PriceUnitId] [int] NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_Service] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
 

ALTER TABLE [dbo].[Service]  WITH CHECK ADD  CONSTRAINT [FK_Service_MeasureUnit] FOREIGN KEY([MeasureUnitId])
REFERENCES [dbo].[MeasureUnit] ([Id])
 

ALTER TABLE [dbo].[Service] CHECK CONSTRAINT [FK_Service_MeasureUnit]
 

ALTER TABLE [dbo].[Service]  WITH CHECK ADD  CONSTRAINT [FK_Service_PriceUnit] FOREIGN KEY([PriceUnitId])
REFERENCES [dbo].[PriceUnit] ([Id])
 

ALTER TABLE [dbo].[Service] CHECK CONSTRAINT [FK_Service_PriceUnit]
 

