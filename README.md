# Teebay Marketplace

A full-stack product renting and reselling app built with NestJS, GraphQL, Prisma, PostgreSQL, and React.

## 🔧 Technologies Used

**Frontend**:

- React
- Mantine UI
- Apollo Client (GraphQL)

**Backend**:

- NestJS
- GraphQL (Code-first)
- Prisma ORM
- PostgreSQL

**Deployment**:

- Docker + Docker Compose

---

## 🚀 Getting Started

### Prerequisites

- Docker and Docker Compose installed on your machine

### Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/niananto/teebay.git
cd teebay
```

2. **Configure Environment**

- Modify `.env` files as necessary for development.

3. **Edit **

> ⚠️ **Important:**
>
> 
> If you're running Postgres locally (outside Docker), set the `DATABASE_URL` as:
>
> ```yaml
> DATABASE_URL=postgresql://<user>:<password>@localhost:5432/teebay
> ```
>
> Otherwise keep the internal Docker hostname as it is, `db`.

4. **Start the App**

```bash
docker-compose up --build
```

5. **Visit the App**

Open your browser and go to:

```
https://localhost:5173
```

---

## 🔐 Credentials (Sample)
Some users and some additional data is seeded automatically when you first run the project. Use the following user if needed -

```
username: johndoe
password: 1234
```

You can register a new user from the UI as well. If you want to start completely fresh, edit the `teebay-api/package.json` as needed.

---

## 📦 Project Structure

```
teebay-frontend/        # React frontend
teebay-api/             # NestJS GraphQL backend
```

---

## 📹 Loom Video

> Include a Loom or screen-recording video here demonstrating the working features.

---

## ✅ Features

- User registration and login
- Add, edit, delete products with categories
- Browse with filter (to be implemented) and pagination
- Buy and rent functionality
- Transaction history (bought, sold, borrowed, lent)

---

## 🗂️ Schema Diagram

A visual representation of all models and relationships is available here:

📎 [Standard Schema Diagram](DB_schema.png)

---

## 💬 Feedback

If you find any issues or have suggestions, feel free to contact or open an issue on the GitHub repo.