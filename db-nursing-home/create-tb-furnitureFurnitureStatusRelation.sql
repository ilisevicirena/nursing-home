CREATE TABLE [dbo].[FurnitureFurnitureStatusRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FurnitureStatusId] [int] NOT NULL,
	[FurnitureId] [int] NOT NULL,
	[Date] [datetime] NOT NULL,
 CONSTRAINT [PK_FurnitureFurnitureStatusRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
 

ALTER TABLE [dbo].[FurnitureFurnitureStatusRelation]  WITH CHECK ADD  CONSTRAINT [FK_FurnitureFurnitureStatusRelation_Furniture] FOREIGN KEY([FurnitureId])
REFERENCES [dbo].[Furniture] ([Id])
 

ALTER TABLE [dbo].[FurnitureFurnitureStatusRelation] CHECK CONSTRAINT [FK_FurnitureFurnitureStatusRelation_Furniture]
 

ALTER TABLE [dbo].[FurnitureFurnitureStatusRelation]  WITH CHECK ADD  CONSTRAINT [FK_FurnitureFurnitureStatusRelation_FurnitureStatus] FOREIGN KEY([FurnitureStatusId])
REFERENCES [dbo].[FurnitureStatus] ([Id])
 

ALTER TABLE [dbo].[FurnitureFurnitureStatusRelation] CHECK CONSTRAINT [FK_FurnitureFurnitureStatusRelation_FurnitureStatus]
 

