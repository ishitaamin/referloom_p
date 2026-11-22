# Referloom

**Referloom** is a role-based career networking and recruitment platform that connects students, alumni, and companies. It brings student profiles and projects, AI-assisted career guidance, job discovery and applications, alumni referrals, mentorship requests, and project-team collaboration into one mobile application.

The repository contains an **Expo / React Native frontend** and an **Express / Node.js backend** backed by MongoDB.

---

## Table of Contents

- [Project Overview](#project-overview)
- [User Roles](#user-roles)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Repository Structure](#repository-structure)
- [Architecture and Data Models](#architecture-and-data-models)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [API Overview](#api-overview)
- [AI Features](#ai-features)
- [Authentication and Security](#authentication-and-security)
- [File Uploads](#file-uploads)
- [Build and Deployment](#build-and-deployment)
- [Development Notes](#development-notes)
- [Known Configuration Considerations](#known-configuration-considerations)
- [🙋‍♀️ Author](#-author)

## Project Overview

Career development often involves multiple disconnected services for discovering opportunities, building a professional profile, finding mentors, and connecting with people who can provide referrals. Referloom aims to bring these activities together in a single platform.

The application provides separate experiences according to the user's role:

- **Students** can build a professional profile, showcase projects and skills, set career preferences, explore jobs, apply for opportunities, view AI-assisted job matches, request mentorship, and find collaborators.
- **Alumni** can share opportunities, review relevant student profiles, manage applicants, provide referrals, and respond to mentorship requests.
- **Companies** can create job listings, review applicants, view student profiles, and manage application progress.
- **Administrators** can review pending users and verify accounts.

## User Roles

| Role | Main responsibilities and capabilities |
|---|---|
| Student | Manage profile, skills, experience, projects, career preferences, job applications, mentorship requests, and collaboration posts. |
| Alumni | Maintain an alumni profile, post jobs, review applicants and AI matches, refer candidates, and manage mentorship requests. |
| Company | Maintain company information, post jobs, view applicants, review student profiles, and update application statuses. |
| Admin | Review pending users and verify accounts. |

Access to role-specific screens is organized through Expo Router layouts and role-based application navigation.

## Features

### 1. Authentication and onboarding

- Registration and login flows.
- Role selection for the platform's supported user types.
- Email OTP sending and verification during the registration flow.
- Role-specific registration information and supporting proof uploads for alumni and company accounts.
- JWT-based authentication for protected API requests.

### 2. Student profile and career setup

- Student profile with headline, biography, profile image, education details, skills, and experience.
- Add and manage project portfolio entries, including descriptions, technologies, GitHub links, live links, and images.
- Career preferences covering target fields, companies, locations, job types, and timelines.
- Profile visibility settings, including public and private modes.
- AI-generated profile-strength feedback and career-roadmap guidance.

### 3. Job discovery and applications

- Browse available job opportunities.
- View job details, descriptions, requirements, location, job type, and salary range when provided.
- Apply to jobs and view submitted applications.
- AI-assisted job-fit scoring based on profile information and job requirements.
- Alumni and company job-posting flows.
- Applicant review and application-status management.
- Job status controls for opening or closing listings.

The backend application model supports the following statuses: `applied`, `shortlisted`, `interviewing`, `offered`, `accepted`, and `rejected`.

### 4. Alumni referrals

- Alumni can refer a student candidate for a specific job.
- The backend checks for an existing referral/application to avoid duplicate referrals for the same candidate and job.
- Referral actions are restricted to authenticated alumni accounts.

### 5. Mentorship

- Students can send mentorship requests to alumni with a message.
- Students and alumni can retrieve mentorship requests relevant to them.
- Alumni can accept or reject incoming requests.
- Request states are `pending`, `accepted`, and `rejected`.

### 6. Project collaboration board

- Students can create collaboration posts for projects, hackathons, or other team opportunities.
- Posts can describe the opportunity and list the roles for which collaborators are needed.
- Students can explore active posts and apply for a particular role with a message.
- Post owners can view their posts and applicants, and toggle a post between active and inactive.
- The backend prevents the same student from applying repeatedly to the same post.

### 7. Admin verification

- Administrators can retrieve users awaiting verification.
- Administrators can verify eligible accounts.
- Admin-only authorization is checked by the backend.

### 8. File and image uploads

- Upload support for profile-related images and verification documents.
- Cloudinary storage is configured for uploaded files.
- Supported upload formats in the upload middleware are JPG, JPEG, PNG, and PDF.

## Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React Native 0.81 | Cross-platform mobile application UI |
| Expo SDK 54 | Development and application tooling |
| Expo Router 6 | File-based navigation and route layouts |
| JavaScript / TypeScript | Application implementation |
| Axios | HTTP requests to the backend |
| AsyncStorage | Persisting the authentication token on the client |
| React Navigation | Navigation primitives and tabs |
| Expo Image Picker | Selecting images |
| Expo Secure Store | Secure storage capability included in the project dependencies |
| React Native SVG | Vector graphics and UI visuals |
| React Native Toast Message | In-app notifications |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express 5 | REST API server |
| MongoDB | Application database |
| Mongoose 9 | MongoDB object modeling |
| JSON Web Token (JWT) | API authentication |
| bcryptjs | Password hashing |
| otp-generator | Email verification OTP generation |
| Nodemailer | Email delivery |
| Google Generative AI SDK | Gemini-powered career and job assistance |
| Cloudinary | Cloud-based file and image storage |
| Multer | Multipart file upload handling |
| CORS and dotenv | Cross-origin configuration and environment settings |

## Repository Structure

```text
referloom/
├── README.md
├── .gitignore
├── .github/
│   └── workflows/
│       └── release.yml
│
├── referloom_fixed/                 # Expo / React Native frontend
│   ├── app/                          # Expo Router screens and layouts
│   │   ├── (auth)/                   # Login, registration, OTP, role selection
│   │   ├── (roles)/
│   │   │   ├── student/              # Student dashboard and features
│   │   │   ├── alumni/               # Alumni dashboard and features
│   │   │   ├── company/              # Company dashboard and features
│   │   │   └── admin/                # Admin screens
│   │   ├── _layout.js
│   │   └── index.js
│   ├── src/
│   │   ├── components/               # Shared UI and profile components
│   │   ├── context/                  # Authentication context
│   │   ├── features/                 # Feature-specific UI
│   │   ├── hooks/                    # Reusable hooks
│   │   ├── services/                 # API and authentication services
│   │   ├── theme/                    # Theme colors
│   │   └── utils/                    # Validation and utility functions
│   ├── assets/
│   ├── app.json
│   ├── eas.json
│   └── package.json
│
├── referloom_backend/                # Express backend
│   ├── config/                       # MongoDB and Cloudinary configuration
│   ├── controllers/                  # Request handlers and business logic
│   ├── middlewares/                  # Authentication, errors, uploads
│   ├── models/                       # Mongoose schemas
│   ├── routes/                       # REST API route definitions
│   ├── utils/                        # AI, email, and OTP utilities
│   ├── seed.js                       # Seed data script
│   ├── server.js                     # Backend entry point
│   └── package.json
│
└── .gitignore
```

> The frontend directory is named `referloom_fixed` in this repository. The backend directory is named `referloom_backend`.

## Architecture and Data Models

### High-level architecture

```text
┌─────────────────────────────────────┐
│       Expo / React Native App       │
│                                     │
│ Student | Alumni | Company | Admin  │
└──────────────────┬──────────────────┘
                   │ Axios / HTTP
                   │ JWT Authorization
                   ▼
┌─────────────────────────────────────┐
│          Express REST API           │
│                                     │
│ Routes → Middleware → Controllers   │
└───────┬──────────────┬──────────────┘
        │              │
        ▼              ▼
┌──────────────┐  ┌───────────────────┐
│   MongoDB    │  │ External Services │
│  / Mongoose  │  │ Gemini / Cloudinary│
└──────────────┘  │ Email via SMTP    │
                  └───────────────────┘
```

### Main database models

| Model | Purpose | Important data |
|---|---|---|
| `User` | Stores account, role, profile, and role-specific information. | Email, hashed password, role, verification state, visibility, skills, experience, career preferences, alumni/company details. |
| `Project` | Stores a student's portfolio project. | Student, title, description, technologies, GitHub URL, live URL, image. |
| `Job` | Stores job opportunities posted by alumni or companies. | Owner, title, company, description, requirements, job type, location, salary range, status. |
| `Application` | Stores a student's application to a job. | Job, student, AI fit score, application status, referral metadata. |
| `Mentorship` | Stores a student-to-alumni mentorship request. | Student, alumni, message, request status. |
| `CollabPost` | Stores project or hackathon collaboration opportunities. | Author, type, title, description, required roles, active state, applicants. |
| `Otp` | Stores email verification codes temporarily. | Email, OTP, creation time; documents expire after five minutes. |

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js (an LTS release recommended).
- npm (installed with Node.js).
- MongoDB database, either local or hosted through MongoDB Atlas.
- Cloudinary account for uploads.
- Google AI Studio API key for Gemini features.
- SMTP email credentials for OTP email delivery.
- Expo Go or an Android/iOS development environment for running the mobile app.

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd referloom
```

### 2. Install backend dependencies

```bash
cd referloom_backend
npm install
```

### 3. Configure backend environment variables

Create a `.env` file inside `referloom_backend/`. Refer to [Environment Configuration](#environment-configuration) for the required variable names.

### 4. Start the backend

```bash
npm run dev
```

The backend defaults to port `5001` if `PORT` is not set. When the server starts successfully, the root endpoint responds with:

```text
Referloom API is running...
```

### 5. Install frontend dependencies

Open a second terminal:

```bash
cd referloom/referloom_fixed
npm install
```

If you are already in the repository root, use the command above as written. If you are inside `referloom_backend`, return to the repository root first.

### 6. Configure the frontend API address

The API base URL is currently defined in:

```text
referloom_fixed/src/services/api.js
```

Update it to point to the backend instance you are running. For a physical device, use the computer's reachable LAN IP address; `localhost` on the phone refers to the phone itself. For an Android emulator, use the appropriate host address for your emulator or the deployed API URL.

### 7. Start Expo

```bash
npx expo start
```

Then use the Expo terminal options to open the app on a connected device, Android emulator, iOS simulator, or web where supported.

## Environment Configuration

Create `referloom_backend/.env` with the following variables. Replace the placeholders with your own credentials; never commit real secrets.

```dotenv
# Server
PORT=5001
NODE_ENV=development

# MongoDB
MONGO_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=replace_with_a_long_random_secret

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# SMTP email configuration
EMAIL_HOST=your_smtp_host
EMAIL_PORT=587
EMAIL_USER=your_email_username
EMAIL_PASS=your_email_password
```

**Important:** These are variable names referenced by the backend source. Your email provider may require a different SMTP port or secure-connection setting. Keep credentials private and use environment variables in deployment environments as well.

## Running the Application

### Backend scripts

Run these commands from `referloom_backend/`:

| Command | Description |
|---|---|
| `npm install` | Install backend dependencies. |
| `npm run dev` | Start the server using Nodemon. |
| `npm start` | Start the server with Node.js. |

### Frontend scripts

Run these commands from `referloom_fixed/`:

| Command | Description |
|---|---|
| `npm install` | Install frontend dependencies. |
| `npm start` | Start Expo. |
| `npm run android` | Start Expo targeting Android. |
| `npm run ios` | Start Expo targeting iOS. |
| `npm run web` | Start Expo for web. |
| `npm run lint` | Run the Expo ESLint configuration. |

## API Overview

All backend routes are mounted under `/api`. Protected endpoints require a valid JWT in the request header:

```http
Authorization: Bearer <JWT_TOKEN>
```

### Authentication — `/api/auth`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/register` | Register an account; accepts multipart proof fields for alumni/company registration. |
| `POST` | `/login` | Authenticate a user and obtain an access token. |

### OTP — `/api/otp`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/send` | Generate and send an email verification OTP. |
| `POST` | `/verify-otp` | Verify the submitted OTP. |

### User profiles — `/api/users`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/profile` | Get the authenticated user's profile. |
| `PUT` | `/profile` | Update profile information. |
| `PUT` | `/visibility` | Update profile visibility. |
| `POST` | `/career-preferences` | Save career preferences and generate AI roadmap data. |
| `POST` | `/reset-career-goals` | Reset career goals. |
| `GET` | `/alumni` | Retrieve alumni profiles. |
| `GET` | `/:id` | Retrieve a user by ID, subject to backend access rules. |

### Projects — `/api/projects`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/` | Create a student project. |
| `GET` | `/mine` | Retrieve the authenticated student's projects. |
| `GET` | `/:id` | Retrieve a project by ID. |
| `PUT` | `/:id` | Update a project. |
| `DELETE` | `/:id` | Delete a project. |

### Jobs and applications — `/api/jobs`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/` | Create a job listing. |
| `GET` | `/company` | Retrieve jobs posted by the authenticated company. |
| `GET` | `/company/applicants` | Retrieve applicants for company jobs. |
| `GET` | `/alumni-applicants` | Retrieve applicants for alumni jobs. |
| `GET` | `/mine` | Retrieve jobs associated with the authenticated user. |
| `GET` | `/matches` | Retrieve job matches for a student. |
| `GET` | `/my-applications` | Retrieve the student's applications. |
| `PUT` | `/company/applications/:id/status` | Update an application status through the company flow. |
| `PUT` | `/applications/:id/status` | Update an application status. |
| `GET` | `/:id/matches` | Retrieve matches for a particular job. |
| `POST` | `/:id/apply` | Apply to a job. |
| `PUT` | `/:id/status` | Update a job's open/closed status. |
| `GET` | `/:id` | Retrieve job details. |

### Mentorship — `/api/mentorship`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/request` | Send a mentorship request. |
| `GET` | `/requests` | Retrieve relevant mentorship requests. |
| `PUT` | `/requests/:id` | Accept or reject a mentorship request. |

### Referrals — `/api/referrals`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/refer` | Refer a candidate to a job (alumni only). |

### Collaboration board — `/api/collab`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/` | Create a collaboration post. |
| `GET` | `/active` | Retrieve active collaboration posts. |
| `GET` | `/mine` | Retrieve the user's posts and applicants. |
| `PUT` | `/:id/toggle` | Toggle a post's active state. |
| `POST` | `/:id/apply` | Apply to a collaboration post. |

### Administration — `/api/admin`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/pending` | Retrieve users awaiting verification (admin only). |
| `PUT` | `/verify/:id` | Verify a user (admin only). |

### Uploads — `/api/upload`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/` | Upload a file using multipart form data with the field name `file`. |

> This API list is based on the route declarations in the repository. Request body fields and response formats should be checked in the corresponding controller before integrating a new client.

## AI Features

The backend's `utils/aiEngine.js` uses the Google Generative AI SDK and the `gemini-1.5-flash` model. It requests JSON-formatted output for three features:

1. **Profile strength:** evaluates a student's headline, biography, skills, career preferences, projects, and experience; returns a score and actionable suggestions.
2. **Job-fit calculation:** compares a student's skills, projects, and experience with a job's title, type, requirements, and description; returns a fit score and match/improvement suggestions.
3. **Career roadmap:** generates a four-step roadmap based on target career fields, current skills, and projects.

Fallback functions are present so the backend can return basic guidance if a Gemini request fails. AI output is intended as decision-support guidance and should not be treated as a hiring decision or a guarantee of job suitability.

## Authentication and Security

- User passwords are stored as hashes using `bcryptjs`; the password field is excluded from normal Mongoose query selection.
- JWT authentication is used to protect user-specific API routes.
- Role checks are applied to restricted actions such as admin verification and alumni referrals.
- OTP records have a MongoDB TTL expiry of five minutes.
- User profiles support public/private visibility and a `grantedAccess` relationship in the data model.
- Uploaded files are sent to Cloudinary through the configured upload middleware.

For production, use HTTPS, strong unique secrets, strict CORS allow-lists, validated request payloads, rate limits on authentication/OTP endpoints, and carefully reviewed file-upload limits and permissions.

## File Uploads

The backend upload middleware uses Multer with Cloudinary storage. Files are placed in the Cloudinary folder `referloom_uploads`. The configured allowed formats are:

- `.jpg`
- `.jpeg`
- `.png`
- `.pdf`

The middleware also applies an image size transformation with a maximum width and height of 800 pixels where applicable. Registration uses multipart fields named `degreeProof` (alumni) and `idProof` (company). The general upload endpoint expects the multipart field `file`.

## Build and Deployment

### Backend deployment

1. Deploy the `referloom_backend` directory to a Node.js-compatible hosting service.
2. Configure the environment variables in the hosting provider's secret/environment settings.
3. Ensure the MongoDB database allows connections from the deployed backend.
4. Configure Cloudinary and SMTP credentials.
5. Set `PORT` according to the hosting provider's requirements.
6. Use `npm start` as the production start command.

The repository's frontend API service currently contains a deployed Render API URL for Android and a development LAN URL for other platforms. Confirm these values match the environment you intend to use before creating a release.

### Frontend build

The frontend includes Expo Application Services configuration in `referloom_fixed/eas.json` and an Expo project ID in `app.json`. Use the Expo/EAS tooling and the project's configured identifiers to create platform builds. Review the app name, slug, package identifier, icons, splash screen, and API base URL before publishing.

## Development Notes

- Keep frontend and backend dependencies installed in their respective directories; each has its own `package.json` and lockfile.
- Start the backend before testing features that require API or database access.
- Ensure the mobile device/emulator can reach the backend host.
- Use test accounts with the correct role to verify role-specific navigation and API authorization.
- Use a development database and test Cloudinary/email credentials while developing.
- Do not commit `.env` files, API keys, JWT secrets, private keys, or production credentials.

## Known Configuration Considerations

- The frontend API base URL is currently hard-coded in `src/services/api.js`. It selects a Render URL for Android and a LAN IP URL for other platforms. This should be moved to environment-specific configuration before sharing builds across environments.
- The repository archive includes local development artifacts such as Expo cache data and dependency directories. These are not required for a clean setup; install dependencies from the lockfiles instead.
- The backend includes a `seed.js` script, but the backend `package.json` does not define a seed command. Inspect the script and configure the required database/environment before running it manually.
- The archive contains a backend `.env` file. Do not publish or share its contents; rotate any credentials if the file has ever been committed to a public or shared repository.
- This README documents functionality and endpoints visible in the supplied source tree. It does not claim that every feature has been production-tested or that all deployment services are currently active.

---

## 🙋‍♀️ Author

<table>
  <tr>
    <td>
      <strong>Ishita Amin</strong><br/>
      👩‍💻 B.Tech CSE @ Navrachana University<br/>
      📬 <a href="mailto:aminishita30@gmail.com">aminishita30@gmail.com</a><br/>
      🔗 <a href="https://www.linkedin.com/in/ishita-amin-841726253" target="_blank">LinkedIn</a><br/>
    </td>
  </tr>
</table>
