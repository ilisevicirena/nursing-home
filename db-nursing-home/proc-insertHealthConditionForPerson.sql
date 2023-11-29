create PROCEDURE [dbo].[insertHealthConditionForPerson]
	-- Add the parameters for the stored procedure here
	(
		@PersonId int,
		@HealthConditionId int,
		@Description varchar(500)=NULL
	)
AS
BEGIN	
	IF EXISTS (SELECT 1 FROM dbo.PersonHealthConditionRelation WHERE PersonId = @PersonId AND HealthConditionId = @HealthConditionId)
    BEGIN
        -- Row with PersonId exists, so update the existing row
        UPDATE dbo.PersonHealthConditionRelation
        SET [Description] = @Description
        WHERE PersonId = @PersonId AND HealthConditionId = @HealthConditionId;
    END
    ELSE
    BEGIN
        insert into dbo.PersonHealthConditionRelation (PersonId, HealthConditionId, [Description])
		values (@PersonId, @HealthConditionId, @Description);
    END

    -- Return the identity of the inserted or updated row
    SELECT SCOPE_IDENTITY() AS PersonCategoryRelationId;
END
