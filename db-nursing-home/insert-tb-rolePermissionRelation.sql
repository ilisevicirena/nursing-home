-- ADMINISTRATOR (1): all permissions
INSERT INTO [dbo].[RolePermissionRelation] ([RoleId], [PermissionId])
SELECT r.[Id], p.[Id]
FROM [dbo].[Role] r, [dbo].[Permission] p
WHERE r.[Name] = 'ADMINISTRATOR';

-- MODERATOR (2): all except DELETE_USERS, DELETE_PERSONS, MANAGE_SETTINGS
INSERT INTO [dbo].[RolePermissionRelation] ([RoleId], [PermissionId])
SELECT r.[Id], p.[Id]
FROM [dbo].[Role] r, [dbo].[Permission] p
WHERE r.[Name] = 'MODERATOR'
  AND p.[Name] NOT IN ('DELETE_USERS', 'DELETE_PERSONS', 'MANAGE_SETTINGS');

-- USER (3): basic read access for their assigned persons
INSERT INTO [dbo].[RolePermissionRelation] ([RoleId], [PermissionId])
SELECT r.[Id], p.[Id]
FROM [dbo].[Role] r, [dbo].[Permission] p
WHERE r.[Name] = 'USER'
  AND p.[Name] IN ('VIEW_DASHBOARD', 'VIEW_PERSONS', 'VIEW_NOTES', 'VIEW_DOCUMENTS', 'VIEW_CALENDAR', 'VIEW_NOTIFICATIONS');

-- NURSE (4): clinical access
INSERT INTO [dbo].[RolePermissionRelation] ([RoleId], [PermissionId])
SELECT r.[Id], p.[Id]
FROM [dbo].[Role] r, [dbo].[Permission] p
WHERE r.[Name] = 'NURSE'
  AND p.[Name] IN ('VIEW_DASHBOARD', 'VIEW_PERSONS', 'VIEW_NOTES', 'ADD_NOTES', 'EDIT_NOTES',
                   'VIEW_DOCUMENTS', 'ADD_DOCUMENTS', 'VIEW_CALCULATIONS', 'VIEW_CALENDAR',
                   'VIEW_NOTIFICATIONS', 'VIEW_EMPLOYEES');

-- CAREGIVER (5): caregiver access
INSERT INTO [dbo].[RolePermissionRelation] ([RoleId], [PermissionId])
SELECT r.[Id], p.[Id]
FROM [dbo].[Role] r, [dbo].[Permission] p
WHERE r.[Name] = 'CAREGIVER'
  AND p.[Name] IN ('VIEW_DASHBOARD', 'VIEW_PERSONS', 'VIEW_NOTES', 'VIEW_DOCUMENTS', 'VIEW_CALENDAR', 'VIEW_NOTIFICATIONS');

-- COOK (6): minimal access
INSERT INTO [dbo].[RolePermissionRelation] ([RoleId], [PermissionId])
SELECT r.[Id], p.[Id]
FROM [dbo].[Role] r, [dbo].[Permission] p
WHERE r.[Name] = 'COOK'
  AND p.[Name] IN ('VIEW_DASHBOARD', 'VIEW_CALENDAR', 'VIEW_NOTIFICATIONS');

-- OTHER_STUFF (7): minimal access
INSERT INTO [dbo].[RolePermissionRelation] ([RoleId], [PermissionId])
SELECT r.[Id], p.[Id]
FROM [dbo].[Role] r, [dbo].[Permission] p
WHERE r.[Name] = 'OTHER_STUFF'
  AND p.[Name] IN ('VIEW_DASHBOARD', 'VIEW_CALENDAR', 'VIEW_NOTIFICATIONS');

-- DOCTOR (8): clinical access
INSERT INTO [dbo].[RolePermissionRelation] ([RoleId], [PermissionId])
SELECT r.[Id], p.[Id]
FROM [dbo].[Role] r, [dbo].[Permission] p
WHERE r.[Name] = 'DOCTOR'
  AND p.[Name] IN ('VIEW_DASHBOARD', 'VIEW_PERSONS', 'VIEW_NOTES', 'ADD_NOTES', 'EDIT_NOTES',
                   'VIEW_DOCUMENTS', 'ADD_DOCUMENTS', 'VIEW_CALCULATIONS', 'VIEW_CALENDAR',
                   'VIEW_NOTIFICATIONS', 'VIEW_EMPLOYEES');
