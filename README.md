# Test Run Management System

A full-stack web application to manage test runs, built as part of a technical assignment.

## 📌 Objective

The application allows users to:

- View all test runs
- Add a new test run
- Update the status of an existing test run
- Delete a test run
- Filter test runs by status
- View details of a selected test run

---

# 🛠️ Technology Stack

## Backend

- ASP.NET Core Web API (.NET 9)
- Entity Framework Core
- PostgreSQL
- AutoMapper
- Repository Pattern
- Service Layer
- xUnit
- Moq
- FluentAssertions

## Frontend

- React.js
- Vite
- Axios
- Bootstrap 5

## Database

- PostgreSQL

---

# 📂 Project Structure

```
TestRunManagement

│
├── TestRunManagement          # ASP.NET Core Web API
│
├── TestRunManagement.Tests    # xUnit Test Project
│
└── testrunClient              # React Application
```

---

# 📋 Features

- Display all test runs
- Add a new test run
- Edit test run status
- Delete a test run
- Filter by status
- View test run details
- Backend validation
- Unit testing
- Responsive UI

---

# 📦 API Endpoints

| Method | Endpoint | Description |
|----------|--------------------------|-------------------------|
| GET | /api/TestRuns | Get all test runs |
| GET | /api/TestRuns/{id} | Get test run by ID |
| POST | /api/TestRuns | Create a new test run |
| PUT | /api/TestRuns/{id} | Update test run status |
| DELETE | /api/TestRuns/{id} | Delete a test run |

---

# 🗄️ Test Run Fields

| Field | Type |
|---------|------|
| TestRunId | Integer |
| TestName | String |
| ChannelNumber | Integer |
| OperatorName | String |
| StartDateTime | DateTime |
| Status | String |
| Remarks | String |

---

# 🚀 Setup Instructions

## Prerequisites

Install the following software:

- Visual Studio 2022/2026
- .NET 9 SDK
- Node.js (Latest LTS)
- PostgreSQL
- Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/yourusername/TestRunManagement.git
```

Navigate to the project folder.

---

# Backend Setup

## 1. Open the Solution

Open

```
TestRunManagement.sln
```

using Visual Studio.

---

## 2. Configure Database

Open

```
appsettings.json
```

Update the PostgreSQL connection string.

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=TestRunDB;Username=postgres;Password=yourpassword"
}
```

---

## 3. Create Database

Create a PostgreSQL database named:

```
TestRunDB
```

---

## 4. Generate Database Objects

Since this project uses **Database First (Scaffold-DbContext)**, ensure the required table exists in PostgreSQL.

If required, execute the provided SQL script.

---

## 5. Run Backend

Press

```
F5
```

or

```
Ctrl + F5
```

The API will start.

Example:

```
https://localhost:7030
```

Swagger/OpenAPI will be available.

---

# Frontend Setup

Open terminal inside

```
testrunClient
```

Install dependencies.

```bash
npm install
```

---

Update the API URL inside

```
src/services/testRunApi.js
```

Example

```javascript
const api = axios.create({
    baseURL: "https://localhost:7030/api"
});
```

Replace the port with your backend port if different.

---

Run React application.

```bash
npm run dev
```

Example

```
http://localhost:5173
```

---

# Running the Application

### Step 1

Start PostgreSQL.

---

### Step 2

Run ASP.NET Core API.

---

### Step 3

Run React Application.

---

### Step 4

Open

```
http://localhost:5173
```

The application should now be running successfully.

---

# Unit Tests

Run the tests using Visual Studio Test Explorer

or

```bash
dotnet test
```

Implemented Tests

- Get all test runs
- Get test run by Id
- Create test run
- Update test run
- Delete test run

---

# Manual Test Cases

| Test Case | Expected Result |
|------------|----------------|
| Add new test run | Record should be created successfully |
| Edit status | Status should update correctly |
| Delete test run | Record should be removed |
| Filter by status | Only matching records should be displayed |
| View details | Correct test run details should be displayed |

---

# Assumptions

- PostgreSQL is installed locally.
- Backend and frontend run on localhost.
- Backend API is available before starting the React application.
- Status values are:
  - Pending
  - Running
  - Completed
  - Failed

---

# Future Improvements

- Authentication & Authorization
- Pagination
- Search functionality
- Export to Excel/PDF
- Docker support
- CI/CD pipeline
- Logging
- Global Exception Handling

---

# Author

**Onkar Nagargoje**

Full Stack .NET Developer
