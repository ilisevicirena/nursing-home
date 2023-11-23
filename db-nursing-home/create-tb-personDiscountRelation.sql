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
 

ALTER TABLE [dbo].[PersonDiscountRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonDiscountRelation_Discount] FOREIGN KEY([DiscountId])
REFERENCES [dbo].[Discount] ([Id])
 

ALTER TABLE [dbo].[PersonDiscountRelation] CHECK CONSTRAINT [FK_PersonDiscountRelation_Discount]
 

ALTER TABLE [dbo].[PersonDiscountRelation]  WITH CHECK ADD  CONSTRAINT [FK_PersonDiscountRelation_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])
 

ALTER TABLE [dbo].[PersonDiscountRelation] CHECK CONSTRAINT [FK_PersonDiscountRelation_Person]
 

