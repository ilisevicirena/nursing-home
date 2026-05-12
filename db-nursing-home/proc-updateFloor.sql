-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 14.4.2023.
-- Description:	Updates floor row in Floor table.
-- =============================================
CREATE PROCEDURE [dbo].[updateFloor]
	-- Add the parameters for the stored procedure here
	(
		@Name VARCHAR(50),
		@Id INT,
    @ActingUserId NCHAR(36) = NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE dbo.Floor
	SET
		Name = @Name	
	WHERE Id = @Id

	EXEC dbo.logUserActivity 'UPDATE_FLOOR', 'Floor updated', @ActingUserId;
END