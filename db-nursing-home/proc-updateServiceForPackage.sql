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

	DECLARE @serviceId INT, @packageId INT;

    UPDATE dbo.ServicePackageRelation
    SET
        Active = 0
    WHERE @Id = Id;

    IF EXISTS (SELECT 1 FROM dbo.ServicePackageRelation WHERE Id = @Id)
    BEGIN
        SELECT TOP 1 @serviceId = ServiceId, @packageId = PackageId
        FROM dbo.ServicePackageRelation
        WHERE Id = @Id;

        INSERT INTO dbo.ServicePackageRelation (ServiceId, PackageId, Quantity, Active)
        VALUES (@serviceId, @packageId, @Quantity, 1);
    END
END
