CREATE PROCEDURE [dbo].[updateEmployee]
	-- Add the parameters for the stored procedure here
	(
		@Id int,
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
		@BirthCountryId int= NULL
	)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SET @BirthDate = CAST(DATEADD(hour, 2, @BirthDate) AS DATE);
	SET @EmploymentDate= CAST(DATEADD(hour, 2, @EmploymentDate) AS DATE);

    -- Insert statements for procedure here
	UPDATE dbo.Employee
	SET
		FirstName=@FirstName,
		LastName=@LastName,
		JMBG=@JMBG,
		QualificationId=@QualificationId,
		GenderId=@GenderId,
		Telephone=@Telephone,
		Mobile=@Mobile,
		Email=@Email,
		ResidanceCityId= @ResidanceCityId,
		ResidanceStreetName=@ResidanceStreetName,
		ResidanceHouseNumber=@ResidanceHouseNumber,
		BirthDate=@BirthDate,
		EmploymentDate=@EmploymentDate,
		BankName=@BankName,
		BankAccountNumber=@BankAccountNumber,
		JobPositionId=@JobPositionId,
		EmploymentTypeId= @EmploymentTypeId,
		FatherName=@FatherName,
		YearsOfExperiance=@YearsOfExperiance,
		EmploymentEndDate=@EmploymentEndDate,
		DaysOfVacation=@DaysOfVacation,
		SchoolName=@SchoolName,
		SchoolQualificationName=@SchoolQualificationName,
		BirthCityId=@BirthCityId,
		BirthMunicipalityId=@BirthMunicipalityId,
		BirthCountryId=@BirthCountryId	
	WHERE Id = @Id
	
	exec dbo.removeAllEventsForEmployee @EmployeeId=@Id;

	DECLARE @Title varchar(200) = 'Rođendan: ' + @FirstName + ' ' + @LastName;
	DECLARE @Description varchar(max) = 'Rođendan zaposlenika: ' + @FirstName + ' ' + @LastName + ', datum rođenja: ' + CONVERT(varchar(10),  @BirthDate, 104);

	EXEC dbo.insertCalendarEvent
		@Start = @BirthDate,
		@End = @BirthDate,
		@Color = 'primary', 
		@Title = @Title,
		@Description = @Description,
		@EmployeeId = @Id,
		@Recurring = 1,
		@Reminder=0;
END