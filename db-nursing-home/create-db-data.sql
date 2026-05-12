CREATE TABLE [dbo].[User](
	[Id] [char](36) NOT NULL,
	[Username] [varchar](100) NOT NULL UNIQUE,
	[Password] [varchar](255) NOT NULL,
	[Email] [varchar](100) NOT NULL UNIQUE,
	[FirstName] [varchar](150) NULL,
	[LastName] [varchar](150) NULL,
	[DateRegistered] [datetime] NOT NULL,
	[Active] [bit] NOT NULL,
	[Blocked] [bit] NOT NULL,
	[Verified] [bit] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
