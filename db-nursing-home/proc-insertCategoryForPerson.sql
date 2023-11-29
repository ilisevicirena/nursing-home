create PROCEDURE [dbo].[insertCategoryForPerson]
	-- Add the parameters for the stored procedure here
	(
		@PersonId int,
		@CategoryId int	
	)
AS
BEGIN
	
	IF EXISTS (SELECT 1 FROM dbo.PersonCategoryRelation WHERE PersonId = @PersonId)
    BEGIN
        -- Row with PersonId exists, so update the existing row
        UPDATE dbo.PersonCategoryRelation
        SET PersonCategoryId = @CategoryId
        WHERE PersonId = @PersonId;
    END
    ELSE
    BEGIN
        -- Row with PersonId does not exist, so insert a new row
        INSERT INTO dbo.PersonCategoryRelation (PersonId, PersonCategoryId)
        VALUES (@PersonId, @CategoryId);
    END

    -- Return the identity of the inserted or updated row
    SELECT SCOPE_IDENTITY() AS PersonCategoryRelationId;
END
