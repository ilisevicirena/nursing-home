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
-- Create date: 2.5.2023.
-- Description:	updates service for package (deactivates old service and inserts new for package, so it doesnt interferr with past package calculations)
-- =============================================
CREATE PROCEDURE [dbo].[updateServiceForPackage]
	-- Add the parameters for the stored procedure here
	(
		@Id int,
		@Quantity int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @myrow table(Id int,ServiceId int, PackageId int, Quantity int, Active bit);
	insert into @myrow
	select * from dbo.ServicePackageRelation where @Id=Id;

	declare @serviceId int, @packageId int;

    -- Insert statements for procedure here
	UPDATE dbo.ServicePackageRelation 
	SET 
	Active=0
	WHERE @Id=Id;

	IF(EXISTS(SELECT 1 FROM @myrow))
	begin
		select top 1 @serviceId=ServiceId, @packageId=PackageId from @myRow;

		insert into dbo.ServicePackageRelation (ServiceId, PackageId, Quantity, Active)
		values (@serviceId, @packageId, @Quantity, 1);
	end
END
GO
