CREATE TABLE [dbo].[UserContactRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [char](36) NOT NULL,
	[ContactId] [int] NOT NULL,
 CONSTRAINT [PK_UserContactRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[UserContactRelation]  WITH CHECK ADD  CONSTRAINT [FK_UserContactRelation_Contact] FOREIGN KEY([ContactId])
REFERENCES [dbo].[Contact] ([Id])


ALTER TABLE [dbo].[UserContactRelation] CHECK CONSTRAINT [FK_UserContactRelation_Contact]


ALTER TABLE [dbo].[UserContactRelation]  WITH CHECK ADD  CONSTRAINT [FK_UserContactRelation_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])


ALTER TABLE [dbo].[UserContactRelation] CHECK CONSTRAINT [FK_UserContactRelation_User]



