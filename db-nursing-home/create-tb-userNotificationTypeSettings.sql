CREATE TABLE [dbo].[UserNotificationTypeSettings](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NotificationTypeId] [int] NOT NULL,
	[UserId] [char](36) NOT NULL,
	[Enabled] [bit] NOT NULL,
	[DaysReminder] [int] NOT NULL,
 CONSTRAINT [PK_UserNotificationTypeSettings] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[UserNotificationTypeSettings]  WITH CHECK ADD  CONSTRAINT [FK_UserNotificationTypeSettings_NotificationType] FOREIGN KEY([NotificationTypeId])
REFERENCES [dbo].[NotificationType] ([Id])


ALTER TABLE [dbo].[UserNotificationTypeSettings] CHECK CONSTRAINT [FK_UserNotificationTypeSettings_NotificationType]


ALTER TABLE [dbo].[UserNotificationTypeSettings]  WITH CHECK ADD  CONSTRAINT [FK_UserNotificationTypeSettings_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])


ALTER TABLE [dbo].[UserNotificationTypeSettings] CHECK CONSTRAINT [FK_UserNotificationTypeSettings_User]


