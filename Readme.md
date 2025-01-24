# Contact Us Form Backend - Node.js, Express.js, Prisma, PostgreSQL & Docker

This guide provides an overview of the codebase, the functionality of the app, and detailed instructions on how to set up and run the app. Follow all steps carefully, especially regarding the environment setup.

## Overview

This is a **Node.js** and **Express.js** backend app that allows users to submit a "Contact Us" form. It sends the submitted data (fullname, email, service, and message) to an email address (`nyaranga4@gmail.com`) and optionally stores the data in a PostgreSQL database using **Prisma**.

The app is designed to:
- **Accept form submissions**: Users can submit their details including name, email, service, and message.
- **Send emails**: The app sends the collected data to a specified email address.
- **Store form submissions in the database**: Optionally, the data is saved in a PostgreSQL database for record-keeping.

## Project Structure

Here’s the complete project structure for the Contact Us form backend app:

```
contact-us-backend/
│
├── prisma/
│   ├── schema.prisma           # Prisma schema for managing the database structure
│   └── migrations/             # Prisma migration files
│
├── src/
│   ├── controllers/            # Logic for handling form submission and email sending
│   ├── routes/
│   │   └── sendEmailRoute.js   # Route for handling the "Contact Us" form submission
│   ├── prismaClient.js         # Prisma client database setup and configuration
│   └── server.js               # Main server entry point for setting up routing and middleware
│
├── .env                        # Stores environment variables like email credentials and database URL
├── Dockerfile                  # Docker setup for containerizing the app
├── docker-compose.yaml         # Docker Compose configuration for running Node.js and PostgreSQL containers
├── package.json                # Project dependencies and scripts
├── package-lock.json           # Lockfile for exact dependency versions
└── README.md                   # Project documentation (this file)
```

### Explanation of Key Directories and Files

- **`prisma/`**: Contains the Prisma schema (`schema.prisma`) and migration files. After each schema change, migration files are generated here to apply database changes.
- **`src/`**: Contains the core backend code.
  - **`controllers/`**: Holds the logic for handling form data, sending emails, and saving data to the database.
  - **`routes/`**: Contains API routes for handling the form submission.
  - **`prismaClient.js`**: Sets up the Prisma client for database interaction.
  - **`server.js`**: The entry point for the Express.js application, which configures the app, routes, and middleware.
- **`.env`**: Stores environment variables like email credentials (`EMAIL_USER`, `EMAIL_PASS`) and database URL (`DATABASE_URL`).
- **`Dockerfile`**: The Dockerfile for building the Node.js application in a containerized environment.
- **`docker-compose.yaml`**: Configuration for Docker Compose, which sets up both the Node.js app and PostgreSQL in separate containers.
- **`package.json`**: Defines the Node.js dependencies and scripts used to run the application (e.g., `npm start`).
- **`README.md`**: Project documentation (this file).

## Getting Started

### Prerequisites

Ensure you have the following installed:

1. **Docker Desktop** - for containerization of the app and PostgreSQL database.

### Steps to Set Up

1. **Clone the Repository**:

```bash
git clone https://github.com/JAPHETHNYARANGA/email-sender-client.git
cd contact-us-backend
```

2. **Install Dependencies**:

```bash
npm install
```

3. **Generate the Prisma Client**:

```bash
npx prisma generate
```

4. **Build Docker Images**:

```bash
docker compose build
```

5. **Create and Apply PostgreSQL Migrations**:

```bash
docker compose run app npx prisma migrate dev --name init
```

*Note: If necessary, run this to apply migrations:*

```bash
docker-compose run app npx prisma migrate deploy
```

6. **Start Docker Containers**:

```bash
docker compose up
```

Or to run in detached mode (background):

```bash
docker compose up -d
```

7. **Access PostgreSQL Database in Docker**:

While the containers are running, you can access the PostgreSQL database for queries and modifications:

```bash
docker exec -it postgres-db psql -U postgres -d contactusdb
```

8. **Stop Docker Containers**:

```bash
docker compose down
```

9. **To Delete All Docker Containers**:

```bash
docker system prune
```

10. **Access the App**:

Open `http://localhost:5000` in your browser to interact with the contact form API. You can submit the form, and the data will be sent to the specified email and optionally stored in the database.

## Example Workflow

1. **Submit Contact Form**: Users fill out their full name, email, service, and message.
2. **Email Sent**: The backend sends an email with the form data to `nyaranga4@gmail.com`.
3. **Save to Database**: Optionally, the backend stores the form data in a PostgreSQL database.

### Database Schema (Prisma)

Your `schema.prisma` file might look like this:

```prisma
model Contact {
  id        Int      @id @default(autoincrement())
  fullname  String
  email     String
  service   String
  message   String
  createdAt DateTime @default(now())
}
```

## REST Client (Optional)

If you'd like to test the API directly, you can use a REST client (e.g., Postman or VS Code's REST Client extension) to interact with the app.

You can use the following endpoints:

- **POST `/api/sendMail`**: Send a "Contact Us" form submission (with fields `fullname`, `email`, `service`, and `message`).

### Example Request for Sending an Email

```http
POST http://localhost:5000/api/sendMail
Content-Type: application/json

{
  "fullname": "John Doe",
  "email": "john@example.com",
  "service": "Web Design",
  "message": "I'm interested in your web design services."
}
```

## Conclusion

This guide helps you get your "Contact Us" backend up and running. The app handles email submissions and stores contact form data in a PostgreSQL database using Prisma. It also provides Docker support for easy deployment.

You can now explore the app's functionality, test form submissions, and even extend the app as needed!

