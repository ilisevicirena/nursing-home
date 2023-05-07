USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[insertDiscount]    Script Date: 7.5.2023. 13:02:10 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 7.5.2023.
-- Description:	inserts new discount
-- =============================================
CREATE PROCEDURE [dbo].[insertDiscount]
	-- Add the parameters for the stored procedure here
	(
		@Name varchar(50),
		@Description varchar(2000)=NULL,
		@Quantity int,
		@PercentCalculation bit
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	insert into dbo.Discount ([Name],[Description],[Quantity],[PercentCalculation], [Active])
	values (@Name, @Description, @Quantity, @PercentCalculation,1);

	select SCOPE_IDENTITY() as [DiscountId];
END
GO

