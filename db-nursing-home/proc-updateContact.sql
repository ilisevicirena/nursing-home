-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 21.4.2023.
-- Description:	updates contact for person
-- =============================================
CREATE PROCEDURE [dbo].[updateContact]
(
    @Id INT = NULL,
    @UserId UNIQUEIDENTIFIER = NULL,
    @FirstName VARCHAR(50),
    @LastName VARCHAR(50),
    @Email VARCHAR(50),
    @Telephone VARCHAR(50),
    @Mobile VARCHAR(50),
    @Jmbg VARCHAR(50) = NULL,
    @ResidanceCityId INT = NULL,
    @ResidanceStreetName VARCHAR(300) = NULL,
    @ResidanceHouseNumber VARCHAR(50) = NULL,
    @IsObligeeToPay BIT = 0,
    @IsGuardian BIT = 0,
    @ActingUserId NCHAR(36) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    -- Declare variables to track changes in User table
    DECLARE @OldFirstName VARCHAR(50), @OldLastName VARCHAR(50), @OldEmail VARCHAR(50);

    -- If UserId is provided, update all related contacts
    IF @UserId IS NOT NULL
    BEGIN
        -- Update every contact related to the UserId
        UPDATE dbo.Contact
        SET 
            FirstName = @FirstName, 
            LastName = @LastName, 
            Email = @Email, 
            Telephone = @Telephone, 
            Mobile = @Mobile, 
            Jmbg = @Jmbg, 
            ResidanceCityId = @ResidanceCityId, 
            ResidanceStreetName = @ResidanceStreetName, 
            ResidanceHouseNumber = @ResidanceHouseNumber, 
            IsObligeeToPay = @IsObligeeToPay, 
            IsGuardian = @IsGuardian
        WHERE Id IN (
            SELECT ContactId FROM dbo.UserContactRelation WHERE UserId = @UserId
        );

        -- Get old values from the User table
        SELECT 
            @OldFirstName = FirstName, 
            @OldLastName = LastName, 
            @OldEmail = Email
        FROM dbo.[User]
        WHERE Id = @UserId;

        -- Update User table if FirstName, LastName, or Email has changed
        IF (@OldFirstName != @FirstName OR @OldLastName != @LastName OR @OldEmail != @Email)
        BEGIN
            UPDATE dbo.[User]
            SET 
                FirstName = @FirstName, 
                LastName = @LastName, 
                Email = @Email
            WHERE Id = @UserId;
        END
    END
    ELSE
    BEGIN
        -- Update the specific contact by Id
        UPDATE dbo.Contact
        SET 
            FirstName = @FirstName, 
            LastName = @LastName, 
            Email = @Email, 
            Telephone = @Telephone, 
            Mobile = @Mobile, 
            Jmbg = @Jmbg, 
            ResidanceCityId = @ResidanceCityId, 
            ResidanceStreetName = @ResidanceStreetName, 
            ResidanceHouseNumber = @ResidanceHouseNumber, 
            IsObligeeToPay = @IsObligeeToPay, 
            IsGuardian = @IsGuardian
        WHERE Id = @Id;
    END

    EXEC dbo.logUserActivity 'UPDATE_CONTACT', 'Contact updated', @ActingUserId;
END