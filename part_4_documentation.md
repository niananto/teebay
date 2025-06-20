# Part 4: Implementation Documentation

## Overview

Teebay is a full-stack product renting and resale platform built with **NestJS**, **GraphQL**, **Prisma**, and **PostgreSQL** for the backend, and **React** with **Mantine UI** and **Apollo Client** on the frontend. The application allows users to register, add/edit/delete products, browse listings, and perform buy/rent operations.

This document walks through the implementation of each part in chronological order, including roadblocks and tradeoffs made during development.

---

## 🚀 Development Flow

### 🟣 Part 1: Login and Registration Pages (Initial Setup)

Before diving into database or backend logic, I started by scaffolding the frontend with Vite and building basic pages for **Login** and **Register**.

- Used Mantine components for clean and responsive UI.
- Hooked up simple form states and validations using Mantine's form hooks.
- **Hardship**: Initially attempted to over-engineer authentication using JWT, but reverted to a simpler version (still very secure) as there was little time.

Once the UI was satisfactory, I moved to backend setup.

### 🧱 Database Design and Backend Setup

- Defined models: `User`, `Auth`, `Product`, `Category`, `Transaction`, and `Image`.
- Implemented relations and used enums for transaction types (`BUY`, `RENT`).

**Hardship**: The Prisma seed failed inside Docker due to race conditions between the container boot and DB readiness. I fixed it with `depends_on` and retry loops.

### ⚙️ Backend API with NestJS + GraphQL

- Set up modules: `User`, `Product`, `Transaction`, `Auth`, `Category`.
- Used GraphQL code-first approach with decorators.
- Exposed CRUD operations, paginated product lists, and filtered queries.

**Hardship**: Handling rent time overlaps was tricky, as Prisma has no native exclusion constraints. I solved this with manual checks in the service layer.

**Corner Case**: Preventing users from buying/renting their own products was added as a safeguard in both frontend and backend.

### 🔗 Connecting Frontend with Backend

- Integrated Apollo Client.
- Used `useQuery` and `useMutation` with proper `refetchQueries` and manual cache updates.
- Created custom hooks for `useProductList`, `useProductDetails`, `useOwnedProductList`, and transaction history.

**Hardship**: Apollo cache was not updating consistently after mutations. I implemented explicit cache updates and exposed `refetch` from custom hooks.

### 🟢 Part 2: Product CRUD and Pagination

- Developed **multi-step Add Product** form matching the wireframe, with category checkboxes and validations.
- Added **Edit Product** and **Delete** with confirmation modal.
- Browsing implemented with pagination and filters by category.

**Hardship**: Mantine’s multi-step form was custom-built, as built-in wizards were inflexible.

**Corner Case**: Reused `ProductCard` component with props to toggle action buttons and delete logic.

### 🔵 Part 3: Buy and Rent Workflow

- Implemented `buyProduct` and `rentProduct` mutations.
<!-- - Buy marks product as unavailable and updates ownership.
- Rent stores the rental window and shows product as unavailable. -->

- Designed modals: 
  - **Buy modal**: Confirmation popup.
  - **Rent modal**: Date picker with validation.

- **Transaction history** page shows products segmented as:
  - Bought
  - Sold
  - Borrowed
  - Lent

**Hardship**: Combining 4 queries into one page required clean UI and loading state handling.

**Corner Case**: Empty states are handled gracefully with user-friendly messages.

### 🐳 Docker Deployment

- Dockerized the backend using multi-stage build.
- Used local Postgres instance during development.
- `.env` used for DATABASE_URL.

---

## 📌 Summary

The Teebay app was designed with modularity, reusability, and user experience in mind. Core principles followed:

- **Form validation and UX**: Clean flows for all forms
- **Code reuse**: Shared components/hooks
- **Apollo cache control**: Manual updates after mutations
- **Corner case handling**: Ownership checks, rental overlaps, empty states

---

Thank you for reviewing the project!

