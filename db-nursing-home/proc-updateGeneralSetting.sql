-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 26.7.2024.
-- Description:	update general setting value
-- =============================================
CREATE PROCEDURE [dbo].[updateGeneralSetting]
	-- Add the parameters for the stored procedure here
	(
		@Tag varchar(50),
		@Value nchar(2000)
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	UPDATE dbo.GeneralSettings set [Value]=@Value where Tag=@Tag;
END