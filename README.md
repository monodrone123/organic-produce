# Nature's Crate

A modern web application for buying fresh fruits and vegetables online. Built with React, TypeScript, and Material-UI.

## Features

- User authentication (Admin and User roles)
- Product browsing with search and filter functionality
- Shopping cart management
- Checkout process with delivery address
- Admin dashboard for product management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd organic-produce
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Usage

### User Access
- Regular users can browse products, add items to cart, and complete purchases
- Use any email (except those containing "admin") and any password to log in as a regular user

### Admin Access
- Admins can manage products (add, edit, remove)
- Use an email containing "admin" (e.g., admin@example.com) and any password to log in as an admin

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── context/       # React context providers
  ├── pages/         # Page components
  ├── types/         # TypeScript type definitions
  ├── App.tsx        # Main application component
  └── index.tsx      # Application entry point
```

## Technologies Used

- React
- TypeScript
- Material-UI
- React Router
- Context API for state management 