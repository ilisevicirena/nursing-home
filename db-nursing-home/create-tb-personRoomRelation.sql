CREATE TABLE [dbo].[PersonRoomRelation](
	[PersonId] [int] NOT NULL,
	[RoomId] [int] NOT NULL,
	[Active] [bit] NOT NULL,
	[CreationDate] [datetime] NOT NULL,
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NULL,
 CONSTRAINT [PK_PersonRoomRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
 

ALTER TABLE [dbo].[PersonRoomRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonRoomRelation_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])
 

ALTER TABLE [dbo].[PersonRoomRelation] CHECK CONSTRAINT [FK_PersonRoomRelation_Person]
 

ALTER TABLE [dbo].[PersonRoomRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonRoomRelation_Room] FOREIGN KEY([RoomId])
REFERENCES [dbo].[Room] ([Id])
 

ALTER TABLE [dbo].[PersonRoomRelation] CHECK CONSTRAINT [FK_PersonRoomRelation_Room]
 

