const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Nursing Home API",
    version: "1.0.0",
    description: "REST API for Nursing Home management system",
  },
  servers: [{ url: "http://localhost:8090" }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter JWT token obtained from POST /authentication/login",
      },
    },
    schemas: {
      IdBody: {
        type: "object",
        required: ["Id"],
        properties: { Id: { type: "integer" } },
      },
    },
  },
  tags: [
    { name: "Authentication" },
    { name: "Floors" },
    { name: "Rooms" },
    { name: "Persons" },
    { name: "Contacts" },
    { name: "Services" },
    { name: "Packages" },
    { name: "Discounts" },
    { name: "Services Management" },
    { name: "Documents" },
    { name: "Notes" },
    { name: "Tags" },
    { name: "Events" },
    { name: "Calculation" },
    { name: "Summary" },
    { name: "Accommodation" },
    { name: "Genders" },
    { name: "Countries" },
    { name: "Municipalities" },
    { name: "Cities" },
    { name: "Health Conditions" },
    { name: "Person Categories" },
    { name: "Accommodation Types" },
    { name: "Qualifications" },
    { name: "Job Positions" },
    { name: "Employment Types" },
    { name: "Employees" },
    { name: "Vacations" },
    { name: "Doctor Visits" },
    { name: "Furniture" },
    { name: "Furniture Statuses" },
    { name: "Measure Units" },
    { name: "Price Units" },
    { name: "Person Allergens" },
    { name: "Person Medications" },
    { name: "Person Functional Status" },
    { name: "Person Dietary Restrictions" },
    { name: "Person Insurance" },
    { name: "Users" },
    { name: "Notifications" },
    { name: "General Settings" },
    { name: "My Profile" },
  ],
  paths: {
    // ─── Authentication ───────────────────────────────────────────────
    "/authentication/login": {
      post: {
        tags: ["Authentication"],
        summary: "Login",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["Identifier", "Password"],
                properties: {
                  Identifier: { type: "string", description: "Username or email" },
                  Password: { type: "string" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "JWT token returned" }, 401: { description: "Invalid credentials" } },
      },
    },
    "/authentication/forgotPassword": {
      post: {
        tags: ["Authentication"],
        summary: "Request password reset email",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object", required: ["email"], properties: { email: { type: "string", format: "email" } } },
            },
          },
        },
        responses: { 200: { description: "Reset email sent" } },
      },
    },
    "/authentication/setPassword": {
      post: {
        tags: ["Authentication"],
        summary: "Set new password using reset token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["token", "newPassword"],
                properties: { token: { type: "string" }, newPassword: { type: "string" } },
              },
            },
          },
        },
        responses: { 200: { description: "Password updated" } },
      },
    },
    "/authentication/roles": {
      get: {
        tags: ["Authentication"],
        summary: "Get user roles",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "List of roles" } },
      },
    },
    "/authentication/permissions": {
      get: {
        tags: ["Authentication"],
        summary: "Get user permissions",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "List of permissions" } },
      },
    },
    "/authentication/logout": {
      post: {
        tags: ["Authentication"],
        summary: "Logout",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Logged out" } },
      },
    },
    "/authentication/resetPassword": {
      post: {
        tags: ["Authentication"],
        summary: "Reset password (authenticated)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["oldPassword", "newPassword"],
                properties: { oldPassword: { type: "string" }, newPassword: { type: "string" } },
              },
            },
          },
        },
        responses: { 200: { description: "Password reset" } },
      },
    },

    // ─── Floors ───────────────────────────────────────────────────────
    "/api/floors": {
      get: {
        tags: ["Floors"],
        summary: "List all floors",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Floors list" } },
      },
    },
    "/api/floors/add": {
      post: {
        tags: ["Floors"],
        summary: "Add floor",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object", required: ["Name"], properties: { Name: { type: "string" } } },
            },
          },
        },
        responses: { 200: { description: "Floor added" } },
      },
    },
    "/api/floors/update": {
      post: {
        tags: ["Floors"],
        summary: "Update floor",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object", required: ["Id", "Name"], properties: { Id: { type: "integer" }, Name: { type: "string" } } },
            },
          },
        },
        responses: { 200: { description: "Floor updated" } },
      },
    },
    "/api/floors/delete": {
      delete: {
        tags: ["Floors"],
        summary: "Delete floor",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } },
        },
        responses: { 200: { description: "Floor deleted" } },
      },
    },

    // ─── Rooms ────────────────────────────────────────────────────────
    "/api/rooms": {
      get: {
        tags: ["Rooms"],
        summary: "List all rooms",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "Capacity", in: "query", schema: { type: "integer" } }],
        responses: { 200: { description: "Rooms list" } },
      },
    },
    "/api/rooms/add": {
      post: {
        tags: ["Rooms"],
        summary: "Add room",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["Name", "FloorId", "Capacity"],
                properties: { Name: { type: "string" }, FloorId: { type: "integer" }, Capacity: { type: "integer" } },
              },
            },
          },
        },
        responses: { 200: { description: "Room added" } },
      },
    },
    "/api/rooms/update": {
      post: {
        tags: ["Rooms"],
        summary: "Update room",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["Id"],
                properties: { Id: { type: "integer" }, Name: { type: "string" }, FloorId: { type: "integer" }, Capacity: { type: "integer" } },
              },
            },
          },
        },
        responses: { 200: { description: "Room updated" } },
      },
    },
    "/api/rooms/delete": {
      delete: {
        tags: ["Rooms"],
        summary: "Delete room",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Room deleted" } },
      },
    },
    "/api/rooms/getRoomsForFloor": {
      get: {
        tags: ["Rooms"],
        summary: "Get rooms by floor",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "FloorId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Rooms for floor" } },
      },
    },
    "/api/rooms/getAvaliableRooms": {
      get: {
        tags: ["Rooms"],
        summary: "Get available rooms",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Available rooms" } },
      },
    },
    "/api/rooms/getAccomodationManagementRooms": {
      get: {
        tags: ["Rooms"],
        summary: "Get rooms/floors/persons for accommodation management",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Accommodation management data" } },
      },
    },

    // ─── Persons ──────────────────────────────────────────────────────
    "/api/persons": {
      get: {
        tags: ["Persons"],
        summary: "List persons",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "Active", in: "query", schema: { type: "boolean" } },
          { name: "UserId", in: "query", schema: { type: "integer" } },
        ],
        responses: { 200: { description: "Persons list" } },
      },
    },
    "/api/persons/getActivePersonsByMonthYear": {
      get: {
        tags: ["Persons"],
        summary: "Get active persons for a specific month/year",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "Month", in: "query", required: true, schema: { type: "integer" } },
          { name: "Year", in: "query", required: true, schema: { type: "integer" } },
        ],
        responses: { 200: { description: "Active persons" } },
      },
    },
    "/api/persons/add": {
      post: {
        tags: ["Persons"],
        summary: "Add person",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "Person added" } },
      },
    },
    "/api/persons/update": {
      post: {
        tags: ["Persons"],
        summary: "Update person basic info",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Person updated" } },
      },
    },
    "/api/persons/updateDetailed": {
      post: {
        tags: ["Persons"],
        summary: "Update detailed person info",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Person details updated" } },
      },
    },
    "/api/persons/delete": {
      delete: {
        tags: ["Persons"],
        summary: "Delete person",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Person deleted" } },
      },
    },
    "/api/persons/personDetails": {
      get: {
        tags: ["Persons"],
        summary: "Get person details",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "Id", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Person details" } },
      },
    },
    "/api/persons/personDetailed": {
      get: {
        tags: ["Persons"],
        summary: "Get full detailed person info",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "Id", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Full person details" } },
      },
    },
    "/api/persons/searchPersons": {
      get: {
        tags: ["Persons"],
        summary: "Search persons by name or identifier",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "Search", in: "query", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Matching persons" } },
      },
    },
    "/api/persons/changeStatusPerson": {
      post: {
        tags: ["Persons"],
        summary: "Activate / deactivate person",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object", required: ["Id", "Active"], properties: { Id: { type: "integer" }, Active: { type: "boolean" } } },
            },
          },
        },
        responses: { 200: { description: "Status changed" } },
      },
    },
    "/api/persons/changeRoomPerson": {
      post: {
        tags: ["Persons"],
        summary: "Change person's room assignment",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object", required: ["PersonId", "RoomId"], properties: { PersonId: { type: "integer" }, RoomId: { type: "integer" } } },
            },
          },
        },
        responses: { 200: { description: "Room changed" } },
      },
    },
    "/api/persons/deactivateRoomPerson": {
      post: {
        tags: ["Persons"],
        summary: "Deactivate person's room assignment",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["PersonId"] } } } },
        responses: { 200: { description: "Room assignment deactivated" } },
      },
    },
    "/api/persons/roomsHistoryForPerson": {
      get: {
        tags: ["Persons"],
        summary: "Get room history for person",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "PersonId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Room history" } },
      },
    },
    "/api/persons/getLogForPerson": {
      get: {
        tags: ["Persons"],
        summary: "Get activity log for person",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "PersonId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Activity log" } },
      },
    },
    "/api/persons/getPersonsForUserDashboard": {
      get: {
        tags: ["Persons"],
        summary: "Get persons for user dashboard",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Dashboard persons" } },
      },
    },
    "/api/persons/getPersonsForUser": {
      get: {
        tags: ["Persons"],
        summary: "Get persons assigned to current user",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "User's persons" } },
      },
    },

    // ─── Contacts ─────────────────────────────────────────────────────
    "/api/contacts": {
      get: {
        tags: ["Contacts"],
        summary: "Get contacts for person",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "PersonId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Contacts list" } },
      },
    },
    "/api/contacts/add": {
      post: {
        tags: ["Contacts"],
        summary: "Add contact",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["PersonId"] } } } },
        responses: { 200: { description: "Contact added" } },
      },
    },
    "/api/contacts/update": {
      post: {
        tags: ["Contacts"],
        summary: "Update contact",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Contact updated" } },
      },
    },
    "/api/contacts/delete": {
      delete: {
        tags: ["Contacts"],
        summary: "Delete contact",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Contact deleted" } },
      },
    },

    // ─── Services ─────────────────────────────────────────────────────
    "/api/services": {
      get: {
        tags: ["Services"],
        summary: "List all services",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Services list" } },
      },
    },
    "/api/services/add": {
      post: {
        tags: ["Services"],
        summary: "Add service",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "Service added" } },
      },
    },
    "/api/services/update": {
      post: {
        tags: ["Services"],
        summary: "Update service",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Service updated" } },
      },
    },
    "/api/services/delete": {
      delete: {
        tags: ["Services"],
        summary: "Deactivate service",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Service deactivated" } },
      },
    },
    "/api/services/getServicesForPackage": {
      get: {
        tags: ["Services"],
        summary: "Get services in a package",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "PackageId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Package services" } },
      },
    },

    // ─── Packages ─────────────────────────────────────────────────────
    "/api/packages": {
      get: {
        tags: ["Packages"],
        summary: "List all packages",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Packages list" } },
      },
    },
    "/api/packages/add": {
      post: {
        tags: ["Packages"],
        summary: "Add package with associated services",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "Package added" } },
      },
    },
    "/api/packages/update": {
      post: {
        tags: ["Packages"],
        summary: "Update package and services",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Package updated" } },
      },
    },
    "/api/packages/delete": {
      delete: {
        tags: ["Packages"],
        summary: "Deactivate package",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Package deactivated" } },
      },
    },

    // ─── Discounts ────────────────────────────────────────────────────
    "/api/discounts": {
      get: {
        tags: ["Discounts"],
        summary: "List all discounts",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Discounts list" } },
      },
    },
    "/api/discounts/add": {
      post: {
        tags: ["Discounts"],
        summary: "Add discount",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "Discount added" } },
      },
    },
    "/api/discounts/delete": {
      delete: {
        tags: ["Discounts"],
        summary: "Deactivate discount",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Discount deactivated" } },
      },
    },

    // ─── Services Management ──────────────────────────────────────────
    "/api/services-management/getPackageAndServicesForPerson": {
      get: {
        tags: ["Services Management"],
        summary: "Get services/packages/discounts for person",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "PersonId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Person services data" } },
      },
    },
    "/api/services-management/getDiscountsForPerson": {
      get: {
        tags: ["Services Management"],
        summary: "Get person's discounts",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "PersonId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Person discounts" } },
      },
    },
    "/api/services-management/update": {
      post: {
        tags: ["Services Management"],
        summary: "Update person's services, packages, discounts",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["PersonId"] } } } },
        responses: { 200: { description: "Updated" } },
      },
    },

    // ─── Documents ────────────────────────────────────────────────────
    "/api/documents/getDocumentContent": {
      get: {
        tags: ["Documents"],
        summary: "Get document with base64 content",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "Id", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Document content" } },
      },
    },
    "/api/documents/add": {
      post: {
        tags: ["Documents"],
        summary: "Upload document",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "Document uploaded" } },
      },
    },
    "/api/documents/getDocumentsForPerson": {
      get: {
        tags: ["Documents"],
        summary: "List documents for person",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "PersonId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Person documents" } },
      },
    },
    "/api/documents/getDocumentsForPersonByType": {
      get: {
        tags: ["Documents"],
        summary: "Get documents for person by type",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "PersonId", in: "query", required: true, schema: { type: "integer" } },
          { name: "TypeId", in: "query", required: true, schema: { type: "integer" } },
        ],
        responses: { 200: { description: "Filtered documents" } },
      },
    },
    "/api/documents/getDocumentTypes": {
      get: {
        tags: ["Documents"],
        summary: "List all document types",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Document types" } },
      },
    },
    "/api/documents/getDocumentTypesForPerson": {
      get: {
        tags: ["Documents"],
        summary: "Get document types for person",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "PersonId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Types for person" } },
      },
    },
    "/api/documents/delete": {
      delete: {
        tags: ["Documents"],
        summary: "Delete document",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Document deleted" } },
      },
    },

    // ─── Notes ────────────────────────────────────────────────────────
    "/api/notes": {
      get: {
        tags: ["Notes"],
        summary: "Get notes/tags/documents for person",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "PersonId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Notes" } },
      },
    },
    "/api/notes/add": {
      post: {
        tags: ["Notes"],
        summary: "Add note with tags",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "Note added" } },
      },
    },
    "/api/notes/update": {
      post: {
        tags: ["Notes"],
        summary: "Update note",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Note updated" } },
      },
    },
    "/api/notes/delete": {
      delete: {
        tags: ["Notes"],
        summary: "Delete note",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Note deleted" } },
      },
    },
    "/api/notes/insertDocumentForNote": {
      post: {
        tags: ["Notes"],
        summary: "Add document to note",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["NoteId"] } } } },
        responses: { 200: { description: "Document added to note" } },
      },
    },
    "/api/notes/deleteDocumentFromNote": {
      delete: {
        tags: ["Notes"],
        summary: "Remove document from note",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["NoteId", "DocumentId"] } } } },
        responses: { 200: { description: "Document removed" } },
      },
    },
    "/api/notes/getNoteDocuments": {
      get: {
        tags: ["Notes"],
        summary: "Get note documents",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "NoteId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Note documents" } },
      },
    },
    "/api/notes/getNoteTags": {
      get: {
        tags: ["Notes"],
        summary: "Get note tags",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "NoteId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Note tags" } },
      },
    },
    "/api/notes/getNoteDetails": {
      get: {
        tags: ["Notes"],
        summary: "Get full note with tags and documents",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "NoteId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Note details" } },
      },
    },
    "/api/notes/addTagToNote": {
      post: {
        tags: ["Notes"],
        summary: "Add tag to note",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["NoteId", "TagId"] } } } },
        responses: { 200: { description: "Tag added" } },
      },
    },
    "/api/notes/removeTagFromNote": {
      post: {
        tags: ["Notes"],
        summary: "Remove tag from note",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["NoteId", "TagId"] } } } },
        responses: { 200: { description: "Tag removed" } },
      },
    },
    "/api/notes/markNoteAsFavorite": {
      post: {
        tags: ["Notes"],
        summary: "Mark note as favorite",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["NoteId"] } } } },
        responses: { 200: { description: "Marked as favorite" } },
      },
    },
    "/api/notes/removeNoteFromFavorites": {
      post: {
        tags: ["Notes"],
        summary: "Remove note from favorites",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["NoteId"] } } } },
        responses: { 200: { description: "Removed from favorites" } },
      },
    },

    // ─── Tags ─────────────────────────────────────────────────────────
    "/api/tags": {
      get: {
        tags: ["Tags"],
        summary: "List note tags",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Tags list" } },
      },
    },
    "/api/tags/add": {
      post: {
        tags: ["Tags"],
        summary: "Add tag",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "Tag added" } },
      },
    },
    "/api/tags/update": {
      post: {
        tags: ["Tags"],
        summary: "Update tag",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Tag updated" } },
      },
    },
    "/api/tags/delete": {
      delete: {
        tags: ["Tags"],
        summary: "Deactivate tag",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Tag deactivated" } },
      },
    },

    // ─── Events ───────────────────────────────────────────────────────
    "/api/events": {
      get: {
        tags: ["Events"],
        summary: "Get calendar events for month/year/user",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "Month", in: "query", required: true, schema: { type: "integer" } },
          { name: "Year", in: "query", required: true, schema: { type: "integer" } },
        ],
        responses: { 200: { description: "Events list" } },
      },
    },
    "/api/events/add": {
      post: {
        tags: ["Events"],
        summary: "Add event",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "Event added" } },
      },
    },
    "/api/events/update": {
      post: {
        tags: ["Events"],
        summary: "Update event",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Event updated" } },
      },
    },
    "/api/events/delete": {
      delete: {
        tags: ["Events"],
        summary: "Delete event",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Event deleted" } },
      },
    },
    "/api/events/getUserDashboardEvents": {
      get: {
        tags: ["Events"],
        summary: "Get user's dashboard events",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Dashboard events" } },
      },
    },

    // ─── Calculation ──────────────────────────────────────────────────
    "/api/calculation/calculations": {
      get: {
        tags: ["Calculation"],
        summary: "Get calculations for month/year",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "Month", in: "query", required: true, schema: { type: "integer" } },
          { name: "Year", in: "query", required: true, schema: { type: "integer" } },
        ],
        responses: { 200: { description: "Calculations list" } },
      },
    },
    "/api/calculation/calculationDetails": {
      get: {
        tags: ["Calculation"],
        summary: "Get full calculation details",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "Id", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Calculation details" } },
      },
    },
    "/api/calculation/calculationDocuments": {
      get: {
        tags: ["Calculation"],
        summary: "Get calculation documents",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "CalculationId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Calculation documents" } },
      },
    },
    "/api/calculation/getCalculationsForPerson": {
      get: {
        tags: ["Calculation"],
        summary: "Get person's calculations",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "PersonId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Person calculations" } },
      },
    },
    "/api/calculation/getCalculationsSummaryForPerson": {
      get: {
        tags: ["Calculation"],
        summary: "Get calculation summary for person",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "PersonId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Summary" } },
      },
    },
    "/api/calculation/getCalculationStatuses": {
      get: {
        tags: ["Calculation"],
        summary: "List calculation statuses",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Statuses" } },
      },
    },
    "/api/calculation/calculationSummary": {
      get: {
        tags: ["Calculation"],
        summary: "Get monthly calculation summary",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "Month", in: "query", required: true, schema: { type: "integer" } },
          { name: "Year", in: "query", required: true, schema: { type: "integer" } },
        ],
        responses: { 200: { description: "Monthly summary" } },
      },
    },
    "/api/calculation/add": {
      post: {
        tags: ["Calculation"],
        summary: "Create calculation",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "Calculation created" } },
      },
    },
    "/api/calculation/calculationPaid": {
      post: {
        tags: ["Calculation"],
        summary: "Mark calculation as paid",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Marked as paid" } },
      },
    },
    "/api/calculation/calculationRealPriceSave": {
      post: {
        tags: ["Calculation"],
        summary: "Save real price for calculation",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Real price saved" } },
      },
    },
    "/api/calculation/cancelCalculation": {
      post: {
        tags: ["Calculation"],
        summary: "Cancel calculation",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Calculation cancelled" } },
      },
    },
    "/api/calculation/insertDocumentForCalculation": {
      post: {
        tags: ["Calculation"],
        summary: "Add document to calculation",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["CalculationId"] } } } },
        responses: { 200: { description: "Document added" } },
      },
    },
    "/api/calculation/deleteDocumentFromCalculation": {
      delete: {
        tags: ["Calculation"],
        summary: "Remove document from calculation",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["CalculationId", "DocumentId"] } } } },
        responses: { 200: { description: "Document removed" } },
      },
    },
    "/api/calculation/checkCalculationExists": {
      post: {
        tags: ["Calculation"],
        summary: "Check if calculation exists",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "Existence check result" } },
      },
    },

    // ─── Summary ──────────────────────────────────────────────────────
    "/api/summary/getDashboardSummary": {
      get: {
        tags: ["Summary"],
        summary: "Get system-wide dashboard data",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Dashboard summary" } },
      },
    },
    "/api/summary/getUserDashboardSummary": {
      get: {
        tags: ["Summary"],
        summary: "Get user-specific dashboard summary",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "User dashboard summary" } },
      },
    },

    // ─── Accommodation ────────────────────────────────────────────────
    "/api/accommodation-pdf-request/generateRequest": {
      post: {
        tags: ["Accommodation"],
        summary: "Generate accommodation request PDF",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "PDF generated" } },
      },
    },

    // ─── Genders ──────────────────────────────────────────────────────
    "/api/genders": {
      get: {
        tags: ["Genders"],
        summary: "List genders",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Genders list" } },
      },
    },

    // ─── Countries ────────────────────────────────────────────────────
    "/api/countries": {
      get: {
        tags: ["Countries"],
        summary: "List countries",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Countries list" } },
      },
    },

    // ─── Municipalities ───────────────────────────────────────────────
    "/api/municipalities": {
      get: {
        tags: ["Municipalities"],
        summary: "List municipalities",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Municipalities list" } },
      },
    },
    "/api/municipalities/add": {
      post: {
        tags: ["Municipalities"],
        summary: "Add municipality",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "Municipality added" } },
      },
    },
    "/api/municipalities/update": {
      post: {
        tags: ["Municipalities"],
        summary: "Update municipality",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Municipality updated" } },
      },
    },
    "/api/municipalities/delete": {
      delete: {
        tags: ["Municipalities"],
        summary: "Delete municipality",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Municipality deleted" } },
      },
    },

    // ─── Cities ───────────────────────────────────────────────────────
    "/api/cities": {
      get: {
        tags: ["Cities"],
        summary: "List cities",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Cities list" } },
      },
    },
    "/api/cities/add": {
      post: {
        tags: ["Cities"],
        summary: "Add city",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "City added" } },
      },
    },
    "/api/cities/update": {
      post: {
        tags: ["Cities"],
        summary: "Update city",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "City updated" } },
      },
    },
    "/api/cities/delete": {
      delete: {
        tags: ["Cities"],
        summary: "Delete city",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "City deleted" } },
      },
    },

    // ─── Health Conditions ────────────────────────────────────────────
    "/api/health-conditions": {
      get: {
        tags: ["Health Conditions"],
        summary: "List all health conditions",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Conditions list" } },
      },
    },
    "/api/health-conditions/insertForPerson": {
      post: {
        tags: ["Health Conditions"],
        summary: "Add health condition to person",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["PersonId"] } } } },
        responses: { 200: { description: "Condition added" } },
      },
    },
    "/api/health-conditions/getForPerson": {
      get: {
        tags: ["Health Conditions"],
        summary: "Get person's health conditions",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "PersonId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Person conditions" } },
      },
    },
    "/api/health-conditions/delete": {
      delete: {
        tags: ["Health Conditions"],
        summary: "Delete health condition",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Condition deleted" } },
      },
    },

    // ─── Person Categories ────────────────────────────────────────────
    "/api/person-categories": {
      get: {
        tags: ["Person Categories"],
        summary: "List person categories",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Categories list" } },
      },
    },
    "/api/person-categories/insertForPerson": {
      post: {
        tags: ["Person Categories"],
        summary: "Add category to person",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["PersonId"] } } } },
        responses: { 200: { description: "Category added" } },
      },
    },
    "/api/person-categories/getForPerson": {
      get: {
        tags: ["Person Categories"],
        summary: "Get person's category",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "PersonId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Person category" } },
      },
    },
    "/api/person-categories/generateTemplate": {
      get: {
        tags: ["Person Categories"],
        summary: "Generate category list PDF",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "PDF template" } },
      },
    },

    // ─── Accommodation Types ──────────────────────────────────────────
    "/api/accommodation-types": {
      get: {
        tags: ["Accommodation Types"],
        summary: "List accommodation types",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Types list" } },
      },
    },
    "/api/accommodation-types/insertForPerson": {
      post: {
        tags: ["Accommodation Types"],
        summary: "Add accommodation type to person",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["PersonId"] } } } },
        responses: { 200: { description: "Type added" } },
      },
    },
    "/api/accommodation-types/getForPerson": {
      get: {
        tags: ["Accommodation Types"],
        summary: "Get person's accommodation type",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "PersonId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Person accommodation type" } },
      },
    },

    // ─── Qualifications ───────────────────────────────────────────────
    "/api/qualifications": {
      get: {
        tags: ["Qualifications"],
        summary: "List qualifications",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Qualifications list" } },
      },
    },
    "/api/qualifications/add": {
      post: {
        tags: ["Qualifications"],
        summary: "Add qualification",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "Qualification added" } },
      },
    },
    "/api/qualifications/update": {
      post: {
        tags: ["Qualifications"],
        summary: "Update qualification",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Qualification updated" } },
      },
    },
    "/api/qualifications/delete": {
      delete: {
        tags: ["Qualifications"],
        summary: "Delete qualification",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Qualification deleted" } },
      },
    },

    // ─── Job Positions ────────────────────────────────────────────────
    "/api/job-positions": {
      get: {
        tags: ["Job Positions"],
        summary: "List job positions",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Positions list" } },
      },
    },
    "/api/job-positions/add": {
      post: {
        tags: ["Job Positions"],
        summary: "Add job position",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "Position added" } },
      },
    },
    "/api/job-positions/update": {
      post: {
        tags: ["Job Positions"],
        summary: "Update job position",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Position updated" } },
      },
    },
    "/api/job-positions/delete": {
      delete: {
        tags: ["Job Positions"],
        summary: "Delete job position",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Position deleted" } },
      },
    },

    // ─── Employment Types ─────────────────────────────────────────────
    "/api/employment-types": {
      get: {
        tags: ["Employment Types"],
        summary: "List employment types",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Types list" } },
      },
    },
    "/api/employment-types/add": {
      post: {
        tags: ["Employment Types"],
        summary: "Add employment type",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "Type added" } },
      },
    },
    "/api/employment-types/update": {
      post: {
        tags: ["Employment Types"],
        summary: "Update employment type",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Type updated" } },
      },
    },
    "/api/employment-types/delete": {
      delete: {
        tags: ["Employment Types"],
        summary: "Delete employment type",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Type deleted" } },
      },
    },

    // ─── Employees ────────────────────────────────────────────────────
    "/api/employees": {
      get: {
        tags: ["Employees"],
        summary: "List employees",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "Active", in: "query", schema: { type: "boolean" } }],
        responses: { 200: { description: "Employees list" } },
      },
    },
    "/api/employees/add": {
      post: {
        tags: ["Employees"],
        summary: "Add employee",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "Employee added" } },
      },
    },
    "/api/employees/update": {
      post: {
        tags: ["Employees"],
        summary: "Update employee",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Employee updated" } },
      },
    },
    "/api/employees/changeStatusEmployee": {
      post: {
        tags: ["Employees"],
        summary: "Activate / deactivate employee",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object", required: ["Id", "Active"], properties: { Id: { type: "integer" }, Active: { type: "boolean" } } },
            },
          },
        },
        responses: { 200: { description: "Status changed" } },
      },
    },
    "/api/employees/EmployeeDetails": {
      get: {
        tags: ["Employees"],
        summary: "Get employee details",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "Id", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Employee details" } },
      },
    },
    "/api/employees/employeesBasic": {
      get: {
        tags: ["Employees"],
        summary: "Get basic employee list",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Basic employees" } },
      },
    },
    "/api/employees/getUserEmployeeId": {
      get: {
        tags: ["Employees"],
        summary: "Get employee ID for current user",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Employee ID" } },
      },
    },

    // ─── Vacations ────────────────────────────────────────────────────
    "/api/vacations": {
      get: {
        tags: ["Vacations"],
        summary: "Get vacation statuses",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Vacation statuses" } },
      },
    },
    "/api/vacations/vacatonsForEmployee": {
      get: {
        tags: ["Vacations"],
        summary: "Get vacations for employee",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "EmployeeId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Employee vacations" } },
      },
    },
    "/api/vacations/add": {
      post: {
        tags: ["Vacations"],
        summary: "Add vacation",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "Vacation added" } },
      },
    },
    "/api/vacations/changeVacationStatus": {
      post: {
        tags: ["Vacations"],
        summary: "Update vacation status",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id", "StatusId"] } } } },
        responses: { 200: { description: "Status updated" } },
      },
    },
    "/api/vacations/getRemainingVacationDays": {
      get: {
        tags: ["Vacations"],
        summary: "Get remaining vacation days for employee",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "EmployeeId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Remaining days" } },
      },
    },

    // ─── Doctor Visits ────────────────────────────────────────────────
    "/api/doctor-visits": {
      get: {
        tags: ["Doctor Visits"],
        summary: "List completed doctor visits",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Doctor visits" } },
      },
    },
    "/api/doctor-visits/getDoctorsAndNurses": {
      get: {
        tags: ["Doctor Visits"],
        summary: "Get doctors and nurses for visit",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Doctors and nurses" } },
      },
    },
    "/api/doctor-visits/getPersons": {
      get: {
        tags: ["Doctor Visits"],
        summary: "Get persons for visit",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Persons for visit" } },
      },
    },
    "/api/doctor-visits/getSummary": {
      get: {
        tags: ["Doctor Visits"],
        summary: "Get visit summary",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "VisitId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Visit summary" } },
      },
    },
    "/api/doctor-visits/getNotesForDoctorVisitTour": {
      get: {
        tags: ["Doctor Visits"],
        summary: "Get notes for doctor visit tour",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "VisitId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Visit notes" } },
      },
    },
    "/api/doctor-visits/add": {
      post: {
        tags: ["Doctor Visits"],
        summary: "Create doctor visit tour",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "Visit created" } },
      },
    },
    "/api/doctor-visits/delete": {
      delete: {
        tags: ["Doctor Visits"],
        summary: "Delete doctor visit",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Visit deleted" } },
      },
    },
    "/api/doctor-visits/completeDoctorVisit": {
      post: {
        tags: ["Doctor Visits"],
        summary: "Mark doctor visit as completed",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Visit completed" } },
      },
    },
    "/api/doctor-visits/getVisitTourDetails": {
      get: {
        tags: ["Doctor Visits"],
        summary: "Get visit tour details",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "VisitId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Visit details" } },
      },
    },
    "/api/doctor-visits/insertDoctorVisitForPerson": {
      post: {
        tags: ["Doctor Visits"],
        summary: "Add person to doctor visit",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["VisitId", "PersonId"] } } } },
        responses: { 200: { description: "Person added to visit" } },
      },
    },

    // ─── Furniture ────────────────────────────────────────────────────
    "/api/furniture": {
      get: {
        tags: ["Furniture"],
        summary: "List furniture",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Furniture list" } },
      },
    },
    "/api/furniture/add": {
      post: {
        tags: ["Furniture"],
        summary: "Add furniture",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "Furniture added" } },
      },
    },
    "/api/furniture/update": {
      post: {
        tags: ["Furniture"],
        summary: "Update furniture",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Furniture updated" } },
      },
    },
    "/api/furniture/delete": {
      delete: {
        tags: ["Furniture"],
        summary: "Delete furniture",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Furniture deleted" } },
      },
    },
    "/api/furniture/getFurnitureCountByStatus": {
      get: {
        tags: ["Furniture"],
        summary: "Get furniture count by status",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Count by status" } },
      },
    },
    "/api/furniture/changeFurnitureStatus": {
      post: {
        tags: ["Furniture"],
        summary: "Change furniture status",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id", "StatusId"] } } } },
        responses: { 200: { description: "Status changed" } },
      },
    },
    "/api/furniture/getFurnitureStatuses": {
      get: {
        tags: ["Furniture"],
        summary: "Get status history for furniture",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "FurnitureId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Status history" } },
      },
    },
    "/api/furniture/deleteFurnitureStatus": {
      delete: {
        tags: ["Furniture"],
        summary: "Delete furniture status entry",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Status entry deleted" } },
      },
    },
    "/api/furniture/removeFurnitureFromRoom": {
      post: {
        tags: ["Furniture"],
        summary: "Remove furniture from room",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Furniture removed from room" } },
      },
    },

    // ─── Furniture Statuses ───────────────────────────────────────────
    "/api/furniture-statuses": {
      get: {
        tags: ["Furniture Statuses"],
        summary: "List furniture statuses",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Statuses list" } },
      },
    },
    "/api/furniture-statuses/add": {
      post: {
        tags: ["Furniture Statuses"],
        summary: "Add furniture status",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "Status added" } },
      },
    },
    "/api/furniture-statuses/update": {
      post: {
        tags: ["Furniture Statuses"],
        summary: "Update furniture status",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Status updated" } },
      },
    },
    "/api/furniture-statuses/delete": {
      delete: {
        tags: ["Furniture Statuses"],
        summary: "Deactivate furniture status",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Status deactivated" } },
      },
    },

    // ─── Measure Units ────────────────────────────────────────────────
    "/api/measure-units": {
      get: {
        tags: ["Measure Units"],
        summary: "List all measure units",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Measure units" } },
      },
    },
    "/api/measure-units/getCalculationMeasureUnits": {
      get: {
        tags: ["Measure Units"],
        summary: "Get calculation measure units",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Calculation units" } },
      },
    },

    // ─── Price Units ──────────────────────────────────────────────────
    "/api/price-units": {
      get: {
        tags: ["Price Units"],
        summary: "List all price units",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Price units" } },
      },
    },

    // ─── Person Allergens ─────────────────────────────────────────────
    "/api/person-allergens": {
      get: {
        tags: ["Person Allergens"],
        summary: "Get allergens for person",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "PersonId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Allergens" } },
      },
    },
    "/api/person-allergens/severities/all": {
      get: {
        tags: ["Person Allergens"],
        summary: "Get all allergen severities",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Severities" } },
      },
    },
    "/api/person-allergens/add": {
      post: {
        tags: ["Person Allergens"],
        summary: "Add allergen to person",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["PersonId"] } } } },
        responses: { 200: { description: "Allergen added" } },
      },
    },
    "/api/person-allergens/update": {
      post: {
        tags: ["Person Allergens"],
        summary: "Update allergen",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Allergen updated" } },
      },
    },
    "/api/person-allergens/delete": {
      delete: {
        tags: ["Person Allergens"],
        summary: "Delete allergen",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Allergen deleted" } },
      },
    },

    // ─── Person Medications ───────────────────────────────────────────
    "/api/person-medications": {
      get: {
        tags: ["Person Medications"],
        summary: "Get medications for person",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "PersonId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Medications" } },
      },
    },
    "/api/person-medications/add": {
      post: {
        tags: ["Person Medications"],
        summary: "Add medication to person",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["PersonId"] } } } },
        responses: { 200: { description: "Medication added" } },
      },
    },
    "/api/person-medications/update": {
      post: {
        tags: ["Person Medications"],
        summary: "Update medication",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Medication updated" } },
      },
    },
    "/api/person-medications/delete": {
      delete: {
        tags: ["Person Medications"],
        summary: "Delete medication",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Medication deleted" } },
      },
    },

    // ─── Person Functional Status ─────────────────────────────────────
    "/api/person-functional-status": {
      get: {
        tags: ["Person Functional Status"],
        summary: "Get functional status for person",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "PersonId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Functional status" } },
      },
    },
    "/api/person-functional-status/add": {
      post: {
        tags: ["Person Functional Status"],
        summary: "Add functional status",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["PersonId"] } } } },
        responses: { 200: { description: "Status added" } },
      },
    },
    "/api/person-functional-status/update": {
      post: {
        tags: ["Person Functional Status"],
        summary: "Update functional status",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Status updated" } },
      },
    },
    "/api/person-functional-status/delete": {
      delete: {
        tags: ["Person Functional Status"],
        summary: "Delete functional status",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Status deleted" } },
      },
    },

    // ─── Person Dietary Restrictions ──────────────────────────────────
    "/api/person-dietary-restrictions": {
      get: {
        tags: ["Person Dietary Restrictions"],
        summary: "Get dietary restrictions for person",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "PersonId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Dietary restrictions" } },
      },
    },
    "/api/person-dietary-restrictions/types": {
      get: {
        tags: ["Person Dietary Restrictions"],
        summary: "Get dietary restriction types",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Dietary types" } },
      },
    },
    "/api/person-dietary-restrictions/add": {
      post: {
        tags: ["Person Dietary Restrictions"],
        summary: "Add dietary restriction",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["PersonId"] } } } },
        responses: { 200: { description: "Restriction added" } },
      },
    },
    "/api/person-dietary-restrictions/update": {
      post: {
        tags: ["Person Dietary Restrictions"],
        summary: "Update dietary restriction",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Restriction updated" } },
      },
    },
    "/api/person-dietary-restrictions/delete": {
      delete: {
        tags: ["Person Dietary Restrictions"],
        summary: "Delete dietary restriction",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Restriction deleted" } },
      },
    },

    // ─── Person Insurance ─────────────────────────────────────────────
    "/api/person-insurance": {
      get: {
        tags: ["Person Insurance"],
        summary: "Get insurance for person",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "PersonId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Insurance data" } },
      },
    },
    "/api/person-insurance/add": {
      post: {
        tags: ["Person Insurance"],
        summary: "Add insurance",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["PersonId"] } } } },
        responses: { 200: { description: "Insurance added" } },
      },
    },
    "/api/person-insurance/update": {
      post: {
        tags: ["Person Insurance"],
        summary: "Update insurance",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Insurance updated" } },
      },
    },
    "/api/person-insurance/delete": {
      delete: {
        tags: ["Person Insurance"],
        summary: "Delete insurance",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "Insurance deleted" } },
      },
    },

    // ─── Users ────────────────────────────────────────────────────────
    "/api/users": {
      get: {
        tags: ["Users"],
        summary: "List all users",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Users list" } },
      },
    },
    "/api/users/add": {
      post: {
        tags: ["Users"],
        summary: "Add user",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object" } } } },
        responses: { 200: { description: "User added" } },
      },
    },
    "/api/users/update": {
      post: {
        tags: ["Users"],
        summary: "Update user",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "User updated" } },
      },
    },
    "/api/users/changeUserRole": {
      post: {
        tags: ["Users"],
        summary: "Change user role",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["UserId", "RoleId"] } } } },
        responses: { 200: { description: "Role changed" } },
      },
    },
    "/api/users/getUserData": {
      get: {
        tags: ["Users"],
        summary: "Get user with roles",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "Id", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "User data" } },
      },
    },
    "/api/users/roles": {
      get: {
        tags: ["Users"],
        summary: "Get current user roles and permissions",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Roles and permissions" } },
      },
    },
    "/api/users/getRoles": {
      get: {
        tags: ["Users"],
        summary: "List all available roles",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Available roles" } },
      },
    },
    "/api/users/checkVerificationTokenForUser": {
      get: {
        tags: ["Users"],
        summary: "Check verification token validity",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "Token", in: "query", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Token valid" }, 400: { description: "Token invalid" } },
      },
    },
    "/api/users/sendVerificationEmail": {
      post: {
        tags: ["Users"],
        summary: "Send verification email",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["UserId"] } } } },
        responses: { 200: { description: "Email sent" } },
      },
    },
    "/api/users/blockUnblockUser": {
      post: {
        tags: ["Users"],
        summary: "Block or unblock user",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object", required: ["Id", "Blocked"], properties: { Id: { type: "integer" }, Blocked: { type: "boolean" } } },
            },
          },
        },
        responses: { 200: { description: "User blocked/unblocked" } },
      },
    },
    "/api/users/activateDeactivateUser": {
      post: {
        tags: ["Users"],
        summary: "Activate or deactivate user",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object", required: ["Id", "Active"], properties: { Id: { type: "integer" }, Active: { type: "boolean" } } },
            },
          },
        },
        responses: { 200: { description: "User activated/deactivated" } },
      },
    },
    "/api/users/delete": {
      delete: {
        tags: ["Users"],
        summary: "Delete user",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/IdBody" } } } },
        responses: { 200: { description: "User deleted" } },
      },
    },

    // ─── Notifications ────────────────────────────────────────────────
    "/api/notifications/getAllNotifications": {
      get: {
        tags: ["Notifications"],
        summary: "Get all notifications",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "All notifications" } },
      },
    },
    "/api/notifications/checkNotificationsStatus": {
      get: {
        tags: ["Notifications"],
        summary: "Check notifications status",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Notifications status" } },
      },
    },
    "/api/notifications/getLatestNotifications": {
      get: {
        tags: ["Notifications"],
        summary: "Get latest notifications",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Latest notifications" } },
      },
    },
    "/api/notifications/notificationTypes": {
      get: {
        tags: ["Notifications"],
        summary: "Get notification types",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Types" } },
      },
    },
    "/api/notifications/getNotificationsForType": {
      get: {
        tags: ["Notifications"],
        summary: "Get notifications for type",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "TypeId", in: "query", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Notifications" } },
      },
    },
    "/api/notifications/getNotificationsSettings": {
      get: {
        tags: ["Notifications"],
        summary: "Get notification settings",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Settings" } },
      },
    },
    "/api/notifications/markNotificationAsRead": {
      post: {
        tags: ["Notifications"],
        summary: "Mark notification as read",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Id"] } } } },
        responses: { 200: { description: "Marked as read" } },
      },
    },
    "/api/notifications/markAllNotificationsAsRead": {
      post: {
        tags: ["Notifications"],
        summary: "Mark all notifications as read",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "All marked as read" } },
      },
    },
    "/api/notifications/updateNotificationType": {
      post: {
        tags: ["Notifications"],
        summary: "Update notification type settings",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["TypeId"] } } } },
        responses: { 200: { description: "Settings updated" } },
      },
    },

    // ─── General Settings ─────────────────────────────────────────────
    "/api/general-settings/updateGeneralSetting": {
      post: {
        tags: ["General Settings"],
        summary: "Update a general setting",
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["Key", "Value"] } } } },
        responses: { 200: { description: "Setting updated" } },
      },
    },
    "/api/general-settings/getGeneralSetting": {
      get: {
        tags: ["General Settings"],
        summary: "Get a general setting",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "Key", in: "query", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Setting value" } },
      },
    },

    // ─── My Profile ───────────────────────────────────────────────────
    "/api/my-profile/getBasicData": {
      get: {
        tags: ["My Profile"],
        summary: "Get basic profile data",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Profile data" } },
      },
    },
    "/api/my-profile/getContactInfoForUser": {
      get: {
        tags: ["My Profile"],
        summary: "Get contact info for current user",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Contact info" } },
      },
    },
  },
};

module.exports = swaggerDocument;
