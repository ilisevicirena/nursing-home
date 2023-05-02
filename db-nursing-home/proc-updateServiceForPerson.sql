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
-- Description:	updates service for person (deactivates old and inserts new)
-- =============================================
CREATE PROCEDURE [dbo].[updateServiceForPerson]
	-- Add the parameters for the stored procedure here
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

    -- Insert statements for procedure here
	declare @myrow table(Id int, PersonId int, ServiceId int, StartDate datetime, EndDate datetime, Active bit, Quantity int);
	insert into @myrow
	select * from dbo.PersonServiceRelation where @Id=Id;

	declare @serviceId int, @personId int;

    -- Insert statements for procedure here
	UPDATE dbo.PersonServiceRelation 
	SET 
	Active=0,
	EndDate=GETDATE()
	WHERE @Id=Id;

	IF(EXISTS(SELECT 1 FROM @myrow))
	begin
		select top 1 @serviceId=ServiceId, @personId=PersonId from @myRow;

		insert into dbo.PersonServiceRelation (ServiceId, PersonId, Quantity, Active, StartDate, EndDate)
		values (@serviceId, @personId, @Quantity, 1, GETDATE(), NULL);
	end
END
GO
