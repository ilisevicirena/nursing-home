USE [ENV01_NURSING_HOME]
GO

/****** Object:  StoredProcedure [dbo].[getLatestNotifications]    Script Date: 9.5.2023. 14:13:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 9.5.2023.
-- Description:	gets first 50 notifications
-- =============================================
CREATE PROCEDURE [dbo].[getLatestNotifications]
	-- Add the parameters for the stored procedure here	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select top 50 
	[Id]=n.Id,
	[Text]=n.[Text],
	[CreationDate]=n.CreationDate,
	[ReadDate]=n.ReadDate,
	[Read]=n.[Read],
	[NotificationTypeId]=n.NotificationTypeId,
	[TypeCode]=nt.Code,
	[TypeStringKey]=nt.StringKey,
	[LinkId]=n.LinkId,
	[GoToLink]=n.GoToLink
	from dbo.[Notification] as n
	join dbo.NotificationType as nt on n.NotificationTypeId=nt.Id
	order by n.CreationDate desc;

END
GO

