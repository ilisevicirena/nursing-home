CREATE TABLE [dbo].[FurnitureFurnitureInventoryRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FurnitureId] [int] NOT NULL,
	[FurnitureInventoryId] [int] NOT NULL,
	[FurnitureStatusId] [int] NOT NULL,
 CONSTRAINT [PK_FurnitureFurnitureInventoryRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
 

ALTER TABLE [dbo].[FurnitureFurnitureInventoryRelation]  WITH CHECK ADD  CONSTRAINT [FK_FurnitureFurnitureInventoryRelation_Furniture] FOREIGN KEY([FurnitureId])
REFERENCES [dbo].[Furniture] ([Id])
 

ALTER TABLE [dbo].[FurnitureFurnitureInventoryRelation] CHECK CONSTRAINT [FK_FurnitureFurnitureInventoryRelation_Furniture]
 

ALTER TABLE [dbo].[FurnitureFurnitureInventoryRelation]  WITH CHECK ADD  CONSTRAINT [FK_FurnitureFurnitureInventoryRelation_FurnitureInventory] FOREIGN KEY([FurnitureInventoryId])
REFERENCES [dbo].[FurnitureInventory] ([Id])
 

ALTER TABLE [dbo].[FurnitureFurnitureInventoryRelation] CHECK CONSTRAINT [FK_FurnitureFurnitureInventoryRelation_FurnitureInventory]
 

ALTER TABLE [dbo].[FurnitureFurnitureInventoryRelation]  WITH CHECK ADD  CONSTRAINT [FK_FurnitureFurnitureInventoryRelation_FurnitureStatus] FOREIGN KEY([FurnitureStatusId])
REFERENCES [dbo].[FurnitureStatus] ([Id])
 

ALTER TABLE [dbo].[FurnitureFurnitureInventoryRelation] CHECK CONSTRAINT [FK_FurnitureFurnitureInventoryRelation_FurnitureStatus]
 

