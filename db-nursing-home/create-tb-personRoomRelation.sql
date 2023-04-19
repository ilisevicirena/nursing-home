USE [ENV01_NURSING_HOME]
GO

/****** Object:  Table [dbo].[PersonRoomRelation]    Script Date: 19.4.2023. 13:53:43 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PersonRoomRelation](
	[PersonId] [int] NOT NULL,
	[RoomId] [int] NOT NULL,
	[Active] [bit] NOT NULL,
	[CreationDate] [datetime] NOT NULL,
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
 CONSTRAINT [PK_PersonRoomRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[PersonRoomRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonRoomRelation_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])
GO

ALTER TABLE [dbo].[PersonRoomRelation] CHECK CONSTRAINT [FK_PersonRoomRelation_Person]
GO

ALTER TABLE [dbo].[PersonRoomRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonRoomRelation_Room] FOREIGN KEY([RoomId])
REFERENCES [dbo].[Room] ([Id])
GO

ALTER TABLE [dbo].[PersonRoomRelation] CHECK CONSTRAINT [FK_PersonRoomRelation_Room]
GO


