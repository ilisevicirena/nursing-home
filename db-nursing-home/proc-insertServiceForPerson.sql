-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 2.5.2023.
-- Description:	inserts service for person
-- =============================================
CREATE PROCEDURE [dbo].[insertServiceForPerson]
	-- Add the parameters for the stored procedure here
	(
		@PersonId int,
		@ServiceId int,
		@Quantity int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO dbo.PersonServiceRelation (PersonId, ServiceId, StartDate, EndDate, Active, Quantity)
	VALUES (@PersonId, @ServiceId, GETDATE(), NULL, 1, @Quantity);

	SELECT SCOPE_IDENTITY() AS [RowId];
END