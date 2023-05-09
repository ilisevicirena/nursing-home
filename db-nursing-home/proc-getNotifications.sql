-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Irena Ilisevic
-- Create date: 9.5.2023.
-- Description:	get all notifications
-- =============================================
CREATE PROCEDURE [dbo].[getNotifications]
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select
	[Id]=n.Id,
	[Text]=n.[Text],
	[CreationDate]=n.CreationDate,
	[ReadDate]=n.ReadDate,
	[Read]=n.[Read],
	[NotificationTypeId]=n.NotificationTypeId,
	[TypeCode]=nt.Code,
	[TypeStringKey]=nt.StringKey
	from dbo.[Notification] as n
	join dbo.NotificationType as nt on n.NotificationTypeId=nt.Id
	order by n.CreationDate desc;
END
GO
