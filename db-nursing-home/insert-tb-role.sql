INSERT INTO [dbo].[Role] ([Name], [Description])
VALUES 
    ('ADMINISTRATOR', 'Sistemski administrator. Korisnička uloga s maksimalnim dopuštenjima.'),
    ('MODERATOR',''),
    ('USER','Osnovna korisnička uloga. Namijenjena skrbnicima osoba u domu. Pruža informacije o trenutnom stanju pacijenta kao i drugim povezanim informacijama.'),
    ('NURSE', 'Korisnička uloga za medicinsko osoblje. Daje uvid u informacije o stanju svih pacijenata kao i povezane informacije o svim osobama trenutno smještenim u ustanovu.'),
    ('CAREGIVER', 'Korisnička uloga za svo ostalo osoblje koje brine o pacijentima. Daje informacije o trenutnom zdravstvenom stanju svih smještenih osoba.'),
    ('COOK', ''),
    ('OTHER_STUFF',''),
    ('DOCTOR','');
