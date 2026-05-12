CREATE TABLE [dbo].[RolePermissionRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [int] NOT NULL,
	[PermissionId] [int] NOT NULL,
 CONSTRAINT [PK_RolePermissionRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[RolePermissionRelation]  WITH CHECK ADD  CONSTRAINT [FK_RolePermissionRelation_Permission] FOREIGN KEY([PermissionId])
REFERENCES [dbo].[Permission] ([Id])


ALTER TABLE [dbo].[RolePermissionRelation] CHECK CONSTRAINT [FK_RolePermissionRelation_Permission]


ALTER TABLE [dbo].[RolePermissionRelation]  WITH CHECK ADD  CONSTRAINT [FK_RolePermissionRelation_Role] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Role] ([Id])


ALTER TABLE [dbo].[RolePermissionRelation] CHECK CONSTRAINT [FK_RolePermissionRelation_Role]


