# Feature 18 - Database & Cloud Infrastructure

## Objective

Implement a production-ready backend infrastructure for AnaeCare by replacing temporary JSON-based storage with PostgreSQL, SQLAlchemy ORM, Alembic migrations, and cloud-based file storage.

This phase establishes the permanent persistence layer for users, profiles, predictions, healthcare data, and application settings.

---

# Goals

- Replace JSON storage.
- Configure PostgreSQL.
- Configure SQLAlchemy ORM.
- Configure Alembic migrations.
- Store prediction history.
- Store user profiles.
- Store authentication data.
- Store uploaded eye images.
- Prepare backend for deployment.

---

# Architecture

```
React Native

↓

FastAPI

↓

Services

↓

Repositories

↓

SQLAlchemy ORM

↓

PostgreSQL

↓

Cloud Storage
```

---

# Functional Requirements

The backend shall

- Persist all user data.
- Store prediction history.
- Store user profiles.
- Store authentication sessions.
- Store uploaded images.
- Support CRUD operations.
- Support database migrations.
- Support cloud synchronization.

---

# Technology Stack

Backend

```
FastAPI
```

Database

```
PostgreSQL
```

ORM

```
SQLAlchemy 2.x
```

Migration

```
Alembic
```

Validation

```
Pydantic
```

Cloud Storage

```
AWS S3

or

Cloudinary
```

Development

```
Docker
```

---

# Folder Structure

```
backend/

app/

database/

database.py

session.py

base.py

models/

user.py

profile.py

prediction.py

history.py

healthcare.py

repositories/

user_repository.py

profile_repository.py

prediction_repository.py

history_repository.py

healthcare_repository.py

services/

database/

database_service.py

storage_service.py

routers/

database.py

migrations/

alembic/

versions/

docker/

docker-compose.yml

.env
```

---

# Database Tables

## users

Fields

```
id

name

email

passwordHash

createdAt

updatedAt
```

---

## profiles

Fields

```
id

userId

age

gender

height

weight

bloodGroup

medicalHistory

symptoms

preferences
```

---

## predictions

Fields

```
id

userId

risk

confidence

probabilities

explanation

modelVersion

processingTime

createdAt
```

---

## prediction_history

Fields

```
id

predictionId

imageUrl

timestamp

notes
```

---

## healthcare

Fields

```
id

userId

hospitalVisited

doctorRecommendation

lastConsultation
```

---

# Relationships

```
User

↓

Profile

↓

Predictions

↓

History

↓

Healthcare
```

---

# Database Configuration

Use

```
DATABASE_URL
```

Example

```
postgresql+psycopg://username:password@localhost:5432/anaecare
```

---

# Alembic

Initialize

```
alembic init migrations
```

Generate

```
alembic revision --autogenerate
```

Apply

```
alembic upgrade head
```

---

# SQLAlchemy Models

Create models for

- User
- Profile
- Prediction
- History
- Healthcare

Use

```
DeclarativeBase
```

---

# Repository Pattern

Each entity has

```
Repository

↓

CRUD

↓

Database
```

Repositories

```
UserRepository

ProfileRepository

PredictionRepository

HistoryRepository

HealthcareRepository
```

---

# Cloud Storage

Store

```
Original Eye Images

Processed Images

ROI Images
```

Never store images inside PostgreSQL.

Store only

```
Image URL

↓

Database
```

---

# Storage Service

Responsibilities

- Upload image
- Delete image
- Retrieve image URL

Future providers

- AWS S3
- Cloudinary
- Azure Blob Storage

---

# Docker

Services

```
PostgreSQL

FastAPI

pgAdmin
```

---

# Environment Variables

```
DATABASE_URL

JWT_SECRET

JWT_REFRESH_SECRET

S3_BUCKET

AWS_ACCESS_KEY

AWS_SECRET_KEY

API_BASE_URL
```

---

# Backend APIs

Existing APIs should now read/write from PostgreSQL

```
Authentication

Profile

Prediction

History

Healthcare
```

No API changes required.

---

# Migration Strategy

Current

```
JSON

↓

Repository

↓

Database
```

Replace repository implementation only.

---

# State Management

Frontend remains unchanged.

Only backend persistence changes.

---

# Error Handling

Handle

- Database unavailable.
- Connection timeout.
- Migration failure.
- Duplicate key.
- Transaction rollback.
- Storage upload failure.

---

# Security

- Parameterized SQL queries.
- Password hashing.
- Encrypted database connections.
- Image access validation.
- Secure environment variables.

---

# Performance

- Connection pooling.
- Database indexes.
- Lazy loading.
- Optimized queries.
- Pagination.

---

# Acceptance Criteria

The feature is complete when

- PostgreSQL is running.
- SQLAlchemy models created.
- Alembic migrations work.
- CRUD operations succeed.
- JSON storage removed.
- Images upload successfully.
- APIs work without modification.
- Docker setup works.

---

# Testing Checklist

- Create user.
- Update profile.
- Save prediction.
- Retrieve history.
- Delete history.
- Upload image.
- Test migrations.
- Restart backend.
- Verify persistence.
- Verify Docker containers.

---

# Deliverables

- PostgreSQL Database
- SQLAlchemy Models
- Alembic Migrations
- Repository Layer
- Storage Service
- Docker Configuration
- Cloud Image Storage
- Production Database Configuration

---

# Out of Scope

This feature does NOT include

- Kubernetes deployment
- CI/CD pipelines
- Monitoring
- Logging infrastructure
- Auto scaling

---

# Future Enhancements

- Read replicas
- Database backups
- Redis caching
- Multi-region deployment
- Object versioning
- Database encryption at rest

---

# Deployment Notes

- Use Docker Compose for local development.
- Configure PostgreSQL with persistent volumes.
- Store images externally in object storage.
- Keep secrets in environment variables or a secrets manager.
- Monitor migration history using Alembic.

---

# Next Feature

## Feature 19 - Testing, Optimization & Production Deployment

Implement

- Unit testing
- Integration testing
- End-to-end testing
- Performance optimization
- API security hardening
- Logging & monitoring
- Docker production build
- CI/CD pipeline
- Android APK generation
- Production deployment