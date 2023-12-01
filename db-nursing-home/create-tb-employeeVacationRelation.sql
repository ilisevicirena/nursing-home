CREATE TABLE [dbo].[EmployeeVacationRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Year] [int] NOT NULL,
	[DaysTotal] [int] NOT NULL,
	[FromDate] [datetime] NOT NULL,
	[ToDate] [datetime] NOT NULL,
	[DaysTaken] [int] NOT NULL,
	[EmployeeId] [int] NOT NULL,
	[CreationDate] [datetime] NOT NULL,
	[StatusId] [int] NOT NULL,
 CONSTRAINT [PK_EmployeeVacationRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
 

ALTER TABLE [dbo].[EmployeeVacationRelation]  WITH CHECK ADD  CONSTRAINT [FK_EmployeeVacationRelation_Employee] FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employee] ([Id])
 

ALTER TABLE [dbo].[EmployeeVacationRelation] CHECK CONSTRAINT [FK_EmployeeVacationRelation_Employee]
 

ALTER TABLE [dbo].[EmployeeVacationRelation]  WITH CHECK ADD  CONSTRAINT [FK_EmployeeVacationRelation_VacationStatus] FOREIGN KEY([StatusId])
REFERENCES [dbo].[VacationStatus] ([Id])
 

ALTER TABLE [dbo].[EmployeeVacationRelation] CHECK CONSTRAINT [FK_EmployeeVacationRelation_VacationStatus]
 
