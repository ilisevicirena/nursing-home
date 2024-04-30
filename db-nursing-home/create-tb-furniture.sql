CREATE TABLE [dbo].[Furniture](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](150) NOT NULL,
	[InventoryCode] [varchar](50) NULL,
	[CreationDate] [datetime] NOT NULL,
	[RoomId] [int] NULL,
	[Description] [varchar](2000) NULL,
 CONSTRAINT [PK_Furniture] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[Furniture]  WITH CHECK ADD  CONSTRAINT [FK_Furniture_Room] FOREIGN KEY([RoomId])
REFERENCES [dbo].[Room] ([Id])
ON DELETE SET NULL

ALTER TABLE [dbo].[Furniture] CHECK CONSTRAINT [FK_Furniture_Room]