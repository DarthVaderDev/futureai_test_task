# Next Js - Firebase app

## Overview

This is a Next.js application that allows merchants and users to manage deals. Merchants can create, view, update, and delete their deals, while users can view and enroll in these deals. The application uses Firebase for authentication and Firestore as the database.

## Features

- **User Authentication**: Users can sign up and log in using email.
- **Role-Based Access**: Users can have different roles (merchant or user) with specific capabilities.
- **Deal Management**:
  - **For Merchants**:
    - Create new deals.
    - View and manage existing deals.
  - **For Users**:
    - View all available deals.
    - Enroll in deals with comments.

## Technologies Used

- **Next.js**: Framework for building server-rendered React applications.
- **Firebase**: Used for authentication and Firestore as the database.
- **React Hook Form**: For form handling and validation.
- **Zod**: For schema validation.
- **CSS Modules/Tailwind CSS**: For styling components.

## Setup and Installation

1. Install dependencies:

   npm install

2. Create a .env.local file in the root of the project and add your Firebase configuration and email configuration base on the sample exist in the repository

3. Run the development server:

   npm run dev
   Open your browser and go to http://localhost:3000.
