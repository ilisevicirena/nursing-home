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
		@GenderId int=NULL,
		@MaidenLastName varchar(50)= NULL,
		@FatherFirstName varchar(50)= NULL,
		@MotherFirstName varchar(50)= NULL,
		@MotherMaidenLastName varchar(50)= NULL,
		@BirthCityId int = NULL,
		@BirthMunicipalityId int= NULL,
		@BirthCountryId int= NULL,
		@ResidanceCityId int= NULL,
		@ResidanceStreetName varchar(200)= NULL,
		@ResidanceHouseNumber varchar(50)= NULL,
		@Telephone varchar(50)= NULL,
		@Mobile varchar(50)= NULL,
		@Email varchar(50)= NULL,
		@DoctorName varchar(200)= NULL
	)
AS
BEGIN

    -- Insert statements for procedure here
	DECLARE @Active bit = 1;
	DECLARE @CreationDate datetime = GETDATE();
	DECLARE @EndDate datetime = NULL;

	SET @BirthDate = CAST(DATEADD(hour, 2, @BirthDate) AS DATE);
	SET @StartDate= CAST(DATEADD(hour, 2, @StartDate) AS DATE);

	INSERT INTO dbo.Person (FirstName, LastName, JMBG, BirthDate, StartDate, Active, CreationDate, EndDate, [Address], 
	GenderId, MaidenLastName, FatherFirstName, MotherFirstName, MotherMaidenLastName, BirthCityId, BirthMunicipalityId, BirthCountryId, ResidanceCityId,
	ResidanceStreetName, ResidanceHouseNumber, Telephone, Mobile,Email,DoctorName)
	VALUES (@FirstName, @LastName, @JMBG, @BirthDate, @StartDate, @Active, @CreationDate, @EndDate, @Address, @GenderId,
	@MaidenLastName, @FatherFirstName, @MotherFirstName,@MotherMaidenLastName, @BirthCityId, @BirthMunicipalityId, @BirthCountryId, @ResidanceCityId, @ResidanceStreetName,
	@ResidanceHouseNumber, @Telephone, @Mobile, @Email, @DoctorName
	);

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