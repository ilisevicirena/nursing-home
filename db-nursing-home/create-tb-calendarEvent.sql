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
	[EmployeeId] [int] NULL,
	[EventTypeId] [int] NULL,
 CONSTRAINT [PK_CalendarEvent] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
 

ALTER TABLE [dbo].[CalendarEvent]  WITH CHECK ADD  CONSTRAINT [FK_CalendarEvent_CalendarEventType] FOREIGN KEY([EventTypeId])
REFERENCES [dbo].[CalendarEventType] ([Id])
 

ALTER TABLE [dbo].[CalendarEvent] CHECK CONSTRAINT [FK_CalendarEvent_CalendarEventType]
 

ALTER TABLE [dbo].[CalendarEvent]  WITH CHECK ADD  CONSTRAINT [FK_CalendarEvent_Employee] FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employee] ([Id])
 

ALTER TABLE [dbo].[CalendarEvent] CHECK CONSTRAINT [FK_CalendarEvent_Employee]
 

ALTER TABLE [dbo].[CalendarEvent]  WITH CHECK ADD  CONSTRAINT [FK_CalendarEvent_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])
 

ALTER TABLE [dbo].[CalendarEvent] CHECK CONSTRAINT [FK_CalendarEvent_Person]
 