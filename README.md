# Project Overview

This is a Task Management Next.js application built using the App Router architecture.

## Setup Project

cd client

### Install pnpm (if not installed)

npm install -g pnpm

### Install dependencies

pnpm install

### Run project

pnpm dev

---

## Architecture

The root directory is `client`, which contains the entire frontend application.

The architecture is divided into:

- App Router layer (routing and pages)
- UI component layer
- State management layer
- Business logic layer
- Utility layer

---

## App Structure

The `app` directory handles all routing and application pages.

It includes:

- Page routes
- Layouts
- API routes (Next.js route handlers)
- Authentication pages (login, signup, reset password)
- Protected dashboard routes

This layer is responsible for navigation and rendering structure.

---

## State Management

State management is implemented using Redux Toolkit.

### Structure

- `store/` contains the global store
- `store/features/` contains feature-based slices

Each slice is responsible for a specific domain such as authentication or user data.

This ensures predictable and centralized state management.

---

## Components Structure

The `components` directory contains all UI components.

### Structure

- Feature-based components grouped by domain
- `shared/` contains reusable components used across the application

This prevents duplication and improves reusability.

---

## Hooks

The `hooks` folder contains custom React hooks.

These hooks are used to:

- Encapsulate business logic
- Handle reusable API calls
- Manage complex state logic outside UI components

This keeps components clean and focused only on rendering.

---

## Lib (Utilities)

The `lib` folder contains shared utilities including:

- Helper functions
- Constants

---

### Features

- Login
- Signup
- Reset password
- Protected routes
- Session refresh handling

---

## API Configuration

The application communicates with Supabase backend.

### Environment Configuration

NEXT_PUBLIC_BASE_URL=https://ncwimnnefgulsncdfmog.supabase.co  
NEXT_PUBLIC_API_KEY=sb_publishable_RB6pewojyq5EMtD_hfsHrw_QCJjwwGg  
APP_PASSWORD=\*\*\*

API calls are centralized to ensure consistency across the application.

---

## Project Structure

client/

- app/ (routes, pages, layouts, API routes)
- components/ (UI components shared and feature-based)
- store/ (Redux Toolkit slices and store)
- hooks/ (custom business logic hooks)
- lib/ (helpers, constants, utilities)
- styles/ (global styles)
