CREATE TABLE [dbo].[Notification](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NotificationTypeId] [int] NOT NULL,
	[CreationDate] [datetime] NOT NULL,
	[ReadDate] [datetime] NULL,
	[Read] [bit] NOT NULL,
	[Text] [varchar](2000) NOT NULL,
	[LinkId] [int] NULL,
	[GoToLink] [varchar](500) NULL,
 CONSTRAINT [PK_Notification] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
 

ALTER TABLE [dbo].[Notification]  WITH CHECK ADD  CONSTRAINT [FK_Notification_NotificationType] FOREIGN KEY([NotificationTypeId])
REFERENCES [dbo].[NotificationType] ([Id])
 

ALTER TABLE [dbo].[Notification] CHECK CONSTRAINT [FK_Notification_NotificationType]
 

ALTER TABLE [dbo].[Notification]  WITH CHECK ADD  CONSTRAINT [FK_Notification_PageLink] FOREIGN KEY([LinkId])
REFERENCES [dbo].[PageLink] ([Id])
 

ALTER TABLE [dbo].[Notification] CHECK CONSTRAINT [FK_Notification_PageLink]
 

