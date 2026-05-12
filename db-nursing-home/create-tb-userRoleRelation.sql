CREATE TABLE [dbo].[UserRoleRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [char](36) NOT NULL,
	[RoleId] [int] NOT NULL,
 CONSTRAINT [PK_UserRoleRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[UserRoleRelation]  WITH CHECK ADD  CONSTRAINT [FK_UserRoleRelation_Role] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Role] ([Id])


ALTER TABLE [dbo].[UserRoleRelation] CHECK CONSTRAINT [FK_UserRoleRelation_Role]


ALTER TABLE [dbo].[UserRoleRelation]  WITH CHECK ADD  CONSTRAINT [FK_UserRoleRelation_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])


ALTER TABLE [dbo].[UserRoleRelation] CHECK CONSTRAINT [FK_UserRoleRelation_User]