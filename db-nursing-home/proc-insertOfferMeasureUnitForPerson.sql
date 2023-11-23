-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 14.6.2023
-- Description:	inserts new offer measure unit for person
-- =============================================
CREATE PROCEDURE [dbo].[insertOfferMeasureUnitForPerson]
	-- Add the parameters for the stored procedure here
	(
		@PersonId int,
		@MeasureUnitId int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

      IF EXISTS (SELECT 1 FROM dbo.PersonOfferRelation WHERE PersonId = @PersonId)
    BEGIN
        -- Update the existing row
        UPDATE dbo.PersonOfferRelation
        SET MeasureUnitId = @MeasureUnitId
        WHERE PersonId = @PersonId
    END
    ELSE
    BEGIN
        -- Insert a new row
        INSERT INTO dbo.PersonOfferRelation (PersonId, MeasureUnitId)
        VALUES (@PersonId, @MeasureUnitId)
    END
END