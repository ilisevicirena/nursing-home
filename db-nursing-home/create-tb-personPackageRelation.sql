CREATE TABLE [dbo].[PersonPackageRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[PackageId] [int] NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_PersonPackageRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
 

ALTER TABLE [dbo].[PersonPackageRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonPackageRelation_Package] FOREIGN KEY([PackageId])
REFERENCES [dbo].[Package] ([Id])
 

ALTER TABLE [dbo].[PersonPackageRelation] CHECK CONSTRAINT [FK_PersonPackageRelation_Package]
 

ALTER TABLE [dbo].[PersonPackageRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonPackageRelation_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])
 

ALTER TABLE [dbo].[PersonPackageRelation] CHECK CONSTRAINT [FK_PersonPackageRelation_Person]
 

