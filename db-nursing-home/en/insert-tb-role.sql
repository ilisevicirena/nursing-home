INSERT INTO [dbo].[Role] ([Name], [Description])
VALUES 
    ('ADMINISTRATOR', 'System administrator role. Role with maximum permissions.'),
    ('MODERATOR',''),
    ('USER','User system role. User role is for persons guardian. Allows person insights in their persons on care current health status and other connected information.'),
    ('NURSE', 'Role for facility stuff with medical degree. Gives insight in all persons health state and other connected information.'),
    ('CAREGIVER', 'Role for facility stuff associated with persons on care. Gives insight in all persons health state and other connected information'),
    ('COOK', 'Role for cooking stuff. Currently not implemented'),
    ('OTHER_STUFF',''),
    ('DOCTOR','');
