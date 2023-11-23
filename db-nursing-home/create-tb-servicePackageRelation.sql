CREATE TABLE [dbo].[ServicePackageRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ServiceId] [int] NOT NULL,
	[PackageId] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_ServicePackageRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
 

ALTER TABLE [dbo].[ServicePackageRelation]  WITH CHECK ADD  CONSTRAINT [FK_ServicePackageRelation_Package] FOREIGN KEY([PackageId])
REFERENCES [dbo].[Package] ([Id])
 

ALTER TABLE [dbo].[ServicePackageRelation] CHECK CONSTRAINT [FK_ServicePackageRelation_Package]
 

ALTER TABLE [dbo].[ServicePackageRelation]  WITH CHECK ADD  CONSTRAINT [FK_ServicePackageRelation_Service] FOREIGN KEY([ServiceId])
REFERENCES [dbo].[Service] ([Id])
 

ALTER TABLE [dbo].[ServicePackageRelation] CHECK CONSTRAINT [FK_ServicePackageRelation_Service]
 

