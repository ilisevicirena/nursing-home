-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 26.7.2024.
-- Description:	get general setting value
-- =============================================
CREATE PROCEDURE [dbo].[getGeneralSetting]
	-- Add the parameters for the stored procedure here
	(
		@Name varchar(50)
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT * from dbo.GeneralSettings where Tag=@Name;
END