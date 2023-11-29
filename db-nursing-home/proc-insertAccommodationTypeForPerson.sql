create proc [dbo].[insertAccommodationTypeForPerson]
(
	@PersonId int,
	@AccommodationTypeId int
)
as 
begin
IF EXISTS (SELECT 1 FROM dbo.PersonAccommodationTypeRelation WHERE PersonId = @PersonId)
    BEGIN
        -- Row with PersonId exists, so update the existing row
        UPDATE dbo.PersonAccommodationTypeRelation
        SET AccommodationTypeId = @AccommodationTypeId
        WHERE PersonId = @PersonId;
    END
    ELSE
    BEGIN
        -- Row with PersonId does not exist, so insert a new row
       
	insert into dbo.PersonAccommodationTypeRelation (PersonId, AccommodationTypeId)
	values (@PersonId, @AccommodationTypeId);
    END

    -- Return the identity of the inserted or updated row
    SELECT SCOPE_IDENTITY() AS PersonAccommodationTypeRelationId;
end