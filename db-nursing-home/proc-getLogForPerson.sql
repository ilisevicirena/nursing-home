USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[getLogForPerson]    Script Date: 28.4.2023. 12:52:10 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 28.4.2023.
-- Description:	gets log history for Person
-- =============================================
CREATE PROCEDURE [dbo].[getLogForPerson]
	-- Add the parameters for the stored procedure here
	(@Id int)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select 
	[Id]=l.Id,
	[LogTypeId]=l.LogTypeId,
	[LogType]=t.[Name],
	[LogTypePretty]=t.NamePretty,
	[LogEntityId]=l.LogEntityId,
	[LogEntity]=e.[Name],
	[FirstName]=p.FirstName,
	[LastName]=p.LastName,
	[Jmbg]=p.JMBG,
	[PersonId]=l.[KeyId],
	[CreationDate]=l.CreationDate
	from dbo.[Log] as l 
	join dbo.LogType as t on l.LogTypeId=t.Id
	join dbo.LogEntity as e on l.LogEntityId=e.Id
	join dbo.Person as p on l.[KeyId]=p.Id where e.[Name]='Person' and l.[KeyId]=@Id
	order by Id desc;
END
GO

