# CardVault API Documentation

This document provides detailed information about the CardVault Backend APIs for mobile/web app integration.

## Base URL
`http://localhost:3000` (Update this based on your deployment environment)

## Authentication
All protected routes require a Bearer token in the `Authorization` header.
**Header Format:** `Authorization: Bearer <accessToken>`

---

## 1. Auth APIs
Base Prefix: `/api/auth`

### Register User
Create a new user account.

- **Method:** `POST`
- **URL:** `/api/auth/register`
- **Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "accessToken": "ey...",
  "refreshToken": "ey...",
  "user": {
    "id": "60d...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Login User
Authenticate an existing user.

- **Method:** `POST`
- **URL:** `/api/auth/login`
- **Body (JSON):**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response (200 OK):**
```json
{
  "message": "Login successfully",
  "accessToken": "ey...",
  "refreshToken": "ey...",
  "user": {
    "id": "60d...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Get Current User Profile
Retrieve the authenticated user's information.

- **Method:** `GET`
- **URL:** `/api/auth/me`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Response (200 OK):**
```json
{
  "_id": "60d...",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2023-10-01T10:00:00Z"
}
```

---

## 2. Folder APIs
Base Prefix: `/api/folders`
*Requires Authentication*

### Create Folder
- **Method:** `POST`
- **URL:** `/api/folders`
- **Body (JSON):**
```json
{
  "name": "Tech Networking",
  "description": "Contacts from tech conferences"
}
```
- **Response (201 Created):**
```json
{
  "_id": "60e...",
  "userId": "60d...",
  "name": "Tech Networking",
  "description": "Contacts from tech conferences",
  "createdAt": "2023-10-02T10:00:00Z"
}
```

### List Folders
Retrieve all folders created by the user.

- **Method:** `GET`
- **URL:** `/api/folders`
- **Response (200 OK):**
```json
[
  {
    "_id": "60e...",
    "name": "Tech Networking",
    "description": "Contacts from tech conferences",
    "createdAt": "2023-10-02T10:00:00Z"
  }
]
```

### Update Folder
- **Method:** `PATCH`
- **URL:** `/api/folders/:id`
- **Body (JSON):**
```json
{
  "name": "Updated Name",
  "description": "Updated Description"
}
```
- **Response (200 OK):** Updated folder object.

### Delete Folder
**Warning:** Deleting a folder also deletes all contacts within it.

- **Method:** `DELETE`
- **URL:** `/api/folders/:id`
- **Response (200 OK):**
```json
{
  "message": "Folder deleted"
}
```

---

## 3. Contact APIs
Base Prefix: `/api/contacts`
*Requires Authentication*

### Create Contact
- **Method:** `POST`
- **URL:** `/api/contacts`
- **Body (Multipart Form-Data):**
  - `folderId`: ID of the folder (Required)
  - `name`: Contact name
  - `company`: Company name
  - `jobTitle`: Job title
  - `email`: Email address
  - `phone`: Phone number
  - `website`: Website URL
  - `address`: Physical address
  - `linkedin`: LinkedIn profile URL
  - `socialHandles[twitter]`: Twitter handle
  - `socialHandles[instagram]`: Instagram handle
  - `frontImage`: File (Business card front)
  - `backImage`: File (Business card back)
- **Response (201 Created):**
```json
{
  "message": "Contact created",
  "contact": {
    "_id": "60f...",
    "folderId": "60e...",
    "name": "Jane Smith",
    "frontImageUrl": "http://localhost:3000/uploads/cards/card-123.jpg",
    "backImageUrl": "http://localhost:3000/uploads/cards/card-456.jpg",
    ...
  }
}
```

### List Contacts
- **Method:** `GET`
- **URL:** `/api/contacts`
- **Query Params:**
  - `folderId`: (Optional) Filter by folder
  - `page`: (Optional) Default 1
  - `limit`: (Optional) Default 10
  - `search`: (Optional) Search by name or company
- **Response (200 OK):**
```json
{
  "contacts": [...],
  "total": 5,
  "page": 1,
  "totalPages": 1
}
```

### Update Contact
- **Method:** `PATCH`
- **URL:** `/api/contacts/:id`
- **Body (JSON):** Fields to update.
- **Response (200 OK):** Updated contact object.

### Delete Contact
- **Method:** `DELETE`
- **URL:** `/api/contacts/:id`
- **Response (200 OK):**
```json
{
  "message": "Contact deleted"
}
```

---

## 4. Export APIs
Base Prefix: `/api/export`
*Requires Authentication*

### Export Folder to Excel
Generates an Excel file containing all contacts in a folder.

- **Method:** `GET`
- **URL:** `/api/export/folder/:folderId`
- **Response (200 OK):**
```json
{
  "message": "Export successful",
  "downloadUrl": "http://localhost:3000/exports/folder-name-123.xlsx"
}
```

---

## 5. Media Access
Images and exported files are served statically.

- **Cards:** `http://localhost:3000/uploads/cards/<filename>`
- **Exports:** `http://localhost:3000/exports/<filename>`

---

## 6. Error Responses
Standard error format for non-2xx responses:

```json
{
  "status": 400,
  "message": "Detailed error message"
}
```
- `401 Unauthorized`: Token missing or invalid.
- `403 Forbidden`: User does not own the resource.
- `404 Not Found`: Resource ID does not exist.
- `500 Internal Server Error`: Server-side issue.
