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
		@BirthCountryId int= NULL,
		@UserId UNIQUEIDENTIFIER = NULL,
		@ActingUserId NCHAR(36) = NULL
	)
AS
BEGIN
	SET NOCOUNT ON;

	-- Ensure that the date is cast correctly
	SET @BirthDate = CAST(DATEADD(hour, 2, @BirthDate) AS DATE);
	SET @EmploymentDate = CAST(DATEADD(hour, 2, @EmploymentDate) AS DATE);

	-- Get current birth date from the employee record
	DECLARE @CurrentBirthDate datetime;
	SELECT @CurrentBirthDate = BirthDate FROM dbo.Employee WHERE Id = @Id;

	-- Update the employee data
	UPDATE dbo.Employee
	SET
		FirstName = @FirstName,
		LastName = @LastName,
		JMBG = @JMBG,
		QualificationId = @QualificationId,
		GenderId = @GenderId,
		Telephone = @Telephone,
		Mobile = @Mobile,
		Email = @Email,
		ResidanceCityId = @ResidanceCityId,
		ResidanceStreetName = @ResidanceStreetName,
		ResidanceHouseNumber = @ResidanceHouseNumber,
		BirthDate = @BirthDate,
		EmploymentDate = @EmploymentDate,
		BankName = @BankName,
		BankAccountNumber = @BankAccountNumber,
		JobPositionId = @JobPositionId,
		EmploymentTypeId = @EmploymentTypeId,
		FatherName = @FatherName,
		YearsOfExperiance = @YearsOfExperiance,
		EmploymentEndDate = @EmploymentEndDate,
		DaysOfVacation = @DaysOfVacation,
		SchoolName = @SchoolName,
		SchoolQualificationName = @SchoolQualificationName,
		BirthCityId = @BirthCityId,
		BirthMunicipalityId = @BirthMunicipalityId,
		BirthCountryId = @BirthCountryId
	WHERE Id = @Id;

	-- Only update events if the birth date has changed
	IF @CurrentBirthDate <> @BirthDate
	BEGIN
		-- Remove old birthday event
		EXEC dbo.removeAllEventsForEmployee @EmployeeId = @Id, @EventTypeId = 1;

		-- Insert new birthday event
		DECLARE @Title varchar(200) = 'Rođendan: ' + @FirstName + ' ' + @LastName;
		DECLARE @Description varchar(max) = 'Rođendan zaposlenika: ' + @FirstName + ' ' + @LastName + ', datum rođenja: ' + CONVERT(varchar(10), @BirthDate, 104);

		EXEC dbo.insertCalendarEvent
			@Start = @BirthDate,
			@End = @BirthDate,
			@Color = 'primary', 
			@Title = @Title,
			@Description = @Description,
			@EmployeeId = @Id,
			@EventTypeId = 1,
			@Recurring = 1,
			@Reminder = 0;
	END;

	-- If UserId is supplied, check if FirstName, LastName, or Email have changed and update the User table
	IF @UserId IS NOT NULL
	BEGIN
		DECLARE @CurrentFirstName nvarchar(50), @CurrentLastName nvarchar(50), @CurrentEmail nvarchar(50);

		SELECT @CurrentFirstName = FirstName, @CurrentLastName = LastName, @CurrentEmail = Email
		FROM dbo.[User]
		WHERE Id = @UserId;

		IF @CurrentFirstName <> @FirstName OR @CurrentLastName <> @LastName OR @CurrentEmail <> @Email
		BEGIN
			UPDATE dbo.[User]
			SET FirstName = @FirstName, LastName = @LastName, Email = @Email
			WHERE Id = @UserId;

			-- Log the activity in the UserActivity table
			INSERT INTO [dbo].[UserActivity] ([UserId], [ActivityType], [Timestamp], [Description])
			VALUES (@UserId, 'USER_UPDATE', GETDATE(), 'User data updated and associated employee information updated');
		END;
	END;

	EXEC dbo.logUserActivity 'UPDATE_EMPLOYEE', 'Employee updated', @ActingUserId;
END;
