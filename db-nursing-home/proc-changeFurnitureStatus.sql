CREATE PROCEDURE [dbo].[changeFurnitureStatus]
	-- Add the parameters for the stored procedure here
	(
	@Id INT,
	@StatusId INT,
	@StatusDate datetime
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	insert into dbo.FurnitureFurnitureStatusRelation(FurnitureId, FurnitureStatusId, [Date])
	values (@Id, @StatusId, @StatusDate);

	select SCOPE_IDENTITY() as FurnitureFurnitureStatusRelationId;
END