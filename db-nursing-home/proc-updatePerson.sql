-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 19.4.2023.
-- Description:	updates person from Person table
-- =============================================
CREATE PROCEDURE [dbo].[updatePerson]
	-- Add the parameters for the stored procedure here
	(
		@Id int,
		@FirstName varchar(50),
		@LastName varchar(50),
		@JMBG varchar(50) = NULL,
		@BirthDate datetime = NULL,	
		@StartDate datetime = NULL,
		@EndDate datetime=NULL,
		@Address varchar(200)=NULL,
		@GenderId int = NULL,
		@ActingUserId NCHAR(36) = NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SET @BirthDate = CAST(DATEADD(hour, 2, @BirthDate) AS DATE);
	SET @StartDate= CAST(DATEADD(hour, 2, @StartDate) AS DATE);

    -- Insert statements for procedure here
	UPDATE dbo.Person
	SET
		FirstName=@FirstName,
		LastName=@LastName,
		JMBG=@JMBG,
		BirthDate=@BirthDate,
		StartDate=@StartDate,
		EndDate=@EndDate,
		Address=@Address,
		GenderId=@GenderId
	WHERE Id = @Id

	exec dbo.writeLog @LogType='UPDATE', @LogEntity='Person', @Key= @Id, @UserId=@ActingUserId;
	exec dbo.removeAllEventsForPerson @PersonId=@Id, @EventTypeId=1;

	DECLARE @Title varchar(200) = 'Rođendan: ' + @FirstName + ' ' + @LastName;
	DECLARE @Description varchar(max) = 'Rođendan osobe: ' + @FirstName + ' ' + @LastName + ', datum rođenja: ' + CONVERT(varchar(10),  @BirthDate, 104);

	EXEC dbo.insertCalendarEvent
		@Start = @BirthDate,
		@End = @BirthDate,
		@Color = 'info', 
		@Title = @Title,
		@Description = @Description,
		@EventTypeId=1,
		@PersonId = @Id,
		@Recurring = 1,
		@Reminder=0;

	EXEC dbo.logUserActivity 'UPDATE_PERSON', 'Person updated', @ActingUserId;
END