CREATE TABLE [dbo].[UserToken](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [char](36) NOT NULL,
	[TokenTypeId] [int] NOT NULL,
	[TokenValue] [varchar](300) NOT NULL,
	[CreationDate] [datetime] NOT NULL,
	[ExpiryDate] [datetime] NULL,
	[VerificationCode] [varchar](50) NULL,
 CONSTRAINT [PK_Token] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[UserToken]  WITH CHECK ADD  CONSTRAINT [FK_Token_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])


ALTER TABLE [dbo].[UserToken] CHECK CONSTRAINT [FK_Token_User]


ALTER TABLE [dbo].[UserToken]  WITH CHECK ADD  CONSTRAINT [FK_Token_UserTokenType] FOREIGN KEY([TokenTypeId])
REFERENCES [dbo].[UserTokenType] ([Id])


ALTER TABLE [dbo].[UserToken] CHECK CONSTRAINT [FK_Token_UserTokenType]
