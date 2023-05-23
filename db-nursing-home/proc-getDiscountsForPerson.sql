-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 23.5.2023.
-- Description:	gets discounts for person
-- =============================================
CREATE PROCEDURE [dbo].[getDiscountsForPerson]
	-- Add the parameters for the stored procedure here
	(
		@PersonId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select
	[Id]=pdr.DiscountId,
	[Name]=d.[Name],
	[Description]=d.[Description],
	[Quantity]=d.Quantity,
	[PercentCalculation]=d.PercentCalculation
	from
	dbo.PersonDiscountRelation as pdr
	join dbo.Discount as d 
	on pdr.DiscountId=d.Id
	where pdr.PersonId=@PersonId and pdr.Active=1;
END
GO
