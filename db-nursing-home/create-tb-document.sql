USE [ENV01_NURSING_HOME]
GO

/****** Object:  Table [dbo].[Document]    Script Date: 30.5.2023. 14:39:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Document](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[DocumentTypeId] [int] NOT NULL,
	[Path] [varchar](max) NULL,
	[Name] [varchar](50) NOT NULL,
	[StorageName] [varchar](200) NULL,
	[CreationDate] [datetime] NOT NULL,
	[Extension] [varchar](50) NOT NULL,
	[FileType] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Document] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Document]  WITH CHECK ADD  CONSTRAINT [FK_Document_DocumentType] FOREIGN KEY([DocumentTypeId])
REFERENCES [dbo].[DocumentType] ([Id])
GO

ALTER TABLE [dbo].[Document] CHECK CONSTRAINT [FK_Document_DocumentType]
GO

ALTER TABLE [dbo].[Document]  WITH CHECK ADD  CONSTRAINT [FK_Document_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])
GO

ALTER TABLE [dbo].[Document] CHECK CONSTRAINT [FK_Document_Person]
GO

