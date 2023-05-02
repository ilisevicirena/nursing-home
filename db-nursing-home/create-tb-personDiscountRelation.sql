USE [ENV01_NURSING_HOME]
GO

/****** Object:  Table [dbo].[PersonDiscountRelation]    Script Date: 2.5.2023. 12:02:26 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PersonDiscountRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[DiscountId] [int] NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_PersonDiscountRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[PersonDiscountRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonDiscountRelation_Discount] FOREIGN KEY([DiscountId])
REFERENCES [dbo].[Discount] ([Id])
GO

ALTER TABLE [dbo].[PersonDiscountRelation] CHECK CONSTRAINT [FK_PersonDiscountRelation_Discount]
GO

ALTER TABLE [dbo].[PersonDiscountRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonDiscountRelation_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])
GO

ALTER TABLE [dbo].[PersonDiscountRelation] CHECK CONSTRAINT [FK_PersonDiscountRelation_Person]
GO

