-- =============================================
-- Author:	Irena Ilisevic
-- Create date: 2.6.2026
-- Description: Adds daily schedule and RxCui columns to PersonMedication (migration for existing DBs)
-- =============================================
ALTER TABLE [dbo].[PersonMedication]
ADD [MorningDose]  [nvarchar](100) NULL,
    [NoonDose]     [nvarchar](100) NULL,
    [EveningDose]  [nvarchar](100) NULL,
    [NightDose]    [nvarchar](100) NULL,
    [RxCui]        [nvarchar](20)  NULL;
