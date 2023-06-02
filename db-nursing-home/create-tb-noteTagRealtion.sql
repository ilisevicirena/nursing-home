USE [ENV01_NURSING_HOME]
GO

/****** Object:  Table [dbo].[NoteTagRelation]    Script Date: 2.6.2023. 8:24:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[NoteTagRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TagId] [int] NOT NULL,
	[NoteId] [int] NOT NULL,
 CONSTRAINT [PK_NoteTagRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[NoteTagRelation]  WITH CHECK ADD  CONSTRAINT [FK_NoteTagRelation_Note] FOREIGN KEY([NoteId])
REFERENCES [dbo].[Note] ([Id])
GO

ALTER TABLE [dbo].[NoteTagRelation] CHECK CONSTRAINT [FK_NoteTagRelation_Note]
GO

ALTER TABLE [dbo].[NoteTagRelation]  WITH CHECK ADD  CONSTRAINT [FK_NoteTagRelation_NotesTag] FOREIGN KEY([TagId])
REFERENCES [dbo].[NotesTag] ([Id])
GO

ALTER TABLE [dbo].[NoteTagRelation] CHECK CONSTRAINT [FK_NoteTagRelation_NotesTag]
GO

