CREATE TABLE [dbo].[UserActivity](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [char](36) NOT NULL,
	[ActivityType] [varchar](150) NOT NULL,
	[Timestamp] [datetime] NOT NULL,
	[Description] [varchar](2000) NULL,
 CONSTRAINT [PK_UserActivity] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[UserActivity]  WITH CHECK ADD  CONSTRAINT [FK_UserActivity_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])


ALTER TABLE [dbo].[UserActivity] CHECK CONSTRAINT [FK_UserActivity_User]


