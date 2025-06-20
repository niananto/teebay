<!-- please comment/uncomment the DATABASE_URL in the docker-compose.yaml according to your local machine.

username: johndoe
password: 1234

https://localhost:5173 -->

# TeeBay

## Overview

Teebay is a full-stack application developed using **NestJS**, **GraphQL**, **Prisma**, and **PostgreSQL** on the backend, and **React (with Mantine UI)** on the frontend. It supports a peer-to-peer marketplace model for buying, renting, and selling products.

This document outlines how each part of the problem was approached and solved, alongside important edge cases and implementation decisions made throughout the development.

---

## 🧹 Part 1: Database Schema & Backend API

### Technologies
- **NestJS v11** (modular backend architecture)
- **GraphQL Code-first approach (Apollo)**
- **Prisma ORM v6.9**
- **PostgreSQL**
- **Docker**

### Key Features Implemented
- User authentication (with password hashing, validation)
- Product management with categories, images, and availability
- Transaction model supporting Buy and Rent operations
- Pagination for listing APIs
- Authorization with role-based access

### Notes & Corner Cases
- **Rent transaction overlap:** To prevent overlapping rental periods, constraints were handled at the application layer. While Prisma doesn’t natively support temporal exclusions, custom validation checks were implemented to ensure valid rental dates.
- **Ownership checks:** Buy/Rent is blocked if a user attempts to buy/rent their own product.
- **Seeding Issues in Docker:** Docker containers sometimes failed to seed data due to race conditions between the app and the database. This was resolved by using `depends_on` and retry mechanisms.
- **Image URLs:** For now, image uploads are mocked via URL strings. In production, we’d integrate S3 or Cloudinary.

> **Suggestion:** Include an entity-relationship diagram (ERD) screenshot here showing the relation between User, Product, Transaction, and Category models.

---

## 🧹 Part 2: Frontend UI & User Flows

### Technologies
- **React**
- **Mantine v8.1.0**
- **Apollo Client**
- **React Router DOM**

### Implemented Pages
- **Public:**
  - Landing Page
  - Login / Register
- **Protected:**
  - Dashboard
  - Add Product
  - Edit Product
  - Product List (Owned)
  - Product Details
  - Transaction History (Bought, Sold, Borrowed, Lent)

### Notes & Corner Cases
- **Pagination:** Used React `useState` and Mantine components to paginate product lists. Total pages are derived from the `total` and `limit` values returned by the backend.
- **Modal Flows:** Implemented confirmation modal for Buy and Rent using Mantine `Modal`. Rent flow includes a date range selector with validation for "To" > "From".
- **Product Detail Cache Update:** After Buy/Rent, Apollo cache is updated manually to reflect ownership and availability changes.
- **Responsiveness:** Mantine’s Grid and Stack components were used to create mobile-friendly layouts.
- **View/Edit/Delete Controls:** Replaced standalone action buttons with icon overlays for a clean UI.

> **Suggestion:** Include UI screenshots for Product Card, Product Details Page, Add/Edit Product Form, and Transaction History.

---

## 🤖 Part 3: Buy and Rent Operations

### Implementation Details
- **Buy Operation:**
  - Triggers a mutation that inserts a `BUY` transaction
  - Product ownership is transferred
  - Product is marked unavailable
- **Rent Operation:**
  - Triggers a mutation that inserts a `RENT` transaction
  - Rent dates are stored
  - Product is temporarily unavailable (but still owned by the original owner)

### Notes & Corner Cases
- **Self-buying/renting:** Blocked via backend validation.
- **Transaction History Page:** Pulled from four separate GraphQL queries – bought, sold, borrowed, lent. Combined on the UI into a single grouped page.
- **Empty states:** Handled with fallback messages for no transactions or no products.

> **Suggestion:** A screenshot of Rent modal and Buy confirmation modal would help visualize this flow.

---

## 🌐 Docker Deployment

### Stack
- Dockerized backend container
- Local PostgreSQL DB (non-containerized during dev)

### Issues Solved
- **`db:5432` unreachable during seed:** Updated seed script execution to wait for DB connection and used correct internal network hostnames.
- `.env` used to pass `DATABASE_URL` to the Prisma client.

---

## ✅ Summary

The Teebay app was built modularly, with separation of concerns across components and services. Most challenges were handled either via:
- Schema design (e.g., enum for transaction types)
- API-layer validation (e.g., rental periods)
- UI feedback (e.g., disabling buttons or showing modals)
- Apollo cache control for UX smoothness

