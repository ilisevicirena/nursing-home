CREATE TABLE [dbo].[User](
	[Id] [char](36) NOT NULL,
	[Username] [nvarchar](100) NOT NULL,
	[Password] [nvarchar](255) NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
	[FirstName] [nvarchar](150) NULL,
	[LastName] [nvarchar](150) NULL,
	[DateRegistered] [datetime] NOT NULL CONSTRAINT [DF_User_DateRegistered] DEFAULT (GETDATE()),
	[Active] [bit] NOT NULL CONSTRAINT [DF_User_Active] DEFAULT (1),
	[Blocked] [bit] NOT NULL CONSTRAINT [DF_User_Blocked] DEFAULT (0),
	[Verified] [bit] NOT NULL CONSTRAINT [DF_User_Verified] DEFAULT (0),
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
