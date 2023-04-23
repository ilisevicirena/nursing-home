USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[getPersons]    Script Date: 23.4.2023. 13:54:43 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 19.4.2023.
-- Description:	gets all persons from table person based on active state
-- =============================================
CREATE PROCEDURE [dbo].[getPersons] 
	-- Add the parameters for the stored procedure here
	(@Active bit)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	IF @Active=0
	BEGIN 
	SELECT 
		[Id] = p.Id,
		[FirstName]=FirstName,
		[LastName]=LastName,
		[JMBG]=JMBG,
		[BirthDate]=BirthDate,
		[Active]=Active,
		[StartDate]=StartDate,
		[EndDate]=EndDate,
		[CreationDate]=CreationDate,
		[GenderId]=GenderId,
		[GenderName]=g.Name,
		[GenderTag]=g.Tag
	FROM [dbo].[Person] as p left join dbo.Gender as g on p.GenderId=g.Id;
	END
	ELSE
	BEGIN
	select
	[Id] = p.Id,
		[FirstName]=FirstName,
		[LastName]=LastName,
		[JMBG]=JMBG,
		[BirthDate]=BirthDate,
		[Active]=Active,
		[StartDate]=StartDate,
		[EndDate]=EndDate,
		[CreationDate]=CreationDate,
		[GenderId]=GenderId,
		[GenderName]=g.Name,
		[GenderTag]=g.Tag
	FROM [dbo].[Person] as p left join dbo.Gender as g on p.GenderId=g.Id WHERE Active=@Active
	END
END
GO


