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
 

ALTER TABLE [dbo].[Document]  WITH CHECK ADD  CONSTRAINT [FK_Document_DocumentType] FOREIGN KEY([DocumentTypeId])
REFERENCES [dbo].[DocumentType] ([Id])
 

ALTER TABLE [dbo].[Document] CHECK CONSTRAINT [FK_Document_DocumentType]
 

ALTER TABLE [dbo].[Document]  WITH CHECK ADD  CONSTRAINT [FK_Document_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])
 

ALTER TABLE [dbo].[Document] CHECK CONSTRAINT [FK_Document_Person]
 

