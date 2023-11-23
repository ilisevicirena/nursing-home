CREATE TABLE [dbo].[NoteDocumentRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DocumentId] [int] NOT NULL,
	[NoteId] [int] NOT NULL,
 CONSTRAINT [PK_NoteDocumentRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
 

ALTER TABLE [dbo].[NoteDocumentRelation]  WITH CHECK ADD  CONSTRAINT [FK_NoteDocumentRelation_Document] FOREIGN KEY([DocumentId])
REFERENCES [dbo].[Document] ([Id])
 

ALTER TABLE [dbo].[NoteDocumentRelation] CHECK CONSTRAINT [FK_NoteDocumentRelation_Document]
 

ALTER TABLE [dbo].[NoteDocumentRelation]  WITH CHECK ADD  CONSTRAINT [FK_NoteDocumentRelation_Note] FOREIGN KEY([NoteId])
REFERENCES [dbo].[Note] ([Id])
 

ALTER TABLE [dbo].[NoteDocumentRelation] CHECK CONSTRAINT [FK_NoteDocumentRelation_Note]
 

