USE [ENV01_NURSING_HOME]
GO

/****** Object:  Table [dbo].[CalculationDocumentRelation]    Script Date: 26.6.2023. 11:44:39 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CalculationDocumentRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CalculationId] [int] NOT NULL,
	[DocumentId] [int] NOT NULL,
 CONSTRAINT [PK_CalculationDocumentRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[CalculationDocumentRelation]  WITH CHECK ADD  CONSTRAINT [FK_CalculationDocumentRelation_Calculation] FOREIGN KEY([CalculationId])
REFERENCES [dbo].[Calculation] ([Id])
GO

ALTER TABLE [dbo].[CalculationDocumentRelation] CHECK CONSTRAINT [FK_CalculationDocumentRelation_Calculation]
GO

ALTER TABLE [dbo].[CalculationDocumentRelation]  WITH CHECK ADD  CONSTRAINT [FK_CalculationDocumentRelation_Document] FOREIGN KEY([DocumentId])
REFERENCES [dbo].[Document] ([Id])
GO

ALTER TABLE [dbo].[CalculationDocumentRelation] CHECK CONSTRAINT [FK_CalculationDocumentRelation_Document]
GO

