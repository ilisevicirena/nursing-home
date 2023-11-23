CREATE TABLE [dbo].[NoteTagRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TagId] [int] NOT NULL,
	[NoteId] [int] NOT NULL,
 CONSTRAINT [PK_NoteTagRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
 

ALTER TABLE [dbo].[NoteTagRelation]  WITH CHECK ADD  CONSTRAINT [FK_NoteTagRelation_Note] FOREIGN KEY([NoteId])
REFERENCES [dbo].[Note] ([Id])
 

ALTER TABLE [dbo].[NoteTagRelation] CHECK CONSTRAINT [FK_NoteTagRelation_Note]
 

ALTER TABLE [dbo].[NoteTagRelation]  WITH CHECK ADD  CONSTRAINT [FK_NoteTagRelation_NotesTag] FOREIGN KEY([TagId])
REFERENCES [dbo].[NotesTag] ([Id])
 

ALTER TABLE [dbo].[NoteTagRelation] CHECK CONSTRAINT [FK_NoteTagRelation_NotesTag]
 

