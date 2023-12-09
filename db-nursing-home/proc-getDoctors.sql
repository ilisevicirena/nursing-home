CREATE PROCEDURE [dbo].[getDoctors] 	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select 
	Id, FirstName, LastName
	from.Employee where JobPositionId=5 and Active=1;
END