USE [ENV01_NURSING_HOME]
GO

/****** Object:  Table [dbo].[CalendarEvent]    Script Date: 22.6.2023. 13:44:21 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CalendarEvent](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Start] [datetime] NOT NULL,
	[End] [datetime] NOT NULL,
	[Title] [varchar](200) NOT NULL,
	[Description] [varchar](max) NULL,
	[Color] [varchar](50) NULL,
	[Recurring] [bit] NULL,
	[PersonId] [int] NULL,
	[Reminder] [bit] NULL,
 CONSTRAINT [PK_CalendarEvent] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[CalendarEvent]  WITH CHECK ADD  CONSTRAINT [FK_CalendarEvent_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])
GO

ALTER TABLE [dbo].[CalendarEvent] CHECK CONSTRAINT [FK_CalendarEvent_Person]
GO

