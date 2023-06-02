USE [ENV01_NURSING_HOME]
GO

/****** Object:  Table [dbo].[NoteDocumentRelation]    Script Date: 2.6.2023. 8:24:35 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[NoteDocumentRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DocumentId] [int] NOT NULL,
	[NoteId] [int] NOT NULL,
 CONSTRAINT [PK_NoteDocumentRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[NoteDocumentRelation]  WITH CHECK ADD  CONSTRAINT [FK_NoteDocumentRelation_Document] FOREIGN KEY([DocumentId])
REFERENCES [dbo].[Document] ([Id])
GO

ALTER TABLE [dbo].[NoteDocumentRelation] CHECK CONSTRAINT [FK_NoteDocumentRelation_Document]
GO

ALTER TABLE [dbo].[NoteDocumentRelation]  WITH CHECK ADD  CONSTRAINT [FK_NoteDocumentRelation_Note] FOREIGN KEY([NoteId])
REFERENCES [dbo].[Note] ([Id])
GO

ALTER TABLE [dbo].[NoteDocumentRelation] CHECK CONSTRAINT [FK_NoteDocumentRelation_Note]
GO

