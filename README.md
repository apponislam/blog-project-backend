# Blog Project Backend

## Live URL

You can access the live version of the project [Live Server](https://blog-project-backend-pi.vercel.app).

## Description

This is the backend for a blog project built using Node.js, Express, TypeScript, and MongoDB. It includes features for user authentication, password hashing, and JWT-based authentication.

## Features

- **User Authentication**
    - **Register**: Users can register by providing a username, email, and password.
    - **Login**: Registered users can log in and receive a JWT token for authentication.
- **Blog Management**

    - **Create Blog Post**: Authenticated users can create new blog posts with a title, content, and category.
    - **Update Blog Post**: Authenticated users can update existing blog posts.
    - **Delete Blog Post**: Authenticated users can delete their blog posts.

- **Search Blog Posts**
    - Supports search queries to find blog posts by title or content.
    - Query parameters:
        - `search`: Search by title or content.
        - `sortBy`: Sort results by a specific field (e.g., `createdAt`).
        - `sortOrder`: Sort order, either `asc` or `desc`.
        - `filter`: Filter posts by category ID.

## Installation

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/blog-project-backend.git
```

## 2. Install Dependencies

Navigate to the project folder and run the following command to install all required dependencies:

```bash
npm install
```

## 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following keys with your configuration:

```env
NODE_ENV=development
PORT=your_port
DATABASE_URL=your_database_url
BCRYPT_SALT_ROUNDS=your_bcrypt_salt_rounds
JWT_SECRET=your_jwt_secret_code
```

Replace `your_port`, `your_database_url`, `your_bcrypt_salt_rounds`, and `your_jwt_secret_code` with your actual values.

## Available Scripts

In the project directory, you can run the following scripts:

### `npm run build`

Compiles TypeScript to JavaScript.

```bash
npm run build
```

### `npm run start:dev`

Starts the development server with live reloading enabled.

```bash
npm run start:dev
```

## Project Structure

Here’s an overview of the folder structure:

```plaintext
.
├── src
│   ├── controllers       # API request handlers
│   ├── middlewares       # Custom middleware for validation/authentication
│   ├── models            # Mongoose schema and models
│   ├── routes            # Application routes
│   ├── server.ts         # Application entry point
│   └── utils             # Utility functions
├── dist                  # Compiled JavaScript files (build output)
├── .env                  # Environment variables
├── package.json          # Project metadata and dependencies
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```
