CREATE TABLE [dbo].[NotificationsChecked](
	[Date] [datetime] NOT NULL,
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [char](36) NOT NULL,
 CONSTRAINT [PK_NotificationsChecked] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[NotificationsChecked]  WITH CHECK ADD  CONSTRAINT [FK_NotificationsChecked_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])


ALTER TABLE [dbo].[NotificationsChecked] CHECK CONSTRAINT [FK_NotificationsChecked_User]


