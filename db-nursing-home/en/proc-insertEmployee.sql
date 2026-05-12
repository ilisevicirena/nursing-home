CREATE PROCEDURE [dbo].[insertEmployee]
	-- Add the parameters for the stored procedure here
	(
		@FirstName nvarchar(50),
		@LastName nvarchar(50),
		@JMBG nvarchar(50),
		@QualificationId int = NULL,
		@GenderId int=NULL,
		@Telephone nvarchar(50)= NULL,
		@Mobile nvarchar(50)= NULL,
		@Email nvarchar(50)= NULL,
		@ResidanceCityId int= NULL,
		@ResidanceStreetName nvarchar(200)= NULL,
		@ResidanceHouseNumber nvarchar(50)= NULL,
		@BirthDate datetime = NULL,	
		@EmploymentDate datetime = NULL,
		@BankName nvarchar(500) = NULL,
		@BankAccountNumber nvarchar(50) = NULL,
		@JobPositionId int=NULL,
		@EmploymentTypeId int=NULL,
		@FatherName nvarchar(50)= NULL,
		@YearsOfExperiance int= NULL,
		@EmploymentEndDate datetime = NULL,
		@DaysOfVacation int= NULL,
		@SchoolName nvarchar(150)=NULL,
		@SchoolQualificationName nvarchar(150)=NULL,
		@BirthCityId int = NULL,
		@BirthMunicipalityId int= NULL,
		@BirthCountryId int= NULL,
		@ActingUserId NCHAR(36) = NULL
	)
AS
BEGIN

    -- Insert statements for procedure here
	DECLARE @Active bit = 1;
	DECLARE @CreationDate datetime = GETDATE();
	DECLARE @EndDate datetime = NULL;

	SET @BirthDate = CAST(DATEADD(hour, 2, @BirthDate) AS DATE);
	SET @EmploymentDate= CAST(DATEADD(hour, 2, @EmploymentDate) AS DATE);

	INSERT INTO dbo.Employee (FirstName, LastName, JMBG, QualificationId, GenderId, Telephone, Mobile, Email, ResidanceCityId, ResidanceStreetName, ResidanceHouseNumber,
	BirthDate, EmploymentDate, BankName, BankAccountNumber, JobPositionId, EmploymentTypeId, FatherName, YearsOfExperiance, EmploymentEndDate, DaysOfVacation, SchoolName,
	SchoolQualificationName, BirthCountryId, BirthMunicipalityId, BirthCityId, Active)
	VALUES (@FirstName, @LastName, @JMBG, @QualificationId, @GenderId, @Telephone, @Mobile, @Email, @ResidanceCityId, @ResidanceStreetName, @ResidanceHouseNumber,
	@BirthDate, @EmploymentDate, @BankName, @BankAccountNumber, @JobPositionId, @EmploymentTypeId, @FatherName, @YearsOfExperiance, @EmploymentEndDate, @DaysOfVacation, @SchoolName,
	@SchoolQualificationName, @BirthCountryId, @BirthMunicipalityId, @BirthCityId, @Active);

	DECLARE @NewIdent Int
	SET @NewIdent = SCOPE_IDENTITY();

	SELECT SCOPE_IDENTITY() AS EmployeeId;

	DECLARE @Title varchar(200) = 'Birthday: ' + @FirstName + ' ' + @LastName;
	DECLARE @Description varchar(max) = 'Employee birthday: ' + @FirstName + ' ' + @LastName + ', birth date: ' + CONVERT(varchar(10), @BirthDate, 104);

	EXEC dbo.insertCalendarEvent
		@Start = @BirthDate,
		@End = @BirthDate,
		@Color = 'primary', 
		@Title = @Title,
		@Description = @Description,
		@EmployeeId = @NewIdent,
		@Recurring = 1,
		@EventTypeId=1,
		@Reminder=0;

	EXEC dbo.logUserActivity 'INSERT_EMPLOYEE', 'Employee inserted', @ActingUserId;
END