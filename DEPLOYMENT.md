# Deployment

The MEEP stack is currently deployed on [Render](https://render.com).

It uses 4 services:

- A web service for the django backend
- A postgres database for the django backend
- A background worker for the queue workers
- A web service for the nextjs frontend

## Backend

### Environment Variables

The backend services require the following environment variables:

- BASE_URL: The url (with https://, no trailing slash) of the backend site
- CACHE_FILE: A file (e.g. /tmp/meep) that will be used for the Mapit data cache
- DATABASE_URL: The postgres database URL
- MAPIT_API_KEY
- MAPIT_URL: The URL to the mapit service (probably https://mapit.mysociety.org/)
- SECRET_KEY: A django-style secret key for use in crypto functions

The backend web server also requires:

- ALLOWED_HOSTS: A comma-separated list of backend hosts (no https, no trailing slash)
- CORS_ALLOWED_ORIGINS: A comma-separated list of frontend origins (with https://, no trailing slash)
- GOOGLE_ANALYTICS
- GOOGLE_SITE_VERIFICATION

### Launch Commands

The prelaunch command is: `python manage.py migrate`

#### Web server launch command

The web server launch command is: `python manage.py collectstatic --noinput && python manage.py compress --force && gunicorn local_intelligence_hub.wsgi`

The collectstatic and compress commands are required at launch, because their output is lost in prelaunch.

The compress command is required to generate compressed front-end assets (using the django-compressor library). Normally this would be done
on the fly, but that doesn't work with whitenoise, which requires all assets to exist when the server starts up.

#### Worker launch command

The worker launch command is: `python manage.py procrastinate worker`

### Launch Commands

The pre-launch command is: `npm install && npm run build`

The launch command is `npm start`
