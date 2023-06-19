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
-- Create date: 19.6.2023.
-- Description:	gets all notifications for type
-- =============================================
CREATE PROCEDURE [dbo].[getNotificationsForType]
	-- Add the parameters for the stored procedure here
(
@Id int
)
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
	[TypeStringKey]=nt.StringKey,
	[LinkId]=n.LinkId,
	[GoToLink]=n.GoToLink
	from dbo.[Notification] as n
	join dbo.NotificationType as nt on n.NotificationTypeId=nt.Id
	where NotificationTypeId=@Id
	order by n.CreationDate desc;
END
GO
