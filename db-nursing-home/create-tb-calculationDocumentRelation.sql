CREATE TABLE [dbo].[CalculationDocumentRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CalculationId] [int] NOT NULL,
	[DocumentId] [int] NOT NULL,
 CONSTRAINT [PK_CalculationDocumentRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
 

ALTER TABLE [dbo].[CalculationDocumentRelation]  WITH CHECK ADD  CONSTRAINT [FK_CalculationDocumentRelation_Calculation] FOREIGN KEY([CalculationId])
REFERENCES [dbo].[Calculation] ([Id])
 

ALTER TABLE [dbo].[CalculationDocumentRelation] CHECK CONSTRAINT [FK_CalculationDocumentRelation_Calculation]
 

ALTER TABLE [dbo].[CalculationDocumentRelation]  WITH CHECK ADD  CONSTRAINT [FK_CalculationDocumentRelation_Document] FOREIGN KEY([DocumentId])
REFERENCES [dbo].[Document] ([Id])
 

ALTER TABLE [dbo].[CalculationDocumentRelation] CHECK CONSTRAINT [FK_CalculationDocumentRelation_Document]
 

