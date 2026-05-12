CREATE PROCEDURE [dbo].[changeFurnitureStatus]
	-- Add the parameters for the stored procedure here
	(
	@Id INT,
	@StatusId INT,
	@StatusDate datetime,
    @ActingUserId NCHAR(36) = NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	insert into dbo.FurnitureFurnitureStatusRelation(FurnitureId, FurnitureStatusId, [Date])
	values (@Id, @StatusId, @StatusDate);

	select SCOPE_IDENTITY() as FurnitureFurnitureStatusRelationId;

	EXEC dbo.logUserActivity 'CHANGE_FURNITURE_STATUS', 'Furniture status changed', @ActingUserId;
END