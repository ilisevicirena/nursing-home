-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 7.5.2024.
-- Description:	gets furniture statuses by id
-- =============================================
CREATE PROCEDURE [dbo].[getFurnitureStatusesById]
	-- Add the parameters for the stored procedure here
	(
		@Id int
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	WITH StatusData AS (
    SELECT 
        ffsr.Id AS RowId,
        ffsr.FurnitureId,
        ffsr.FurnitureStatusId,
        fs.[Name] AS StatusName,
        fs.Color AS StatusColor,
        fs.Icon AS StatusIcon,
        ffsr.[Date] AS StartDate,
        LEAD(ffsr.[Date]) OVER (ORDER BY ffsr.[Date] ASC) AS EndDate
    FROM 
        dbo.FurnitureFurnitureStatusRelation ffsr 
    LEFT JOIN 
        dbo.FurnitureStatus fs ON ffsr.FurnitureStatusId = fs.Id
    WHERE 
        ffsr.FurnitureId = @Id 
)
SELECT 
    RowId,
    FurnitureId,
    FurnitureStatusId,
    StatusName,
    StatusColor,
    StatusIcon,
    StartDate,
    CASE 
        WHEN EndDate IS NOT NULL THEN DATEADD(SECOND, -1, EndDate)
        ELSE NULL 
    END AS EndDate
FROM 
    StatusData
ORDER BY 
    StartDate DESC;
END
