CREATE TABLE [dbo].[MedicationAdministration](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[PersonMedicationId] [int] NOT NULL,
	[AdministrationDate] [date] NOT NULL,
	[Slot] [varchar](20) NOT NULL,
	[Status] [varchar](20) NOT NULL,
	[AdministeredBy] [nchar](36) NULL,
	[CreationDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_MedicationAdministration] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[MedicationAdministration]  WITH CHECK ADD  CONSTRAINT [FK_MedicationAdministration_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])

ALTER TABLE [dbo].[MedicationAdministration] CHECK CONSTRAINT [FK_MedicationAdministration_Person]

ALTER TABLE [dbo].[MedicationAdministration]  WITH CHECK ADD  CONSTRAINT [FK_MedicationAdministration_PersonMedication] FOREIGN KEY([PersonMedicationId])
REFERENCES [dbo].[PersonMedication] ([Id])

ALTER TABLE [dbo].[MedicationAdministration] CHECK CONSTRAINT [FK_MedicationAdministration_PersonMedication]

-- one status per medication / date / time-slot
CREATE UNIQUE NONCLUSTERED INDEX [UX_MedicationAdministration_Slot] ON [dbo].[MedicationAdministration]
(
	[PersonMedicationId] ASC,
	[AdministrationDate] ASC,
	[Slot] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
