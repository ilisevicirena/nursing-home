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
-- Description:	checks if there any unread notification
-- =============================================
CREATE PROCEDURE [dbo].[checkNotificationsStatus]
	-- Add the parameters for the stored procedure here	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select [NotificationNumber]=isnull(t1.NotificationsNumber,0)
	from (select count(Id) as NotificationsNumber from dbo.[Notification] where [Read]=0) as t1;

END
GO
