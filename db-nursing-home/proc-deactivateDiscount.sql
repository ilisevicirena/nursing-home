-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 7.5.2023.
-- Description:	deactivates discount
-- =============================================
CREATE PROCEDURE [dbo].[deactivateDiscount]
	-- Add the parameters for the stored procedure here
(
	@Id int
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    update dbo.Discount
	set Active=0
	where Id=@Id;

END