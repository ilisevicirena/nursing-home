CREATE TABLE [dbo].[DoctorVisitTourEmployeeRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DoctorVIsitTourId] [int] NOT NULL,
	[EmployeeId] [int] NOT NULL,
 CONSTRAINT [PK_DoctorVisitTourEmployeeRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
 

ALTER TABLE [dbo].[DoctorVisitTourEmployeeRelation]  WITH CHECK ADD  CONSTRAINT [FK_DoctorVisitTourEmployeeRelation_DoctorVisitTour] FOREIGN KEY([DoctorVIsitTourId])
REFERENCES [dbo].[DoctorVisitTour] ([Id])
ON DELETE CASCADE
 

ALTER TABLE [dbo].[DoctorVisitTourEmployeeRelation] CHECK CONSTRAINT [FK_DoctorVisitTourEmployeeRelation_DoctorVisitTour]
 

ALTER TABLE [dbo].[DoctorVisitTourEmployeeRelation]  WITH CHECK ADD  CONSTRAINT [FK_DoctorVisitTourEmployeeRelation_Employee] FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employee] ([Id])
ON DELETE CASCADE
 

ALTER TABLE [dbo].[DoctorVisitTourEmployeeRelation] CHECK CONSTRAINT [FK_DoctorVisitTourEmployeeRelation_Employee]
 


