CREATE TABLE [dbo].[PersonInsuranceData](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[InsuranceCompany] [varchar](100) NULL,
	[PolicyNumber] [varchar](100) NULL,
	[GroupNumber] [varchar](100) NULL,
	[CoverageStartDate] [datetime] NULL,
	[CoverageEndDate] [datetime] NULL,
	[CoverageType] [varchar](100) NULL,
	[Status] [varchar](50) NULL,
	[CreationDate] [datetime] NOT NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_PersonInsuranceData] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[PersonInsuranceData]  WITH CHECK ADD  CONSTRAINT [FK_PersonInsuranceData_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])

ALTER TABLE [dbo].[PersonInsuranceData] CHECK CONSTRAINT [FK_PersonInsuranceData_Person]
