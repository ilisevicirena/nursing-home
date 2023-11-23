-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 19.4.2023.
-- Description:	inserts new person in table Person
-- =============================================
CREATE PROCEDURE [dbo].[insertPerson]
	-- Add the parameters for the stored procedure here
	(
		@FirstName varchar(50),
		@LastName varchar(50),
		@JMBG varchar(50) = NULL,
		@BirthDate datetime = NULL,	
		@StartDate datetime = NULL,
		@RoomId int = NULL,
		@Address varchar(200)=NULL,
		@GenderId int=NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DECLARE @Active bit = 1;
	DECLARE @CreationDate datetime = GETDATE();
	DECLARE @EndDate datetime = NULL;

	SET @BirthDate = CAST(DATEADD(hour, 2, @BirthDate) AS DATE);
	SET @StartDate= CAST(DATEADD(hour, 2, @StartDate) AS DATE);

	INSERT INTO dbo.Person (FirstName, LastName, JMBG, BirthDate, StartDate, Active, CreationDate, EndDate, Address, GenderId)
	VALUES (@FirstName, @LastName, @JMBG, @BirthDate, @StartDate, @Active, @CreationDate, @EndDate, @Address, @GenderId);

	DECLARE @NewIdent Int
SET @NewIdent = SCOPE_IDENTITY();

exec dbo.writeLog @LogType='INSERT', @LogEntity='Person', @Key= @NewIdent;

	SELECT SCOPE_IDENTITY() AS PersonId;

	DECLARE @Title varchar(200) = 'Rođendan: ' + @FirstName + ' ' + @LastName;
	DECLARE @Description varchar(max) = 'Rođendan osobe: ' + @FirstName + ' ' + @LastName + ', datum rođenja: ' + CONVERT(varchar(10), @BirthDate, 104);

	EXEC dbo.insertCalendarEvent
		@Start = @BirthDate,
		@End = @BirthDate,
		@Color = 'info', 
		@Title = @Title,
		@Description = @Description,
		@PersonId = @NewIdent,
		@Recurring = 1,
		@Reminder=0;
END