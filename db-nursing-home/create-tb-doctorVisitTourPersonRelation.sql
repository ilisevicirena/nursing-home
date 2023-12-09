CREATE TABLE [dbo].[DoctorVisitTourPersonRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[NoteId] [int] NOT NULL,
	[DoctorVisitTourId] [int] NOT NULL,
 CONSTRAINT [PK_DoctorVisitTourPersonRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
 

ALTER TABLE [dbo].[DoctorVisitTourPersonRelation]  WITH CHECK ADD  CONSTRAINT [FK_DoctorVisitTourPersonRelation_DoctorVisitTour] FOREIGN KEY([DoctorVisitTourId])
REFERENCES [dbo].[DoctorVisitTour] ([Id])
ON DELETE CASCADE
 

ALTER TABLE [dbo].[DoctorVisitTourPersonRelation] CHECK CONSTRAINT [FK_DoctorVisitTourPersonRelation_DoctorVisitTour]
 

ALTER TABLE [dbo].[DoctorVisitTourPersonRelation]  WITH CHECK ADD  CONSTRAINT [FK_DoctorVisitTourPersonRelation_Note] FOREIGN KEY([NoteId])
REFERENCES [dbo].[Note] ([Id])
ON DELETE CASCADE
 

ALTER TABLE [dbo].[DoctorVisitTourPersonRelation] CHECK CONSTRAINT [FK_DoctorVisitTourPersonRelation_Note]
 

ALTER TABLE [dbo].[DoctorVisitTourPersonRelation]  WITH CHECK ADD  CONSTRAINT [FK_DoctorVisitTourPersonRelation_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])
ON DELETE CASCADE
 

ALTER TABLE [dbo].[DoctorVisitTourPersonRelation] CHECK CONSTRAINT [FK_DoctorVisitTourPersonRelation_Person]
 


