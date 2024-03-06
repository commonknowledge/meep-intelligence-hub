# Deployment

The MEEP stack is currently deployed on [Render](https://render.com).

It uses 4 services:

- A web service for the django backend
- A postgres database for the django backend
- A background worker for the queue workers
- A web service for the nextjs frontend

## Backend

The backend services require the following environment variables:

- 