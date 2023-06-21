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
-- Create date: 21.6.2023
-- Description:	update notification type
-- =============================================
CREATE PROCEDURE [dbo].[updateNotificationType]
	-- Add the parameters for the stored procedure here
(
	@Id int,
	@Enabled bit,
	@DaysReminder int
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	update dbo.NotificationType
	set 
	[Enabled]=@Enabled,
	[DaysReminder]=@DaysReminder
	where Id=@Id;

END
GO
